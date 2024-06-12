/* eslint-disable no-unused-vars */
import { useState } from 'react'
import sampleTableData from '../data/sampleTableData'

const CustomTable = () => {
	const [currentPage, setCurrentPage] = useState(1)
	const itemsPerPage = 3
	const totalPages = Math.ceil(sampleTableData.length / itemsPerPage)

	const handlePageChange = (page) => {
		setCurrentPage(page)
	}

	const startIndex = (currentPage - 1) * itemsPerPage
	const endIndex = startIndex + itemsPerPage
	const currentData = sampleTableData.slice(startIndex, endIndex)

	return (
		<div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
			<table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
				{/* table header */}
				<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
					{/* header rows */}
				</thead>
				<tbody>
					{currentData.map((data, index) => (
						<tr
							key={index}
							className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
						>
							{/* table rows */}
						</tr>
					))}
				</tbody>
			</table>
			<nav
				className='flex items-center flex-column flex-wrap md:flex-row justify-between pt-4'
				aria-label='Table navigation'
			>
				<span className='text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto'>
					Showing{' '}
					<span className='font-semibold text-gray-900 dark:text-white'>
						{startIndex + 1}-{Math.min(endIndex, sampleTableData.length)}
					</span>{' '}
					of{' '}
					<span className='font-semibold text-gray-900 dark:text-white'>
						{sampleTableData.length}
					</span>
				</span>
				<ul className='inline-flex -space-x-px rtl:space-x-reverse text-sm h-8'>
					{/* pagination links */}
				</ul>
			</nav>
		</div>
	)
}

export default CustomTable
