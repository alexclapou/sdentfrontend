import axiosInstance from '../utils/axios-instance'
import wrapPromise from './wrapPromise'

function fetchData(url) {
  const promise = axiosInstance
    .get(url, {})
    .then((res) => res)
    .then((res) => res.data)

  return wrapPromise(promise)
}

export default fetchData
