from flask import Flask, request, jsonify
import pandas as pd
from datetime import datetime, timedelta
import ephem
import json
import os
import numpy as np  # Make sure to import numpy
from config import MOON_DATA
from concurrent.futures import ProcessPoolExecutor
#Solar 

def get_moons_by_birthday_cache(birthday_str, filename=MOON_DATA):
    """Retrieve moon statistics for a specific birthday from the JSON file."""
    # Convert the birthday string to a datetime object
    birthday = datetime.strptime(birthday_str, "%Y-%m-%d")
    birthday_date_str = birthday.strftime("%Y-%m-%d")  # Format for the JSON keys

    # Check if the statistics file exists
    if os.path.exists(filename):
        with open(filename, 'r') as f:
            date_results = json.load(f)

        # Check if the birthday date exists in the data
        if birthday_date_str in date_results:
            return date_results[birthday_date_str]
        else:
            print(f"No statistics found for the date: {birthday_date_str}.")
            return None
    else:
        print("Statistics file does not exist.")
        return None

def get_moons_by_birthday(birthday_str, df):
    birthday = datetime.strptime(birthday_str, "%Y-%m-%d")
    
    birth_year = birthday.year
    birth_month = birthday.month
    birth_day = birthday.day
    now = datetime.now()
    
    past_moons_df = df[
        (df['DateTime'].dt.day.isin([birth_day - 1, birth_day, birth_day + 1])) &
        (df['DateTime'].dt.month == birth_month) &
        (df['DateTime'] < birthday)
    ]

    future_moons_df = df[
        (df['DateTime'].dt.day.isin([birth_day - 1, birth_day, birth_day + 1])) &
        (df['DateTime'].dt.month == birth_month) &
        (df['DateTime'].dt.year >= birth_year)
    ]


    # Filter future moons based on the birthday
    future_moons = future_moons_df[future_moons_df['DateTime'] >= birthday]

    # Adjust future moons for those that have already occurred
    future_moons_adjusted = future_moons[future_moons['DateTime'] <= now]

    # Get upcoming future moons
    future_moons_upcoming = future_moons[future_moons['DateTime'] > now]

    # Now you can proceed to concatenate and list the results
    total_past_moons = pd.concat([past_moons_df, future_moons_adjusted])

    # Count the moons
    past_before_count = len(past_moons_df)
    past_after_count = len(future_moons_adjusted)
    future_count = len(future_moons_upcoming)

    # Lists for results
    past_moons_before = past_moons_df['DateTime'].dt.strftime('%Y-%m-%d %H:%M:%S').tolist()
    past_moons_after = future_moons_adjusted['DateTime'].dt.strftime('%Y-%m-%d %H:%M:%S').tolist()
    future_moons_list = future_moons_upcoming['DateTime'].dt.strftime('%Y-%m-%d %H:%M:%S').tolist()

    def count_types(df):
        # Filter and get the dates for each type of moon event
        blue_moons = df[df['Flag'].str.contains(r'\[\+\]', na=False)]['DateTime'].dt.strftime('%Y-%m-%d %H:%M:%S').tolist()
        partial_eclipses = df[df['Flag'].str.contains(r'\[\*\]', na=False)]['DateTime'].dt.strftime('%Y-%m-%d %H:%M:%S').tolist()
        total_eclipses = df[df['Flag'].str.contains(r'\[\*\*\]', na=False)]['DateTime'].dt.strftime('%Y-%m-%d %H:%M:%S').tolist()
        penumbral_eclipses = df[df['Flag'].str.contains(r'\[\/\]', na=False)]['DateTime'].dt.strftime('%Y-%m-%d %H:%M:%S').tolist()

        return {
            "blue_moons": {
                "count": len(blue_moons),
                "dates": blue_moons
            },
            "partial_eclipses": {
                "count": len(partial_eclipses),
                "dates": partial_eclipses
            },
            "total_eclipses": {
                "count": len(total_eclipses),
                "dates": total_eclipses
            },
            "penumbral_eclipses": {
                "count": len(penumbral_eclipses),
                "dates": penumbral_eclipses
            }
    }
    
    past_types = count_types(total_past_moons)
    future_types = count_types(future_moons_upcoming)

    return {
        "past_before_count": past_before_count,
        "past_after_count": past_after_count,
        "future_count": future_count,
        "past_moons_before": past_moons_before,
        "past_moons_after": past_moons_after,
        "future_moons": future_moons_list,
        "past_spec_moons":past_types,
        "future_spec_moons":future_types
    }

def get_next_full_moon(date_now):
    observer = ephem.Observer()
    observer.date = date_now

    next_full_moon = ephem.next_full_moon(date_now)
    days_until_full_moon = (next_full_moon.datetime() - datetime.now()).days

    moon = ephem.Moon(observer)
    phase = moon.phase  # The percentage of the moon that is illuminated

    return next_full_moon.datetime(), days_until_full_moon, phase


def get_moon_type(illumination):
    if illumination == 0:
        return "New Moon"
    elif 0 < illumination < 50:
        return "Waxing Crescent"
    elif illumination == 50:
        return "First Quarter"
    elif 50 < illumination < 100:
        return "Waxing Gibbous"
    elif illumination == 100:
        return "Full Moon"
    elif 50 < illumination < 100:
        return "Waning Gibbous"
    elif illumination == 50:
        return "Last Quarter"
    elif 0 < illumination < 50:
        return "Waning Crescent"
    return "Unknown"

def convert_to_standard_types(data):
    """Convert numpy types to standard Python types for JSON serialization."""
    if isinstance(data, dict):
        return {k: convert_to_standard_types(v) for k, v in data.items()}
    elif isinstance(data, list):
        return [convert_to_standard_types(i) for i in data]
    elif isinstance(data, (np.int64, np.float64)):
        return int(data) if isinstance(data, np.int64) else float(data)
    return data

def get_luckiest(date_results):
    # Define generations
    generations = {
        "1900-1927": [],  # rest
        "1928-1945": [],  # silent
        "1946-1964": [],  # babyboomers
        "1965-1980": [],  # X
        "1981-1996": [],  # Y
        "1997-2012": [],  # Z
        "2013-2030": []   # Alpha
    }

    # Helper function to determine the generation for a given year
    def get_generation(year):
        if 1900 <= year <= 1927:
            return "1900-1927"
        elif 1928 <= year <= 1945:
            return "1928-1945"
        elif 1946 <= year <= 1964:
            return "1946-1964"
        elif 1965 <= year <= 1980:
            return "1965-1980"
        elif 1981 <= year <= 1996:
            return "1981-1996"
        elif 1997 <= year <= 2012:
            return "1997-2012"
        elif 2013 <= year <= 2030:
            return "2013-2030"
        return None

    # Categorize dates into generations
    for date, stats in date_results.items():
        total_moons = stats['past_before_count'] + stats['past_after_count'] + stats['future_count']
        
        if total_moons > 0:  # Only consider dates with moon counts
            year = int(date[:4])  # Extract the year from the date string
            generation = get_generation(year)  # Get the generation for this year
            
            if generation:  # Only add to generation if it falls in a known range
                generations[generation].append((date, total_moons))

    # Find the luckiest date in each generation
    luckiest_dates = {}
    for generation, dates in generations.items():
        if dates:
            # Get the date with the maximum moons
            luckiest_date = max(dates, key=lambda x: x[1])
            luckiest_dates[generation] = luckiest_date
            print(f"The luckiest date in the generation {generation} is {luckiest_date[0]} with {luckiest_date[1]} full moons!")
        else:
            print(f"No valid dates found in generation {generation}.")

    return luckiest_dates


def next_full_moon(date):
    date_str = request.args.get('date', default=datetime.now().isoformat())
    date_now = datetime.fromisoformat(date_str)

    observer = ephem.Observer()
    observer.date = date_now  # Set the observer's date

    next_full_moon_date, days_until_full_moon, phase = get_next_full_moon(date_now)

    moon_type = get_moon_type(phase)

    return jsonify({
        "nextFullMoonInDays": days_until_full_moon,  # Days until next full moon
        "nextFullMoonDate": next_full_moon_date.isoformat(),  # Full moon date
        "moonPhase": phase,  # Phase of the moon (percentage illuminated)
        "moon_type_now":moon_type
    })

def cache(filename,df1):
    print("Calculating moon statistics...")
    start_date = datetime(1900, 1, 1)
    end_date = datetime.now()
    date_results = {}

    current_date = start_date

    while current_date <= end_date:
        date_str = current_date.strftime("%Y-%m-%d")  # Change format to Y-M-D
        print(f"Processing date: {date_str}")  # Print each date being processed
        result = get_moons_by_birthday(date_str, df1)
        date_results[date_str] = result
        current_date += timedelta(days=1)

    # Convert data types before saving to JSON
    date_results = convert_to_standard_types(date_results)

    # Save results to a JSON file
    with open(filename, 'w') as f:
        json.dump(date_results, f, indent=4) #TODO: FIX path of export

    print(f"Saved moon statistics to {filename}.")  # Indicate when results are saved
    return date_results  # Return the results for further processing
