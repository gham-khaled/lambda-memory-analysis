/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useState } from 'react'

const AnalysisContext = createContext()

export const AnalysisProvider = ({ children }) => {
	const [selectedFunctions, setSelectedFunctions] = useState([])
	const [currentReportID, setCurrentReportID] = useState(null)

	return (
		<AnalysisContext.Provider
			value={{
				selectedFunctions,
				setSelectedFunctions,
				currentReportID,
				setCurrentReportID,
			}}
		>
			{children}
		</AnalysisContext.Provider>
	)
}

export default AnalysisContext
