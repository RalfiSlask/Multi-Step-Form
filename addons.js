// DOM queries

let buttonNextStep = document.querySelector(".next-step");
let buttonGoBack = document.querySelector(".go-back");
let plans = document.querySelectorAll(".plan");
let boxes = document.querySelectorAll(".box");
let pricing = document.querySelectorAll(".pricing");
let addonNames = document.querySelectorAll("h3");
let timePlan = localStorage.getItem("timeplan");

// variables

let basePrice = 1;
let number_off_addons = 0;
let number = 0;
let storedAddon;

const gettingStoredAddons = () => {
    addonNames.forEach((addon, index) => {
        let plan = plans[index];
        let box = boxes[index];
        number++;
        storedAddon = localStorage.getItem(`addon${number}`);
        if(addon.textContent === storedAddon) {
            plan.classList.add("chosen");
            box.classList.add("highlight");
        }
    })
}

const updatePricePlan = () => {
    if(timePlan === "yearly") {
        pricing.forEach(price => {
            price.textContent = `+$${basePrice * 10}/yr`
            if(basePrice < 2) {
                basePrice++;
            } 
        })
    } else if(timePlan === "monthly") {
        pricing.forEach(price => {
            price.textContent = `+$${basePrice}/mo`
            if(basePrice < 2) {
                basePrice++;
            } 
        })
    }
}

const savingToLocalStorage = () => {
    plans.forEach((plan, index) => {
        let addon = addonNames[index].textContent;
        number_off_addons++;
        if(plan.classList.contains("chosen")) {
            localStorage.setItem(`addon${number_off_addons}`, `${addon}`);
        } else {
            localStorage.setItem(`addon${number_off_addons}`, "");
        }
    })
}

const clickingOnAddon = () => {
    plans.forEach((plan, index) => {
        let box = boxes[index];
        plan.onclick = () => {
            plan.classList.toggle("chosen");
            box.classList.toggle("highlight");
        }
    })
}

const clickingOnNextStep = () => {
    buttonNextStep.onclick = () => {
        location.assign("./finish.html");
        savingToLocalStorage();
    }
}

const goingBack = () => {
    buttonGoBack.onclick = () => {
        location.assign("./plan.html");
    }
}

updatePricePlan();
clickingOnAddon();
clickingOnNextStep();
gettingStoredAddons();
goingBack();