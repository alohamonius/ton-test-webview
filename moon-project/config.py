import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MOON_DATA ='full_moons.csv'
CACHE_DATA='moon_statistics.json'

DATA_FILE_PATH = os.path.join(BASE_DIR,'data',MOON_DATA)
CACHE_FILE_PATH= os.path.join(BASE_DIR,'data',CACHE_DATA)