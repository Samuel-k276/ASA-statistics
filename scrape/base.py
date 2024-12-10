from scrape.login import login_data, login_url, url_1, url_2, url_3
import requests
from bs4 import BeautifulSoup
import pandas as pd


def web_scrape(url):
   # Sessão para persistir cookies
   with requests.Session() as session:
      # Fazer login, se necessário
      response = session.post(login_url, data=login_data)
      
      # Acessar a página das entregas
      entrega_page = session.get(url)
      soup = BeautifulSoup(entrega_page.text, 'html.parser')

      # Identificar a tabela de estatísticas
      tabela = soup.find('table', {'class': 'statistics-table'})  # Substitua pela classe correta

      data = []
      # Iterar pelas linhas da tabela
      for row in tabela.find_all('tr')[1:]:  # Pular o cabeçalho
         cols = row.find_all('td')
         dados = [col.text.strip() for col in cols]
         
         if len(cols) >= 3:  # Garantir que há pelo menos 3 colunas (group, result, time)
            group = cols[0].text.strip()
            result = float(cols[1].text.strip())  # Pode ser outro tipo de dado dependendo do formato
            time = float(cols[2].text.strip())  # Pode ser outro tipo de dado dependendo do formato
            data.append({'group': group, 'result': result, 'time': time})

   return data


# Ordenação dos dados
def sort_data(data): 
   # Ordena pela chave 'result' decrescente e, em caso de empate, pela chave 'time' crescente
   return sorted(data, key=lambda x: (-x['result'], x['time']))

def scrape_all_projects_rankings():
   data = {
      "Project1": sort_data(web_scrape(url_1)),
      "Project2": sort_data(web_scrape(url_2)),
      "Project3": sort_data(web_scrape(url_3)),
   }

   return data