from scrape.login import login_data, login_url, url_1, url_2, url_3
import requests
from bs4 import BeautifulSoup
import matplotlib.pyplot as plt
import io


def web_scrape(url: str):
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
         
         if len(cols) >= 4:  # Garantir que há pelo menos 3 colunas (group, result, time)
            group = cols[0].text.strip()
            result = cols[1].text.strip()  
            time = cols[2].text.strip()
            errors = cols[3].text.strip()
            data.append({'group': group, 'result': result, 'errors': errors, 'time': time})

   return data

def time_str_to_int(time: str) -> int:
   i_1 = time.find(":")
   i_2 = time[i_1+1:].find(":")+i_1+1
   print(i_1, i_2)   
   total = int(time[:i_1])*3600 + int(time[i_1+1:i_2])*60 + int(time[i_2+1:])
   return total

# Ordenação dos dados
def sort_data(data): 
   # Ordena pela chave 'result' decrescente e, em caso de empate, pela chave 'time' crescente
   return sorted(data, key=lambda x: (-int(x['result']), time_str_to_int(x['time'])))

# Função para eliminar os grupos duplicados mantendo só o que vem primeiro na ordenação
def remove_duplicates(data):
   seen = set()
   return [x for x in data if not (x['group'] in seen or seen.add(x['group']))]

# Função que combina scrape, sort e remove_duplicates
def sort_clean(data):
   return remove_duplicates(sort_data(data))

# Função que faz o scraping de todos os projetos
def scrape_all_projects_rankings():
   data = {
      '1': sort_clean(web_scrape(url_1)),
      '2': sort_clean(web_scrape(url_2)),
      '3': sort_clean(web_scrape(url_3)),
   }
   return data

# Função que conta a quantidade de erros por tipo
def errors_by_type(data):
   errors = {}
   for row in data:
      if row['errors'] in errors:
         errors[row['errors']] += 1
      else:
         errors[row['errors']] = 1
   return errors

# Função que conta o número de grupos por quantidade de submissões
def count_by_group(data):
   groups = {}
   for row in data:
      group = row['group']
      if group in groups:
         groups[group] += 1
      else:
         groups[group] = 1
   
   # Guarda o máximo de submissões e o grupo com o maximo
   max_submissions = max(groups.values())
   max_group = next(group for group, count in groups.items() if count == max_submissions)
   # Inverter o dicionário para contar a quantidade de grupos por quantidade de submissões
   groups_count = {}
   for group, count in groups.items():
      if count in groups_count:
         groups_count[count] += 1
      else:
         groups_count[count] = 1

   return groups_count, {max_group: max_submissions}

# Funcao que filtra a primeira submissao de cada grupo
def first_submissions(data):
   first_submission = {}
   for row in data:
      group = row['group']
      if group not in first_submission:
         first_submission[group] = row
      elif time_str_to_int(first_submission[group]['time']) > time_str_to_int(row['time']):
         first_submission[group] = row

   return first_submission

# Funcao que guarda a ultima primeira submissao
def last_first_submission(data):
   first_submission = first_submissions(data)

   chave_maxima = max(first_submission, key=lambda k: first_submission[k]["time"])
   last_submission = first_submission[chave_maxima]
      
   return last_submission
