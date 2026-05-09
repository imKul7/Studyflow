/* ================================
   STUDYFLOW ADMIN LOGIC
   ================================ */

const ADMIN_TASK_KEY = "studyflow_tasks_v1";
const ADMIN_HISTORY_KEY = "studyflow_history_v1";
const ADMIN_SUBJECT_KEY = "studyflow_subjects_v1";
const ADMIN_TARGET_KEY = "studyflow_targets_v1";
const ADMIN_PLANNER_KEY = "studyflow_planner_v1";
const ADMIN_FOCUS_KEY = "studyflow_focus_sessions_v1";
const ADMIN_NOTE_KEY = "studyflow_notes_v1";
const ADMIN_REFLECTION_KEY = "studyflow_reflections_v1";
const ADMIN_AUTH_KEY = "studyflow_admin_logged_in";

let adminTasks = [];
let adminHistories = [];
let adminSubjects = [];
let adminTargets = [];
let adminPlans = [];
let adminFocusSessions = [];
let adminNotes = [];
let adminReflections = [];

const adminElements = {
  loginSection: document.getElementById("adminLoginSection"),
  dashboardSection: document.getElementById("adminDashboardSection"),
  loginForm: document.getElementById("adminLoginForm"),
  username: document.getElementById("adminUsername"),
  password: document.getElementById("adminPassword"),

  logoutBtn: document.getElementById("adminLogoutBtn"),
  refreshBtn: document.getElementById("adminRefreshBtn"),
  exportBtn: document.getElementById("adminExportBtn"),

  totalTasks: document.getElementById("adminTotalTasks"),
  activeTasks: document.getElementById("adminActiveTasks"),
  doneTasks: document.getElementById("adminDoneTasks"),
  urgentTasks: document.getElementById("adminUrgentTasks"),
  overdueTasks: document.getElementById("adminOverdueTasks"),
  highPriorityTasks: document.getElementById("adminHighPriorityTasks"),
  totalSubjects: document.getElementById("adminTotalSubjects"),
  todayTargets: document.getElementById("adminTodayTargets"),
  studyPlans: document.getElementById("adminStudyPlans"),
  focusMinutes: document.getElementById("adminFocusMinutes"),
  totalNotes: document.getElementById("adminTotalNotes"),
  averageReflection: document.getElementById("adminAverageReflection"),
  insightText: document.getElementById("adminInsightText"),

  searchInput: document.getElementById("adminSearchInput"),
  statusFilter: document.getElementById("adminStatusFilter"),
  priorityFilter: document.getElementById("adminPriorityFilter"),

  taskTable: document.getElementById("adminTaskTable"),
  emptyTasks: document.getElementById("adminEmptyTasks"),

  subjectList: document.getElementById("adminSubjectList"),
  subjectCountBadge: document.getElementById("adminSubjectCountBadge"),
  emptySubjects: document.getElementById("adminEmptySubjects"),

  targetList: document.getElementById("adminTargetList"),
  targetCountBadge: document.getElementById("adminTargetCountBadge"),
  emptyTargets: document.getElementById("adminEmptyTargets"),

  plannerList: document.getElementById("adminPlannerList"),
  plannerCountBadge: document.getElementById("adminPlannerCountBadge"),
  emptyPlanner: document.getElementById("adminEmptyPlanner"),

  focusList: document.getElementById("adminFocusList"),
  focusCountBadge: document.getElementById("adminFocusCountBadge"),
  emptyFocus: document.getElementById("adminEmptyFocus"),

  reflectionList: document.getElementById("adminReflectionList"),
  reflectionCountBadge: document.getElementById("adminReflectionCountBadge"),
  emptyReflections: document.getElementById("adminEmptyReflections"),

  noteList: document.getElementById("adminNoteList"),
  emptyNotes: document.getElementById("adminEmptyNotes"),

  historyList: document.getElementById("adminHistoryList"),
  emptyHistory: document.getElementById("adminEmptyHistory"),

  toast: document.getElementById("adminToast"),
  toastMessage: document.getElementById("adminToastMessage")
};

document.addEventListener("DOMContentLoaded", initAdmin);

function initAdmin() {
  attachAdminEvents();

  const isLoggedIn = localStorage.getItem(ADMIN_AUTH_KEY) === "true";

  if (isLoggedIn) {
    showAdminDashboard();
  } else {
    showAdminLogin();
  }
}

function attachAdminEvents() {
  if (adminElements.loginForm) {
    adminElements.loginForm.addEventListener("submit", handleAdminLogin);
  }

  if (adminElements.logoutBtn) {
    adminElements.logoutBtn.addEventListener("click", handleAdminLogout);
  }

  if (adminElements.refreshBtn) {
    adminElements.refreshBtn.addEventListener("click", refreshAdminData);
  }

  if (adminElements.exportBtn) {
    adminElements.exportBtn.addEventListener("click", exportAdminReport);
  }

  if (adminElements.searchInput) {
    adminElements.searchInput.addEventListener("input", renderAdminTaskTable);
  }

  if (adminElements.statusFilter) {
    adminElements.statusFilter.addEventListener("change", renderAdminTaskTable);
  }

  if (adminElements.priorityFilter) {
    adminElements.priorityFilter.addEventListener("change", renderAdminTaskTable);
  }

  if (adminElements.taskTable) {
    adminElements.taskTable.addEventListener("click", handleAdminTaskAction);
  }
}

/* ================================
   AUTH
   ================================ */

function handleAdminLogin(event) {
  event.preventDefault();

  const username = adminElements.username.value.trim();
  const password = adminElements.password.value.trim();

  if (username === "admin" && password === "studyflow123") {
    localStorage.setItem(ADMIN_AUTH_KEY, "true");
    showAdminDashboard();
    showAdminToast("Login admin berhasil.");
  } else {
    showAdminToast("Username atau password admin salah.");
  }
}

function handleAdminLogout() {
  localStorage.removeItem(ADMIN_AUTH_KEY);
  showAdminLogin();
  showAdminToast("Admin berhasil logout.");
}

function showAdminLogin() {
  adminElements.loginSection.classList.remove("hidden");
  adminElements.dashboardSection.classList.add("hidden");
  adminElements.logoutBtn.classList.add("hidden");
}

function showAdminDashboard() {
  adminElements.loginSection.classList.add("hidden");
  adminElements.dashboardSection.classList.remove("hidden");
  adminElements.logoutBtn.classList.remove("hidden");

  refreshAdminData();
}

/* ================================
   DATA
   ================================ */

function refreshAdminData() {
  adminTasks = loadAdminArray(ADMIN_TASK_KEY);
  adminHistories = loadAdminArray(ADMIN_HISTORY_KEY);
  adminSubjects = loadAdminArray(ADMIN_SUBJECT_KEY);
  adminTargets = loadAdminArray(ADMIN_TARGET_KEY);
  adminPlans = loadAdminArray(ADMIN_PLANNER_KEY);
  adminFocusSessions = loadAdminArray(ADMIN_FOCUS_KEY);
  adminNotes = loadAdminArray(ADMIN_NOTE_KEY);
  adminReflections = loadAdminArray(ADMIN_REFLECTION_KEY);

  renderAdminStats();
  renderAdminInsight();
  renderAdminTaskTable();
  renderAdminSubjects();
  renderAdminTargets();
  renderAdminPlanner();
  renderAdminFocusSessions();
  renderAdminReflections();
  renderAdminNotes();
  renderAdminHistory();

  showAdminToast("Data admin berhasil diperbarui.");
}

function loadAdminArray(key) {
  try {
    const stored = localStorage.getItem(key);
    const parsed = stored ? JSON.parse(stored) : [];

    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error(`Gagal membaca data ${key}:`, error);
    return [];
  }
}

function saveAdminTasks() {
  localStorage.setItem(ADMIN_TASK_KEY, JSON.stringify(adminTasks));
}

function saveAdminHistories() {
  localStorage.setItem(ADMIN_HISTORY_KEY, JSON.stringify(adminHistories));
}

/* ================================
   STATS
   ================================ */

function renderAdminStats() {
  const total = adminTasks.length;
  const done = adminTasks.filter((task) => isAdminTaskDone(task)).length;
  const active = total - done;

  const urgent = adminTasks.filter((task) => {
    const daysLeft = getAdminDaysLeft(task.deadline);
    return !isAdminTaskDone(task) && daysLeft >= 0 && daysLeft <= 3;
  }).length;

  const overdue = adminTasks.filter((task) => {
    return !isAdminTaskDone(task) && getAdminDaysLeft(task.deadline) < 0;
  }).length;

  const highPriority = adminTasks.filter((task) => {
    return !isAdminTaskDone(task) && task.priority === "Tinggi";
  }).length;

  const today = toAdminDateInputValue(new Date());

  const todayTargets = adminTargets.filter((target) => {
    return target.date === today;
  }).length;

  const upcomingPlans = adminPlans.filter((plan) => {
    return plan.date >= today;
  }).length;

  const weekFocusMinutes = getAdminThisWeekFocusMinutes();
  const averageReflection = getAdminAverageReflectionScore();

  setText(adminElements.totalTasks, total);
  setText(adminElements.activeTasks, active);
  setText(adminElements.doneTasks, done);
  setText(adminElements.urgentTasks, urgent);
  setText(adminElements.overdueTasks, overdue);
  setText(adminElements.highPriorityTasks, highPriority);
  setText(adminElements.totalSubjects, adminSubjects.length);
  setText(adminElements.todayTargets, todayTargets);
  setText(adminElements.studyPlans, upcomingPlans);
  setText(adminElements.focusMinutes, weekFocusMinutes);
  setText(adminElements.totalNotes, adminNotes.length);
  setText(adminElements.averageReflection, averageReflection);
}

function renderAdminInsight() {
  if (!adminElements.insightText) return;

  const total = adminTasks.length;
  const done = adminTasks.filter((task) => isAdminTaskDone(task)).length;
  const overdue = adminTasks.filter((task) => {
    return !isAdminTaskDone(task) && getAdminDaysLeft(task.deadline) < 0;
  }).length;

  const urgent = adminTasks.filter((task) => {
    const daysLeft = getAdminDaysLeft(task.deadline);
    return !isAdminTaskDone(task) && daysLeft >= 0 && daysLeft <= 3;
  }).length;

  const completion = total === 0 ? 0 : Math.round((done / total) * 100);
  const weekFocusMinutes = getAdminThisWeekFocusMinutes();
  const averageReflection = getAdminAverageReflectionScore();

  if (total === 0) {
    adminElements.insightText.textContent =
      "Belum ada data tugas. Admin dapat meminta user menambahkan tugas melalui halaman mahasiswa agar dashboard monitoring mulai menampilkan data.";
    return;
  }

  if (overdue > 0) {
    adminElements.insightText.textContent =
      `Perlu perhatian. Terdapat ${overdue} tugas yang sudah melewati deadline. Admin dapat memprioritaskan pemantauan pada tugas terlambat.`;
    return;
  }

  if (urgent > 0) {
    adminElements.insightText.textContent =
      `Terdapat ${urgent} tugas dengan deadline dekat. Admin dapat memantau tugas tersebut agar user tidak terlambat mengerjakan.`;
    return;
  }

  if (completion >= 80 && weekFocusMinutes >= 120) {
    adminElements.insightText.textContent =
      "Produktivitas terlihat sangat baik. Mayoritas tugas selesai dan durasi fokus minggu ini sudah tinggi.";
    return;
  }

  if (averageReflection >= 8) {
    adminElements.insightText.textContent =
      "Refleksi belajar menunjukkan hasil yang baik. Skor rata-rata refleksi cukup tinggi dan proses belajar terlihat positif.";
    return;
  }

  adminElements.insightText.textContent =
    "Data akademik sudah berjalan. Produktivitas dapat ditingkatkan dengan rutin menggunakan target harian, study planner, focus timer, dan refleksi belajar.";
}

/* ================================
   TABLE
   ================================ */

function renderAdminTaskTable() {
  if (!adminElements.taskTable || !adminElements.emptyTasks) return;

  const filteredTasks = getFilteredAdminTasks();

  if (filteredTasks.length === 0) {
    adminElements.taskTable.innerHTML = "";
    adminElements.emptyTasks.classList.remove("hidden");
    return;
  }

  adminElements.emptyTasks.classList.add("hidden");

  adminElements.taskTable.innerHTML = filteredTasks
    .map((task, index) => createAdminTaskRow(task, index))
    .join("");
}

function getFilteredAdminTasks() {
  const keyword = adminElements.searchInput
    ? adminElements.searchInput.value.toLowerCase().trim()
    : "";

  const status = adminElements.statusFilter
    ? adminElements.statusFilter.value
    : "Semua";

  const priority = adminElements.priorityFilter
    ? adminElements.priorityFilter.value
    : "Semua";

  let result = [...adminTasks];

  if (keyword) {
    result = result.filter((task) => {
      const text = `${task.name || ""} ${task.course || ""} ${task.note || ""}`.toLowerCase();
      return text.includes(keyword);
    });
  }

  if (status !== "Semua") {
    result = result.filter((task) => {
      const taskStatus = isAdminTaskDone(task) ? "Selesai" : "Belum Selesai";
      return taskStatus === status;
    });
  }

  if (priority !== "Semua") {
    result = result.filter((task) => task.priority === priority);
  }

  result.sort((a, b) => {
    return parseAdminDate(a.deadline) - parseAdminDate(b.deadline);
  });

  return result;
}

function createAdminTaskRow(task, index) {
  const done = isAdminTaskDone(task);
  const priorityClass = getAdminPriorityClass(task.priority);
  const deadlineInfo = getAdminDeadlineInfo(task.deadline, done);
  const statusClass = done ? "done" : "active";
  const statusText = done ? "Selesai" : "Belum Selesai";
  const progress = Number(task.progress) || 0;

  return `
    <tr>
      <td>${index + 1}</td>

      <td>
        ${escapeAdminHTML(task.name || "Tanpa nama")}
        <small>${escapeAdminHTML(task.note || "Tidak ada catatan")}</small>
      </td>

      <td>${escapeAdminHTML(task.course || "-")}</td>

      <td>
        ${formatAdminDate(task.deadline)}
        <small>
          <span class="admin-badge ${deadlineInfo.className}">
            ${deadlineInfo.text}
          </span>
        </small>
      </td>

      <td>
        <span class="admin-badge ${priorityClass}">
          ${escapeAdminHTML(task.priority || "-")}
        </span>
      </td>

      <td>
        <div class="admin-progress-mini">
          <span>${progress}%</span>
          <div class="admin-progress-bar">
            <div style="width: ${progress}%"></div>
          </div>
        </div>
      </td>

      <td>
        <span class="admin-badge ${statusClass}">
          ${statusText}
        </span>
      </td>

      <td>
        <div class="admin-row-actions">
          <button class="admin-small-btn detail" data-action="detail" data-id="${task.id}">
            Detail
          </button>

          <button class="admin-small-btn toggle" data-action="toggle" data-id="${task.id}">
            ${done ? "Buka" : "Selesai"}
          </button>

          <button class="admin-small-btn delete" data-action="delete" data-id="${task.id}">
            Hapus
          </button>
        </div>
      </td>
    </tr>
  `;
}

function handleAdminTaskAction(event) {
  const button = event.target.closest("button");

  if (!button) return;

  const action = button.dataset.action;
  const id = button.dataset.id;

  if (action === "detail") {
    showAdminTaskDetail(id);
  }

  if (action === "toggle") {
    toggleAdminTaskStatus(id);
  }

  if (action === "delete") {
    deleteAdminTask(id);
  }
}

function showAdminTaskDetail(id) {
  const task = adminTasks.find((item) => item.id === id);

  if (!task) return;

  const status = isAdminTaskDone(task) ? "Selesai" : "Belum Selesai";
  const subtasks = task.subtasks || [];
  const subtaskText = subtasks.length === 0
    ? "Tidak ada checklist subtugas"
    : subtasks
        .map((subtask, index) => {
          return `${index + 1}. ${subtask.done ? "[Selesai]" : "[Belum]"} ${subtask.title}`;
        })
        .join("\n");

  alert(
    `Detail Tugas\n\n` +
    `Nama Tugas: ${task.name || "-"}\n` +
    `Mata Kuliah: ${task.course || "-"}\n` +
    `Deadline: ${formatAdminDate(task.deadline)}\n` +
    `Prioritas: ${task.priority || "-"}\n` +
    `Progress: ${Number(task.progress) || 0}%\n` +
    `Status: ${status}\n` +
    `Catatan: ${task.note || "Tidak ada catatan"}\n\n` +
    `Checklist Subtugas:\n${subtaskText}`
  );
}

function toggleAdminTaskStatus(id) {
  const selectedTask = adminTasks.find((task) => task.id === id);

  if (!selectedTask) return;

  const wasDone = isAdminTaskDone(selectedTask);

  adminTasks = adminTasks.map((task) => {
    if (task.id !== id) return task;

    const updatedSubtasks = (task.subtasks || []).map((subtask) => {
      return {
        ...subtask,
        done: !wasDone
      };
    });

    return {
      ...task,
      subtasks: updatedSubtasks,
      status: wasDone ? "Belum Selesai" : "Selesai",
      progress: wasDone ? 75 : 100,
      updatedAt: new Date().toISOString()
    };
  });

  addAdminHistory(
    "status",
    "Status tugas diubah admin",
    `${selectedTask.name} diubah menjadi ${wasDone ? "Belum Selesai" : "Selesai"}.`
  );

  saveAdminTasks();
  renderAdminStats();
  renderAdminInsight();
  renderAdminTaskTable();
  renderAdminHistory();
  showAdminToast("Status tugas berhasil diubah.");
}

function deleteAdminTask(id) {
  const selectedTask = adminTasks.find((task) => task.id === id);

  if (!selectedTask) return;

  const confirmDelete = confirm("Yakin admin ingin menghapus tugas ini?");

  if (!confirmDelete) return;

  adminTasks = adminTasks.filter((task) => task.id !== id);

  addAdminHistory(
    "delete",
    "Tugas dihapus admin",
    `${selectedTask.name} dari mata kuliah ${selectedTask.course} telah dihapus oleh admin.`
  );

  saveAdminTasks();
  renderAdminStats();
  renderAdminInsight();
  renderAdminTaskTable();
  renderAdminHistory();
  showAdminToast("Tugas berhasil dihapus admin.");
}

/* ================================
   ACADEMIC MONITORING
   ================================ */

function renderAdminSubjects() {
  if (!adminElements.subjectList || !adminElements.emptySubjects) return;

  setText(adminElements.subjectCountBadge, `${adminSubjects.length} data`);

  if (adminSubjects.length === 0) {
    adminElements.subjectList.innerHTML = "";
    adminElements.emptySubjects.classList.remove("hidden");
    return;
  }

  adminElements.emptySubjects.classList.add("hidden");

  adminElements.subjectList.innerHTML = adminSubjects
    .map((subject) => {
      const taskCount = adminTasks.filter((task) => task.course === subject).length;
      const doneCount = adminTasks.filter((task) => {
        return task.course === subject && isAdminTaskDone(task);
      }).length;

      return `
        <div class="admin-compact-item">
          <div>
            <strong>${escapeAdminHTML(subject)}</strong>
            <small>${taskCount} tugas • ${doneCount} selesai</small>
          </div>
          <span>${taskCount}</span>
        </div>
      `;
    })
    .join("");
}

function renderAdminTargets() {
  if (!adminElements.targetList || !adminElements.emptyTargets) return;

  const today = toAdminDateInputValue(new Date());

  const todayTargets = adminTargets.filter((target) => target.date === today);

  setText(adminElements.targetCountBadge, `${todayTargets.length} hari ini`);

  if (todayTargets.length === 0) {
    adminElements.targetList.innerHTML = "";
    adminElements.emptyTargets.classList.remove("hidden");
    return;
  }

  adminElements.emptyTargets.classList.add("hidden");

  adminElements.targetList.innerHTML = todayTargets
    .slice(0, 8)
    .map((target) => {
      return `
        <div class="admin-compact-item">
          <div>
            <strong>${escapeAdminHTML(target.title || "Target tanpa nama")}</strong>
            <small>${target.done ? "Selesai" : "Belum selesai"} • Target hari ini</small>
          </div>
          <span class="${target.done ? "done" : "active"}">
            ${target.done ? "OK" : "On"}
          </span>
        </div>
      `;
    })
    .join("");
}

function renderAdminPlanner() {
  if (!adminElements.plannerList || !adminElements.emptyPlanner) return;

  const today = toAdminDateInputValue(new Date());

  const upcomingPlans = adminPlans
    .filter((plan) => plan.date >= today)
    .sort((a, b) => {
      return parseAdminDate(a.date) - parseAdminDate(b.date) ||
        String(a.startTime || "").localeCompare(String(b.startTime || ""));
    })
    .slice(0, 8);

  setText(adminElements.plannerCountBadge, `${upcomingPlans.length} aktif`);

  if (upcomingPlans.length === 0) {
    adminElements.plannerList.innerHTML = "";
    adminElements.emptyPlanner.classList.remove("hidden");
    return;
  }

  adminElements.emptyPlanner.classList.add("hidden");

  adminElements.plannerList.innerHTML = upcomingPlans
    .map((plan) => {
      return `
        <div class="admin-compact-item">
          <div>
            <strong>${escapeAdminHTML(plan.title || "Jadwal tanpa judul")}</strong>
            <small>
              ${escapeAdminHTML(plan.subject || "-")} •
              ${formatAdminDate(plan.date)} •
              ${escapeAdminHTML(plan.startTime || "--:--")} - ${escapeAdminHTML(plan.endTime || "--:--")}
            </small>
          </div>
          <span>${escapeAdminHTML(plan.type || "Plan")}</span>
        </div>
      `;
    })
    .join("");
}

/* ================================
   PRODUCTIVITY MONITORING
   ================================ */

function renderAdminFocusSessions() {
  if (!adminElements.focusList || !adminElements.emptyFocus) return;

  setText(adminElements.focusCountBadge, `${adminFocusSessions.length} data`);

  if (adminFocusSessions.length === 0) {
    adminElements.focusList.innerHTML = "";
    adminElements.emptyFocus.classList.remove("hidden");
    return;
  }

  adminElements.emptyFocus.classList.add("hidden");

  adminElements.focusList.innerHTML = [...adminFocusSessions]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 8)
    .map((session) => {
      return `
        <div class="admin-compact-item">
          <div>
            <strong>${escapeAdminHTML(session.taskName || "Sesi fokus bebas")}</strong>
            <small>
              ${formatAdminDate(session.date)} •
              ${Number(session.durationMinutes || 0)} menit
            </small>
          </div>
          <span>Focus</span>
        </div>
      `;
    })
    .join("");
}

function renderAdminReflections() {
  if (!adminElements.reflectionList || !adminElements.emptyReflections) return;

  setText(adminElements.reflectionCountBadge, `${adminReflections.length} data`);

  if (adminReflections.length === 0) {
    adminElements.reflectionList.innerHTML = "";
    adminElements.emptyReflections.classList.remove("hidden");
    return;
  }

  adminElements.emptyReflections.classList.add("hidden");

  adminElements.reflectionList.innerHTML = [...adminReflections]
    .sort((a, b) => parseAdminDate(b.date) - parseAdminDate(a.date))
    .slice(0, 8)
    .map((reflection) => {
      return `
        <div class="admin-compact-item">
          <div>
            <strong>Refleksi ${formatAdminDate(reflection.date)}</strong>
            <small>
              Skor ${Number(reflection.score || 0)}/10 •
              Mood ${escapeAdminHTML(reflection.mood || "-")}
            </small>
          </div>
          <span>${Number(reflection.score || 0)}/10</span>
        </div>
      `;
    })
    .join("");
}

function renderAdminNotes() {
  if (!adminElements.noteList || !adminElements.emptyNotes) return;

  if (adminNotes.length === 0) {
    adminElements.noteList.innerHTML = "";
    adminElements.emptyNotes.classList.remove("hidden");
    return;
  }

  adminElements.emptyNotes.classList.add("hidden");

  adminElements.noteList.innerHTML = [...adminNotes]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6)
    .map((note) => {
      return `
        <article class="admin-note-card">
          <span>${escapeAdminHTML(note.subject || "-")}</span>
          <h4>${escapeAdminHTML(note.title || "Catatan tanpa judul")}</h4>
          <p>
            ${escapeAdminHTML(shortenText(note.content || "Tidak ada isi catatan.", 160))}
          </p>
          <small>${formatAdminDateTime(note.createdAt)}</small>
        </article>
      `;
    })
    .join("");
}

/* ================================
   HISTORY
   ================================ */

function addAdminHistory(type, title, description) {
  const history = {
    id: createAdminId(),
    type,
    title,
    description,
    createdAt: new Date().toISOString()
  };

  adminHistories.unshift(history);

  if (adminHistories.length > 40) {
    adminHistories = adminHistories.slice(0, 40);
  }

  saveAdminHistories();
}

function renderAdminHistory() {
  if (!adminElements.historyList || !adminElements.emptyHistory) return;

  if (!adminHistories || adminHistories.length === 0) {
    adminElements.historyList.innerHTML = "";
    adminElements.emptyHistory.classList.remove("hidden");
    return;
  }

  adminElements.emptyHistory.classList.add("hidden");

  adminElements.historyList.innerHTML = adminHistories
    .slice(0, 12)
    .map((history) => {
      return `
        <div class="admin-history-item">
          <div class="admin-history-icon ${escapeAdminHTML(history.type || "")}">
            ${getAdminHistoryIcon(history.type)}
          </div>

          <div class="admin-history-content">
            <h4>${escapeAdminHTML(history.title || "Aktivitas")}</h4>
            <p>${escapeAdminHTML(history.description || "-")}</p>
            <small>${formatAdminDateTime(history.createdAt)}</small>
          </div>
        </div>
      `;
    })
    .join("");
}

function getAdminHistoryIcon(type) {
  if (type === "add") return "+";
  if (type === "edit") return "E";
  if (type === "status") return "S";
  if (type === "delete") return "H";
  return "R";
}

/* ================================
   EXPORT
   ================================ */

function exportAdminReport() {
  const header = [
    "Nama Tugas",
    "Mata Kuliah",
    "Deadline",
    "Prioritas",
    "Progress",
    "Status",
    "Catatan",
    "Jumlah Subtugas"
  ];

  const rows = adminTasks.map((task) => {
    return [
      task.name || "",
      task.course || "",
      formatAdminDate(task.deadline),
      task.priority || "",
      `${Number(task.progress || 0)}%`,
      isAdminTaskDone(task) ? "Selesai" : "Belum Selesai",
      task.note || "",
      Array.isArray(task.subtasks) ? task.subtasks.length : 0
    ];
  });

  const summaryRows = [
    [],
    ["RINGKASAN ADMIN"],
    ["Total Tugas", adminTasks.length],
    ["Tugas Selesai", adminTasks.filter((task) => isAdminTaskDone(task)).length],
    ["Tugas Belum Selesai", adminTasks.filter((task) => !isAdminTaskDone(task)).length],
    ["Mata Kuliah", adminSubjects.length],
    ["Target Harian", adminTargets.length],
    ["Study Planner", adminPlans.length],
    ["Total Menit Fokus Minggu Ini", getAdminThisWeekFocusMinutes()],
    ["Catatan Materi", adminNotes.length],
    ["Refleksi Belajar", adminReflections.length],
    ["Rata-rata Skor Refleksi", getAdminAverageReflectionScore()]
  ];

  const csvContent = [header, ...rows, ...summaryRows]
    .map((row) => row.map(formatCSVValue).join(","))
    .join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;"
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = `laporan-admin-studyflow-${toAdminDateInputValue(new Date())}.csv`;
  link.click();

  URL.revokeObjectURL(url);

  showAdminToast("Laporan CSV admin berhasil dibuat.");
}

function formatCSVValue(value) {
  return `"${String(value).replaceAll('"', '""')}"`;
}

/* ================================
   DATE HELPERS
   ================================ */

function parseAdminDate(dateString) {
  if (!dateString || typeof dateString !== "string") {
    return new Date(9999, 0, 1);
  }

  const [year, month, day] = dateString.split("-").map(Number);

  if (!year || !month || !day) {
    return new Date(9999, 0, 1);
  }

  return new Date(year, month - 1, day);
}

function normalizeAdminDate(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function getAdminDaysLeft(deadline) {
  const today = normalizeAdminDate(new Date());
  const deadlineDate = parseAdminDate(deadline);
  const difference = deadlineDate - today;

  return Math.ceil(difference / (1000 * 60 * 60 * 24));
}

function formatAdminDate(dateString) {
  if (!dateString) return "-";

  const date = parseAdminDate(dateString);

  if (date.getFullYear() === 9999) return "-";

  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

function formatAdminDateTime(dateString) {
  if (!dateString) return "-";

  return new Date(dateString).toLocaleString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function getAdminDeadlineInfo(deadline, done) {
  if (done) {
    return {
      text: "Selesai",
      className: "done"
    };
  }

  const daysLeft = getAdminDaysLeft(deadline);

  if (daysLeft < 0) {
    return {
      text: `Lewat ${Math.abs(daysLeft)} hari`,
      className: "danger"
    };
  }

  if (daysLeft === 0) {
    return {
      text: "Hari ini",
      className: "danger"
    };
  }

  if (daysLeft <= 3) {
    return {
      text: `${daysLeft} hari lagi`,
      className: "warning"
    };
  }

  return {
    text: `${daysLeft} hari lagi`,
    className: "active"
  };
}

function toAdminDateInputValue(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

/* ================================
   PRODUCTIVITY HELPERS
   ================================ */

function getAdminThisWeekFocusMinutes() {
  const today = normalizeAdminDate(new Date());
  const dayIndex = today.getDay();
  const startOfWeek = new Date(today);

  startOfWeek.setDate(today.getDate() - dayIndex);

  return adminFocusSessions.reduce((total, session) => {
    const sessionDate = parseAdminDate(session.date);

    if (sessionDate >= startOfWeek && sessionDate <= today) {
      return total + Number(session.durationMinutes || 0);
    }

    return total;
  }, 0);
}

function getAdminAverageReflectionScore() {
  if (!adminReflections || adminReflections.length === 0) {
    return 0;
  }

  const totalScore = adminReflections.reduce((total, reflection) => {
    return total + Number(reflection.score || 0);
  }, 0);

  return Math.round(totalScore / adminReflections.length);
}

/* ================================
   UTILITIES
   ================================ */

function isAdminTaskDone(task) {
  return task.status === "Selesai" || Number(task.progress) === 100;
}

function getAdminPriorityClass(priority) {
  if (priority === "Tinggi") return "high";
  if (priority === "Sedang") return "medium";
  return "low";
}

function createAdminId() {
  if (window.crypto && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function escapeAdminHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function shortenText(value, maxLength) {
  const text = String(value);

  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength)}...`;
}

function setText(element, value) {
  if (!element) return;

  element.textContent = value;
}

function showAdminToast(message) {
  adminElements.toastMessage.textContent = message;
  adminElements.toast.classList.remove("hidden");

  setTimeout(() => {
    adminElements.toast.classList.add("hidden");
  }, 2600);
}