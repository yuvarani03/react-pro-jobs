import React from 'react'
const Page = ({ postsPerPage, totalPosts, paginate }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i)
    }
    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className="item">
                        <a href="!#" className="link" onClick={() => paginate(number)}>{number}</a>
                    </li>
                ))}

            </ul>
        </nav>
    )
}
export default Page