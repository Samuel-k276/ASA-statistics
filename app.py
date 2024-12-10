from flask import Flask, jsonify, render_template

app = Flask(__name__)

# Load data
@app.route('/api/statistics/ranking/proj2', methods=['GET'])
def get_statistics():
   data = [
      {"group": "al019", "result": "1700", "time": "01:23:45"},
      {"group": "al001", "result": "1550", "time": "00:45:30"},
   ]
   return jsonify(data)

@app.route('/api/statistics/all', methods=['GET'])
def get_project(project_id):
   projects = {
      1: {"name": "Projeto 1", "stats": "Estatísticas do Projeto 1"},
      2: {"name": "Projeto 2", "stats": "Estatísticas do Projeto 2"},
      3: {"name": "Projeto 3", "stats": "Estatísticas do Projeto 3"},
   }
   return jsonify(projects.get(project_id, {"error": "Projeto não encontrado"}))

@app.route('/')
def home():
    return render_template('index.html')


if __name__ == "__main__":
   app.run(debug=True)
