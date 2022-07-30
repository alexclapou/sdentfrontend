import { Tab } from '@headlessui/react'
import React from 'react'
import { useState } from 'react'
import InputField from '../components/InputField'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import axiosInstance from '../utils/axios-instance'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const url = 'https://api-sdent.herokuapp.com/api/users/change_settings'

const UserSettings = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const validationSchema = Yup.object().shape(
    {
      firstName: Yup.string().when(['lastName', 'email'], {
        is: (lastName, email) => lastName === '' && email === '',
        then: Yup.string().min(3).required()
      }),
      lastName: Yup.string().when(['firstName', 'email'], {
        is: (firstName, email) => firstName === '' && email === '',
        then: Yup.string().min(3).required()
      }),
      email: Yup.string()
        .email()
        .when(['firstName', 'lastName'], {
          is: (firstName, lastName) => firstName === '' && lastName === '',
          then: Yup.string().required()
        })
    },
    [
      ['firstName', 'lastName'],
      ['firstName', 'email'],
      ['lastName', 'email']
    ]
  )
  const formOptions = {
    mode: 'all',
    reValidateMode: 'all',
    resolver: yupResolver(validationSchema)
  }
  const { register, handleSubmit, formState } = useForm(formOptions)
  const onSubmit = () => {
    axiosInstance
      .post(
        url,
        {
          user_setting: {
            first_name: firstName,
            last_name: lastName,
            email: email
          }
        },
        { withCredentials: true }
      )
      .then(function (response) {
        toast.success('Settings changed succesfully')
      })
      .catch(function (error) {
        toast.error('An error has occured')
      })
  }

  return (
    <form action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
      <ToastContainer hideProgressBar={true} />
      <Tab.Panel className={'flex justify-center flex-col items-center p-6'}>
        <InputField
          label={'First name'}
          setState={setFirstName}
          register={register}
        />
        <InputField
          label={'Last name'}
          setState={setLastName}
          register={register}
        />
        <InputField label={'Email'} setState={setEmail} register={register} />
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

export default UserSettings
