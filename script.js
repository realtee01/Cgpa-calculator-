document.addEventListener('DOMContentLoaded', () => {
    // --- ELEMENTS ---
    const welcomeScreen = document.getElementById('welcome-screen');
    const mainApp = document.getElementById('main-app');
    const nameInput = document.getElementById('name-input');
    const enterBtn = document.getElementById('enter-portal');

    // --- ACCESS & WELCOME LOGIC ---
    function login(name) {
        if (name.trim() !== "") {
            // Save to browser memory
            localStorage.setItem('student-name', name);
            
            // Update name on BOTH Laptop Sidebar and Mobile Header
            const nameLaptop = document.getElementById('display-name');
            const nameMobile = document.getElementById('display-name-mobile');
            
            if (nameLaptop) nameLaptop.innerText = name;
            if (nameMobile) nameMobile.innerText = name;
            
            // Smooth transition to dashboard
            welcomeScreen.style.opacity = '0';
            setTimeout(() => {
                welcomeScreen.classList.add('hidden');
                mainApp.classList.remove('hidden');
            }, 400);
        } else {
            alert("Please enter your name to access the portal.");
        }
    }

    // Check for returning user
    const savedName = localStorage.getItem('student-name');
    if (savedName) {
        login(savedName);
    }

    // Trigger login on click or 'Enter' key
    enterBtn.addEventListener('click', () => login(nameInput.value));
    nameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') login(nameInput.value);
    });

    // --- THEME TOGGLE LOGIC ---
    const themeBtnMain = document.getElementById('main-theme-toggle');
    const themeBtnMobile = document.getElementById('mobile-theme-toggle');
    const themeBtnLogin = document.getElementById('login-theme-toggle');

    const allToggles = [themeBtnMain, themeBtnMobile, themeBtnLogin];

    allToggles.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', () => {
                document.documentElement.classList.toggle('dark');
                const isDark = document.documentElement.classList.contains('dark');
                localStorage.setItem('theme', isDark ? 'dark' : 'light');
            });
        }
    });

    // Load saved theme
    if (localStorage.getItem('theme') === 'dark') {
        document.documentElement.classList.add('dark');
    }

    // --- CGPA CALCULATOR LOGIC ---
    const courseList = document.getElementById('course-list');
    const addBtn = document.getElementById('add-course');
    const calcBtnDesktop = document.getElementById('calculate-btn-desktop');
    const calcBtnMobile = document.getElementById('calculate-btn-mobile');

    function createRow() {
        const tr = document.createElement('tr');
        tr.className = 'group transition-all hover:bg-slate-50 dark:hover:bg-slate-800/30 border-b border-slate-50 dark:border-slate-800/50';
        tr.innerHTML = `
            <td class="px-4 md:px-6 py-4">
                <input type="text" placeholder="e.g. MTH 101" class="w-full bg-transparent outline-none text-slate-700 dark:text-slate-200 font-bold placeholder:text-slate-300 text-sm md:text-base">
            </td>
            <td class="px-2 py-4">
                <input type="number" placeholder="0" class="unit-input w-12 md:w-16 mx-auto block bg-slate-100 dark:bg-slate-800 rounded-xl p-2.5 text-center font-black text-indigo-600 dark:text-indigo-400 outline-none focus:ring-2 focus:ring-indigo-500/20">
            </td>
            <td class="px-2 py-4">
                <select class="grade-input w-14 md:w-20 mx-auto block bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-xl p-2 font-bold outline-none cursor-pointer">
                    <option value="5">A</option>
                    <option value="4">B</option>
                    <option value="3">C</option>
                    <option value="2">D</option>
                    <option value="1">E</option>
                    <option value="0">F</option>
                </select>
            </td>
            <td class="px-4 py-4 text-right">
                <button onclick="this.closest('tr').remove()" class="text-slate-300 hover:text-red-500 transition-colors active:scale-75">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                </button>
            </td>
        `;
        courseList.appendChild(tr);
    }

    // Generate initial rows
    for (let i = 0; i < 4; i++) {
        createRow();
    }

    addBtn.addEventListener('click', createRow);

    // Calculation function
    const performCalculation = () => {
        const units = document.querySelectorAll('.unit-input');
        const grades = document.querySelectorAll('.grade-input');
        
        let totalU = 0;
        let totalP = 0;

        units.forEach((input, i) => {
            const u = parseFloat(input.value) || 0;
            const g = parseFloat(grades[i].value) || 0;
            totalU += u;
            totalP += (u * g);
        });

        const gpa = totalU > 0 ? (totalP / totalU).toFixed(2) : "0.00";
        
        // Synchronize Laptop Stats
        const gpaLaptop = document.getElementById('final-gpa');
        const unitsLaptop = document.getElementById('total-units');
        if (gpaLaptop) gpaLaptop.innerText = gpa;
        if (unitsLaptop) unitsLaptop.innerText = totalU;

        // Synchronize Mobile Stats
        const gpaMobile = document.getElementById('final-gpa-mobile');
        const unitsMobile = document.getElementById('total-units-mobile');
        if (gpaMobile) gpaMobile.innerText = gpa;
        if (unitsMobile) unitsMobile.innerText = totalU;
    };

    // Attach calculation to both Desktop and Mobile buttons
    if (calcBtnDesktop) calcBtnDesktop.addEventListener('click', performCalculation);
    if (calcBtnMobile) calcBtnMobile.addEventListener('click', performCalculation);
});
