import styled from 'styled-components'
import React from 'react'
import ReactPaginate from 'react-paginate'

const MyPaginate = styled(ReactPaginate).attrs({
  // You can redifine classes here, if you want.
  activeClassName: 'active' // default to "disabled"
})`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  list-style-type: none;
  padding: 0 5rem;
  li a {
    border-radius: 7px;
    padding: 0.1rem 1rem;
    border: gray 1px solid;
    cursor: pointer;
  }
  li.previous a,
  li.next a,
  li.break a {
    border-color: transparent;
  }
  li.active a {
    background-color: #0366d6;
    border-color: transparent;
    color: white;
    min-width: 32px;
  }
  li.disabled a {
    color: grey;
  }
  li.disable,
  li.disabled a {
    cursor: default;
  }
`

function Paginate() {
  return (
    <div className="commentBox">
      <MyPaginate pageCount={20} />
      <nav aria-label="Page navigation comments" className="mt-4">
        <ReactPaginate
          previousLabel="previous"
          nextLabel="next"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          pageCount={20}
          pageRangeDisplayed={4}
          marginPagesDisplayed={2}
          containerClassName="pagination justify-content-center"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          activeClassName="active"
          // eslint-disable-next-line no-unused-vars
          hrefBuilder={(page, pageCount, selected) =>
            page >= 1 && page <= pageCount ? `/page/${page}` : '#'
          }
          hrefAllControls
          onClick={(clickEvent) => {
            console.log('onClick', clickEvent)
            // Return false to prevent standard page change,
            // return false; // --> Will do nothing.
            // return a number to choose the next page,
            // return 4; --> Will go to page 5 (index 4)
            // return nothing (undefined) to let standard behavior take place.
          }}
        />
      </nav>
    </div>
  )
}

export default Paginate
