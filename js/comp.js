let amountInput = document.getElementById("newBudget");
let changeBtn = document.getElementById("Achange");
let expBtn = document.getElementById("Echange");
let exp = document.getElementById("newExp");
let newBudget = document.getElementById("newB");
const expensesList = document.getElementById("expenses-list");
const expDropdown = document.getElementById("exp");

let hExpenses = [];

const account = new Account();

function generateDropdown() {
    fetch("./exp.json")
        .then((response) => response.json())
        .then((data) => {
            data.forEach((expData) => {
                const opt = document.createElement("option");
                opt.value = expData.type;
                opt.textContent = expData.type;
                expDropdown.append(opt);
            });
        });
}

generateDropdown();

expBtn.addEventListener("click", () => {
    let item = document.createElement("li");
    let amount = parseFloat(exp.value);
    let prefix = "";
    console.log(amount)

    account.updateBalance(amount, "loss");
    item.style.color = "red";
    prefix = "-$";
    localStorage.setItem("currentBal", account.balance);

    item.textContent = prefix + amount.toFixed(2) + " " + expDropdown.value;
    expensesList.appendChild(item);
    amountInput.value = "";
    newBudget.textContent = account._balance;

    let newExpense = {
        amount,
        category: expDropdown.value
    };

    hExpenses.push(newExpense);


    localStorage.setItem("history", JSON.stringify(hExpenses));
});



changeBtn.addEventListener("click", () => {
    let amount = parseFloat(amountInput.value);
    account.balance = amount;

    newBudget.textContent = account.balance;

    localStorage.setItem("currentBal", account.balance);
});

if (localStorage.getItem("currentBal") != "") {
    account.balance = localStorage.getItem("currentBal");
    newBudget.textContent = account.balance;
}

//   expDropdown.addEventListener("change", () => {
//     fetch("./exp.json")
//       .then((response) => response.json())
//       .then((data) => {
//         const selectedExp = expDropdown.value;
//         const expData = data.find((dataObj) => dataObj.type === selectedExp);
//         account.updateLocation(expData);
//         balanceLabel.textContent = account.balance;
//       })
//       .catch((error) => console.error("Error fetching JSON:", error));
//   });