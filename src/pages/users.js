import React, { useEffect, useState } from 'react'
import Table from '../components/Table'
import axiosInstance from '../utils/axios-instance'
const url = 'https://api-sdent.herokuapp.com/api/users'


const TABLE_HEADINGS = ['Full name', 'Email', 'Role', 'Joined at', 'Details']
const Users = () => {
  const [users, setUsers] = useState([])
  useEffect(() => {
    axiosInstance
      .get(url, {})
      .then(function (response) {
        setUsers(response.data.users)
      })
      .catch(function (error) {
        console.log(error.response)
      })
  }, [])
  console.log(users)
  return (
    <Table
      tableData={users}
      tableHeadings={TABLE_HEADINGS}
      searchFields={['name', 'email']}
      type={'USER'}
      filterBy={['role']}
      filterFields={['Any', 'Patient', 'Dentist', 'Assistant']}
    />
  )
}

export default Users
