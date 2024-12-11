from flask import Flask, jsonify, render_template
from scrape.base import web_scrape, sort_clean, errors_by_type, count_by_group, last_first_submission

app = Flask(__name__)

data = [
      {"group": "al019", "result": "1750", 'errors': "Compilation Error", "time": "01:23:45"},
      {"group": "al001", "result": "1750", 'errors': "Compilation Error", "time": "00:45:30"},
      {"group": "al011", "result": "1750", 'errors': "Compilation Error", "time": "00:65:30"},
      {"group": "al021", "result": "1450", 'errors': "Runtime Error", "time": "00:75:30"},
      {"group": "al031", "result": "1250", 'errors': "Runtime Error", "time": "00:85:30"},
      {"group": "al031", "result": "1250", 'errors': "Runtime Error", "time": "00:85:30"},
      {"group": "al024", "result": "1750", 'errors': "Time Limit Exceeded", "time": "00:75:30"},
      {"group": "al024", "result": "1750", 'errors': "Time Limit Exceeded", "time": "12:75:30"},
      {"group": "al101", "result": "1750", 'errors': "Compilation Error", "time": "00:45:30"},
      {"group": "al211", "result": "1750", 'errors': "Compilation Error", "time": "00:65:30"},
      {"group": "al321", "result": "1450", 'errors': "Runtime Error", "time": "00:75:30"},
      {"group": "al431", "result": "1250", 'errors': "Runtime Error", "time": "00:85:30"},
      {"group": "al005", "result": "1750", 'errors': "Compilation Error", "time": "00:45:30"},
      {"group": "al016", "result": "1750", 'errors': "Compilation Error", "time": "00:65:30"},
      {"group": "al027", "result": "1450", 'errors': "Runtime Error", "time": "00:75:30"},
      {"group": "al038", "result": "1250", 'errors': "Runtime Error", "time": "00:85:30"},
      
   ]

# Load Ranking Statistics for Proj2
@app.route('/api/statistics/ranking/proj2', methods=['GET'])
def get_ranking_statistics():
   return jsonify(sort_clean(data))

# Load Error Statistics for Proj2
@app.route('/api/statistics/error/proj2', methods=['GET'])
def get_error_statistics():
   return jsonify(errors_by_type(data))

# Load Number of Submissions by Group for Proj2
@app.route('/api/statistics/submissions/proj2', methods=['GET'])
def get_group_statistics():

   return jsonify(count_by_group(data))

# Load Number of Submissions by Group for Proj2
@app.route('/api/statistics/last', methods=['GET'])
def get_last_first_submission():
   return jsonify(last_first_submission(data))

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
