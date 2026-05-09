/* ================================
   STUDYFLOW - APP LOGIC
   ================================ */

const STORAGE_KEY = "studyflow_tasks_v1";
const HISTORY_KEY = "studyflow_history_v1";
const SUBJECT_KEY = "studyflow_subjects_v1";
const TARGET_KEY = "studyflow_targets_v1";
const PLANNER_KEY = "studyflow_planner_v1";
const FOCUS_SESSION_KEY = "studyflow_focus_sessions_v1";
const NOTE_KEY = "studyflow_notes_v1";
const REFLECTION_KEY = "studyflow_reflections_v1";

const DEFAULT_SUBJECTS = [
  "Analisis dan Perancangan Sistem Informasi",
  "Struktur Data",
  "Basis Data",
  "Pemrograman Web",
  "Jaringan Komputer",
  "Sistem Operasi"
];

let tasks = [];
let histories = [];
let subjects = [];
let dailyTargets = [];
let studyPlans = [];
let focusSessions = [];
let studyNotes = [];
let reflections = [];
let editingTaskId = null;
let currentCalendarDate = new Date();

let focusTimerInterval = null;
let focusMode = "focus";
let focusIsRunning = false;
let focusTotalSeconds = 25 * 60;
let focusRemainingSeconds = 25 * 60;

const elements = {
  todayDate: document.getElementById("todayDate"),

  themeToggle: document.getElementById("themeToggle"),

  calendarMonthTitle: document.getElementById("calendarMonthTitle"),
  calendarGrid: document.getElementById("calendarGrid"),
  prevMonthBtn: document.getElementById("prevMonthBtn"),
  nextMonthBtn: document.getElementById("nextMonthBtn"),

  nearestDeadline: document.getElementById("nearestDeadline"),
  nearestCourse: document.getElementById("nearestCourse"),

  statTotal: document.getElementById("statTotal"),
  statActive: document.getElementById("statActive"),
  statDone: document.getElementById("statDone"),
  statUrgent: document.getElementById("statUrgent"),

  completionRate: document.getElementById("completionRate"),
  progressCircle: document.querySelector(".progress-circle"),
  highPriorityCount: document.getElementById("highPriorityCount"),
  todayTaskCount: document.getElementById("todayTaskCount"),
  overdueCount: document.getElementById("overdueCount"),

  taskForm: document.getElementById("taskForm"),
  taskId: document.getElementById("taskId"),
  taskName: document.getElementById("taskName"),
  courseName: document.getElementById("courseName"),
  deadlineDate: document.getElementById("deadlineDate"),
  priorityLevel: document.getElementById("priorityLevel"),
  progressValue: document.getElementById("progressValue"),
  taskNote: document.getElementById("taskNote"),
  subtasksInput: document.getElementById("subtasksInput"),

  submitButton: document.getElementById("submitButton"),
  cancelEditButton: document.getElementById("cancelEditButton"),

  searchInput: document.getElementById("searchInput"),
  statusFilter: document.getElementById("statusFilter"),
  priorityFilter: document.getElementById("priorityFilter"),
  sortFilter: document.getElementById("sortFilter"),

  taskList: document.getElementById("taskList"),
  emptyState: document.getElementById("emptyState"),

  subjectForm: document.getElementById("subjectForm"),
  subjectNameInput: document.getElementById("subjectNameInput"),
  subjectList: document.getElementById("subjectList"),
  emptySubject: document.getElementById("emptySubject"),

  targetForm: document.getElementById("targetForm"),
  targetInput: document.getElementById("targetInput"),
  targetList: document.getElementById("targetList"),
  emptyTarget: document.getElementById("emptyTarget"),
  targetProgressText: document.getElementById("targetProgressText"),
  targetProgressFill: document.getElementById("targetProgressFill"),

  plannerForm: document.getElementById("plannerForm"),
  plannerTitleInput: document.getElementById("plannerTitleInput"),
  plannerSubjectSelect: document.getElementById("plannerSubjectSelect"),
  plannerDateInput: document.getElementById("plannerDateInput"),
  plannerStartInput: document.getElementById("plannerStartInput"),
  plannerEndInput: document.getElementById("plannerEndInput"),
  plannerTypeInput: document.getElementById("plannerTypeInput"),
  plannerNoteInput: document.getElementById("plannerNoteInput"),
  plannerList: document.getElementById("plannerList"),
  emptyPlanner: document.getElementById("emptyPlanner"),

  focusTaskSelect: document.getElementById("focusTaskSelect"),
  focusMinutesInput: document.getElementById("focusMinutesInput"),
  breakMinutesInput: document.getElementById("breakMinutesInput"),
  focusModeText: document.getElementById("focusModeText"),
  focusTimerDisplay: document.getElementById("focusTimerDisplay"),
  focusSelectedTaskText: document.getElementById("focusSelectedTaskText"),
  focusStartBtn: document.getElementById("focusStartBtn"),
  focusPauseBtn: document.getElementById("focusPauseBtn"),
  focusResetBtn: document.getElementById("focusResetBtn"),
  focusCompleteBtn: document.getElementById("focusCompleteBtn"),
  focusSessionsToday: document.getElementById("focusSessionsToday"),
  focusMinutesToday: document.getElementById("focusMinutesToday"),

  noteForm: document.getElementById("noteForm"),
  noteSubjectSelect: document.getElementById("noteSubjectSelect"),
  noteTitleInput: document.getElementById("noteTitleInput"),
  noteContentInput: document.getElementById("noteContentInput"),
  noteSearchInput: document.getElementById("noteSearchInput"),
  noteList: document.getElementById("noteList"),
  emptyNote: document.getElementById("emptyNote"),

  reflectionForm: document.getElementById("reflectionForm"),
  reflectionDateInput: document.getElementById("reflectionDateInput"),
  reflectionLearnedInput: document.getElementById("reflectionLearnedInput"),
  reflectionProblemInput: document.getElementById("reflectionProblemInput"),
  reflectionScoreInput: document.getElementById("reflectionScoreInput"),
  reflectionMoodInput: document.getElementById("reflectionMoodInput"),
  reflectionPlanInput: document.getElementById("reflectionPlanInput"),
  reflectionList: document.getElementById("reflectionList"),
  emptyReflection: document.getElementById("emptyReflection"),
  reflectionSummaryText: document.getElementById("reflectionSummaryText"),
  reflectionAverageScore: document.getElementById("reflectionAverageScore"),

  analyticsTotalTasks: document.getElementById("analyticsTotalTasks"),
  analyticsDoneTasks: document.getElementById("analyticsDoneTasks"),
  analyticsFocusMinutes: document.getElementById("analyticsFocusMinutes"),
  analyticsNotesCount: document.getElementById("analyticsNotesCount"),
  analyticsReflectionCount: document.getElementById("analyticsReflectionCount"),
  analyticsAverageReflection: document.getElementById("analyticsAverageReflection"),
  weeklyActivityChart: document.getElementById("weeklyActivityChart"),
  analyticsInsightText: document.getElementById("analyticsInsightText"),

  generateReportBtn: document.getElementById("generateReportBtn"),
  printReportBtn: document.getElementById("printReportBtn"),
  exportBackupBtn: document.getElementById("exportBackupBtn"),
  importBackupBtn: document.getElementById("importBackupBtn"),
  backupFileInput: document.getElementById("backupFileInput"),
  reportGeneratedAt: document.getElementById("reportGeneratedAt"),
  reportPreview: document.getElementById("reportPreview"),

  recommendationList: document.getElementById("recommendationList"),
  emptyRecommendation: document.getElementById("emptyRecommendation"),

  historyList: document.getElementById("historyList"),
  emptyHistory: document.getElementById("emptyHistory"),
  clearHistoryBtn: document.getElementById("clearHistoryBtn"),

  toast: document.getElementById("toast"),
  toastMessage: document.getElementById("toastMessage")
};

document.addEventListener("DOMContentLoaded", init);

function init() {
  tasks = loadTasks();
  histories = loadHistory();
  subjects = loadSubjects();
  dailyTargets = loadDailyTargets();
  studyPlans = loadStudyPlans();
  focusSessions = loadFocusSessions();
  studyNotes = loadStudyNotes();
  reflections = loadReflections();

  syncSubjectsFromTasks();

  setTodayDate();
  loadTheme();
  attachEvents();
  renderSubjectOptions();
  renderSubjects();
  setFocusDurationFromInput();
  setReflectionDefaultDate();
  renderApp();
  sendDeadlineReminder();
}

function attachEvents() {
  if (elements.subjectForm) {
    elements.subjectForm.addEventListener("submit", handleSubjectSubmit);
  }

  if (elements.subjectList) {
    elements.subjectList.addEventListener("click", handleSubjectAction);
  }

  if (elements.targetForm) {
    elements.targetForm.addEventListener("submit", handleTargetSubmit);
  }

  if (elements.targetList) {
    elements.targetList.addEventListener("click", handleTargetAction);
  }

  if (elements.plannerForm) {
    elements.plannerForm.addEventListener("submit", handlePlannerSubmit);
  }

  if (elements.plannerList) {
    elements.plannerList.addEventListener("click", handlePlannerAction);
  }

  if (elements.focusStartBtn) {
    elements.focusStartBtn.addEventListener("click", startFocusTimer);
  }

  if (elements.focusPauseBtn) {
    elements.focusPauseBtn.addEventListener("click", pauseFocusTimer);
  }

  if (elements.focusResetBtn) {
    elements.focusResetBtn.addEventListener("click", resetFocusTimer);
  }

  if (elements.focusCompleteBtn) {
    elements.focusCompleteBtn.addEventListener("click", completeFocusSessionManually);
  }

  if (elements.focusTaskSelect) {
    elements.focusTaskSelect.addEventListener("change", renderFocusSelectedTask);
  }

  if (elements.focusMinutesInput) {
    elements.focusMinutesInput.addEventListener("change", resetFocusTimer);
  }

  if (elements.breakMinutesInput) {
    elements.breakMinutesInput.addEventListener("change", () => {
      if (focusMode === "break") {
        resetFocusTimer();
      }
    });
  }

  if (elements.noteForm) {
    elements.noteForm.addEventListener("submit", handleNoteSubmit);
  }

  if (elements.noteList) {
    elements.noteList.addEventListener("click", handleNoteAction);
  }

  if (elements.noteSearchInput) {
    elements.noteSearchInput.addEventListener("input", renderStudyNotes);
  }

  if (elements.reflectionForm) {
    elements.reflectionForm.addEventListener("submit", handleReflectionSubmit);
  }

  if (elements.reflectionList) {
    elements.reflectionList.addEventListener("click", handleReflectionAction);
  }

  if (elements.generateReportBtn) {
    elements.generateReportBtn.addEventListener("click", generateReport);
  }

  if (elements.printReportBtn) {
    elements.printReportBtn.addEventListener("click", printReport);
  }

  if (elements.exportBackupBtn) {
    elements.exportBackupBtn.addEventListener("click", exportBackupData);
  }

  if (elements.importBackupBtn && elements.backupFileInput) {
    elements.importBackupBtn.addEventListener("click", () => {
      elements.backupFileInput.click();
    });
  }

  if (elements.backupFileInput) {
    elements.backupFileInput.addEventListener("change", importBackupData);
  }

  elements.taskForm.addEventListener("submit", handleSubmitTask);
  elements.cancelEditButton.addEventListener("click", resetForm);

  elements.searchInput.addEventListener("input", renderTaskList);
  elements.statusFilter.addEventListener("change", renderTaskList);
  elements.priorityFilter.addEventListener("change", renderTaskList);
  elements.sortFilter.addEventListener("change", renderTaskList);

  elements.taskList.addEventListener("click", handleTaskAction);
  elements.themeToggle.addEventListener("click", toggleTheme);
  elements.clearHistoryBtn.addEventListener("click", clearHistory);

  elements.prevMonthBtn.addEventListener("click", () => {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
    renderCalendar();
  });

  elements.nextMonthBtn.addEventListener("click", () => {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
    renderCalendar();
  });
}

/* ================================
   FORM HANDLER
   ================================ */

function handleSubmitTask(event) {
  event.preventDefault();

  const currentTask = editingTaskId
    ? tasks.find((task) => task.id === editingTaskId)
    : null;

  const taskData = getFormData(currentTask ? currentTask.subtasks : []);

  if (!taskData) {
    showToast("Lengkapi data tugas terlebih dahulu.");
    return;
  }

  ensureSubjectOption(taskData.course);

  if (editingTaskId) {
    const oldTask = tasks.find((task) => task.id === editingTaskId);

    tasks = tasks.map((task) => {
      if (task.id === editingTaskId) {
        return {
          ...task,
          ...taskData,
          updatedAt: new Date().toISOString()
        };
      }

      return task;
    });

    addHistory(
      "edit",
      "Tugas diperbarui",
      `${oldTask ? oldTask.name : taskData.name} berhasil diperbarui.`
    );

    showToast("Tugas berhasil diperbarui.");
  } else {
    const newTask = {
      id: createId(),
      ...taskData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    tasks.unshift(newTask);

    addHistory(
      "add",
      "Tugas ditambahkan",
      `${newTask.name} dari mata kuliah ${newTask.course} berhasil ditambahkan.`
    );

    requestNotificationAccess();
    showToast("Tugas berhasil ditambahkan.");
  }

  saveTasks();
  resetForm();
  resetFilters();
  renderSubjectOptions();
  renderSubjects();
  renderApp();

  document.getElementById("task-section").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

function getFormData(existingSubtasks = []) {
  const name = elements.taskName.value.trim();
  const course = elements.courseName.value.trim();
  const deadline = elements.deadlineDate.value;
  const priority = elements.priorityLevel.value;
  const selectedProgress = Number(elements.progressValue.value);
  const note = elements.taskNote.value.trim();
  const subtasks = parseSubtasks(existingSubtasks);

  if (!name || !course || !deadline || !priority) {
    return null;
  }

  const progress = subtasks.length > 0
    ? calculateSubtaskProgress(subtasks)
    : selectedProgress;

  return {
    name,
    course,
    deadline,
    priority,
    progress,
    note,
    subtasks,
    status: progress === 100 ? "Selesai" : "Belum Selesai"
  };
}

function resetForm() {
  editingTaskId = null;

  elements.taskForm.reset();

  if (elements.subtasksInput) {
    elements.subtasksInput.value = "";
  }

  elements.taskId.value = "";
  elements.submitButton.textContent = "Simpan Tugas";
  elements.cancelEditButton.classList.add("hidden");
}

function resetFilters() {
  elements.searchInput.value = "";
  elements.statusFilter.value = "Semua";
  elements.priorityFilter.value = "Semua";
  elements.sortFilter.value = "deadline";
}

/* ================================
   TASK ACTION
   ================================ */

function handleTaskAction(event) {
  const button = event.target.closest("button");

  if (!button) return;

  const action = button.dataset.action;
  const id = button.dataset.id;

  if (action === "toggle") {
    toggleTaskStatus(id);
  }

  if (action === "edit") {
    startEditTask(id);
  }

  if (action === "delete") {
    deleteTask(id);
  }

  if (action === "subtask") {
    const subtaskId = button.dataset.subtaskId;
    toggleSubtaskStatus(id, subtaskId);
  }
}

function toggleTaskStatus(id) {
  const selectedTask = tasks.find((task) => task.id === id);

  tasks = tasks.map((task) => {
    if (task.id !== id) return task;

    const done = isTaskDone(task);
    const hasSubtasks = task.subtasks && task.subtasks.length > 0;

    if (hasSubtasks) {
      const updatedSubtasks = task.subtasks.map((subtask) => {
        return {
          ...subtask,
          done: !done
        };
      });

      const progress = calculateSubtaskProgress(updatedSubtasks);

      return {
        ...task,
        subtasks: updatedSubtasks,
        status: progress === 100 ? "Selesai" : "Belum Selesai",
        progress,
        updatedAt: new Date().toISOString()
      };
    }

    return {
      ...task,
      status: done ? "Belum Selesai" : "Selesai",
      progress: done ? 75 : 100,
      updatedAt: new Date().toISOString()
    };
  });

  if (selectedTask) {
    const oldStatus = isTaskDone(selectedTask) ? "Selesai" : "Belum Selesai";
    const newStatus = oldStatus === "Selesai" ? "Belum Selesai" : "Selesai";

    addHistory(
      "status",
      "Status tugas diubah",
      `${selectedTask.name} diubah dari ${oldStatus} menjadi ${newStatus}.`
    );
  }

  saveTasks();
  renderApp();
  showToast("Status tugas berhasil diubah.");
}

function startEditTask(id) {
  const task = tasks.find((item) => item.id === id);

  if (!task) return;

  editingTaskId = id;

  ensureSubjectOption(task.course);

  elements.taskId.value = task.id;
  elements.taskName.value = task.name;
  elements.courseName.value = task.course;
  elements.deadlineDate.value = task.deadline;
  elements.priorityLevel.value = task.priority;
  elements.progressValue.value = String(task.progress);
  elements.taskNote.value = task.note || "";

  if (elements.subtasksInput) {
    elements.subtasksInput.value = (task.subtasks || [])
      .map((subtask) => subtask.title)
      .join("\n");
  }

  elements.submitButton.textContent = "Update Tugas";
  elements.cancelEditButton.classList.remove("hidden");

  document.getElementById("form-section").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

  showToast("Mode edit tugas aktif.");
}

function deleteTask(id) {
  const selectedTask = tasks.find((task) => task.id === id);

  const confirmDelete = confirm("Yakin ingin menghapus tugas ini?");

  if (!confirmDelete) return;

  tasks = tasks.filter((task) => task.id !== id);

  if (selectedTask) {
    addHistory(
      "delete",
      "Tugas dihapus",
      `${selectedTask.name} dari mata kuliah ${selectedTask.course} telah dihapus.`
    );
  }

  saveTasks();
  renderSubjects();
  renderApp();
  showToast("Tugas berhasil dihapus.");
}

/* ================================
   SUBTASK CHECKLIST
   ================================ */

function toggleSubtaskStatus(taskId, subtaskId) {
  let changedTaskName = "";

  tasks = tasks.map((task) => {
    if (task.id !== taskId) return task;

    const updatedSubtasks = (task.subtasks || []).map((subtask) => {
      if (subtask.id !== subtaskId) return subtask;

      return {
        ...subtask,
        done: !subtask.done
      };
    });

    const progress = calculateSubtaskProgress(updatedSubtasks);

    changedTaskName = task.name;

    return {
      ...task,
      subtasks: updatedSubtasks,
      progress,
      status: progress === 100 ? "Selesai" : "Belum Selesai",
      updatedAt: new Date().toISOString()
    };
  });

  if (changedTaskName) {
    addHistory(
      "status",
      "Checklist subtugas diperbarui",
      `Checklist pada tugas ${changedTaskName} berhasil diperbarui.`
    );
  }

  saveTasks();
  renderApp();
  showToast("Checklist subtugas berhasil diperbarui.");
}

function parseSubtasks(existingSubtasks = []) {
  if (!elements.subtasksInput) return [];

  const lines = elements.subtasksInput.value
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  return lines.map((title) => {
    const existing = existingSubtasks.find((subtask) => {
      return subtask.title.toLowerCase() === title.toLowerCase();
    });

    return {
      id: existing ? existing.id : createId(),
      title,
      done: existing ? existing.done : false
    };
  });
}

function calculateSubtaskProgress(subtasks = []) {
  if (!subtasks || subtasks.length === 0) return 0;

  const doneCount = subtasks.filter((subtask) => subtask.done).length;

  return Math.round((doneCount / subtasks.length) * 100);
}

function createSubtaskList(task) {
  const subtasks = task.subtasks || [];

  if (subtasks.length === 0) {
    return "";
  }

  const doneCount = subtasks.filter((subtask) => subtask.done).length;

  return `
    <div class="subtask-box">
      <div class="subtask-header">
        <strong>Checklist Subtugas</strong>
        <span>${doneCount}/${subtasks.length} selesai</span>
      </div>

      <div class="subtask-list">
        ${subtasks
          .map((subtask) => {
            return `
              <div class="subtask-item ${subtask.done ? "done" : ""}">
                <button
                  type="button"
                  class="subtask-check"
                  data-action="subtask"
                  data-id="${task.id}"
                  data-subtask-id="${subtask.id}"
                  aria-label="Ubah status subtugas"
                >
                  ${subtask.done ? "✓" : ""}
                </button>

                <span>${escapeHTML(subtask.title)}</span>
              </div>
            `;
          })
          .join("")}
      </div>
    </div>
  `;
}

/* ================================
   SUBJECT / COURSE CATEGORY
   ================================ */

function handleSubjectSubmit(event) {
  event.preventDefault();

  const subjectName = elements.subjectNameInput.value.trim();

  if (!subjectName) {
    showToast("Nama mata kuliah tidak boleh kosong.");
    return;
  }

  const alreadyExists = subjects.some((subject) => {
    return subject.toLowerCase() === subjectName.toLowerCase();
  });

  if (alreadyExists) {
    showToast("Mata kuliah sudah ada.");
    return;
  }

  subjects.push(subjectName);
  subjects.sort((a, b) => a.localeCompare(b, "id-ID"));

  saveSubjects();
  renderSubjectOptions();
  renderSubjects();

  elements.subjectNameInput.value = "";
  showToast("Mata kuliah berhasil ditambahkan.");
}

function handleSubjectAction(event) {
  const button = event.target.closest("button");

  if (!button) return;

  const action = button.dataset.action;
  const subjectName = button.dataset.subject;

  if (action === "delete-subject") {
    deleteSubject(subjectName);
  }
}

function deleteSubject(subjectName) {
  const isUsed = tasks.some((task) => task.course === subjectName);

  if (isUsed) {
    showToast("Mata kuliah tidak bisa dihapus karena masih digunakan pada tugas.");
    return;
  }

  const confirmDelete = confirm(`Yakin ingin menghapus mata kuliah "${subjectName}"?`);

  if (!confirmDelete) return;

  subjects = subjects.filter((subject) => subject !== subjectName);

  saveSubjects();
  renderSubjectOptions();
  renderSubjects();

  showToast("Mata kuliah berhasil dihapus.");
}

function renderSubjectOptions() {
  if (!elements.courseName) return;

  const currentValue = elements.courseName.value;

  elements.courseName.innerHTML = `
    <option value="">Pilih mata kuliah</option>
    ${subjects
      .map((subject) => {
        return `<option value="${escapeHTML(subject)}">${escapeHTML(subject)}</option>`;
      })
      .join("")}
  `;

  if (currentValue) {
    ensureSubjectOption(currentValue);
    elements.courseName.value = currentValue;
  }

  renderPlannerSubjectOptions();
  renderNoteSubjectOptions();
}

function renderSubjects() {
  if (!elements.subjectList || !elements.emptySubject) return;

  if (subjects.length === 0) {
    elements.subjectList.innerHTML = "";
    elements.emptySubject.classList.remove("hidden");
    return;
  }

  elements.emptySubject.classList.add("hidden");

  elements.subjectList.innerHTML = subjects
    .map((subject) => {
      const taskCount = tasks.filter((task) => task.course === subject).length;

      return `
        <div class="subject-item">
          <span>${escapeHTML(subject)} (${taskCount})</span>
          <button
            type="button"
            class="subject-delete"
            data-action="delete-subject"
            data-subject="${escapeHTML(subject)}"
            aria-label="Hapus mata kuliah"
          >
            ×
          </button>
        </div>
      `;
    })
    .join("");
}

function ensureSubjectOption(subjectName) {
  if (!subjectName) return;

  const exists = subjects.some((subject) => {
    return subject.toLowerCase() === subjectName.toLowerCase();
  });

  if (!exists) {
    subjects.push(subjectName);
    subjects.sort((a, b) => a.localeCompare(b, "id-ID"));
    saveSubjects();
    renderSubjectOptions();
    renderSubjects();
  }
}

function syncSubjectsFromTasks() {
  let changed = false;

  tasks.forEach((task) => {
    if (!task.course) return;

    const exists = subjects.some((subject) => {
      return subject.toLowerCase() === task.course.toLowerCase();
    });

    if (!exists) {
      subjects.push(task.course);
      changed = true;
    }
  });

  if (changed) {
    subjects.sort((a, b) => a.localeCompare(b, "id-ID"));
    saveSubjects();
  }
}

/* ================================
   DAILY TARGET
   ================================ */

function handleTargetSubmit(event) {
  event.preventDefault();

  const title = elements.targetInput.value.trim();

  if (!title) {
    showToast("Target harian tidak boleh kosong.");
    return;
  }

  const today = toDateInputValue(new Date());

  const newTarget = {
    id: createId(),
    title,
    done: false,
    date: today,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  dailyTargets.unshift(newTarget);

  addHistory(
    "add",
    "Target harian ditambahkan",
    `${title} ditambahkan ke target hari ini.`
  );

  saveDailyTargets();
  elements.targetInput.value = "";
  renderDailyTargets();
  renderHistory();
  showToast("Target harian berhasil ditambahkan.");
}

function handleTargetAction(event) {
  const button = event.target.closest("button");

  if (!button) return;

  const action = button.dataset.action;
  const id = button.dataset.id;

  if (action === "toggle-target") {
    toggleTargetStatus(id);
  }

  if (action === "delete-target") {
    deleteTarget(id);
  }
}

function toggleTargetStatus(id) {
  let changedTargetTitle = "";
  let changedTargetStatus = "";

  dailyTargets = dailyTargets.map((target) => {
    if (target.id !== id) return target;

    const nextDone = !target.done;

    changedTargetTitle = target.title;
    changedTargetStatus = nextDone ? "selesai" : "belum selesai";

    return {
      ...target,
      done: nextDone,
      updatedAt: new Date().toISOString()
    };
  });

  if (changedTargetTitle) {
    addHistory(
      "status",
      "Status target harian diubah",
      `${changedTargetTitle} diperbarui menjadi ${changedTargetStatus}.`
    );
  }

  saveDailyTargets();
  renderDailyTargets();
  renderHistory();
  showToast("Status target berhasil diperbarui.");
}

function deleteTarget(id) {
  const selectedTarget = dailyTargets.find((target) => target.id === id);

  if (!selectedTarget) return;

  const confirmDelete = confirm("Yakin ingin menghapus target harian ini?");

  if (!confirmDelete) return;

  dailyTargets = dailyTargets.filter((target) => target.id !== id);

  addHistory(
    "delete",
    "Target harian dihapus",
    `${selectedTarget.title} dihapus dari target harian.`
  );

  saveDailyTargets();
  renderDailyTargets();
  renderHistory();
  showToast("Target harian berhasil dihapus.");
}

function renderDailyTargets() {
  if (
    !elements.targetList ||
    !elements.emptyTarget ||
    !elements.targetProgressText ||
    !elements.targetProgressFill
  ) {
    return;
  }

  const todayTargets = getTodayTargets();
  const total = todayTargets.length;
  const done = todayTargets.filter((target) => target.done).length;
  const progress = total === 0 ? 0 : Math.round((done / total) * 100);

  elements.targetProgressFill.style.width = `${progress}%`;

  if (total === 0) {
    elements.targetProgressText.textContent = "Belum ada target hari ini.";
    elements.targetList.innerHTML = "";
    elements.emptyTarget.classList.remove("hidden");
    return;
  }

  elements.targetProgressText.textContent = `${done} dari ${total} target selesai (${progress}%).`;
  elements.emptyTarget.classList.add("hidden");

  elements.targetList.innerHTML = todayTargets
    .map((target) => createTargetItem(target))
    .join("");
}

function getTodayTargets() {
  const today = toDateInputValue(new Date());

  return dailyTargets.filter((target) => target.date === today);
}

function createTargetItem(target) {
  return `
    <div class="target-item ${target.done ? "done" : ""}">
      <button
        type="button"
        class="target-check"
        data-action="toggle-target"
        data-id="${target.id}"
        aria-label="Ubah status target"
      >
        ${target.done ? "✓" : ""}
      </button>

      <div class="target-content">
        <strong>${escapeHTML(target.title)}</strong>
        <small>${target.done ? "Selesai" : "Belum selesai"} • Target hari ini</small>
      </div>

      <button
        type="button"
        class="target-delete"
        data-action="delete-target"
        data-id="${target.id}"
      >
        Hapus
      </button>
    </div>
  `;
}

/* ================================
   STUDY PLANNER
   ================================ */

function handlePlannerSubmit(event) {
  event.preventDefault();

  const title = elements.plannerTitleInput.value.trim();
  const subject = elements.plannerSubjectSelect.value;
  const date = elements.plannerDateInput.value;
  const startTime = elements.plannerStartInput.value;
  const endTime = elements.plannerEndInput.value;
  const type = elements.plannerTypeInput.value;
  const note = elements.plannerNoteInput.value.trim();

  if (!title || !subject || !date || !startTime || !endTime || !type) {
    showToast("Lengkapi data jadwal belajar terlebih dahulu.");
    return;
  }

  if (endTime <= startTime) {
    showToast("Jam selesai harus lebih besar dari jam mulai.");
    return;
  }

  const newPlan = {
    id: createId(),
    title,
    subject,
    date,
    startTime,
    endTime,
    type,
    note,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  studyPlans.unshift(newPlan);

  addHistory(
    "add",
    "Jadwal belajar ditambahkan",
    `${title} untuk mata kuliah ${subject} berhasil dijadwalkan.`
  );

  saveStudyPlans();
  elements.plannerForm.reset();
  renderStudyPlanner();
  renderHistory();
  showToast("Jadwal belajar berhasil ditambahkan.");
}

function handlePlannerAction(event) {
  const button = event.target.closest("button");

  if (!button) return;

  const action = button.dataset.action;
  const id = button.dataset.id;

  if (action === "delete-plan") {
    deleteStudyPlan(id);
  }
}

function deleteStudyPlan(id) {
  const selectedPlan = studyPlans.find((plan) => plan.id === id);

  if (!selectedPlan) return;

  const confirmDelete = confirm("Yakin ingin menghapus jadwal belajar ini?");

  if (!confirmDelete) return;

  studyPlans = studyPlans.filter((plan) => plan.id !== id);

  addHistory(
    "delete",
    "Jadwal belajar dihapus",
    `${selectedPlan.title} dari Study Planner telah dihapus.`
  );

  saveStudyPlans();
  renderStudyPlanner();
  renderHistory();
  showToast("Jadwal belajar berhasil dihapus.");
}

function renderStudyPlanner() {
  if (!elements.plannerList || !elements.emptyPlanner) return;

  const upcomingPlans = getUpcomingStudyPlans();

  if (upcomingPlans.length === 0) {
    elements.plannerList.innerHTML = "";
    elements.emptyPlanner.classList.remove("hidden");
    return;
  }

  elements.emptyPlanner.classList.add("hidden");

  elements.plannerList.innerHTML = upcomingPlans
    .map((plan) => createStudyPlanCard(plan))
    .join("");
}

function getUpcomingStudyPlans() {
  const today = toDateInputValue(new Date());

  return [...studyPlans]
    .filter((plan) => plan.date >= today)
    .sort((a, b) => {
      return (
        parseDate(a.date) - parseDate(b.date) ||
        a.startTime.localeCompare(b.startTime)
      );
    })
    .slice(0, 8);
}

function createStudyPlanCard(plan) {
  const date = parseDate(plan.date);
  const dayNumber = date.getDate();
  const monthName = date.toLocaleDateString("id-ID", {
    month: "short"
  });

  return `
    <article class="planner-card">
      <div class="planner-date-box">
        <div>
          <strong>${dayNumber}</strong>
          <span>${monthName}</span>
        </div>
      </div>

      <div class="planner-content">
        <h4>${escapeHTML(plan.title)}</h4>
        <p>
          ${escapeHTML(plan.note || "Tidak ada catatan tambahan.")}
        </p>

        <div class="planner-meta">
          <span class="planner-chip">${escapeHTML(plan.subject)}</span>
          <span class="planner-chip type">${escapeHTML(plan.type)}</span>
          <span class="planner-chip">${plan.startTime} - ${plan.endTime}</span>
        </div>
      </div>

      <button
        type="button"
        class="planner-delete"
        data-action="delete-plan"
        data-id="${plan.id}"
      >
        Hapus
      </button>
    </article>
  `;
}

function renderPlannerSubjectOptions() {
  if (!elements.plannerSubjectSelect) return;

  const currentValue = elements.plannerSubjectSelect.value;

  elements.plannerSubjectSelect.innerHTML = `
    <option value="">Pilih mata kuliah</option>
    ${subjects
      .map((subject) => {
        return `<option value="${escapeHTML(subject)}">${escapeHTML(subject)}</option>`;
      })
      .join("")}
  `;

  if (currentValue) {
    elements.plannerSubjectSelect.value = currentValue;
  }
}

/* ================================
   FOCUS TIMER / POMODORO
   ================================ */

function startFocusTimer() {
  if (focusIsRunning) return;

  if (focusRemainingSeconds <= 0) {
    setFocusDurationFromInput();
  }

  focusIsRunning = true;

  focusTimerInterval = setInterval(() => {
    focusRemainingSeconds -= 1;
    renderFocusTimer();

    if (focusRemainingSeconds <= 0) {
      finishFocusCountdown();
    }
  }, 1000);

  showToast(focusMode === "focus" ? "Sesi fokus dimulai." : "Waktu istirahat dimulai.");
}

function pauseFocusTimer() {
  if (!focusIsRunning) return;

  clearInterval(focusTimerInterval);
  focusTimerInterval = null;
  focusIsRunning = false;

  showToast("Timer dijeda.");
}

function resetFocusTimer() {
  clearInterval(focusTimerInterval);
  focusTimerInterval = null;
  focusIsRunning = false;
  focusMode = "focus";

  setFocusDurationFromInput();
  renderFocusTimer();
  renderFocusSelectedTask();

  showToast("Timer berhasil direset.");
}

function finishFocusCountdown() {
  clearInterval(focusTimerInterval);
  focusTimerInterval = null;
  focusIsRunning = false;

  if (focusMode === "focus") {
    saveFocusSession(getFocusDurationMinutes());
    focusMode = "break";
    setBreakDurationFromInput();
    renderFocusTimer();
    renderFocusStats();
    renderHistory();
    renderAnalytics();
    showToast("Sesi fokus selesai. Saatnya istirahat.");
    return;
  }

  focusMode = "focus";
  setFocusDurationFromInput();
  renderFocusTimer();
  showToast("Istirahat selesai. Siap fokus lagi.");
}

function completeFocusSessionManually() {
  if (focusMode !== "focus") {
    showToast("Sesi istirahat tidak dicatat sebagai fokus.");
    return;
  }

  const elapsedSeconds = focusTotalSeconds - focusRemainingSeconds;

  if (elapsedSeconds < 60) {
    showToast("Minimal fokus 1 menit agar sesi dicatat.");
    return;
  }

  clearInterval(focusTimerInterval);
  focusTimerInterval = null;
  focusIsRunning = false;

  const durationMinutes = Math.max(1, Math.round(elapsedSeconds / 60));

  saveFocusSession(durationMinutes);
  focusMode = "break";
  setBreakDurationFromInput();
  renderFocusTimer();
  renderFocusStats();
  renderHistory();
  renderAnalytics();

  showToast("Sesi fokus berhasil dicatat.");
}

function saveFocusSession(durationMinutes) {
  const selectedTask = getSelectedFocusTask();

  const session = {
    id: createId(),
    taskId: selectedTask ? selectedTask.id : "",
    taskName: selectedTask ? selectedTask.name : "Sesi fokus bebas",
    course: selectedTask ? selectedTask.course : "",
    durationMinutes,
    createdAt: new Date().toISOString(),
    date: toDateInputValue(new Date())
  };

  focusSessions.unshift(session);

  addHistory(
    "add",
    "Sesi fokus selesai",
    `${session.taskName} selesai difokuskan selama ${durationMinutes} menit.`
  );

  saveFocusSessions();
}

function setFocusDurationFromInput() {
  const minutes = Number(elements.focusMinutesInput ? elements.focusMinutesInput.value : 25);
  const safeMinutes = Math.min(Math.max(minutes || 25, 5), 120);

  focusTotalSeconds = safeMinutes * 60;
  focusRemainingSeconds = focusTotalSeconds;

  if (elements.focusMinutesInput) {
    elements.focusMinutesInput.value = safeMinutes;
  }
}

function setBreakDurationFromInput() {
  const minutes = Number(elements.breakMinutesInput ? elements.breakMinutesInput.value : 5);
  const safeMinutes = Math.min(Math.max(minutes || 5, 1), 60);

  focusTotalSeconds = safeMinutes * 60;
  focusRemainingSeconds = focusTotalSeconds;

  if (elements.breakMinutesInput) {
    elements.breakMinutesInput.value = safeMinutes;
  }
}

function renderFocusTimer() {
  if (!elements.focusTimerDisplay || !elements.focusModeText) return;

  const minutes = Math.floor(focusRemainingSeconds / 60);
  const seconds = focusRemainingSeconds % 60;

  elements.focusTimerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  elements.focusModeText.textContent = focusMode === "focus" ? "Mode Fokus" : "Mode Istirahat";
}

function renderFocusTaskOptions() {
  if (!elements.focusTaskSelect) return;

  const currentValue = elements.focusTaskSelect.value;
  const activeTasks = tasks.filter((task) => !isTaskDone(task));

  elements.focusTaskSelect.innerHTML = `
    <option value="">Tanpa tugas khusus</option>
    ${activeTasks
      .map((task) => {
        return `
          <option value="${task.id}">
            ${escapeHTML(task.name)} - ${escapeHTML(task.course)}
          </option>
        `;
      })
      .join("")}
  `;

  if (currentValue && activeTasks.some((task) => task.id === currentValue)) {
    elements.focusTaskSelect.value = currentValue;
  }

  renderFocusSelectedTask();
}

function renderFocusSelectedTask() {
  if (!elements.focusSelectedTaskText) return;

  const selectedTask = getSelectedFocusTask();

  if (!selectedTask) {
    elements.focusSelectedTaskText.textContent = "Pilih tugas atau mulai sesi fokus bebas.";
    return;
  }

  elements.focusSelectedTaskText.textContent = `Fokus pada: ${selectedTask.name} • ${selectedTask.course}`;
}

function getSelectedFocusTask() {
  if (!elements.focusTaskSelect) return null;

  const selectedId = elements.focusTaskSelect.value;

  if (!selectedId) return null;

  return tasks.find((task) => task.id === selectedId) || null;
}

function renderFocusStats() {
  if (!elements.focusSessionsToday || !elements.focusMinutesToday) return;

  const today = toDateInputValue(new Date());

  const todaySessions = focusSessions.filter((session) => {
    return session.date === today;
  });

  const totalMinutes = todaySessions.reduce((total, session) => {
    return total + Number(session.durationMinutes || 0);
  }, 0);

  elements.focusSessionsToday.textContent = todaySessions.length;
  elements.focusMinutesToday.textContent = totalMinutes;
}

function getFocusDurationMinutes() {
  return Math.max(1, Math.round(focusTotalSeconds / 60));
}

/* ================================
   STUDY NOTES
   ================================ */

function handleNoteSubmit(event) {
  event.preventDefault();

  const subject = elements.noteSubjectSelect.value;
  const title = elements.noteTitleInput.value.trim();
  const content = elements.noteContentInput.value.trim();

  if (!subject || !title || !content) {
    showToast("Lengkapi data catatan terlebih dahulu.");
    return;
  }

  const newNote = {
    id: createId(),
    subject,
    title,
    content,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  studyNotes.unshift(newNote);

  addHistory(
    "add",
    "Catatan materi ditambahkan",
    `${title} untuk mata kuliah ${subject} berhasil disimpan.`
  );

  saveStudyNotes();
  elements.noteForm.reset();
  renderStudyNotes();
  renderHistory();
  renderAnalytics();

  showToast("Catatan materi berhasil disimpan.");
}

function handleNoteAction(event) {
  const button = event.target.closest("button");

  if (!button) return;

  const action = button.dataset.action;
  const id = button.dataset.id;

  if (action === "delete-note") {
    deleteStudyNote(id);
  }
}

function deleteStudyNote(id) {
  const selectedNote = studyNotes.find((note) => note.id === id);

  if (!selectedNote) return;

  const confirmDelete = confirm("Yakin ingin menghapus catatan ini?");

  if (!confirmDelete) return;

  studyNotes = studyNotes.filter((note) => note.id !== id);

  addHistory(
    "delete",
    "Catatan materi dihapus",
    `${selectedNote.title} dari catatan materi telah dihapus.`
  );

  saveStudyNotes();
  renderStudyNotes();
  renderHistory();
  renderAnalytics();

  showToast("Catatan materi berhasil dihapus.");
}

function renderStudyNotes() {
  if (!elements.noteList || !elements.emptyNote) return;

  const filteredNotes = getFilteredStudyNotes();

  if (filteredNotes.length === 0) {
    elements.noteList.innerHTML = "";
    elements.emptyNote.classList.remove("hidden");
    return;
  }

  elements.emptyNote.classList.add("hidden");

  elements.noteList.innerHTML = filteredNotes
    .map((note) => createStudyNoteCard(note))
    .join("");
}

function getFilteredStudyNotes() {
  const keyword = elements.noteSearchInput
    ? elements.noteSearchInput.value.toLowerCase().trim()
    : "";

  let result = [...studyNotes];

  if (keyword) {
    result = result.filter((note) => {
      const text = `${note.title} ${note.subject} ${note.content}`.toLowerCase();
      return text.includes(keyword);
    });
  }

  result.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return result;
}

function createStudyNoteCard(note) {
  return `
    <article class="note-card">
      <span class="note-subject">
        ${escapeHTML(note.subject)}
      </span>

      <h4>${escapeHTML(note.title)}</h4>

      <p>${escapeHTML(note.content)}</p>

      <div class="note-footer">
        <small>Dibuat: ${formatDateTime(note.createdAt)}</small>

        <button
          type="button"
          class="note-delete"
          data-action="delete-note"
          data-id="${note.id}"
        >
          Hapus
        </button>
      </div>
    </article>
  `;
}

function renderNoteSubjectOptions() {
  if (!elements.noteSubjectSelect) return;

  const currentValue = elements.noteSubjectSelect.value;

  elements.noteSubjectSelect.innerHTML = `
    <option value="">Pilih mata kuliah</option>
    ${subjects
      .map((subject) => {
        return `<option value="${escapeHTML(subject)}">${escapeHTML(subject)}</option>`;
      })
      .join("")}
  `;

  if (currentValue) {
    elements.noteSubjectSelect.value = currentValue;
  }
}

/* ================================
   LEARNING REFLECTION
   ================================ */

function handleReflectionSubmit(event) {
  event.preventDefault();

  const date = elements.reflectionDateInput.value;
  const learned = elements.reflectionLearnedInput.value.trim();
  const problem = elements.reflectionProblemInput.value.trim();
  const score = Number(elements.reflectionScoreInput.value);
  const mood = elements.reflectionMoodInput.value;
  const plan = elements.reflectionPlanInput.value.trim();

  if (!date || !learned || !score || !mood || !plan) {
    showToast("Lengkapi data refleksi terlebih dahulu.");
    return;
  }

  const newReflection = {
    id: createId(),
    date,
    learned,
    problem,
    score,
    mood,
    plan,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  reflections.unshift(newReflection);

  addHistory(
    "add",
    "Refleksi belajar ditambahkan",
    `Refleksi tanggal ${formatDate(date)} berhasil disimpan dengan skor ${score}/10.`
  );

  saveReflections();
  elements.reflectionForm.reset();
  setReflectionDefaultDate();
  renderReflections();
  renderHistory();
  renderAnalytics();

  showToast("Refleksi belajar berhasil disimpan.");
}

function handleReflectionAction(event) {
  const button = event.target.closest("button");

  if (!button) return;

  const action = button.dataset.action;
  const id = button.dataset.id;

  if (action === "delete-reflection") {
    deleteReflection(id);
  }
}

function deleteReflection(id) {
  const selectedReflection = reflections.find((reflection) => reflection.id === id);

  if (!selectedReflection) return;

  const confirmDelete = confirm("Yakin ingin menghapus refleksi belajar ini?");

  if (!confirmDelete) return;

  reflections = reflections.filter((reflection) => reflection.id !== id);

  addHistory(
    "delete",
    "Refleksi belajar dihapus",
    `Refleksi tanggal ${formatDate(selectedReflection.date)} telah dihapus.`
  );

  saveReflections();
  renderReflections();
  renderHistory();
  renderAnalytics();

  showToast("Refleksi belajar berhasil dihapus.");
}

function renderReflections() {
  if (
    !elements.reflectionList ||
    !elements.emptyReflection ||
    !elements.reflectionSummaryText ||
    !elements.reflectionAverageScore
  ) {
    return;
  }

  renderReflectionSummary();

  if (reflections.length === 0) {
    elements.reflectionList.innerHTML = "";
    elements.emptyReflection.classList.remove("hidden");
    return;
  }

  elements.emptyReflection.classList.add("hidden");

  elements.reflectionList.innerHTML = [...reflections]
    .sort((a, b) => {
      return parseDate(b.date) - parseDate(a.date);
    })
    .slice(0, 6)
    .map((reflection) => createReflectionCard(reflection))
    .join("");
}

function renderReflectionSummary() {
  const today = toDateInputValue(new Date());

  const todayReflections = reflections.filter((reflection) => {
    return reflection.date === today;
  });

  const source = todayReflections.length > 0 ? todayReflections : reflections;

  if (source.length === 0) {
    elements.reflectionSummaryText.textContent = "Belum ada refleksi hari ini.";
    elements.reflectionAverageScore.textContent = "0";
    return;
  }

  const averageScore = Math.round(
    source.reduce((total, reflection) => {
      return total + Number(reflection.score || 0);
    }, 0) / source.length
  );

  elements.reflectionAverageScore.textContent = averageScore;

  if (todayReflections.length > 0) {
    elements.reflectionSummaryText.textContent =
      `Kamu sudah membuat ${todayReflections.length} refleksi hari ini. Rata-rata skor produktivitas: ${averageScore}/10.`;
  } else {
    elements.reflectionSummaryText.textContent =
      `Belum ada refleksi hari ini. Rata-rata skor dari semua refleksi: ${averageScore}/10.`;
  }
}

function createReflectionCard(reflection) {
  return `
    <article class="reflection-card">
      <div class="reflection-card-top">
        <div>
          <h4>Refleksi ${formatDate(reflection.date)}</h4>
          <small>Dibuat: ${formatDateTime(reflection.createdAt)}</small>
        </div>

        <span class="reflection-score-chip">
          Skor ${reflection.score}/10
        </span>
      </div>

      <div class="reflection-content-grid">
        <div class="reflection-box">
          <strong>Yang dipelajari</strong>
          <p>${escapeHTML(reflection.learned)}</p>
        </div>

        <div class="reflection-box">
          <strong>Kendala</strong>
          <p>${escapeHTML(reflection.problem || "Tidak ada kendala yang dicatat.")}</p>
        </div>

        <div class="reflection-box">
          <strong>Rencana berikutnya</strong>
          <p>${escapeHTML(reflection.plan)}</p>
        </div>
      </div>

      <div class="reflection-footer">
        <span class="reflection-mood">
          Mood: ${escapeHTML(reflection.mood)}
        </span>

        <button
          type="button"
          class="reflection-delete"
          data-action="delete-reflection"
          data-id="${reflection.id}"
        >
          Hapus
        </button>
      </div>
    </article>
  `;
}

function setReflectionDefaultDate() {
  if (!elements.reflectionDateInput) return;

  elements.reflectionDateInput.value = toDateInputValue(new Date());
}

/* ================================
   LEARNING ANALYTICS
   ================================ */

function renderAnalytics() {
  if (
    !elements.analyticsTotalTasks ||
    !elements.analyticsDoneTasks ||
    !elements.analyticsFocusMinutes ||
    !elements.analyticsNotesCount ||
    !elements.analyticsReflectionCount ||
    !elements.analyticsAverageReflection ||
    !elements.weeklyActivityChart ||
    !elements.analyticsInsightText
  ) {
    return;
  }

  const totalTasks = tasks.length;
  const doneTasks = tasks.filter((task) => isTaskDone(task)).length;
  const weekFocusMinutes = getThisWeekFocusMinutes();
  const notesCount = studyNotes.length;
  const reflectionCount = reflections.length;
  const averageReflection = getAverageReflectionScore();

  elements.analyticsTotalTasks.textContent = totalTasks;
  elements.analyticsDoneTasks.textContent = doneTasks;
  elements.analyticsFocusMinutes.textContent = weekFocusMinutes;
  elements.analyticsNotesCount.textContent = notesCount;
  elements.analyticsReflectionCount.textContent = reflectionCount;
  elements.analyticsAverageReflection.textContent = averageReflection;

  renderWeeklyActivityChart();

  renderAnalyticsInsight({
    totalTasks,
    doneTasks,
    weekFocusMinutes,
    notesCount,
    reflectionCount,
    averageReflection
  });
}

function getThisWeekFocusMinutes() {
  const today = normalizeDate(new Date());
  const dayIndex = today.getDay();
  const startOfWeek = new Date(today);

  startOfWeek.setDate(today.getDate() - dayIndex);

  return focusSessions.reduce((total, session) => {
    const sessionDate = parseDate(session.date);

    if (sessionDate >= startOfWeek && sessionDate <= today) {
      return total + Number(session.durationMinutes || 0);
    }

    return total;
  }, 0);
}

function getAverageReflectionScore() {
  if (!reflections || reflections.length === 0) {
    return 0;
  }

  const totalScore = reflections.reduce((total, reflection) => {
    return total + Number(reflection.score || 0);
  }, 0);

  return Math.round(totalScore / reflections.length);
}

function getLastSevenDays() {
  const days = [];

  for (let index = 6; index >= 0; index--) {
    const date = new Date();

    date.setDate(date.getDate() - index);

    days.push({
      date,
      key: toDateInputValue(date),
      label: date.toLocaleDateString("id-ID", {
        weekday: "short"
      })
    });
  }

  return days;
}

function getActivityScoreByDate(dateKey) {
  const completedTasks = tasks.filter((task) => {
    return isTaskDone(task) && task.updatedAt && task.updatedAt.slice(0, 10) === dateKey;
  }).length;

  const focusCount = focusSessions.filter((session) => {
    return session.date === dateKey;
  }).length;

  const noteCount = studyNotes.filter((note) => {
    return note.createdAt && note.createdAt.slice(0, 10) === dateKey;
  }).length;

  const reflectionCount = reflections.filter((reflection) => {
    return reflection.date === dateKey;
  }).length;

  return completedTasks + focusCount + noteCount + reflectionCount;
}

function renderWeeklyActivityChart() {
  const days = getLastSevenDays();

  const dayScores = days.map((day) => {
    return {
      ...day,
      score: getActivityScoreByDate(day.key)
    };
  });

  const highestScore = Math.max(...dayScores.map((day) => day.score), 1);

  elements.weeklyActivityChart.innerHTML = dayScores
    .map((day) => {
      const height = Math.max(8, Math.round((day.score / highestScore) * 100));

      return `
        <div class="chart-day">
          <span class="chart-value">${day.score}</span>

          <div class="chart-bar-wrap">
            <span class="chart-bar" style="height: ${height}%"></span>
          </div>

          <span class="chart-label">${day.label}</span>
        </div>
      `;
    })
    .join("");
}

function renderAnalyticsInsight(data) {
  if (data.totalTasks === 0 && data.notesCount === 0 && data.reflectionCount === 0) {
    elements.analyticsInsightText.textContent =
      "Data produktivitas belum cukup. Mulai tambahkan tugas, catatan, sesi fokus, dan refleksi agar insight belajar muncul.";
    return;
  }

  if (data.doneTasks >= data.totalTasks && data.totalTasks > 0) {
    elements.analyticsInsightText.textContent =
      "Bagus. Semua tugas yang tercatat sudah selesai. Pertahankan ritme ini dan mulai buat target belajar berikutnya.";
    return;
  }

  if (data.weekFocusMinutes >= 120) {
    elements.analyticsInsightText.textContent =
      "Produktivitas fokus minggu ini sudah kuat. Kamu sudah mengumpulkan lebih dari 120 menit fokus belajar.";
    return;
  }

  if (data.averageReflection >= 8) {
    elements.analyticsInsightText.textContent =
      "Skor refleksi belajarmu cukup tinggi. Ini tanda proses belajar kamu mulai konsisten dan terarah.";
    return;
  }

  elements.analyticsInsightText.textContent =
    "Produktivitas belajar mulai terbentuk. Tingkatkan lagi dengan menyelesaikan tugas prioritas dan rutin memakai Focus Timer.";
}

/* ================================
   REPORT AND BACKUP
   ================================ */

function generateReport() {
  if (!elements.reportPreview || !elements.reportGeneratedAt) return;

  const totalTasks = tasks.length;
  const doneTasks = tasks.filter((task) => isTaskDone(task)).length;
  const activeTasks = totalTasks - doneTasks;
  const overdueTasks = tasks.filter((task) => {
    return !isTaskDone(task) && getDaysLeft(task.deadline) < 0;
  }).length;

  const weekFocusMinutes = getThisWeekFocusMinutes();
  const notesCount = studyNotes.length;
  const reflectionCount = reflections.length;
  const averageReflection = getAverageReflectionScore();
  const completion = totalTasks === 0 ? 0 : Math.round((doneTasks / totalTasks) * 100);

  const urgentTasks = tasks
    .filter((task) => {
      const daysLeft = getDaysLeft(task.deadline);
      return !isTaskDone(task) && daysLeft >= 0 && daysLeft <= 3;
    })
    .sort((a, b) => parseDate(a.deadline) - parseDate(b.deadline))
    .slice(0, 5);

  const latestNotes = [...studyNotes]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  const latestReflections = [...reflections]
    .sort((a, b) => parseDate(b.date) - parseDate(a.date))
    .slice(0, 3);

  const generatedAt = new Date().toLocaleString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  elements.reportGeneratedAt.textContent = `Laporan terakhir dibuat pada ${generatedAt}.`;

  elements.reportPreview.innerHTML = `
    <article class="report-document">
      <div class="report-document-header">
        <div>
          <h4>Laporan Produktivitas Belajar StudyFlow</h4>
          <p>
            Dokumen ini berisi ringkasan aktivitas akademik mahasiswa berdasarkan
            data tugas, focus timer, catatan materi, refleksi belajar, dan riwayat
            penggunaan aplikasi.
          </p>
          <p>Dibuat pada: ${generatedAt}</p>
        </div>

        <div class="report-logo-box">SF</div>
      </div>

      <div class="report-summary-grid">
        <div class="report-summary-card">
          <span>Total Tugas</span>
          <strong>${totalTasks}</strong>
        </div>

        <div class="report-summary-card">
          <span>Tugas Selesai</span>
          <strong>${doneTasks}</strong>
        </div>

        <div class="report-summary-card">
          <span>Progress</span>
          <strong>${completion}%</strong>
        </div>

        <div class="report-summary-card">
          <span>Menit Fokus</span>
          <strong>${weekFocusMinutes}</strong>
        </div>

        <div class="report-summary-card">
          <span>Tugas Aktif</span>
          <strong>${activeTasks}</strong>
        </div>

        <div class="report-summary-card">
          <span>Lewat Deadline</span>
          <strong>${overdueTasks}</strong>
        </div>

        <div class="report-summary-card">
          <span>Catatan</span>
          <strong>${notesCount}</strong>
        </div>

        <div class="report-summary-card">
          <span>Skor Refleksi</span>
          <strong>${averageReflection}/10</strong>
        </div>
      </div>

      <h5 class="report-section-title">Deadline Prioritas</h5>
      <div class="report-list">
        ${
          urgentTasks.length === 0
            ? `<div class="report-list-item">
                <strong>Tidak ada deadline mendesak</strong>
                <p>Belum ada tugas aktif dengan deadline dalam 3 hari ke depan.</p>
              </div>`
            : urgentTasks
                .map((task) => {
                  const daysLeft = getDaysLeft(task.deadline);
                  const deadlineText =
                    daysLeft === 0
                      ? "Deadline hari ini"
                      : daysLeft === 1
                        ? "Deadline besok"
                        : `${daysLeft} hari lagi`;

                  return `
                    <div class="report-list-item">
                      <strong>${escapeHTML(task.name)}</strong>
                      <p>
                        ${escapeHTML(task.course)} • ${formatDate(task.deadline)}
                        • ${escapeHTML(task.priority)} • ${deadlineText}
                      </p>
                    </div>
                  `;
                })
                .join("")
        }
      </div>

      <h5 class="report-section-title">Catatan Materi Terbaru</h5>
      <div class="report-list">
        ${
          latestNotes.length === 0
            ? `<div class="report-list-item">
                <strong>Belum ada catatan materi</strong>
                <p>Tambahkan catatan agar laporan akademik terlihat lebih lengkap.</p>
              </div>`
            : latestNotes
                .map((note) => {
                  return `
                    <div class="report-list-item">
                      <strong>${escapeHTML(note.title)}</strong>
                      <p>
                        ${escapeHTML(note.subject)} •
                        ${escapeHTML(note.content.slice(0, 140))}
                        ${note.content.length > 140 ? "..." : ""}
                      </p>
                    </div>
                  `;
                })
                .join("")
        }
      </div>

      <h5 class="report-section-title">Refleksi Belajar Terbaru</h5>
      <div class="report-list">
        ${
          latestReflections.length === 0
            ? `<div class="report-list-item">
                <strong>Belum ada refleksi belajar</strong>
                <p>Tambahkan refleksi untuk mengevaluasi proses belajar harian.</p>
              </div>`
            : latestReflections
                .map((reflection) => {
                  return `
                    <div class="report-list-item">
                      <strong>Refleksi ${formatDate(reflection.date)}</strong>
                      <p>
                        Skor ${reflection.score}/10 • Mood ${escapeHTML(reflection.mood)}
                        • ${escapeHTML(reflection.learned.slice(0, 140))}
                        ${reflection.learned.length > 140 ? "..." : ""}
                      </p>
                    </div>
                  `;
                })
                .join("")
        }
      </div>

      <div class="report-insight">
        <strong>Kesimpulan Sistem</strong>
        <p>${getReportConclusion({
          totalTasks,
          doneTasks,
          completion,
          weekFocusMinutes,
          notesCount,
          reflectionCount,
          averageReflection,
          overdueTasks
        })}</p>
      </div>
    </article>
  `;

  showToast("Laporan berhasil dibuat.");
}

function getReportConclusion(data) {
  if (data.totalTasks === 0) {
    return "Belum ada data tugas. Mahasiswa disarankan mulai mencatat tugas agar proses monitoring akademik dapat berjalan.";
  }

  if (data.overdueTasks > 0) {
    return `Terdapat ${data.overdueTasks} tugas yang melewati deadline. Prioritas utama adalah menyelesaikan tugas yang terlambat terlebih dahulu.`;
  }

  if (data.completion >= 80 && data.weekFocusMinutes >= 120) {
    return "Produktivitas belajar sangat baik. Mayoritas tugas sudah selesai dan durasi fokus belajar minggu ini sudah kuat.";
  }

  if (data.completion >= 60) {
    return "Progress belajar cukup baik. Mahasiswa sudah menyelesaikan sebagian besar tugas, tetapi masih perlu menjaga konsistensi.";
  }

  if (data.averageReflection >= 8) {
    return "Refleksi belajar menunjukkan kualitas proses belajar yang baik. Pertahankan kebiasaan evaluasi harian.";
  }

  return "Produktivitas belajar masih dapat ditingkatkan. Gunakan fitur target harian, study planner, dan focus timer secara rutin.";
}

function printReport() {
  if (!elements.reportPreview) return;

  let reportDocument = elements.reportPreview.querySelector(".report-document");

  if (!reportDocument) {
    generateReport();
    reportDocument = elements.reportPreview.querySelector(".report-document");
  }

  if (!reportDocument) {
    showToast("Laporan belum tersedia.");
    return;
  }

  const fileName = `laporan-studyflow-${toDateInputValue(new Date())}.pdf`;

  if (typeof html2pdf === "undefined") {
    showToast("Library PDF belum terbaca. Gunakan fitur print browser sebagai cadangan.");
    window.print();
    return;
  }

  const options = {
    margin: 10,
    filename: fileName,
    image: {
      type: "jpeg",
      quality: 0.98
    },
    html2canvas: {
      scale: 2,
      useCORS: true
    },
    jsPDF: {
      unit: "mm",
      format: "a4",
      orientation: "portrait"
    }
  };

  html2pdf()
    .set(options)
    .from(reportDocument)
    .save();

  showToast("Laporan PDF sedang didownload.");
}

function exportBackupData() {
  const backupData = {
    app: "StudyFlow",
    version: "1.0",
    exportedAt: new Date().toISOString(),
    data: {
      tasks,
      histories,
      subjects,
      dailyTargets,
      studyPlans,
      focusSessions,
      studyNotes,
      reflections
    }
  };

  const jsonData = JSON.stringify(backupData, null, 2);
  const blob = new Blob([jsonData], {
    type: "application/json"
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = `studyflow-backup-${toDateInputValue(new Date())}.json`;
  link.click();

  URL.revokeObjectURL(url);

  showToast("Backup data berhasil diexport.");
}

function importBackupData(event) {
  const file = event.target.files[0];

  if (!file) return;

  const confirmImport = confirm(
    "Import backup akan mengganti data StudyFlow saat ini. Lanjutkan?"
  );

  if (!confirmImport) {
    event.target.value = "";
    return;
  }

  const reader = new FileReader();

  reader.onload = function () {
    try {
      const backup = JSON.parse(reader.result);
      const data = backup.data;

      if (!data) {
        showToast("File backup tidak valid.");
        return;
      }

      tasks = Array.isArray(data.tasks) ? data.tasks : [];
      histories = Array.isArray(data.histories) ? data.histories : [];
      subjects = Array.isArray(data.subjects) && data.subjects.length > 0
        ? data.subjects
        : [...DEFAULT_SUBJECTS];
      dailyTargets = Array.isArray(data.dailyTargets) ? data.dailyTargets : [];
      studyPlans = Array.isArray(data.studyPlans) ? data.studyPlans : [];
      focusSessions = Array.isArray(data.focusSessions) ? data.focusSessions : [];
      studyNotes = Array.isArray(data.studyNotes) ? data.studyNotes : [];
      reflections = Array.isArray(data.reflections) ? data.reflections : [];

      saveTasks();
      saveHistory();
      saveSubjects();
      saveDailyTargets();
      saveStudyPlans();
      saveFocusSessions();
      saveStudyNotes();
      saveReflections();

      renderSubjectOptions();
      renderApp();
      generateReport();

      showToast("Backup data berhasil diimport.");
    } catch (error) {
      console.error("Gagal import backup:", error);
      showToast("Gagal membaca file backup.");
    } finally {
      event.target.value = "";
    }
  };

  reader.readAsText(file);
}

/* ================================
   RENDER APP
   ================================ */

function renderApp() {
  renderDashboard();
  renderNearestDeadline();
  renderSubjects();
  renderDailyTargets();
  renderStudyPlanner();
  renderFocusTaskOptions();
  renderFocusTimer();
  renderFocusStats();
  renderStudyNotes();
  renderReflections();
  renderAnalytics();

  if (typeof renderRecommendations === "function") {
    renderRecommendations();
  }

  if (typeof renderCalendar === "function") {
    renderCalendar();
  }

  if (typeof renderHistory === "function") {
    renderHistory();
  }

  renderTaskList();
}

function renderDashboard() {
  const total = tasks.length;
  const done = tasks.filter((task) => isTaskDone(task)).length;
  const active = total - done;

  const urgent = tasks.filter((task) => {
    const daysLeft = getDaysLeft(task.deadline);
    return !isTaskDone(task) && daysLeft >= 0 && daysLeft <= 3;
  }).length;

  const highPriority = tasks.filter((task) => {
    return !isTaskDone(task) && task.priority === "Tinggi";
  }).length;

  const todayTasks = tasks.filter((task) => {
    return !isTaskDone(task) && getDaysLeft(task.deadline) === 0;
  }).length;

  const overdue = tasks.filter((task) => {
    return !isTaskDone(task) && getDaysLeft(task.deadline) < 0;
  }).length;

  const completion = total === 0 ? 0 : Math.round((done / total) * 100);

  elements.statTotal.textContent = total;
  elements.statActive.textContent = active;
  elements.statDone.textContent = done;
  elements.statUrgent.textContent = urgent;

  elements.highPriorityCount.textContent = highPriority;
  elements.todayTaskCount.textContent = todayTasks;
  elements.overdueCount.textContent = overdue;

  elements.completionRate.textContent = `${completion}%`;
  elements.progressCircle.style.setProperty("--progress", `${completion}%`);
}

function renderNearestDeadline() {
  const activeTasks = tasks
    .filter((task) => !isTaskDone(task))
    .sort((a, b) => parseDate(a.deadline) - parseDate(b.deadline));

  if (tasks.length === 0) {
    elements.nearestDeadline.textContent = "Belum ada tugas";
    elements.nearestCourse.textContent = "Tambahkan tugas pertamamu";
    return;
  }

  if (activeTasks.length === 0) {
    elements.nearestDeadline.textContent = "Semua tugas selesai";
    elements.nearestCourse.textContent = "Kerja bagus, pertahankan ritmemu";
    return;
  }

  const nearest = activeTasks[0];
  const daysLeft = getDaysLeft(nearest.deadline);
  const deadlineInfo = getDeadlineInfo(daysLeft, false);

  elements.nearestDeadline.textContent = nearest.name;
  elements.nearestCourse.textContent = `${nearest.course} • ${formatDate(nearest.deadline)} • ${deadlineInfo.text}`;
}

function renderRecommendations() {
  if (!elements.recommendationList || !elements.emptyRecommendation) return;

  const recommendedTasks = getRecommendedTasks();

  if (recommendedTasks.length === 0) {
    elements.recommendationList.innerHTML = "";
    elements.emptyRecommendation.classList.remove("hidden");
    return;
  }

  elements.emptyRecommendation.classList.add("hidden");

  elements.recommendationList.innerHTML = recommendedTasks
    .map((task, index) => createRecommendationCard(task, index))
    .join("");
}

function getRecommendedTasks() {
  return tasks
    .filter((task) => !isTaskDone(task))
    .map((task) => {
      return {
        ...task,
        recommendationScore: calculateRecommendationScore(task),
        recommendationReasons: getRecommendationReasons(task)
      };
    })
    .sort((a, b) => {
      return (
        b.recommendationScore - a.recommendationScore ||
        parseDate(a.deadline) - parseDate(b.deadline)
      );
    })
    .slice(0, 3);
}

function calculateRecommendationScore(task) {
  let score = 0;
  const daysLeft = getDaysLeft(task.deadline);
  const progress = Number(task.progress) || 0;

  if (daysLeft < 0) {
    score += 70;
  } else if (daysLeft === 0) {
    score += 60;
  } else if (daysLeft === 1) {
    score += 50;
  } else if (daysLeft <= 3) {
    score += 40;
  } else if (daysLeft <= 7) {
    score += 25;
  } else {
    score += 10;
  }

  if (task.priority === "Tinggi") {
    score += 35;
  } else if (task.priority === "Sedang") {
    score += 20;
  } else {
    score += 10;
  }

  if (progress === 0) {
    score += 20;
  } else if (progress < 50) {
    score += 15;
  } else if (progress < 80) {
    score += 8;
  }

  return score;
}

function getRecommendationReasons(task) {
  const reasons = [];
  const daysLeft = getDaysLeft(task.deadline);
  const progress = Number(task.progress) || 0;

  if (daysLeft < 0) {
    reasons.push({
      text: `Lewat ${Math.abs(daysLeft)} hari`,
      type: "danger"
    });
  } else if (daysLeft === 0) {
    reasons.push({
      text: "Deadline hari ini",
      type: "danger"
    });
  } else if (daysLeft === 1) {
    reasons.push({
      text: "Deadline besok",
      type: "warning"
    });
  } else if (daysLeft <= 3) {
    reasons.push({
      text: `${daysLeft} hari lagi`,
      type: "warning"
    });
  } else {
    reasons.push({
      text: `${daysLeft} hari lagi`,
      type: "primary"
    });
  }

  if (task.priority === "Tinggi") {
    reasons.push({
      text: "Prioritas tinggi",
      type: "danger"
    });
  } else if (task.priority === "Sedang") {
    reasons.push({
      text: "Prioritas sedang",
      type: "warning"
    });
  } else {
    reasons.push({
      text: "Prioritas rendah",
      type: "success"
    });
  }

  if (progress === 0) {
    reasons.push({
      text: "Belum mulai",
      type: "danger"
    });
  } else if (progress < 50) {
    reasons.push({
      text: "Progress rendah",
      type: "warning"
    });
  } else if (progress < 100) {
    reasons.push({
      text: "Masih berjalan",
      type: "primary"
    });
  }

  return reasons;
}

function createRecommendationCard(task, index) {
  const priorityKey = getPriorityKey(task.priority);
  const reasons = task.recommendationReasons || [];

  return `
    <article class="recommendation-card ${priorityKey}">
      <div class="recommendation-rank">
        ${index + 1}
      </div>

      <div class="recommendation-content">
        <h4>${escapeHTML(task.name)}</h4>
        <p>
          ${escapeHTML(task.course)} • Deadline ${formatDate(task.deadline)} • Progress ${task.progress}%
        </p>

        <div class="recommendation-meta">
          ${reasons
            .map((reason) => {
              return `
                <span class="reason-chip ${reason.type}">
                  ${escapeHTML(reason.text)}
                </span>
              `;
            })
            .join("")}
        </div>
      </div>

      <div class="recommendation-score">
        <span>Skor Prioritas</span>
        <strong>${task.recommendationScore}</strong>
        <a href="#task-section" class="recommendation-action">
          Lihat Tugas
        </a>
      </div>
    </article>
  `;
}

function renderTaskList() {
  const filteredTasks = getFilteredTasks();

  if (filteredTasks.length === 0) {
    elements.taskList.innerHTML = "";
    showEmptyState();
    return;
  }

  elements.emptyState.classList.add("hidden");

  elements.taskList.innerHTML = filteredTasks
    .map((task) => createTaskCard(task))
    .join("");
}

function renderCalendar() {
  const year = currentCalendarDate.getFullYear();
  const month = currentCalendarDate.getMonth();

  elements.calendarMonthTitle.textContent = currentCalendarDate.toLocaleDateString("id-ID", {
    month: "long",
    year: "numeric"
  });

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const startDay = firstDayOfMonth.getDay();
  const totalDays = lastDayOfMonth.getDate();

  const previousMonthLastDate = new Date(year, month, 0).getDate();

  const calendarCells = [];

  for (let i = startDay - 1; i >= 0; i--) {
    const dayNumber = previousMonthLastDate - i;
    calendarCells.push(createCalendarDay(dayNumber, true, null));
  }

  for (let day = 1; day <= totalDays; day++) {
    const dateString = toDateInputValue(new Date(year, month, day));
    calendarCells.push(createCalendarDay(day, false, dateString));
  }

  while (calendarCells.length % 7 !== 0) {
    const nextDay = calendarCells.length - (startDay + totalDays) + 1;
    calendarCells.push(createCalendarDay(nextDay, true, null));
  }

  elements.calendarGrid.innerHTML = calendarCells.join("");
}

function createCalendarDay(dayNumber, muted, dateString) {
  const todayString = toDateInputValue(new Date());
  const isToday = dateString === todayString;

  const tasksOnDate = dateString
    ? tasks.filter((task) => task.deadline === dateString)
    : [];

  const taskItems = tasksOnDate
    .map((task) => {
      const priorityKey = getPriorityKey(task.priority);
      const doneClass = isTaskDone(task) ? "done" : "";

      return `
        <span class="calendar-task ${priorityKey} ${doneClass}">
          ${escapeHTML(task.name)}
        </span>
      `;
    })
    .join("");

  return `
    <div class="calendar-day ${muted ? "muted" : ""} ${isToday ? "today" : ""}">
      <div class="calendar-date">
        <strong>${dayNumber}</strong>
        ${isToday ? "<small>Hari ini</small>" : ""}
      </div>

      ${taskItems}
    </div>
  `;
}

function loadTheme() {
  const savedTheme = localStorage.getItem("studyflow_theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    elements.themeToggle.textContent = "Mode Terang";
  } else {
    document.body.classList.remove("dark-mode");
    elements.themeToggle.textContent = "Mode Gelap";
  }
}

function toggleTheme() {
  const isDarkMode = document.body.classList.toggle("dark-mode");

  if (isDarkMode) {
    localStorage.setItem("studyflow_theme", "dark");
    elements.themeToggle.textContent = "Mode Terang";
    showToast("Mode gelap diaktifkan.");
  } else {
    localStorage.setItem("studyflow_theme", "light");
    elements.themeToggle.textContent = "Mode Gelap";
    showToast("Mode terang diaktifkan.");
  }
}

function createTaskCard(task) {
  const done = isTaskDone(task);
  const daysLeft = getDaysLeft(task.deadline);
  const deadlineInfo = getDeadlineInfo(daysLeft, done);
  const priorityKey = getPriorityKey(task.priority);

  return `
    <article class="task-card priority-${priorityKey} ${done ? "done" : ""}">
      <div class="task-top">
        <div class="task-title-group">
          <h4 class="task-title">${escapeHTML(task.name)}</h4>
          <p class="task-course">${escapeHTML(task.course)}</p>
        </div>

        <div class="task-badges">
          <span class="badge badge-priority-${priorityKey}">
            ${escapeHTML(task.priority)}
          </span>
          <span class="badge ${done ? "badge-status-done" : "badge-status-active"}">
            ${done ? "Selesai" : "Belum Selesai"}
          </span>
        </div>
      </div>

      <div class="task-meta">
        <span class="meta-item">
          Deadline: ${formatDate(task.deadline)}
        </span>
        <span class="meta-item ${deadlineInfo.className}">
          ${deadlineInfo.text}
        </span>
      </div>

      ${
        task.note
          ? `<p class="task-note">${escapeHTML(task.note)}</p>`
          : ""
      }

      ${createSubtaskList(task)}

      <div class="progress-wrapper">
        <div class="progress-label">
          <span>Progress</span>
          <span>${task.progress}%</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${task.progress}%"></div>
        </div>
      </div>

      <div class="task-actions">
        <button class="action-btn btn-done" data-action="toggle" data-id="${task.id}">
          ${done ? "Buka Lagi" : "Tandai Selesai"}
        </button>

        <button class="action-btn btn-edit" data-action="edit" data-id="${task.id}">
          Edit
        </button>

        <button class="action-btn btn-delete" data-action="delete" data-id="${task.id}">
          Hapus
        </button>
      </div>
    </article>
  `;
}

function showEmptyState() {
  const title = elements.emptyState.querySelector("h4");
  const description = elements.emptyState.querySelector("p");

  if (tasks.length === 0) {
    title.textContent = "Belum ada tugas";
    description.textContent =
      "Tambahkan tugas pertamamu agar dashboard mulai menampilkan data.";
  } else {
    title.textContent = "Tugas tidak ditemukan";
    description.textContent =
      "Coba ubah kata pencarian, filter status, atau filter prioritas.";
  }

  elements.emptyState.classList.remove("hidden");
}

/* ================================
   FILTER AND SORT
   ================================ */

function getFilteredTasks() {
  const searchKeyword = elements.searchInput.value.toLowerCase().trim();
  const statusFilter = elements.statusFilter.value;
  const priorityFilter = elements.priorityFilter.value;
  const sortFilter = elements.sortFilter.value;

  let result = [...tasks];

  if (searchKeyword) {
    result = result.filter((task) => {
      const text = `${task.name} ${task.course} ${task.note || ""}`.toLowerCase();
      return text.includes(searchKeyword);
    });
  }

  if (statusFilter !== "Semua") {
    result = result.filter((task) => {
      const status = isTaskDone(task) ? "Selesai" : "Belum Selesai";
      return status === statusFilter;
    });
  }

  if (priorityFilter !== "Semua") {
    result = result.filter((task) => task.priority === priorityFilter);
  }

  if (sortFilter === "deadline") {
    result.sort((a, b) => parseDate(a.deadline) - parseDate(b.deadline));
  }

  if (sortFilter === "priority") {
    const priorityOrder = {
      Tinggi: 1,
      Sedang: 2,
      Rendah: 3
    };

    result.sort((a, b) => {
      return (
        priorityOrder[a.priority] - priorityOrder[b.priority] ||
        parseDate(a.deadline) - parseDate(b.deadline)
      );
    });
  }

  if (sortFilter === "progress") {
    result.sort((a, b) => b.progress - a.progress);
  }

  return result;
}

/* ================================
   DATE AND REMINDER
   ================================ */

function setTodayDate() {
  const today = new Date();

  elements.todayDate.textContent = today.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

function parseDate(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function normalizeDate(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function getDaysLeft(deadline) {
  const today = normalizeDate(new Date());
  const deadlineDate = parseDate(deadline);
  const difference = deadlineDate - today;

  return Math.ceil(difference / (1000 * 60 * 60 * 24));
}

function formatDate(dateString) {
  return parseDate(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

function getDeadlineInfo(daysLeft, done) {
  if (done) {
    return {
      text: "Tugas selesai",
      className: ""
    };
  }

  if (daysLeft < 0) {
    return {
      text: `Lewat ${Math.abs(daysLeft)} hari`,
      className: "danger"
    };
  }

  if (daysLeft === 0) {
    return {
      text: "Deadline hari ini",
      className: "danger"
    };
  }

  if (daysLeft === 1) {
    return {
      text: "Deadline besok",
      className: "warning"
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
    className: ""
  };
}

function requestNotificationAccess() {
  if (!("Notification" in window)) return;

  if (Notification.permission === "default") {
    Notification.requestPermission();
  }
}

function sendDeadlineReminder() {
  const todayKey = toDateInputValue(new Date());
  const reminderKey = `studyflow_reminder_${todayKey}`;

  if (sessionStorage.getItem(reminderKey)) return;

  const urgentTasks = tasks.filter((task) => {
    const daysLeft = getDaysLeft(task.deadline);
    return !isTaskDone(task) && daysLeft >= 0 && daysLeft <= 1;
  });

  if (urgentTasks.length === 0) return;

  const message =
    urgentTasks.length === 1
      ? `Reminder: ${urgentTasks[0].name} mendekati deadline.`
      : `Reminder: ${urgentTasks.length} tugas mendekati deadline.`;

  showToast(message);

  if ("Notification" in window && Notification.permission === "granted") {
    new Notification("StudyFlow Reminder", {
      body: message
    });
  }

  sessionStorage.setItem(reminderKey, "shown");
}

function toDateInputValue(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

/* ================================
   HISTORY
   ================================ */

function addHistory(type, title, description) {
  const newHistory = {
    id: createId(),
    type,
    title,
    description,
    createdAt: new Date().toISOString()
  };

  histories.unshift(newHistory);

  if (histories.length > 30) {
    histories = histories.slice(0, 30);
  }

  saveHistory();
}

function renderHistory() {
  if (!histories || histories.length === 0) {
    elements.historyList.innerHTML = "";
    elements.emptyHistory.classList.remove("hidden");
    return;
  }

  elements.emptyHistory.classList.add("hidden");

  elements.historyList.innerHTML = histories
    .map((history) => {
      return `
        <div class="history-item">
          <div class="history-icon ${history.type}">
            ${getHistoryIcon(history.type)}
          </div>

          <div class="history-content">
            <h4>${escapeHTML(history.title)}</h4>
            <p>${escapeHTML(history.description)}</p>
            <small>${formatDateTime(history.createdAt)}</small>
          </div>
        </div>
      `;
    })
    .join("");
}

function clearHistory() {
  const confirmClear = confirm("Yakin ingin membersihkan semua riwayat?");

  if (!confirmClear) return;

  histories = [];
  saveHistory();
  renderHistory();
  showToast("Riwayat berhasil dibersihkan.");
}

function getHistoryIcon(type) {
  if (type === "add") return "+";
  if (type === "edit") return "E";
  if (type === "status") return "S";
  if (type === "delete") return "H";
  return "R";
}

function formatDateTime(dateString) {
  return new Date(dateString).toLocaleString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

/* ================================
   STORAGE
   ================================ */

function loadTasks() {
  try {
    const storedTasks = localStorage.getItem(STORAGE_KEY);

    if (!storedTasks) {
      return [];
    }

    const parsedTasks = JSON.parse(storedTasks);

    return parsedTasks.map((task) => {
      return {
        ...task,
        note: task.note || "",
        subtasks: task.subtasks || [],
        progress: Number(task.progress) || 0,
        status: task.status || (Number(task.progress) === 100 ? "Selesai" : "Belum Selesai")
      };
    });
  } catch (error) {
    console.error("Gagal membaca data dari localStorage:", error);
    return [];
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function loadHistory() {
  try {
    const storedHistory = localStorage.getItem(HISTORY_KEY);
    return storedHistory ? JSON.parse(storedHistory) : [];
  } catch (error) {
    console.error("Gagal membaca data riwayat:", error);
    return [];
  }
}

function saveHistory() {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(histories));
}

function loadSubjects() {
  try {
    const storedSubjects = localStorage.getItem(SUBJECT_KEY);

    if (!storedSubjects) {
      saveSubjects(DEFAULT_SUBJECTS);
      return [...DEFAULT_SUBJECTS];
    }

    const parsedSubjects = JSON.parse(storedSubjects);

    if (!Array.isArray(parsedSubjects)) {
      return [...DEFAULT_SUBJECTS];
    }

    return parsedSubjects.sort((a, b) => a.localeCompare(b, "id-ID"));
  } catch (error) {
    console.error("Gagal membaca data mata kuliah:", error);
    return [...DEFAULT_SUBJECTS];
  }
}

function saveSubjects(subjectData = subjects) {
  localStorage.setItem(SUBJECT_KEY, JSON.stringify(subjectData));
}

function loadDailyTargets() {
  try {
    const storedTargets = localStorage.getItem(TARGET_KEY);

    if (!storedTargets) {
      return [];
    }

    const parsedTargets = JSON.parse(storedTargets);

    if (!Array.isArray(parsedTargets)) {
      return [];
    }

    return parsedTargets.map((target) => {
      return {
        ...target,
        title: target.title || "",
        done: Boolean(target.done),
        date: target.date || toDateInputValue(new Date()),
        createdAt: target.createdAt || new Date().toISOString(),
        updatedAt: target.updatedAt || new Date().toISOString()
      };
    });
  } catch (error) {
    console.error("Gagal membaca data target harian:", error);
    return [];
  }
}

function saveDailyTargets() {
  localStorage.setItem(TARGET_KEY, JSON.stringify(dailyTargets));
}

function loadStudyPlans() {
  try {
    const storedPlans = localStorage.getItem(PLANNER_KEY);

    if (!storedPlans) {
      return [];
    }

    const parsedPlans = JSON.parse(storedPlans);

    if (!Array.isArray(parsedPlans)) {
      return [];
    }

    return parsedPlans.map((plan) => {
      return {
        ...plan,
        title: plan.title || "",
        subject: plan.subject || "",
        date: plan.date || toDateInputValue(new Date()),
        startTime: plan.startTime || "08:00",
        endTime: plan.endTime || "09:00",
        type: plan.type || "Belajar",
        note: plan.note || "",
        createdAt: plan.createdAt || new Date().toISOString(),
        updatedAt: plan.updatedAt || new Date().toISOString()
      };
    });
  } catch (error) {
    console.error("Gagal membaca data Study Planner:", error);
    return [];
  }
}

function saveStudyPlans() {
  localStorage.setItem(PLANNER_KEY, JSON.stringify(studyPlans));
}

function loadFocusSessions() {
  try {
    const storedSessions = localStorage.getItem(FOCUS_SESSION_KEY);

    if (!storedSessions) {
      return [];
    }

    const parsedSessions = JSON.parse(storedSessions);

    if (!Array.isArray(parsedSessions)) {
      return [];
    }

    return parsedSessions.map((session) => {
      return {
        ...session,
        taskId: session.taskId || "",
        taskName: session.taskName || "Sesi fokus bebas",
        course: session.course || "",
        durationMinutes: Number(session.durationMinutes) || 0,
        createdAt: session.createdAt || new Date().toISOString(),
        date: session.date || toDateInputValue(new Date())
      };
    });
  } catch (error) {
    console.error("Gagal membaca data sesi fokus:", error);
    return [];
  }
}

function saveFocusSessions() {
  localStorage.setItem(FOCUS_SESSION_KEY, JSON.stringify(focusSessions));
}

function loadStudyNotes() {
  try {
    const storedNotes = localStorage.getItem(NOTE_KEY);

    if (!storedNotes) {
      return [];
    }

    const parsedNotes = JSON.parse(storedNotes);

    if (!Array.isArray(parsedNotes)) {
      return [];
    }

    return parsedNotes.map((note) => {
      return {
        ...note,
        subject: note.subject || "",
        title: note.title || "",
        content: note.content || "",
        createdAt: note.createdAt || new Date().toISOString(),
        updatedAt: note.updatedAt || new Date().toISOString()
      };
    });
  } catch (error) {
    console.error("Gagal membaca data catatan materi:", error);
    return [];
  }
}

function saveStudyNotes() {
  localStorage.setItem(NOTE_KEY, JSON.stringify(studyNotes));
}

function loadReflections() {
  try {
    const storedReflections = localStorage.getItem(REFLECTION_KEY);

    if (!storedReflections) {
      return [];
    }

    const parsedReflections = JSON.parse(storedReflections);

    if (!Array.isArray(parsedReflections)) {
      return [];
    }

    return parsedReflections.map((reflection) => {
      return {
        ...reflection,
        date: reflection.date || toDateInputValue(new Date()),
        learned: reflection.learned || "",
        problem: reflection.problem || "",
        score: Number(reflection.score) || 0,
        mood: reflection.mood || "Biasa saja",
        plan: reflection.plan || "",
        createdAt: reflection.createdAt || new Date().toISOString(),
        updatedAt: reflection.updatedAt || new Date().toISOString()
      };
    });
  } catch (error) {
    console.error("Gagal membaca data refleksi belajar:", error);
    return [];
  }
}

function saveReflections() {
  localStorage.setItem(REFLECTION_KEY, JSON.stringify(reflections));
}

/* ================================
   UTILITIES
   ================================ */

function isTaskDone(task) {
  return task.status === "Selesai" || Number(task.progress) === 100;
}

function getPriorityKey(priority) {
  if (priority === "Tinggi") return "high";
  if (priority === "Sedang") return "medium";
  return "low";
}

function createId() {
  if (window.crypto && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function showToast(message) {
  elements.toastMessage.textContent = message;
  elements.toast.classList.remove("hidden");

  setTimeout(() => {
    elements.toast.classList.add("hidden");
  }, 2600);
}