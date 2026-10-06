/* =========================================================
   RentEase - Room & Hostel Management
   Frontend-only JavaScript
   GitHub Pages Compatible
   ========================================================= */

"use strict";

/* =========================================================
   1. APPLICATION STATE
   ========================================================= */

const APP = {
    storageKey: "rentease_rooms",
    userKey: "rentease_user",
    themeKey: "rentease_theme"
};

let rooms = [];
let currentEditingId = null;


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
   3. INITIALIZE APPLICATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initializeRooms();

    initializeTheme();

    initializeNavigation();

    initializeSearch();

    initializeForms();

    initializeAnimations();

    initializeCounters();

    updateDashboard();

    renderRooms();

    setupBackToTop();

    setupMobileMenu();

    setupGlobalClicks();

    checkLoginState();

});


/* =========================================================
   4. ROOM STORAGE
   ========================================================= */

function initializeRooms() {

    const savedRooms = localStorage.getItem(APP.storageKey);

    if (savedRooms) {

        try {
            rooms = JSON.parse(savedRooms);
        } catch (error) {
            console.error("Unable to load saved rooms.");
            rooms = [...demoRooms];
            saveRooms();
        }

    } else {

        rooms = [...demoRooms];

        saveRooms();

    }

}


function saveRooms() {

    localStorage.setItem(
        APP.storageKey,
        JSON.stringify(rooms)
    );

}


/* =========================================================
   5. LOGIN SYSTEM
   ========================================================= */

function checkLoginState() {

    const user = localStorage.getItem(APP.userKey);

    const loginSection = document.querySelector("#login");
    const dashboardSection = document.querySelector("#dashboard");

    if (!user) {

        if (dashboardSection) {
            dashboardSection.classList.add("hidden");
        }

    } else {

        if (loginSection) {
            loginSection.classList.add("hidden");
        }

        if (dashboardSection) {
            dashboardSection.classList.remove("hidden");
        }

        updateUserName();

    }

}


function loginUser(event) {

    if (event) {
        event.preventDefault();
    }

    const emailInput = document.querySelector("#loginEmail");
    const passwordInput = document.querySelector("#loginPassword");

    const email = emailInput?.value.trim();
    const password = passwordInput?.value.trim();

    if (!email || !password) {

        showToast(
            "Please enter email and password.",
            "error"
        );

        return;

    }

    const user = {
        name: email.split("@")[0],
        email: email
    };

    localStorage.setItem(
        APP.userKey,
        JSON.stringify(user)
    );

    showToast(
        "Welcome to RentEase! 🎉",
        "success"
    );

    setTimeout(() => {

        checkLoginState();

        scrollToSection("dashboard");

    }, 500);

}


function logoutUser() {

    localStorage.removeItem(APP.userKey);

    showToast(
        "You have been logged out.",
        "success"
    );

    setTimeout(() => {
        location.reload();
    }, 500);

}


function updateUserName() {

    const userData = localStorage.getItem(APP.userKey);

    if (!userData) return;

    try {

        const user = JSON.parse(userData);

        document.querySelectorAll(
            "[data-user-name]"
        ).forEach(element => {
            element.textContent = user.name;
        });

    } catch (error) {
        console.error(error);
    }

}


/* =========================================================
   6. NAVIGATION
   ========================================================= */

function initializeNavigation() {

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (
                targetId &&
                targetId !== "#"
            ) {

                event.preventDefault();

                scrollToSection(targetId.substring(1));

            }

        });

    });

}


function scrollToSection(id) {

    const element = document.getElementById(id);

    if (!element) return;

    element.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/* =========================================================
   7. MOBILE MENU
   ========================================================= */

function setupMobileMenu() {

    const menuButton = document.querySelector(
        "#menuToggle"
    );

    const navigation = document.querySelector(
        "#mainNav"
    );

    if (!menuButton || !navigation) return;

    menuButton.addEventListener("click", () => {

        navigation.classList.toggle("active");

        menuButton.classList.toggle("active");

    });

}


/* =========================================================
   8. ROOM RENDERING
   ========================================================= */

function renderRooms(list = rooms) {

    const roomContainer =
        document.querySelector("#roomsContainer") ||
        document.querySelector("#roomContainer") ||
        document.querySelector(".rooms-grid");

    if (!roomContainer) return;

    roomContainer.innerHTML = "";

    if (list.length === 0) {

        roomContainer.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">🏠</div>
                <h3>No rooms found</h3>
                <p>Try changing your search or add a new room.</p>
            </div>
        `;

        return;

    }

    list.forEach((room, index) => {

        const availableBeds =
            room.capacity - room.occupied;

        const card = document.createElement("div");

        card.className = "room-card reveal";

        card.style.animationDelay =
            `${index * 0.08}s`;

        card.innerHTML = `

            <div class="room-card-top">

                <div>

                    <span class="room-label">
                        ROOM
                    </span>

                    <h3>
                        ${escapeHTML(room.roomNumber)}
                    </h3>

                </div>

                <span class="status-badge ${getStatusClass(room)}">
                    ${getRoomStatus(room)}
                </span>

            </div>


            <div class="room-hostel">

                <span>🏢</span>

                <span>
                    ${escapeHTML(room.hostel)}
                </span>

            </div>


            <div class="room-info">

                <div>
                    <span class="info-label">
                        Type
                    </span>

                    <strong>
                        ${escapeHTML(room.type)}
                    </strong>
                </div>

                <div>
                    <span class="info-label">
                        Capacity
                    </span>

                    <strong>
                        ${room.capacity} Bed${room.capacity > 1 ? "s" : ""}
                    </strong>
                </div>

                <div>
                    <span class="info-label">
                        Rent
                    </span>

                    <strong>
                        ₹${Number(room.rent).toLocaleString("en-IN")}
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
                        style="width:${getOccupancyPercentage(room)}%"
                    ></div>

                </div>

                <small>
                    ${availableBeds > 0
                        ? `${availableBeds} bed${availableBeds > 1 ? "s" : ""} available`
                        : "Fully occupied"}
                </small>

            </div>


            <div class="amenities">

                ${room.amenities
                    .map(
                        amenity =>
                            `<span>${escapeHTML(amenity)}</span>`
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

        `;

        roomContainer.appendChild(card);

    });

    observeRevealElements();

}


/* =========================================================
   9. ROOM STATUS
   ========================================================= */

function getRoomStatus(room) {

    if (room.occupied >= room.capacity) {
        return "Occupied";
    }

    return "Available";

}


function getStatusClass(room) {

    return room.occupied >= room.capacity
        ? "occupied"
        : "available";

}


function getOccupancyPercentage(room) {

    if (!room.capacity) return 0;

    return Math.min(
        100,
        Math.round(
            (room.occupied / room.capacity) * 100
        )
    );

}


/* =========================================================
   10. ADD ROOM
   ========================================================= */

function addRoom(event) {

    if (event) {
        event.preventDefault();
    }

    const roomNumber =
        getInputValue("roomNumber");

    const hostel =
        getInputValue("hostelName");

    const type =
        getInputValue("roomType");

    const rent =
        Number(getInputValue("roomRent"));

    const capacity =
        Number(getInputValue("roomCapacity"));

    const occupied =
        Number(getInputValue("occupiedBeds")) || 0;

    const amenitiesInput =
        getInputValue("roomAmenities");

    if (
        !roomNumber ||
        !hostel ||
        !type ||
        !rent ||
        !capacity
    ) {

        showToast(
            "Please fill all required room details.",
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

    const amenities = amenitiesInput
        ? amenitiesInput
            .split(",")
            .map(item => item.trim())
            .filter(Boolean)
        : ["WiFi"];

    const newRoom = {

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

    };

    rooms.unshift(newRoom);

    saveRooms();

    renderRooms();

    updateDashboard();

    closeModal();

    resetRoomForm();

    showToast(
        "Room added successfully! 🏠",
        "success"
    );

}


/* =========================================================
   11. EDIT ROOM
   ========================================================= */

function editRoom(id) {

    const room =
        rooms.find(item => item.id === id);

    if (!room) return;

    currentEditingId = id;

    setInputValue(
        "roomNumber",
        room.roomNumber
    );

    setInputValue(
        "hostelName",
        room.hostel
    );

    setInputValue(
        "roomType",
        room.type
    );

    setInputValue(
        "roomRent",
        room.rent
    );

    setInputValue(
        "roomCapacity",
        room.capacity
    );

    setInputValue(
        "occupiedBeds",
        room.occupied
    );

    setInputValue(
        "roomAmenities",
        room.amenities.join(", ")
    );

    const formTitle =
        document.querySelector("#roomModalTitle");

    if (formTitle) {
        formTitle.textContent =
            "Edit Room";
    }

    openModal();

}


/* =========================================================
   12. UPDATE ROOM
   ========================================================= */

function updateRoom(event) {

    if (event) {
        event.preventDefault();
    }

    if (!currentEditingId) {

        addRoom(event);

        return;

    }

    const room =
        rooms.find(
            item =>
                item.id === currentEditingId
        );

    if (!room) return;

    const capacity =
        Number(getInputValue("roomCapacity"));

    const occupied =
        Number(getInputValue("occupiedBeds"));

    if (occupied > capacity) {

        showToast(
            "Occupied beds cannot exceed capacity.",
            "error"
        );

        return;

    }

    room.roomNumber =
        getInputValue("roomNumber");

    room.hostel =
        getInputValue("hostelName");

    room.type =
        getInputValue("roomType");

    room.rent =
        Number(getInputValue("roomRent"));

    room.capacity =
        capacity;

    room.occupied =
        occupied;

    room.amenities =
        getInputValue("roomAmenities")
            .split(",")
            .map(item => item.trim())
            .filter(Boolean);

    room.status =
        occupied >= capacity
            ? "Occupied"
            : "Available";

    saveRooms();

    renderRooms();

    updateDashboard();

    closeModal();

    resetRoomForm();

    currentEditingId = null;

    showToast(
        "Room updated successfully! ✨",
        "success"
    );

}


/* =========================================================
   13. DELETE ROOM
   ========================================================= */

function deleteRoom(id) {

    const room =
        rooms.find(item => item.id === id);

    if (!room) return;

    const confirmed =
        confirm(
            `Delete room ${room.roomNumber}?`
        );

    if (!confirmed) return;

    rooms =
        rooms.filter(
            item => item.id !== id
        );

    saveRooms();

    renderRooms();

    updateDashboard();

    showToast(
        "Room deleted successfully.",
        "success"
    );

}


/* =========================================================
   14. SEARCH AND FILTER
   ========================================================= */

function initializeSearch() {

    const searchInput =
        document.querySelector("#roomSearch");

    const statusFilter =
        document.querySelector("#statusFilter");

    const typeFilter =
        document.querySelector("#typeFilter");

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterRooms
        );

    }

    if (statusFilter) {

        statusFilter.addEventListener(
            "change",
            filterRooms
        );

    }

    if (typeFilter) {

        typeFilter.addEventListener(
            "change",
            filterRooms
        );

    }

}


function filterRooms() {

    const search =
        (
            document.querySelector(
                "#roomSearch"
            )?.value || ""
        )
        .toLowerCase()
        .trim();

    const status =
        document.querySelector(
            "#statusFilter"
        )?.value || "all";

    const type =
        document.querySelector(
            "#typeFilter"
        )?.value || "all";

    const filtered =
        rooms.filter(room => {

            const matchesSearch =
                room.roomNumber
                    .toLowerCase()
                    .includes(search) ||

                room.hostel
                    .toLowerCase()
                    .includes(search) ||

                room.type
                    .toLowerCase()
                    .includes(search);

            const matchesStatus =
                status === "all" ||
                getRoomStatus(room)
                    .toLowerCase() ===
                    status.toLowerCase();

            const matchesType =
                type === "all" ||
                room.type.toLowerCase() ===
                    type.toLowerCase();

            return (
                matchesSearch &&
                matchesStatus &&
                matchesType
            );

        });

    renderRooms(filtered);

}


/* =========================================================
   15. DASHBOARD STATISTICS
   ========================================================= */

function updateDashboard() {

    const totalRooms =
        rooms.length;

    const totalBeds =
        rooms.reduce(
            (sum, room) =>
                sum + Number(room.capacity),
            0
        );

    const occupiedBeds =
        rooms.reduce(
            (sum, room) =>
                sum + Number(room.occupied),
            0
        );

    const availableBeds =
        totalBeds - occupiedBeds;

    const occupancy =
        totalBeds > 0
            ? Math.round(
                (occupiedBeds / totalBeds) * 100
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

    updateNumber(
        "#totalRooms",
        totalRooms
    );

    updateNumber(
        "#totalBeds",
        totalBeds
    );

    updateNumber(
        "#occupiedBeds",
        occupiedBeds
    );

    updateNumber(
        "#availableBeds",
        availableBeds
    );

    updateNumber(
        "#occupancyRate",
        occupancy,
        "%"
    );

    updateNumber(
        "#monthlyRevenue",
        monthlyRevenue,
        "₹"
    );

}


/* =========================================================
   16. ANIMATED COUNTERS
   ========================================================= */

function initializeCounters() {

    document
        .querySelectorAll("[data-counter]")
        .forEach(counter => {

            const target =
                Number(
                    counter.dataset.counter
                );

            animateCounter(
                counter,
                target
            );

        });

}


function updateNumber(
    selector,
    value,
    prefix = "",
    suffix = ""
) {

    const element =
        document.querySelector(selector);

    if (!element) return;

    animateCounter(
        element,
        value,
        prefix,
        suffix
    );

}


function animateCounter(
    element,
    target,
    prefix = "",
    suffix = ""
) {

    if (!element) return;

    const duration = 700;

    const startTime =
        performance.now();

    const startValue = 0;

    function update(currentTime) {

        const progress =
            Math.min(
                (currentTime - startTime) /
                duration,
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
                startValue +
                (
                    target -
                    startValue
                ) * eased
            );

        element.textContent =
            `${prefix}${value.toLocaleString("en-IN")}${suffix}`;

        if (progress < 1) {

            requestAnimationFrame(update);

        }

    }

    requestAnimationFrame(update);

}


/* =========================================================
   17. MODAL SYSTEM
   ========================================================= */

function openModal() {

    const modal =
        document.querySelector("#roomModal");

    if (!modal) return;

    modal.classList.add("active");

    document.body.classList.add(
        "modal-open"
    );

}


function closeModal() {

    const modal =
        document.querySelector("#roomModal");

    if (!modal) return;

    modal.classList.remove("active");

    document.body.classList.remove(
        "modal-open"
    );

    currentEditingId = null;

}


function resetRoomForm() {

    const form =
        document.querySelector("#roomForm");

    if (form) {
        form.reset();
    }

    const formTitle =
        document.querySelector("#roomModalTitle");

    if (formTitle) {
        formTitle.textContent =
            "Add New Room";
    }

}


/* =========================================================
   18. FORM INITIALIZATION
   ========================================================= */

function initializeForms() {

    const loginForm =
        document.querySelector("#loginForm");

    const roomForm =
        document.querySelector("#roomForm");

    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            loginUser
        );

    }

    if (roomForm) {

        roomForm.addEventListener(
            "submit",
            event => {

                if (currentEditingId) {

                    updateRoom(event);

                } else {

                    addRoom(event);

                }

            }
        );

    }

}


/* =========================================================
   19. DARK / LIGHT MODE
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
   20. TOAST NOTIFICATIONS
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
            document.createElement("div");

        container.id =
            "toastContainer";

        container.className =
            "toast-container";

        document.body.appendChild(
            container
        );

    }

    const toast =
        document.createElement("div");

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

    container.appendChild(toast);

    requestAnimationFrame(() => {

        toast.classList.add("show");

    });

    toast
        .querySelector(".toast-close")
        .addEventListener(
            "click",
            () => removeToast(toast)
        );

    setTimeout(() => {

        removeToast(toast);

    }, 3500);

}


function removeToast(toast) {

    if (!toast) return;

    toast.classList.remove("show");

    setTimeout(() => {

        toast.remove();

    }, 300);

}


/* =========================================================
   21. SCROLL ANIMATIONS
   ========================================================= */

function initializeAnimations() {

    observeRevealElements();

}


function observeRevealElements() {

    const elements =
        document.querySelectorAll(
            ".reveal"
        );

    if (!elements.length) return;

    if (
        !("IntersectionObserver" in window)
    ) {

        elements.forEach(
            element =>
                element.classList.add(
                    "visible"
                )
        );

        return;

    }

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

    elements.forEach(
        element =>
            observer.observe(element)
    );

}


/* =========================================================
   22. BACK TO TOP
   ========================================================= */

function setupBackToTop() {

    const button =
        document.querySelector(
            "#backToTop"
        );

    if (!button) return;

    window.addEventListener(
        "scroll",
        () => {

            if (
                window.scrollY > 400
            ) {

                button.classList.add(
                    "show"
                );

            } else {

                button.classList.remove(
                    "show"
                );

            }

        }
    );

    button.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =========================================================
   23. GLOBAL CLICK HANDLERS
   ========================================================= */

function setupGlobalClicks() {

    document.addEventListener(
        "click",
        event => {

            /* Close modal when clicking outside */

            const modal =
                document.querySelector(
                    "#roomModal"
                );

            if (
                modal &&
                event.target === modal
            ) {

                closeModal();

            }

            /* Close mobile navigation */

            if (
                event.target.closest(
                    "#mainNav a"
                )
            ) {

                const nav =
                    document.querySelector(
                        "#mainNav"
                    );

                if (nav) {
                    nav.classList.remove(
                        "active"
                    );
                }

            }

        }
    );


    /* ESC closes modal */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                closeModal();

            }

        }
    );

}


/* =========================================================
   24. UTILITY FUNCTIONS
   ========================================================= */

function getInputValue(id) {

    const element =
        document.getElementById(id);

    return element
        ? element.value.trim()
        : "";

}


function setInputValue(
    id,
    value
) {

    const element =
        document.getElementById(id);

    if (element) {
        element.value = value;
    }

}


function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================================
   25. RENT CALCULATOR
   ========================================================= */

function calculateRent() {

    const rent =
        Number(
            getInputValue("calculatorRent")
        );

    const people =
        Number(
            getInputValue("calculatorPeople")
        ) || 1;

    if (!rent) {

        showToast(
            "Enter the monthly rent first.",
            "error"
        );

        return;

    }

    const perPerson =
        rent / people;

    const result =
        document.querySelector(
            "#rentResult"
        );

    if (result) {

        result.innerHTML = `

            <strong>
                ₹${perPerson.toLocaleString("en-IN")}
            </strong>

            <span>
                estimated rent per person / month
            </span>

        `;

        result.classList.add(
            "result-visible"
        );

    }

}


/* =========================================================
   26. HOSTEL STATISTICS
   ========================================================= */

function getHostelStatistics() {

    const statistics = {};

    rooms.forEach(room => {

        if (!statistics[room.hostel]) {

            statistics[room.hostel] = {
                rooms: 0,
                beds: 0,
                occupied: 0,
                revenue: 0
            };

        }

        statistics[room.hostel].rooms++;

        statistics[room.hostel].beds +=
            Number(room.capacity);

        statistics[room.hostel].occupied +=
            Number(room.occupied);

        statistics[room.hostel].revenue +=
            Number(room.rent) *
            Number(room.occupied);

    });

    return statistics;

}


/* =========================================================
   27. EXPORT DATA
   ========================================================= */

function exportRooms() {

    if (!rooms.length) {

        showToast(
            "No room data available.",
            "error"
        );

        return;

    }

    const data =
        JSON.stringify(
            rooms,
            null,
            2
        );

    const blob =
        new Blob(
            [data],
            {
                type:
                    "application/json"
            }
        );

    const url =
        URL.createObjectURL(blob);

    const link =
        document.createElement("a");

    link.href = url;

    link.download =
        "rentease-room-data.json";

    document.body.appendChild(link);

    link.click();

    link.remove();

    URL.revokeObjectURL(url);

    showToast(
        "Room data exported successfully! 📦",
        "success"
    );

}


/* =========================================================
   28. IMPORT DATA
   ========================================================= */

function importRooms(event) {

    const file =
        event.target.files?.[0];

    if (!file) return;

    const reader =
        new FileReader();

    reader.onload = function () {

        try {

            const imported =
                JSON.parse(
                    reader.result
                );

            if (!Array.isArray(imported)) {

                throw new Error(
                    "Invalid format"
                );

            }

            rooms = imported;

            saveRooms();

            renderRooms();

            updateDashboard();

            showToast(
                "Room data imported successfully! 🎉",
                "success"
            );

        } catch (error) {

            showToast(
                "Invalid room data file.",
                "error"
            );

        }

    };

    reader.readAsText(file);

}


/* =========================================================
   29. RESET DEMO DATA
   ========================================================= */

function resetDemoData() {

    const confirmed =
        confirm(
            "Reset all room data to the original demo data?"
        );

    if (!confirmed) return;

    rooms =
        [...demoRooms];

    saveRooms();

    renderRooms();

    updateDashboard();

    showToast(
        "Demo data restored.",
        "success"
    );

}


/* =========================================================
   30. KEYBOARD SHORTCUTS
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        /* Ctrl + K = Search */

        if (
            event.ctrlKey &&
            event.key.toLowerCase() === "k"
        ) {

            event.preventDefault();

            const search =
                document.querySelector(
                    "#roomSearch"
                );

            if (search) {

                search.focus();

            }

        }

        /* Ctrl + N = New room */

        if (
            event.ctrlKey &&
            event.key.toLowerCase() === "n"
        ) {

            event.preventDefault();

            openModal();

        }

    }
);


/* =========================================================
   31. GLOBAL FUNCTIONS
   ========================================================= */

window.loginUser = loginUser;
window.logoutUser = logoutUser;

window.addRoom = addRoom;
window.editRoom = editRoom;
window.updateRoom = updateRoom;
window.deleteRoom = deleteRoom;

window.openModal = openModal;
window.closeModal = closeModal;

window.toggleTheme = toggleTheme;

window.calculateRent = calculateRent;

window.exportRooms = exportRooms;
window.importRooms = importRooms;

window.resetDemoData = resetDemoData;

window.filterRooms = filterRooms;


/* =========================================================
   32. CONSOLE INFORMATION
   ========================================================= */

console.log(
    "%c🏠 RentEase",
    "font-size: 22px; font-weight: bold;"
);

console.log(
    "%cRoom & Hostel Management System",
    "font-size: 14px;"
);

console.log(
    "%cGitHub Pages Edition 🚀",
    "font-size: 13px;"
);

console.log(
    "Keyboard shortcuts:"
);

console.log(
    "Ctrl + K → Search rooms"
);

console.log(
    "Ctrl + N → Add new room"
);
