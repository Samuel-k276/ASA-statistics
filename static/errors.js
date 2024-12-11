function getErrors(data, proj) {
   d = data[proj];
   let errors = {};
   d.forEach(row => {
      if (row.errors in errors) {
         errors[row.errors] += 1;
      } else {
         errors[row.errors] = 1;
      }
   });
   return errors;
}

function fetchAndDisplayErrors(param) {
   // Fetch the JSON data from the server
   fetch("http://127.0.0.1:5000/api/statistics/raw")
      .then(response => response.json())  // Parse the response as JSON
      .then(data => {
         // Parse the data to get the errors
         const proj = param;
         const errors = getErrors(data, proj);

         // Extract the error types (keys) and frequencies (values)
         const errorTypes = Object.keys(errors);
         const frequencies = Object.values(errors);

         // Create a bar chart using Chart.js
         const ctx = document.getElementById('errorChart').getContext('2d');
         new Chart(ctx, {
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
         const mostCommonError = errorTypes.find(key => errors[key] === maxValue);
         document.getElementById('errorThatTerroziedTheMostGroups').textContent =`Erro que aterrorizou mais grupos: "${mostCommonError}" com ${maxValue} incidencias.`;
      })
      .catch(error => console.error('Error fetching the data:', error));
}

document.querySelectorAll('.project').forEach(div => {
   const param = div.dataset.param; // Recupera o valor de 'data-param'
   fetchAndDisplayErrors(param); // Chama o script com o div e o parâmetro
});

