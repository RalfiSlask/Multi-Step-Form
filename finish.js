// DOM queries

let buttonConfirm = document.querySelector(".confirm");
let buttonGoBack = document.querySelector(".go-back");
let buttonChange = document.querySelector(".container p");
let wrapperAddons = document.querySelector(".wrapper");
let pricePlan = document.querySelector("h5");
let nameTime = document.querySelector(".name-time");
let planPrice = document.querySelector(".plan-price");
let prices = document.querySelectorAll(".price");
let finalPrice = document.querySelector(".final-price");
let mainContainer = document.querySelector(".container-main");
let footer = document.querySelector("footer");

// locally stored values

let timePlan = localStorage.getItem("timeplan");
let planName = localStorage.getItem("plan");
let planCost = localStorage.getItem("price");
let addons = [];
let priceArray = [];
let numberArray = [];
let addon;
let value = 1;
let timeText;
let basePrice = 1;
let total = 0;

const settingPlanCost = () => {
    planPrice.textContent = planCost;
    pricePlan.textContent = `${planName} ${nameTime.textContent}`;
};

const gettingAddonInfo = () => {
    for(let i = 0; i < 3; i++) {
        addon = localStorage.getItem(`addon${value}`)
        if(addon != "") {
            addons.push(addon)
        }
        value++;
    };
};

const clickingOnConfirm = () => {
    buttonConfirm.onclick = () => {
        footer.classList.add("nodisplay");
        mainContainer.innerHTML = `<div class="logo"></div>
        <h2>Thank you!</h2>
        <p class="thanks-text">Thanks for confirming your subscription! We hope you have fun using our platform. 
        If you ever need support, please feel free to email us at support@loremgaming.com.</p>`
    };
};

const changingPlans = () => {
    buttonChange.onclick = () => {
        location.assign("./plan.html");
    };
};

const goingBack = () => {
    buttonGoBack.onclick = () => {
        location.assign("./addons.html");
    };
};

const createAddonPanel = (addon, basePrice, timeText) => {
    let panel = document.createElement("div");
    panel.classList.add("panel--addon");
    panel.innerHTML = `
    <p class="addon">${addon}</p>
    <p class="price">+$${basePrice}/${timeText}</p>`
    wrapperAddons.append(panel);
    prices = document.querySelectorAll(".price");
}

const gettingAddons = () => {
    addons.forEach(addon => {
        let basePrice = addon === "Online Services" ? 1 : 2;
        if(timePlan === "monthly") {
            timeText = "mo";
        } else if(timePlan === "yearly") {
            timeText = "yr";
            basePrice = basePrice * 10;
        }
        createAddonPanel(addon, basePrice, timeText);
    });
};

const calculateTotalPrice = () => {
    prices.forEach(price => {
        // converting NodeList to Array
        priceArray = Array.from(price.textContent)
        // reverse looping and removing non-number elements from array
        for(let i = priceArray.length - 1; i >= 0; i--) {
            let element = priceArray[i];
            if(isNaN(element)) {
                priceArray.splice(i, 1)
            } 
        } 
        let numberArray = priceArray.map((value) => {
            return Number(value)
        })
        // reducing each array down to the correct price
        number = numberArray.reduce((accum, digit) => (accum * 10) + digit, 0);
        total += number;
        finalPrice.textContent = `$${total}/yr`;
    });
};

goingBack();
changingPlans();
clickingOnConfirm();
settingPlanCost();
gettingAddonInfo();
gettingAddons();
calculateTotalPrice();


