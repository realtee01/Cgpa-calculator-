document.addEventListener('DOMContentLoaded', () => {
    const welcomeScreen = document.getElementById('welcome-screen');
    const mainApp = document.getElementById('main-app');
    const nameInput = document.getElementById('name-input');
    const enterBtn = document.getElementById('enter-portal');

    function login(name) {
        if (name.trim() !== "") {
            localStorage.setItem('student-name', name);
            const nameLaptop = document.getElementById('display-name');
            const nameMobile = document.getElementById('display-name-mobile');
            if (nameLaptop) nameLaptop.innerText = name;
            if (nameMobile) nameMobile.innerText = name;
            
            welcomeScreen.style.opacity = '0';
            welcomeScreen.style.pointerEvents = 'none';
            setTimeout(() => {
                welcomeScreen.classList.add('hidden');
                mainApp.classList.remove('hidden');
            }, 600);
        }
    }

    const savedName = localStorage.getItem('student-name');
    if (savedName) login(savedName);

    enterBtn.addEventListener('click', () => login(nameInput.value));
    nameInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') login(nameInput.value); });

    // Multi-Theme Toggles
    const toggles = [
        document.getElementById('main-theme-toggle'),
        document.getElementById('mobile-theme-toggle'),
        document.getElementById('login-theme-toggle')
    ];

    toggles.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', () => {
                document.documentElement.classList.toggle('dark');
                localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
            });
        }
    });

    if (localStorage.getItem('theme') === 'dark') document.documentElement.classList.add('dark');

    // Calculator Core
    const courseList = document.getElementById('course-list');
    const addBtn = document.getElementById('add-course');

    function createRow() {
        const tr = document.createElement('tr');
        tr.className = 'group transition-all hover:bg-indigo-50/30 dark:hover:bg-indigo-500/5';
        tr.innerHTML = `
            <td class="px-8 py-6">
                <input type="text" placeholder="e.g. CSC 301" class="w-full bg-transparent outline-none text-slate-700 dark:text-slate-200 font-bold placeholder:text-slate-300 text-base">
            </td>
            <td class="px-4 py-6">
                <input type="number" placeholder="0" class="unit-input w-16 mx-auto block bg-slate-50 dark:bg-slate-800 rounded-2xl p-3 text-center font-black text-indigo-600 dark:text-indigo-400 outline-none border border-transparent focus:border-indigo-200 dark:focus:border-indigo-900 transition-all">
            </td>
            <td class="px-4 py-6">
                <select class="grade-input w-20 mx-auto block bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-2xl p-3 font-black outline-none cursor-pointer hover:border-indigo-400 transition-all appearance-none text-center">
                    <option value="5">A</option><option value="4">B</option><option value="3">C</option><option value="2">D</option><option value="1">E</option><option value="0">F</option>
                </select>
            </td>
            <td class="px-8 py-6 text-right">
                <button onclick="this.closest('tr').remove()" class="text-slate-300 hover:text-red-500 transition-all transform hover:scale-110 active:scale-75">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                </button>
            </td>
        `;
        courseList.appendChild(tr);
    }

    for (let i = 0; i < 4; i++) createRow();
    addBtn.addEventListener('click', createRow);

    const updateUI = () => {
        const units = document.querySelectorAll('.unit-input');
        const grades = document.querySelectorAll('.grade-input');
        let totalU = 0, totalP = 0;

        units.forEach((input, i) => {
            const u = parseFloat(input.value) || 0;
            const g = parseFloat(grades[i].value) || 0;
            totalU += u; totalP += (u * g);
        });

        const gpa = totalU > 0 ? (totalP / totalU).toFixed(2) : "0.00";
        
        document.querySelectorAll('#final-gpa, #final-gpa-mobile').forEach(el => el.innerText = gpa);
        document.querySelectorAll('#total-units, #total-units-mobile').forEach(el => el.innerText = totalU);
    };

    [document.getElementById('calculate-btn-desktop'), document.getElementById('calculate-btn-mobile')].forEach(btn => {
        btn.addEventListener('click', updateUI);
    });
});
