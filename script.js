/* =========================================================
   RentEase
   Smart Room & Hostel Management System
   Frontend Only - GitHub Pages Compatible
   LocalStorage Based
========================================================= */

"use strict";


/* =========================================================
   1. APPLICATION STATE
========================================================= */

const APP = {
    roomsKey: "rentease_rooms",
    tenantsKey: "rentease_tenants",
    paymentsKey: "rentease_payments",
    maintenanceKey: "rentease_maintenance",
    noticesKey: "rentease_notices",
    bookingsKey: "rentease_bookings",
    userKey: "rentease_user",
    themeKey: "rentease_theme"
};


let rooms = [];
let tenants = [];
let payments = [];
let maintenanceRequests = [];
let notices = [];
let bookings = [];

let currentEditingId = null;
let currentUser = null;

let revenueChart = null;


/* =========================================================
   2. DEMO ROOM DATA
========================================================= */

const demoRooms = [

    {
        id: 1,
        roomNumber: "A-101",
        hostel: "Sunrise Hostel",
        type: "Single",
        rent: 6500,
        capacity: 1,
        occupied: 1,
        amenities: ["WiFi", "AC", "Attached Bath"],
        status: "Occupied"
    },

    {
        id: 2,
        roomNumber: "A-102",
        hostel: "Sunrise Hostel",
        type: "Double",
        rent: 5000,
        capacity: 2,
        occupied: 1,
        amenities: ["WiFi", "Fan", "Study Table"],
        status: "Available"
    },

    {
        id: 3,
        roomNumber: "B-201",
        hostel: "Green Valley Hostel",
        type: "Triple",
        rent: 4200,
        capacity: 3,
        occupied: 2,
        amenities: ["WiFi", "Laundry", "Parking"],
        status: "Available"
    },

    {
        id: 4,
        roomNumber: "B-202",
        hostel: "Green Valley Hostel",
        type: "Double",
        rent: 4800,
        capacity: 2,
        occupied: 2,
        amenities: ["WiFi", "AC", "Laundry"],
        status: "Occupied"
    },

    {
        id: 5,
        roomNumber: "C-301",
        hostel: "City Comfort Hostel",
        type: "Single",
        rent: 7000,
        capacity: 1,
        occupied: 0,
        amenities: ["WiFi", "AC", "TV"],
        status: "Available"
    },

    {
        id: 6,
        roomNumber: "C-302",
        hostel: "City Comfort Hostel",
        type: "Double",
        rent: 5500,
        capacity: 2,
        occupied: 2,
        amenities: ["WiFi", "AC", "Attached Bath"],
        status: "Occupied"
    }

];


/* =========================================================
   3. DEMO TENANTS
========================================================= */

const demoTenants = [

    {
        id: 1,
        name: "Rahul Sharma",
        room: "A-101",
        phone: "9876543210",
        joinDate: "2026-08-10",
        rent: 6500,
        payment: "Paid"
    },

    {
        id: 2,
        name: "Priya Patel",
        room: "A-102",
        phone: "9876543211",
        joinDate: "2026-08-15",
        rent: 5000,
        payment: "Paid"
    },

    {
        id: 3,
        name: "Arjun Kumar",
        room: "B-201",
        phone: "9876543212",
        joinDate: "2026-08-20",
        rent: 4200,
        payment: "Pending"
    },

    {
        id: 4,
        name: "Sneha Reddy",
        room: "B-202",
        phone: "9876543213",
        joinDate: "2026-08-22",
        rent: 4800,
        payment: "Paid"
    },

    {
        id: 5,
        name: "Vikram Singh",
        room: "C-302",
        phone: "9876543214",
        joinDate: "2026-09-01",
        rent: 5500,
        payment: "Pending"
    }

];


/* =========================================================
   4. DEMO PAYMENTS
========================================================= */

const demoPayments = [

    {
        id: 1,
        tenant: "Rahul Sharma",
        amount: 6500,
        date: "2026-10-01",
        method: "UPI",
        status: "Paid"
    },

    {
        id: 2,
        tenant: "Priya Patel",
        amount: 5000,
        date: "2026-10-01",
        method: "UPI",
        status: "Paid"
    },

    {
        id: 3,
        tenant: "Arjun Kumar",
        amount: 4200,
        date: "2026-10-02",
        method: "Cash",
        status: "Pending"
    },

    {
        id: 4,
        tenant: "Sneha Reddy",
        amount: 4800,
        date: "2026-10-02",
        method: "Bank",
        status: "Paid"
    }

];


/* =========================================================
   5. DEMO MAINTENANCE
========================================================= */

const demoMaintenance = [

    {
        id: 1,
        title: "AC not working",
        room: "B-202",
        priority: "High",
        status: "Open",
        date: "2026-10-04"
    },

    {
        id: 2,
        title: "Bathroom tap leakage",
        room: "A-102",
        priority: "Medium",
        status: "In Progress",
        date: "2026-10-03"
    },

    {
        id: 3,
        title: "WiFi issue",
        room: "C-302",
        priority: "Low",
        status: "Resolved",
        date: "2026-10-01"
    }

];


/* =========================================================
   6. DEMO NOTICES
========================================================= */

const demoNotices = [

    {
        id: 1,
        title: "Monthly Rent Reminder",
        message: "Please complete your monthly rent payment before the 5th.",
        date: "2026-10-01",
        type: "Payment"
    },

    {
        id: 2,
        title: "Hostel Maintenance",
        message: "Common area maintenance will be carried out this Sunday.",
        date: "2026-10-03",
        type: "Maintenance"
    },

    {
        id: 3,
        title: "New Hostel Rules",
        message: "Please check the updated hostel guidelines.",
        date: "2026-10-05",
        type: "Important"
    }

];


/* =========================================================
   7. INITIALIZE APPLICATION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initializeStorage();

    initializeLogin();

    initializeTheme();

    initializeNavigation();

    initializeSearch();

    initializeForms();

    initializeDashboard();

    initializeCharts();

    initializeButtons();

    initializeMobileMenu();

    initializeBackToTop();

    initializeKeyboardShortcuts();

    renderRooms();

    renderTenants();

    renderPayments();

    renderMaintenance();

    renderNotices();

    updateDashboard();

    updateReports();

    updateActivity();

    updateFavoriteCount();

    updateCurrentYear();

});


/* =========================================================
   8. LOCAL STORAGE
========================================================= */

function loadStorage(key, fallback) {

    const data = localStorage.getItem(key);

    if (!data) {

        localStorage.setItem(
            key,
            JSON.stringify(fallback)
        );

        return [...fallback];

    }

    try {

        return JSON.parse(data);

    } catch (error) {

        return [...fallback];

    }

}


function saveStorage(key, data) {

    localStorage.setItem(
        key,
        JSON.stringify(data)
    );

}


function initializeStorage() {

    rooms = loadStorage(
        APP.roomsKey,
        demoRooms
    );

    tenants = loadStorage(
        APP.tenantsKey,
        demoTenants
    );

    payments = loadStorage(
        APP.paymentsKey,
        demoPayments
    );

    maintenanceRequests = loadStorage(
        APP.maintenanceKey,
        demoMaintenance
    );

    notices = loadStorage(
        APP.noticesKey,
        demoNotices
    );

    bookings = loadStorage(
        APP.bookingsKey,
        []
    );

}


/* =========================================================
   9. LOGIN SYSTEM
========================================================= */

function initializeLogin() {

    const loginForm =
        document.querySelector("#loginForm");

    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            handleLogin
        );

    }


    const passwordToggle =
        document.querySelector("#passwordToggle");

    if (passwordToggle) {

        passwordToggle.addEventListener(
            "click",
            togglePassword
        );

    }


    const logoutBtn =
        document.querySelector("#logoutBtn");

    if (logoutBtn) {

        logoutBtn.addEventListener(
            "click",
            logoutUser
        );

    }


    const savedUser =
        localStorage.getItem(
            APP.userKey
        );

    if (savedUser) {

        try {

            currentUser =
                JSON.parse(savedUser);

        } catch {

            currentUser = null;

        }

    }


    updateLoginUI();

}


function handleLogin(event) {

    event.preventDefault();

    const username =
        document.querySelector(
            "#loginUsername"
        )?.value.trim();

    const password =
        document.querySelector(
            "#loginPassword"
        )?.value.trim();


    if (!username || !password) {

        showToast(
            "Please enter username and password.",
            "error"
        );

        return;

    }


    if (
        username !== "admin" ||
        password !== "admin123"
    ) {

        showToast(
            "Invalid login details. Use admin / admin123.",
            "error"
        );

        return;

    }


    currentUser = {

        name: "Narotam",

        username: username,

        role: "Administrator"

    };


    localStorage.setItem(
        APP.userKey,
        JSON.stringify(currentUser)
    );


    updateLoginUI();

    showToast(
        "Welcome to RentEase! 🎉",
        "success"
    );

}


function updateLoginUI() {

    const loginScreen =
        document.querySelector(
            "#loginScreen"
        );

    const app =
        document.querySelector("#app");


    if (currentUser) {

        if (loginScreen) {

            loginScreen.style.display =
                "none";

        }

        if (app) {

            app.style.display =
                "flex";

        }

    } else {

        if (loginScreen) {

            loginScreen.style.display =
                "flex";

        }

        if (app) {

            app.style.display =
                "none";

        }

    }

}


function logoutUser() {

    localStorage.removeItem(
        APP.userKey
    );

    currentUser = null;

    showToast(
        "Logged out successfully.",
        "success"
    );

    setTimeout(() => {

        updateLoginUI();

    }, 500);

}


function togglePassword() {

    const password =
        document.querySelector(
            "#loginPassword"
        );

    const icon =
        document.querySelector(
            "#passwordToggle i"
        );


    if (!password) return;


    if (
        password.type === "password"
    ) {

        password.type = "text";

        if (icon) {

            icon.className =
                "fa-solid fa-eye-slash";

        }

    } else {

        password.type = "password";

        if (icon) {

            icon.className =
                "fa-solid fa-eye";

        }

    }

}


/* =========================================================
   10. NAVIGATION
========================================================= */

function initializeNavigation() {

    document.querySelectorAll(
        ".nav-item[data-section]"
    ).forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const section =
                    button.dataset.section;

                showSection(section);

            }
        );

    });

}


function showSection(sectionId) {

    document.querySelectorAll(
        ".section"
    ).forEach(section => {

        section.classList.remove(
            "active"
        );

    });


    const target =
        document.getElementById(
            sectionId
        );


    if (target) {

        target.classList.add(
            "active"
        );

    }


    document.querySelectorAll(
        ".nav-item[data-section]"
    ).forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.section ===
                sectionId
        );

    });


    if (sectionId === "reports") {

        updateReports();

    }


    if (sectionId === "dashboard") {

        updateDashboard();

        setTimeout(
            initializeCharts,
            100
        );

    }


    closeMobileMenu();

}


window.showSection = showSection;


/* =========================================================
   11. MOBILE MENU
========================================================= */

function initializeMobileMenu() {

    const button =
        document.querySelector(
            "#mobileMenu"
        );

    const sidebar =
        document.querySelector(
            "#sidebar"
        );


    if (!button || !sidebar) return;


    button.addEventListener(
        "click",
        () => {

            sidebar.classList.toggle(
                "mobile-active"
            );

        }
    );


    document.querySelectorAll(
        ".nav-item"
    ).forEach(item => {

        item.addEventListener(
            "click",
            closeMobileMenu
        );

    });

}


function closeMobileMenu() {

    const sidebar =
        document.querySelector(
            "#sidebar"
        );

    if (sidebar) {

        sidebar.classList.remove(
            "mobile-active"
        );

    }

}


/* =========================================================
   12. THEME
========================================================= */

function initializeTheme() {

    const savedTheme =
        localStorage.getItem(
            APP.themeKey
        );


    if (savedTheme === "dark") {

        document.body.classList.add(
            "dark-mode"
        );

    }


    const toggle =
        document.querySelector(
            "#themeToggle"
        );


    if (toggle) {

        toggle.addEventListener(
            "click",
            toggleTheme
        );

    }

}


function toggleTheme() {

    document.body.classList.toggle(
        "dark-mode"
    );


    const isDark =
        document.body.classList.contains(
            "dark-mode"
        );


    localStorage.setItem(
        APP.themeKey,
        isDark
            ? "dark"
            : "light"
    );


    showToast(
        isDark
            ? "Dark mode enabled 🌙"
            : "Light mode enabled ☀️",
        "success"
    );

}


/* =========================================================
   13. ROOM RENDERING
========================================================= */

function renderRooms(list = rooms) {

    const container =
        document.querySelector(
            "#roomGrid"
        );


    if (!container) return;


    if (!list.length) {

        container.innerHTML = `

            <div class="empty-state">

                <div class="empty-icon">
                    🏠
                </div>

                <h3>
                    No rooms found
                </h3>

                <p>
                    Try changing your filters.
                </p>

            </div>

        `;

        return;

    }


    container.innerHTML =
        list.map(room => {

            const available =
                room.occupied <
                room.capacity;

            const percentage =
                room.capacity
                    ? Math.round(
                        (
                            room.occupied /
                            room.capacity
                        ) * 100
                    )
                    : 0;


            return `

                <article
                    class="room-card reveal"
                    data-room-id="${room.id}"
                >

                    <div class="room-card-top">

                        <div>

                            <span class="room-label">
                                ROOM
                            </span>

                            <h3>
                                ${escapeHTML(
                                    room.roomNumber
                                )}
                            </h3>

                        </div>


                        <span
                            class="status-badge ${
                                available
                                    ? "available"
                                    : "occupied"
                            }"
                        >
                            ${
                                available
                                    ? "Available"
                                    : "Occupied"
                            }
                        </span>

                    </div>


                    <div class="room-hostel">

                        🏢

                        <span>
                            ${escapeHTML(
                                room.hostel
                            )}
                        </span>

                    </div>


                    <div class="room-info">

                        <div>

                            <span>
                                Type
                            </span>

                            <strong>
                                ${escapeHTML(
                                    room.type
                                )}
                            </strong>

                        </div>


                        <div>

                            <span>
                                Capacity
                            </span>

                            <strong>
                                ${room.capacity}
                                Bed${
                                    room.capacity > 1
                                        ? "s"
                                        : ""
                                }
                            </strong>

                        </div>


                        <div>

                            <span>
                                Rent
                            </span>

                            <strong>
                                ₹${Number(
                                    room.rent
                                ).toLocaleString("en-IN")}
                            </strong>

                        </div>

                    </div>


                    <div class="occupancy">

                        <div class="occupancy-header">

                            <span>
                                Occupancy
                            </span>

                            <strong>
                                ${room.occupied}/${room.capacity}
                            </strong>

                        </div>


                        <div class="progress-bar">

                            <div
                                class="progress-fill"
                                style="
                                    width:${percentage}%;
                                "
                            ></div>

                        </div>


                        <small>

                            ${
                                available
                                    ? `${
                                        room.capacity -
                                        room.occupied
                                    } bed${
                                        room.capacity -
                                        room.occupied > 1
                                            ? "s"
                                            : ""
                                    } available`
                                    : "Fully occupied"
                            }

                        </small>

                    </div>


                    <div class="amenities">

                        ${room.amenities
                            .map(
                                item =>
                                    `<span>
                                        ${escapeHTML(item)}
                                    </span>`
                            )
                            .join("")}

                    </div>


                    <div class="room-actions">

                        <button
                            class="btn btn-secondary"
                            onclick="editRoom(${room.id})"
                        >
                            ✏️ Edit
                        </button>


                        <button
                            class="btn btn-danger"
                            onclick="deleteRoom(${room.id})"
                        >
                            🗑️ Delete
                        </button>

                    </div>

                </article>

            `;

        }).join("");


    updateResultCount(
        list.length
    );

}


/* =========================================================
   14. ROOM SEARCH / FILTER
========================================================= */

function initializeSearch() {

    const search =
        document.querySelector(
            "#roomSearch"
        );

    const roomFilter =
        document.querySelector(
            "#roomFilter"
        );

    const typeFilter =
        document.querySelector(
            "#roomTypeFilter"
        );

    const priceFilter =
        document.querySelector(
            "#priceFilter"
        );

    const availabilityFilter =
        document.querySelector(
            "#availabilityFilter"
        );

    const sortFilter =
        document.querySelector(
            "#sortFilter"
        );


    [
        search,
        roomFilter,
        typeFilter,
        priceFilter,
        availabilityFilter,
        sortFilter
    ].forEach(element => {

        if (!element) return;

        element.addEventListener(
            element.tagName === "INPUT"
                ? "input"
                : "change",
            filterRooms
        );

    });

}


function filterRooms() {

    const search =
        document.querySelector(
            "#roomSearch"
        )?.value
            .toLowerCase()
            .trim() || "";


    const status =
        document.querySelector(
            "#roomFilter"
        )?.value || "all";


    const type =
        document.querySelector(
            "#roomTypeFilter"
        )?.value || "all";


    const price =
        document.querySelector(
            "#priceFilter"
        )?.value || "all";


    const availability =
        document.querySelector(
            "#availabilityFilter"
        )?.value || "all";


    const sort =
        document.querySelector(
            "#sortFilter"
        )?.value || "default";


    let filtered =
        rooms.filter(room => {

            const text =
                `${room.roomNumber}
                 ${room.hostel}
                 ${room.type}`
                    .toLowerCase();


            const matchesSearch =
                !search ||
                text.includes(search);


            const isAvailable =
                room.occupied <
                room.capacity;


            const matchesStatus =
                status === "all" ||
                (
                    status === "available" &&
                    isAvailable
                ) ||
                (
                    status === "occupied" &&
                    !isAvailable
                );


            const matchesType =
                type === "all" ||
                room.type === type;


            let matchesPrice = true;


            if (price === "under5000") {

                matchesPrice =
                    room.rent < 5000;

            }


            if (price === "5000-8000") {

                matchesPrice =
                    room.rent >= 5000 &&
                    room.rent <= 8000;

            }


            if (price === "above8000") {

                matchesPrice =
                    room.rent > 8000;

            }


            const matchesAvailability =
                availability === "all" ||
                (
                    availability === "available" &&
                    isAvailable
                ) ||
                (
                    availability === "occupied" &&
                    !isAvailable
                );


            return (
                matchesSearch &&
                matchesStatus &&
                matchesType &&
                matchesPrice &&
                matchesAvailability
            );

        });


    if (sort === "low") {

        filtered.sort(
            (a, b) =>
                a.rent - b.rent
        );

    }


    if (sort === "high") {

        filtered.sort(
            (a, b) =>
                b.rent - a.rent
        );

    }


    if (sort === "name") {

        filtered.sort(
            (a, b) =>
                a.roomNumber.localeCompare(
                    b.roomNumber
                )
        );

    }


    if (sort === "rating") {

        filtered.sort(
            (a, b) =>
                b.rent - a.rent
        );

    }


    renderRooms(filtered);

}


function updateResultCount(count) {

    const element =
        document.querySelector(
            "#roomCount"
        );


    if (element) {

        element.textContent =
            `${count} room${
                count !== 1
                    ? "s"
                    : ""
            } found`;

    }

}


function resetFilters() {

    [
        "#roomSearch",
        "#roomFilter",
        "#roomTypeFilter",
        "#priceFilter",
        "#availabilityFilter",
        "#sortFilter"
    ].forEach(selector => {

        const element =
            document.querySelector(
                selector
            );

        if (!element) return;


        if (
            element.tagName ===
            "SELECT"
        ) {

            element.value =
                "all";

        } else {

            element.value = "";

        }

    });


    const sort =
        document.querySelector(
            "#sortFilter"
        );

    if (sort) {

        sort.value =
            "default";

    }


    renderRooms();

}


window.resetFilters =
    resetFilters;


/* =========================================================
   15. ROOM MODAL
========================================================= */

function openRoomModal() {

    currentEditingId = null;

    const title =
        document.querySelector(
            "#roomModalTitle"
        );

    if (title) {

        title.textContent =
            "Add New Room";

    }


    openGenericModal(
        getRoomFormHTML()
    );

}


window.openRoomModal =
    openRoomModal;


function getRoomFormHTML() {

    return `

        <div class="modal-header">

            <div class="modal-icon">
                <i class="fa-solid fa-bed"></i>
            </div>

            <div>

                <h2 id="roomModalTitle">
                    ${
                        currentEditingId
                            ? "Edit Room"
                            : "Add New Room"
                    }
                </h2>

                <p>
                    Enter room information below.
                </p>

            </div>

        </div>


        <form
            id="roomForm"
            class="modal-form"
        >

            <div class="form-grid">

                <div class="input-group">

                    <label>
                        Room Number
                    </label>

                    <input
                        type="text"
                        id="roomNumber"
                        placeholder="Example: A-101"
                        required
                    >

                </div>


                <div class="input-group">

                    <label>
                        Hostel Name
                    </label>

                    <input
                        type="text"
                        id="hostelName"
                        placeholder="Example: Sunrise Hostel"
                        required
                    >

                </div>


                <div class="input-group">

                    <label>
                        Room Type
                    </label>

                    <select
                        id="roomType"
                        required
                    >

                        <option value="">
                            Select Type
                        </option>

                        <option value="Single">
                            Single
                        </option>

                        <option value="Double">
                            Double
                        </option>

                        <option value="Triple">
                            Triple
                        </option>

                        <option value="Shared">
                            Shared
                        </option>

                    </select>

                </div>


                <div class="input-group">

                    <label>
                        Monthly Rent
                    </label>

                    <input
                        type="number"
                        id="roomRent"
                        placeholder="6500"
                        min="0"
                        required
                    >

                </div>


                <div class="input-group">

                    <label>
                        Bed Capacity
                    </label>

                    <input
                        type="number"
                        id="roomCapacity"
                        placeholder="2"
                        min="1"
                        required
                    >

                </div>


                <div class="input-group">

                    <label>
                        Occupied Beds
                    </label>

                    <input
                        type="number"
                        id="occupiedBeds"
                        placeholder="0"
                        min="0"
                        value="0"
                    >

                </div>

            </div>


            <div class="input-group">

                <label>
                    Amenities
                </label>

                <input
                    type="text"
                    id="roomAmenities"
                    placeholder="WiFi, AC, Laundry"
                >

                <small>
                    Separate amenities using commas.
                </small>

            </div>


            <button
                type="submit"
                class="primary-btn full-width"
            >

                <i class="fa-solid fa-check"></i>

                Save Room

            </button>

        </form>

    `;

}


function openGenericModal(content) {

    const overlay =
        document.querySelector(
            "#modalOverlay"
        );

    const modalContent =
        document.querySelector(
            "#modalContent"
        );


    if (!overlay || !modalContent)
        return;


    modalContent.innerHTML =
        content;


    overlay.classList.add(
        "active"
    );


    document.body.classList.add(
        "modal-open"
    );


    const form =
        document.querySelector(
            "#roomForm"
        );


    if (form) {

        form.addEventListener(
            "submit",
            saveRoom
        );

    }

}


function closeModal() {

    const overlay =
        document.querySelector(
            "#modalOverlay"
        );


    if (overlay) {

        overlay.classList.remove(
            "active"
        );

    }


    document.body.classList.remove(
        "modal-open"
    );


    currentEditingId = null;

}


window.closeModal =
    closeModal;


/* =========================================================
   16. SAVE ROOM
========================================================= */

function saveRoom(event) {

    event.preventDefault();


    const roomNumber =
        document.querySelector(
            "#roomNumber"
        )?.value.trim();


    const hostel =
        document.querySelector(
            "#hostelName"
        )?.value.trim();


    const type =
        document.querySelector(
            "#roomType"
        )?.value;


    const rent =
        Number(
            document.querySelector(
                "#roomRent"
            )?.value
        );


    const capacity =
        Number(
            document.querySelector(
                "#roomCapacity"
            )?.value
        );


    const occupied =
        Number(
            document.querySelector(
                "#occupiedBeds"
            )?.value
        ) || 0;


    const amenitiesText =
        document.querySelector(
            "#roomAmenities"
        )?.value || "";


    if (
        !roomNumber ||
        !hostel ||
        !type ||
        !rent ||
        !capacity
    ) {

        showToast(
            "Please fill all required fields.",
            "error"
        );

        return;

    }


    if (occupied > capacity) {

        showToast(
            "Occupied beds cannot exceed capacity.",
            "error"
        );

        return;

    }


    const amenities =
        amenitiesText
            .split(",")
            .map(item =>
                item.trim()
            )
            .filter(Boolean);


    if (currentEditingId) {

        const room =
            rooms.find(
                item =>
                    item.id ===
                    currentEditingId
            );


        if (room) {

            room.roomNumber =
                roomNumber;

            room.hostel =
                hostel;

            room.type =
                type;

            room.rent =
                rent;

            room.capacity =
                capacity;

            room.occupied =
                occupied;

            room.amenities =
                amenities;

        }


        showToast(
            "Room updated successfully! ✨",
            "success"
        );

    } else {

        rooms.push({

            id: Date.now(),

            roomNumber,

            hostel,

            type,

            rent,

            capacity,

            occupied,

            amenities,

            status:
                occupied >= capacity
                    ? "Occupied"
                    : "Available"

        });


        showToast(
            "New room added successfully! 🏠",
            "success"
        );

    }


    saveStorage(
        APP.roomsKey,
        rooms
    );


    closeModal();

    renderRooms();

    updateDashboard();

    updateReports();

}


function editRoom(id) {

    const room =
        rooms.find(
            item =>
                item.id === id
        );


    if (!room) return;


    currentEditingId =
        id;


    openGenericModal(
        getRoomFormHTML()
    );


    setTimeout(() => {

        setValue(
            "#roomNumber",
            room.roomNumber
        );

        setValue(
            "#hostelName",
            room.hostel
        );

        setValue(
            "#roomType",
            room.type
        );

        setValue(
            "#roomRent",
            room.rent
        );

        setValue(
            "#roomCapacity",
            room.capacity
        );

        setValue(
            "#occupiedBeds",
            room.occupied
        );

        setValue(
            "#roomAmenities",
            room.amenities.join(", ")
        );

    }, 20);

}


window.editRoom =
    editRoom;


/* =========================================================
   17. DELETE ROOM
========================================================= */

function deleteRoom(id) {

    const room =
        rooms.find(
            item =>
                item.id === id
        );


    if (!room) return;


    const confirmed =
        confirm(
            `Delete room ${room.roomNumber}?`
        );


    if (!confirmed)
        return;


    rooms =
        rooms.filter(
            item =>
                item.id !== id
        );


    saveStorage(
        APP.roomsKey,
        rooms
    );


    renderRooms();

    updateDashboard();

    updateReports();


    showToast(
        "Room deleted successfully.",
        "success"
    );

}


window.deleteRoom =
    deleteRoom;


/* =========================================================
   18. DASHBOARD
========================================================= */

function updateDashboard() {

    const totalRooms =
        rooms.length;


    const totalBeds =
        rooms.reduce(
            (sum, room) =>
                sum +
                Number(room.capacity),
            0
        );


    const occupiedBeds =
        rooms.reduce(
            (sum, room) =>
                sum +
                Number(room.occupied),
            0
        );


    const availableBeds =
        totalBeds -
        occupiedBeds;


    const occupancy =
        totalBeds
            ? Math.round(
                (
                    occupiedBeds /
                    totalBeds
                ) * 100
            )
            : 0;


    const monthlyRevenue =
        rooms.reduce(
            (sum, room) =>
                sum +
                (
                    Number(room.rent) *
                    Number(room.occupied)
                ),
            0
        );


    const pendingPayments =
        payments.filter(
            payment =>
                payment.status ===
                "Pending"
        ).length;


    animateValue(
        "#totalRooms",
        totalRooms
    );


    animateValue(
        "#totalTenants",
        tenants.length
    );


    animateCurrency(
        "#monthlyRevenue",
        monthlyRevenue
    );


    animateValue(
        "#pendingPayments",
        pendingPayments
    );


    animateText(
        "#occupancyPercent",
        `${occupancy}%`
    );


    animateText(
        "#occupancyRate",
        `${occupancy}%`
    );


    animateValue(
        "#occupiedRooms",
        occupiedBeds
    );


    animateValue(
        "#availableRooms",
        availableBeds
    );


    animateValue(
        "#totalBookings",
        bookings.length
    );


    animateText(
        "#reportOccupancy",
        `${occupancy}%`
    );


    const progress =
        document.querySelector(
            "#occupancyProgress"
        );


    if (progress) {

        progress.style.width =
            `${occupancy}%`;

    }

}


/* =========================================================
   19. ANIMATED VALUES
========================================================= */

function animateValue(
    selector,
    target
) {

    const element =
        document.querySelector(
            selector
        );


    if (!element) return;


    const start =
        Number(
            element.dataset.value ||
            0
        );


    const duration =
        600;


    const startTime =
        performance.now();


    function update(time) {

        const progress =
            Math.min(
                (
                    time -
                    startTime
                ) / duration,
                1
            );


        const eased =
            1 -
            Math.pow(
                1 - progress,
                3
            );


        const value =
            Math.round(
                start +
                (
                    target -
                    start
                ) * eased
            );


        element.textContent =
            value.toLocaleString(
                "en-IN"
            );


        if (progress < 1) {

            requestAnimationFrame(
                update
            );

        } else {

            element.dataset.value =
                target;

        }

    }


    requestAnimationFrame(
        update
    );

}


function animateCurrency(
    selector,
    target
) {

    const element =
        document.querySelector(
            selector
        );


    if (!element) return;


    element.textContent =
        `₹${Number(
            target
        ).toLocaleString("en-IN")}`;

}


function animateText(
    selector,
    value
) {

    const element =
        document.querySelector(
            selector
        );


    if (element) {

        element.textContent =
            value;

    }

}


/* =========================================================
   20. CHART
========================================================= */

function initializeCharts() {

    const canvas =
        document.querySelector(
            "#revenueChart"
        );


    if (!canvas)
        return;


    if (typeof Chart ===
        "undefined")
        return;


    if (revenueChart) {

        revenueChart.destroy();

    }


    const months = [

        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct"

    ];


    const revenue = [

        52000,
        61000,
        68000,
        74000,
        82000,
        calculateMonthlyRevenue()

    ];


    revenueChart =
        new Chart(
            canvas,
            {

                type: "line",

                data: {

                    labels: months,

                    datasets: [

                        {

                            label:
                                "Revenue",

                            data:
                                revenue,

                            tension:
                                0.4,

                            fill:
                                true

                        }

                    ]

                },

                options: {

                    responsive: true,

                    maintainAspectRatio:
                        false,

                    plugins: {

                        legend: {

                            display:
                                false

                        }

                    },

                    scales: {

                        y: {

                            beginAtZero:
                                true,

                            ticks: {

                                callback:
                                    value =>
                                        "₹" +
                                        Number(
                                            value
                                        ).toLocaleString(
                                            "en-IN"
                                        )

                            }

                        }

                    }

                }

            }

        );

}


function calculateMonthlyRevenue() {

    return rooms.reduce(
        (sum, room) =>
            sum +
            (
                Number(room.rent) *
                Number(room.occupied)
            ),
        0
    );

}


/* =========================================================
   21. TENANTS
========================================================= */

function renderTenants() {

    const table =
        document.querySelector(
            "#tenantTable"
        );


    if (!table) return;


    if (!tenants.length) {

        table.innerHTML = `

            <tr>

                <td colspan="7">
                    No tenants found.
                </td>

            </tr>

        `;

        return;

    }


    table.innerHTML =
        tenants.map(
            tenant => `

                <tr>

                    <td>

                        <strong>
                            ${escapeHTML(
                                tenant.name
                            )}
                        </strong>

                    </td>


                    <td>
                        ${escapeHTML(
                            tenant.room
                        )}
                    </td>


                    <td>
                        ${escapeHTML(
                            tenant.phone
                        )}
                    </td>


                    <td>
                        ${formatDate(
                            tenant.joinDate
                        )}
                    </td>


                    <td>
                        ₹${Number(
                            tenant.rent
                        ).toLocaleString(
                            "en-IN"
                        )}
                    </td>


                    <td>

                        <span
                            class="status-badge ${
                                tenant.payment ===
                                "Paid"
                                    ? "available"
                                    : "occupied"
                            }"
                        >

                            ${tenant.payment}

                        </span>

                    </td>


                    <td>

                        <button
                            class="icon-btn"
                            onclick="deleteTenant(${tenant.id})"
                        >

                            <i class="fa-solid fa-trash"></i>

                        </button>

                    </td>

                </tr>

            `
        ).join("");

}


function openTenantModal() {

    openGenericModal(`

        <div class="modal-header">

            <div class="modal-icon">

                <i class="fa-solid fa-user-plus"></i>

            </div>

            <div>

                <h2>
                    Add Tenant
                </h2>

                <p>
                    Register a new hostel resident.
                </p>

            </div>

        </div>


        <form id="tenantForm">

            <div class="form-grid">

                <div class="input-group">

                    <label>
                        Full Name
                    </label>

                    <input
                        id="tenantName"
                        required
                        placeholder="Enter full name"
                    >

                </div>


                <div class="input-group">

                    <label>
                        Phone
                    </label>

                    <input
                        id="tenantPhone"
                        required
                        placeholder="9876543210"
                    >

                </div>


                <div class="input-group">

                    <label>
                        Room
                    </label>

                    <select
                        id="tenantRoom"
                        required
                    >

                        <option value="">
                            Select Room
                        </option>

                        ${rooms
                            .map(
                                room =>
                                    `<option value="${room.roomNumber}">
                                        ${room.roomNumber}
                                    </option>`
                            )
                            .join("")}

                    </select>

                </div>


                <div class="input-group">

                    <label>
                        Monthly Rent
                    </label>

                    <input
                        type="number"
                        id="tenantRent"
                        required
                    >

                </div>

            </div>


            <button
                class="primary-btn full-width"
                type="submit"
            >

                Add Tenant

            </button>

        </form>

    `);


    const form =
        document.querySelector(
            "#tenantForm"
        );


    if (form) {

        form.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const tenant = {

                    id: Date.now(),

                    name:
                        getValue(
                            "#tenantName"
                        ),

                    phone:
                        getValue(
                            "#tenantPhone"
                        ),

                    room:
                        getValue(
                            "#tenantRoom"
                        ),

                    rent:
                        Number(
                            getValue(
                                "#tenantRent"
                            )
                        ),

                    joinDate:
                        new Date()
                            .toISOString()
                            .split("T")[0],

                    payment:
                        "Pending"

                };


                tenants.push(
                    tenant
                );


                saveStorage(
                    APP.tenantsKey,
                    tenants
                );


                closeModal();

                renderTenants();

                updateDashboard();

                updateActivity();


                showToast(
                    "Tenant added successfully! 👤",
                    "success"
                );

            }
        );

    }

}


window.openTenantModal =
    openTenantModal;


function deleteTenant(id) {

    if (
        !confirm(
            "Delete this tenant?"
        )
    )
        return;


    tenants =
        tenants.filter(
            tenant =>
                tenant.id !== id
        );


    saveStorage(
        APP.tenantsKey,
        tenants
    );


    renderTenants();

    updateDashboard();


    showToast(
        "Tenant removed.",
        "success"
    );

}


window.deleteTenant =
    deleteTenant;


/* =========================================================
   22. PAYMENTS
========================================================= */

function renderPayments() {

    const table =
        document.querySelector(
            "#paymentTable"
        );


    if (!table) return;


    table.innerHTML =
        payments.map(
            payment => `

                <tr>

                    <td>

                        <strong>
                            ${escapeHTML(
                                payment.tenant
                            )}
                        </strong>

                    </td>


                    <td>
                        ₹${Number(
                            payment.amount
                        ).toLocaleString(
                            "en-IN"
                        )}
                    </td>


                    <td>
                        ${formatDate(
                            payment.date
                        )}
                    </td>


                    <td>
                        ${escapeHTML(
                            payment.method
                        )}
                    </td>


                    <td>

                        <span
                            class="status-badge ${
                                payment.status ===
                                "Paid"
                                    ? "available"
                                    : "occupied"
                            }"
                        >

                            ${payment.status}

                        </span>

                    </td>


                    <td>

                        ${
                            payment.status ===
                            "Pending"

                                ? `

                                    <button
                                        class="btn btn-secondary"
                                        onclick="markPaymentPaid(${payment.id})"
                                    >
                                        Mark Paid
                                    </button>

                                  `

                                : "✓"

                        }

                    </td>

                </tr>

            `
        ).join("");


    updatePaymentStatistics();

}


function updatePaymentStatistics() {

    const collected =
        payments
            .filter(
                p =>
                    p.status ===
                    "Paid"
            )
            .reduce(
                (sum, p) =>
                    sum +
                    Number(p.amount),
                0
            );


    const pending =
        payments
            .filter(
                p =>
                    p.status ===
                    "Pending"
            )
            .reduce(
                (sum, p) =>
                    sum +
                    Number(p.amount),
                0
            );


    animateCurrency(
        "#totalCollected",
        collected
    );


    animateCurrency(
        "#pendingAmount",
        pending
    );

}


function markPaymentPaid(id) {

    const payment =
        payments.find(
            p =>
                p.id === id
        );


    if (!payment)
        return;


    payment.status =
        "Paid";


    saveStorage(
        APP.paymentsKey,
        payments
    );


    renderPayments();

    updateDashboard();

    updateActivity();


    showToast(
        "Payment marked as paid. 💰",
        "success"
    );

}


window.markPaymentPaid =
    markPaymentPaid;


/* =========================================================
   23. MAINTENANCE
========================================================= */

function renderMaintenance() {

    const container =
        document.querySelector(
            "#maintenanceGrid"
        );


    if (!container)
        return;


    container.innerHTML =
        maintenanceRequests.map(
            request => `

                <div class="maintenance-card">

                    <div>

                        <span class="status-badge">

                            ${escapeHTML(
                                request.status
                            )}

                        </span>

                        <h3>
                            ${escapeHTML(
                                request.title
                            )}
                        </h3>

                        <p>
                            Room:
                            ${escapeHTML(
                                request.room
                            )}
                        </p>

                        <small>
                            ${formatDate(
                                request.date
                            )}
                        </small>

                    </div>


                    <strong>

                        ${escapeHTML(
                            request.priority
                        )}

                    </strong>

                </div>

            `
        ).join("");


    const badge =
        document.querySelector(
            "#maintenanceBadge"
        );


    if (badge) {

        badge.textContent =
            maintenanceRequests.filter(
                item =>
                    item.status !==
                    "Resolved"
            ).length;

    }

}


function openComplaintModal() {

    openGenericModal(`

        <div class="modal-header">

            <div class="modal-icon">

                🔧

            </div>

            <div>

                <h2>
                    New Maintenance Request
                </h2>

                <p>
                    Report a room or facility issue.
                </p>

            </div>

        </div>


        <form id="complaintForm">

            <div class="input-group">

                <label>
                    Issue
                </label>

                <input
                    id="complaintTitle"
                    required
                    placeholder="Example: AC not working"
                >

            </div>


            <div class="form-grid">

                <div class="input-group">

                    <label>
                        Room
                    </label>

                    <input
                        id="complaintRoom"
                        required
                        placeholder="A-101"
                    >

                </div>


                <div class="input-group">

                    <label>
                        Priority
                    </label>

                    <select
                        id="complaintPriority"
                    >

                        <option>
                            Low
                        </option>

                        <option>
                            Medium
                        </option>

                        <option>
                            High
                        </option>

                    </select>

                </div>

            </div>


            <button
                class="primary-btn full-width"
                type="submit"
            >

                Create Request

            </button>

        </form>

    `);


    document
        .querySelector(
            "#complaintForm"
        )
        ?.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                maintenanceRequests.unshift({

                    id: Date.now(),

                    title:
                        getValue(
                            "#complaintTitle"
                        ),

                    room:
                        getValue(
                            "#complaintRoom"
                        ),

                    priority:
                        getValue(
                            "#complaintPriority"
                        ),

                    status:
                        "Open",

                    date:
                        new Date()
                            .toISOString()
                            .split("T")[0]

                });


                saveStorage(
                    APP.maintenanceKey,
                    maintenanceRequests
                );


                closeModal();

                renderMaintenance();

                updateReports();

                updateActivity();


                showToast(
                    "Maintenance request created. 🔧",
                    "success"
                );

            }
        );

}


window.openComplaintModal =
    openComplaintModal;


/* =========================================================
   24. NOTICES
========================================================= */

function renderNotices() {

    const container =
        document.querySelector(
            "#noticeGrid"
        );


    if (!container)
        return;


    container.innerHTML =
        notices.map(
            notice => `

                <div class="notice-card">

                    <span class="notice-type">

                        ${escapeHTML(
                            notice.type
                        )}

                    </span>


                    <h3>

                        ${escapeHTML(
                            notice.title
                        )}

                    </h3>


                    <p>

                        ${escapeHTML(
                            notice.message
                        )}

                    </p>


                    <small>

                        ${formatDate(
                            notice.date
                        )}

                    </small>

                </div>

            `
        ).join("");

}


function openNoticeModal() {

    openGenericModal(`

        <div class="modal-header">

            <div class="modal-icon">
                📢
            </div>

            <div>

                <h2>
                    Create Notice
                </h2>

                <p>
                    Publish an announcement for tenants.
                </p>

            </div>

        </div>


        <form id="noticeForm">

            <div class="input-group">

                <label>
                    Notice Title
                </label>

                <input
                    id="noticeTitle"
                    required
                    placeholder="Enter notice title"
                >

            </div>


            <div class="input-group">

                <label>
                    Category
                </label>

                <select
                    id="noticeType"
                >

                    <option>
                        Important
                    </option>

                    <option>
                        Payment
                    </option>

                    <option>
                        Maintenance
                    </option>

                    <option>
                        General
                    </option>

                </select>

            </div>


            <div class="input-group">

                <label>
                    Message
                </label>

                <textarea
                    id="noticeMessage"
                    rows="5"
                    required
                    placeholder="Write your announcement..."
                ></textarea>

            </div>


            <button
                class="primary-btn full-width"
                type="submit"
            >

                Publish Notice

            </button>

        </form>

    `);


    document
        .querySelector(
            "#noticeForm"
        )
        ?.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                notices.unshift({

                    id: Date.now(),

                    title:
                        getValue(
                            "#noticeTitle"
                        ),

                    type:
                        getValue(
                            "#noticeType"
                        ),

                    message:
                        getValue(
                            "#noticeMessage"
                        ),

                    date:
                        new Date()
                            .toISOString()
                            .split("T")[0]

                });


                saveStorage(
                    APP.noticesKey,
                    notices
                );


                closeModal();

                renderNotices();

                updateActivity();


                showToast(
                    "Notice published successfully! 📢",
                    "success"
                );

            }
        );

}


window.openNoticeModal =
    openNoticeModal;


/* =========================================================
   25. REPORTS
========================================================= */

function updateReports() {

    const totalBeds =
        rooms.reduce(
            (sum, room) =>
                sum +
                Number(room.capacity),
            0
        );


    const occupied =
        rooms.reduce(
            (sum, room) =>
                sum +
                Number(room.occupied),
            0
        );


    const occupancy =
        totalBeds
            ? Math.round(
                (
                    occupied /
                    totalBeds
                ) * 100
            )
            : 0;


    const paid =
        payments.filter(
            p =>
                p.status ===
                "Paid"
        ).length;


    const collectionRate =
        payments.length
            ? Math.round(
                (
                    paid /
                    payments.length
                ) * 100
            )
            : 0;


    const openComplaints =
        maintenanceRequests.filter(
            item =>
                item.status !==
                "Resolved"
        ).length;


    animateText(
        "#reportOccupancy",
        `${occupancy}%`
    );


    animateText(
        "#collectionRate",
        `${collectionRate}%`
    );


    animateValue(
        "#openComplaints",
        openComplaints
    );


    const occupancyProgress =
        document.querySelector(
            "#occupancyProgress"
        );


    if (occupancyProgress) {

        occupancyProgress.style.width =
            `${occupancy}%`;

    }


    const collectionProgress =
        document.querySelector(
            "#collectionProgress"
        );


    if (collectionProgress) {

        collectionProgress.style.width =
            `${collectionRate}%`;

    }


    const performance =
        document.querySelector(
            "#performanceList"
        );


    if (performance) {

        performance.innerHTML = `

            <div class="performance-item">

                <span>
                    Room Occupancy
                </span>

                <strong>
                    ${occupancy}%
                </strong>

            </div>


            <div class="performance-item">

                <span>
                    Payment Collection
                </span>

                <strong>
                    ${collectionRate}%
                </strong>

            </div>


            <div class="performance-item">

                <span>
                    Active Tenants
                </span>

                <strong>
                    ${tenants.length}
                </strong>

            </div>


            <div class="performance-item">

                <span>
                    Open Maintenance
                </span>

                <strong>
                    ${openComplaints}
                </strong>

            </div>

        `;

    }

}


/* =========================================================
   26. RECENT ACTIVITY
========================================================= */

function updateActivity() {

    const container =
        document.querySelector(
            "#activityList"
        );


    if (!container)
        return;


    const activities = [];


    tenants
        .slice(-3)
        .reverse()
        .forEach(
            tenant => {

                activities.push({

                    icon: "👤",

                    text:
                        `${tenant.name} registered as a tenant.`

                });

            }
        );


    payments
        .slice(-2)
        .reverse()
        .forEach(
            payment => {

                activities.push({

                    icon: "💰",

                    text:
                        `${payment.tenant} payment is ${payment.status}.`

                });

            }
        );


    maintenanceRequests
        .slice(-2)
        .reverse()
        .forEach(
            request => {

                activities.push({

                    icon: "🔧",

                    text:
                        `${request.title} - ${request.status}.`

                });

            }
        );


    if (!activities.length) {

        container.innerHTML = `

            <div class="empty-state">

                <p>
                    No recent activity.
                </p>

            </div>

        `;

        return;

    }


    container.innerHTML =
        activities
            .slice(0, 8)
            .map(
                item => `

                    <div class="activity-item">

                        <div class="activity-icon">
                            ${item.icon}
                        </div>

                        <div>

                            <p>
                                ${escapeHTML(
                                    item.text
                                )}
                            </p>

                            <small>
                                Just now
                            </small>

                        </div>

                    </div>

                `
            )
            .join("");

}


/* =========================================================
   27. SEARCH
========================================================= */

function initializeGlobalSearch() {

    const input =
        document.querySelector(
            "#globalSearch"
        );


    if (!input) return;


    input.addEventListener(
        "input",
        () => {

            const value =
                input.value
                    .toLowerCase()
                    .trim();


            if (!value) return;


            const room =
                rooms.find(
                    item =>
                        item.roomNumber
                            .toLowerCase()
                            .includes(value) ||
                        item.hostel
                            .toLowerCase()
                            .includes(value)
                );


            const tenant =
                tenants.find(
                    item =>
                        item.name
                            .toLowerCase()
                            .includes(value)
                );


            if (room) {

                showSection(
                    "rooms"
                );

                const roomSearch =
                    document.querySelector(
                        "#roomSearch"
                    );

                if (roomSearch) {

                    roomSearch.value =
                        value;

                    filterRooms();

                }

            } else if (tenant) {

                showSection(
                    "tenants"
                );

            }

        }
    );

}


function initializeSearch() {

    initializeGlobalSearch();

}


/* =========================================================
   28. BUTTONS
========================================================= */

function initializeButtons() {

    const exportBtn =
        document.querySelector(
            "#exportBtn"
        );


    if (exportBtn) {

        exportBtn.addEventListener(
            "click",
            exportData
        );

    }


    const reportExport =
        document.querySelector(
            "#reportExportBtn"
        );


    if (reportExport) {

        reportExport.addEventListener(
            "click",
            exportData
        );

    }


    const modalOverlay =
        document.querySelector(
            "#modalOverlay"
        );


    if (modalOverlay) {

        modalOverlay.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    modalOverlay
                ) {

                    closeModal();

                }

            }
        );

    }


    const scrollTop =
        document.querySelector(
            "#scrollTop"
        );


    if (scrollTop) {

        scrollTop.addEventListener(
            "click",
            () => {

                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }
        );

    }

}


/* =========================================================
   29. EXPORT ALL DATA
========================================================= */

function exportData() {

    const data = {

        rooms,

        tenants,

        payments,

        maintenance:
            maintenanceRequests,

        notices,

        bookings,

        exportedAt:
            new Date()
                .toISOString()

    };


    const blob =
        new Blob(

            [
                JSON.stringify(
                    data,
                    null,
                    2
                )
            ],

            {
                type:
                    "application/json"
            }

        );


    const url =
        URL.createObjectURL(
            blob
        );


    const link =
        document.createElement(
            "a"
        );


    link.href =
        url;


    link.download =
        "rentease-backup.json";


    document.body.appendChild(
        link
    );


    link.click();


    link.remove();


    URL.revokeObjectURL(
        url
    );


    showToast(
        "RentEase data exported successfully! 📦",
        "success"
    );

}


/* =========================================================
   30. BACK TO TOP
========================================================= */

function initializeBackToTop() {

    const button =
        document.querySelector(
            "#scrollTop"
        );


    if (!button)
        return;


    window.addEventListener(
        "scroll",
        () => {

            button.classList.toggle(
                "show",
                window.scrollY >
                    400
            );

        }
    );

}


/* =========================================================
   31. KEYBOARD SHORTCUTS
========================================================= */

function initializeKeyboardShortcuts() {

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key ===
                "Escape"
            ) {

                closeModal();

                closeBookingModal();

            }


            if (
                event.ctrlKey &&
                event.key.toLowerCase() ===
                    "k"
            ) {

                event.preventDefault();


                const search =
                    document.querySelector(
                        "#globalSearch"
                    );


                if (search) {

                    search.focus();

                }

            }

        }
    );

}


/* =========================================================
   32. BOOKING MODAL
========================================================= */

function openBookingModal(roomId) {

    const room =
        rooms.find(
            item =>
                item.id === roomId
        );


    if (!room)
        return;


    if (
        room.occupied >=
        room.capacity
    ) {

        showToast(
            "This room is fully occupied.",
            "error"
        );

        return;

    }


    const modal =
        document.querySelector(
            "#bookingModal"
        );


    if (!modal)
        return;


    const roomName =
        document.querySelector(
            "#modalRoomName"
        );


    const roomPrice =
        document.querySelector(
            "#modalRoomPrice"
        );


    const bookingRoom =
        document.querySelector(
            "#bookingRoom"
        );


    if (roomName) {

        roomName.textContent =
            `${room.roomNumber} - ${room.hostel}`;

    }


    if (roomPrice) {

        roomPrice.textContent =
            `₹${Number(
                room.rent
            ).toLocaleString(
                "en-IN"
            )} / month`;

    }


    if (bookingRoom) {

        bookingRoom.value =
            room.roomNumber;

        bookingRoom.dataset.roomId =
            room.id;

    }


    modal.classList.add(
        "active"
    );

}


window.openBookingModal =
    openBookingModal;


function closeBookingModal() {

    const modal =
        document.querySelector(
            "#bookingModal"
        );


    if (modal) {

        modal.classList.remove(
            "active"
        );

    }

}


window.closeBookingModal =
    closeBookingModal;


/* =========================================================
   33. BOOKING FORM
========================================================= */

function initializeForms() {

    const bookingForm =
        document.querySelector(
            "#bookingForm"
        );


    if (bookingForm) {

        bookingForm.addEventListener(
            "submit",
            handleBooking
        );

    }


    document.addEventListener(
        "click",
        event => {

            if (
                event.target.closest(
                    "#bookingModal"
                ) &&
                event.target ===
                    document.querySelector(
                        "#bookingModal"
                    )
            ) {

                closeBookingModal();

            }

        }
    );

}


function handleBooking(event) {

    event.preventDefault();


    const bookingRoom =
        document.querySelector(
            "#bookingRoom"
        );


    const roomId =
        Number(
            bookingRoom?.dataset.roomId
        );


    const room =
        rooms.find(
            item =>
                item.id === roomId
        );


    if (!room) {

        showToast(
            "Room not found.",
            "error"
        );

        return;

    }


    const booking = {

        id:
            "RE" +
            Date.now()
                .toString()
                .slice(-8),

        roomId:
            room.id,

        room:
            room.roomNumber,

        roomName:
            room.roomNumber,

        hostel:
            room.hostel,

        name:
            getValue(
                "#customerName"
            ),

        email:
            getValue(
                "#customerEmail"
            ),

        phone:
            getValue(
                "#customerPhone"
            ),

        moveInDate:
            getValue(
                "#moveInDate"
            ),

        price:
            room.rent,

        status:
            "Confirmed",

        createdAt:
            new Date()
                .toISOString()

    };


    bookings.push(
        booking
    );


    room.occupied =
        Math.min(
            room.capacity,
            room.occupied + 1
        );


    room.status =
        room.occupied >=
        room.capacity
            ? "Occupied"
            : "Available";


    saveStorage(
        APP.bookingsKey,
        bookings
    );


    saveStorage(
        APP.roomsKey,
        rooms
    );


    event.target.reset();

    closeBookingModal();

    renderRooms();

    updateDashboard();

    updateActivity();


    showBookingSuccess(
        booking
    );


    showToast(
        `Booking confirmed! ID: ${booking.id}`,
        "success"
    );

}


function showBookingSuccess(
    booking
) {

    const modal =
        document.querySelector(
            "#successModal"
        );


    if (!modal)
        return;


    const id =
        document.querySelector(
            "#successBookingId"
        );


    const room =
        document.querySelector(
            "#successRoomName"
        );


    if (id) {

        id.textContent =
            booking.id;

    }


    if (room) {

        room.textContent =
            booking.roomName;

    }


    modal.classList.add(
        "active"
    );


    setTimeout(
        () => {

            modal.classList.remove(
                "active"
            );

        },
        5000
    );

}


/* =========================================================
   34. FAVORITES
========================================================= */

function updateFavoriteCount() {

    const count =
        Number(
            localStorage.getItem(
                "rentease_favorites_count"
            )
        ) || 0;


    document.querySelectorAll(
        "#favoritesCount, .favorites-count"
    ).forEach(
        element => {

            element.textContent =
                count;

        }
    );

}


/* =========================================================
   35. UTILITY
========================================================= */

function getValue(selector) {

    const element =
        document.querySelector(
            selector
        );


    return element
        ? element.value.trim()
        : "";

}


function setValue(
    selector,
    value
) {

    const element =
        document.querySelector(
            selector
        );


    if (element) {

        element.value =
            value;

    }

}


function escapeHTML(value) {

    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}


function formatDate(date) {

    if (!date)
        return "--";


    const parsed =
        new Date(date);


    if (
        Number.isNaN(
            parsed.getTime()
        )
    ) {

        return date;

    }


    return parsed.toLocaleDateString(
        "en-IN",
        {

            day: "2-digit",

            month: "short",

            year: "numeric"

        }
    );

}


/* =========================================================
   36. TOAST
========================================================= */

function showToast(
    message,
    type = "success"
) {

    let container =
        document.querySelector(
            "#toastContainer"
        );


    if (!container) {

        container =
            document.createElement(
                "div"
            );

        container.id =
            "toastContainer";

        container.className =
            "toast-container";

        document.body.appendChild(
            container
        );

    }


    const toast =
        document.createElement(
            "div"
        );


    toast.className =
        `toast toast-${type}`;


    const icon =
        type === "success"
            ? "✓"
            : type === "error"
                ? "!"
                : "i";


    toast.innerHTML = `

        <span class="toast-icon">
            ${icon}
        </span>

        <span class="toast-message">
            ${escapeHTML(message)}
        </span>

        <button
            class="toast-close"
            aria-label="Close"
        >
            ×
        </button>

    `;


    container.appendChild(
        toast
    );


    setTimeout(
        () => {

            toast.classList.add(
                "show"
            );

        },
        10
    );


    toast
        .querySelector(
            ".toast-close"
        )
        .addEventListener(
            "click",
            () =>
                removeToast(
                    toast
                )
        );


    setTimeout(
        () =>
            removeToast(
                toast
            ),
        3500
    );

}


function removeToast(toast) {

    if (!toast)
        return;


    toast.classList.remove(
        "show"
    );


    setTimeout(
        () => {

            toast.remove();

        },
        300
    );

}


/* =========================================================
   37. ANIMATIONS
========================================================= */

function initializeDashboard() {

    document
        .querySelectorAll(
            ".stat-card, .panel, .quick-card"
        )
        .forEach(
            (element, index) => {

                element.style.animationDelay =
                    `${index * 0.05}s`;

            }
        );

}


/* =========================================================
   38. CURRENT YEAR
========================================================= */

function updateCurrentYear() {

    document
        .querySelectorAll(
            "#currentYear"
        )
        .forEach(
            element => {

                element.textContent =
                    new Date()
                        .getFullYear();

            }
        );

}


/* =========================================================
   39. GENERIC MODAL ESCAPE
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key ===
            "Escape"
        ) {

            closeModal();

            closeBookingModal();

            const success =
                document.querySelector(
                    "#successModal"
                );


            if (success) {

                success.classList.remove(
                    "active"
                );

            }

        }

    }
);


/* =========================================================
   40. GLOBAL FUNCTIONS
========================================================= */

window.toggleTheme =
    toggleTheme;

window.logoutUser =
    logoutUser;

window.openRoomModal =
    openRoomModal;

window.editRoom =
    editRoom;

window.deleteRoom =
    deleteRoom;

window.openTenantModal =
    openTenantModal;

window.deleteTenant =
    deleteTenant;

window.openComplaintModal =
    openComplaintModal;

window.openNoticeModal =
    openNoticeModal;

window.openBookingModal =
    openBookingModal;

window.closeBookingModal =
    closeBookingModal;

window.closeModal =
    closeModal;

window.resetFilters =
    resetFilters;

window.markPaymentPaid =
    markPaymentPaid;

window.showSection =
    showSection;


/* =========================================================
   41. START MESSAGE
========================================================= */

console.log(
    "%c🏠 RentEase",
    "font-size:24px;font-weight:800;"
);

console.log(
    "%cSmart Room & Hostel Management System",
    "font-size:14px;"
);

console.log(
    `Rooms: ${rooms.length}`
);

console.log(
    `Tenants: ${tenants.length}`
);

console.log(
    "RentEase initialized successfully 🚀"
);
