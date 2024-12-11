function findGroupWithLastFirstSubmission(data) {
   const orderedData = orderDataByTime(data);
   const unique = uniqueGroup(orderedData);
   return unique[unique.length - 1];
}

function orderDataByTime(data){
   return data.sort((a, b) => {
      return timeToInt(a.time) - timeToInt(b.time);
   });
}


function fetchAndDisplayTheChillestGroup(proj) {
   // Fetch the JSON data from the server
   fetch("http://127.0.0.1:5000/api/statistics/raw")
      .then(response => response.json())  // Parse the response as JSON
      .then(data => {
         // Extract the error types (keys) and frequencies (values)
         data = data[proj];
         const group = findGroupWithLastFirstSubmission(data);
         const time = group.time;
         const groupId = group.group;

         const ctxx = document.getElementById('lastFirstSubmission').textContent =`Grupo que deixa tudo para a última: ${groupId} entregou a ${time}.`;

      })
      .catch(error => console.error('Error fetching the data:', error));
}


document.querySelectorAll('.project').forEach(div => {
   const param = div.dataset.param; // Recupera o valor de 'data-param'
   fetchAndDisplayTheChillestGroup(param); // Chama o script com o parâmetro
});