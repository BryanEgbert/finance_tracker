Perfect 👍 — here’s your **complete list of models (database-level / backend models)**, rewritten in a **simple, clean bullet-point format** using your preferred syntax:

---

### 🧑‍💼 User

* id UUID
* email string
* passwordHash string
* timezone string
* currency string
* createdAt time.Time
* updatedAt time.Time

---

### 🏦 Account

* id UUID
* user User
* name string
* balance float64
* createdAt time.Time
* updatedAt time.Time

---

### 🏷️ Category

* id UUID
* user User
* name string
* type string *(“income” | “expense”)*
* createdAt time.Time
* updatedAt time.Time

---

### 📋 Routines

* id UUID
* user User
* name string
* isActive bool
* createdAt time.Time
* updatedAt time.Time

---

### 🧩 Entry

* id UUID
* routines Routines
* category Category
* account Account
* type string *(“income” | “expense”)*
* amount float64
* description string
* frequency string *(“daily” | “weekly” | “monthly” | “yearly”)*
* daysOfWeek []string *(e.g., ["monday", "tuesday"])*
* dayOfMonth int *(e.g., 1 = 1st day of month)*
* startDate time.Time
* endDate time.Time
* isActive bool
* createdAt time.Time
* updatedAt time.Time

---

### 💵 Transaction

* id UUID
* user User
* account Account
* category Category
* pattern Pattern *(nullable)*
* type string *(“income” | “expense”)*
* amount float64
* note string
* date time.Time
* isFromPattern bool
* createdAt time.Time
* updatedAt time.Time

---

### 🪙 Budget

* id UUID
* user User
* name string
* allocationPercentage float64
* targetAmount float64
* currentAmount float64
* createdAt time.Time
* updatedAt time.Time

---

### 📈 NetWorthSnapshot

* id UUID
* user User
* date time.Time
* totalIncome float64
* totalExpense float64
* netWorth float64
* calculatedFrom string *(“daily” | “monthly” | “yearly”)*
* createdAt time.Time
* updatedAt time.Time