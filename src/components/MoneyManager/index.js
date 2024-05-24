import {Component} from 'react'
import {v4} from 'uuid'

import TransactionItem from '../TransactionItem'
import MoneyDetails from '../MoneyDetails'

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    transactionsList: [],
    titleInput: '',
    amountInput: '',
    optionId: transactionTypeOptions[0].optionId,
  }

  deleteTransaction = id => {
    const {transactionsList} = this.state
    const updatedTransactionList = transactionsList.filter(
      eachTransaction => id !== eachTransaction.id,
    )

    this.setState({
      transactionsList: updatedTransactionList,
    })
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {titleInput, amountInput, optionId} = this.state
    const typeOption = transactionTypeOptions.find(
      eachTransaction => eachTransaction.optionId === optionId,
    )
    console.log(typeOption)
    const {displayText} = typeOption
    const newTransaction = {
      id: v4(),
      title: titleInput,
      amount: parseInt(amountInput),
      type: displayText,
    }

    this.setState(prevState => ({
      transactionsList: [...prevState.transactionsList, newTransaction],
      titleInput: '',
      amountInput: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  onChangeOptionId = event => {
    this.setState({optionId: event.target.value})
  }

  onChangeAmountInput = event => {
    this.setState({amountInput: event.target.value})
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  getExpenses = () => {
    const {transactionsList} = this.state
    let expensesAmount = 0

    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[1].displayText) {
        expensesAmount += eachTransaction.amount
      }
    })

    return expensesAmount
  }

  getIncome = () => {
    const {transactionsList} = this.state
    let incomeAmount = 0
    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      }
    })

    return incomeAmount
  }

  getBalance = () => {
    const {transactionsList} = this.state
    let balanceAmount = 0
    let incomeAmount = 0
    let expensesAmount = 0

    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      } else {
        expensesAmount += eachTransaction.amount
      }
    })

    balanceAmount = incomeAmount - expensesAmount

    return balanceAmount
  }

  render() {
    const {titleInput, amountInput, optionId, transactionsList} = this.state
    const balanceAmount = this.getBalance()
    const incomeAmount = this.getIncome()
    const expensesAmount = this.getExpenses()

    return (
      <div className="container mx-auto py-7 px-5 md:px-0 flex flex-col gap-5">
        <div className="profile-card p-9 flex flex-col gap-3 rounded-2xl">
          <h1 className="text-xl font-bold text-[#475569] ">Hi, Richard</h1>
          <p className="text-[#7e858e]">
            Welcome back to your{' '}
            <span className="text-[#0b69ff] font-bold">Money Manager</span>
          </p>
        </div>
        <MoneyDetails
          bal={balanceAmount}
          income={incomeAmount}
          expenses={expensesAmount}
        />
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="p-3 rounded-md py-4 px-3 border-[#7e858e] border-[1px] md:col-span-2 flex flex-col gap-3 ">
            <h1 className="font-bold text-xl text-[#334155]">
              Add Transaction
            </h1>
            <form
              className="flex flex-col gap-3"
              onSubmit={this.onAddTransaction}
            >
              <div className="flex gap-1 flex-col">
                <label htmlFor="TITLE">TITLE</label>
                <input
                  id="TITLE"
                  type="text"
                  className="border-[#7e858e] border-[1px] rounded-md px-3 py-1"
                  placeholder="TITLE"
                  value={titleInput}
                  onChange={e => this.setState({titleInput: e.target.value})}
                  required
                />
              </div>
              <div className="flex gap-1 flex-col">
                <label htmlFor="AMOUNT">AMOUNT</label>
                <input
                  id="AMOUNT"
                  type="number"
                  className="border-[#7e858e] border-[1px] rounded-md px-3 py-1"
                  placeholder="AMOUNT"
                  value={amountInput}
                  onChange={e => this.setState({amountInput: e.target.value})}
                  required
                />
              </div>
              <div className="flex gap-1 flex-col">
                <label htmlFor="TYPE">TYPE</label>
                <select
                  id="TYPE"
                  className="border-[#7e858e] border-[1px] rounded-md px-3 py-1"
                  value={optionId}
                  onChange={e => this.setState({optionId: e.target.value})}
                >
                  {transactionTypeOptions.map(each => (
                    <option key={each.optionId} value={each.optionId}>
                      {each.displayText}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="self-start py-1 px-3 bg-[#0b69ff] text-white rounded-md"
              >
                Add
              </button>
            </form>
          </div>
          <div className="p-3 rounded-md py-4 px-3 border-[#7e858e] border-[1px] md:col-span-3">
            <h1 className="font-bold text-xl text-[#334155]">History</h1>
            <ul className="">
              <li className="grid grid-cols-4">
                <p>Title</p>
                <p>Amount</p>
                <p>Type</p>
              </li>
              {transactionsList.map(each => (
                <TransactionItem
                  key={each.id}
                  TransactionDetial={each}
                  deleteTransaction={this.deleteTransaction}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
