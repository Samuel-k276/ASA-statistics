// Fetch the JSON data from the server
fetch("http://127.0.0.1:5000/api/statistics/submissions/proj2")
   .then(response => response.json())  // Parse the response as JSON
   .then(data => {
      // Extract the error types (keys) and frequencies (values)
      const numberOfSubmissions = Object.keys(data[0]);
      const frequencies = Object.values(data[0]);

      // Create a bar chart using Chart.js
      const ctx = document.getElementById('submissionsChart').getContext('2d');
      const submissionsChart = new Chart(ctx, {
         type: 'bar', // Bar chart type
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
                  title: { text: 'Number of Submissions', display: false },
                  beginAtZero: true, // Make sure the x-axis starts at 0
                  max: Math.ceil(Math.max(...frequencies)*1.1),
                  ticks: {
                     padding: 10, // Ajustar o padding dos ticks para criar espaço
                     stepSize: Math.ceil(Math.max(...frequencies)*1.1/4), // Garantir que as labels do eixo Y sejam inteiros
                  }
               },
               y: { 
                  title: { text: 'Number of Submissions', display: true },
                  beginAtZero: true, // Make sure the x-axis starts at 0
                  grid: {
                     display: false
                  },
                  ticks: {
                     padding: 10, // Ajustar o padding dos ticks para criar espaço
                  },
               }
            },
            plugins: {
               legend: {
                 position: 'top', // Optional: Adjust legend position if needed
                 display: false // Optional: Hide legend if not needed
               }
            }
         }
      });

      const group = Object.keys(data[1])[0];
      const maxSubmissions = data[1][group];

      const ctxx = document.getElementById('groupWithTheMostSubmissions').textContent =`Grupo com mais submissoes: ${group} com ${maxSubmissions} submissoes.`;

   })
   .catch(error => console.error('Error fetching the data:', error));
