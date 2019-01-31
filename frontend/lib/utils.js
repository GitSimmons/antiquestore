const ConvertToCurrency = (AmountInt) => {
  return (
    `${(AmountInt / 100).toFixed(2)}$`
  )
}
export { ConvertToCurrency }
