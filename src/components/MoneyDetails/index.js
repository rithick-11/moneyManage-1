import './index.css'

const MoneyDetails = props => {
  const {bal, income, expenses} = props
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      <div className="flex border-2 border-[#84cc16] bg-[#ecfccb] rounded-md p-4 gap-3">
        <img
          className="state-icon"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
          alt="balance"
        />
        <div>
          <p>Your Balance</p>
          <p data-testid="balanceAmount">Rs {bal}</p>
        </div>
      </div>
      <div className="flex border-2 border-[#06b6d4] bg-[#cffafe] rounded-md p-4 gap-3">
        <img
          className="state-icon"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png "
          alt="income"
        />
        <div>
          <p>Your Income</p>
          <p data-testid="incomeAmount">Rs {income}</p>
        </div>
      </div>
      <div className="flex border-2 border-[#7c3aed] bg-[#ede9fe] rounded-md p-4 gap-3">
        <img
          className="state-icon"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
          alt="expenses"
        />
        <div>
          <p>Your Expenses</p>
          <p data-testid="expensesAmount">Rs {expenses}</p>
        </div>
      </div>
    </div>
  )
}

export default MoneyDetails
