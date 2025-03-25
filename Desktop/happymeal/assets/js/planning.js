document.addEventListener('DOMContentLoaded', function() {
    loadRecipes().then(() => {
        displayMealPlanning();
        
        document.getElementById('generate-planning')?.addEventListener('click', generatePlanningPDF);
        document.getElementById('clear-planning')?.addEventListener('click', clearPlanning);
    });
});

function displayMealPlanning() {
    const container = document.getElementById('planning-table');
    if (!container) return;
    
    container.innerHTML = '';
    
    const days = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
    
    days.forEach(day => {
        const row = document.createElement('tr');
        
        // Jour
        const dayCell = document.createElement('td');
        dayCell.textContent = day.charAt(0).toUpperCase() + day.slice(1);
        row.appendChild(dayCell);
        
        // Midi
        const lunchCell = document.createElement('td');
        lunchCell.className = 'planning-cell';
        if (mealPlanning[day]?.midi) {
            lunchCell.appendChild(createPlanningRecipe(day, 'midi', mealPlanning[day].midi));
        } else {
            lunchCell.appendChild(createAddButton(day, 'midi'));
        }
        row.appendChild(lunchCell);
        
        // Soir
        const dinnerCell = document.createElement('td');
        dinnerCell.className = 'planning-cell';
        if (mealPlanning[day]?.soir) {
            dinnerCell.appendChild(createPlanningRecipe(day, 'soir', mealPlanning[day].soir));
        } else {
            dinnerCell.appendChild(createAddButton(day, 'soir'));
        }
        row.appendChild(dinnerCell);
        
        container.appendChild(row);
    });
}

function createPlanningRecipe(day, mealType, recipe) {
    const div = document.createElement('div');
    div.className = 'planning-recipe';
    div.innerHTML = `
        <span>${recipe.nom}</span>
        <button class="remove-planning-btn" data-day="${day}" data-meal="${mealType}">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    div.querySelector('.remove-planning-btn').addEventListener('click', function() {
        delete mealPlanning[day][mealType];
        if (Object.keys(mealPlanning[day]).length === 0) {
            delete mealPlanning[day];
        }
        localStorage.setItem('mealPlanning', JSON.stringify(mealPlanning));
        displayMealPlanning();
    });
    
    return div;
}

function createAddButton(day, mealType) {
    const btn = document.createElement('button');
    btn.className = 'add-planning-btn';
    btn.innerHTML = '<i class="fas fa-plus"></i> Ajouter';
    btn.addEventListener('click', () => openRecipeSelectionModal(day, mealType));
    return btn;
}

function openRecipeSelectionModal(day, mealType) {
    const modal = document.getElementById('planningModal');
    if (!modal) return;
    
    document.getElementById('planning-day').value = day;
    document.getElementById('planning-meal').value = mealType;
    
    const favoritesContainer = document.getElementById('favorites-for-planning');
    favoritesContainer.innerHTML = '';
    
    if (favorites.length === 0) {
        favoritesContainer.innerHTML = `
            <div class="col-12 text-center py-3">
                <p>Aucune recette favorite</p>
                <a href="touteslesrecettes.html" class="btn btn-sm btn-primary">Parcourir les recettes</a>
            </div>
        `;
    } else {
        favorites.forEach(recipe => {
            const card = document.createElement('div');
            card.className = 'col-md-6 mb-3';
            card.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${recipe.nom}</h5>
                        <p class="card-text text-muted">${recipe.temps_preparation}</p>
                        <button class="btn btn-sm btn-primary select-recipe" data-recipe='${JSON.stringify(recipe)}'>
                            Sélectionner
                        </button>
                    </div>
                </div>
            `;
            favoritesContainer.appendChild(card);
        });
    }
    
    modal.style.display = 'block';
    
    document.getElementById('closePlanningModal').addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    document.getElementById('cancel-planning').addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    document.querySelectorAll('.select-recipe').forEach(btn => {
        btn.addEventListener('click', function() {
            const recipe = JSON.parse(this.getAttribute('data-recipe'));
            const day = document.getElementById('planning-day').value;
            const meal = document.getElementById('planning-meal').value;
            
            if (!mealPlanning[day]) {
                mealPlanning[day] = {};
            }
            
            mealPlanning[day][meal] = recipe;
            localStorage.setItem('mealPlanning', JSON.stringify(mealPlanning));
            
            modal.style.display = 'none';
            displayMealPlanning();
        });
    });
}

function generatePlanningPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text('Planning des repas', 105, 15, { align: 'center' });
    
    doc.setFontSize(12);
    let y = 30;
    const days = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
    
    days.forEach(day => {
        doc.setFont('helvetica', 'bold');
        doc.text(day.charAt(0).toUpperCase() + day.slice(1) + ':', 20, y);
        doc.setFont('helvetica', 'normal');
        
        if (mealPlanning[day]?.midi) {
            doc.text(`Midi: ${mealPlanning[day].midi.nom}`, 40, y);
            y += 7;
        }
        if (mealPlanning[day]?.soir) {
            doc.text(`Soir: ${mealPlanning[day].soir.nom}`, 40, y);
            y += 7;
        }
        
        y += 10;
    });
    
    doc.save('planning_repas.pdf');
}

function clearPlanning() {
    if (confirm('Voulez-vous vraiment vider tout votre planning?')) {
        mealPlanning = {};
        localStorage.setItem('mealPlanning', JSON.stringify(mealPlanning));
        displayMealPlanning();
    }
}