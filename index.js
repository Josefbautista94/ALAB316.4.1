const registrationForm = document.getElementById("registration")
const registrationUsername = registrationForm.elements["username"]
const registrationEmail = registrationForm.elements["email"]
const registrationPassword = registrationForm.elements["password"]
const registrationConfirmPassword = registrationForm.elements["passwordCheck"]
const registrationTermsAndConditions = registrationForm.elements["terms"]
registrationForm.addEventListener("submit", validate);

function validate(event) {

    event.preventDefault(); // Stop submission first, allow if all checks pass

    const RegistrationUserNameValue = validateRegisterUsername();
    if (RegistrationUserNameValue === false) {
        return false;
    }

    const emailValue = validateRegistrationEmail()
    if (emailValue === false) {
        return false;
    }

    const passwordValue = validateRegisterPassword();
    if (passwordValue === false) {
        return false;
    }

    const termsAndConditionsValue = validateTermsAndConditions()
    if(termsAndConditionsValue === false){
        return false;
    }
}

//Registration Form - Username Validation:
function validateRegisterUsername() {
    let username = registrationUsername.value.trim();

    //The username cannot be blank.
    if (username === "") { // Removing spaces before checking
        alert("Please enter a username!")
        registrationUsername.focus();
        return false // Prevents form submission if inside an event handler
    }

    //The username must be at least four characters long.
    if (username.length < 4) {
        alert("Username must be at least 4 characters long!");
        registrationUsername.focus();
        return false;
    }

      // The username cannot contain any special characters or whitespace.
      if (!/^[a-zA-Z0-9]+$/.test(username)) {
        // ^ Ensures the match starts from the beginning of the string
        // $ Ensures the match ends at the end of the string
        // [ ] Defines a character set (a group of allowed characters)
        // a-z Matches lowercase letters (a to z)
        // A-Z Matches uppercase letters (A to Z)
        // 0-9 Matches digits (0 to 9)
        // + Ensures at least one character is present
        alert("Please don't use any special characters or blank spaces!");
        registrationUsername.focus();
        return false;
    }

     // The username must contain at least two unique characters.
     let uniqueCharacters = new Set(username);
     if (uniqueCharacters.size < 2) {
         alert("Username must contain at least two unique characters!");
         registrationUsername.focus();
         return false;
     }

    return username;
}
//Registration Form - Email Validation:
function validateRegistrationEmail() {
    let emailValue = registrationEmail.value.trim();

    // No Email
    if (emailValue === "") {
        alert("You didn't provide! an Email")
        registrationEmail.focus();
        return false;
    }

    //The email must be a valid email address.
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(emailValue)) { // example from the lecture used here

        alert("This isn't a valid email address!");
        registrationEmail.focus();
        return false;
    }

    //The email must not be from the domain "example.com."
    // if (emailValue.toLowerCase().slice(-12) === "@example.com") { // first soltuion
    //     alert("Emails from 'example.com' are not allowed!");
    //     return false;
    // }

    //The email must not be from the domain "example.com."
    if (emailValue.toLowerCase().endsWith("@example.com")) { // found a cleaner way to do it by using .endsWith()
        //When you call .endsWith(searchString),
        //Gets the length of searchString.
        //Compares the last N characters of the original string (where N is the length of searchString).
        //Returns true if they match, otherwise false.
        alert("Stop trying to play with us! Don't use example.com!");
        registrationEmail.focus();
        return false;
    }

    return emailValue;
}

//Registration Form - Password Validation:
function validateRegisterPassword() {
    let passwordValue = registrationPassword.value.trim();
    let username = registrationUsername.value.trim(); // Get username for comparison

    //Passwords must be at least 12 characters long.
    if (passwordValue.length < 12) {
        alert("The password has to be at least 12 characters long!")
        registrationPassword.focus();
        return false;
    }

    //Passwords must have at least one uppercase and one lowercase letter.
    if (!/^(?=.*[a-z])(?=.*[A-Z]).+$/.test(passwordValue)) {
        // ^	Start of the string
        // (?=.*[a-z])	Ensures at least one lowercase letter (a-z) exists anywhere in the string
        // (?=.*[A-Z])	Ensures at least one uppercase letter (A-Z) exists anywhere in the string
        // .+	Ensures at least one or more characters are present
        // $	End of the string
        alert("You must have at least on uppercase and lowercase letter!")
        registrationPassword.focus();
        return false;
    }

    //Passwords must contain at least one number.
    if (!/(?=.*\d)/.test(passwordValue)) {
        // (?= ...) ensures something exists in the string without consuming characters
        // .*  Matches any characters (including none) before the required digit.
        // \d  Matches any digit (0-9).
        alert("You must at least include one number!")
        registrationPassword.focus();
        return false;
    }

    //Passwords must contain at least one special character.
    if (!/(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>?/~`-])/.test(passwordValue)) {
        // (?= ... ) -> Lookahead
        // [!@#$%^&*()_+[\]{};':"\\|,.<>?/~-]` -> Character Set
        // [ ] -> Defines a character set (group of allowed characters).

        alert("Password must contain at least one special character like : !@#$%^&* etc...");
        registrationPassword.focus();
        return false;
    }


    //Passwords cannot contain the word "password" (uppercase, lowercase, or mixed).
    if (passwordValue.toLowerCase().includes("password")) {
        alert("Passwords cannot contain the word password at all bro, try something else")
        registrationPassword.focus();
        return false;
    }

    //Passwords cannot contain the username.
    if (passwordValue.toLowerCase().includes(username.toLowerCase())) {
        alert("You cannot contain your username in your password!")
        registrationPassword.focus()
        return false;
    }

    //Both passwords must match.
    if (passwordValue !== registrationConfirmPassword.value.trim()) {
        alert("The passwords don't match! try again!")
        registrationPassword.focus();
        registrationConfirmPassword.focus();
        return false;
    }

    return passwordValue;
}

// Registration Form - Terms and Conditions:
function validateTermsAndConditions() {
    if (!registrationTermsAndConditions.checked) { 
        alert("You must accept the Terms and Conditions to proceed.");
        registrationTermsAndConditions.focus();
        return false;
    }
    return true;
}

//Registration Form - Form Submission:
