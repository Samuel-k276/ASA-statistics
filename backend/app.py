from flask import Flask, jsonify

app = Flask(__name__)

# Load data
@app.route('/api/statistics', methods=['GET'])
def get_statistics():
   data = [
      {"name": "João", "problem": "Problem 1", "result": "Correct", "time": "01:23:45"},
      {"name": "Maria", "problem": "Problem 2", "result": "Wrong", "time": "00:45:30"},
   ]
   return jsonify(data)

if __name__ == "__main__":
   app.run(debug=True)
