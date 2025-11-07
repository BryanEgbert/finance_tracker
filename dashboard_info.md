| Dashboard Widget                       | Data Source                                                           | Calculation                                         |
| -------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------- |
| 💰 **Net Worth (current)**             | `net_worth_snapshots` (latest by date)                                | `total_income - total_expense` or from accounts sum |
| 📆 **Monthly Income & Expenses**       | `transactions` filtered by current month                              | `SUM(amount)` grouped by `type`                     |
| 📊 **Expense Breakdown (by category)** | `transactions` for current month                                      | `SUM(amount)` `GROUP BY category_id`                |
| 🧾 **Recent Transactions**             | `transactions` ordered by `date DESC`                                 | limit 5–10 rows                                     |
| 📈 **1-Year Outlook (projection)**     | combine `net_worth_snapshots` (to date) + future from `pattern_items` | simulation                                          |
| 🏦 **Budgets/Allocations**             | `budgets` + `transactions`                                            | `% spent = total_expense / target_amount`           |
