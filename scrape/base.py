from scrape.login import login_data, url, login_url
import requests
from bs4 import BeautifulSoup
import pandas as pd


# Sessão para persistir cookies
with requests.Session() as session:
   # Fazer login, se necessário
   response = session.post(login_url, data=login_data)
    
   # Acessar a página das entregas
   entrega_page = session.get(url)
   soup = BeautifulSoup(entrega_page.text, 'html.parser')

   # Identificar a tabela de estatísticas
   tabela = soup.find('table', {'class': 'statistics-table'})  # Substitua pela classe correta

   # Iterar pelas linhas da tabela
   for row in tabela.find_all('tr')[1:]:  # Pular o cabeçalho
      cols = row.find_all('td')
      dados = [col.text.strip() for col in cols]
      
      # Criar e salvar um DataFrame
      df = pd.DataFrame(dados, columns=['Nome', 'Problema', 'Resultado', 'Tempo'])
      df.to_csv('estatisticas_entregas.csv', index=False)
