from scrape.login import login_data, login_url, url_3
import requests
from bs4 import BeautifulSoup



def web_scrape(url: str):
   # Sessão para persistir cookies
   i = 0
   data = []
   while True:
      cur_url = str(url) + str(i) + "&lines=200"
      i += 1
      end = False
      print(cur_url)
      with requests.Session() as session:
         # Fazer login, se necessário
         response = session.post(login_url, data=login_data)
         
         # Acessar a página das entregas
         entrega_page = session.get(cur_url)
         soup = BeautifulSoup(entrega_page.text, 'html.parser')

         # Identificar a tabela de estatísticas
         tabela = soup.find('table', {'class': 'Listing'})  # Substitua pela classe correta

         # Extrair o corpo da tabela
         tbody = tabela.find('tbody')
         if tbody:
            tabela = tbody

         # Iterar pelas linhas da tabela
         for row in tabela.find_all('tr')[1:]:  # Pular o cabeçalho
            cols = row.find_all('td')
            if len(cols) == 1:
               end = True
               break
            dados = [col.text.strip() for col in cols]

            if len(cols) >= 4:  # Garantir que há pelo menos 3 colunas (group, result, time)
               group = dados[3].split(" ")[1]
               if group == "53921" or group == "46963":
                  continue
               result = dados[6].split(" ")[0] 
               time = dados[1]
               #a = time.find(":")
               #time = time
               info = " ".join(dados[6].split(" ")[1:])
               if info == "Accepted" or info == "Evaluating":
                  errors = ""
               else:
                  errors = info
               language = dados[5]
               data.append({'group': group, 'result': result, 'errors': errors, 'time': time, 'language': language})
         if end == True:
            break

   return data

def time_str_to_int(time: str) -> int:
   i_1 = time.find(":")
   i_2 = time[i_1+1:].find(":")+i_1+1
   print(i_1, i_2)   
   total = int(time[:i_1])*3600 + int(time[i_1+1:i_2])*60 + int(time[i_2+1:])
   return total



def scrape_2():
   with open("scrape/proj2_data.txt", "r") as f:
      data = f.read()
      data = eval(data)
      return data["2"]

def scrape_3():
   return web_scrape(url_3)
