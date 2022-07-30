const getNextHour = (time) => {
  console.log(time)
  const hour = parseInt(time.split(':')[0])
  const minutes = parseInt(time.split(':')[1]) + '0'
  return (hour < 9 ? '0' + (hour + 1) : hour + 1) + ':' + minutes
}
const TimeSlot = ({ hour, hourToState, state, setState }) => {
  return (
    <div
      className={`p-3 mb-3 text-center transition-all table rounded-md ${
        state === hourToState ? 'bg-important-color' : 'bg-secondary-color'
      } hover:shadow-lg hover:cursor-pointer tracking-wide  w-10/12 h-10`}
      onClick={() => {
        setState(hourToState)
      }}
    >
      {hour} - {getNextHour(hour)}
    </div>
  )
}

export default TimeSlot
