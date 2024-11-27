let amountInput = document.getElementById("newBudget");
let changeBtn = document.getElementById("Achange");
let expBtn = document.getElementById("Echange");
let exp = document.getElementById("newExp");
let newBudget = document.getElementById("newB");
let amountType = document.getElementById("type");

const account = new Account();

expBtn.addEventListener("click", () => {
  let amount = parseFloat(exp.value);
  sdew3;
  let type = amountType.value;
  if (type == "loss") {
    account.updateBalance(amount, type);
  } else {
    account.updateBalance(amount, type);
  }

  localStorage.setItem("currentBal", account.balance);
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
