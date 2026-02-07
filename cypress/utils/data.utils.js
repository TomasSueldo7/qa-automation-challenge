export const normalizeNumber = (text) => {
  return parseFloat(text.match(/[-]?\d+[.]?\d*/)[0])
}