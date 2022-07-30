import React from 'react'

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = []

  for (
    let postIndex = 1;
    postIndex <= Math.ceil(totalPosts / postsPerPage);
    postIndex++
  ) {
    pageNumbers.push(postIndex)
  }
  console.log(pageNumbers)

  return (
    <ul className="flex flex-row mt-10">
      {pageNumbers.map((number) => (
        <li
          key={number}
          onClick={() => paginate(number)}
          className={`w-8 text-sm border flex justify-center align-center p-1.5 hover:cursor-pointer ${
            currentPage == number ? 'bg-blue-500 text-white' : ''
          }`}
        >
          {number}
        </li>
      ))}
    </ul>
  )
}

export default Pagination
