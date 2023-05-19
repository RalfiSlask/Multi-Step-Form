// DOM queries

let buttonNextStep = document.querySelector(".next-step");
let buttonGoBack = document.querySelector(".go-back");
let sliderInput = document.querySelector(".slider");
let monthlyPlan = document.querySelector(".monthly");
let yearlyPlan = document.querySelector(".yearly");
let plans = document.querySelectorAll(".plan");
let freeMessages = document.querySelectorAll(".free");
let prices = document.querySelectorAll(".container p");
let planNames = document.querySelectorAll("h3");
let errorMessage = document.querySelector(".error");

// variables

let baseValue = 9;
let planArray = [];

const updatePrizing = () => {
    baseValue = 9;
    prices.forEach(price => {
        if(sliderInput.value == 2) {
            price.textContent = `$${baseValue * 10}/yr`
            baseValue += 3;
        } else {
            price.textContent = `$${baseValue}/mo`
            baseValue += 3;
        }
    });
};

const changingTimePlan = () => {
    updatePrizing();
    if(sliderInput.value == 2) {
        yearlyPlan.classList.add("highlight");
        monthlyPlan.classList.remove("highlight");
        freeMessages.forEach(message => {
            message.classList.remove("nodisplay");
        })
    } else {
        yearlyPlan.classList.remove("highlight");
        monthlyPlan.classList.add("highlight");
        freeMessages.forEach(message => {
            message.classList.add("nodisplay");
        })
    };
};

const gettingStoredPlan = () => {
    let stored_plan = localStorage.getItem("plan");
    let stored_timeplan = localStorage.getItem("timeplan");
    planNames.forEach((name, index) => {
        let plan = plans[index];
        if(name.textContent === stored_plan) {
            plan.classList.add("chosen");
        }
    });
    stored_timeplan === "yearly" ? sliderInput.value = 2 : 1;
    changingTimePlan();
};

const goingBack = () => {
    location.assign("./index.html");
};

const clickingOnNextStep = () => {
    planArray = Array.from(plans);
    plansEmpty = planArray.every(plan => !plan.classList.contains("chosen"));
    plans.forEach((plan, index) => {
        let price = prices[index].textContent;
        if(plan.classList.contains("chosen")) {
            location.assign("./addons.html");
            localStorage.setItem("price", price);
            savingToLocalStorage();
        } else if(plansEmpty) {
            errorMessage.classList.remove("hidden");
            plan.classList.add("inactive");
        }
    });
};

// Event listeners

sliderInput.addEventListener("input", changingTimePlan);
buttonGoBack.addEventListener("click", goingBack);
buttonNextStep.addEventListener("click", clickingOnNextStep);

const clickingOnPlan = () => {
    plans.forEach((plan, index, plans) => {
        plan.onclick = () => {
            plans.forEach(plan => {
                plan.classList.remove("chosen");
                plan.classList.remove("inactive");
                errorMessage.classList.add("hidden");
            })
            plan.classList.add("chosen");
        }
    });
};

const savingToLocalStorage = () => {
    plans.forEach((plan, index) => {
        let name = planNames[index].textContent;
        let price_plan = prices[index].textContent;
        if(plan.classList.contains("chosen")) {
            localStorage.setItem("plan", `${name}`);
        }
        if(price_plan.includes("mo")) {
            localStorage.setItem("timeplan", "monthly");
        } else if(price_plan.includes("yr")) {
            localStorage.setItem("timeplan", "yearly");
        }
    });
};

gettingStoredPlan();
clickingOnPlan();






