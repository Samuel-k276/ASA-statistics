from flask import Flask, jsonify, render_template
from scrape.base import web_scrape, sort_data

app = Flask(__name__)

# Load data
@app.route('/api/statistics/ranking/proj2', methods=['GET'])
def get_statistics():
   data = [
      {"group": "al019", "result": "1750", "time": "01:23:45"},
      {"group": "al001", "result": "1750", "time": "00:45:30"},
      {"group": "al011", "result": "1750", "time": "00:65:30"},
      {"group": "al021", "result": "1450", "time": "00:75:30"},
      {"group": "al031", "result": "1250", "time": "00:85:30"},

   ]
   return jsonify(sort_data(data))

"""
@app.route('/api/statistics/rankings', methods=['GET'])
def get_statistics():
   # Carregar os dados de web scraping
   data = scrape_all_projects():

   # Retornar os dados em formato JSON
   return jsonify(sorted_data)
"""

@app.route('/api/statistics/all', methods=['GET'])
def get_projects():
   projects = {
      1: {"name": "Projeto 1", "stats": "Estatísticas do Projeto 1"},
      2: {"name": "Projeto 2", "stats": "Estatísticas do Projeto 2"},
      3: {"name": "Projeto 3", "stats": "Estatísticas do Projeto 3"},
   }
   return jsonify(projects)

@app.route('/')
def home():
   return render_template('index.html')


if __name__ == "__main__":
   app.run(debug=True)
