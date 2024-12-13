from scrape.login import login_data, login_url, url_1, url_2, url_3
import requests
from bs4 import BeautifulSoup



def web_scrape(url: str):
   # Sessão para persistir cookies
   with requests.Session() as session:
      # Fazer login, se necessário
      response = session.post(login_url, data=login_data)
      
      # Acessar a página das entregas
      entrega_page = session.get(url)
      soup = BeautifulSoup(entrega_page.text, 'html.parser')

      # Identificar a tabela de estatísticas
      tabela = soup.find('table', {'class': 'Listing'})  # Substitua pela classe correta

      # Extrair o corpo da tabela
      tbody = tabela.find('tbody')
      if tbody:
         tabela = tbody

      data = []
      # Iterar pelas linhas da tabela
      for row in tabela.find_all('tr')[1:]:  # Pular o cabeçalho
         cols = row.find_all('td')
         dados = [col.text.strip() for col in cols]

         if len(cols) >= 4:  # Garantir que há pelo menos 3 colunas (group, result, time)
            group = dados[3].split(" ")[1]
            if group == "53921" or group == "46963":
               continue
            result = dados[6].split(" ")[0] 
            time = dados[1]
            a = time.find(":")
            time = f"{int(time[:a]) - 122:02}:{time[a+1:]}"
            info = " ".join(dados[6].split(" ")[1:])
            if info == "Accepted" or info == "Evaluating":
               errors = ""
            else:
               errors = info
            data.append({'group': group, 'result': result, 'errors': errors, 'time': time})

   return data

def time_str_to_int(time: str) -> int:
   i_1 = time.find(":")
   i_2 = time[i_1+1:].find(":")+i_1+1
   print(i_1, i_2)   
   total = int(time[:i_1])*3600 + int(time[i_1+1:i_2])*60 + int(time[i_2+1:])
   return total


# Função que faz o scraping de todos os projetos
def scrape_all_projects():
   data = {
      '1': web_scrape(url_1),
      '2': web_scrape(url_2),
      '3': web_scrape(url_3),
   }
   return data

def scrape_2():
   return web_scrape(url_2)
