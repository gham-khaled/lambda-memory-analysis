import Sidebar from '../partials/Sidebar'

const Home = () => {
	return (
		<div className='flex'>
			<Sidebar />
			<div className='bg-[#08141F]  w-full h-screen overflow-y-scroll  p-10 space-y-6'></div>
		</div>
	)
}

export default Home
