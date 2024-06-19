/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useState } from 'react'

const AnalysisContext = createContext()

export const AnalysisProvider = ({ children }) => {
	const [selectedFunctions, setSelectedFunctions] = useState([])
	const [analysis, setAnalysis] = useState([])
	const [analysisDetail, setAnalysisDetail] = useState([])
	const [currentReportID, setCurrentReportID] = useState(null)
	const [rowsPerPage, setRowsPerPage] = useState(10)
	const [continuationToken, setContinuationToken] = useState('')

	const [summary, setSummary] = useState({})
	const [status, setStatus] = useState('processing...')

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
			}}
		>
			{children}
		</AnalysisContext.Provider>
	)
}

export default AnalysisContext
