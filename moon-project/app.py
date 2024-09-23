from flask import Flask, request, jsonify
from data_loader import load_data  
from config import DATA_FILE, CACHE_FILE
from datetime import datetime, timedelta
import ephem as ephem
import json
import os
#Solar 
from calculations import (                           # Import specific functions from calculations
    get_moons_by_birthday_cache,
    get_moons_by_birthday,
    get_luckiest,
    next_full_moon,
    cache
)

app = Flask(__name__)



# Ensure cache directory exists
os.makedirs(os.path.dirname(CACHE_FILE), exist_ok=True)

# Load cache file or create it if it doesn't exist
if os.path.exists(CACHE_FILE):
    with open(CACHE_FILE, 'r') as f:
        date_results = json.load(f)  # Load existing cache
else:
    filename = 'moon_statistics.json'
    df1 = load_data(DATA_FILE)
    date_results = cache(filename,df1)  # Create the cache if it doesn't exist


@app.route('/api/next-full-moon', methods=['GET'])
def next_full_moonapi():
    date_str = request.args.get('date', default=datetime.now().isoformat())
    return next_full_moon(date_str)

@app.route('/calculate_moons', methods=['GET'])
def calculate_moons():
    birthday = request.args.get('birthday')
    if not birthday:
        return jsonify({"error": "Please provide a birthday in the format YYYY-MM-DD"}), 400
    
    # Validate the birthday format
    try:
        # Attempt to parse the date to ensure it's valid
        datetime.strptime(birthday, "%Y-%m-%d")
    except ValueError:
        return jsonify({"error": "Invalid birthday format. Please use YYYY-MM-DD"}), 400

    # Call the functions to get statistics
    cached_stats = get_moons_by_birthday_cache(birthday, filename='moon_statistics.json')
    calculated_stats = get_moons_by_birthday(birthday, date_results)  # No need to add time

    # Prepare response
    response = {
        "cached_statistics": cached_stats,
        "calculated_statistics": calculated_stats
    }
    return jsonify(response), 200


@app.route('/get_birthday', methods=['GET'])
def get_birthday():
    birthday = request.args.get('birthday')
    if not birthday:
        return jsonify({"error": "Please provide a birthday in the format YYYY-MM-DD HH:MM:SS"}), 400

    return jsonify({"message": f"Birthday received: {birthday}"}), 200

# Run the Flask application
if __name__ == '__main__':
    x=cache()
    print(get_luckiest(x))  
    app.run(debug=True)

