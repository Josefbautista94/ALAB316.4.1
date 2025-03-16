const registrationForm = document.getElementById("registration")
const registrationUsername = registrationForm.elements["username"]
const registrationEmail = registrationForm.elements["email"]

registrationForm.addEventListener("submit", validate);

function validate(event) {

    event.preventDefault(); // Stop submission first, allow if all checks pass

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

    if (!/^[a-zA-Z0-9]+$/.test(username)) { //Originally had this if statement last but it wasn't working properly because of the order
        //  ^	Ensures the match starts from the beginning of the string
        //  $	Ensures the match ends at the end of the string        //
        // [ ]	Defines a character set (a group of allowed characters)
        // a-z	Matches lowercase letters (a to z)
        // A-Z	Matches uppercase letters (A to Z)
        // 0-9	Matches digits (0 to 9)
        //  +	Ensures at least one character is present
        alert("Please dont use any special characters or blank spaces!")
        registrationUsername.focus();
        return false;
    }

    if (!/^[a-zA-Z0-9]+$/.test(username)) {
        // still trying to get the hang of regex,
        //  ^ Start of String, Ensures the pattern matches from the beginning of the string. 
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
    let emailValue = registrationEmail.value.trim();

    if (emailValue === "") {
        alert("You didn't provide! an Email")
        registrationEmail.focus();
        return false;
    }
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(emailValue)) { // example from the lecture used here

        alert("This isn't a valid email address!");
        registrationEmail.focus();
        return false;
    }

    // if (emailValue.toLowerCase().slice(-12) === "@example.com") { // first soltuion
    //     alert("Emails from 'example.com' are not allowed!");
    //     return false;
    // }

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