import { RIDE_PRICE } from './constants'
export function getTransactionsFromRide (rides) {
  const transations = rides.map(({ passengers, driver }) => {
    const rideCost = RIDE_PRICE / passengers.length
    return passengers.map(passenger => [passenger, driver, rideCost])
  })
  return Array.prototype.concat(...transations)
}

export function simplifyTransations (transactions) {
  // sorted array with sum of debit credit by user
  const balances = transactions.reduce((a, [debitor, creditor, amount]) => {
    const amountFloat = parseFloat(amount)
    const itemDebitor = a.find(item => item.id === debitor)
    const itemCreditor = a.find(item => item.id === creditor)
    if (itemDebitor) itemDebitor.value -= amountFloat
    else a.push({ id: debitor, value: -amountFloat })
    if (itemCreditor) itemCreditor.value += amountFloat
    else a.push({ id: creditor, value: +amountFloat })
    return a
  }, [])
  .sort((a, b) => a.value < b.value ? 1 : -1)

  // debtors array (with positive value to make calculate easier later)
  const debtors = balances.filter(item => item.value < 0)
  .map(item => {
    return {
      id: item.id,
      value: Math.abs(item.value)
    }
  })

  // debtors array
  const creditors = balances.filter(item => item.value > 0)

  const finalTransactions = []

  creditors.forEach(creditor => {
    for (let i = 0; i < debtors.length; i++) {
      const debtor = debtors[i]

      // store debit/credit
      const debit = debtor.value
      const credit = creditor.value

      // get smallest value in order to have creditor.value = 0 or debtor.value = 0
      const debt = Math.min(debit, credit)// .toFixed(2)

      // set and assign new debit/credit
      creditor.value = credit - debt
      debtor.value = debit - debt

      // push a new transaction if debt is not 0
      if (debt !== 0) finalTransactions.push([debtor.id, creditor.id, debt])

      // skip the end of debtors array if creditor is empty
      if (creditor.value === 0) break
    }
  })

  return finalTransactions
}

export function getDriverNamePerId (drivers, id) {
  return id !== undefined ? drivers[id].name : ''
}
