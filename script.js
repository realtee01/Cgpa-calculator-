document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const welcomeScreen = document.getElementById('welcome-screen');
    const mainApp = document.getElementById('main-app');
    const nameInput = document.getElementById('name-input');
    const enterBtn = document.getElementById('enter-portal');
    const displayName = document.getElementById('display-name');

    // --- ACCESS LOGIC ---
    function login(name) {
        if (name.trim() !== "") {
            localStorage.setItem('student-name', name);
            displayName.innerText = name;
            welcomeScreen.style.opacity = '0';
            setTimeout(() => {
                welcomeScreen.classList.add('hidden');
                mainApp.classList.remove('hidden');
            }, 300);
        } else {
            alert("Please enter your name.");
        }
    }

    const savedName = localStorage.getItem('student-name');
    if (savedName) login(savedName);

    enterBtn.addEventListener('click', () => login(nameInput.value));
    nameInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') login(nameInput.value); });

    // --- THEME LOGIC ---
    const toggles = [
        { btn: document.getElementById('login-theme-toggle'), dark: document.getElementById('login-dark-icon'), light: document.getElementById('login-light-icon') },
        { btn: document.getElementById('main-theme-toggle'), dark: document.getElementById('main-dark-icon'), light: document.getElementById('main-light-icon') }
    ];

    function updateIcons() {
        const isDark = document.documentElement.classList.contains('dark');
        toggles.forEach(t => {
            if (isDark) { t.dark.classList.add('hidden'); t.light.classList.remove('hidden'); }
            else { t.dark.classList.remove('hidden'); t.light.classList.add('hidden'); }
        });
    }

    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    }
    updateIcons();

    toggles.forEach(t => {
        t.btn.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
            updateIcons();
        });
    });

    // --- CALCULATOR LOGIC ---
    const courseList = document.getElementById('course-list');
    const addBtn = document.getElementById('add-course');
    const calcBtn = document.getElementById('calculate-btn');

    function createRow() {
        const tr = document.createElement('tr');
        tr.className = 'group transition-colors dark:hover:bg-slate-800/40';
        tr.innerHTML = `
            <td class="px-6 py-4">
                <input type="text" placeholder="Course Code" class="w-full bg-transparent outline-none text-slate-700 dark:text-slate-200 font-medium placeholder:text-slate-300 text-sm">
            </td>
            <td class="px-4 py-4">
                <input type="number" placeholder="0" class="unit-input w-14 mx-auto block bg-slate-100 dark:bg-slate-800 rounded-xl p-2.5 text-center font-bold text-indigo-600 dark:text-indigo-400 outline-none">
            </td>
            <td class="px-4 py-4">
                <select class="grade-input w-16 mx-auto block bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-xl p-2.5 font-bold outline-none cursor-pointer">
                    <option value="5">A</option><option value="4">B</option><option value="3">C</option><option value="2">D</option><option value="1">E</option><option value="0">F</option>
                </select>
            </td>
            <td class="px-6 py-4 text-right">
                <button onclick="this.closest('tr').remove()" class="text-slate-300 hover:text-red-500 transition-all active:scale-75">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                </button>
            </td>
        `;
        courseList.appendChild(tr);
    }

    for(let i=0; i<5; i++) createRow();
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
        document.getElementById('total-units').innerText = totalU;
        document.getElementById('final-gpa').innerText = totalU > 0 ? (totalP / totalU).toFixed(2) : "0.00";
    });
});
