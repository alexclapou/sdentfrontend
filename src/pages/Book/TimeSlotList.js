import TimeSlot from './TimeSlot'

const TimeSlotList = ({ time, state, setState }) => {
  if (!time || time.length === 0) return null
  return (
    <div className="my-4 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300 overflow-y-scroll  text-white rounded-md font-semibold  w-full   flex flex-col items-center h-80">
      {time.map((hour) => (
        <TimeSlot
          key={String(hour)}
          hour={
            String(hour.getHours()).padStart(2, '0') +
            ':' +
            String(hour.getMinutes()).padStart(2, '0')
          }
          hourToState={hour}
          state={state}
          setState={setState}
        />
      ))}
    </div>
  )
}

export default TimeSlotList
