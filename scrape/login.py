from dotenv import load_dotenv
import os

# Carrega as variáveis do .env
load_dotenv()

login_data = {
   "username": os.getenv("MOOSHAK_USERNAME"),
   "password": os.getenv("MOOSHAK_PASSWORD"),
}


url_1 = "https://mooshak.example.com/projeto1"
url_2 = "https://acp.tecnico.ulisboa.pt/~mooshak/cgi-bin/execute/10496254549592852?command=listing&type=submissions&time=5&page=0&lines=200"
url_3 = "https://mooshak.example.com/projeto3"

login_url = "https://acp.tecnico.ulisboa.pt/~mooshak/cgi-bin/execute/10496254549592852?login"