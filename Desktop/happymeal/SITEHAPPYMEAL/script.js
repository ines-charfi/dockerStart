document.addEventListener("DOMContentLoaded", () => {
    const recettesContainer = document.getElementById("recettes-container");
    const searchInput = document.getElementById("search");
    const suggestionsDiv = document.getElementById("suggestions");

    fetch("data/recettes.json")
        .then(response => response.json())
        .then(recettes => {
            afficherRecettesAleatoires(recettes);
            searchInput.addEventListener("input", () => rechercherRecette(recettes));
        })
        .catch(error => console.error("Erreur de chargement des recettes :", error));

    function afficherRecettesAleatoires(recettes) {
        recettesContainer.innerHTML = "";
        let recettesAleatoires = recettes.sort(() => 0.5 - Math.random()).slice(0, 3);
        recettesAleatoires.forEach(recette => {
            const recetteCard = document.createElement("div");
            recetteCard.classList.add("recette-card");
            recetteCard.innerHTML = `
                <img src="assets/${recette.image}" alt="${recette.nom}">
                <h3>${recette.nom}</h3>
                <button onclick="voirDetails(${recette.id})">Voir la recette</button>
            `;
            recettesContainer.appendChild(recetteCard);
        });
    }

    function rechercherRecette(recettes) {
        const query = searchInput.value.toLowerCase();
        suggestionsDiv.innerHTML = "";
        if (query.length < 2) return;

        const suggestions = recettes.filter(r => r.nom.toLowerCase().includes(query) || r.ingredients.some(i => i.toLowerCase().includes(query)));
        suggestions.forEach(recette => {
            const suggestionItem = document.createElement("div");
            suggestionItem.classList.add("suggestion-item");
            suggestionItem.textContent = recette.nom;
            suggestionItem.addEventListener("click", () => voirDetails(recette.id));
            suggestionsDiv.appendChild(suggestionItem);
        });
    }
});

function voirDetails(id) {
    window.location.href = `details.html?id=${id}`;
}
