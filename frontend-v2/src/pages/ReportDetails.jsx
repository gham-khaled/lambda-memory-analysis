/* eslint-disable no-unused-vars */
import { BiSolidCategoryAlt } from 'react-icons/bi'
import Statistics from '../components/Statistics'
import Header from '../partials/Header'
import Sidebar from '../partials/Sidebar'
import { IoIosCube } from 'react-icons/io'
import { AiOutlineShop, AiOutlineUser } from 'react-icons/ai'
import { useParams } from 'react-router-dom'
import StatisticsList from '../components/StatisticsList'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { RotatingLines } from 'react-loader-spinner'
import { Toaster } from 'react-hot-toast'
import { customToast } from '../utils/utils'
import { errorMsgStyle, successMsgStyle } from '../data/optionsData'

const ReportDetails = () => {
	const { reportID } = useParams()

	const [analysis, setAnalysis] = useState([])
	const [summary, setSummary] = useState({})
	const [status, setStatus] = useState('processing...')
	const [currentReportID, setCurrentReportID] = useState(null)

	const [orderBy, setOrderBy] = useState('functionName')
	const [order, setOrder] = useState('asc')

	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	useEffect(() => {
		setLoading(true)
		const fetchData = async () => {
			// customToast('Report is being generated', 'ℹ️ℹ', errorMsgStyle)
			if (!currentReportID) {
				setCurrentReportID(reportID)
				// console.log('reportID is not set, skipping fetch')
				return // Skip fetching if reportID is not set or invalid
			}

			try {
				const response = await axios.get(
					`https://h4x9eobxve.execute-api.eu-west-1.amazonaws.com/prod/report?reportID=${currentReportID}`
				)

				setAnalysis(response.data.analysis)
				setSummary(response.data.summary)
				setStatus(response.data.status)
				console.log(response.data)
				customToast('Report details fetched successfully', '✅', successMsgStyle)
			} catch (error) {
				customToast('Error fetching report details', '❌', errorMsgStyle)
				console.error('Error fetching report details: ', error)
				setError(error)
			} finally {
				setLoading(false)
			}
		}

		setTimeout(fetchData, 3000)
	}, [currentReportID, reportID])

	return (
		<div className='flex'>
			<Toaster />
			<Sidebar />
			<div className='bg-darkblue w-full h-screen overflow-y-scroll p-10 pt-0 space-y-6 '>
				<Header title='Analysis | Dashboard'></Header>

				<div className='inline-flex'>
					<div className=' text-xs  font-semibold text-third-dark   rounded-md'>
						Detail Details for Report ID: {reportID}
					</div>
				</div>
				{status === 'Completed' ? (
					<div className='grid grid-cols-2 md:grid-cols-6  gap-x-6 gap-y-10 text-xs'>
						<StatisticsList />
					</div>
				) : status === 'processing...' ? (
					<div className='text-xs text-yellow-600'>Report is still processing</div>
				) : (
					status === 'Error' && (
						<div className='text-xs text-red-600'> Report generation failed</div>
					)
				)}
				<div className='flex justify-center items-center mt-28 h-[40%]'>
					{loading && (
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
					)}
				</div>
			</div>
		</div>
	)
}

export default ReportDetails
