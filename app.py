from flask import Flask, jsonify, render_template
from scrape.base import scrape_2
import os
import threading
import time

app = Flask(__name__)

data = scrape_2()

def continuous_scraping(interval=100):
   global data
   while True:
      try:
         # Atualiza os dados com o scraping
         data = scrape_2()
         print("Data updated successfully.")
      except Exception as e:
         print(f"Error during scraping: {e}")
      time.sleep(interval)


# Load Raw Data for Proj2
@app.route('/api/statistics/raw', methods=['GET'])
def get_raw_data():
   return jsonify({"2": data})



@app.route('/')
def home():
   return render_template('index.html')


if __name__ == "__main__":
   scraping_thread = threading.Thread(target=continuous_scraping, args=(100,), daemon=True)
   scraping_thread.start()

   port = int(os.getenv("PORT", 5000))
   app.run(debug=True, port=port, host="0.0.0.0")
