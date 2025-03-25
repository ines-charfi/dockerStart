document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const recettes = data.recettes;
            const randomRecettes = [];
            while (randomRecettes.length < 3) {
                const randomIndex = Math.floor(Math.random() * recettes.length);
                if (!randomRecettes.includes(recettes[randomIndex])) {
                    randomRecettes.push(recettes[randomIndex]);
                }
            }
            const recettesContainer = document.getElementById('recettes-aleatoires');
            randomRecettes.forEach(recette => {
                const recetteDiv = document.createElement('div');
                recetteDiv.classList.add('recipe', 'col-md-4');
                recetteDiv.innerHTML = `
                    <h3>${recette.nom}</h3>
                    <img src="images/${recette.nom.replace(/\s+/g, '_').toLowerCase()}.jpg" alt="${recette.nom}">
                    <p>${recette.categorie}</p>
                    <p>Temps de préparation: ${recette.temps_preparation}</p>
                    <button class="btn btn-info" onclick="window.location.href='recettes.html#${recette.nom}'">Voir la recette</button>
                `;
                recettesContainer.appendChild(recetteDiv);
            });
        });
});