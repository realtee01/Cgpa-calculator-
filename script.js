document.addEventListener('DOMContentLoaded', () => {
    const courseList = document.getElementById('course-list');
    const addBtn = document.getElementById('add-course');
    const calcBtn = document.getElementById('calculate-btn');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const darkIcon = document.getElementById('theme-toggle-dark-icon');
    const lightIcon = document.getElementById('theme-toggle-light-icon');

    // --- DARK MODE LOGIC ---
    if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        lightIcon.classList.remove('hidden');
    } else {
        document.documentElement.classList.remove('dark');
        darkIcon.classList.remove('hidden');
    }

    themeToggleBtn.addEventListener('click', function() {
        darkIcon.classList.toggle('hidden');
        lightIcon.classList.toggle('hidden');
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        }
    });

    // --- CALCULATOR LOGIC ---
    function createRow() {
        const tr = document.createElement('tr');
        tr.className = 'group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors';
        tr.innerHTML = `
            <td class="px-6 py-4">
                <input type="text" placeholder="e.g. GST 101" class="w-full bg-transparent border-none focus:outline-none text-slate-700 dark:text-slate-200 font-medium">
            </td>
            <td class="px-6 py-4">
                <input type="number" placeholder="0" class="unit-input w-16 mx-auto block bg-slate-100 dark:bg-slate-800 rounded-md p-2 text-center font-bold text-indigo-600 dark:text-indigo-400 focus:ring-2 focus:ring-indigo-500 outline-none">
            </td>
            <td class="px-6 py-4">
                <select class="grade-input w-20 mx-auto block bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-md p-2 font-semibold cursor-pointer outline-none">
                    <option value="5">A</option><option value="4">B</option><option value="3">C</option><option value="2">D</option><option value="1">E</option><option value="0">F</option>
                </select>
            </td>
            <td class="px-6 py-4 text-right">
                <button onclick="this.closest('tr').remove()" class="text-slate-300 hover:text-red-500 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
            </td>
        `;
        courseList.appendChild(tr);
    }

    for(let i=0; i<4; i++) createRow();
    addBtn.addEventListener('click', createRow);

    calcBtn.addEventListener('click', () => {
        const units = document.querySelectorAll('.unit-input');
        const grades = document.querySelectorAll('.grade-input');
        let totalU = 0, totalP = 0;

        units.forEach((input, i) => {
            const u = parseFloat(input.value) || 0;
            const g = parseFloat(grades[i].value) || 0;
            totalU += u; totalP += (u * g);
        });

        const gpa = totalU > 0 ? (totalP / totalU).toFixed(2) : "0.00";
        document.getElementById('total-units').innerText = totalU;
        document.getElementById('final-gpa').innerText = gpa;
        
        const status = document.getElementById('classification');
        const score = parseFloat(gpa);
        if (score >= 4.5) status.innerText = "First Class";
        else if (score >= 3.5) status.innerText = "2:1 Upper";
        else if (score >= 2.4) status.innerText = "2:2 Lower";
        else status.innerText = "Pass";
    });
});
