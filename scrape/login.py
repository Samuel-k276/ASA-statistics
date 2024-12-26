import os



login_data = {
   "username": os.getenv("MOOSHAK_USERNAME"),
   "password": os.getenv("MOOSHAK_PASSWORD"),
}


url_3 = os.getenv("URL_PROJ3")

login_url = os.getenv("LOGIN_URL")