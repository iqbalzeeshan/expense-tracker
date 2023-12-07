import { useState } from "react";
import Expenses from "./Expenses";
import ExpenseFilter from "./ExpenseFilter";
import ExpenseForm from "./ExpenseForm";
import UsersList from "./UsersList";
import TodosList from "./TodosList";

export const categories = ["Utility", "Electric", "Grocery", "Others"];

function App() {
  const [expenses, setExpenses] = useState([
    { id: 1, description: "First Expense", amount: 10, category: "Utility" },
    { id: 2, description: "2nd Expense", amount: 10, category: "Utility" },
    { id: 3, description: "3rd Expense", amount: 10, category: "Electric" },
    { id: 4, description: "4th Expense", amount: 10, category: "Grocery" },
    { id: 5, description: "5th Expense", amount: 10, category: "Others" },
  ]);

  const [selectedCategory, setSelectedCategory] = useState("");

  const visibleExpense = selectedCategory
    ? expenses.filter((e) => e.category === selectedCategory)
    : expenses;

  return (
    <>
      <div className="p-3">
        <ExpenseForm
          onSubmit={(expense) =>
            setExpenses([...expenses, { ...expense, id: expenses.length + 1 }])
          }
        />
        <div className="mb-3">
          <ExpenseFilter
            onSelectedCategory={(category) => setSelectedCategory(category)}
          />
        </div>
        <Expenses
          expenses={visibleExpense}
          onDelete={(id) => setExpenses(expenses.filter((e) => e.id !== id))}
        />
      </div>
      <hr />
      <TodosList />
      <hr />
    </>
  );
}

export default App;
