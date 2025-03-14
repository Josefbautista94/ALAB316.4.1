const registrationForm = document.getElementById("registration")
const registrationUsername = registrationForm.elements["username"]
const registrationEmail = registrationForm.elements["email"]

registrationForm.addEventListener("submit", validate);

function validate(event) {

    const RegistrationUserNameValue = validateRegisterUsername();
    if (RegistrationUserNameValue === false) {
        event.preventDefault();
        return false;
    }
    const emailValue = validateRegistrationEmail()
    if (emailValue === false) {
        event.preventDefault()
        return false;
    }
}


function validateRegisterUsername() {
    let username = registrationUsername.value.trim();

    if (username === "") { // Removing spaces before checking
        alert("Please enter a username!")
        registrationUsername.focus();
        return false // Prevents form submission if inside an event handler
    }
    if (username.length < 4) {
        alert("Username must be at least 4 characters long!");
        registrationUsername.focus();
        return false;
    }
    if (!/(.).*\1|(.).*?\2/.test(username)) {
        alert("Username must contain at least two unique characters!");
        registrationUsername.focus();
        return false;
    }

    return username;
}

function validateRegistrationEmail() {
    let emailValue = registrationEmail.value
    if (emailValue === "") {
        alert("You didn't provide! an Email")
        registrationEmail.focus();
        return false;
    }
    return emailValue;
}