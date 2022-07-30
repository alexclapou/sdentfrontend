import { Tab } from '@headlessui/react'
import React from 'react'
import { useState } from 'react'
import PasswordInputField from '../components/PasswordInputField'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import axiosInstance from '../utils/axios-instance'
import { toast, ToastContainer } from 'react-toastify'

const url = 'http://localhost:3000/api/users/change_password'
const UserPassword = () => {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmedPassword, setConfirmedPassword] = useState('')
  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Old password is required'),
    newPassword: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('New password is required'),
    confirmedPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
      .required('Confirm Password is required')
  })
  const formOptions = {
    mode: 'all',
    reValidateMode: 'all',
    resolver: yupResolver(validationSchema)
  }
  const { register, handleSubmit, formState } = useForm(formOptions)
  const onSubmit = () => {
    axiosInstance
      .post(url, {
        old_password: oldPassword,
        new_password: newPassword,
        confirmed_password: confirmedPassword
      })
      .then(function (response) {
        toast.success('Password changed succesfully')
        console.log(response)
      })
      .catch(function (error) {
        toast.error('An error has occured')
        console.log(error)
      })
  }
  return (
    <form action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
      <ToastContainer hideProgressBar={true} />
      <Tab.Panel className={'flex justify-center flex-col items-center p-6'}>
        <PasswordInputField
          label="Old password"
          setState={setOldPassword}
          register={register}
        />
        <PasswordInputField
          label="New Password"
          setState={setNewPassword}
          register={register}
        />
        <PasswordInputField
          label="Confirmed Password"
          setState={setConfirmedPassword}
          register={register}
        />
        <button
          type="submit"
          className="group w-[7rem] relative flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-important-color focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-color 
                        disabled:bg-primary-color disabled:cursor-not-allowed cursor-pointer"
          disabled={!formState.isValid}
        >
          Save
        </button>
      </Tab.Panel>
    </form>
  )
}

export default UserPassword
