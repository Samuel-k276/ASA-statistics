from flask import Flask, jsonify, render_template
from scrape.base import scrape_2
import os

app = Flask(__name__)

data = scrape_2()


# Load Raw Data for Proj2
@app.route('/api/statistics/raw', methods=['GET'])
def get_raw_data():
   return jsonify({"2": data})



@app.route('/')
def home():
   return render_template('index.html')


if __name__ == "__main__":
   port = int(os.getenv("PORT", 5000))
   app.run(debug=True, port=port, host="0.0.0.0")
