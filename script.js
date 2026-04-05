document.addEventListener('DOMContentLoaded', () => {
    // --- UI ELEMENTS ---
    const welcomeScreen = document.getElementById('welcome-screen');
    const mainApp = document.getElementById('main-app');
    const nameInput = document.getElementById('name-input');
    const enterBtn = document.getElementById('enter-portal');

    // --- LOGIN & PERSISTENCE LOGIC ---
    function login(name) {
        if (name && name.trim() !== "") {
            // Save name to browser memory
            localStorage.setItem('student-name', name);
            
            // Update Name on both Mobile and Desktop views
            const nameLaptop = document.getElementById('display-name');
            const nameMobile = document.getElementById('display-name-mobile');
            
            if (nameLaptop) nameLaptop.innerText = name;
            if (nameMobile) nameMobile.innerText = name;
            
            // STICKY FIX: Completely remove the login overlay
            welcomeScreen.style.opacity = '0';
            welcomeScreen.style.pointerEvents = 'none';
            
            setTimeout(() => {
                welcomeScreen.classList.add('hidden');
                welcomeScreen.style.display = 'none'; // This ensures the box is GONE
                mainApp.classList.remove('hidden');
                mainApp.style.display = 'flex'; 
            }, 600);
        }
    }

    // Auto-login if name exists
    const savedName = localStorage.getItem('student-name');
    if (savedName) {
        login(savedName);
    }

    // Event Listeners for Login
    enterBtn.addEventListener('click', () => login(nameInput.value));
    nameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') login(nameInput.value);
    });

    // --- THEME MANAGEMENT ---
    const themeToggles = [
        document.getElementById('main-theme-toggle'),
        document.getElementById('mobile-theme-toggle'),
        document.getElementById('login-theme-toggle')
    ];

    themeToggles.forEach(btn => {
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

    // --- CGPA CALCULATOR ENGINE ---
    const courseList = document.getElementById('course-list');
    const addBtn = document.getElementById('add-course');

    function createRow() {
        const tr = document.createElement('tr');
        tr.className = 'group transition-all hover:bg-indigo-50/30 dark:hover:bg-indigo-500/5 border-b border-slate-100 dark:border-slate-800';
        tr.innerHTML = `
            <td class="px-8 py-6">
                <input type="text" placeholder="e.g. CSC 301" class="w-full bg-transparent outline-none text-slate-700 dark:text-slate-200 font-bold placeholder:text-slate-300 text-base">
            </td>
            <td class="px-4 py-6">
                <input type="number" placeholder="0" class="unit-input w-16 mx-auto block bg-slate-50 dark:bg-slate-800 rounded-2xl p-3 text-center font-black text-indigo-600 dark:text-indigo-400 outline-none transition-all focus:ring-2 focus:ring-indigo-500/10">
            </td>
            <td class="px-4 py-6">
                <select class="grade-input w-20 mx-auto block bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-2xl p-3 font-black outline-none cursor-pointer text-center appearance-none hover:border-indigo-400">
                    <option value="5">A</option>
                    <option value="4">B</option>
                    <option value="3">C</option>
                    <option value="2">D</option>
                    <option value="1">E</option>
                    <option value="0">F</option>
                </select>
            </td>
            <td class="px-8 py-6 text-right">
                <button onclick="this.closest('tr').remove()" class="text-slate-300 hover:text-red-500 transition-all transform hover:scale-110 active:scale-75">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                </button>
            </td>
        `;
        courseList.appendChild(tr);
    }

    // Start with 4 default rows
    for (let i = 0; i < 4; i++) createRow();
    
    addBtn.addEventListener('click', createRow);

    // Global Update Function
    const updatePerformance = () => {
        const units = document.querySelectorAll('.unit-input');
        const grades = document.querySelectorAll('.grade-input');
        let totalU = 0, totalP = 0;

        units.forEach((input, i) => {
            const u = parseFloat(input.value) || 0;
            const g = parseFloat(grades[i].value) || 0;
            totalU += u; 
            totalP += (u * g);
        });

        const gpa = totalU > 0 ? (totalP / totalU).toFixed(2) : "0.00";
        
        // Sync results to all labels (Desktop + Mobile)
        document.querySelectorAll('#final-gpa, #final-gpa-mobile').forEach(el => el.innerText = gpa);
        document.querySelectorAll('#total-units, #total-units-mobile').forEach(el => el.innerText = totalU);
    };

    // Attach to both buttons
    const calcBtns = [
        document.getElementById('calculate-btn-desktop'),
        document.getElementById('calculate-btn-mobile')
    ];

    calcBtns.forEach(btn => {
        if (btn) btn.addEventListener('click', updatePerformance);
    });
});
