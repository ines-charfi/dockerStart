document.addEventListener("DOMContentLoaded", () => {
    const recettesContainer = document.getElementById("recettes-container");
    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");
    const pageNum = document.getElementById("page-num");
    
    let recettes = [];
    let currentPage = 1;
    const recettesParPage = 9;

    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            recettes = data;
            afficherRecettes();
        })
        .catch(error => console.error("Erreur de chargement des recettes :", error));

    function afficherRecettes() {
        recettesContainer.innerHTML = "";
        let debut = (currentPage - 1) * recettesParPage;
        let fin = debut + recettesParPage;
        let recettesPage = recettes.slice(debut, fin);
        
        recettesPage.forEach(recette => {
            const recetteCard = document.createElement("div");
            recetteCard.classList.add("recette-card");
            recetteCard.innerHTML = `
                <img src="assets/${recette.image}" alt="${recette.nom}">
                <h3>${recette.nom}</h3>
                <button onclick="voirDetails(${recette.id})">Voir la recette</button>
            `;
            recettesContainer.appendChild(recetteCard);
        });
        pageNum.textContent = currentPage;
        prevButton.disabled = currentPage === 1;
        nextButton.disabled = fin >= recettes.length;
    }

    prevButton.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            afficherRecettes();
        }
    });

    nextButton.addEventListener("click", () => {
        if ((currentPage * recettesParPage) < recettes.length) {
            currentPage++;
            afficherRecettes();
        }
    });
});

function voirDetails(id) {
    window.location.href = `details.html?id=${id}`;
}
