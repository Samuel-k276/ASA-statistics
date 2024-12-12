let resultsDistributionChart;

function getBiggestResultForGroup(data, proj) {
   const deliveries = data[proj];
   let results = {};
   deliveries.forEach(row => {
      if (row.group in results) {
         results[row.group] = Math.max(results[row.group], parseInt(row.result));
      } else {
         results[row.group] = parseInt(row.result);
      }
   }
   );
   return results;
}

function getResultsDistributionChart(data, proj) {
   const biggestByGroup = getBiggestResultForGroup(data, proj);
   let results = {};
   for (let i = 0; i <= 17; i++) {
      results[i] = 0;
   }
   for (const group in biggestByGroup) {
      results[Math.round(biggestByGroup[group]/100)] += 1;
   }
   return results;
}

function fetchAndDisplayResultsDistribution(proj) {
   fetch("http://127.0.0.1:5000/api/statistics/raw") 
      .then(response => response.json())
      .then(data => {
         const results = getResultsDistributionChart(data, proj);

         const labels = Array.from({ length: 18 }, (_, i) => i.toString())
         const values = Object.values(results);

         const ctx = document.getElementById('resultsDistributionChart').getContext('2d');

         if (resultsDistributionChart) {
            resultsDistributionChart.destroy();
         }

         resultsDistributionChart = new Chart(ctx, {
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
                   grid: { display: false },
                   ticks: {
                     beginAtZero: true // Garante que o eixo X começa no 0
                   }
                 },
                 y: { beginAtZero: true }
               },
               plugins: { legend: { display: false } }
            }
         });
      })
      .catch(error => console.error('Error fetching data:', error));
}



document.querySelectorAll('.project').forEach(div => {
   const param = div.dataset.param;
   fetchAndDisplayResultsDistribution(param);
});
