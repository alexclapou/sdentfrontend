import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Dropdown from './Dropdown'
import Pagination from './Pagination'
import getBadgeStyle from '../utils/getBadgeStyle'
import { Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
const getTableHeadings = (tableHeadings) => {
  const headings = tableHeadings.map((heading) => (
    <th
      key={heading}
      className="p-5 text-sm font-semibold tracking-wide text-left"
    >
      {heading}
    </th>
  ))
  return (
    <thead className="bg-primary-color border-b-2 border-gray-100">
      <tr>{headings}</tr>
    </thead>
  )
}

const getAssistentDropdown = (assistant, onChange, rowData, index) => {
  return (
    <Dropdown
      values={assistant}
      onChange={(e) => onChange(e, index, rowData)}
    />
  )
}

const getTableDataRows = (tableData, type, onChange, rowPosition) => {
  let tableRowIndex = 0
  const rowData = tableData.map((rowData, index) => {
    const cellData = []
    for (let tableKey in rowData) {
      if (tableKey === 'id') continue
      let cell = (
        <td className="p-5 text-sm text-gray-700" key={tableKey}>
          {rowData[tableKey]}
        </td>
      )
      if (tableKey === 'role' || tableKey === 'status') {
        cell = (
          <td className="p-5 text-sm text-gray-700" key={tableKey}>
            {getBadgeStyle(rowData[tableKey])}
          </td>
        )
      }
      if (type === 'APPOINTMENT' && tableKey === 'assistant') {
        cell = (
          <td className="p-5 text-sm text-gray-700 w-1/4" key={tableKey}>
            {Array.isArray(rowData.assistant) ? (
              getAssistentDropdown(
                rowData.assistant,
                onChange,
                rowData,
                index + rowPosition
              )
            ) : (
              <p className="w-full lg:w-2/4  p-1.5 rounded-sm outline-0 text-sm">
                {rowData.assistant}
              </p>
            )}
          </td>
        )
      }
      if (tableKey !== '_id' && tableKey !== 'selectedAssistant') {
        cellData.push(cell)
      }
    }
    const detailsButton = (
      <td className="p-5 text-sm text-gray-700 w-32" key={uuidv4()}>
        <Link
          to={`${
            type === 'APPOINTMENT'
              ? `/appointments/${tableData[index + rowPosition].id}`
              : `/users/${tableData[index + rowPosition].id}`
          } `}
          className="border-2 primary-color border-important-color p-1.5 w-24 block text-center text-important hover:bg-important-color hover:text-white rounded-lg transition-colors"
        >
          Details
        </Link>
      </td>
    )
    cellData.push(detailsButton)
    tableRowIndex++
    return (
      <tr
        className={`${index % 2 === 0 ? 'bg-blue-50' : 'bg-white'}`}
        key={index}
      >
        {cellData}
      </tr>
    )
  })

  return <tbody>{rowData}</tbody>
}

const Table = ({
  tableData,
  tableHeadings,
  searchFields,
  filterFields,
  type,
  filterBy,
  onChange
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(5)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterTerm, setFilterTerm] = useState('')
  const [currentSearchField, setCurrentSearchField] = useState(searchFields[0])
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, filterTerm])

  const filteredData = tableData.filter((data) => {
    if (
      (data[currentSearchField].toLowerCase().includes(searchTerm) ||
        data[currentSearchField].includes(searchTerm)) &&
      (data[filterBy].toLowerCase().includes(filterTerm.toLowerCase()) ||
        filterTerm === 'Any')
    ) {
      return data
    }
  })
  const currentPosts = filteredData.slice(indexOfFirstPost, indexOfLastPost)

  const headings = getTableHeadings(tableHeadings)
  const rowData = getTableDataRows(currentPosts, type, onChange, 0)

  const handlePageClick = (e) => {
    setCurrentPage(e.selected + 1)
  }

  return (
    <div className="overflow-auto my-20 flex flex-col items-center justify-center">
      <div className={'flex border p-3 flex-row w-11/12 mx-auto '}>
        <label htmlFor="searchBar" className={'p-1.5'}>
          Search by
        </label>
        <select
          name=""
          id=""
          onChange={(e) => setCurrentSearchField(e.target.value)}
        >
          {searchFields.map((field) => (
            <option key={field}>{field}</option>
          ))}
        </select>
        <input
          type="text"
          id="searchBar"
          className={'ml-3 outline-none border text-sm p-1.5'}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className={'flex border p-3 flex-row w-11/12 mx-auto '}>
        <label htmlFor="searchBar" className={'p-1.5'}>
          Filter by {type === 'APPOINTMENT' ? 'status' : 'role'}
        </label>
        {filterFields.map((field) => (
          <label className="inline-flex items-center px-2" key={field}>
            <input
              type="radio"
              className="form-radio"
              name="user_role"
              value="personal"
              onClick={() => setFilterTerm(field)}
            />
            <span className="ml-2">{field}</span>
          </label>
        ))}
      </div>
      <table className="w-11/12 mx-auto border">
        {headings}
        {rowData}
      </table>
      {filteredData.length == 0 ? (
        <div className={'text-center mt-10 text-gray-500'}>No results...</div>
      ) : null}

      <ReactPaginate
        containerClassName="flex justify-center align-center p-2"
        pageClassName="flex text-sm border mx-4 py-2 px-4 bg-blue-500 text-white hover:cursor-pointer"
        breakLabel="..."
        previousLabel={false}
        nextLabel={false}
        forcePage={currentPage - 1}
        onPageChange={handlePageClick}
        pageRangeDisplayed={postsPerPage}
        pageCount={Math.ceil(filteredData.length / postsPerPage)}
        activeClassName={'bg-[#133C55]'}
      />
    </div>
  )
}

export default Table
