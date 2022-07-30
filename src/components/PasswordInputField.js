import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import toCamelCase from '../utils/toCamelCase'

const PasswordInputField = ({ label, setState, register }) => {
  const camelCaseLabel = toCamelCase(label)
  const [showPassword, setShowPassword] = useState(false)

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="flex flex-col relative mb-4">
      <label htmlFor={label}>{label}</label>
      <input
        className="w-60 border-2 border-gray-200 rounded-sm mt-1.5 p-1.5 text-sm focus:outline-none focus:border-violet-300"
        type={showPassword ? 'text' : 'password'}
        {...register(camelCaseLabel, {
          onChange: (e) => {
            setState(e.target.value)
          },
          onBlur: (e) => {
            setState(e.target.value)
          }
        })}
      />
      <div
        className="absolute top-9 right-2 hover:cursor-pointer"
        onClick={toggleShowPassword}
      >
        {showPassword ? (
          <EyeOffIcon className="mr-2 h-5 w-5 inline" />
        ) : (
          <EyeIcon className="mr-2 h-5 w-5 inline" />
        )}
      </div>
    </div>
  )
}

export default PasswordInputField
