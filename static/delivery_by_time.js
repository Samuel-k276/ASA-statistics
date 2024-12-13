let deliveriesChart;

function getDeliveriesByTime(data, proj) {
   const deliveries = data[proj];
   let times = {};
   deliveries.forEach(row => {
      const time = timeToPoint(row.time);
      if (time === null)
         return;
      if (time in times) {
         times[time] += 1;
      } else {
         times[time] = 1;
      }
   });
   return times;
}

function timeToPoint(time) {
   if (!time || typeof time !== 'string' || !time.includes(':'))
      return null;
   const [hours] = time.split(':').map(Number);
   return hours;
}

// Criar um grafico de barras o numero de entregas por tempo
function deliveryByTime(proj) {
   // Fetch the JSON data from the server
   fetch("https://asa-statistics.onrender.com/api/statistics/raw") 
      .then(response => response.json())  // Parse the response as JSON
      .then(data => {
         const time = getDeliveriesByTime(data, proj);
         const ctx = document.getElementById('deliveryChart').getContext('2d');

         const labels = Object.keys(time);
         const values = Object.values(time);

         if (deliveriesChart) {
            deliveriesChart.destroy();
         }

         deliveriesChart = new Chart(ctx, {
            type: 'bar',
            data: {
               labels: labels,
               datasets: [{
                  label: 'Number of Deliveries',
                  data: values,
                  backgroundColor: 'rgba(75, 192, 192, 0.2)',
                  borderColor: 'rgba(75, 192, 192, 1)',
                  borderWidth: 1
               }]
            },
            options: {
               scales: {
                  x: { grid: { display: false } },
                  y: { beginAtZero: true }
               },
               plugins: { legend: { display: false } }
            }
          });
      })
      .catch(error => console.error('Error fetching data:', error));
}


document.querySelectorAll('.project').forEach(div => {
   const param = div.dataset.param; // Recupera o valor de 'data-param'
   deliveryByTime(param); // Chama o script com o parâmetro
});
