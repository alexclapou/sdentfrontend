function getPrevNextMonths() {
  var monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  var today = new Date()
  var d
  var month
  let months1 = []
  let months2 = []

  for (var i = 6; i > 0; i -= 1) {
    d = new Date(today.getFullYear(), today.getMonth() - i, 1)
    month = monthNames[d.getMonth()]
    months1.push(month)
  }
  today = new Date()
  for (var ik = 5; ik >= 0; ik -= 1) {
    d = new Date(today.getFullYear(), today.getMonth() + ik, 1)
    month = monthNames[d.getMonth()]
    months2.push(month)
  }
  return months1.concat(months2.reverse())
}
export default getPrevNextMonths
