
// ========================================
// 1. LOGIN CONFIGURATION
// ========================================

const VALID_USER_ID = "976899017";
const VALID_PASSWORD = "Hxncffgp";

// Get HTML elements
const loginPage = document.getElementById("loginPage");
const dashboard = document.getElementById("dashboard");
const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");

const userIdInput = document.getElementById("userId");
const passwordInput = document.getElementById("password");

const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");

const okBtn = document.getElementById("okBtn");
const cancelBtn = document.getElementById("cancelBtn");
const closeModal = document.getElementById("closeModal");

let currentAction = null;


// ========================================
// 2. CHECK HTML ELEMENTS
// ========================================

document.addEventListener("DOMContentLoaded", function () {
    console.log("Gaming ID Center JavaScript loaded successfully.");

    if (!loginForm || !loginPage || !dashboard) {
        console.error(
            "Login elements not found. Check the IDs in index.html."
        );
    }
});


// ========================================
// 3. LOGIN SYSTEM
// ========================================

if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const enteredUserId = userIdInput.value.trim();
        const enteredPassword = passwordInput.value;

        // Check credentials
        if (
            enteredUserId === VALID_USER_ID &&
            enteredPassword === VALID_PASSWORD
        ) {
            // Hide login page
            loginPage.classList.add("hidden");

            // Show dashboard
            dashboard.classList.remove("hidden");

            // Clear error message
            loginError.textContent = "";

            // Clear form
            loginForm.reset();

            console.log("Login successful.");
        } else {
            loginError.textContent =
                "Invalid User ID or Password! Please try again.";

            passwordInput.value = "";
            passwordInput.focus();

            console.log("Login failed.");
        }
    });
}


// ========================================
// 4. LOGOUT SYSTEM
// ========================================

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
        dashboard.classList.add("hidden");
        loginPage.classList.remove("hidden");

        loginForm.reset();
        loginError.textContent = "";

        hideModal();

        console.log("Logged out successfully.");
    });
}


// ========================================
// 5. MODAL / POPUP SYSTEM
// ========================================

function openModal(content, action = null, showCancel = true) {
    if (!modal || !modalContent) {
        alert("Popup could not be opened. Check your HTML.");
        return;
    }

    modalContent.innerHTML = content;

    currentAction = action;

    if (cancelBtn) {
        cancelBtn.style.display = showCancel ? "block" : "none";
    }

    if (okBtn) {
        okBtn.textContent = "OK";
    }

    modal.classList.remove("hidden");
}


function hideModal() {
    if (modal) {
        modal.classList.add("hidden");
    }

    currentAction = null;
}


// Close button
if (closeModal) {
    closeModal.addEventListener("click", hideModal);
}


// Cancel button
if (cancelBtn) {
    cancelBtn.addEventListener("click", hideModal);
}


// Close when clicking outside popup
if (modal) {
    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            hideModal();
        }
    });
}


// ========================================
// 6. POPUP OK BUTTON
// ========================================

if (okBtn) {
    okBtn.addEventListener("click", function () {
        const action = currentAction;

        // Close current popup first
        hideModal();

        // Run the next action if provided
        if (typeof action === "function") {
            action();
        }
    });
}


// ========================================
// 7. COLLECT FIRST GAMING ID
// ========================================

const collectFirstBtn = document.getElementById("collectFirstBtn");

if (collectFirstBtn) {
    collectFirstBtn.addEventListener("click", function () {
        openModal(`
            <h2>🎮 Your Gaming ID</h2>

            <p>Your payment status is marked as paid.</p>

            <p><strong>Gmail:</strong></p>
            <p>gulabo790@gmail.com</p>

            <p><strong>Password:</strong></p>
            <p>gulaboo@5673</p>

            <p style="font-size:12px;">
                Keep your account details private.
            </p>
        `);
    });
}


// ========================================
// 8. UPI PAYMENT POPUP
// ========================================

function showPaymentPopup() {
    const upiId = "kiran190207@fam";
    const amount = "1497.00";
    const payeeName = "Gaming ID Center";
    const note = "Gaming ID Collection";

    // Create UPI payment link
    const upiLink =
        "upi://pay" +
        "?pa=" + encodeURIComponent(upiId) +
        "&pn=" + encodeURIComponent(payeeName) +
        "&am=" + amount +
        "&cu=INR" +
        "&tn=" + encodeURIComponent(note);

    // Generate QR code using an external service
    const qrUrl =
        "https://api.qrserver.com/v1/create-qr-code/" +
        "?size=250x250&data=" +
        encodeURIComponent(upiLink);

    const paymentContent = `
        <h2>💳 Complete Payment</h2>

        <p>Scan the QR code using a compatible UPI app.</p>

        <img
            class="qr-image"
            src="${qrUrl}"
            alt="UPI Payment QR Code"
        >

        <p><strong>Amount to Pay</strong></p>

        <h2>₹1,497</h2>

        <p><strong>UPI ID</strong></p>

        <p class="upi-id">${upiId}</p>

        <p style="font-size:12px;">
            This is a demo website. Payment is not verified here.
        </p>

        <a href="${upiLink}">Open UPI App</a>
    `;

    openModal(paymentContent);
}


// ========================================
// 9. MAIN PAY NOW BUTTON
// ========================================

const payNowBtn = document.getElementById("payNowBtn");

if (payNowBtn) {
    payNowBtn.addEventListener("click", function () {
        showPaymentPopup();
    });
}


// ========================================
// 10. INDIVIDUAL UNPAID ID BUTTONS
// ========================================

const individualPayButtons =
    document.querySelectorAll(".pay-card-btn");

individualPayButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        showPaymentPopup();
    });
});


// ========================================
// 11. COLLECT ALL THREE IDS
// ========================================

const collectAllBtn = document.getElementById("collectAllBtn");

if (collectAllBtn) {
    collectAllBtn.addEventListener("click", function () {
        openModal(`
            <h2>Collect Remaining IDs</h2>

            <p>You have three gaming IDs pending.</p>

            <p>
                Complete the payment step to continue.
            </p>

            <h2>₹1,497</h2>

            <p style="font-size:12px;">
                This demo does not verify payments.
            </p>
        `, function () {
            showPaymentPopup();
        });
    });
}


// ========================================
// 12. CUSTOMER SUPPORT FORM
// ========================================

const supportForm = document.getElementById("supportForm");
const supportResult = document.getElementById("supportResult");

if (supportForm) {
    supportForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name =
            document.getElementById("supportName").value.trim();

        const email =
            document.getElementById("supportEmail").value.trim();

        const message =
            document.getElementById("supportMessage").value.trim();

        // Basic form validation
        if (!name || !email || !message) {
            supportResult.textContent =
                "Please fill in all the fields.";

            return;
        }

        // Demo response only
        supportResult.textContent =
            `Thank you, ${name}! Your query was recorded for this demo session.`;

        supportForm.reset();

        console.log("Demo support query:", {
            name: name,
            email: email,
            message: message
        });
    });
}


// ========================================
// 13. ESC KEY CLOSES POPUP
// ========================================

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        hideModal();
    }
});


// ========================================
// 14. INITIAL PAGE STATE
// ========================================

// Start on the login page
if (loginPage && dashboard) {
    loginPage.classList.remove("hidden");
    dashboard.classList.add("hidden");
}

console.log("All Gaming ID Center scripts initialized.");

