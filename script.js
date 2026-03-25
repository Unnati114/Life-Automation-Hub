document.addEventListener("DOMContentLoaded", function () {

    const taskInput = document.getElementById("taskInput");
    const taskDate = document.getElementById("taskDate");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskContainer = document.getElementById("taskContainer");

    // Only run on tasks page
    if (!taskInput) return;

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function showTasks() {

        taskContainer.innerHTML = "";

        tasks.forEach((task, index) => {

            let card = document.createElement("div");
            card.className = "card-box";

            card.innerHTML = `
                <h3>${task.name}</h3>
                <p>Due: ${task.date}</p>
                <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
            `;

            taskContainer.appendChild(card);
        });
    }

    addTaskBtn.addEventListener("click", function () {

        if (taskInput.value.trim() === "") {
            alert("Enter Task");
            return;
        }

        let newTask = {
            name: taskInput.value,
            date: taskDate.value
        };

        tasks.push(newTask);

        localStorage.setItem("tasks", JSON.stringify(tasks));

        taskInput.value = "";
        taskDate.value = "";

        showTasks();
    });

    window.deleteTask = function (index) {

        tasks.splice(index, 1);

        localStorage.setItem("tasks", JSON.stringify(tasks));

        showTasks();
    };

    showTasks();
});

// REMINDER PAGE

document.addEventListener("DOMContentLoaded", function () {

    const reminderInput = document.getElementById("reminderInput");
    const reminderDate = document.getElementById("reminderDate");
    const addReminderBtn = document.getElementById("addReminderBtn");
    const reminderContainer = document.getElementById("reminderContainer");

    if (!reminderInput) return;

    let reminders = JSON.parse(localStorage.getItem("reminders")) || [];

    function showReminders() {

        reminderContainer.innerHTML = "";

        reminders.forEach((reminder, index) => {

            let card = document.createElement("div");
            card.className = "card-box";

            card.innerHTML = `
                <h3>${reminder.name}</h3>
                <p>Due: ${reminder.date}</p>
                <button class="delete-btn" onclick="deleteReminder(${index})">Delete</button>
            `;

            reminderContainer.appendChild(card);
        });
    }

    addReminderBtn.addEventListener("click", function () {

        if (reminderInput.value.trim() === "") {
            alert("Enter Reminder");
            return;
        }

        let newReminder = {
            name: reminderInput.value,
            date: reminderDate.value
        };

        reminders.push(newReminder);

        localStorage.setItem("reminders", JSON.stringify(reminders));

        reminderInput.value = "";
        reminderDate.value = "";

        showReminders();
    });

    window.deleteReminder = function (index) {

        reminders.splice(index, 1);

        localStorage.setItem("reminders", JSON.stringify(reminders));

        showReminders();
    };

    showReminders();
});

// DOCUMENT PAGE

document.addEventListener("DOMContentLoaded", function () {

    const docName = document.getElementById("docName");
    const docDate = document.getElementById("docDate");
    const docFile = document.getElementById("docFile");
    const uploadBtn = document.getElementById("uploadBtn");
    const docContainer = document.getElementById("docContainer");

    if (!docName) return;

    let documents = JSON.parse(localStorage.getItem("documents")) || [];
    let reminders = JSON.parse(localStorage.getItem("reminders")) || [];

    function showDocuments() {

        docContainer.innerHTML = "";

        documents.forEach((doc, index) => {

            let card = document.createElement("div");
            card.className = "card-box";

            card.innerHTML = `
                <h3>${doc.name}</h3>
                <p>Due: ${doc.date}</p>
                <button class="delete-btn" onclick="deleteDoc(${index})">Delete</button>
            `;

            docContainer.appendChild(card);
        });
    }

    uploadBtn.addEventListener("click", function () {

        if (docName.value === "" || docDate.value === "") {
            alert("Enter document details");
            return;
        }

        let newDoc = {
            name: docName.value,
            date: docDate.value
        };

        documents.push(newDoc);

        localStorage.setItem("documents", JSON.stringify(documents));

        // AUTO REMINDER CREATE

        reminders.push({
            name: docName.value,
            date: docDate.value
        });

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
    };

    showDocuments();
});

document.addEventListener("DOMContentLoaded", function () {
    // -------- EXPENSES PAGE LOGIC --------
    const expenseName = document.getElementById('expenseName');
    const expenseAmount = document.getElementById('expenseAmount');
    const expenseDate = document.getElementById('expenseDate');
    const addExpenseBtn = document.getElementById('addExpenseBtn');
    const expenseContainer = document.getElementById('expenseContainer');

    if (expenseContainer) { // check if this page exists
        // Add new expense
        addExpenseBtn.addEventListener('click', () => {
            if (expenseName.value && expenseAmount.value && expenseDate.value) {
                const cardBox = document.createElement('div');
                cardBox.classList.add('card-box');

                const h3 = document.createElement('h3');
                h3.innerText = expenseName.value;

                const p = document.createElement('p');
                const date = new Date(expenseDate.value);
                const options = { day: 'numeric', month: 'long' };
                p.innerText = `₹${expenseAmount.value} - ${date.toLocaleDateString('en-US', options)}`;

                const delBtn = document.createElement('button');
                delBtn.innerText = 'Delete';
                delBtn.classList.add('delete-btn');
                delBtn.addEventListener('click', () => {
                    cardBox.remove();
                });

                cardBox.appendChild(h3);
                cardBox.appendChild(p);
                cardBox.appendChild(delBtn);

                expenseContainer.appendChild(cardBox);

                // Clear input fields
                expenseName.value = '';
                expenseAmount.value = '';
                expenseDate.value = '';
            } else {
                alert('Please fill all fields!');
            }
        });

        // Delete existing default cards
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.target.parentElement.remove();
            });
        });
    }
});

// -------- AI ASSISTANT PAGE LOGIC --------
const chatBox = document.getElementById('chatBox');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

if(chatBox){ // ensure we are on assistant page
    sendBtn.addEventListener('click', () => {
        const msg = userInput.value.trim();
        if(msg){
            // Display user message
            const userMsgDiv = document.createElement('div');
            userMsgDiv.classList.add('user-msg');
            userMsgDiv.innerText = msg;
            chatBox.appendChild(userMsgDiv);

            // Simple assistant response (placeholder)
            const assistantMsgDiv = document.createElement('div');
            assistantMsgDiv.classList.add('assistant-msg');
            assistantMsgDiv.innerText = "This is a placeholder response for: " + msg;
            chatBox.appendChild(assistantMsgDiv);

            chatBox.scrollTop = chatBox.scrollHeight;
            userInput.value = '';
        }
    });

    // Optional: send message on Enter key
    userInput.addEventListener('keypress', (e) => {
        if(e.key === "Enter") sendBtn.click();
    });
}
document.addEventListener("DOMContentLoaded", function () {
    // -------- PROFILE PAGE LOGIC --------
    const fullName = document.getElementById("fullName");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const profileImg = document.getElementById("profileImg");
    const photoUpload = document.getElementById("photoUpload");
    const saveProfileBtn = document.getElementById("saveProfileBtn");

    if (fullName) { // check if we are on profile page

        // Load saved data from localStorage
        const savedProfile = JSON.parse(localStorage.getItem("LETAH_Profile"));
        if (savedProfile) {
            fullName.value = savedProfile.fullName || "";
            email.value = savedProfile.email || "";
            phone.value = savedProfile.phone || "";
            profileImg.src = savedProfile.photo || "https://via.placeholder.com/120";
        }

        // Upload photo
        photoUpload.addEventListener("change", function () {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    profileImg.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });

        // Save profile
        saveProfileBtn.addEventListener("click", function () {
            const profileData = {
                fullName: fullName.value,
                email: email.value,
                phone: phone.value,
                photo: profileImg.src
            };
            localStorage.setItem("LETAH_Profile", JSON.stringify(profileData));
            alert("Profile saved successfully!");
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    // Load profile info from localStorage
    const profile = JSON.parse(localStorage.getItem("LETAH_Profile"));

    const userNameSpan = document.getElementById("userName");
    const userImg = document.getElementById("userImg");
    const welcomeText = document.getElementById("welcomeText");

    if(profile){
        userNameSpan.innerText = profile.fullName || "User";
        userImg.src = profile.photo || "https://via.placeholder.com/40";
        welcomeText.innerText = `WELCOME TO LIFE AUTOMATION HUB, ${profile.fullName || "User"}`;
    }

    // Example dynamic dashboard data
    const dashboardData = {
        upcomingBills: 3,
        todaysTasks: 5,
        monthlyExpenses: 4500,
        documentsExpiring: 2,
        recentActivity: [
            "Electricity bill reminder added",
            "New document uploaded",
            "Expense updated",
            "Task completed"
        ]
    };

    // Update cards
    document.getElementById("billCount").innerText = `${dashboardData.upcomingBills} Pending`;
    document.getElementById("taskCount").innerText = `${dashboardData.todaysTasks} Remaining`;
    document.getElementById("expenseCount").innerText = `₹${dashboardData.monthlyExpenses}`;
    document.getElementById("docCount").innerText = `${dashboardData.documentsExpiring} Expiring`;

    // Populate recent activity
    const activityList = document.getElementById("activityList");
    activityList.innerHTML = "";
    dashboardData.recentActivity.forEach(act=>{
        const li = document.createElement("li");
        li.innerText = act;
        activityList.appendChild(li);
    });

    // Make cards clickable
    document.querySelectorAll(".cards .card").forEach(card=>{
        card.addEventListener("click", ()=>{
            const page = card.dataset.page;
            if(page){
                window.location.href = page;
            }
        });
    });
});