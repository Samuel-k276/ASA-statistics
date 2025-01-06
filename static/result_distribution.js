let resultsDistributionChart;


function getBiggestResultForGroup(data, proj) {
   const deliveries = data[proj];
   let results = {};
   let notSubmitted = [];
   for (let i = 1; i <= 134; i++)
      notSubmitted.push(`al${i.toString().padStart(3, '0')}`);

   for (let i = 1; i <= 74; i++)
      notSubmitted.push(`tg${i.toString().padStart(3, '0')}`);


   deliveries.forEach(row => {
      if (row.group in results) {
         results[row.group] = Math.max(results[row.group], parseInt(row.result));
      } else {
         results[row.group] = parseInt(row.result);
         notSubmitted = notSubmitted.filter(e => e !== row.group);
      }
   });

   notSubmitted.forEach(e => results[e] = "Not Submitted");

   return results;
}

function getResultsDistributionChart(data, proj) {
   const biggestByGroup = getBiggestResultForGroup(data, proj);
   let results = {};
   results["NA"] = 0;
   for (let i = 0; i <= 17; i++) {
      results[i] = 0;
   }
   for (const group in biggestByGroup) {
      if (biggestByGroup[group] === "Not Submitted") {
         results["NA"] += 1;
         continue;
      }
      results[Math.floor(biggestByGroup[group]/100)] += 1;
   }
   return results;
}

function getAverageResult(results) {
   let total = 0;
   let count = 0;
   for (const result in results) {
      if (result === "NA") {
         continue
      }
      total += parseInt(result) * results[result];
      count += results[result];
   }
   return (total / count);
}

function getMedianResult(results) {
   let total = [];
   let count = 0;
   for (i = 0; i <= 17; i++) {
      for (j = 0; j < results[i]; j++)
         total.push(i);
      count += results[i];
   }
   if (count % 2 === 0) {
      return (total[count/2] + total[count/2 - 1]) / 2;
   } else {
      return total[Math.floor(count/2)];
   }
}


function fetchAndDisplayResultsDistribution(proj) {
   fetch("https://asa-statistics.onrender.com/api/statistics/raw") 
      .then(response => response.json())
      .then(data => {
         const results = getResultsDistributionChart(data, proj);

         const labels = ["NA", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17"];
         const values = Object.values(results);
         values.unshift(values.pop());
         const average = getAverageResult(results);
         const median = getMedianResult(results);

         const ctx = document.getElementById('resultsDistributionChart').getContext('2d');

         if (resultsDistributionChart) {
            resultsDistributionChart.destroy();
         }

         resultsDistributionChart = new Chart(ctx, {
            type: 'bar',
            data: {
               labels: labels,
               datasets: [{
                 label: 'Number of Groups',
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
            },
            plugins: [{
               id: 'AverageAndMedianLines',
               afterDraw(chart) {
                  const ctx = chart.ctx;
                  const xScale = chart.scales.x;
                  const yScale = chart.scales.y;

                  const verticalLines = [
                     { xValue: average, color: 'rgba(255, 99, 132, 0.8)', label: 'Média' },
                     { xValue: median, color: 'rgba(54, 162, 235, 0.8)', label: 'Mediana' }
                  ];

                  // Configurações da linha
                  ctx.save();
                  ctx.setLineDash([5, 5]);
                  verticalLines.forEach(line => {
                     const xPixel = xScale.getPixelForValue(line.xValue);

                     // Desenha a linha vertical
                     ctx.beginPath();
                     ctx.moveTo(xPixel, yScale.top);
                     ctx.lineTo(xPixel, yScale.bottom);
                     ctx.lineWidth = 2;
                     ctx.strokeStyle = line.color;
                     ctx.stroke();

                     // Adiciona a legenda próxima à linha
                     ctx.font = '12px Arial';
                     ctx.fillStyle = line.color;
                     ctx.textAlign = 'center';

                     // Posição do texto (ajustado para não sair da área do gráfico)
                     const textY = Math.max(yScale.top - 10, 10); // 10px mínimo para não ficar fora
                     ctx.fillText(line.label, xPixel, textY); // Texto acima da linha
                  });
                  ctx.restore();
               }
            }]
         });
      })
      .catch(error => console.error('Error fetching data:', error));
}