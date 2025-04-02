let amountInput = document.getElementById("newBudget");
let changeBtn = document.getElementById("Achange");
let expBtn = document.getElementById("Echange");
let exp = document.getElementById("newExp");
let newBudget = document.getElementById("newB");
const expensesList = document.getElementById("expenses-list");
const expDropdown = document.getElementById("exp");
let all = document.getElementById("total");
let emoji = document.getElementById("emoji");
let total = 0;

let hExpenses = [];

// hExpenses = JSON.parse(localStorage.getItem("history"));

if (hExpenses == null) {
    hExpenses = [];
}

for (let i = 0; i < hExpenses.length; i++) {
    let item = document.createElement("li")
    item.textContent = "-$" + hExpenses[i].amount.toFixed(2) + " " + hExpenses[i].category;
    item.style.color = "red";
    expensesList.appendChild(item);
}

function totalExp() {
    total = 0;
    for (let i = 0; i < hExpenses.length; i++) {
        total = total + hExpenses[i].amount;
    }
}

totalExp();

const account = new Account();

function move() {
    var elem = document.getElementById("myBar");
    var width = Math.round(total / localStorage.getItem("initialBal") * 100);
    if (width <= 100) {
        elem.style.width = width + '%';
        elem.innerHTML = width * 1 + '%';
    } else if (width > 100) {
        elem.style.width = 100 + '%';
        elem.innerHTML = width * 1 + '%'
    }
    if (width <= 20) {
        emoji.textContent = "😁";
    } else if (width > 20 && width <= 40) {
        emoji.textContent = "😃";
    } else if (width > 20 && width <= 40) {
        emoji.textContent = "🙂";
    } else if (width > 40 && width <= 60) {
        emoji.textContent = "😐";
    } else if (width > 60 && width <= 80) {
        emoji.textContent = "😰";
    } else if (width > 80 && width < 100) {
        emoji.textContent = "😱";
    } else if (width == 100) {
        emoji.textContent = "🫡";
    }
}

function reset() {
    localStorage.removeItem("currentBal");
    localStorage.removeItem("initialBal");
    localStorage.removeItem("history");
    window.location.reload();
}

function generateDropdown() {
    fetch("/api/categories")
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

function fetchExp() {
    fetch("/api/expenses")
        .then((response) => response.json())
        .then((data) => {
            expensesList.textContent = ""
            console.log(data)
            for (let i = 0; i < data.length; i++) {
                let del = document.createElement("button")
                del.textContent = "Delete Expense"
                let item = document.createElement("li")
                item.textContent = "-$" + data[i].amount + " " + data[i].category
                item.style.color = "red"
                expensesList.appendChild(item)
                expensesList.appendChild(del)

                del.addEventListener("click", () => {
                    fetch("/api/expenses", {
                        method: "DELETE",
            
                        body: JSON.stringify({id: data[i].id}),
            
                        headers: {
                            "Content-type": "application/json; charset=UTF-8"
                        }
                    })
                    .then(response => response.json())
                    .then(json => {expensesList.removeChild(item) 
                                   expensesList.removeChild(del)})
                })
            }
        });
}

fetchExp();

generateDropdown();

expBtn.addEventListener("click", () => {
    if (exp.value !== "") {
        let item = document.createElement("li");
        let amount = parseFloat(exp.value);
        let prefix = "";

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

        fetch("/api/expenses", {
            method: "POST",

            body: JSON.stringify(newExpense),

            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(response => response.json())
        .then(json => fetchExp())

        totalExp();

        move();
    }
});


changeBtn.addEventListener("click", () => {
    if (amountInput.value != "") {
        let amount = parseFloat(amountInput.value);
        account.balance = amount;

        newBudget.textContent = account.balance;

        localStorage.setItem("currentBal", account.balance);

        localStorage.setItem("initialBal", account.balance);
    }
});

if (localStorage.getItem("currentBal") != "") {
    account.balance = localStorage.getItem("currentBal");
    newBudget.textContent = account.balance;
}