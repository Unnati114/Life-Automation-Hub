
// =============================
// GLOBAL CHECK
// =============================
document.addEventListener("DOMContentLoaded", () => {

    console.log("LETAH Script Loaded");

    loadProfileHeader();
    loadDashboardData();
    setupTasks();
    setupReminders();
    setupDocuments();
    setupExpenses();
    setupAssistant();
    setupProfile();
    setupSignup();
    setupLogin();

});


// =============================
// TASK PAGE (MongoDB Connected)
// =============================
function setupTasks() {

    const taskInput = document.getElementById("taskInput");
    if (!taskInput) return;

    const taskDate = document.getElementById("taskDate");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskContainer = document.getElementById("taskContainer");

    let editId = null;

    // Load Tasks
    async function loadTasks() {

        const res = await fetch("http://localhost:5000/api/tasks/all");
        const tasks = await res.json();

        taskContainer.innerHTML = "";

        tasks.forEach(task => {

            const div = document.createElement("div");
            div.classList.add("card-box");

            div.innerHTML = `
                <h3>${task.title}</h3>
                <p>${task.date}</p>

                <button onclick="editTask('${task._id}','${task.title}','${task.date}')">Edit</button>
                <button class="delete-btn" onclick="deleteTask('${task._id}')">Delete</button>
            `;

            taskContainer.appendChild(div);
        });
    }

    loadTasks();

    // Add or Update
    addTaskBtn.addEventListener("click", async () => {

        const title = taskInput.value;
        const date = taskDate.value;

        if (!title) return alert("Enter task");

        if (editId) {

            await fetch(`http://localhost:5000/api/tasks/update/${editId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, date })
            });

            editId = null;
            addTaskBtn.innerText = "Add Task";

        } else {

            await fetch("http://localhost:5000/api/tasks/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, date })
            });
        }

        taskInput.value = "";
        taskDate.value = "";

        loadTasks();
    });

    // Delete
    window.deleteTask = async function (id) {

        await fetch(`http://localhost:5000/api/tasks/delete/${id}`, {
            method: "DELETE"
        });

        loadTasks();
    }

    // Edit
    window.editTask = function (id, title, date) {

        taskInput.value = title;
        taskDate.value = date;

        editId = id;
        addTaskBtn.innerText = "Update Task";
    }
}

// =============================
// REMINDER PAGE
// =============================
function setupReminders() {

    const reminderInput = document.getElementById("reminderInput");
    if (!reminderInput) return;

    const reminderDate = document.getElementById("reminderDate");
    const addReminderBtn = document.getElementById("addReminderBtn");
    const reminderContainer = document.getElementById("reminderContainer");

    let reminders = JSON.parse(localStorage.getItem("reminders")) || [];

    function showReminders() {

        reminderContainer.innerHTML = "";

        reminders.forEach((r, index) => {

            reminderContainer.innerHTML += `
                <div class="card-box">
                    <h3>${r.name}</h3>
                    <p>Due: ${r.date}</p>
                    <button class="delete-btn" onclick="deleteReminder(${index})">Delete</button>
                </div>
            `;
        });
    }

    addReminderBtn.addEventListener("click", () => {

        reminders.push({
            name: reminderInput.value,
            date: reminderDate.value
        });

        localStorage.setItem("reminders", JSON.stringify(reminders));

        reminderInput.value = "";
        reminderDate.value = "";

        showReminders();
    });

    window.deleteReminder = function (index) {

        reminders.splice(index, 1);
        localStorage.setItem("reminders", JSON.stringify(reminders));
        showReminders();
    }

    showReminders();
}


// =============================
// DOCUMENT PAGE
// =============================
function setupDocuments() {

    const docName = document.getElementById("docName");
    if (!docName) return;

    const docDate = document.getElementById("docDate");
    const uploadBtn = document.getElementById("uploadBtn");
    const docContainer = document.getElementById("docContainer");

    let documents = JSON.parse(localStorage.getItem("documents")) || [];
    let reminders = JSON.parse(localStorage.getItem("reminders")) || [];

    function showDocuments() {

        docContainer.innerHTML = "";

        documents.forEach((doc, index) => {

            docContainer.innerHTML += `
                <div class="card-box">
                    <h3>${doc.name}</h3>
                    <p>${doc.date}</p>
                    <button onclick="deleteDoc(${index})" class="delete-btn">Delete</button>
                </div>
            `;
        });
    }

    uploadBtn.addEventListener("click", () => {

        documents.push({
            name: docName.value,
            date: docDate.value
        });

        reminders.push({
            name: docName.value,
            date: docDate.value
        });

        localStorage.setItem("documents", JSON.stringify(documents));
        localStorage.setItem("reminders", JSON.stringify(reminders));

        alert("Document uploaded and reminder created");

        docName.value = "";
        docDate.value = "";

        showDocuments();
    });

    window.deleteDoc = function (index) {

        documents.splice(index, 1);
        localStorage.setItem("documents", JSON.stringify(documents));
        showDocuments();
    }

    showDocuments();
}


// =============================
// EXPENSE PAGE
// =============================
function setupExpenses() {

    const expenseName = document.getElementById("expenseName");
    if (!expenseName) return;

    const expenseAmount = document.getElementById("expenseAmount");
    const expenseDate = document.getElementById("expenseDate");
    const addExpenseBtn = document.getElementById("addExpenseBtn");
    const expenseContainer = document.getElementById("expenseContainer");

    addExpenseBtn.addEventListener("click", () => {

        const card = document.createElement("div");
        card.className = "card-box";

        card.innerHTML = `
            <h3>${expenseName.value}</h3>
            <p>₹${expenseAmount.value} - ${expenseDate.value}</p>
            <button class="delete-btn">Delete</button>
        `;

        card.querySelector("button").onclick = () => card.remove();

        expenseContainer.appendChild(card);
    });
}


// =============================
// AI ASSISTANT
// =============================
function setupAssistant() {

    const chatBox = document.getElementById("chatBox");
    if (!chatBox) return;

    const userInput = document.getElementById("userInput");
    const sendBtn = document.getElementById("sendBtn");

    sendBtn.addEventListener("click", () => {

        const msg = userInput.value;

        chatBox.innerHTML += `<div class="user-msg">${msg}</div>`;
        chatBox.innerHTML += `<div class="assistant-msg">AI Response: ${msg}</div>`;

        userInput.value = "";
    });
}


// =============================
// PROFILE PAGE
// =============================
function setupProfile() {

    const fullName = document.getElementById("fullName");
    if (!fullName) return;

    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const saveBtn = document.getElementById("saveProfileBtn");

    saveBtn.addEventListener("click", () => {

        localStorage.setItem("LETAH_Profile", JSON.stringify({
            fullName: fullName.value,
            email: email.value,
            phone: phone.value
        }));

        alert("Profile Saved");
    });
}


// =============================
// DASHBOARD
// =============================
function loadDashboardData() {

    const bill = document.getElementById("billCount");
    if (!bill) return;

    bill.innerText = "3 Pending";
    document.getElementById("taskCount").innerText = "5 Remaining";
    document.getElementById("expenseCount").innerText = "₹4500";
    document.getElementById("docCount").innerText = "2 Expiring";
}


// =============================
// HEADER PROFILE
// =============================
function loadProfileHeader() {

    const userName = document.getElementById("userName");
    if (!userName) return;

    const profile = JSON.parse(localStorage.getItem("LETAH_Profile"));

    if (profile) {
        userName.innerText = profile.fullName;
    }
}


// =============================
// SIGNUP
// =============================
function setupSignup() {

    const signupForm = document.getElementById("signupForm");
    if (!signupForm) return;

    signupForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        // Validate passwords
        if (password !== confirmPassword) {
            showMessage("Passwords do not match!", "error");
            return;
        }

        if (password.length < 6) {
            showMessage("Password must be at least 6 characters!", "error");
            return;
        }

        try {

            const res = await fetch("http://localhost:5000/api/auth/signup", {

                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, password })
            });

            const data = await res.json();

            if (res.status === 201) {
                showMessage("Signup Successful! Redirecting to login...", "success");
                setTimeout(() => {
                    window.location.href = "login.html";
                }, 1500);
            } else {
                showMessage(data.message || "Signup failed", "error");
            }

        } catch (error) {
            console.error("Signup error:", error);
            showMessage("Network error! Please check if backend is running on http://localhost:5000", "error");
        }

        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        document.getElementById("confirmPassword").value = "";
    });
}


// =============================
// LOGIN
// =============================
function setupLogin() {

    const loginForm = document.getElementById("loginForm");
    if (!loginForm) return;

    loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (!email || !password) {
            showMessage("Please fill in all fields", "error");
            return;
        }

        try {

            const res = await fetch("http://localhost:5000/api/auth/login", {

                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (res.status === 200) {

                localStorage.setItem("user", JSON.stringify(data.user));
                showMessage("Login Successful! Redirecting...", "success");
                setTimeout(() => {
                    window.location.href = "dashboard.html";
                }, 1500);

            } else {
                showMessage(data.message || "Login failed", "error");
            }

        } catch (error) {
            console.error("Login error:", error);
            showMessage("Network error! Please check if backend is running on http://localhost:5000", "error");
        }

        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
    });
}

// Show message helper
function showMessage(msg, type) {
    const messageEl = document.getElementById("message");
    if (!messageEl) return;
    
    messageEl.innerText = msg;
    messageEl.style.color = type === "error" ? "#d32f2f" : "#388e3c";
    messageEl.style.padding = "10px";
    messageEl.style.borderRadius = "5px";
    messageEl.style.backgroundColor = type === "error" ? "#ffebee" : "#e8f5e9";
    messageEl.style.border = type === "error" ? "1px solid #d32f2f" : "1px solid #388e3c";
}
