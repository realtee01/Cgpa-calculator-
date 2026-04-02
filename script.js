document.addEventListener('DOMContentLoaded', () => {
    const courseList = document.getElementById('course-list');
    const addBtn = document.getElementById('add-course');
    const calcBtn = document.getElementById('calculate-btn');

    // Add first row on load
    addCourseRow();

    addBtn.addEventListener('click', addCourseRow);

    function addCourseRow() {
        const row = document.createElement('div');
        row.className = 'grid grid-cols-12 gap-3 items-center animate-fade-in';
        row.innerHTML = `
            <div class="col-span-6 md:col-span-7">
                <input type="text" placeholder="Course Title (e.g. CSC 301)" class="w-full p-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none">
            </div>
            <div class="col-span-3 md:col-span-2">
                <input type="number" placeholder="Units" class="unit-input w-full p-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none">
            </div>
            <div class="col-span-3 md:col-span-2">
                <select class="grade-input w-full p-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none">
                    <option value="5">A</option>
                    <option value="4">B</option>
                    <option value="3">C</option>
                    <option value="2">D</option>
                    <option value="1">E</option>
                    <option value="0">F</option>
                </select>
            </div>
        `;
        courseList.appendChild(row);
    }

    calcBtn.addEventListener('click', () => {
        const units = document.querySelectorAll('.unit-input');
        const grades = document.querySelectorAll('.grade-input');
        
        let totalUnits = 0;
        let totalPoints = 0;

        units.forEach((unitInput, index) => {
            const unitValue = parseFloat(unitInput.value);
            const gradeValue = parseFloat(grades[index].value);

            if (!isNaN(unitValue)) {
                totalUnits += unitValue;
                totalPoints += (unitValue * gradeValue);
            }
        });

        const gpa = totalUnits > 0 ? (totalPoints / totalUnits).toFixed(2) : "0.00";
        
        // Update UI
        document.getElementById('total-units').innerText = totalUnits;
        document.getElementById('final-gpa').innerText = gpa;
        updateClassification(gpa);
    });

    function updateClassification(gpa) {
        const display = document.getElementById('classification');
        const score = parseFloat(gpa);
        
        if (score >= 4.5) display.innerText = "First Class";
        else if (score >= 3.5) display.innerText = "Second Class Upper";
        else if (score >= 2.4) display.innerText = "Second Class Lower";
        else if (score >= 1.5) display.innerText = "Third Class";
        else display.innerText = "Pass/Fail";
    }
});

