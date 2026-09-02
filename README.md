# SpendWise

A budgeting tool for gambling spending. Users set a budget, log losses against it as they go, and watch the remaining allowance shrink in real time. The starting budget can be seeded from a per-state average, since what counts as reasonable discretionary spending in Nevada isn't what it is in Vermont.

Live at [spendwise.eliashblum.com](https://spendwise.eliashblum.com).

## Why

A large share of the Las Vegas economy runs on gambling, and the spending is easy to lose track of across a night, let alone a year. SpendWise is an attempt at a tool that makes the running total visible instead of something you reconstruct from a bank statement later.

## Features

- **Budget tracking** — set a budget and log expenses against it; the remaining balance updates immediately
- **Location-aware baseline** — pick a state to seed the budget from a regional average
- **Categorized expenses** — fifteen spending categories, each with its own icon
- **Progress bar** — a visual meter of how much of the budget is gone, with an emoji that gets progressively less cheerful
- **Edit and delete** — modify or remove any logged expense through a confirmation modal
- **Accounts** — registration and login with bcrypt-hashed passwords
- **Resources page** — links and guidance on responsible spending habits

## Stack

| Layer | Technology |
| --- | --- |
| Server | Node.js, Express 4 |
| Database | MongoDB via Mongoose 8 |
| Auth | bcrypt |
| Frontend | Vanilla JavaScript, HTML, CSS |
| Hosting | Self-managed Ubuntu VPS behind NGINX |

No frontend framework and no build step. The client is plain ES modules served statically by Express.

## Getting started

**Prerequisites:** Node.js 18 or newer (the code uses JSON import attributes) and a running MongoDB instance.

```bash
git clone https://github.com/STORMTR00P3R/SpendWise.git
cd SpendWise
npm install
npm start
```

The server starts on port `8080` and connects to `mongodb://127.0.0.1:27017/betwise`. Both values are currently hardcoded in `server.js`.

Open `http://localhost:8080` for the tracker, or `/comp.html` for the compound budget view.

## Project structure

```
server.js              Express app, route mounting, Mongo connection
models/
  userSchema.js        Username and hashed password
  expenseSchema.js     Amount and category
routes/
  userRouter.js        Registration and login
  expenseRouter.js     Expense CRUD
  statesRouter.js      Serves states.json
  catagoryRouter.js    Serves cata.json
public/
  index.html           Main tracker
  comp.html            Compound budget view
  login.html           Login and registration
  re.html              Responsible spending resources
  js/
    account.js         Balance model
    app.js             Tracker logic and state selection
    comp.js            Compound budget, expense list, edit/delete modals
  images/              Category icons
states.json            Per-state budget averages
cata.json              Spending categories with examples
```

## Roadmap

- **Per-user data scoping.** Expenses currently have no owner field, so the collection is global. Adding a user reference to `expenseSchema` and filtering every query by the signed-in user is the next substantial piece of work.
- **Session management.** Login verifies credentials but issues nothing. Sessions or JWTs, plus auth middleware on the expense routes, follow directly from the point above.
- **Configuration via environment variables.** Port and Mongo URI should not be hardcoded.
- **Product comparison.** Translating a running loss total into equivalents — a month of groceries, a plane ticket — to make the number concrete.
- **Persistence of budget state.** Budget and progress live in `localStorage`; they should move server-side alongside the expenses.

## License

ISC