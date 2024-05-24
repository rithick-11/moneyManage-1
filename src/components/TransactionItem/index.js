const TransactionItem = prop => {
  const {deleteTransaction, TransactionDetial} = prop
  const {amount, id, title, type} = TransactionDetial
  return (
    <li className="grid grid-cols-4">
      <p>{title}</p>
      <p>Rs {amount}</p>
      <p>{type}</p>
      <div>
        <button data-testid="delete " onClick={() => deleteTransaction(id)}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
            alt="delete"
          />
        </button>
      </div>
    </li>
  )
}

export default TransactionItem
