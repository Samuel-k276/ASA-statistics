import os
import dotenv

dotenv.load_dotenv()


login_data = {
   "username": os.getenv("MOOSHAK_USERNAME"),
   "password": os.getenv("MOOSHAK_PASSWORD"),
}


url_2 = os.getenv("URL_PROJ2")

login_url = os.getenv("LOGIN_URL")