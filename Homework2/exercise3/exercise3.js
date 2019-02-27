
let incomes;
let expanses;

let localStorageIncomes = localStorage.getItem('incomes');
let localStorageExpanses = localStorage.getItem('expanses');


let i = 0; // index for tracking incomes
let e = 0; // index for tracking expanses

let incomeSum = 0;
let expanseSum = 0;

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];


function setMonth () {
    let monthParagraph = document.querySelector("#currentMonth");
    let d = new Date();
    monthParagraph.innerHTML = monthNames[d.getMonth()];
}


if(localStorageIncomes) {
   incomes = JSON.parse(localStorageIncomes);

    incomes.forEach(function(element) {
        element.id = i++;
        addItemToPage(element, 'income');
    });

}
else{
    incomes = [];
}

if(localStorageExpanses) {
    expanses = JSON.parse(localStorageExpanses);

    expanses.forEach(function(element) {
        element.id = e++;
        addItemToPage(element, 'expanse');

    });
}
else {
    expanses = [];
}


function calculateIncomesSum (){
    incomeSum = 0;
    incomes.forEach(function(element) {
        incomeSum += parseFloat(element.value);
    });

    let incomeSumSpan = document.getElementById('incomeSum');

    incomeSumSpan.innerHTML = incomeSum.toFixed(2);

}


function calculateExpanseSum (){
    expanseSum = 0;
    expanses.forEach(function(element) {
        expanseSum += parseFloat(element.value);
    });

    let expanseSumSpan = document.getElementById('expanseSum');

    expanseSumSpan.innerHTML = expanseSum.toFixed(2);

    expanses.forEach(function(element) {
        element.percent = (parseFloat(element.value)/expanseSum).toFixed(2) *100;
    });
}




function calculateBudget () {
    this.onCurrencyChange();

    // expanses percent in budget
    if((incomeSum) !== 0){
        expansePercent = (parseFloat(((expanseSum/incomeSum) *100).toFixed(2)/100) *100) ;
    }
    else {
        expansePercent = 0.00;
    }

    let expansePercentSpan = document.getElementById('expansePercent');
    expansePercentSpan.innerHTML = expansePercent + '%';
}

function onCurrencyChange () {
    let budgetSpan = document.getElementById('budget');
    let selectedCurrency = document.getElementById('currency').value;
    budgetSpan.innerHTML = (incomeSum - expanseSum).toFixed(2) + ' ' +selectedCurrency;
}


function onAdd() {

    let elem = document.getElementById("sign");
    let sign = elem.options[elem.selectedIndex].value;

    let description = document.getElementById("description").value;

    let value = document.getElementById("value").value;

    let item = {
        'sign' : sign,
        'description' : description,
        'value' : value
    };

    if(sign === '+'){
        item.id = i++;
        incomes.push(item);
        addItemToPage(item, 'income');
        calculateIncomesSum();
        calculateBudget();
        localStorage.setItem('incomes', JSON.stringify(incomes));
    }
    else{

        item.id = e++;
        expanses.push(item);
        calculateExpanseSum();
        addItemToPage(item, 'expanse');
        reloadHtml();

        localStorage.setItem('expanses', JSON.stringify(expanses));

        calculateIncomesSum();
        calculateExpanseSum();
        calculateBudget();
    }
}


function addItemToPage(item, id) {
    let table = document.getElementById(id);
    let tr = createNewItem(item);
    table.appendChild(tr);
}

function reloadHtml() {

    let table = document.getElementById('expanse');

    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }

    expanses.forEach(function(element) {
        let tr = createNewItem(element);
        table.appendChild(tr);
    });
}



function createNewItem(item) {

    let tr = document.createElement("tr");
    let td = document.createElement("td");
    let div = document.createElement("div");
    let span = document.createElement("span");

    td.innerHTML =  item.description;
    span.innerHTML = item.sign + parseFloat(item.value).toFixed(2);
    div.appendChild(span);
    td.appendChild(div);
    tr.appendChild(td);

    if(item.sign === '-') {
        div.setAttribute("class", "inline-block float-right  margin-15");
        span.setAttribute("class", "float-left");

        let iconTag = document.createElement("i");
        iconTag.setAttribute("class", "fa fa-times-circle");
        let onClickMethod = "removeItem(" +item.id+")";
        iconTag.setAttribute("onclick", onClickMethod);

        let percentSpan = document.createElement("span");
        percentSpan.innerHTML = item.percent+ '%';
        percentSpan.setAttribute("class", "percent-red float-right");
        percentSpan.appendChild(iconTag);
        div.appendChild(percentSpan);

        let deleteSpan = document.createElement("span");
        deleteSpan.setAttribute("class", "delete-btn float-right");
        deleteSpan.appendChild(iconTag);
        div.appendChild(deleteSpan);

    }
    else {
        div.setAttribute("class", "inline-block float-right");
    }

    return tr;
}


// function that removes item from Expanses array
function removeItem(id) {

    var foundIndex = expanses.findIndex(elem => elem.id === id);

    expanses.splice(foundIndex, 1);

    localStorage.setItem('expanses', JSON.stringify(expanses));

    calculateExpanseSum();

    calculateBudget();

    reloadHtml();
}


setMonth();

calculateIncomesSum();
calculateExpanseSum();
calculateBudget();