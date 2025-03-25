document.addEventListener("DOMContentLoaded", () => {
    const favorisContainer = document.getElementById("favoris-container");
    const clearFavorisButton = document.getElementById("clear-favoris");
    let favoris = JSON.parse(localStorage.getItem("favoris")) || [];

    if (favoris.length === 0) {
        favorisContainer.innerHTML = "<p>Aucune recette en favoris.</p>";
        return;
    }

    fetch("data.json")
        .then(response => response.json())
        .then(recettes => {
            const recettesFavoris = recettes.filter(r => favoris.includes(r.id));
            afficherFavoris(recettesFavoris);
        })
        .catch(error => console.error("Erreur de chargement des recettes :", error));

    function afficherFavoris(recettesFavoris) {
        favorisContainer.innerHTML = "";
        recettesFavoris.forEach(recette => {
            const recetteCard = document.createElement("div");
            recetteCard.classList.add("recette-card");
            recetteCard.innerHTML = `
                <img src="assets/${recette.image}" alt="${recette.nom}">
                <h3>${recette.nom}</h3>
                <button onclick="voirDetails(${recette.id})">Voir la recette</button>
                <button onclick="supprimerFavori(${recette.id})">❌ Supprimer</button>
            `;
            favorisContainer.appendChild(recetteCard);
        });
    }

    clearFavorisButton.addEventListener("click", () => {
        localStorage.removeItem("favoris");
        favorisContainer.innerHTML = "<p>Aucune recette en favoris.</p>";
    });
});

function voirDetails(id) {
    window.location.href = `details.html?id=${id}`;
}

function supprimerFavori(id) {
    let favoris = JSON.parse(localStorage.getItem("favoris")) || [];
    favoris = favoris.filter(fav => fav !== id);
    localStorage.setItem("favoris", JSON.stringify(favoris));
    location.reload();
}
