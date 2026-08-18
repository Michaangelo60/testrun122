"use strict";

/*
    ============================================
    NIXXA AUTHENTICATION FRONTEND PROTOTYPE
    ============================================

    FLOW:

    CREATE ACCOUNT
        ↓
    CREATE PIN
        ↓
    CONFIRM PIN
        ↓
    PIN CREATED
        ↓
    LOGIN

    FORGOT PIN:

    LOGIN
        ↓
    FORGOT PIN
        ↓
    VERIFY ACCOUNT
        ↓
    CREATE NEW PIN
        ↓
    CONFIRM NEW PIN
        ↓
    LOGIN
*/


/* ============================================
   STATE
============================================ */

let temporaryPin = "";
let recoveryPin = "";
let recoveryIdentifier = "";

const screens = {
    create: document.getElementById("createPinScreen"),
    confirm: document.getElementById("confirmPinScreen"),
    success: document.getElementById("successScreen"),
    login: document.getElementById("loginScreen"),
    forgot: document.getElementById("forgotPinScreen"),
    verify: document.getElementById("verifyScreen"),
    newPin: document.getElementById("newPinScreen"),
    newConfirm: document.getElementById("newConfirmScreen"),
    dashboard: document.getElementById("dashboardScreen")
};


/* ============================================
   SCREEN NAVIGATION
============================================ */

function showScreen(screenName) {

    Object.values(screens).forEach(screen => {
        screen.classList.remove("active");
    });

    screens[screenName].classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* ============================================
   PIN HELPERS
============================================ */

function isValidPin(pin) {

    if (!/^\d{6}$/.test(pin)) {
        return false;
    }

    /*
        Prevent very weak PINs.
    */

    const repeated = /^(\d)\1{5}$/.test(pin);

    if (repeated) {
        return false;
    }

    /*
        Prevent simple sequences.
    */

    const ascending = "0123456789";
    const descending = "9876543210";

    if (
        ascending.includes(pin) ||
        descending.includes(pin)
    ) {
        return false;
    }

    return true;
}


function updatePinDots(input, dotsContainer) {

    const value = input.value;

    const dots = dotsContainer.querySelectorAll("span");

    dots.forEach((dot, index) => {

        if (index < value.length) {
            dot.classList.add("filled");
        } else {
            dot.classList.remove("filled");
        }

    });
}


function onlyNumbers(input) {

    input.value = input.value
        .replace(/\D/g, "")
        .slice(0, 6);
}


/* ============================================
   CREATE PIN
============================================ */

const createPin = document.getElementById("createPin");
const createPinBtn = document.getElementById("createPinBtn");
const createMessage = document.getElementById("createMessage");
const createDots = document.getElementById("createDots");

createPin.addEventListener("input", () => {

    onlyNumbers(createPin);

    updatePinDots(createPin, createDots);

    const pin = createPin.value;

    if (pin.length < 6) {

        createPinBtn.disabled = true;

        createMessage.textContent =
            `${pin.length}/6 digits`;

        createMessage.className =
            "pin-message";

        return;
    }

    if (!isValidPin(pin)) {

        createPinBtn.disabled = true;

        createMessage.textContent =
            "Choose a stronger 6-digit PIN";

        createMessage.className =
            "pin-message error";

        return;
    }

    createPinBtn.disabled = false;

    createMessage.textContent =
        "PIN looks good";

    createMessage.className =
        "pin-message success";
});


createPinBtn.addEventListener("click", () => {

    temporaryPin = createPin.value;

    document.getElementById("confirmPin").value = "";

    updatePinDots(
        document.getElementById("confirmPin"),
        document.getElementById("confirmDots")
    );

    document.getElementById("confirmPinBtn").disabled = true;

    showScreen("confirm");
});


/* ============================================
   CONFIRM PIN
============================================ */

const confirmPin =
    document.getElementById("confirmPin");

const confirmPinBtn =
    document.getElementById("confirmPinBtn");

const confirmMessage =
    document.getElementById("confirmMessage");

const confirmDots =
    document.getElementById("confirmDots");


confirmPin.addEventListener("input", () => {

    onlyNumbers(confirmPin);

    updatePinDots(
        confirmPin,
        confirmDots
    );

    const pin = confirmPin.value;

    if (pin.length < 6) {

        confirmPinBtn.disabled = true;

        confirmMessage.textContent =
            `${pin.length}/6 digits`;

        confirmMessage.className =
            "pin-message";

        return;
    }

    if (pin !== temporaryPin) {

        confirmPinBtn.disabled = true;

        confirmMessage.textContent =
            "PINs don't match";

        confirmMessage.className =
            "pin-message error";

        return;
    }

    confirmPinBtn.disabled = false;

    confirmMessage.textContent =
        "PINs match";

    confirmMessage.className =
        "pin-message success";
});


confirmPinBtn.addEventListener("click", () => {

    /*
        DEMO ONLY.

        Production:
        Send the PIN to your Node.js API.
        Never store plaintext PINs in localStorage.
    */

    const demoUser = {
        identifier: "user@nixxa.com",
        pin: temporaryPin
    };

    localStorage.setItem(
        "nixxaDemoUser",
        JSON.stringify(demoUser)
    );

    showScreen("success");
});


/* ============================================
   CHANGE PIN
============================================ */

document
    .getElementById("changePinBtn")
    .addEventListener("click", () => {

        temporaryPin = "";

        createPin.value = "";

        confirmPin.value = "";

        createPinBtn.disabled = true;
        confirmPinBtn.disabled = true;

        updatePinDots(
            createPin,
            createDots
        );

        updatePinDots(
            confirmPin,
            confirmDots
        );

        showScreen("create");
    });


/* ============================================
   CONFIRM BACK
============================================ */

document
    .getElementById("confirmBack")
    .addEventListener("click", () => {

        showScreen("create");

    });


/* ============================================
   SUCCESS → LOGIN
============================================ */

document
    .getElementById("goLoginBtn")
    .addEventListener("click", () => {

        showScreen("login");

    });


/* ============================================
   LOGIN PIN
============================================ */

const loginPin =
    document.getElementById("loginPin");

const toggleLoginPin =
    document.getElementById("toggleLoginPin");


loginPin.addEventListener("input", () => {

    onlyNumbers(loginPin);

});


toggleLoginPin.addEventListener("click", () => {

    if (loginPin.type === "password") {

        loginPin.type = "text";

        toggleLoginPin.textContent = "Hide";

    } else {

        loginPin.type = "password";

        toggleLoginPin.textContent = "Show";

    }

});


/* ============================================
   LOGIN
============================================ */

const loginBtn =
    document.getElementById("loginBtn");

const loginError =
    document.getElementById("loginError");


loginBtn.addEventListener("click", () => {

    const identifier =
        document
            .getElementById("loginIdentifier")
            .value
            .trim();

    const pin = loginPin.value;

    loginError.textContent = "";

    if (!identifier) {

        loginError.textContent =
            "Enter your email or phone number.";

        return;
    }

    if (!/^\d{6}$/.test(pin)) {

        loginError.textContent =
            "Enter your 6-digit PIN.";

        return;
    }


    /*
        DEMO LOGIN

        Production:
        POST to /api/auth/login
    */

    const savedUser =
        JSON.parse(
            localStorage.getItem("nixxaDemoUser")
        );


    if (!savedUser) {

        loginError.textContent =
            "No account found. Please create an account.";

        return;
    }


    if (
        identifier !== savedUser.identifier ||
        pin !== savedUser.pin
    ) {

        loginError.textContent =
            "Incorrect login details.";

        return;
    }


    showScreen("dashboard");

});


/* ============================================
   FORGOT PIN FROM LOGIN
============================================ */

document
    .getElementById("forgotFromLogin")
    .addEventListener("click", () => {

        document.getElementById(
            "recoveryIdentifier"
        ).value = "";

        document.getElementById(
            "recoveryError"
        ).textContent = "";

        showScreen("forgot");

    });


/* ============================================
   FORGOT PIN BACK
============================================ */

document
    .getElementById("forgotBack")
    .addEventListener("click", () => {

        showScreen("login");

    });


/* ============================================
   ACCOUNT RECOVERY
============================================ */

document
    .getElementById("recoveryBtn")
    .addEventListener("click", () => {

        const identifier =
            document
                .getElementById("recoveryIdentifier")
                .value
                .trim();

        const error =
            document.getElementById(
                "recoveryError"
            );

        error.textContent = "";

        if (!identifier) {

            error.textContent =
                "Enter your email or phone number.";

            return;
        }

        recoveryIdentifier = identifier;

        /*
            Production:
            Call backend:

            POST /api/auth/forgot-pin

            Backend should send an OTP.
        */

        showScreen("verify");

    });


/* ============================================
   OTP INPUT
============================================ */

const otpInputs =
    document.querySelectorAll(".otp");


otpInputs.forEach((input, index) => {

    input.addEventListener("input", () => {

        input.value =
            input.value.replace(/\D/g, "");

        if (
            input.value &&
            index < otpInputs.length - 1
        ) {

            otpInputs[index + 1].focus();

        }

    });


    input.addEventListener("keydown", event => {

        if (
            event.key === "Backspace" &&
            !input.value &&
            index > 0
        ) {

            otpInputs[index - 1].focus();

        }

    });

});


/* ============================================
   VERIFY OTP
============================================ */

document
    .getElementById("verifyBtn")
    .addEventListener("click", () => {

        const code =
            Array.from(otpInputs)
                .map(input => input.value)
                .join("");

        /*
            DEMO ONLY

            Demo OTP:
            123456
        */

        if (code !== "123456") {

            alert("Invalid verification code.");

            return;
        }

        otpInputs.forEach(
            input => input.value = ""
        );

        showScreen("newPin");

    });


/* ============================================
   VERIFY BACK
============================================ */

document
    .getElementById("verifyBack")
    .addEventListener("click", () => {

        showScreen("forgot");

    });


/* ============================================
   NEW PIN
============================================ */

const newPin =
    document.getElementById("newPin");

const newPinBtn =
    document.getElementById("newPinBtn");

const newPinMessage =
    document.getElementById("newPinMessage");

const newDots =
    document.getElementById("newDots");


newPin.addEventListener("input", () => {

    onlyNumbers(newPin);

    updatePinDots(
        newPin,
        newDots
    );

    const pin = newPin.value;

    if (pin.length < 6) {

        newPinBtn.disabled = true;

        newPinMessage.textContent =
            `${pin.length}/6 digits`;

        newPinMessage.className =
            "pin-message";

        return;
    }

    if (!isValidPin(pin)) {

        newPinBtn.disabled = true;

        newPinMessage.textContent =
            "Choose a stronger 6-digit PIN";

        newPinMessage.className =
            "pin-message error";

        return;
    }

    newPinBtn.disabled = false;

    newPinMessage.textContent =
        "PIN looks good";

    newPinMessage.className =
        "pin-message success";

});


newPinBtn.addEventListener("click", () => {

    recoveryPin = newPin.value;

    document.getElementById(
        "newConfirmPin"
    ).value = "";

    updatePinDots(
        document.getElementById("newConfirmPin"),
        document.getElementById("newConfirmDots")
    );

    document.getElementById(
        "saveNewPinBtn"
    ).disabled = true;

    showScreen("newConfirm");

});


/* ============================================
   NEW PIN CONFIRM
============================================ */

const newConfirmPin =
    document.getElementById("newConfirmPin");

const newConfirmMessage =
    document.getElementById("newConfirmMessage");

const newConfirmDots =
    document.getElementById("newConfirmDots");

const saveNewPinBtn =
    document.getElementById("saveNewPinBtn");


newConfirmPin.addEventListener("input", () => {

    onlyNumbers(newConfirmPin);

    updatePinDots(
        newConfirmPin,
        newConfirmDots
    );

    const pin =
        newConfirmPin.value;

    if (pin.length < 6) {

        saveNewPinBtn.disabled = true;

        newConfirmMessage.textContent =
            `${pin.length}/6 digits`;

        newConfirmMessage.className =
            "pin-message";

        return;
    }

    if (pin !== recoveryPin) {

        saveNewPinBtn.disabled = true;

        newConfirmMessage.textContent =
            "PINs don't match";

        newConfirmMessage.className =
            "pin-message error";

        return;
    }

    saveNewPinBtn.disabled = false;

    newConfirmMessage.textContent =
        "PINs match";

    newConfirmMessage.className =
        "pin-message success";

});


/* ============================================
   SAVE NEW PIN
============================================ */

saveNewPinBtn.addEventListener("click", () => {

    /*
        DEMO ONLY.

        Production:
        Send the new PIN to:

        PUT /api/auth/reset-pin

        Backend should:
        1. Verify recovery token
        2. Hash PIN with bcrypt
        3. Update database
        4. Invalidate recovery token
        5. Invalidate old sessions
    */


    const savedUser =
        JSON.parse(
            localStorage.getItem("nixxaDemoUser")
        );

    if (savedUser) {

        savedUser.pin = recoveryPin;

        localStorage.setItem(
            "nixxaDemoUser",
            JSON.stringify(savedUser)
        );

    }

    alert(
        "Your NIXXA PIN has been successfully updated."
    );

    loginPin.value = "";

    document.getElementById(
        "loginIdentifier"
    ).value = recoveryIdentifier;

    showScreen("login");

});


/* ============================================
   NEW PIN BACK
============================================ */

document
    .getElementById("newConfirmBack")
    .addEventListener("click", () => {

        showScreen("newPin");

    });


/* ============================================
   BIOMETRIC DEMO
============================================ */

document
    .getElementById("biometricBtn")
    .addEventListener("click", () => {

        alert(
            "Biometric authentication will be connected to WebAuthn/passkeys in the production version."
        );

    });


/* ============================================
   CREATE ACCOUNT
============================================ */

document
    .getElementById("createAccountBtn")
    .addEventListener("click", () => {

        showScreen("create");

    });


/* ============================================
   LOGOUT
============================================ */

document
    .getElementById("logoutBtn")
    .addEventListener("click", () => {

        loginPin.value = "";

        showScreen("login");

    });


/* ============================================
   AUTO FOCUS
============================================ */

document.addEventListener("keydown", event => {

    const activeScreen =
        document.querySelector(
            ".screen.active"
        );

    if (!activeScreen) return;

    if (
        event.key >= "0" &&
        event.key <= "9"
    ) {

        const pinInput =
            activeScreen.querySelector(
                'input[inputmode="numeric"]'
            );

        if (pinInput) {

            pinInput.focus();

        }

    }

});