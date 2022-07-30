import getNextWorkingDay from './getNextWorkingDay'

function getAvailableHours(unavailable_dates, day) {
  if (unavailable_dates.length === 0) return []
  unavailable_dates = unavailable_dates.map(function (obj) {
    return new Date(obj['start_date'])
  })
  unavailable_dates = unavailable_dates.filter(function isMatchingDay(date) {
    let thisDay = new Date(day)
    return thisDay.toDateString() === date.toDateString()
  })
  let available_dates = []
  let starting_hour = new Date(day)
  if (starting_hour.toDateString() == getNextWorkingDay().toDateString())
    starting_hour.setHours(getNextWorkingDay().getHours(), 0, 0, 0)
  else starting_hour.setHours(8, 0, 0, 0)
  while (starting_hour.getHours() <= 18) {
    let hour_exist = false
    for (let i = 0; i < unavailable_dates.length; i++) {
      if (starting_hour.getTime() === unavailable_dates[i].getTime())
        hour_exist = true
    }
    if (!hour_exist) available_dates.push(starting_hour)

    starting_hour = new Date(starting_hour)
    starting_hour.setHours(starting_hour.getHours() + 1, 0, 0, 0)
  }
  available_dates = available_dates.filter(
    (date) => date.getHours() >= 8 && date.getHours() <= 18
  )
  return available_dates
}
export default getAvailableHours
