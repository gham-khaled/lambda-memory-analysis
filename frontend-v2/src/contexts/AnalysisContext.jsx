/* eslint-disable react/prop-types */

import { createContext, useState } from 'react'
import {
	architectureOptions,
	packageOptions,
	runtime,
} from '../data/optionsData'

const AnalysisContext = createContext()

export const AnalysisProvider = ({ children }) => {
	const [selectedFunctions, setSelectedFunctions] = useState(['all']) // default value is ['all']
	const [analysis, setAnalysis] = useState([])
	const [analysisDetail, setAnalysisDetail] = useState([])
	const [currentReportID, setCurrentReportID] = useState(null)
	const [rowsPerPage, setRowsPerPage] = useState(5)
	const [continuationToken, setContinuationToken] = useState('')

	const [startDate, setStartDate] = useState(
		new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 7 days ago from the current date
	)
	const [endDate, setEndDate] = useState(new Date())

	const [summary, setSummary] = useState({})
	const [status, setStatus] = useState('processing...')

	const [initialRuntime, setInitialRuntime] = useState(runtime)
	const [selectedRuntime, setSelectedRuntime] = useState([])

	const [initialPackageOptions, setInitialPackageOptions] =
		useState(packageOptions)
	const [selectedPackageOptions, setSelectedPackageOptions] = useState([])

	const [initialArchitectureOptions, setInitialArchitectureOptions] =
		useState(architectureOptions)
	const [selectedArchitectureOptions, setSelectedArchitectureOptions] = useState(
		[]
	)

	return (
		<AnalysisContext.Provider
			value={{
				selectedFunctions,
				setSelectedFunctions,
				currentReportID,
				setCurrentReportID,
				analysis,
				setAnalysis,
				analysisDetail,
				setAnalysisDetail,
				rowsPerPage,
				setRowsPerPage,
				continuationToken,
				setContinuationToken,
				summary,
				setSummary,
				status,
				setStatus,
				startDate,
				setStartDate,
				endDate,
				setEndDate,
				selectedRuntime,
				setSelectedRuntime,
				initialRuntime,
				setInitialRuntime,
				selectedPackageOptions,
				setSelectedPackageOptions,
				initialPackageOptions,
				setInitialPackageOptions,
				initialArchitectureOptions,
				setInitialArchitectureOptions,
				selectedArchitectureOptions,
				setSelectedArchitectureOptions,
			}}
		>
			{children}
		</AnalysisContext.Provider>
	)
}

export default AnalysisContext
