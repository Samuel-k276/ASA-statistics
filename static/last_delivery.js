// Fetch the JSON data from the server
fetch("http://127.0.0.1:5000/api/statistics/last")
   .then(response => response.json())  // Parse the response as JSON
   .then(data => {
      // Extract the error types (keys) and frequencies (values)
      const group = data['group'];
      const time = data['time'];

      const ctxx = document.getElementById('lastFirstSubmission').textContent =`Grupo que entregou mais tarde: ${group} em ${time}.`;

   })
   .catch(error => console.error('Error fetching the data:', error));
