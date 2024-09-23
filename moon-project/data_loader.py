import pandas as pd

def load_data(file_name, n_rows=2000):
    """
    Load data from a CSV file and convert the 'Date' column to datetime.

    Args:
        file_name (str): The name of the CSV file to load.
        n_rows (int): The number of rows to read from the file.

    Returns:
        pd.DataFrame: A DataFrame containing the loaded data with 'Date' as datetime.
    """
    try:
        # Load the data
        df = pd.read_csv(file_name, delimiter=',', nrows=n_rows, header=None, names=['Day', 'Date', 'Time', 'Flag'])

        # Combine the 'Date' and 'Time' columns into a single datetime column
        df['DateTime'] = pd.to_datetime(df['Date'] + ' ' + df['Time'], format='%d %B %Y %I:%M:%S %p', errors='coerce')

        # Check for any conversion issues
        if df['DateTime'].isnull().any():
            print("Warning: Some dates could not be parsed and will be set to NaT.")

        return df[['DateTime', 'Flag']]  # Return only relevant columns

    except FileNotFoundError:
        print(f"Error: The file '{file_name}' was not found.")
        return None
    except Exception as e:
        print(f"An error occurred: {e}")
        return None

# Example usage
df1 = load_data('your_file.csv')
