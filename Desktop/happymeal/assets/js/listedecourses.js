document.addEventListener('DOMContentLoaded', function() {
    displayShoppingList();
    
    document.getElementById('generate-shopping-list')?.addEventListener('click', generateShoppingListPDF);
    document.getElementById('clear-shopping-list')?.addEventListener('click', clearShoppingList);
});

function displayShoppingList() {
    const container = document.getElementById('shopping-list');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (shoppingList.length === 0) {
        container.innerHTML = '<li class="list-group-item text-center py-3">Votre liste de courses est vide</li>';
        return;
    }
    
    shoppingList.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
            <span>${item.nom} - ${item.quantite}</span>
            <button class="btn btn-sm btn-outline-danger remove-item" data-index="${index}">
                <i class="fas fa-trash"></i>
            </button>
        `;
        container.appendChild(li);
    });
    
    // Gérer la suppression d'éléments
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            shoppingList.splice(index, 1);
            localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
            displayShoppingList();
        });
    });
}

function generateShoppingListPDF() {
    if (shoppingList.length === 0) {
        alert('Votre liste de courses est vide!');
        return;
    }
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text('Liste de courses', 105, 15, { align: 'center' });
    
    doc.setFontSize(12);
    let y = 30;
    shoppingList.forEach(item => {
        doc.text(`${item.nom} - ${item.quantite}`, 20, y);
        y += 10;
    });
    
    doc.save('liste_de_courses.pdf');
}

function clearShoppingList() {
    if (confirm('Voulez-vous vraiment vider votre liste de courses?')) {
        shoppingList = [];
        localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
        displayShoppingList();
    }
}