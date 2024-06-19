/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { BiSolidCategoryAlt } from 'react-icons/bi'
import Statistics from '../components/Statistics'
import Header from '../partials/Header'
import Sidebar from '../partials/Sidebar'
import { IoIosCube } from 'react-icons/io'
import { AiOutlineShop, AiOutlineUser } from 'react-icons/ai'
import { useParams } from 'react-router-dom'
import StatisticsList from '../components/StatisticsList'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { RotatingLines, ThreeDots } from 'react-loader-spinner'
import { Toaster } from 'react-hot-toast'
import { customToast } from '../utils/utils'
import { errorMsgStyle, successMsgStyle } from '../data/optionsData'
import AnalysisContext from '../contexts/AnalysisContext'
// import DynamicTable from '../partials/tables/DynamicTable'

const ReportDetails = () => {
	const { reportID } = useParams()

	const {
		analysis,
		setAnalysis,
		analysisDetail,
		summary,
		setSummary,
		status,
		setStatus,
		setAnalysisDetail,
	} = useContext(AnalysisContext)

	const [orderBy, setOrderBy] = useState('functionName')
	const [order, setOrder] = useState('asc')
	const [error, setError] = useState(null)

	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setSummary(analysisDetail.summary)
		setStatus(analysisDetail.status)
		setAnalysis(analysisDetail.analysis)
	}, [
		analysisDetail,
		reportID,
		status,
		summary,
		analysis,
		setAnalysis,
		setSummary,
		setStatus,
	])

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true)
			try {
				const response = await axios.get(
					`https://h4x9eobxve.execute-api.eu-west-1.amazonaws.com/prod/report?${reportID}`
				)
				if (response.status === 200) {
					setAnalysis(response.data.analysis)
					setAnalysisDetail(response.data)
					setSummary(response.data.summary)
					setStatus(response.data.status)

					setLoading(false)
					return response // Return response if successful
				}
			} catch (error) {
				customToast('Server is not responding', '❌', errorMsgStyle)
				// setMaxAttemptsReached(true)

				// console.error('Max attempts reached')
				throw error // Throw error on the last attempt
			}
		}

		fetchData()
	}, [reportID, setAnalysis, setSummary, setStatus])

	// useEffect(() => {
	// 	customToast('Server responded successfully', '✅', errorMsgStyle)
	// }, [])

	return (
		<div className='flex'>
			<Toaster />
			<Sidebar />
			<div className='bg-darkblue w-full h-screen overflow-y-scroll p-10 pt-0 space-y-6 '>
				<Header title='Analysis | Dashboard'></Header>

				<div className='inline-flex'>
					<div className=' text-sm  font-semibold text-third-dark   rounded-md'>
						Detail Details for: {reportID}
					</div>
				</div>
				{status === 'Completed' ? (
					<div className='grid grid-cols-2 md:grid-cols-6  gap-x-6 gap-y-10 text-xs'>
						<StatisticsList summary={summary} />
					</div>
				) : status === 'processing...' ? (
					<div className='text-xs text-yellow-600'>Report is still processing</div>
				) : (
					status === 'Error' && (
						<div className='text-xs text-red-600'> Report generation failed</div>
					)
				)}
				{loading && (
					<div className='flex justify-center items-center mt-28 h-[40%]'>
						<ThreeDots
							visible={true}
							height='40'
							width='40'
							color='#4fa94d'
							radius='9'
							ariaLabel='three-dots-loading'
							wrapperStyle={{}}
							wrapperClass=''
						/>
					</div>
				)}

				{status === 'Completed' && (
					<div className='pt-4'>
						{' '}
						<DynamicTable data={analysis} />{' '}
					</div>
				)}
			</div>
		</div>
	)
}

const DynamicTable = ({ data, loading = false }) => {
	const columns = [
		{ key: 'functionName', label: 'Function Name' },
		{ key: 'architecture', label: 'Architecture' },
		{ key: 'runtime', label: 'Runtime' },
		{ key: 'InvocationCost', label: 'Invocation Cost' },
		{ key: 'MemoryCost', label: 'Memory Cost' },
		{ key: 'allDurationInSeconds', label: 'Duration (s)' },
		{ key: 'avgCostPerInvocation', label: 'Avg Cost/Invocation' },
		{ key: 'avgDurationPerInvocation', label: 'Avg Duration/Invocation' },
		{ key: 'memoryExceededInvocation', label: 'Memory Exceeded Invocation' },
		{ key: 'optimalMemory', label: 'Optimal Memory' },
		{ key: 'optimalTotalCost', label: 'Optimal Total Cost' },
		{ key: 'overProvisionedMB', label: 'Over Provisioned (MB)' },
		{ key: 'potentialSavings', label: 'Potential Savings' },
		{ key: 'provisionedMemoryMB', label: 'Provisioned Memory (MB)' },
		{ key: 'maxMemoryUsedMB', label: 'Max Memory Used (MB)' },
		{ key: 'totalCost', label: 'Total Cost' },
		{ key: 'timeoutInvocations', label: 'Timeout Invocations' },
	]

	const [currentPage, setCurrentPage] = useState(1)
	const [itemsPerPage, setItemsPerPage] = useState(10)
	const [sortConfig, setSortConfig] = useState({
		key: null,
		direction: 'ascending',
	})

	const sortedData = React.useMemo(() => {
		let sortableItems = [...data]
		if (sortConfig !== null) {
			sortableItems.sort((a, b) => {
				if (a[sortConfig.key] < b[sortConfig.key]) {
					return sortConfig.direction === 'ascending' ? -1 : 1
				}
				if (a[sortConfig.key] > b[sortConfig.key]) {
					return sortConfig.direction === 'ascending' ? 1 : -1
				}
				return 0
			})
		}
		return sortableItems
	}, [data, sortConfig])

	const requestSort = (key) => {
		let direction = 'ascending'
		if (sortConfig.key === key && sortConfig.direction === 'ascending') {
			direction = 'descending'
		}
		setSortConfig({ key, direction })
	}

	const indexOfLastItem = currentPage * itemsPerPage
	const indexOfFirstItem = indexOfLastItem - itemsPerPage
	const currentData = sortedData.slice(indexOfFirstItem, indexOfLastItem)

	const handlePrevious = () => setCurrentPage(currentPage - 1)
	const handleNext = () => setCurrentPage(currentPage + 1)
	const handleItemsPerPageChange = (event) => {
		setItemsPerPage(Number(event.target.value))
		setCurrentPage(1) // Reset to first page to avoid empty data view
	}
	return (
		<>
			{data.length !== 0 ? (
				<div className='relative overflow-x-auto shadow-md sm:rounded-md'>
					<table className='w-full text-sm text-left rtl:text-right text-white border border-darkblueLight rounded-md'>
						<thead className='text-xs uppercase text-white bg-darkblueLight py-2'>
							<tr className='px-6 py-3 cursor-pointer '>
								{columns.map((column) => (
									<th
										key={column.key}
										scope='col'
										className='px-6 py-3  hover:text-third-dark transition-all duration-300 ease-in-out'
										onClick={() => requestSort(column.key)}
									>
										{column.label}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{/* className={`${index % 2 === 0 ? 'bg-darkblueMedium' : 'bg-transparent'} cursor-pointer text-xs hover:bg-gray-50 dark:hover:bg-gray-600 ${row.timeoutInvocations > 0 || row.overProvisionedMB > 0 ? 'text-red-500' : ''}`} */}
							{currentData.map((row, index) => (
								<tr
									key={index}
									className={`${index % 2 === 0 ? 'bg-darkblueMedium' : 'bg-transparent'} cursor-pointer text-xs hover:bg-gray-50 dark:hover:bg-gray-600 ${row.timeoutInvocations ? 'text-red-500' : ''} ${row.provisionedMemoryMB > row.optimalMemory * 2 ? 'text-yellow-500' : ''}`}
								>
									{columns.map((column) => (
										<td key={column.key} className='px-6 py-3'>
											{row[column.key]}
										</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
					<nav
						className='flex flex-col md:flex-row justify-start md:justify-end pt-8 gap-x-16 gap-y-4 md:gap-y-0'
						aria-label='Table navigation'
					>
						<div className='text-xs font-light text-gray-500'>
							Showing{' '}
							<span className='font-light text-gray-900 dark:text-white'>
								{indexOfFirstItem + 1}
							</span>{' '}
							to{' '}
							<span className='font-light text-gray-900 dark:text-white'>
								{indexOfLastItem > data.length ? data.length : indexOfLastItem}
							</span>{' '}
							of{' '}
							<span className='font-light text-gray-900 dark:text-white'>
								{data.length}
							</span>
						</div>
						<div className='flex flex-row'>
							<label
								htmlFor='itemsPerPage'
								className='text-xs text-gray-500 flex items-center'
							>
								Records / page:
							</label>
							<select
								id='itemsPerPage'
								value={itemsPerPage}
								onChange={handleItemsPerPageChange}
								className='ml-2 px-2 text-white border border-darkblueLight bg-darkblueMedium rounded-md text-xs focus:outline-none focus:ring-0'
							>
								<option value='5'>5</option>
								<option value='10'>10</option>
								<option value='50'>50</option>
								<option value='100'>100</option>
							</select>
						</div>
						<div className='flex flex-row'>
							<div className='flex items-center md:mt-0 text-white space-x-8 cursor-pointer'>
								<div className='flex flex-row items-center text-white text-xs space-x-2'>
									<p>{'<<'}</p>
									<button onClick={handlePrevious} disabled={currentPage === 1}>
										Previous
									</button>
								</div>
								<div className='flex flex-row items-center text-white text-xs space-x-2 cursor-pointer'>
									<button
										onClick={handleNext}
										disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
									>
										Next
									</button>
									<p>{'>>'}</p>
								</div>
							</div>
						</div>
					</nav>
				</div>
			) : (
				<div className='text-gray-400 text-center flex justify-center items-center h-28 text-md mt-10'>
					{loading ? (
						<ThreeDots
							visible={true}
							height='40'
							width='40'
							color='#4fa94d'
							radius='9'
							ariaLabel='three-dots-loading'
							wrapperStyle={{}}
							wrapperClass=''
						/>
					) : (
						<>Data is not available</>
					)}
				</div>
			)}
		</>
	)
}

export default ReportDetails
