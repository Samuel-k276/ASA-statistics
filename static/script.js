function showProject(projectId) {
  
   // Esconde todas as seções de projeto
   const projects = document.querySelectorAll('.project');
   projects.forEach(project => project.classList.remove('active'));

   // Mostra apenas a seção do projeto selecionado
   const selectedProject = document.getElementById(projectId);
   selectedProject.classList.add('active');

   // Mostra a tabela de ranking do projeto selecionado
   showTable(projectId);
}

function showTable(projectId) {

   switch (projectId) {
      case 'project1':
         showProject1();
         break;
      case 'project2':
         showProject2();
         break;
      case 'project3':
         showProject3();
         break;
      default:
         break;
   }
}

function showProject1() {
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

function showProject2() {
   fetch('http://127.0.0.1:5000/api/statistics/ranking/proj2')
      .then(response => response.json())
      .then(data => {
         const tableBody = document.querySelector("#ranking-table-project2 tbody");
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

function showProject3() {
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
   showProject('project2');
});