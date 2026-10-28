
// Store the reports in an array
let reports = [
    {
        id: 1,
        title: "Equipment Check",
        department: "Emergency",
        date: "2026-10-26",
        description: "Routine equipment check",
        status: "Pending"
    },
    {
        id: 2,
        title: "Ward Inspection",
        department: "Maternity",
        date: "2026-10-27",
        description: "Routine ward inspection",
        status: "Completed"
    },
    {
        id: 3,
        title: "Staff Meeting",
        department: "Administration",
        date: "2026-10-28",
        description: "Weekly staff meeting report",
        status: "Pending"
    }
];

// Display reports in the table
function displayReports() {
    const reportList = document.getElementById("reportList");
    const searchText = document.getElementById("searchReports").value.toLowerCase();

    // Clear the table before displaying reports
    reportList.innerHTML = "";

    // Find reports that match the search
    const filteredReports = reports.filter(function(report) {
        return report.title.toLowerCase().includes(searchText) ||
               report.department.toLowerCase().includes(searchText);
    });

    // Display each matching report
    filteredReports.forEach(function(report) {
        const row = document.createElement("tr");

        // Add the report ID
        const idCell = document.createElement("td");
        idCell.textContent = report.id;
        row.appendChild(idCell);

        // Add the report title
        const titleCell = document.createElement("td");
        titleCell.textContent = report.title;
        row.appendChild(titleCell);

        // Add the department
        const departmentCell = document.createElement("td");
        departmentCell.textContent = report.department;
        row.appendChild(departmentCell);

        // Add the date
        const dateCell = document.createElement("td");
        dateCell.textContent = report.date;
        row.appendChild(dateCell);

        // Add a dropdown to update the status
        const statusCell = document.createElement("td");
        const statusSelect = document.createElement("select");

        ["Pending", "Completed"].forEach(function(status) {
            const option = document.createElement("option");
            option.value = status;
            option.textContent = status;
            statusSelect.appendChild(option);
        });

        statusSelect.value = report.status;

        // Save the new status when it changes
        statusSelect.addEventListener("change", function() {
            report.status = statusSelect.value;
            updateDashboard();
        });

        statusCell.appendChild(statusSelect);
        row.appendChild(statusCell);

        // Add the row to the table
        reportList.appendChild(row);
    });

    updateDashboard();
}

// Update the dashboard totals
function updateDashboard() {
    document.getElementById("totalReports").textContent = reports.length;

    const pending = reports.filter(function(report) {
        return report.status === "Pending";
    });

    const completed = reports.filter(function(report) {
        return report.status === "Completed";
    });

    document.getElementById("pendingReports").textContent = pending.length;
    document.getElementById("completedReports").textContent = completed.length;
}

// Submit a new report
document.getElementById("reportForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Get the information entered into the form
    const title = document.getElementById("reportTitle").value.trim();
    const department = document.getElementById("department").value;
    const date = document.getElementById("reportDate").value;
    const description = document.getElementById("description").value.trim();

    // Create a new report
    const newReport = {
        id: reports.length > 0
            ? Math.max(...reports.map(function(report) {
                return report.id;
            })) + 1
            : 1,
        title: title,
        department: department,
        date: date,
        description: description,
        status: "Pending"
    };

    // Add the report to the array
    reports.push(newReport);

    // Clear the form
    document.getElementById("reportForm").reset();

    // Refresh the table and totals
    displayReports();
});

// Search reports as the user types
document.getElementById("searchReports").addEventListener("input", function() {
    displayReports();
});

// Show the reports when the page opens
displayReports();


const themeButton = document.getElementById("themeButton");

// Run this code when the button is clicked
themeButton.addEventListener("click", function() {

    // Switch dark mode on or off
    document.body.classList.toggle("dark-mode");

    // Check whether dark mode is active
    if (document.body.classList.contains("dark-mode")) {
        themeButton.textContent = "Light Mode";
    } else {
        themeButton.textContent = "Dark Mode";
    }

});

