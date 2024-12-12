from flask import Flask, jsonify, render_template
from scrape.base import scrape_all_projects

app = Flask(__name__)

with open("data.txt", "r") as f:
   data = eval(f.read())


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
