/* eslint-disable no-unused-vars */
// import { BiSolidCategoryAlt } from 'react-icons/bi'
// import Statistics from '../components/Statistics'
import Sidebar from '../partials/Sidebar'
// import { IoIosCube } from 'react-icons/io'
// import { AiOutlineShop, AiOutlineUser } from 'react-icons/ai'
import Header from '../partials/Header'
import DynamicTable from '../partials/tables/DynamicTable'
// import CustomTable from '../partials/CustomTable'

const Home = () => {
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
			function_name: 'Function A',
			runtime: '2ms',
			all_duration: 2.123456,
			provisioned_memory: 128,
			memory_cost: 0.00001,
			invocation_cost: 0.000001,
			total_cost: 0.000011,
			avg_cost_per_invocation: 0.0000055,
		},
		{
			function_name: 'Function B',
			runtime: '2ms',
			all_duration: 2.123456,
			provisioned_memory: 121,
			memory_cost: 0.00001,
			invocation_cost: 0.000001,
			total_cost: 0.000011,
			avg_cost_per_invocation: 0.0000051,
		},
		{
			function_name: 'Function C',
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

	return (
		<div className='flex'>
			<Sidebar />
			<div className='bg-darkblue w-full h-screen overflow-y-scroll p-10 pt-0 space-y-6 '>
				<Header title='Analysis | Home'></Header>
				<div className='pt-8'>
					<DynamicTable columns={columns} data={sampleData} />
				</div>{' '}
				{/* end of table holder */}
			</div>
			{/* end of main content holder */}
		</div>
	)
}

export default Home
