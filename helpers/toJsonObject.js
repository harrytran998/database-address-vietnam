/**
 *
 * @param {Array} ignoreAttributes
 */
export const getJsonObject = (values, ignoreAttributes) => {
  if (ignoreAttributes) {
    ignoreAttributes.forEach(attr => {
      delete values[attr]
    })
  }
  return values
}
