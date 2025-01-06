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
   fetch("https://asa-statistics.onrender.com/api/statistics/raw") 
      .then(response => response.json())
      .then(data => {

         const group = findGroupWithLastFirstSubmission(data[proj]);
         const time = group.time;
         const groupId = group.group;

         document.getElementById('lastFirstSubmission' + proj).textContent =`Grupo que deixa tudo para a última: ${groupId} entregou a ${time}.`;

      })
      .catch(error => console.error('Error fetching the data:', error));
}

