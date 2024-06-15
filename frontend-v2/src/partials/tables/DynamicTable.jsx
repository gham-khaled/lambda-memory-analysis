/* eslint-disable react/prop-types */

import { useState } from 'react'

const DynamicTable = ({ columns, data }) => {
	const [itemsPerPage, setItemsPerPage] = useState(2)
	const [currentPage, setCurrentPage] = useState(1)
	const totalPages = Math.ceil(data.length / itemsPerPage)

	const handlePageChange = (page) => {
		if (page > 0 && page <= totalPages) {
			setCurrentPage(page)
		}
	}

	const startIndex = (currentPage - 1) * itemsPerPage
	const endIndex = startIndex + itemsPerPage
	const currentData = data.slice(startIndex, endIndex)

	return (
		<div className='relative overflow-x-auto shadow-md sm:rounded-md'>
			<table className='w-full text-sm text-left rtl:text-right text-white border border-darkblueLight rounded-md'>
				<thead className='text-xs uppercase text-white bg-darkblueLight'>
					<tr>
						{columns.map((column) => (
							<th key={column.accessor} scope='col' className='px-6 py-3'>
								{column.Header}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{currentData.map((row, index) => (
						<tr
							key={index}
							className={`${index % 2 === 0 ? 'bg-darkblueMedium' : 'bg-transparent'} cursor-pointer text-xs hover:bg-gray-50 dark:hover:bg-gray-600`}
						>
							{columns.map((column) => (
								<td key={column.accessor} className='px-6 py-3'>
									{column.Cell
										? column.Cell(row[column.accessor])
										: row[column.accessor]}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
			<nav
				className='flex items-center flex-column flex-wrap md:flex-row justify-end pt-8 gap-x-16'
				aria-label='Table navigation'
			>
				<div className='text-xs font-light text-gray-500 w-[80%] dark:text-gray-400 mb-4 md:mb-0 block  md:inline md:w-auto'>
					Showing{' '}
					<span className='font-light text-gray-900 dark:text-white'>
						{startIndex + 1}-{Math.min(endIndex, data.length)}
					</span>{' '}
					of{' '}
					<span className='font-light text-gray-900 dark:text-white'>
						{data.length}
					</span>
				</div>
				<div className='flex   '>
					<label
						htmlFor='itemsPerPage'
						className='text-xs text-gray-500 flex items-center'
					>
						Records per page:
					</label>
					<select
						id='itemsPerPage'
						className='ml-2 px-2 text-white  border border-darkblueLight bg-darkblueMedium rounded-md text-xs focus:outline-none focus:ring-0  '
						value={itemsPerPage}
						onChange={(e) => {
							const value = parseInt(e.target.value)
							if (!isNaN(value)) {
								handlePageChange(1)
								setItemsPerPage(value)
							} else {
								setItemsPerPage(value)
							}
						}}
					>
						<option value='2'>2</option>
						<option value='3'>3</option>
						<option value='20'>20</option>
						<option value='50'>50</option>
					</select>
				</div>
				<div className='flex flex-row'>
					<div className='flex items-center mt-4 md:mt-0 text-white space-x-8 cursor-pointer'>
						<div
							className='flex flex-row items-center text-white text-xs space-x-2'
							onClick={() => handlePageChange(currentPage - 1)}
						>
							<p
								className={`${currentPage === 1 ? ' text-gray-500 cursor-not-allowed' : ''}`}
							>
								{'<<'}
							</p>
							<button
								disabled={currentPage === 1}
								className={`${currentPage === 1 ? 'text-gray-500 cursor-not-allowed' : ' text-white'}`}
							>
								Previous
							</button>
						</div>
						<div
							className='flex flex-row items-center text-white text-xs space-x-2 cursor-pointer'
							onClick={() => handlePageChange(currentPage + 1)}
						>
							<button
								disabled={currentPage === totalPages}
								className={`${currentPage === totalPages ? ' text-gray-500 cursor-not-allowed' : ''} ml-2`}
							>
								Next
							</button>
							<p
								className={`${currentPage === totalPages ? ' text-gray-500 cursor-not-allowed' : ''}`}
							>
								{'>>'}
							</p>
						</div>
					</div>
				</div>
			</nav>
		</div>
	)
}

export default DynamicTable
