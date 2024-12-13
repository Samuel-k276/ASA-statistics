const selector = {'1': "#ranking-table-project1 tbody", '2': "#ranking-table-project2 tbody", '3': "#ranking-table-project3 tbody"};

function showRanking(projectId) {
   // Esconde todas as seções de projeto
   const projects = document.querySelectorAll('.project');
   projects.forEach(project => project.classList.remove('active'));

   // Mostra apenas a seção do projeto selecionado
   const selectedProject = document.getElementById('project'+projectId);
   selectedProject.classList.add('active');

   // Mostra a tabela de ranking do projeto selecionado
   showRankingTable(projectId);
}

function showRankingTable(projectId) {
   fetch("https://asa-statistics.onrender.com/api/statistics/raw") 
      .then(response => response.json())
      .then(data => {
         const tableBody = document.querySelector(selector[projectId]);
         const rowsToShow = 10; // Número inicial de linhas visíveis
         let expanded = false; // Estado para controle de exibição

         // Limpar tabela
         tableBody.innerHTML = "";

         // Ordenar os dados e remover duplicatas
         finalData = uniqueGroup(orderData(data[projectId]));

         // Adicionar as linhas da tabela
         finalData.forEach((row, index) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
               <td>${row.group}</td>
               <td>${row.result}</td>
               <td>${row.time}</td>
            `;
            if (index >= rowsToShow) {
               // Esconde as linhas que excedem o limite inicial
               tr.classList.add("hidden");
            }
            tableBody.appendChild(tr);
         });

         // Adicionar botão Mostrar Mais/Menos
         createExpandButton(tableBody);
      })
      .catch(error => console.error('Error fetching data:', error));
}

// Create the Button
function createExpandButton(tableBody) {
   const existingButton = document.querySelector("#expand-button");
   if (!existingButton) {
      const button = document.createElement("button");
      button.id = "expand-button";
      button.textContent = "Mostrar Mais";
      button.className = "expand-button";
      let expanded = false; // Estado para controle de exibição

      button.onclick = () => {
         expanded = !expanded; // Alterna estado

         const hiddenRows = tableBody.querySelectorAll(".hidden");
         hiddenRows.forEach(row => {
            row.style.display = expanded ? "table-row" : "none";
         });

         button.textContent = expanded ? "Mostrar Menos" : "Mostrar Mais";
      };
      tableBody.parentElement.appendChild(button);
   }
}

function timeToInt(time){
   const [hours, minutes, seconds] = time.split(':').map(Number);
   return hours*3600 + minutes*60 + seconds;
}

// First by result then by time
function orderData(data){
   return data.sort((a, b) => {
      if (a.result === b.result) {
         return timeToInt(a.time) - timeToInt(b.time);
      }
      return b.result - a.result;
   });
}

// Returns the data with a group only appearing once
function uniqueGroup(data){
   const unique = {};
   data.forEach(row => {
      if (!unique[row.group]) {
         unique[row.group] = row;
      }
   });
   return Object.values(unique);
}
      
document.addEventListener('DOMContentLoaded', () => {
   showRanking('2');
});