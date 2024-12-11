function getDeliveriesByTime(data, proj) {
   d = data[proj];
   let time = {};
   d.forEach(row => {
      t = timeToPoint(row.time);
      if (t in time) {
         time[t] += 1;
      } else {
         time[t] = 1;
      }
   });
   return time;
}

function timeToPoint(time) {
   const [hours, minutes, seconds] = time.split(':').map(Number);
   return hours;
}

// Criar um grafico de barras o numero de entregas por tempo
function deliveryByTime(proj) {
   // Fetch the JSON data from the server
   fetch("http://127.0.0.1:5000/api/statistics/raw") 
      .then(response => response.json())  // Parse the response as JSON
      .then(data => {
         const time = getDeliveriesByTime(data, proj);
         const ctx = document.getElementById('deliveryChart').getContext('2d');

         const labels = Object.keys(time);
         const values = Object.values(time);

         new Chart(ctx, {
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
                  x: {
                     //type: 'linear',
                     title: { text: 'Time', display: false },
                     grid: {
                        display: false
                     },
                  },
                  y: {
                     beginAtZero: true
                  }
               }
            }
          });
      })
      .catch(error => console.error('Error fetching data:', error));
}


document.querySelectorAll('.project').forEach(div => {
   const param = div.dataset.param; // Recupera o valor de 'data-param'
   deliveryByTime(param); // Chama o script com o parâmetro
});
