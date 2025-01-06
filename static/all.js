import { showRanking } from './ranking.js';
import { deliveryByTime } from './delivery_by_time.js';
import { fetchAndDisplayErrors } from './errors.js';
import { deliveryByLanguage } from './languages.js';
import { fetchAndDisplayTheChillestGroup } from './last_delivery.js';
import { fetchAndDisplaySubmissions } from './number_submissions.js';
import { resultsByTime } from './result_by_time.js';
import { fetchAndDisplayResultsDistribution } from './result_distribution.js';

document.addEventListener('DOMContentLoaded', () => {
   showRanking('3');
   deliveryByTime('3');
   fetchAndDisplayErrors('3');
   deliveryByLanguage('3');
   fetchAndDisplayTheChillestGroup('3');
   fetchAndDisplaySubmissions('3');
   resultsByTime('3');
   fetchAndDisplayResultsDistribution('3');
});


// Com esta funcao vamos alternar entre os diferentes projetos
function show(proj) {
   // Esconde todas as seções de projeto
   const projects = document.querySelectorAll('.project');
   projects.forEach(project => project.classList.remove('active'));

   // Mostra apenas a seção do projeto selecionado
   const selectedProject = document.getElementById('project'+proj);
   selectedProject.classList.add('active');

   // Mostra a tabela de ranking do projeto selecionado
   showRankingTable(proj);
   deliveryByTime(proj);
   fetchAndDisplayErrors(proj);
   deliveryByLanguage(proj);
   fetchAndDisplayTheChillestGroup(proj);
   fetchAndDisplaySubmissions(proj);
   resultsByTime(proj);
   fetchAndDisplayResultsDistribution(proj);
}
