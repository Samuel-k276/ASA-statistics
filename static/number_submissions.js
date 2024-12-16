
function getSubmissionsByGroup(data, proj) {
   const deliveries = data[proj];
   let group = {};
   deliveries.forEach(row => {
      if (row.group in group) {
         group[row.group] += 1;
      } else {
         group[row.group] = 1;
      }
   });
   return group;
}

function getSubmissionsFrequency(submissionsByGroup) {
   let frequencies = {};
   Object.values(submissionsByGroup).forEach(submissions => {
      if (submissions in frequencies) {
         frequencies[submissions] += 1;
      } else {
         frequencies[submissions] = 1;
      }
   });
   return frequencies;
}

function getGroupWithMostSubmissions(submissionsByGroup) {
   const maxSubmissions = Math.max(...Object.values(submissionsByGroup));
   const group = Object.keys(submissionsByGroup).find(key => submissionsByGroup[key] === maxSubmissions);
   return [ group, maxSubmissions ];
}

function fetchAndDisplaySubmissions(proj) {   
   // Fetch the JSON data from the server
   fetch("https://asa-statistics.onrender.com/api/statistics/raw") 
      .then(response => response.json())  // Parse the response as JSON
      .then(data => {
         // Parse the data to get the submissions
         const submissionsByGroup = getSubmissionsByGroup(data, proj);
         const submissions = getSubmissionsFrequency(submissionsByGroup);

         // Extract the error types (keys) and frequencies (values)
         const numberOfSubmissions = Object.keys(submissions);
         const frequencies = Object.values(submissions);

         // Create a bar chart using Chart.js
         const ctx = document.getElementById('submissionsChart').getContext('2d');
         new Chart(ctx, {
            type: 'bar',
            data: {
               labels: numberOfSubmissions,  // Number of Submissions the x-axis
               datasets: [{
                  label: 'Submissions Frequency',  // Dataset label
                  data: frequencies,        // Frequencies of the submissions
                  backgroundColor: 'skyblue', // Bar color
                  borderColor: 'blue',
                  borderWidth: 1
               }]
            },
            options: {
               indexAxis: 'y',
               responsive: true,
               scales: {
                  x: { 
                     title: { text: 'Number of Groups', display: true },
                     beginAtZero: true,
                     max: Math.ceil(Math.max(...frequencies)*1.1),
                     ticks: {
                        padding: 10, // Ajustar o padding dos ticks para criar espaço
                        stepSize: Math.ceil(Math.max(...frequencies)*1.1/4), // Garantir que as labels do eixo X sejam inteiros
                     }
                  },
                  y: { 
                     type: 'linear',
                     title: { text: 'Number of Submissions', display: true },
                     beginAtZero: true,
                     grid: { display: false },
                     ticks: {
                        padding: 5,
                        stepSize: 1,
                     },
                  }
               },
               plugins: { legend: { display: false } } // Hide the legend
            }
         });
         
         // Get the group with the most submissions
         const [ group, maxSubmissions ] = getGroupWithMostSubmissions(submissionsByGroup);
         document.getElementById('groupWithTheMostSubmissions').textContent =`Grupo com mais submissoes: ${group} com ${maxSubmissions} submissoes.`;

      })
      .catch(error => console.error('Error fetching the data:', error));
}

document.querySelectorAll('.project').forEach(div => {
   const param = div.dataset.param; // Recupera o valor de 'data-param'
   fetchAndDisplaySubmissions(param); // Chama o script com o parâmetro
});
