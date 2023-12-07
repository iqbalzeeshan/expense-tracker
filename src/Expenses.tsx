interface Expenses {
  id: number;
  description: string;
  amount: number;
  category: string;
}

interface Props {
  expenses: Expenses[];
  onDelete: (id: number) => void;
}

const Expenses = ({ expenses, onDelete }: Props) => {
  if (expenses.length === 0) return null;
  return (
    <>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Description</th>
            <th scope="col">Amount</th>
            <th scope="col">Category</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, i) => (
            <tr key={i}>
              <th scope="row">{expense.id}</th>
              <td>{expense.description}</td>
              <td>$ {expense.amount}</td>
              <td>{expense.category}</td>
              <td>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => onDelete(expense.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>&nbsp;</td>
            <th>Total</th>
            <td>
              $&nbsp;
              {expenses
                .reduce((acc, expense) => expense.amount + acc, 0)
                .toFixed(2)}
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  );
};

export default Expenses;
