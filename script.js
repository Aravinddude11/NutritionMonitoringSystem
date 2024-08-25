const button = document.getElementById("button-addon2");
const input = document.getElementById("input");

const carbohydratesElement = document.querySelector("li:nth-child(1) .float-end");
const cholesterolElement = document.querySelector("li:nth-child(2) .float-end");
const saturatedFatElement = document.querySelector("li:nth-child(3) .float-end");
const totalFatElement = document.querySelector("li:nth-child(4) .float-end");
const fiberElement = document.querySelector("li:nth-child(5) .float-end");
const potassiumElement = document.querySelector("li:nth-child(6) .float-end");
const sodiumElement = document.querySelector("li:nth-child(7) .float-end");
const sugarElement = document.querySelector("li:nth-child(8) .float-end");

const alertElement = document.querySelector(".alert-warning");
const itemNameElement = document.querySelector(".item-name");


function getRandomTime(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateActivityTimes() {
    const jogTime = getRandomTime(20, 90); 
    const yogaTime = getRandomTime(15, 60); 
    const gymTime = getRandomTime(30, 90); 
    const walkTime = getRandomTime(15, 120);

    
    document.querySelector('.jog-time').innerText = jogTime;
    document.querySelector('.yoga-time').innerText = yogaTime;
    document.querySelector('.gym-time').innerText = gymTime;
    document.querySelector('.walk-time').innerText = walkTime;
}


function resetValues() {
    
    carbohydratesElement.innerHTML = '0.00';
    cholesterolElement.innerHTML = '0.00';
    saturatedFatElement.innerHTML = '0.00';
    totalFatElement.innerHTML = '0.00';
    fiberElement.innerHTML = '0.00';
    potassiumElement.innerHTML = '0.00';
    sodiumElement.innerHTML = '0.00';
    sugarElement.innerHTML = '0.00';

    
    document.querySelector('.jog-time').innerText = '0';
    document.querySelector('.yoga-time').innerText = '0';
    document.querySelector('.gym-time').innerText = '0';
    document.querySelector('.walk-time').innerText = '0';

    
    alertElement.style.display = "none";
    itemNameElement.textContent = "";
    itemNameElement.classList.remove("highlight"); 
}

async function called(value) {
    if (value === "") {
        alert("Please enter the Food Item");
        return;
    }

    let options = {
        method: 'GET',
        headers: { 'x-api-key': 'VEP1LmzIkH/F9vAOGiL6rw==pjTajvWFjPXIRJ2q' }
    };

    let url = `https://api.api-ninjas.com/v1/nutrition?query=${encodeURIComponent(value)}`;

    try {
        let res = await fetch(url, options);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        let data = await res.json();
        processAuthorData(data, value);
    } catch (err) {
        console.error(`Error: ${err}`);
        resetValues(); 
        alertElement.style.display = "block"; 
    }
}

function processAuthorData(authorDataArr, itemName) {
   
    if (Array.isArray(authorDataArr) && authorDataArr.length > 0) {
        const {
            carbohydrates_total_g,
            cholesterol_mg,
            fat_saturated_g,
            fat_total_g,
            fiber_g,
            potassium_mg,
            sodium_mg,
            sugar_g,
        } = authorDataArr[0];

        
        carbohydratesElement.innerHTML = carbohydrates_total_g;
        cholesterolElement.innerHTML = cholesterol_mg;
        saturatedFatElement.innerHTML = fat_saturated_g;
        totalFatElement.innerHTML = fat_total_g;
        fiberElement.innerHTML = fiber_g;
        potassiumElement.innerHTML = potassium_mg;
        sodiumElement.innerHTML = sodium_mg;
        sugarElement.innerHTML = sugar_g;

        
        alertElement.style.display = "none";

        
        updateActivityTimes();

       
        itemNameElement.textContent = itemName.charAt(0).toUpperCase() + itemName.slice(1);
        itemNameElement.classList.add("highlight");
    } else {
        resetValues();
        alertElement.style.display = "block";
        alertElement.textContent = `Sorry! The item "${itemName.charAt(0).toUpperCase() + itemName.slice(1)}" is not available. Please enter a different item.`;
        console.log("No nutritional data found for this food item.");
    }
}

// Add event listener to the button
button.addEventListener("click", () => {
    called(input.value);
    input.value = ''; 
});




const bmiText = document.getElementById("bmi"); 
const descText = document.getElementById("desc"); 
const submitbmi = document.getElementById("submitbmi"); 
const resetbmi = document.getElementById("resetbmi"); 
const weight = document.getElementById("weight"); 
const height = document.getElementById("height");

submitbmi.addEventListener("click", onFormSubmit);
resetbmi.addEventListener("click", onFormReset);

function onFormReset() {
  bmiText.textContent = "";
  bmiText.className = ""; 
  descText.textContent = "N/A"; 
}

function onFormSubmit(e) {
  e.preventDefault(); 


  const weightValue = parseFloat(weight.value);
  const heightValue = parseFloat(height.value);


  if (isNaN(weightValue) || isNaN(heightValue) || weightValue <= 0 || heightValue <= 0) {
    alert("Please enter a valid weight and height");
    return;
  }

  // Calculate BMI
  const heightInMeters = heightValue / 100;
  const bmi = weightValue / Math.pow(heightInMeters, 2); 
  const desc = interpretBMI(bmi);

  bmiText.textContent = bmi.toFixed(2); 
  bmiText.className = desc; 
  descText.innerHTML = `You are <strong>${desc}</strong>`; 
}

function interpretBMI(bmi) {
  if (bmi < 18.5) {
    return "underweight";
  } else if (bmi < 25) {
    return "healthy";
  } else if (bmi < 30) {
    return "overweight";
  } else {
    return "obese";
  }
}





const elements =document.getElementsByClassName('block');
for(i=0;i<elements.length;i++){
    elements[i].addEventListener('click',function(){
        this.classList.toggle('active');
    })
}
