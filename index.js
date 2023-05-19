// DOM queries

let buttonNextStep = document.querySelector(".next-step");
let inputs = document.querySelectorAll("input");
let errorMessages = document.querySelectorAll(".error");
let inputName = document.querySelector(".name");
let inputEmail = document.querySelector(".email");
let inputPhone = document.querySelector(".phone");
let errorName = document.querySelector(".error--name");
let errorEmail = document.querySelector(".error--email");
let errorPhone = document.querySelector(".error--phone");
let messageArray = [];
let inputArray = Array.from(inputs);

// Regular expressions

let regExpLetters = new RegExp("[a-zA-Z]");
let regExpNumbers = new RegExp("[0-9]");
let validRegex = new RegExp(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/);

const displayStoredInfo = () => {
    let name = localStorage.getItem("name");
    let email = localStorage.getItem("email");
    let phone = localStorage.getItem("phone");
    inputName.value = name;
    inputEmail.value = email;
    inputPhone.value = phone;
}

const clickingOnNextStep = () => {
    buttonNextStep.onclick = () => {
        doNameContainNumbers();
        doPhoneContainLetters();
        isEmailValid();
        isFieldEmpty();
        messageArray = Array.from(errorMessages);
        validInputs = messageArray.every(msg => msg.classList.contains("hidden"));
        emptyInputs = inputArray.every(input => input.value != "");
        console.log(messageArray)
        if(validInputs && emptyInputs) {
            localStorage.setItem("name", `${inputName.value}`);
            localStorage.setItem("email", `${inputEmail.value}`);
            localStorage.setItem("phone", `${inputPhone.value}`);
            location.assign("./plan.html");  
        }

    }
}

const isFieldEmpty = () => {
    inputs.forEach((input, index) => {
        let error_message = errorMessages[index];
        if(input.value === "") {
            error_message.classList.remove("hidden");
            error_message.textContent = "This field is required";
            input.style.border = "1px solid #EE374A";
        } 
    })
}

const displayErrorMessage = (error, input) => {
    error.classList.remove("hidden");
    input.style.border = "1px solid #EE374A";
}

const hideErrorMessage = (error, input) => {
    error.classList.add("hidden");
    input.style.border = "1px solid #D6D9E6";
}

const doNameContainNumbers = () => {
    if (regExpNumbers.test(inputName.value)) {
        errorName.textContent = "Cant contain numbers";
        displayErrorMessage(errorName, inputName);
    } else {
        hideErrorMessage(errorName, inputName);
    }
}

const isEmailValid = () => {
    if(!inputEmail.value.match(validRegex)) {
        errorEmail.textContent = "Not a valid email";
        displayErrorMessage(errorEmail, inputEmail);
    } else {
        hideErrorMessage(errorEmail, inputEmail);
    }
}

const doPhoneContainLetters = () => {
    if(regExpLetters.test(inputPhone.value)) {
        errorPhone.textContent = "Cant contain letters";
        displayErrorMessage(errorPhone, inputPhone);
    } else if(inputPhone.value[0] != "+") {
        errorPhone.textContent = "Have to include + sign";
        displayErrorMessage(errorPhone, inputPhone);
    } else {
        hideErrorMessage(errorPhone, inputPhone);
    }
}

displayStoredInfo();
clickingOnNextStep();




