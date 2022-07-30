import { useState } from 'react'

const getDropdownOptions = (dropdownValues) => {
  if (Array.isArray(dropdownValues)) {
    return dropdownValues.map((value, idx) => (
      <option key={value.id || idx} value={idx}>
        {value.name || value}
      </option>
    ))
  } else {
    return <p>dropdownValues</p>
  }
}

const Dropdown = ({ values, onChange, rowData }) => {
  const selectOptions = getDropdownOptions(values)

  const handleDropdownChange = (e) => {
    setDropdownValue(e.target.value)
    onChange(e)
  }

  const [dropdownValue, setDropdownValue] = useState()
  return (
    <select
      className="w-full lg:w-2/4  p-1.5 rounded-sm outline-0 text-sm"
      onChange={handleDropdownChange}
      value={dropdownValue}
    >
      {!dropdownValue ? <option>Select an assistant</option> : null}
      {selectOptions}
    </select>
  )
}

export default Dropdown
