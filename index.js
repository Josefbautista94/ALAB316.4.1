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
    if (/^(?!.*(.)\1*$).{2,}$/.test(username) === false) {  // still trying to get the hang of regex, ^ Start of String, Ensures the pattern matches from the beginning of the string. 
        // The .* ensures we check the entire string.
        //  (.)-> Captures any character
        // This stores the first repeating character into group #1 (\1).
        // \1* -> Checks if the entire remaining string consists of only that character
        // If the whole string is just one repeated character (aaaa, 1111, %%%%), this part matches.
        //  (?! ... ) → Negative Lookahead
        // The (?! ... ) ensures that the pattern inside does NOT match.
        // So, if the entire string is only one repeated character, the regex fails.
        //   . ->Matches any character
        // {2,} -> Ensures at least 2 characters long
        // $ -> Marks end of the string
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