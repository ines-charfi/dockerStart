document.addEventListener('DOMContentLoaded', async function() {
    const allRecipesContainer = document.getElementById('all-recipes');
    const paginationContainer = document.getElementById('pagination');
    const recipes = await loadRecipes();
    const recipesPerPage = 9;
    let currentPage = 1;

    function displayRecipes(page) {
        const start = (page - 1) * recipesPerPage;
        const end = start + recipesPerPage;
        const paginatedRecipes = recipes.slice(start, end);

        allRecipesContainer.innerHTML = '';
        
        if (paginatedRecipes.length === 0) {
            allRecipesContainer.innerHTML = `
                <div class="col-12 text-center py-5">
                    <i class="fas fa-utensils fa-5x mb-3" style="color: #6c757d;"></i>
                    <h3>Aucune recette trouvée</h3>
                </div>
            `;
            return;
        }

        paginatedRecipes.forEach(recipe => {
            const col = document.createElement('div');
            col.className = 'col-md-4 mb-4';

            const card = document.createElement('div');
            card.className = 'card recipe-card h-100';

            // Image de la recette
            const img = document.createElement('img');
            img.className = 'card-img-top';
            img.src = `../images/${recipe.nom.toLowerCase().replace(/\s+/g, '-')}.jpg`;
            img.alt = recipe.nom;
            img.onerror = () => { img.src = '../images/default-recipe.jpg'; };

            const cardBody = document.createElement('div');
            cardBody.className = 'card-body';

            const title = document.createElement('h5');
            title.className = 'card-title';
            title.textContent = recipe.nom;

            const category = document.createElement('span');
            category.className = 'badge bg-primary mb-2';
            category.textContent = recipe.categorie;

            const time = document.createElement('p');
            time.className = 'card-text';
            time.innerHTML = `<i class="fas fa-clock"></i> ${recipe.temps_preparation}`;

            const btn = document.createElement('button');
            btn.className = 'btn btn-danger';
            btn.textContent = 'Voir la recette';
            btn.onclick = () => displayRecipeModal(recipe);

            // Bouton favori
            const favorites = loadFromLocalStorage(STORAGE_KEYS.FAVORITES);
            const isFavorite = favorites.some(fav => fav.nom === recipe.nom);
            const favoriteBtn = document.createElement('button');
            favoriteBtn.className = isFavorite 
                ? 'favorite-btn active' 
                : 'favorite-btn';
            favoriteBtn.innerHTML = isFavorite 
                ? '<i class="fas fa-heart"></i>' 
                : '<i class="far fa-heart"></i>';
            favoriteBtn.onclick = (e) => {
                e.stopPropagation();
                toggleFavorite(recipe, favoriteBtn);
            };

            cardBody.appendChild(title);
            cardBody.appendChild(category);
            cardBody.appendChild(time);
            cardBody.appendChild(btn);

            card.appendChild(img);
            card.appendChild(favoriteBtn);
            card.appendChild(cardBody);
            col.appendChild(card);

            allRecipesContainer.appendChild(col);
        });
    }

    function setupPagination() {
        const pageCount = Math.ceil(recipes.length / recipesPerPage);
        paginationContainer.innerHTML = '';

        if (pageCount <= 1) return;

        // Bouton Précédent
        const prevLi = document.createElement('li');
        prevLi.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
        prevLi.innerHTML = `<a class="page-link" href="#">&laquo;</a>`;
        prevLi.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentPage > 1) {
                currentPage--;
                displayRecipes(currentPage);
                setupPagination();
            }
        });
        paginationContainer.appendChild(prevLi);

        // Numéros de page
        for (let i = 1; i <= pageCount; i++) {
            const li = document.createElement('li');
            li.className = `page-item ${i === currentPage ? 'active' : ''}`;
            li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
            li.addEventListener('click', (e) => {
                e.preventDefault();
                currentPage = i;
                displayRecipes(currentPage);
                setupPagination();
            });
            paginationContainer.appendChild(li);
        }

        // Bouton Suivant
        const nextLi = document.createElement('li');
        nextLi.className = `page-item ${currentPage === pageCount ? 'disabled' : ''}`;
        nextLi.innerHTML = `<a class="page-link" href="#">&raquo;</a>`;
        nextLi.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentPage < pageCount) {
                currentPage++;
                displayRecipes(currentPage);
                setupPagination();
            }
        });
        paginationContainer.appendChild(nextLi);
    }

    // Initialisation
    displayRecipes(currentPage);
    setupPagination();
});