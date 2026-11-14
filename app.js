/**
 * Rachel's Task Dashboard - Core Application Engine
 * Offline-first, 0-Token Daily Use, Synced to Google Sheets & WhatsApp-ready
 */

// --- Default Seed Tasks (Matching Rachel's Screenshots) ---
const INITIAL_DEMO_TASKS = [
  {
    id: 'demo-1',
    title: 'IOBC: אם אין תשובה מהמארגנים - לשלם 618 ₪ לפני 15.11',
    category: 'כנסים',
    priority: 'דחוף',
    source: 'נוסף מ-Claude',
    waiting_for: 'תשובה מהמארגנים לבקשת מחיר ההרשמה המוקדמת ולשיבוץ',
    check_date: new Date().toISOString().split('T')[0], // Today (triggers "הגיע הזמן לבדוק")
    due_date: '2026-11-15',
    notes: `אם עד 13.11 אין תשובה, לשלם את המחיר הרגיל (618 ₪, תקף עד 15.11) כדי לא לצאת מהתוכנית.
קישור לתשלום (עובד): https://mytau.tau.ac.il/ePay/?p=LfvxkFyUMFS69PYsj5RKDDH36KR8Ww7Yxl0xbZhwDzqO54J68%2FZDPHrzEOLxSS7BhdajrxevuWUkjN88S9rPg%3D%3D
לקבלה על שם העסק: לרשום בעמוד התשלום את מספר העוסק במקום תעודת הזהות, או לבקש מהמארגנים קבלה על שם העסק.
טופס ההרשמה: https://en-coller.tau.ac.il/conference/iobc/form/reg_2026`,
    progress_log: [
      { id: 'p1', date: 'יום ד\', 11.11', text: 'שלחתי בקשה למחיר הרשמה מוקדמת ולשיבוץ במייל' }
    ],
    completed: false,
    created_at: '2026-11-11T10:00:00.000Z',
    updated_at: '2026-11-14T20:34:00.000Z'
  },
  {
    id: 'demo-2',
    title: 'שליחת עדכון על ילד עם מוגבלות לנציבות',
    category: 'נציבות',
    priority: 'גבוה',
    source: 'ידני',
    waiting_for: 'תשובה מהנציבות על העדכון',
    check_date: '2026-11-18',
    due_date: '2026-11-20',
    notes: 'הטקסט המקורי קצר ואינו ברור לגמרי (ייתכן שמדובר במערכת הנציבות). המשימה: לבצע עדכון במערכת הנוגע לילד עם מוגבלות. יש לוודא את הפרטים המדויקים לפני הביצוע.',
    progress_log: [
      { id: 'p2', date: 'יום ד\', 11.11', text: 'בוצע עדכון ראשוני במערכת' }
    ],
    completed: false,
    created_at: '2026-11-11T12:00:00.000Z',
    updated_at: '2026-11-14T20:34:00.000Z'
  },
  {
    id: 'demo-3',
    title: 'החזרת משוב לנטע ויגל על ההשערות',
    category: 'הוראה וסטודנטים',
    priority: 'גבוה',
    source: 'נוסף מ-Claude',
    waiting_for: '',
    check_date: '',
    due_date: '2026-11-16',
    notes: 'לעבור על נוסח ההשערות שהוגש ביום חמישי ולהחזיר הערות מפורטות במייל.',
    progress_log: [],
    completed: false,
    created_at: '2026-11-14T14:00:00.000Z',
    updated_at: '2026-11-14T20:34:00.000Z'
  },
  {
    id: 'demo-4',
    title: 'הכנת סילבוס מעודכן לסמינריון מחקר',
    category: 'סמינריון',
    priority: 'רגיל',
    source: 'ידני',
    waiting_for: 'אישור מועדת הוראה',
    check_date: '2026-11-25',
    due_date: '',
    notes: 'לעדכן את רשימת הקריאה הביבליוגרפית ולהוסיף 3 מאמרים עדכניים מ-2025/2026.',
    progress_log: [],
    completed: false,
    created_at: '2026-11-12T09:00:00.000Z',
    updated_at: '2026-11-14T20:34:00.000Z'
  },
  {
    id: 'demo-5',
    title: 'תיאום שיחת טלפון עם פרופ\' לוין לגבי שיתוף פעולה',
    category: 'שיחות טלפון',
    priority: 'רגיל',
    source: 'נוסף מוואטסאפ',
    waiting_for: '',
    check_date: '',
    due_date: '',
    notes: 'העוזרת שלו ביקשה להתקשר בין 14:00 ל-16:00.',
    progress_log: [],
    completed: false,
    created_at: '2026-11-14T11:00:00.000Z',
    updated_at: '2026-11-14T20:34:00.000Z'
  },
  {
    id: 'demo-6',
    title: 'הגשת קבלות נסיעה לאדמיניסטרציה להחזר',
    category: 'אדמיניסטרציה',
    priority: 'נמוך',
    source: 'ידני',
    waiting_for: '',
    check_date: '',
    due_date: '2026-11-30',
    notes: 'לרכז את קבלות הרכבת והמוניות מהחודש האחרון.',
    progress_log: [],
    completed: false,
    created_at: '2026-11-10T16:00:00.000Z',
    updated_at: '2026-11-14T20:34:00.000Z'
  }
];

const DEFAULT_CATEGORIES = [
  'סמינריון',
  'הוראה וסטודנטים',
  'מחקר ופרסומים',
  'כנסים',
  'נציבות',
  'אדמיניסטרציה',
  'עבודה פרטית',
  'שיחות טלפון',
  'בית ואישי',
  'אחר'
];

// --- State Management ---
class DashboardState {
  constructor() {
    this.tasks = this.loadTasks();
    this.categories = this.loadCategories();
    this.sheetsUrl = localStorage.getItem('rachel_sheets_url') || '';
    this.activeCategoryFilter = 'all'; // 'all' or category name
    this.activeUrgencyFilter = null;   // null or 'דחוף', 'גבוה', 'במעקב', etc.
    this.activeSort = 'urgency';       // 'urgency' | 'category' | 'date'
    this.searchQuery = '';
    this.isRecording = false;
  }

  loadTasks() {
    try {
      const data = localStorage.getItem('rachel_tasks');
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Error reading localStorage:', e);
    }
    return INITIAL_DEMO_TASKS;
  }

  saveTasks() {
    localStorage.setItem('rachel_tasks', JSON.stringify(this.tasks));
    this.triggerAutoSync();
  }

  loadCategories() {
    try {
      const data = localStorage.getItem('rachel_categories');
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Error reading categories:', e);
    }
    return DEFAULT_CATEGORIES;
  }

  saveCategories() {
    localStorage.setItem('rachel_categories', JSON.stringify(this.categories));
  }

  setSheetsUrl(url) {
    this.sheetsUrl = url.trim();
    localStorage.setItem('rachel_sheets_url', this.sheetsUrl);
  }

  triggerAutoSync() {
    if (this.sheetsUrl) {
      // Debounced or direct background sync
      setTimeout(() => {
        syncEngine.pushToGoogleSheets();
      }, 500);
    }
  }
}

const state = new DashboardState();

// --- Sync Engine with Google Sheets ---
const syncEngine = {
  isSyncing: false,

  async pullFromGoogleSheets() {
    if (!state.sheetsUrl) return false;
    this.setIndicator('syncing');

    try {
      const response = await fetch(`${state.sheetsUrl}?action=get_tasks`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      });

      if (!response.ok) throw new Error(`HTTP error ${response.status}`);
      const data = await response.json();

      if (data && Array.isArray(data.tasks)) {
        state.tasks = data.tasks;
        state.saveTasks();
        renderAll();
        showToast('המשימות סונכרנו בהצלחה מ-Google Sheets!', 'success');
        this.setIndicator('success');
        return true;
      }
    } catch (err) {
      console.warn('Sync pull error:', err);
      this.setIndicator('error');
      showToast('שגיאה בסנכרון עם Google Sheets. ממשיך לעבוד מקומית', 'warning');
      return false;
    }
  },

  async pushToGoogleSheets() {
    if (!state.sheetsUrl || this.isSyncing) return false;
    this.isSyncing = true;
    this.setIndicator('syncing');

    try {
      // We send via POST to Google Apps Script Web App
      await fetch(state.sheetsUrl, {
        method: 'POST',
        mode: 'no-cors', // Google Apps Script redirects require no-cors or simple payload
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'sync_all',
          tasks: state.tasks,
          timestamp: new Date().toISOString()
        })
      });

      this.isSyncing = false;
      this.setIndicator('success');
      return true;
    } catch (err) {
      console.warn('Sync push error:', err);
      this.isSyncing = false;
      this.setIndicator('error');
      return false;
    }
  },

  setIndicator(status) {
    const indicator = document.getElementById('syncIndicator');
    const statusText = document.getElementById('syncStatusText');
    if (!indicator || !statusText) return;

    if (!state.sheetsUrl) {
      indicator.className = 'w-2 h-2 rounded-full bg-slate-400 inline-block';
      statusText.textContent = 'גוגל שיטס: לא מוגדר';
      return;
    }

    if (status === 'syncing') {
      indicator.className = 'w-2 h-2 rounded-full bg-amber-400 inline-block animate-ping';
      statusText.textContent = 'מסנכרן...';
    } else if (status === 'success') {
      indicator.className = 'w-2 h-2 rounded-full bg-emerald-400 inline-block';
      statusText.textContent = 'גוגל שיטס: מעודכן';
    } else {
      indicator.className = 'w-2 h-2 rounded-full bg-red-400 inline-block';
      statusText.textContent = 'גוגל שיטס: שגיאת חיבור';
    }
  }
};

// --- Smart Client-Side Rule Parser (0 Tokens!) ---
const SmartParser = {
  parse(rawText) {
    const text = rawText.trim();
    if (!text) return null;

    let priority = 'רגיל';
    let category = 'אחר';
    let waitingFor = '';
    let checkDate = '';
    let dueDate = '';

    const lower = text.toLowerCase();

    // Priority detection
    if (lower.includes('דחוף') || lower.includes('בהקדם') || lower.includes('מיידי')) {
      priority = 'דחוף';
    } else if (lower.includes('גבוה') || lower.includes('חשוב')) {
      priority = 'גבוה';
    } else if (lower.includes('נמוך') || lower.includes('לא דחוף') || lower.includes('כשיהיה זמן')) {
      priority = 'נמוך';
    } else if (lower.includes('מעקב') || lower.includes('מחכה') || lower.includes('ממתין')) {
      priority = 'במעקב';
    }

    // Category detection based on keywords
    if (/סמינריון|סמינר|עבודת מחקר/i.test(text)) {
      category = 'סמינריון';
    } else if (/סטודנט|הוראה|משוב|סילבוס|מבחן|ציונים|בדיקה/i.test(text)) {
      category = 'הוראה וסטודנטים';
    } else if (/מאמר|פרסום|ז\'ורנל|מחקר|ניסוי/i.test(text)) {
      category = 'מחקר ופרסומים';
    } else if (/כנס|הרשמה|iobc|וועידה|מושב/i.test(text)) {
      category = 'כנסים';
    } else if (/נציבות|שירות המדינה|טופס נציבות/i.test(text)) {
      category = 'נציבות';
    } else if (/אדמין|חשבונית|קבלה|תשלום|טופס|החזר|שכר/i.test(text)) {
      category = 'אדמיניסטרציה';
    } else if (/עבודה פרטית|ייעוץ פרטי|קליניקה/i.test(text)) {
      category = 'עבודה פרטית';
    } else if (/להתקשר|שיחה|טלפון|לתאם שיחה/i.test(text)) {
      category = 'שיחות טלפון';
    } else if (/בית|אישי|קניות|משפחה|ילד|בריאות/i.test(text)) {
      category = 'בית ואישי';
    }

    // Detect "מחכה ל..."
    const waitMatch = text.match(/מחכה ל[:\- ]+([^,\n\.]+)/i);
    if (waitMatch) {
      waitingFor = waitMatch[1].trim();
      priority = 'במעקב';
    }

    // Clean title (remove words like "דחוף")
    let title = text
      .replace(/[, ]*דחוף[, ]*/g, ' ')
      .replace(/[, ]*גבוה[, ]*/g, ' ')
      .replace(/[, ]*נמוך[, ]*/g, ' ')
      .trim();

    return {
      id: 'task_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      title: title || text,
      category,
      priority,
      source: 'ידני / חכם',
      waiting_for: waitingFor,
      check_date: checkDate,
      due_date: dueDate,
      notes: '',
      progress_log: [],
      completed: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  }
};

// --- Web Speech API (Voice Recording) ---
let recognition = null;
function setupVoiceRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    document.getElementById('voiceBtn').title = 'זיהוי קולי אינו נתמך בדפדפן זה (מומלץ ב-Chrome או Safari)';
    return;
  }

  recognition = new SpeechRecognition();
  recognition.lang = 'he-IL';
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onstart = () => {
    state.isRecording = true;
    document.getElementById('recordingBadge').classList.remove('hidden');
    document.getElementById('voiceBtnText').textContent = 'מקשיב...';
    document.getElementById('voiceBtn').classList.add('bg-red-50', 'text-red-600', 'border-red-300');
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    const input = document.getElementById('quickInput');
    input.value = input.value ? (input.value + ' ' + transcript) : transcript;
    showToast('ההקלטה נקלטה בהצלחה!', 'success');
  };

  recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
    showToast('שגיאה בזיהוי קולי: ' + event.error, 'warning');
  };

  recognition.onend = () => {
    state.isRecording = false;
    document.getElementById('recordingBadge').classList.add('hidden');
    document.getElementById('voiceBtnText').textContent = 'הקלטה';
    document.getElementById('voiceBtn').classList.remove('bg-red-50', 'text-red-600', 'border-red-300');
  };
}

// --- Date & Time Display ---
function updateDateDisplay() {
  const now = new Date();
  const days = ['יום ראשון', 'יום שני', 'יום שלישי', 'יום רביעי', 'יום חמישי', 'יום שישי', 'יום שבת'];
  const months = ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'];

  const dayName = days[now.getDay()];
  const day = now.getDate();
  const monthName = months[now.getMonth()];
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');

  const dateEl = document.getElementById('currentDateDisplay');
  const updatedEl = document.getElementById('lastUpdatedDisplay');
  if (dateEl) dateEl.textContent = `${dayName}, ${day} ב${monthName}`;
  if (updatedEl) updatedEl.textContent = `מעודכן: ${hours}:${minutes}`;
}

// --- Render Logic ---

function renderAll() {
  updateDateDisplay();
  renderCounters();
  renderCategoryPills();
  renderTasks();
  syncEngine.setIndicator();
}

function renderCounters() {
  const activeTasks = state.tasks.filter(t => !t.completed);

  const urgentCount = activeTasks.filter(t => t.priority === 'דחוף').length;
  const highCount = activeTasks.filter(t => t.priority === 'גבוה').length;
  const normalCount = activeTasks.filter(t => t.priority === 'רגיל').length;
  const lowCount = activeTasks.filter(t => t.priority === 'נמוך').length;
  const trackingCount = activeTasks.filter(t => t.priority === 'במעקב' || t.waiting_for).length;

  // Check how many tracking tasks need checking today or overdue
  const todayStr = new Date().toISOString().split('T')[0];
  const needCheckCount = activeTasks.filter(t => t.check_date && t.check_date <= todayStr).length;

  document.getElementById('countUrgent').textContent = urgentCount;
  document.getElementById('countHigh').textContent = highCount;
  document.getElementById('countNormal').textContent = normalCount;
  document.getElementById('countLow').textContent = lowCount;
  document.getElementById('countTracking').textContent = trackingCount;
  document.getElementById('countNeedCheckBadge').textContent = `${needCheckCount} לבדוק`;

  // Highlight active urgency card if filtered
  document.querySelectorAll('.urgency-card').forEach(btn => {
    const urg = btn.dataset.filterUrgency;
    if (state.activeUrgencyFilter === urg) {
      btn.classList.add('active-urgency-filter');
    } else {
      btn.classList.remove('active-urgency-filter');
    }
  });
}

function renderCategoryPills() {
  const container = document.getElementById('categoryPillsContainer');
  if (!container) return;

  const activeTasks = state.tasks.filter(t => !t.completed);
  const totalCount = activeTasks.length;

  let html = `
    <button data-cat="all" class="cat-pill ${state.activeCategoryFilter === 'all' ? 'active' : ''}">
      <span>הכל</span>
      <span class="count">(${totalCount})</span>
    </button>
  `;

  state.categories.forEach(cat => {
    const count = activeTasks.filter(t => t.category === cat).length;
    const isActive = state.activeCategoryFilter === cat ? 'active' : '';
    html += `
      <button data-cat="${cat}" class="cat-pill ${isActive}">
        <span>${cat}</span>
        <span class="count">(${count})</span>
      </button>
    `;
  });

  // Add new category button
  html += `
    <button id="addCustomCatBtn" class="cat-pill text-brand-900 border-dashed border-slate-300 hover:border-brand-500 bg-slate-50">
      <span>+ נושא חדש</span>
    </button>
  `;

  container.innerHTML = html;
}

function renderTasks() {
  const container = document.getElementById('tasksContainer');
  if (!container) return;

  // Filter tasks
  let filtered = state.tasks.filter(task => {
    // Search query
    if (state.searchQuery) {
      const q = state.searchQuery.toLowerCase();
      const matchTitle = task.title.toLowerCase().includes(q);
      const matchNotes = (task.notes || '').toLowerCase().includes(q);
      const matchWaiting = (task.waiting_for || '').toLowerCase().includes(q);
      if (!matchTitle && !matchNotes && !matchWaiting) return false;
    }

    // Category filter
    if (state.activeCategoryFilter !== 'all' && task.category !== state.activeCategoryFilter) {
      return false;
    }

    // Urgency filter
    if (state.activeUrgencyFilter) {
      if (state.activeUrgencyFilter === 'במעקב') {
        if (task.priority !== 'במעקב' && !task.waiting_for) return false;
      } else {
        if (task.priority !== state.activeUrgencyFilter) return false;
      }
    }

    return true;
  });

  // Sort tasks
  const priorityOrder = { 'דחוף': 1, 'גבוה': 2, 'במעקב': 3, 'רגיל': 4, 'נמוך': 5 };

  filtered.sort((a, b) => {
    // Completed tasks always at the bottom
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }

    if (state.activeSort === 'urgency') {
      const pA = priorityOrder[a.priority] || 99;
      const pB = priorityOrder[b.priority] || 99;
      if (pA !== pB) return pA - pB;
      // Secondary: Check date
      if (a.check_date && b.check_date) return a.check_date.localeCompare(b.check_date);
      return (b.created_at || '').localeCompare(a.created_at || '');
    } else if (state.activeSort === 'category') {
      return a.category.localeCompare(b.category, 'he');
    } else if (state.activeSort === 'date') {
      if (!a.due_date && !b.due_date) return 0;
      if (!a.due_date) return 1;
      if (!b.due_date) return -1;
      return a.due_date.localeCompare(b.due_date);
    }
    return 0;
  });

  // Show clear filters button if filters are active
  const clearBtn = document.getElementById('clearFiltersBtn');
  if (clearBtn) {
    if (state.activeCategoryFilter !== 'all' || state.activeUrgencyFilter !== null || state.searchQuery) {
      clearBtn.classList.remove('hidden');
    } else {
      clearBtn.classList.add('hidden');
    }
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="bg-white rounded-2xl p-10 text-center border border-slate-200/80 shadow-sm space-y-3">
        <div class="w-12 h-12 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <h4 class="text-base font-bold text-slate-700">אין משימות להצגה בסינון הנוכחי</h4>
        <p class="text-xs text-slate-500">נסי לנקות את הסינונים או להוסיף משימה חדשה למעלה.</p>
      </div>
    `;
    return;
  }

  // Render cards
  const todayStr = new Date().toISOString().split('T')[0];

  container.innerHTML = filtered.map(task => {
    const isCompleted = task.completed;
    const hasWaiting = !!task.waiting_for;
    const isCheckDue = task.check_date && task.check_date <= todayStr;

    // Format formatted Hebrew check date string
    let checkDateLabel = '';
    if (task.check_date) {
      const parts = task.check_date.split('-');
      if (parts.length === 3) {
        checkDateLabel = `${parts[2]}.${parts[1]}`;
      }
    }

    // Auto-link URLs in notes
    const formattedNotes = escapeHtml(task.notes || '').replace(
      /(https?:\/\/[^\s]+)/g, 
      '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">$1</a>'
    );

    // Progress Log HTML
    const logList = (task.progress_log || []).map(entry => `
      <div class="timeline-item text-xs text-slate-600 py-1">
        <span class="font-bold text-slate-700">${escapeHtml(entry.date)}:</span>
        <span class="mr-1">${escapeHtml(entry.text)}</span>
      </div>
    `).join('');

    return `
      <article class="task-card bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4 sm:p-5 transition space-y-3.5 ${isCompleted ? 'completed' : ''}" data-task-id="${task.id}">
        
        <!-- Header: Checkbox + Title + Badges -->
        <div class="flex items-start justify-between gap-3">
          <div class="flex-1 space-y-1.5">
            <div class="flex items-center gap-2 flex-wrap">
              <!-- Category Badge -->
              <span class="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200/80">
                ${escapeHtml(task.category)}
              </span>

              <!-- Priority Badge -->
              <span class="text-[11px] font-bold px-2 py-0.5 rounded-md ${getPriorityBadgeClass(task.priority)}">
                ${escapeHtml(task.priority)}
              </span>

              <!-- Source Tag -->
              ${task.source ? `<span class="text-[11px] text-slate-400 font-medium">· ${escapeHtml(task.source)}</span>` : ''}
            </div>

            <!-- Task Title -->
            <h3 class="task-title text-base sm:text-lg font-bold text-slate-900 leading-snug">
              ${escapeHtml(task.title)}
            </h3>
          </div>

          <!-- Checkbox for Done (Right aligned in RTL) -->
          <input 
            type="checkbox" 
            class="task-checkbox toggle-complete-btn" 
            ${isCompleted ? 'checked' : ''} 
            data-id="${task.id}"
            title="${isCompleted ? 'סמן כלא הושלם' : 'סמן כהושלם'}"
          >
        </div>

        <!-- Tracking Banner (Exact Screenshot 2 styling: Purple banner with 'הגיע הזמן לבדוק') -->
        ${hasWaiting ? `
          <div class="bg-purple-50/90 border border-purple-200/70 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div class="flex items-center gap-2 text-purple-950 font-medium">
              <span class="font-bold text-purple-900">מחכה ל:</span>
              <span>${escapeHtml(task.waiting_for)}</span>
            </div>

            <div class="flex items-center gap-2 shrink-0">
              ${isCheckDue ? `
                <span class="bg-[#dc2626] text-white font-extrabold px-2.5 py-0.5 rounded-full text-[11px] shadow-sm animate-pulse">
                  הגיע הזמן לבדוק
                </span>
              ` : (checkDateLabel ? `
                <span class="bg-purple-800 text-purple-100 font-bold px-2.5 py-0.5 rounded-full text-[11px]">
                  לבדוק ב-${checkDateLabel}
                </span>
              ` : '')}
            </div>
          </div>
        ` : ''}

        <!-- Notes / Links Description Box -->
        ${task.notes ? `
          <div class="task-description bg-slate-50/80 rounded-xl p-3 border border-slate-200/60 text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
            ${formattedNotes}
          </div>
        ` : ''}

        <!-- "פיתוח משימה" - Progress Log & History -->
        <div class="pt-1 border-t border-slate-100 space-y-2">
          ${logList ? `
            <div class="space-y-1 bg-slate-50/50 p-2.5 rounded-xl border border-slate-200/40">
              <div class="text-[11px] font-bold text-slate-500 mb-1">התפתחויות ומעקב:</div>
              ${logList}
            </div>
          ` : ''}

          <!-- Quick Progress Update Input (Screenshot 2: 'עדכון התקדמות') -->
          <form class="quick-log-form flex items-center gap-1.5" data-id="${task.id}">
            <button 
              type="submit" 
              class="bg-brand-900 hover:bg-brand-950 text-white font-bold px-3 py-1.5 rounded-lg text-xs transition shrink-0 active:scale-95 shadow-sm"
            >
              + עדכון
            </button>
            <input 
              type="text" 
              name="logText" 
              placeholder="עדכון התקדמות (למשל: שלחתי מייל, מחכה לתשובה)" 
              class="flex-1 rounded-lg border border-slate-300 py-1.5 px-3 text-xs focus:ring-1 focus:ring-brand-500 outline-none bg-white"
            >
          </form>
        </div>

        <!-- Action Bar (Screenshot 2: עריכה, מחיקה, עוד שבוע, התקבלה תשובה) -->
        <div class="flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
          <div class="flex items-center gap-2 flex-wrap">
            <button class="action-snooze-btn hover:text-purple-700 font-medium transition" data-id="${task.id}" title="דחה בדיקה בשבוע">
              עוד שבוע
            </button>
            <span>•</span>
            <button class="action-tracking-btn hover:text-purple-700 font-medium transition" data-id="${task.id}">
              שינוי מעקב
            </button>
            <span>•</span>
            <button class="action-resolve-btn hover:text-emerald-700 font-medium text-emerald-800 transition" data-id="${task.id}">
              ✓ התקבלה תשובה, לסגור
            </button>
          </div>

          <div class="flex items-center gap-3">
            <button class="action-edit-btn hover:text-brand-900 font-semibold transition" data-id="${task.id}">
              עריכה
            </button>
            <span>•</span>
            <button class="action-delete-btn hover:text-red-700 font-medium text-slate-400 hover:text-red-600 transition" data-id="${task.id}">
              מחיקה
            </button>
          </div>
        </div>

      </article>
    `;
  }).join('');
}

function getPriorityBadgeClass(priority) {
  switch (priority) {
    case 'דחוף':
      return 'bg-red-100 text-red-700 border border-red-200';
    case 'גבוה':
      return 'bg-amber-100 text-amber-800 border border-amber-200';
    case 'במעקב':
      return 'bg-purple-100 text-purple-800 border border-purple-200';
    case 'נמוך':
      return 'bg-emerald-100 text-emerald-700 border border-emerald-200';
    default:
      return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
  }
}

function escapeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// --- Event Handlers & User Actions ---

function setupEventListeners() {
  // 1. Smart Add Button
  document.getElementById('smartAddBtn').addEventListener('click', handleSmartAdd);
  document.getElementById('quickInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSmartAdd();
    }
  });

  // 2. Voice Recording Toggle
  document.getElementById('voiceBtn').addEventListener('click', () => {
    if (!recognition) {
      showToast('זיהוי קולי אינו נתמך בדפדפן הנוכחי. השתמשי בהקלדה או במקלדת הקולית של הטלפון', 'warning');
      return;
    }
    if (state.isRecording) {
      recognition.stop();
    } else {
      recognition.start();
    }
  });

  // 3. Category Filter Click
  document.getElementById('categoryPillsContainer').addEventListener('click', (e) => {
    const pill = e.target.closest('.cat-pill');
    if (!pill) return;

    if (pill.id === 'addCustomCatBtn') {
      promptAddCategory();
      return;
    }

    const cat = pill.dataset.cat;
    state.activeCategoryFilter = cat;
    renderAll();
  });

  // 4. Urgency Card Filter Click
  document.querySelectorAll('.urgency-card').forEach(btn => {
    btn.addEventListener('click', () => {
      const urg = btn.dataset.filterUrgency;
      if (state.activeUrgencyFilter === urg) {
        state.activeUrgencyFilter = null; // toggle off
      } else {
        state.activeUrgencyFilter = urg;
      }
      renderAll();
    });
  });

  // 5. Sort Controls
  document.getElementById('sortUrgencyBtn').addEventListener('click', () => setSort('urgency', 'sortUrgencyBtn'));
  document.getElementById('sortCategoryBtn').addEventListener('click', () => setSort('category', 'sortCategoryBtn'));
  document.getElementById('sortDateBtn').addEventListener('click', () => setSort('date', 'sortDateBtn'));

  // 6. Search Input
  document.getElementById('searchInput').addEventListener('input', (e) => {
    state.searchQuery = e.target.value.trim();
    renderTasks();
  });

  // 7. Clear Filters
  document.getElementById('clearFiltersBtn').addEventListener('click', () => {
    state.activeCategoryFilter = 'all';
    state.activeUrgencyFilter = null;
    state.searchQuery = '';
    document.getElementById('searchInput').value = '';
    renderAll();
  });

  // 8. Task Container Delegated Events (Check, Log, Actions)
  const container = document.getElementById('tasksContainer');
  container.addEventListener('click', handleTaskContainerClick);
  container.addEventListener('submit', handleTaskContainerSubmit);

  // 9. Manual Add Modal
  document.getElementById('openManualBtn').addEventListener('click', () => openTaskModal());
  document.getElementById('taskForm').addEventListener('submit', handleTaskFormSubmit);

  // 10. Batch Add Modal
  document.getElementById('openBatchBtn').addEventListener('click', () => {
    document.getElementById('batchModal').classList.remove('hidden');
    document.getElementById('batchTextarea').focus();
  });
  document.getElementById('submitBatchBtn').addEventListener('click', handleBatchSubmit);

  // 11. Settings & Google Sheets Sync Modal
  document.getElementById('openSettingsBtn').addEventListener('click', openSettingsModal);
  document.getElementById('syncBtn').addEventListener('click', () => {
    if (!state.sheetsUrl) {
      openSettingsModal();
    } else {
      syncEngine.pullFromGoogleSheets();
    }
  });
  document.getElementById('saveSettingsBtn').addEventListener('click', saveSettings);
  document.getElementById('testSyncBtn').addEventListener('click', testSyncConnection);
  document.getElementById('copyScriptBtn').addEventListener('click', copyAppsScriptCode);

  // 12. Backup Export / Import
  document.getElementById('downloadBackupBtn').addEventListener('click', exportBackupJson);
  document.getElementById('exportJsonBtn').addEventListener('click', exportBackupJson);
  document.getElementById('importBackupInput').addEventListener('change', importBackupJson);
  document.getElementById('resetDemoTasksBtn').addEventListener('click', resetToDemoTasks);

  // 13. Close Modals
  document.querySelectorAll('.modal-close-btn').forEach(btn => {
    btn.addEventListener('click', closeAllModals);
  });
  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('backdrop-blur-sm')) {
      closeAllModals();
    }
  });
}

function handleSmartAdd() {
  const input = document.getElementById('quickInput');
  const text = input.value.trim();
  if (!text) {
    input.focus();
    return;
  }

  const newTask = SmartParser.parse(text);
  if (newTask) {
    state.tasks.unshift(newTask);
    state.saveTasks();
    input.value = '';
    renderAll();
    showToast('המשימה נוספה וסודרה בהצלחה!', 'success');
  }
}

function handleBatchSubmit() {
  const textarea = document.getElementById('batchTextarea');
  const raw = textarea.value.trim();
  if (!raw) return;

  const lines = raw.split(/\r?\n/).map(l => l.trim().replace(/^[-*•\d.]+\s*/, '')).filter(Boolean);
  if (lines.length === 0) return;

  let addedCount = 0;
  lines.forEach(line => {
    const task = SmartParser.parse(line);
    if (task) {
      state.tasks.unshift(task);
      addedCount++;
    }
  });

  state.saveTasks();
  textarea.value = '';
  closeAllModals();
  renderAll();
  showToast(`נוספו ${addedCount} משימות בבת אחת (0 טוקנים!)`, 'success');
}

function handleTaskContainerClick(e) {
  // Toggle complete checkbox
  if (e.target.classList.contains('toggle-complete-btn')) {
    const id = e.target.dataset.id;
    const task = state.tasks.find(t => t.id === id);
    if (task) {
      task.completed = e.target.checked;
      task.updated_at = new Date().toISOString();
      state.saveTasks();
      renderAll();
      showToast(task.completed ? 'משימה הושלמה! ✓' : 'משימה הוחזרה לפעילות', 'info');
    }
    return;
  }

  // Delete
  if (e.target.classList.contains('action-delete-btn')) {
    const id = e.target.dataset.id;
    if (confirm('למחוק משימה זו לצמיתות?')) {
      state.tasks = state.tasks.filter(t => t.id !== id);
      state.saveTasks();
      renderAll();
      showToast('המשימה נמחקה', 'info');
    }
    return;
  }

  // Edit
  if (e.target.classList.contains('action-edit-btn')) {
    const id = e.target.dataset.id;
    const task = state.tasks.find(t => t.id === id);
    if (task) openTaskModal(task);
    return;
  }

  // Snooze +7 days
  if (e.target.classList.contains('action-snooze-btn')) {
    const id = e.target.dataset.id;
    const task = state.tasks.find(t => t.id === id);
    if (task) {
      const nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);
      task.check_date = nextWeek.toISOString().split('T')[0];
      task.priority = 'במעקב';
      state.saveTasks();
      renderAll();
      showToast('הבדיקה נדחתה בשבוע', 'success');
    }
    return;
  }

  // Change Tracking
  if (e.target.classList.contains('action-tracking-btn')) {
    const id = e.target.dataset.id;
    const task = state.tasks.find(t => t.id === id);
    if (task) {
      const newWait = prompt('מחכה ל... (למשל: תשובה במייל, אישור מנהל):', task.waiting_for || '');
      if (newWait !== null) {
        task.waiting_for = newWait.trim();
        if (task.waiting_for) task.priority = 'במעקב';
        state.saveTasks();
        renderAll();
      }
    }
    return;
  }

  // Resolve & Close
  if (e.target.classList.contains('action-resolve-btn')) {
    const id = e.target.dataset.id;
    const task = state.tasks.find(t => t.id === id);
    if (task) {
      task.completed = true;
      task.progress_log = task.progress_log || [];
      task.progress_log.push({
        id: 'p_' + Date.now(),
        date: new Date().toLocaleDateString('he-IL', { day: 'numeric', month: 'numeric' }),
        text: 'התקבלה תשובה / הנושא נסגר בהצלחה'
      });
      state.saveTasks();
      renderAll();
      showToast('המשימה נסגרה בהצלחה!', 'success');
    }
    return;
  }
}

function handleTaskContainerSubmit(e) {
  // Quick Log form submission ("פיתוח משימה")
  if (e.target.classList.contains('quick-log-form')) {
    e.preventDefault();
    const id = e.target.dataset.id;
    const input = e.target.elements['logText'];
    const text = input.value.trim();
    if (!text) return;

    const task = state.tasks.find(t => t.id === id);
    if (task) {
      task.progress_log = task.progress_log || [];
      const now = new Date();
      const dateStr = now.toLocaleDateString('he-IL', { weekday: 'short', day: 'numeric', month: 'numeric' });

      task.progress_log.push({
        id: 'p_' + Date.now(),
        date: dateStr,
        text: text
      });

      task.updated_at = now.toISOString();
      state.saveTasks();
      input.value = '';
      renderTasks();
      showToast('ההתפתחות נשמרה ביומן המשימה!', 'success');
    }
  }
}

function setSort(sortType, activeBtnId) {
  state.activeSort = sortType;
  document.querySelectorAll('.sort-toggle-btn').forEach(b => {
    b.classList.remove('active-sort');
    b.classList.add('text-slate-600');
  });
  const btn = document.getElementById(activeBtnId);
  btn.classList.add('active-sort');
  btn.classList.remove('text-slate-600');
  renderTasks();
}

function promptAddCategory() {
  const name = prompt('שם הנושא החדש:');
  if (name && name.trim()) {
    const clean = name.trim();
    if (!state.categories.includes(clean)) {
      state.categories.push(clean);
      state.saveCategories();
      renderCategoryPills();
      showToast(`הנושא "${clean}" נוסף בהצלחה!`, 'success');
    }
  }
}

// --- Modals Logic ---

function openTaskModal(task = null) {
  const modal = document.getElementById('taskModal');
  const catSelect = document.getElementById('taskCategorySelect');

  // Populate category options
  catSelect.innerHTML = state.categories.map(c => `<option value="${c}">${c}</option>`).join('');

  if (task) {
    document.getElementById('modalTitle').textContent = 'עריכת משימה';
    document.getElementById('editTaskId').value = task.id;
    document.getElementById('taskTitleInput').value = task.title;
    catSelect.value = task.category;
    document.getElementById('taskPrioritySelect').value = task.priority;
    document.getElementById('taskWaitingForInput').value = task.waiting_for || '';
    document.getElementById('taskCheckDateInput').value = task.check_date || '';
    document.getElementById('taskDueDateInput').value = task.due_date || '';
    document.getElementById('taskNotesInput').value = task.notes || '';
  } else {
    document.getElementById('modalTitle').textContent = 'משימה חדשה';
    document.getElementById('editTaskId').value = '';
    document.getElementById('taskForm').reset();
    document.getElementById('taskPrioritySelect').value = 'רגיל';
  }

  modal.classList.remove('hidden');
}

function handleTaskFormSubmit(e) {
  e.preventDefault();
  const editId = document.getElementById('editTaskId').value;
  const title = document.getElementById('taskTitleInput').value.trim();
  const category = document.getElementById('taskCategorySelect').value;
  const priority = document.getElementById('taskPrioritySelect').value;
  const waitingFor = document.getElementById('taskWaitingForInput').value.trim();
  const checkDate = document.getElementById('taskCheckDateInput').value;
  const dueDate = document.getElementById('taskDueDateInput').value;
  const notes = document.getElementById('taskNotesInput').value.trim();

  if (!title) return;

  if (editId) {
    // Update existing
    const task = state.tasks.find(t => t.id === editId);
    if (task) {
      task.title = title;
      task.category = category;
      task.priority = priority;
      task.waiting_for = waitingFor;
      task.check_date = checkDate;
      task.due_date = dueDate;
      task.notes = notes;
      task.updated_at = new Date().toISOString();
      showToast('המשימה עודכנה בהצלחה', 'success');
    }
  } else {
    // Create new
    const newTask = {
      id: 'task_' + Date.now(),
      title,
      category,
      priority: waitingFor ? 'במעקב' : priority,
      source: 'ידני',
      waiting_for: waitingFor,
      check_date: checkDate,
      due_date: dueDate,
      notes,
      progress_log: [],
      completed: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    state.tasks.unshift(newTask);
    showToast('המשימה נוספה בהצלחה', 'success');
  }

  state.saveTasks();
  closeAllModals();
  renderAll();
}

function openSettingsModal() {
  document.getElementById('sheetsApiUrlInput').value = state.sheetsUrl;
  document.getElementById('settingsModal').classList.remove('hidden');
}

function saveSettings() {
  const url = document.getElementById('sheetsApiUrlInput').value;
  state.setSheetsUrl(url);
  closeAllModals();
  syncEngine.setIndicator();
  showToast('הגדרות Google Sheets נשמרו בהצלחה', 'success');
}

async function testSyncConnection() {
  const url = document.getElementById('sheetsApiUrlInput').value.trim();
  const resultDiv = document.getElementById('syncTestResult');
  resultDiv.classList.remove('hidden', 'bg-emerald-50', 'text-emerald-800', 'bg-red-50', 'text-red-800');

  if (!url) {
    resultDiv.classList.add('bg-red-50', 'text-red-800');
    resultDiv.textContent = 'יש להזין כתובת Web App URL תקינה מגוגל.';
    return;
  }

  state.setSheetsUrl(url);
  resultDiv.classList.add('bg-blue-50', 'text-blue-800');
  resultDiv.textContent = 'בודק חיבור מול Google Sheets...';

  const success = await syncEngine.pullFromGoogleSheets();
  resultDiv.classList.remove('bg-blue-50', 'text-blue-800');

  if (success) {
    resultDiv.classList.add('bg-emerald-50', 'text-emerald-800');
    resultDiv.textContent = '✓ החיבור הצליח! המשימות סונכרנו מול הגיליון.';
  } else {
    resultDiv.classList.add('bg-red-50', 'text-red-800');
    resultDiv.textContent = 'חיבור נבדק. הוגדר לסנכרון רקע.';
  }
}

function closeAllModals() {
  document.querySelectorAll('#taskModal, #batchModal, #settingsModal').forEach(m => m.classList.add('hidden'));
}

// --- Backup & Restore ---
function exportBackupJson() {
  const data = {
    exported_at: new Date().toISOString(),
    tasks: state.tasks,
    categories: state.categories
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `rachel-tasks-backup-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('קובץ הגיבוי הורד בהצלחה', 'success');
}

function importBackupJson(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const data = JSON.parse(event.target.result);
      if (Array.isArray(data.tasks)) {
        state.tasks = data.tasks;
        if (Array.isArray(data.categories)) state.categories = data.categories;
        state.saveTasks();
        state.saveCategories();
        renderAll();
        closeAllModals();
        showToast('המשימות שוחזרו בהצלחה מהקובץ!', 'success');
      }
    } catch (err) {
      alert('קובץ גיבוי לא תקין.');
    }
  };
  reader.readAsText(file);
}

function resetToDemoTasks() {
  if (confirm('לאפס את כל המשימות למשימות ההדגמה מהצילום מסך?')) {
    state.tasks = JSON.parse(JSON.stringify(INITIAL_DEMO_TASKS));
    state.categories = [...DEFAULT_CATEGORIES];
    state.saveTasks();
    state.saveCategories();
    renderAll();
    closeAllModals();
    showToast('הנתונים אופסו למשימות המקוריות', 'info');
  }
}

// --- Toast Notification ---
function showToast(message, type = 'info') {
  const toast = document.getElementById('toast');
  const msgEl = document.getElementById('toastMsg');
  const iconEl = document.getElementById('toastIcon');

  msgEl.textContent = message;

  if (type === 'success') {
    iconEl.innerHTML = '✓';
    toast.className = 'fixed bottom-5 left-5 z-50 bg-emerald-700 text-white px-4 py-3 rounded-xl shadow-xl text-sm flex items-center gap-2 transition-all duration-300 opacity-100 translate-y-0';
  } else if (type === 'warning') {
    iconEl.innerHTML = '⚠️';
    toast.className = 'fixed bottom-5 left-5 z-50 bg-amber-600 text-white px-4 py-3 rounded-xl shadow-xl text-sm flex items-center gap-2 transition-all duration-300 opacity-100 translate-y-0';
  } else {
    iconEl.innerHTML = 'ℹ️';
    toast.className = 'fixed bottom-5 left-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl text-sm flex items-center gap-2 transition-all duration-300 opacity-100 translate-y-0';
  }

  setTimeout(() => {
    toast.className = 'fixed bottom-5 left-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-lg text-sm flex items-center gap-2 transition-all duration-300 opacity-0 pointer-events-none translate-y-3';
  }, 3500);
}

// --- Copy Apps Script Code ---
function copyAppsScriptCode() {
  const code = `
/**
 * קוד Google Apps Script עבור דשבורד המשימות של רחל
 * הדביקי קוד זה ב: תוספים (Extensions) -> Apps Script
 */

function doGet(e) {
  var sheet = getOrCreateSheet();
  var data = sheet.getDataRange().getValues();
  if (data.length <= 1) {
    return ContentService.createTextOutput(JSON.stringify({ tasks: [] }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  var headers = data[0];
  var tasks = [];
  
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var task = {};
    for (var j = 0; j < headers.length; j++) {
      var val = row[j];
      if (headers[j] === 'progress_log' && val) {
        try { val = JSON.parse(val); } catch(e) { val = []; }
      }
      if (headers[j] === 'completed') {
        val = (val === true || val === 'TRUE' || val === 'true');
      }
      task[headers[j]] = val;
    }
    tasks.push(task);
  }
  
  return ContentService.createTextOutput(JSON.stringify({ tasks: tasks }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var sheet = getOrCreateSheet();
  var body = JSON.parse(e.postData.contents);
  
  if (body.action === 'sync_all' && Array.isArray(body.tasks)) {
    // Clear and rewrite tasks
    sheet.clearContents();
    var headers = ['id', 'title', 'category', 'priority', 'source', 'waiting_for', 'check_date', 'due_date', 'notes', 'progress_log', 'completed', 'created_at', 'updated_at'];
    var rows = [headers];
    
    body.tasks.forEach(function(t) {
      rows.push([
        t.id || '',
        t.title || '',
        t.category || '',
        t.priority || '',
        t.source || '',
        t.waiting_for || '',
        t.check_date || '',
        t.due_date || '',
        t.notes || '',
        JSON.stringify(t.progress_log || []),
        t.completed ? true : false,
        t.created_at || '',
        t.updated_at || ''
      ]);
    });
    
    sheet.getRange(1, 1, rows.length, headers.length).setValues(rows);
    return ContentService.createTextOutput(JSON.stringify({ status: 'ok', count: body.tasks.length }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  // WhatsApp / Webhook direct single task insertion:
  if (body.action === 'add_task') {
    var headers = ['id', 'title', 'category', 'priority', 'source', 'waiting_for', 'check_date', 'due_date', 'notes', 'progress_log', 'completed', 'created_at', 'updated_at'];
    var newRow = [
      'task_' + Date.now(),
      body.title || 'משימה חדשה',
      body.category || 'אחר',
      body.priority || 'רגיל',
      body.source || 'נוסף מוואטסאפ',
      body.waiting_for || '',
      body.check_date || '',
      body.due_date || '',
      body.notes || '',
      JSON.stringify([]),
      false,
      new Date().toISOString(),
      new Date().toISOString()
    ];
    sheet.appendRow(newRow);
    return ContentService.createTextOutput(JSON.stringify({ status: 'task_added' }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService.createTextOutput(JSON.stringify({ status: 'unknown_action' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getOrCreateSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('משימות');
  if (!sheet) {
    sheet = ss.insertSheet('משימות');
    var headers = ['id', 'title', 'category', 'priority', 'source', 'waiting_for', 'check_date', 'due_date', 'notes', 'progress_log', 'completed', 'created_at', 'updated_at'];
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#f1f5f9');
  }
  return sheet;
}
`;

  navigator.clipboard.writeText(code).then(() => {
    showToast('הקוד הועתק ללוח! עכשיו פתחי את ה-Apps Script והדביקי', 'success');
  }).catch(() => {
    showToast('לא הצלחנו להעתיק אוטומטית. ניתן להעתיק מקובץ google-apps-script.js', 'warning');
  });
}

// --- PWA Installation & Service Worker ---
let deferredPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  const pwaBtn = document.getElementById('pwaInstallFooterBtn');
  if (pwaBtn) {
    pwaBtn.classList.remove('hidden');
    pwaBtn.addEventListener('click', () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(() => {
          deferredPrompt = null;
        });
      }
    });
  }
});

if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(err => console.log('SW registration:', err));
  });
}

// --- Initialize Application ---
window.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  setupVoiceRecognition();
  renderAll();

  // If user already configured Google Sheets, sync in background
  if (state.sheetsUrl) {
    syncEngine.pullFromGoogleSheets();
  }

  // Update clock every minute
  setInterval(updateDateDisplay, 60000);
});
