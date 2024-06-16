import Header from '../partials/Header'
import Sidebar from '../partials/Sidebar'

const Dashboard = () => {
	// Date(startDate.setHours(0, 0, 0, 0)).toISOString()
	return (
		<div className='flex'>
			<Sidebar />
			<div className='bg-darkblue w-full h-screen overflow-y-scroll p-10 pt-0 space-y-6 '>
				<Header title='Dashboard'></Header>
				<div className='col-span-12 lg:col-span-12 space-y-4 pt-8'>
					<div className='grid grid-cols-2 md:grid-cols-6  gap-x-6 gap-y-10 text-xs'></div>
				</div>
			</div>
		</div>
	)
}

export default Dashboard
