function toCamelCase(string) {
  var regex = /\s+(\w)?/gi
  var stringToCamelCase = string
    .toLowerCase()
    .replace(regex, function (match, letter) {
      return letter.toUpperCase()
    })
  return stringToCamelCase
}

export default toCamelCase
