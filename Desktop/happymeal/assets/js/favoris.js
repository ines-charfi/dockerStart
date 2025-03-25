document.addEventListener('DOMContentLoaded', function() {
    loadRecipes().then(() => {
        displayFavorites();
    });
});

function displayFavorites() {
    const container = document.getElementById('favorites-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (favorites.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="far fa-heart fa-4x mb-3 text-muted"></i>
                <h3 class="text-muted">Aucune recette favorite</h3>
                <p>Ajoutez des recettes à vos favoris en cliquant sur l'icône cœur</p>
                <a href="touteslesrecettes.html" class="btn btn-primary">Parcourir les recettes</a>
            </div>
        `;
        return;
    }
    
    favorites.forEach(recipe => {
        container.appendChild(createRecipeCard(recipe, true));
    });
    
    // Gérer les événements
    document.querySelectorAll('.view-recipe').forEach(btn => {
        btn.addEventListener('click', function() {
            const recipe = JSON.parse(this.getAttribute('data-recipe'));
            showRecipeModal(recipe);
        });
    });
    
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const recipeName = this.getAttribute('data-recipe-id');
            const recipe = recipes.find(r => r.nom === recipeName);
            if (recipe) {
                toggleFavorite(recipe);
                displayFavorites(); // Recharger la liste après suppression
            }
        });
    });
}