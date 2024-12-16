let resultsByTimeChart;

function getResultsByTime(data, proj) {
   const deliveries = data[proj];
   let rawResults = {};
   let last_time = 0;
   deliveries.forEach(row => {
      const time = timeToPoint(row.time);
      if (time in rawResults) {
         rawResults[time] += parseInt(row.result);
      } else {
         rawResults[time] = parseInt(row.result);
         last_time = time;
      }
   });
   for (let i = 0; i < last_time; i++) {
      if (!(i in rawResults)) {
         rawResults[i] = 0;
      }
   }

   const frequencies = getDeliveriesByTime(data, proj);
   let results = {};
   for (const time in frequencies) {
      if (frequencies[time] === 0) {
         results[time] = 0;
         continue;
      }
      results[time] = Math.round(rawResults[time] / frequencies[time]);
   }
   return results;
}

function resultsByTime(proj) {
   fetch("https://asa-statistics.onrender.com/api/statistics/raw") 
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
                  label: 'Average Result',
                  data: values,
                  backgroundColor: 'rgba(75, 192, 192, 0.2)',
                  borderColor: 'rgba(75, 192, 192, 1)',
                  borderWidth: 1
               }]
            },
            options: {
               scales: {
                  x: { 
                     type: "linear",
                     grid: { display: false },
                     ticks: {
                        stepSize: 1, // Garante espaçamento regular
                     }
                  },
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
