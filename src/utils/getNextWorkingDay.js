function getNextWorkingDay() {
  return new Date().getDay() === 6 || new Date().getDay() === 0
    ? new Date(
        new Date().setDate(
          new Date().getDate() + ((((7 - new Date().getDay()) % 7) + 1) % 7)
        )
      )
    : new Date()
}
export default getNextWorkingDay
