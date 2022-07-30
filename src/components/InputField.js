import toCamelCase from '../utils/toCamelCase'
const InputField = ({ label, setState, register }) => {
  const camelCaseLabel = toCamelCase(label)
  return (
    <div className="flex flex-col mb-4">
      <label htmlFor="Last name">{label}</label>
      <input
        className="w-60 border-2 border-gray-200 rounded-sm mt-1.5 p-1.5 text-sm focus:outline-none focus:border-violet-300"
        type="text"
        {...register(camelCaseLabel, {
          onChange: (e) => {
            setState(e.target.value)
          },
          onBlur: (e) => {
            setState(e.target.value)
          }
        })}
      />
    </div>
  )
}

export default InputField
