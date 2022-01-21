const loginForm = document.getElementById("login-form");
const codeInput = document.getElementById("codeInput");
const baseUrl = `http://localhost:3000/`;
let mobileNumber;
let isOTPDelivered = false;
const responseHTML = document.querySelector(".response");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    mobileNumber = parseInt(document.getElementById("phoneInput").value);
    if (isNaN(mobileNumber)) {
        alert("Invalid Phone Number");
    } else {
        //process
        if (isOTPDelivered) {
            const code = codeInput.value;
            const response = await verifyOTP(mobileNumber, code);
            setResponse(response.status);
            return;
        }

        const response = await sendVerificationCode(mobileNumber);
        if (response.status === "pending") {
            codeInput.parentElement.classList.remove("hidden");
            isOTPDelivered = true;
        }
    }
});

async function sendVerificationCode(mobileNumber) {
    const res = await axios.post(baseUrl + `send-verification-otp`, {
        mobileNumber,
    });

    if (res.status === 200) {
        return res.data.verification;
    } else {
        return res.data;
    }
}

async function verifyOTP(mobileNumber, code) {
    const res = await axios.post(baseUrl + `verify-otp`, {
        mobileNumber,
        code,
    });

    if (res.status === 200) {
        return res.data.verification_check;
    } else {
        return res.data;
    }
}

function setResponse(status) {
    if (status === "pending") {
        // responseHTML.innerHTML = `<div class="alert alert-danger d-flex align-items-center" role="alert">
        //     <div>
        //     Invalid OTP
        //     </div>
        // </div>`;

        responseHTML.innerHTML = `<div class="alert alert-danger d-flex align-items-center" role="alert">
        <div>
        Invalid OTP
        </div>
    </div>`;

    } else if (status === "approved") {
        console.log("OTP Verified");
        responseHTML.innerHTML = `<div class="alert alert-success d-flex align-items-center" role="alert">
        <div>
        OTP Verified
        </div>
    </div>`;

        // responseHTML.innerHTML = `<div class="alert alert-success d-flex align-items-center" role="alert">
        //         <div>
        //         Login Success
        //         </div>
        //     </div>`;
    }
}