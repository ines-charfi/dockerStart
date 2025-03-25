document.addEventListener('DOMContentLoaded', function() {
    loadRecipes().then(() => {
        displayRandomRecipes();
        setupSearch('search-input', 'autocomplete-results');
    });
});

function displayRandomRecipes() {
    const container = document.getElementById('random-recipes');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Sélectionner 6 recettes aléatoires
    const shuffled = [...recipes].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 6);
    
    selected.forEach(recipe => {
        const isFavorite = favorites.some(fav => fav.nom === recipe.nom);
        container.appendChild(createRecipeCard(recipe, isFavorite));
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
                const isNowFavorite = toggleFavorite(recipe);
                this.classList.toggle('active', isNowFavorite);
            }
        });
    });
}