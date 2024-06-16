/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useState } from 'react'

const AnalysisContext = createContext()

export const AnalysisProvider = ({ children }) => {
	const [selectedFunctions, setSelectedFunctions] = useState([])

	return (
		<AnalysisContext.Provider
			value={{
				selectedFunctions,
				setSelectedFunctions,
			}}
		>
			{children}
		</AnalysisContext.Provider>
	)
}

export default AnalysisContext
