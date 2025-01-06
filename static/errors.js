let errorChart;

function getErrors(data, proj) {
   const deliveries = data[proj];
   let errors = {};
   deliveries.forEach(row => {
      if (row.errors === "") {
         return;
      }
      if (row.errors in errors) {
         errors[row.errors] += 1;
      } else {
         errors[row.errors] = 1;
      }
   });
   return errors;
}

function getMostCommonError(errors) {
   const errorTypes = Object.keys(errors);
   const frequencies = Object.values(errors);
   const maxValue = Math.max(...frequencies)
   const mostCommonError = errorTypes.find(key => errors[key] === maxValue);
   return [mostCommonError, maxValue];
}

function fetchAndDisplayErrors(proj) {
   fetch("https://asa-statistics.onrender.com/api/statistics/raw") 
      .then(response => response.json())
      .then(data => {

         const errors = getErrors(data, proj);

         const errorTypes = Object.keys(errors);
         const frequencies = Object.values(errors);

         const ctx = document.getElementById('errorChart').getContext('2d');

         if (errorChart) {
            errorChart.destroy();
         }

         errorChart = new Chart(ctx, {
            type: 'bar',
            data: {
               labels: errorTypes,
               datasets: [{
                  label: 'Error Frequency', 
                  data: frequencies,        
                  backgroundColor: 'skyblue',
                  borderColor: 'blue',
                  borderWidth: 1
               }]
            },
            options: {
               responsive: true,
               scales: {
                  x: { grid: { display: false }, },
                  y: { 
                     title: { text: 'Frequency', display: true },
                     beginAtZero: true,
                     max: Math.ceil(Math.max(...frequencies)*1.1/4)*4,
                     ticks: {
                        padding: 10, // Ajustar o padding dos ticks para criar espaço
                        stepSize: Math.ceil(Math.max(...frequencies)*1.1/4), // Garantir que as labels do eixo Y sejam inteiros
                     },
                  }
               },
               plugins: { legend: { display: false } }
            }
         });

         const [mostCommonError, maxValue] = getMostCommonError(errors);
         document.getElementById('errorThatTerroziedTheMostGroups').textContent =`Erro que aterrorizou mais grupos: "${mostCommonError}" com ${maxValue} incidencias.`;
      })
      .catch(error => console.error('Error fetching the data:', error));
}
