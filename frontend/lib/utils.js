const ConvertToCurrency = (AmountInt) => {
  return (
    `${(AmountInt / 100).toFixed(2)}$`
  )
}

const debounce = (fn, time) => {
  let timeout

  return function () {
    const functionCall = () => fn.apply(this, arguments)
    clearTimeout(timeout)
    timeout = setTimeout(functionCall, time)
  }
}

export { ConvertToCurrency, debounce }
