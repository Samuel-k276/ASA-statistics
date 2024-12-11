from flask import Flask, jsonify, render_template
from scrape.base import scrape_all_projects
import random

app = Flask(__name__)

data = [
   {"group": "al019", "result": "1750", 'errors': "Compilation Error", "time": "01:23:45"},
   {"group": "al089", "result": "1750", 'errors': "Compilation Error", "time": "01:34:56"},
   {"group": "al099", "result": "1750", 'errors': "Compilation Error", "time": "01:45:12"},
   {"group": "al061", "result": "1750", 'errors': "Compilation Error", "time": "00:12:34"},
   {"group": "al061", "result": "1750", 'errors': "Compilation Error", "time": "00:23:45"},
   {"group": "al011", "result": "1750", 'errors': "Compilation Error", "time": "00:34:56"},
   {"group": "al021", "result": "1450", 'errors': "Runtime Error", "time": "00:45:12"},
   {"group": "al031", "result": "1250", 'errors': "Runtime Error", "time": "00:56:23"},
   {"group": "al031", "result": "1250", 'errors': "Runtime Error", "time": "00:12:34"},
   {"group": "al024", "result": "1750", 'errors': "Time Limit Exceeded", "time": "00:23:45"},
   {"group": "al024", "result": "1750", 'errors': "Time Limit Exceeded", "time": "12:34:56"},
   {"group": "al011", "result": "1750", 'errors': "Compilation Error", "time": "00:45:12"},
   {"group": "al021", "result": "1450", 'errors': "Runtime Error", "time": "00:56:23"},
   {"group": "al031", "result": "1250", 'errors': "Runtime Error", "time": "00:12:34"},
   {"group": "al031", "result": "1250", 'errors': "Runtime Error", "time": "00:23:45"},
   {"group": "al024", "result": "1750", 'errors': "Time Limit Exceeded", "time": "00:34:56"},
   {"group": "al024", "result": "1750", 'errors': "Time Limit Exceeded", "time": "12:45:12"},
   {"group": "al101", "result": "1750", 'errors': "Compilation Error", "time": "00:56:23"},
   {"group": "al211", "result": "1750", 'errors': "Compilation Error", "time": "00:12:34"},
   {"group": "al321", "result": "1450", 'errors': "Runtime Error", "time": "00:23:45"},
   {"group": "al431", "result": "1250", 'errors': "Runtime Error", "time": "00:34:56"},
   {"group": "al005", "result": "1750", 'errors': "Compilation Error", "time": "00:45:12"},
   {"group": "al016", "result": "1750", 'errors': "Compilation Error", "time": "00:56:23"},
   {"group": "al027", "result": "1450", 'errors': "Runtime Error", "time": "00:12:34"},
   {"group": "al038", "result": "1250", 'errors': "Runtime Error", "time": "00:23:45"},
   {"group": "al011", "result": "1750", 'errors': "Compilation Error", "time": "00:34:56"},
   {"group": "al021", "result": "1450", 'errors': "Runtime Error", "time": "00:45:12"},
   {"group": "al031", "result": "1250", 'errors': "Runtime Error", "time": "00:56:23"},
   {"group": "al031", "result": "1250", 'errors': "Runtime Error", "time": "00:12:34"},
   {"group": "al024", "result": "1750", 'errors': "Time Limit Exceeded", "time": "00:23:45"},
   {"group": "al024", "result": "1750", 'errors': "Time Limit Exceeded", "time": "12:34:56"},
   {"group": "al101", "result": "1750", 'errors': "Compilation Error", "time": "00:45:12"},
   {"group": "al211", "result": "1750", 'errors': "Compilation Error", "time": "00:56:23"},
   {"group": "al321", "result": "1450", 'errors': "Runtime Error", "time": "00:12:34"},
   {"group": "al431", "result": "1250", 'errors': "Runtime Error", "time": "00:23:45"},
   {"group": "al005", "result": "1750", 'errors': "Compilation Error", "time": "00:34:56"},
   {"group": "al016", "result": "1750", 'errors': "Compilation Error", "time": "00:45:12"},
   {"group": "al027", "result": "1450", 'errors': "Runtime Error", "time": "00:56:23"},
   {"group": "al038", "result": "1250", 'errors': "Runtime Error", "time": "00:12:34"},
   {"group": "al045", "result": "1350", 'errors': "Runtime Error", "time": "01:23:45"},
   {"group": "al057", "result": "1500", 'errors': "Compilation Error", "time": "01:23:45"},
   {"group": "al068", "result": "1600", 'errors': "Runtime Error", "time": "02:34:56"},
   {"group": "al079", "result": "1700", 'errors': "Time Limit Exceeded", "time": "03:45:12"},
   {"group": "al080", "result": "1400", 'errors': "Compilation Error", "time": "04:56:23"},
   {"group": "al091", "result": "1300", 'errors': "Runtime Error", "time": "05:12:34"},
   {"group": "al102", "result": "1550", 'errors': "Time Limit Exceeded", "time": "06:23:45"},
   {"group": "al113", "result": "1650", 'errors': "Compilation Error", "time": "07:34:56"},
   {"group": "al124", "result": "1450", 'errors': "Runtime Error", "time": "08:45:12"},
   {"group": "al135", "result": "1250", 'errors': "Time Limit Exceeded", "time": "09:56:23"},
   {"group": "al056", "result": "1550", 'errors': "Compilation Error", "time": "02:34:56"},
   {"group": "al067", "result": "1650", 'errors': "Time Limit Exceeded", "time": "03:45:12"},
   {"group": "al078", "result": "1750", 'errors': "Compilation Error", "time": "04:56:23"},
   {"group": "al089", "result": "1650", 'errors': "Runtime Error", "time": "05:12:34"},
   {"group": "al090", "result": "1650", 'errors': "Time Limit Exceeded", "time": "06:23:45"},
   {"group": "al101", "result": "1650", 'errors': "Compilation Error", "time": "07:34:56"},
   {"group": "al112", "result": "1650", 'errors': "Runtime Error", "time": "08:45:12"},
   {"group": "al123", "result": "1650", 'errors': "Time Limit Exceeded", "time": "09:56:23"},
   {"group": "al134", "result": "1650", 'errors': "Compilation Error", "time": "10:12:34"},
   {"group": "al145", "result": "1650", 'errors': "Runtime Error", "time": "11:23:45"},
   {"group": "al156", "result": "1650", 'errors': "Time Limit Exceeded", "time": "12:34:56"},
   {"group": "al167", "result": "1650", 'errors': "Compilation Error", "time": "13:45:12"},
   {"group": "al178", "result": "1650", 'errors': "Runtime Error", "time": "14:56:23"},
   {"group": "al189", "result": "1650", 'errors': "Time Limit Exceeded", "time": "15:12:34"},
   {"group": "al200", "result": "1650", 'errors': "Compilation Error", "time": "16:23:45"},
   {"group": "al211", "result": "1650", 'errors': "Runtime Error", "time": "17:34:56"},
   {"group": "al222", "result": "1650", 'errors': "Time Limit Exceeded", "time": "18:45:12"},
   {"group": "al233", "result": "1650", 'errors': "Compilation Error", "time": "19:56:23"},
   {"group": "al244", "result": "1650", 'errors': "Runtime Error", "time": "20:12:34"},
]

# Load Raw Data for Proj2
@app.route('/api/statistics/raw', methods=['GET'])
def get_raw_data():
   return jsonify({"2": data})


"""
@app.route('/api/statistics/data', methods=['GET'])
def get_statistics():
   # Carregar os dados de web scraping
   data = scrape_all_projects()

   # Retornar os dados em formato JSON
   return jsonify(data)
"""


@app.route('/')
def home():
   return render_template('index.html')


if __name__ == "__main__":
   app.run(debug=True)
