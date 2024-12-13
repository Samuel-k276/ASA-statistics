from flask import Flask, jsonify, render_template
from scrape.base import scrape_2
from scrape.login import login_data, url_2

app = Flask(__name__)

with open("data.txt", "r") as f:
   data = scrape_2()


# Load Raw Data for Proj2
@app.route('/api/statistics/raw', methods=['GET'])
def get_raw_data():
   return jsonify({"2": data})



@app.route('/')
def home():
   return render_template('index.html')


if __name__ == "__main__":
   app.run(debug=True, port=5000, host="0.0.0.0")
