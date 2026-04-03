document.addEventListener('DOMContentLoaded', () => {
    const welcomeScreen = document.getElementById('welcome-screen');
    const mainApp = document.getElementById('main-app');
    const nameInput = document.getElementById('name-input');
    const enterBtn = document.getElementById('enter-portal');

    // Login Logic
    function login(name) {
        if (name.trim() !== "") {
            localStorage.setItem('student-name', name);
            const displayNames = document.querySelectorAll('#display-name');
            displayNames.forEach(el => el.innerText = name);
            welcomeScreen.style.opacity = '0';
            setTimeout(() => {
                welcomeScreen.classList.add('hidden');
                mainApp.classList.remove('hidden');
            }, 400);
        }
    }

    if (localStorage.getItem('student-name')) login(localStorage.getItem('student-name'));
    enterBtn.addEventListener('click', () => login(nameInput.value));

    // Theme Toggle Logic
    const themeBtnMain = document.getElementById('main-theme-toggle');
    const themeBtnMobile = document.getElementById('mobile-theme-toggle');
    [themeBtnMain, themeBtnMobile].forEach(btn => {
        btn.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
        });
    });

    if (localStorage.getItem('theme') === 'dark') document.documentElement.classList.add('dark');

    // Calculator Logic
    const courseList = document.getElementById('course-list');
    const addBtn = document.getElementById('add-course');
    const calcBtnDesktop = document.getElementById('calculate-btn-desktop');
    const calcBtnMobile = document.getElementById('calculate-btn-mobile');

    function createRow() {
        const tr = document.createElement('tr');
        tr.className = 'group transition-all hover:bg-slate-50 dark:hover:bg-slate-800/30';
        tr.innerHTML = `
            <td class="px-4 md:px-6 py-4">
                <input type="text" placeholder="e.g. CSC 101" class="w-full bg-transparent outline-none text-slate-700 dark:text-slate-200 font-bold placeholder:text-slate-300 text-sm md:text-base">
            </td>
            <td class="px-2 py-4">
                <input type="number" placeholder="0" class="unit-input w-12 md:w-16 mx-auto block bg-slate-100 dark:bg-slate-800 rounded-xl p-2.5 text-center font-black text-indigo-600 dark:text-indigo-400 outline-none">
            </td>
            <td class="px-2 py-4">
                <select class="grade-input w-14 md:w-20 mx-auto block bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-xl p-2 font-bold outline-none cursor-pointer">
                    <option value="5">A</option><option value="4">B</option><option value="3">C</option><option value="2">D</option><option value="1">E</option><option value="0">F</option>
                </select>
            </td>
            <td class="px-4 py-4 text-right">
                <button onclick="this.closest('tr').remove()" class="text-slate-300 hover:text-red-500 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                </button>
            </td>
        `;
        courseList.appendChild(tr);
    }

    for(let i=0; i<4; i++) createRow();
    addBtn.addEventListener('click', createRow);

    [calcBtnDesktop, calcBtnMobile].forEach(btn => {
        btn.addEventListener('click', () => {
            const units = document.querySelectorAll('.unit-input');
            const grades = document.querySelectorAll('.grade-input');
            let totalU = 0, totalP = 0;

            units.forEach((input, i) => {
                const u = parseFloat(input.value) || 0;
                const g = parseFloat(grades[i].value) || 0;
                totalU += u; totalP += (u * g);
            });

            const gpa = totalU > 0 ? (totalP / totalU).toFixed(2) : "0.00";
            
            // Update both mobile and desktop views
            document.getElementById('total-units').innerText = totalU;
            document.getElementById('final-gpa').innerText = gpa;
            document.getElementById('total-units-mobile').innerText = totalU;
            document.getElementById('final-gpa-mobile').innerText = gpa;
        });
    });
});
