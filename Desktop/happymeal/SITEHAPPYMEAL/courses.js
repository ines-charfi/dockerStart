document.addEventListener("DOMContentLoaded", () => {
    const coursesList = document.getElementById("courses-list");
    const exportButton = document.getElementById("export-courses");
    const clearButton = document.getElementById("clear-courses");
    const printButton = document.getElementById("print-courses");
    let courses = JSON.parse(localStorage.getItem("courses")) || [];

    function afficherCourses() {
        coursesList.innerHTML = "";
        if (courses.length === 0) {
            coursesList.innerHTML = "<p>Aucun ingrédient dans la liste.</p>";
            return;
        }
        courses.forEach((ingredient, index) => {
            const li = document.createElement("li");
            li.textContent = ingredient;
            const removeButton = document.createElement("button");
            removeButton.textContent = "❌";
            removeButton.onclick = () => supprimerCourse(index);
            li.appendChild(removeButton);
            coursesList.appendChild(li);
        });
    }

    function supprimerCourse(index) {
        courses.splice(index, 1);
        localStorage.setItem("courses", JSON.stringify(courses));
        afficherCourses();
    }

    function exporterCourses() {
        const blob = new Blob([courses.join("\n")], { type: "text/plain" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "liste_de_courses.txt";
        a.click();
    }

    function imprimerCourses() {
        const printWindow = window.open("", "", "width=600,height=600");
        printWindow.document.write("<html><head><title>Liste de Courses</title></head><body>");
        printWindow.document.write("<h2>Ma Liste de Courses</h2><ul>");
        courses.forEach(ingredient => {
            printWindow.document.write(`<li>${ingredient}</li>`);
        });
        printWindow.document.write("</ul></body></html>");
        printWindow.document.close();
        printWindow.print();
    }

    clearButton.addEventListener("click", () => {
        localStorage.removeItem("courses");
        courses = [];
        afficherCourses();
    });

    exportButton.addEventListener("click", exporterCourses);
    printButton.addEventListener("click", imprimerCourses);
    afficherCourses();
});
