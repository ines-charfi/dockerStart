document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const recetteId = params.get("id");
    const recetteDetails = document.getElementById("recette-details");

    if (!recetteId) {
        recetteDetails.innerHTML = "<p>Aucune recette trouvée.</p>";
        return;
    }

    fetch("data.json")
        .then(response => response.json())
        .then(recettes => {
            const recette = recettes.find(r => r.id == recetteId);
            if (!recette) {
                recetteDetails.innerHTML = "<p>Recette introuvable.</p>";
                return;
            }
            afficherRecette(recette);
        })
        .catch(error => console.error("Erreur de chargement des recettes :", error));

    function afficherRecette(recette) {
        recetteDetails.innerHTML = `
            <h2>${recette.nom}</h2>
            <img src="assets/${recette.image}" alt="${recette.nom}">
            <p><strong>Durée :</strong> ${recette.duree}</p>
            <h3>Ingrédients</h3>
            <ul>
                ${recette.ingredients.map(ing => `<li>${ing} <button onclick="ajouterCourse('${ing}')">🛒</button></li>`).join('')}
            </ul>
            <h3>Étapes</h3>
            <ol>
                ${recette.etapes.map(etape => `<li>${etape}</li>`).join('')}
            </ol>
            <button onclick="ajouterFavori(${recette.id})">⭐ Ajouter aux Favoris</button>
        `;
    }
});

function ajouterCourse(ingredient) {
    let courses = JSON.parse(localStorage.getItem("courses")) || [];
    if (!courses.includes(ingredient)) {
        courses.push(ingredient);
        localStorage.setItem("courses", JSON.stringify(courses));
    }
    alert("Ajouté à la liste de courses !");
}

function ajouterFavori(id) {
    let favoris = JSON.parse(localStorage.getItem("favoris")) || [];
    if (!favoris.includes(id)) {
        favoris.push(id);
        localStorage.setItem("favoris", JSON.stringify(favoris));
    }
    alert("Ajouté aux favoris !");
}
