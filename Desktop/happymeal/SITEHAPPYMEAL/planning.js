document.addEventListener("DOMContentLoaded", () => {
    const planningBody = document.getElementById("planning-body");
    const exportButton = document.getElementById("export-planning");
    const clearButton = document.getElementById("clear-planning");
    const printButton = document.createElement("button");
    printButton.textContent = "Imprimer le planning";
    printButton.id = "print-planning";
    document.querySelector("main").appendChild(printButton);

    let planning = JSON.parse(localStorage.getItem("planning")) || {};
    
    const jours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
    
    function afficherPlanning() {
        planningBody.innerHTML = "";
        jours.forEach(jour => {
            const tr = document.createElement("tr");
            const tdJour = document.createElement("td");
            tdJour.textContent = jour;
            
            const tdRecette = document.createElement("td");
            tdRecette.textContent = planning[jour] || "Aucune recette";
            
            const tdAction = document.createElement("td");
            const boutonModifier = document.createElement("button");
            boutonModifier.textContent = "📝 Modifier";
            boutonModifier.onclick = () => modifierRecette(jour);
            
            tdAction.appendChild(boutonModifier);
            tr.appendChild(tdJour);
            tr.appendChild(tdRecette);
            tr.appendChild(tdAction);
            
            planningBody.appendChild(tr);
        });
    }
    
    function modifierRecette(jour) {
        const nouvelleRecette = prompt(`Entrez la recette pour ${jour} :`, planning[jour] || "");
        if (nouvelleRecette) {
            planning[jour] = nouvelleRecette;
            localStorage.setItem("planning", JSON.stringify(planning));
            afficherPlanning();
        }
    }
    
    function exporterPlanning() {
        let contenu = "Planning des repas:\n";
        jours.forEach(jour => {
            contenu += `${jour} : ${planning[jour] || "Aucune recette"}\n`;
        });
        
        const blob = new Blob([contenu], { type: "pdf/plain" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "planning_repas.pdf";
        a.click();
    }

    function imprimerPlanning() {
        const printWindow = window.open("", "", "width=600,height=600");
        printWindow.document.write("<html><head><title>Planning des Repas</title></head><body>");
        printWindow.document.write("<h2>Mon Planning de Repas</h2><ul>");
        jours.forEach(jour => {
            printWindow.document.write(`<li><strong>${jour}:</strong> ${planning[jour] || "Aucune recette"}</li>`);
        });
        printWindow.document.write("</ul></body></html>");
        printWindow.document.close();
        printWindow.print();
    }
    
    clearButton.addEventListener("click", () => {
        localStorage.removeItem("planning");
        planning = {};
        afficherPlanning();
    });
    
    exportButton.addEventListener("click", exporterPlanning);
    printButton.addEventListener("click", imprimerPlanning);
    afficherPlanning();
});
