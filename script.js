/* ---------------- FORM TOGGLE ---------------- */

const loginFormBox = document.getElementById("loginForm");
const registerFormBox = document.getElementById("registerForm");

const showRegisterBtn = document.getElementById("showRegisterBtn");
const showLoginBtn = document.getElementById("showLoginBtn");

const loginForm = document.getElementById("loginFormElement");
const registerForm = document.getElementById("registerFormElement");

const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");

const regName = document.getElementById("regName");
const regEmail = document.getElementById("regEmail");
const regPassword = document.getElementById("regPassword");
const regConfirm = document.getElementById("regConfirm");


showRegisterBtn.addEventListener("click", () => {
    loginFormBox.style.display = "none";
    registerFormBox.style.display = "block";
});

showLoginBtn.addEventListener("click", () => {
    registerFormBox.style.display = "none";
    loginFormBox.style.display = "block";
});


/* ---------------- VALIDATION FUNCTIONS ---------------- */

function isValidEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

function isStrongPassword(password) {
    return password.length >= 6;
}


/* ---------------- REGISTER ---------------- */

registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    if (regName.value.trim() === "") {
        alert("Name is required");
        return;
    }

    if (!isValidEmail(regEmail.value)) {
        alert("Enter valid email address");
        return;
    }

    if (!isStrongPassword(regPassword.value)) {
        alert("Password must be at least 6 characters");
        return;
    }

    if (regPassword.value !== regConfirm.value) {
        alert("Passwords do not match");
        return;
    }

    const userData = {
        name: regName.value,
        email: regEmail.value,
        password: regPassword.value
    };

    localStorage.setItem("user", JSON.stringify(userData));

    alert("Registration Successful ✅");

    registerForm.reset();
    showLoginBtn.click();
});


/* ---------------- CAPTCHA ---------------- */

let captchaValue = "";

function generateCaptcha() {
    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    captchaValue = "";

    for (let i = 0; i < 6; i++) {
        captchaValue += chars.charAt(
            Math.floor(Math.random() * chars.length)
        );
    }

    document.getElementById("captchaText").innerText = captchaValue;
}

document
    .getElementById("refreshCaptcha")
    .addEventListener("click", generateCaptcha);

window.onload = generateCaptcha;


/* ---------------- OTP ---------------- */

let generatedOTP = "";

function sendOTP() {
    generatedOTP =
        Math.floor(100000 + Math.random() * 900000);

    alert("Your OTP is: " + generatedOTP);
}


/* ---------------- LOGIN ---------------- */

loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const captchaInput =
        document.getElementById("captchaInput").value;

    if (loginEmail.value.trim() === "") {
        alert("Email is required");
        return;
    }

    if (loginPassword.value.trim() === "") {
        alert("Password is required");
        return;
    }

    const storedUser = JSON.parse(
        localStorage.getItem("user")
    );

    if (!storedUser) {
        alert("Please register first");
        return;
    }

    if (
        loginEmail.value === storedUser.email &&
        loginPassword.value === storedUser.password
    ) {

        /* CAPTCHA CHECK */
        if (captchaInput !== captchaValue) {
            alert("Wrong CAPTCHA ❌");
            generateCaptcha();
            return;
        }

        /* HIDE CAPTCHA */
        document.getElementById("captchaSection").style.display =
            "none";

        /* SHOW OTP */
        document.getElementById("otpBox").style.display =
            "block";

        sendOTP();

    } else {
        alert("Invalid Email or Password ❌");
    }
});


/* ---------------- OTP VERIFY ---------------- */

document
    .getElementById("verifyOtpBtn")
    .addEventListener("click", function () {

        let userOTP =
            document.getElementById("otpInput").value;

        if (userOTP == generatedOTP) {

            alert("Login Successful ✅");

            loginForm.reset();

            document.getElementById("otpBox").style.display =
                "none";

            document.getElementById("captchaSection").style.display =
                "block";

            generateCaptcha();

        } else {
            alert("Wrong OTP ❌");
        }
    });


/* ---------------- INPUT FOCUS EFFECT ---------------- */

const inputs = document.querySelectorAll("input");

inputs.forEach(input => {
    input.addEventListener("focus", () => {
        input.style.borderColor = "#ff6b00";
    });

    input.addEventListener("blur", () => {
        input.style.borderColor = "#ccc";
    });
});
