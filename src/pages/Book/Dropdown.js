import { useState } from 'react'

const getDropdownOptions = (dropdownValues) =>
  dropdownValues.map((value, idx) => (
    <option key={value.id} value={idx}>
      {value.name}
    </option>
  ))

const Dropdown = ({ values, onChange }) => {
  const selectOptions = getDropdownOptions(values)
  console.log(selectOptions)
  const handleDropdownChange = (e) => {
    setDropdownValue(e.target.value)
    onChange(e.target.value)
  }

  const [dropdownValue, setDropdownValue] = useState('')
  return (
    <select
      className="w-full lg:w-2/4 border border-slate-600 p-1.5 rounded-sm outline-0 mb-1.5"
      onChange={handleDropdownChange}
      value={dropdownValue}
    >
      {dropdownValue === '' ? <option>Select a dentist</option> : null}
      {selectOptions}
    </select>
  )
}

export default Dropdown
