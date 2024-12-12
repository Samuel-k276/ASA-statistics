let resultsByTimeChart;

function getResultsByTime(data, proj) {
   const deliveries = data[proj];
   let rawResults = {};
   deliveries.forEach(row => {
      const time = timeToPoint(row.time);
      if (time in rawResults) {
         rawResults[time] += parseInt(row.result);
      } else {
         rawResults[time] = parseInt(row.result);
      }
   });
   const frequencies = getDeliveriesByTime(data, proj);
   let results = {};
   for (const time in frequencies) {
      results[time] = Math.round(rawResults[time] / frequencies[time]);
   }
   return results;
}

function resultsByTime(proj) {
   fetch("http://127.0.0.1:5000/api/statistics/raw") 
      .then(response => response.json())
      .then(data => {
         const time = getResultsByTime(data, proj);
         const ctx = document.getElementById('resultsTimeChart').getContext('2d');

         const labels = Object.keys(time);
         const values = Object.values(time);
         
         if (resultsByTimeChart) {
            resultsByTimeChart.destroy();
         }

         resultsByTimeChart = new Chart(ctx, {
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
                  y: { 
                     beginAtZero: true,
                     ticks: {
                        stepSize: 340
                     },
                     max: 1700
                  }
               },
               plugins: { legend: { display: false } }
            }
          });
      })
      .catch(error => console.error('Error fetching data:', error));
}


document.querySelectorAll('.project').forEach(div => {
   const param = div.dataset.param;
   resultsByTime(param);
});
