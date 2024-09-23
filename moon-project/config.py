import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

DATA_FILE = os.path.join(BASE_DIR,'data','full_moons.csv')
CACHE_FILE= os.path.join(BASE_DIR,'data','moon_statistics.json')