
// ---------- SIMULATED DATABASE (in-memory storage) ----------
// This mimics fetching records from a real database.
// Predefined initial dataset (like a seed from DB)
// let databaseRecords = [
//     { id: 101, name: "Olivia Chen", email: "olivia.chen@example.com", department: "Engineering", status: "active" },
//     { id: 102, name: "Marcus Wright", email: "m.wright@example.com", department: "Sales", status: "inactive" },
//     { id: 103, name: "Sophia Ramirez", email: "s.ramirez@example.com", department: "Marketing", status: "active" },
// ];

let databaseRecords = [];

// ---------  variables for pagination  -------
let currentPage = 1;
const recordsPerPage = 3;


//  -------------------- function for fetching data from database -----------------
async function fetchMessages() {
    try {
        const response = await fetch("http://localhost:5000/messages");
        const result = await response.json();
        // console.log(result);

        if (result.success) {
            // Map backend data to your frontend format
            databaseRecords = result.data.map((item, index) => ({
                id: index + 1, // since MongoDB _id is long, we create simple ID
                name: item.name,
                email: item.email,
                subject: item.subject,
                message: item.message,
                status: item.status,
                mongoId: item._id // keep original ID for future delete/update
            }));

            renderTable(databaseRecords); // render after data is ready

            return databaseRecords.length; // ✅ return count
        } else {
            console.error(result.message);
        }

    } catch (error) {
        console.error("Error fetching messages:", error);
    }
}
//  -------------------- end of function for fetching data from database -----------------


// UI RENDER: Renders the current databaseRecords into the HTML table, before toggle status
// function renderTable(databaseRecords) {
//     const tbody = document.getElementById('tableBody');
//     const recordCountSpan = document.getElementById('recordCount');

//     if (!databaseRecords.length) {
//         tbody.innerHTML = `<tr class="empty-row"><td colspan="6">✨ No Messages are present currently. ✨</td></tr>`;
//         recordCountSpan.innerText = '0';
//         return;
//     }

//     recordCountSpan.innerText = databaseRecords.length;
//     let rowsHtml = '';

//     databaseRecords.forEach(record => {
//         // Map status to badge class and display text
//         let statusClass = '';
//         let statusDisplay = '';
//         switch (record.status) {
//             case 'read':
//                 statusClass = 'status-badge low';
//                 statusDisplay = '🟢 Read';
//                 break;
//             case 'unread':
//                 statusClass = 'status-badge';
//                 statusDisplay = '⚪ Unread';
//             //     break;
//             // default:
//             //     statusClass = 'status-badge';
//             //     statusDisplay = record.status || 'Active';
//         }

//         rowsHtml += `
//                 <tr data-record-id="${record.id}">
//                     <td>#${record.id}</td>
//                     <td><strong>${escapeHtml(record.name)}</strong></td>
//                     <td>${escapeHtml(record.email)}</td>
//                     <td>${escapeHtml(record.subject)}</td>
//                     <td>${escapeHtml(record.message)}</td>
//                     <td>
//                         <span class="${statusClass}">${statusDisplay}</span>
//                         <button class="toggle-btn" data-id="${record.mongoId}">🔄</button>
//                     </td>
//                     <td><button class="delete-btn" data-id="${record.mongoId}" title="Delete record">🗑️</button></td>
//                 </tr>
//             `;
//     });

//     tbody.innerHTML = rowsHtml;

//     // Attach delete event listeners to each delete button
//     document.querySelectorAll('.delete-btn').forEach(btn => {
//         btn.addEventListener('click', (e) => {
//             e.stopPropagation();
//             const recordId = btn.getAttribute('data-id');
//             deleteRecordById(recordId);
//         });
//     });

//     // Attach toggle event listeners to each status button
//     // document.querySelectorAll('.toggle-btn').forEach(btn => {
//     //     btn.addEventListener('click', (e) => {
//     //         e.stopPropagation();
//     //         const id = btn.getAttribute('data-id');
//     //         toggleStatus(id);
//     //     });
//     // });

//     document.querySelectorAll('.status-toggle').forEach(toggle => {
//         toggle.addEventListener('change', (e) => {
//             e.stopPropagation();
//             const id = toggle.getAttribute('data-id');
//             toggleStatus(id); // your existing function
//         });
//     });

// }

// UI RENDER: Renders the current databaseRecords into the HTML table, after toggle status
//  before pagination
// function renderTable(databaseRecords) {
//     const tbody = document.getElementById('tableBody');
//     const recordCountSpan = document.getElementById('recordCount');

//     if (!databaseRecords.length) {
//         tbody.innerHTML = `<tr class="empty-row"><td colspan="6">✨ No Messages are present currently. ✨</td></tr>`;
//         recordCountSpan.innerText = '0';
//         return;
//     }

//     let rowsHtml = '';

//     // databaseRecords.forEach(record => {
//     const filteredRecords = getFilteredRecords();

//     if (!filteredRecords.length) {
//         tbody.innerHTML = `<tr class="empty-row">
//         <td colspan="7">🔍 No matching records found.</td>
//     </tr>`;
//         recordCountSpan.innerText = '0';
//         return;
//     }

//     recordCountSpan.innerText = filteredRecords.length;

//     filteredRecords.forEach(record => {

//         const isRead = record.status === 'read';

//         rowsHtml += `
//         <tr data-record-id="${record.id}">
//             <td>#${record.id}</td>
//             <td><strong>${escapeHtml(record.name)}</strong></td>
//             <td>${escapeHtml(record.email)}</td>
//             <td>${escapeHtml(record.subject)}</td>
//             <td>${escapeHtml(record.message)}</td>
//             <td>
//                 <div class="status-container">
//                     <label class="switch">
//                         <input type="checkbox" class="status-toggle" 
//                             data-id="${record.mongoId}" 
//                             ${isRead ? 'checked' : ''}>
//                         <span class="slider"></span>
//                     </label>
//                     <span class="status-text">
//                         ${isRead ? 'Read' : 'Unread'}
//                     </span>
//                 </div>
//             </td>
//             <td>
//                 <button class="delete-btn" data-id="${record.mongoId}" title="Delete record">🗑️</button>
//             </td>
//         </tr>
//     `;
//     });

//     tbody.innerHTML = rowsHtml;

//     // Attach delete event listeners to each delete button
//     document.querySelectorAll('.delete-btn').forEach(btn => {
//         btn.addEventListener('click', (e) => {
//             e.stopPropagation();
//             const recordId = btn.getAttribute('data-id');
//             deleteRecordById(recordId);
//         });
//     });

//     // Attach toggle event listeners to each status button
//     document.querySelectorAll('.status-toggle').forEach(toggle => {
//         toggle.addEventListener('change', (e) => {
//             e.stopPropagation();
//             const id = toggle.getAttribute('data-id');
//             toggleStatus(id); // your existing function
//         });
//     });


// }

// UI RENDER: Renders the current databaseRecords into the HTML table, with toggle status
//  and pagination
function renderTable(databaseRecords) {
    const tbody = document.getElementById('tableBody');
    const recordCountSpan = document.getElementById('recordCount');

    if (!databaseRecords.length) {
        tbody.innerHTML = `<tr class="empty-row"><td colspan="6">✨ No Messages are present currently. ✨</td></tr>`;
        recordCountSpan.innerText = '0';
        return;
    }

    let rowsHtml = '';

    // databaseRecords.forEach(record => {
    const filteredRecords = getFilteredRecords();

    if (!filteredRecords.length) {
        tbody.innerHTML = `<tr class="empty-row">
        <td colspan="7">🔍 No matching records found.</td>
    </tr>`;
        recordCountSpan.innerText = '0';
        return;
    }

    //  for pagination
    const totalRecords = filteredRecords.length;
    const totalPages = Math.ceil(totalRecords / recordsPerPage);
    // console.log('totalRecords: ', totalRecords);
    // console.log('totalPages: ', totalPages);

    const startIndex = (currentPage - 1) * recordsPerPage;
    const paginatedRecords = filteredRecords.slice(
        startIndex,
        startIndex + recordsPerPage
    );
    //  end of pagination


    recordCountSpan.innerText = totalRecords;

    paginatedRecords.forEach(record => {

        const isRead = record.status === 'read';

        rowsHtml += `
        <tr data-record-id="${record.id}">
            <td>#${record.id}</td>
            <td><strong>${escapeHtml(record.name)}</strong></td>
            <td>${escapeHtml(record.email)}</td>
            <td>${escapeHtml(record.subject)}</td>
            <td>${escapeHtml(record.message)}</td>
            <td>
                <div class="status-container">
                    <label class="switch">
                        <input type="checkbox" class="status-toggle" 
                            data-id="${record.mongoId}" 
                            ${isRead ? 'checked' : ''}>
                        <span class="slider"></span>
                    </label>
                    <span class="status-text">
                        ${isRead ? 'Read' : 'Unread'}
                    </span>
                </div>
            </td>
            <td>
                <button class="delete-btn" data-id="${record.mongoId}" title="Delete record">🗑️</button>
            </td>
        </tr>
    `;
    });

    tbody.innerHTML = rowsHtml;

    // Attach delete event listeners to each delete button
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const recordId = btn.getAttribute('data-id');
            deleteRecordById(recordId);
        });
    });

    // Attach toggle event listeners to each status button
    document.querySelectorAll('.status-toggle').forEach(toggle => {
        toggle.addEventListener('change', (e) => {
            e.stopPropagation();
            const id = toggle.getAttribute('data-id');
            toggleStatus(id); // your existing function
        });
    });

    renderPagination(totalPages);
}

function renderPagination(totalPages) {
    const paginationDiv = document.getElementById("pagination");

    if (totalPages <= 1) {
        paginationDiv.innerHTML = "";
        return;
    }

    let html = "";

    // Previous button
    html += `<li><a class="${currentPage === 1 ? "disabled" : ""}" onclick="changePage(${currentPage - 1})">&laquo;</a></li>`;

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        html += `
            <li>
                 <a 
                    class="${i === currentPage ? "active" : ""}" 
                    onclick="changePage(${i})">
                    ${i}
                </a>
            </li>
        `;
    }

    // Next button
    html += `<li><a class="${currentPage === totalPages ? "disabled" : ""}" onclick="changePage(${currentPage + 1})">&raquo;</a></li>`;
    // console.log('html: ', html);
    paginationDiv.innerHTML = html;
}

function changePage(page) {
    currentPage = page;
    // console.log('in changePage() : ', currentPage);
    renderTable(databaseRecords);
}


// Helper to escape HTML to prevent injection
function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function (m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    }).replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, function (c) {
        return c;
    });
}

// Show global message (like toast/alert inside message area)
function showMessage(message, isError = false) {
    const msgContainer = document.getElementById('globalMessage');
    const msgContent = document.getElementById('messageContent');
    msgContent.innerText = message;
    // style based on type (error vs normal)
    if (isError) {
        msgContainer.style.background = "#fff1f0";
        msgContainer.style.borderLeftColor = "#e74c3c";
    } else {
        msgContainer.style.background = "#f1f9fe";
        msgContainer.style.borderLeftColor = "#3498db";
    }
    msgContainer.style.display = "flex";

    // Auto hide after 4 seconds, but user can dismiss manually
    if (window.messageTimeout)
        clearTimeout(window.messageTimeout);

    window.messageTimeout = setTimeout(() => {
        const container = document.getElementById('globalMessage');
        if (container) container.style.display = "none";
    }, 4500);
}

function hideMessage() {
    const msgContainer = document.getElementById('globalMessage');
    if (msgContainer) msgContainer.style.display = "none";
    if (window.messageTimeout) clearTimeout(window.messageTimeout);
}

// ------------------  Delete record by id  ----------------
function deleteRecordById(id) {
    const record = databaseRecords.find(r => r.mongoId === id);
    const deletedName = record ? record.name : "Unknown";

    if (!confirm(`Delete message from "${deletedName}"?`)) return;

    fetch(`http://localhost:5000/delete/${id}`, {
        method: "DELETE"
    })
        .then(res => {
            if (!res.ok) {
                throw new Error("Server response not OK");
            }
            return res.json();
        })
        .then(data => {
            if (data.success) {
                databaseRecords = databaseRecords.filter(r => r.mongoId !== id);
                renderTable(databaseRecords);

                showMessage(`✅ Successfully deleted "${deletedName}" (ID: ${id})`);
            } else {
                showMessage(`⚠️ Record with ID ${id} not found.`, true);
            }
        })
        .catch((err) => {
            console.error("DELETE ERROR:", err);
            showMessage("⚠️ Something went wrong!", true);
        });
}
// ------------------ end of deleting -----------------

function toggleStatus(id) {
    fetch(`http://localhost:5000/toggle/${id}`, {
        method: "PUT"
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                // ✅ Update local data
                const record = databaseRecords.find(r => r.mongoId === id);
                // console.log('DATA: ',record )
                if (record) {
                    record.status = data.newStatus;
                }

                renderTable(databaseRecords);

                showMessage(`Status updated to "${data.newStatus}"`);
            } else {
                showMessage("⚠️ Failed to update status", true);
            }
        })
        .catch((err) => {
            console.error("Toggle Status ERROR:", err);
            showMessage("⚠️ Something went wrong!", true);
        });
}


// Clear all records (with confirmation)
function clearAllRecords() {

    fetch("http://localhost:5000/delete-all", {
        method: "DELETE"
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                const deletedCount = data.deletedCount;

                // ✅ Clear frontend data
                databaseRecords = [];
                renderTable(databaseRecords);
                console.log('DATA: ', data);
                showMessage(`🧹 All ${deletedCount} messages cleared successfully.`);

            } else {
                showMessage("⚠️ Failed to clear records.", true);
            }
        })
        .catch((err) => {
            console.error("DELETE ALL ERROR:", err);
            showMessage("⚠️ Something went wrong!", true);
        });
}


// MAIN FETCH HANDLER (mimics calling backend and shows detailed message)
async function handleFetchFromDatabase() {
    // Show loading message style
    const msgContainer = document.getElementById('globalMessage');
    const msgContent = document.getElementById('messageContent');
    msgContent.innerText = "🔄 Fetching records from database server...";
    msgContainer.style.background = "#fef9e3";
    msgContainer.style.borderLeftColor = "#f39c12";
    msgContainer.style.display = "flex";

    try {
        // fetchMessages();  // ensures UI consistent
        const count = await fetchMessages(); // ⏳ wait for data
        showMessage(`✅ Database fetch completed. Loaded ${count} record(s) from the database. All messages are visible on this panel.`);
    } catch (err) {
        showMessage(`❌ Failed to fetch records: ${err.message}`, true);
    }
}

// -------------------  Filter record  -----------------

function getFilteredRecords() {
    const searchText = document.getElementById("searchInput").value.toLowerCase();
    const statusFilter = document.getElementById("statusFilter").value;

    return databaseRecords.filter(record => {
        // 🔍 Search logic
        const matchesSearch =
            record.name.toLowerCase().includes(searchText) ||
            record.email.toLowerCase().includes(searchText) ||
            record.subject.toLowerCase().includes(searchText) ||
            record.message.toLowerCase().includes(searchText);

        // 🎯 Status filter
        const matchesStatus =
            statusFilter === "all" || record.status === statusFilter;

        return matchesSearch && matchesStatus;
    });
}


// ------------------- End of Filter record  -----------------


// Also provide a dedicated "initial load" message on page load
async function initialLoadMessage() {
    const count = await fetchMessages(); // ⏳ wait for data
    showMessage(`📡 Welcome to explorer. Currently displaying ${count} records.`);
}


// Event listener for refresh/fetch button
document.getElementById('refreshBtn').addEventListener('click', () => {
    handleFetchFromDatabase();
});

// document.getElementById('addSampleBtn').addEventListener('click', () => {  // not needed
//     addSampleRecord();
// });

document.getElementById('clearAllBtn').addEventListener('click', () => {
    if (databaseRecords.length === 0) {
        showMessage("ℹ️ Database already empty. No records to clear.", false);
        return;
    }
    if (confirm("⚠️ Are you sure you want to delete ALL messages from the database? This action cannot be undone.")) {
        clearAllRecords();
    } else {
        showMessage("Clear action cancelled. No changes made.", false);
    }
});

// Dismiss message button
document.getElementById('dismissMsgBtn').addEventListener('click', () => {
    hideMessage();
});

// ------------- Add Event Listeners to search input and filter dropdown -----------------
document.getElementById("searchInput").addEventListener("input", () => {
    currentPage = 1;
    renderTable(databaseRecords);
});

document.getElementById("statusFilter").addEventListener("change", () => {
    currentPage = 1;
    renderTable(databaseRecords);

});
// ------------- End of adding Event Listeners to search input and filter dropdown -----------------


// Optionally attach a manual message close when clicking outside? Not needed.
// Initialize table on page load
initialLoadMessage();
