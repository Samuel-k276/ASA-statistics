// Fetch the JSON data from the server
fetch("http://127.0.0.1:5000/api/statistics/error/proj2")
   .then(response => response.json())  // Parse the response as JSON
   .then(data => {
      // Extract the error types (keys) and frequencies (values)
      const errorTypes = Object.keys(data);
      const frequencies = Object.values(data);

      // Create a bar chart using Chart.js
      const ctx = document.getElementById('errorChart').getContext('2d');
      const errorChart = new Chart(ctx, {
         type: 'bar', // Bar chart type
         data: {
            labels: errorTypes,  // Error types on the x-axis
            datasets: [{
               label: 'Error Frequency',  // Dataset label
               data: frequencies,        // Frequencies of the errors
               backgroundColor: 'skyblue', // Bar color
               borderColor: 'blue',
               borderWidth: 1
            }]
         },
         options: {
            responsive: true,
            scales: {
               x: { 
                  title: { text: 'Error Type', display: false },
                  grid: {
                     display: false
                  },
               },
               y: { 
                  title: { text: 'Frequency', display: true },
                  beginAtZero: true,
                  max: Math.ceil(Math.max(...frequencies)*1.1),
                  ticks: {
                     padding: 10, // Ajustar o padding dos ticks para criar espaço
                     stepSize: Math.ceil(Math.max(...frequencies)*1.1/4), // Garantir que as labels do eixo Y sejam inteiros
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

      const maxValue = Math.max(...frequencies)
      const mostCommonError = errorTypes.find(key => data[key] === maxValue);

      const ctxx = document.getElementById('errorThatTerroziedTheMostGroups').textContent =`Erro que aterrorizou mais grupos: "${mostCommonError}" com ${maxValue} incidencias.`;
   })
   .catch(error => console.error('Error fetching the data:', error));
