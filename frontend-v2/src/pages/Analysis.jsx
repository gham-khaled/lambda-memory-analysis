/* eslint-disable react/prop-types */
///* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from 'react'
import Header from '../partials/Header'
import Sidebar from '../partials/Sidebar'
import 'primereact/resources/themes/vela-green/theme.css'

import { Calendar } from 'primereact/calendar'
import { FloatLabel } from 'primereact/floatlabel'
import MultiSelect from '../components/MultiSelect'
import { RotatingLines } from 'react-loader-spinner'

import axios from 'axios'

import {
	runtime,
	packageOptions,
	architectureOptions,
} from '../data/optionsData'
import { InputText } from 'primereact/inputtext'
import AnalysisContext from '../contexts/AnalysisContext'
import { customToast } from '../utils/utils'
import { useNavigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

const Analysis = () => {
	const {
		selectedFunctions,
		setSelectedFunctions,
		// currentReportID,
		setCurrentReportID,
	} = useContext(AnalysisContext)

	const [startDate, setStartDate] = useState(
		new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
	) // 5 days ago from the current date

	const [endDate, setEndDate] = useState(new Date()) // current date

	const columns = [
		{ Header: 'Function name', accessor: 'FunctionName' },
		{ Header: 'Runtime', accessor: 'Runtime' },
		{ Header: 'PackageType', accessor: 'PackageType' },
		{ Header: 'LastModified', accessor: 'LastModified' },
	]

	const [selectedRuntime, setSelectedRuntime] = useState(runtime)
	const [selectedPackageOptions, setSelectedPackageOptions] =
		useState(packageOptions)

	const [selectedArchitectureOptions, setSelectedArchitectureOptions] =
		useState(architectureOptions)

	const [analysisID, setAnalysisID] = useState('')
	const [loading, setLoading] = useState(false)
	const [lambdaFunctions, setLambdaFunctions] = useState([])
	const navigate = useNavigate()

	const handleFetchFunctions = async () => {
		setLoading(true)
		try {
			const response = await axios.get(
				'https://h4x9eobxve.execute-api.eu-west-1.amazonaws.com/prod/lambdaFunctions?selectedRuntime=$[selectedRuntime]',
				{
					params: new URLSearchParams({
						selectedRuntime: selectedRuntime,
						selectedPackageType: selectedPackageOptions,
						selectedArchitecture: selectedArchitectureOptions,
					}),
				}
			)
			const functions = response.data
			setLambdaFunctions(functions)
			setSelectedFunctions(functions.map((func) => func.FunctionName))
			setLoading(false)
		} catch (error) {
			console.error('Error fetching lambda functions: ', error)
			setLoading(false)
		}
	}

	const handleLaunchAnalysis = async () => {
		const unixStartDate = new Date(startDate.setHours(0, 0, 0, 0)).toISOString()
		const unixEndDate = new Date(endDate.setHours(23, 59, 59, 999)).toISOString()
		// console.log(unixStartDate, unixEndDate)

		const reportID = analysisID || Math.floor(Date.now() / 1000) // Use analysisID if provided, otherwise use timestamp
		localStorage.setItem('reportID', reportID.toString())

		setCurrentReportID(reportID)

		const payload = {
			lambda_functions_name: selectedFunctions,
			report_id: reportID,
			start_date: unixStartDate,
			end_date: unixEndDate,
		}
		console.log(payload)
		setLoading(true)
		try {
			const response = await axios.post(
				'https://h4x9eobxve.execute-api.eu-west-1.amazonaws.com/prod/startExecution',
				payload
			)
			console.log(response)
			// TODO: Add message that it was successfully launched
			if (response.status === 200 && selectedFunctions.length !== 0) {
				customToast('Redirecting you to detail report dashboard... ', '🚀', {
					fontSize: '12px',
					border: '0.4px solid #787474',
					borderRadius: '5px',
					background: '#253645',
					color: '#fff',
				})
			}
			// TODO: Wait until a response is received and move to the Report ID details page
			// Wait for 3 seconds before redirecting
			setTimeout(() => {
				// Redirect to the new page, e.g., Report ID details page
				// navigate(`/report/${reportID}`)
				navigate(`/report/${reportID}`)
			}, 3000)
			setLoading(false)
		} catch (error) {
			console.error('Error fetching lambda functions: ', error)
			setLoading(false)
		}
	}

	const errorMsgStyle = {
		fontSize: '12px',
		border: '0.4px solid #787474',
		borderRadius: '5px',
		background: '#253645',
		color: '#fff',
	}

	return (
		<div className='flex'>
			<Toaster />
			<Sidebar />
			<div className='bg-darkblue w-full h-screen overflow-y-scroll p-10 pt-0 space-y-6 '>
				<Header title='Analysis | New'></Header>
				<div className='col-span-12 lg:col-span-12 space-y-4 pt-8'>
					<div className='grid grid-cols-2 md:grid-cols-6  gap-x-6 gap-y-10 text-xs'>
						<FloatLabel>
							<Calendar
								value={startDate}
								onChange={(e) => setStartDate(e.value)}
								showIcon
								showButtonBar
								className='bg-darkblueLight border-none text-white text-xs   rounded-md w-full'
								inputClassName='bg-darkblueLight text-white text-xs border-none px-2 py-2 rounded-md  '
							/>
							<label htmlFor='start_date'>Start Date</label>
						</FloatLabel>
						<FloatLabel>
							<Calendar
								value={endDate}
								onChange={(e) => setEndDate(e.value)}
								showIcon
								showButtonBar
								className='bg-darkblueLight border-none text-white text-xs   rounded-md w-full'
								inputClassName='bg-darkblueLight text-white text-xs border-none px-2 py-2  rounded-md'
							/>
							<label htmlFor='end_date'>End Date</label>
						</FloatLabel>
						<FloatLabel>
							<MultiSelect
								options={runtime}
								selectedValues={selectedRuntime}
								setSelectedValues={setSelectedRuntime}
								placeholder='Runtime'
							/>
							<label htmlFor='runtime'>Runtime</label>
						</FloatLabel>
						<FloatLabel>
							<MultiSelect
								options={packageOptions}
								selectedValues={selectedPackageOptions}
								setSelectedValues={setSelectedPackageOptions}
								placeholder='Package'
							/>
							<label htmlFor='package_option'>Package</label>
						</FloatLabel>
						<FloatLabel>
							<MultiSelect
								options={architectureOptions}
								selectedValues={selectedArchitectureOptions}
								setSelectedValues={setSelectedArchitectureOptions}
								placeholder='Architecture'
							/>
							<label htmlFor='architecture_option'>Architecture</label>
						</FloatLabel>
						<button
							className={`${!loading ? 'bg-[#00A9817D] ' : 'bg-gray-500'} text-white text-xs p-2 rounded-md text-wrap`}
							onClick={handleFetchFunctions}
							disabled={loading}
						>
							{loading ? 'Fetching...' : 'Fetch Lambda Fns'}
						</button>
					</div>
					{/* New analysis */}
					{lambdaFunctions.length !== 0 && (
						<div className='col-span-12 lg:col-span-12 space-y-4 pt-8'>
							<div className='grid grid-cols-2 md:grid-cols-6 text-[10px]  gap-x-6 gap-y-10'>
								<FloatLabel>
									<InputText
										id='analysis_id'
										value={analysisID}
										onChange={(e) => setAnalysisID(e.target.value)}
										className='bg-darkblueLight border-none text-white text-xs  py-2 px-6  rounded-md w-full'
									/>
									<label htmlFor='analysis_id'>Analysis ID (Optional)</label>
								</FloatLabel>

								<button
									className={`${!loading ? 'bg-lambdaPrimary' : 'bg-gray-500'} text-white text-xs py-1 rounded-md min-w-[100px] max-w-[180px] `}
									onClick={() => {
										if (selectedFunctions.length === 0) {
											customToast(
												'Please Fetch lambda fns and select at least one  before launching the analysis.',
												'❌',
												errorMsgStyle
											)
										} else {
											handleLaunchAnalysis()
										}
									}}
									disabled={loading}
								>
									{loading ? 'Fetching...' : 'New Analysis'}
								</button>
							</div>
						</div>
					)}
					<div className='pt-12'>
						<DynamicTable
							columns={columns}
							data={lambdaFunctions}
							loading={loading}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

const DynamicTable = ({ columns, data, loading = false }) => {
	const { setSelectedFunctions } = useContext(AnalysisContext)
	const [itemsPerPage, setItemsPerPage] = useState(5)
	const [currentPage, setCurrentPage] = useState(1)
	const [checkedItems, setCheckedItems] = useState({})
	const totalPages = Math.ceil(data.length / itemsPerPage)

	useEffect(() => {
		// Initialize or reset checkedItems state when data changes
		const newCheckedItems = {}
		data.forEach((item, index) => {
			newCheckedItems[index] = true // Initially, all items are checked
		})
		setCheckedItems(newCheckedItems)
	}, [data])

	const handlePageChange = (page) => {
		if (page > 0 && page <= totalPages) {
			setCurrentPage(page)
		}
	}

	const handleSelectAll = (e) => {
		const newCheckedItems = { ...checkedItems }
		Object.keys(newCheckedItems).forEach((key) => {
			newCheckedItems[key] = e.target.checked
		})
		setCheckedItems(newCheckedItems)
		const selected = Object.keys(newCheckedItems)
			.filter((key) => newCheckedItems[key])
			.map((key) => data[key])
		setSelectedFunctions(selected)
	}

	const handleSelectItem = (index, isChecked) => {
		const newCheckedItems = { ...checkedItems, [index]: isChecked }
		setCheckedItems(newCheckedItems)
		const selected = Object.keys(newCheckedItems)
			.filter((key) => newCheckedItems[key])
			.map((key) => data[key])
		setSelectedFunctions(selected)
	}

	const allChecked = Object.values(checkedItems).every(Boolean)
	const startIndex = (currentPage - 1) * itemsPerPage
	const endIndex = startIndex + itemsPerPage
	const currentData = data.slice(startIndex, endIndex)

	return (
		<>
			{data.length !== 0 ? (
				<div className='relative overflow-x-auto shadow-md sm:rounded-md'>
					<table className='w-full text-sm text-left rtl:text-right text-white border border-darkblueLight rounded-md'>
						<thead className='text-xs uppercase text-white bg-darkblueLight'>
							<tr>
								<th scope='col' className='px-6 py-3'>
									<input
										type='checkbox'
										checked={allChecked}
										onChange={handleSelectAll}
									/>
								</th>
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
									className={`${
										index % 2 === 0 ? 'bg-darkblueMedium' : 'bg-transparent'
									} cursor-pointer text-xs hover:bg-gray-50 dark:hover:bg-gray-600`}
								>
									<td className='px-6 py-3'>
										<input
											type='checkbox'
											checked={checkedItems[startIndex + index] || false}
											onChange={(e) =>
												handleSelectItem(startIndex + index, e.target.checked)
											}
										/>
									</td>
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
						className='flex  flex-col  md:flex-row justify-start md:justify-end pt-8 gap-x-16 gap-y-4 md:gap-y-0'
						aria-label='Table navigation'
					>
						<div className='text-xs font-light text-gray-500  '>
							Showing{' '}
							<span className='font-light text-gray-900 dark:text-white'>
								{startIndex + 1}-{Math.min(endIndex, data.length)}
							</span>{' '}
							of{' '}
							<span className='font-light text-gray-900 dark:text-white'>
								{data.length}
							</span>
						</div>
						<div className='flex  flex-row '>
							<label
								htmlFor='itemsPerPage'
								className='text-xs text-gray-500 flex items-center'
							>
								Records / page:
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
								<option value='5'>5</option>
								<option value='10'>10</option>
								<option value='50'>50</option>
								<option value='100'>100</option>
							</select>
						</div>
						<div className='flex flex-row'>
							<div className='flex items-center  md:mt-0 text-white space-x-8 cursor-pointer'>
								<div
									className='flex flex-row items-center text-white text-xs space-x-2'
									onClick={() => handlePageChange(currentPage - 1)}
								>
									<p
										className={`${
											currentPage === 1 ? ' text-gray-500 cursor-not-allowed' : ''
										}`}
									>
										{'<<'}
									</p>
									<button
										disabled={currentPage === 1}
										className={`${
											currentPage === 1
												? 'text-gray-500 cursor-not-allowed'
												: ' text-white'
										}`}
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
										className={`${
											currentPage === totalPages ? ' text-gray-500 cursor-not-allowed' : ''
										} ml-2`}
									>
										Next
									</button>
									<p
										className={`${
											currentPage === totalPages ? ' text-gray-500 cursor-not-allowed' : ''
										}`}
									>
										{'>>'}
									</p>
								</div>
							</div>
						</div>
					</nav>
				</div>
			) : (
				<div className='text-gray-400 text-center flex justify-center items-center h-28 text-md mt-10'>
					{loading ? (
						<RotatingLines
							visible={true}
							height='40'
							width='40'
							color='darkblueLight'
							strokeWidth='5'
							animationDuration='1'
							ariaLabel='rotating-lines-loading'
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

export default Analysis
