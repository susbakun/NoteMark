export const handleRadioButtonsCheck = (radioButtons: boolean[], selectedItemIndex: number) => {
  const newRadioButtons = radioButtons.map((_val, index) => {
    if (index === selectedItemIndex) {
      return true
    }
    return false
  })
  return newRadioButtons
}
