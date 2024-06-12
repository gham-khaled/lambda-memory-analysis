import { BiSolidCategoryAlt } from 'react-icons/bi'
import Statistics from '../components/Statistics'
import Sidebar from '../partials/Sidebar'
import { IoIosCube } from 'react-icons/io'
import { AiOutlineShop, AiOutlineUser } from 'react-icons/ai'

const Home = () => {
	return (
		<div className='flex'>
			<Sidebar />
			<div className='bg-darkblue  w-full h-screen overflow-y-scroll  p-10 space-y-6'>
				{/* Start of Header */}
				<div className='grid lg:grid-cols-12 lg:gap-5 space-y-5 lg:space-y-0'>
					<div className='lg:col-span-8 order-1 lg:order-none gap-16 flex  items-center '>
						<div className='text-white font-semibold w-[50%] flex flex-row space-x-12 items-center'>
							<p>Analytics Dashboard</p>
							<div className='flex  items-center pl-3 pr-6  py-2  border border-[#254059] bg-[#1A2833] drop-shadow-sm  rounded-md text-gray-300 font-light text-xs'>
								Details for 1717120531
							</div>
						</div>
					</div>
					{/* Profile Stion */}
					{/* <UserProfile custom={'bg-[#0C1924] text-white'}></UserProfile> */}
					{/* <div className=' bg-white'>date..</div> */}
				</div>{' '}
				{/* End of Header */}
				{/* Cards Stion */}
				{/* <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'></div>{' '} */}
				<div className='grid grid-cols-12 gap-0 pt-4'>
					<div className='col-span-12 lg:col-span-12 space-y-4'>
						<div className='grid grid-cols-2 md:grid-cols-4  gap-x-12 gap-y-6'>
							{/* TODO: check out the loading states */}
							<Statistics
								title={'Memory Cost'}
								icon={
									<BiSolidCategoryAlt className='text-[25px] md:text-[32px] bg-[#7660F9] text-white p-1.5 rounded'></BiSolidCategoryAlt>
								}
								loadingQuery={false}
								query='$0.00028182'
							></Statistics>
							<Statistics
								title='Invocation Cost'
								icon={
									<IoIosCube className='text-[25px] md:text-[32px] bg-[#00C8F4] text-white p-1.5 rounded'></IoIosCube>
								}
								loadingQuery={false}
								query='$0.0000002'
							></Statistics>
							<Statistics
								title='Total Cost'
								icon={
									<AiOutlineShop className='text-[25px] md:text-[32px] bg-[#3FD360] text-white p-1.5 rounded'></AiOutlineShop>
								}
								loadingQuery={false}
								query='$0.00028182'
							></Statistics>
							<Statistics
								title='Potential Savings'
								icon={
									<AiOutlineUser className='text-[25px] md:text-[32px] bg-[#F87700] text-white p-1.5 rounded'></AiOutlineUser>
								}
								loadingQuery={false}
								query='$0.00028182'
							></Statistics>

							<Statistics
								title={'Avg.Max Memory Used'}
								icon={
									<BiSolidCategoryAlt className='text-[25px] md:text-[32px] bg-[#7660F9] text-white p-1.5 rounded'></BiSolidCategoryAlt>
								}
								loadingQuery={false}
								query='85.5 MB'
							></Statistics>
							<Statistics
								title='Abg. Provisioned Memory'
								icon={
									<IoIosCube className='text-[25px] md:text-[32px] bg-[#00C8F4] text-white p-1.5 rounded'></IoIosCube>
								}
								loadingQuery={false}
								query='128 MB'
							></Statistics>
							<Statistics
								title='Avg Duration / Invocation'
								icon={
									<AiOutlineShop className='text-[25px] md:text-[32px] bg-[#3FD360] text-white p-1.5 rounded'></AiOutlineShop>
								}
								loadingQuery={false}
								query='1.00028182S'
							></Statistics>
							<Statistics
								title='Total Duration'
								icon={
									<AiOutlineUser className='text-[25px] md:text-[32px] bg-[#F87700] text-white p-1.5 rounded'></AiOutlineUser>
								}
								loadingQuery={false}
								query='135.0182S'
							></Statistics>
						</div>
					</div>
				</div>
				{/* End of Cards Stion */}
			</div>
		</div>
	)
}

export default Home
