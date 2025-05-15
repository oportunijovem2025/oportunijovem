function searchJobs() {
  const searchQuery = document.getElementById("searchInput").value;
  const resultsDiv = document.getElementById("results");
  const searchContainer = document.getElementById("searchContainer");

  if (!searchQuery.trim()) {
    resultsDiv.innerHTML = "Por favor, insira um termo de busca.";
    return;
  }

  // Move a barra para o topo ao buscar
  


  const appId = '42bb5870';
  const appKey = '78a6d4685d82eb1ef8921d56118bf10d';
  const apiUrl = `https://api.adzuna.com/v1/api/jobs/br/search/1?app_id=${appId}&app_key=${appKey}&results_per_page=10&what=${searchQuery}&where=São+Luís%2C+MA`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      resultsDiv.innerHTML = "";

      if (data.results.length > 0) {
        data.results.forEach(job => {
          const jobElement = document.createElement("div");
          jobElement.classList.add("job-item");
          jobElement.innerHTML = `
            <h3>${job.title}</h3>
            <p><strong>Empresa:</strong> ${job.company.display_name}</p>
            <p><strong>Local:</strong> ${job.location.display_name}</p>
            <a href="${job.redirect_url}" target="_blank">Ver Detalhes</a>
          `;
          resultsDiv.appendChild(jobElement);
        });
      } else {
        resultsDiv.innerHTML = "Nenhum emprego encontrado.";
      }
    })
    .catch(error => {
      resultsDiv.innerHTML = "Erro ao buscar empregos.";
      console.error(error);
    });
}
