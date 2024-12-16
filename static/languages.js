let languagesPieChart;

function getLanguages(data, proj) {
   const deliveries = data[proj];
   let languages = {};
   deliveries.forEach(row => {
      if (row.language in languages) {
         languages[row.language] += 1;
      } else {
         languages[row.language] = 1;
      }
   });
   return languages;
}

// Criar um grafico de barras o numero de entregas por linguagem
function deliveryByLanguage(proj) {
   // Fetch the JSON data from the server
   fetch("https://asa-statistics.onrender.com/api/statistics/raw") 
      .then(response => response.json())  // Parse the response as JSON
      .then(data => {
         const laguages = getLanguages(data, proj);
         const ctx = document.getElementById('languagesPieChart').getContext('2d');

         const labels = Object.keys(laguages);
         const values = Object.values(laguages);
         
         if (languagesPieChart) {
            languagesPieChart.destroy();
         }

         languagesPieChart = new Chart(ctx, {
            type: 'pie',
            data: {
               labels: labels,
               datasets: [{
                  label: 'Language Frequency',
                  data: values,
                  backgroundColor: [
                     'red',
                     'blue',
                     'green',
                     'yellow',
                     'purple',
                     'orange',
                     'pink',
                     'brown',
                     'gray',
                     'black',
                  ],
                  borderColor: 'black',
                  borderWidth: 1
               }]
            },
            options: {
               responsive: true,
               legend: {
                  display: true,
                  position: 'top',
                  labels: {
                     font: {
                        size: 14
                     },
                     color: '#000',
                     padding: 20
                  }
               },
               plugins: {
                  title: {
                     display: true,
                     text: 'Deliveries by Language'
                  }
               }
            }
         });
         

         
      })
      .catch(error => console.error('Error fetching data:', error));
}


document.querySelectorAll('.project').forEach(div => {
   const param = div.dataset.param; // Recupera o valor de 'data-param'
   deliveryByLanguage(param); // Chama o script com o parâmetro
});
