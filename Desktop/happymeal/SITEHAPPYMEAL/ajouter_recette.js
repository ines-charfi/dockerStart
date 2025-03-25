document.getElementById('recette-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const nom = document.getElementById('nom').value;
    const categorie = document.getElementById('categorie').value;
    const temps_preparation = document.getElementById('temps_preparation').value;
    const ingredients = document.getElementById('ingredients').value.split(',').map(ingredient => {
        return { nom: ingredient.trim(), quantite: '1' }; // Quantité par défaut à 1
    });
    const etapes = document.getElementById('etapes').value.split(';').map(etape => etape.trim());

    const nouvelleRecette = {
        nom,
        categorie,
        temps_preparation,
        ingredients,
        etapes
    };

    // Récupérer les recettes existantes
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            data.recettes.push(nouvelleRecette);
            // Enregistrer les nouvelles recettes dans le localStorage ou un fichier
            localStorage.setItem('recettes', JSON.stringify(data.recettes));
            alert('Recette ajoutée avec succès !');
            // Rediriger vers la page des recettes
            window.location.href = 'recettes.html';
        })
        .catch(error => console.error('Erreur lors de l\'ajout de la recette:', error));
});