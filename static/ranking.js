function showRanking(projectId) {
   // Esconde todas as seções de projeto
   const projects = document.querySelectorAll('.project');
   projects.forEach(project => project.classList.remove('active'));

   // Mostra apenas a seção do projeto selecionado
   const selectedProject = document.getElementById(projectId);
   selectedProject.classList.add('active');

   // Mostra a tabela de ranking do projeto selecionado
   showRankingTable(projectId);
}

function showRankingTable(projectId) {
   switch (projectId) {
      case 'project1':
         showRanking1();
         break;
      case 'project2':
         showRanking2();
         break;
      case 'project3':
         showRanking3();
         break;
      default:
         break;
   }
}

function showRanking1() {
   fetch('http://127.0.0.1:5000/api/statistics/ranking/proj1')
         .then(response => response.json())
         .then(data => {
            const tableBody = document.querySelector("#ranking-table-project1 tbody");
            tableBody.innerHTML = "";
            data.forEach(row => {
               const tr = document.createElement("tr");
               tr.innerHTML = `
                  <td>${row.group}</td>
                  <td>${row.result}</td>
                  <td>${row.time}</td>
               `;
               tableBody.appendChild(tr);
            });
         })
         .catch(error => console.error('Error fetching data:', error));
}

function showRanking2() {
   fetch('http://127.0.0.1:5000/api/statistics/ranking/proj2')
      .then(response => response.json())
      .then(data => {
         const tableBody = document.querySelector("#ranking-table-project2 tbody");
         const rowsToShow = 10; // Número inicial de linhas visíveis
         let expanded = false; // Estado para controle de exibição

         // Limpar tabela
         tableBody.innerHTML = "";

         // Adicionar as linhas da tabela
         data.forEach((row, index) => {
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
         const existingButton = document.querySelector("#expand-button");
         if (!existingButton) {
            const button = document.createElement("button");
            button.id = "expand-button";
            button.textContent = "Mostrar Mais";
            button.className = "expand-button";
            button.onclick = () => {
               expanded = !expanded; // Alterna estado

               const hiddenRows = document.querySelectorAll("#ranking-table-project2 tbody .hidden");
               hiddenRows.forEach(row => {
                  row.style.display = expanded ? "table-row" : "none";
               });

               button.textContent = expanded ? "Mostrar Menos" : "Mostrar Mais";
            };
            tableBody.parentElement.appendChild(button);
         }
      })
      .catch(error => console.error('Error fetching data:', error));
}


function showRanking3() {
   fetch('http://127.0.0.1:5000/api/statistics/ranking/proj3')
      .then(response => response.json())
      .then(data => {
         const tableBody = document.querySelector("#ranking-table-project3 tbody");
         tableBody.innerHTML = "";
         data.forEach(row => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
               <td>${row.group}</td>
               <td>${row.result}</td>
               <td>${row.time}</td>
         `;
            tableBody.appendChild(tr);
         });
      })
      .catch(error => console.error('Error fetching data:', error));
}

      
document.addEventListener('DOMContentLoaded', () => {
   showRanking('project2');
});