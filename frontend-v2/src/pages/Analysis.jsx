/* eslint-disable no-unused-vars */
import { useState } from 'react'
import Header from '../partials/Header'
import Sidebar from '../partials/Sidebar'
import DynamicTable from '../partials/tables/DynamicTable'
import 'primereact/resources/themes/vela-green/theme.css'

import { Calendar } from 'primereact/calendar'
import { FloatLabel } from 'primereact/floatlabel'
import MultiSelect from '../components/MultiSelect'

import axios from 'axios'

import {
	runtime,
	packageOptions,
	architectureOptions,
} from '../data/optionsData'

const Analysis = () => {
	const [startDate, setStartDate] = useState(
		new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
	) // 5 days ago from the current date

	const [endDate, setEndDate] = useState(new Date()) // current date

	const columns = [
		{ Header: 'Function name', accessor: 'function_name' },
		{ Header: 'Runtime', accessor: 'runtime' },
		{ Header: 'All duration(s)', accessor: 'all_duration' },
		{ Header: 'Provisioned memory', accessor: 'provisioned_memory' },
		{ Header: 'Memory cost', accessor: 'memory_cost' },
		{ Header: 'Invocation cost', accessor: 'invocation_cost' },
		{ Header: 'Total cost', accessor: 'total_cost' },
		{ Header: 'Avg cost/invocation', accessor: 'avg_cost_per_invocation' },
	]

	const sampleData = [
		{
			function_name: 'FunctionA',
			runtime: '2ms',
			all_duration: 2.123456,
			provisioned_memory: 128,
			memory_cost: 0.00001,
			invocation_cost: 0.000001,
			total_cost: 0.000011,
			avg_cost_per_invocation: 0.0000055,
		},
		{
			function_name: 'FunctionA',
			runtime: '2ms',
			all_duration: 2.123456,
			provisioned_memory: 128,
			memory_cost: 0.00001,
			invocation_cost: 0.000001,
			total_cost: 0.000011,
			avg_cost_per_invocation: 0.0000055,
		},
		{
			function_name: 'FunctionA',
			runtime: '2ms',
			all_duration: 2.123456,
			provisioned_memory: 128,
			memory_cost: 0.00001,
			invocation_cost: 0.000001,
			total_cost: 0.000011,
			avg_cost_per_invocation: 0.0000055,
		},
		// More data objects...
	]

	const [selectedRuntime, setSelectedRuntime] = useState(runtime)
	const [selectedPackageOptions, setSelectedPackageOptions] =
		useState(packageOptions)

	const [selectedArchitectureOptions, setSelectedArchitectureOptions] =
		useState(architectureOptions)

	const [analysisID, setAnalysisID] = useState('')
	const [loading, setLoading] = useState(false)
	const [lambdaFunctions, setLambdaFunctions] = useState([])
	const [selectedFunctions, setSelectedFunctions] = useState([])
	const [openError, setOpenError] = useState(false)

	// HANDLER METHODS
	const handleFetchFunctions = async () => {
		console.log(
			selectedRuntime,
			selectedPackageOptions,
			selectedArchitectureOptions
		)
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
			console.log('functions: ', functions)
			setLambdaFunctions(functions)
			setSelectedFunctions(functions.map((func) => func.FunctionName))
			setLoading(false)
		} catch (error) {
			console.error('Error fetching lambda functions: ', error)
			setLoading(false)
		}
	}

	return (
		<div className='flex'>
			<Sidebar />
			<div className='bg-darkblue w-full h-screen overflow-y-scroll p-10 pt-0 space-y-6 '>
				<Header title='New Analysis'></Header>
				<div className='col-span-12 lg:col-span-12 space-y-4 pt-8'>
					<div className='grid grid-cols-2 md:grid-cols-6  gap-x-6 gap-y-10'>
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
							className='bg-[#00A9817D] text-white text-xs p-2 rounded-md'
							onClick={handleFetchFunctions}
							disabled={loading}
						>
							{loading ? 'Fetching...' : 'Fetch Lambda Fn'}
						</button>
					</div>
					<div className='pt-12'>
						<DynamicTable columns={columns} data={sampleData} />
					</div>{' '}
					{/* end of table holder */}
				</div>
			</div>
			{/* end of main content holder */}
		</div>
	)
}

export default Analysis
