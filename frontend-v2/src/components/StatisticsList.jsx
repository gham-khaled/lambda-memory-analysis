import { BiSolidCategoryAlt } from 'react-icons/bi'
import Statistics from './Statistics'
import { IoIosCube } from 'react-icons/io'
import { AiOutlineShop, AiOutlineUser } from 'react-icons/ai'

const StatisticsList = () => {
	return (
		<div className='col-span-12 lg:col-span-12 space-y-4'>
			<div className='grid grid-cols-2 md:grid-cols-4  gap-x-12 gap-y-6'>
				<Statistics
					title={'Memory Cost'}
					icon={
						<BiSolidCategoryAlt className='text-[25px] md:text-[32px]  text-white p-1.5 rounded'></BiSolidCategoryAlt>
					}
					loadingQuery={false}
					query='$0.00028182'
				></Statistics>
				<Statistics
					title='Invocation Cost'
					icon={
						<IoIosCube className='text-[25px] md:text-[32px]  text-white p-1.5 rounded'></IoIosCube>
					}
					loadingQuery={false}
					query='$0.0000002'
				></Statistics>
				<Statistics
					title='Total Cost'
					icon={
						<AiOutlineShop className='text-[25px] md:text-[32px]  text-white p-1.5 rounded'></AiOutlineShop>
					}
					loadingQuery={false}
					query='$0.00028182'
				></Statistics>
				<Statistics
					title='Potential Savings'
					icon={
						<AiOutlineUser className='text-[25px] md:text-[32px]  text-white p-1.5 rounded'></AiOutlineUser>
					}
					loadingQuery={false}
					query='$0.00028182'
				></Statistics>

				<Statistics
					title={'Avg.Max Memory Used'}
					icon={
						<BiSolidCategoryAlt className='text-[25px] md:text-[32px]  text-white p-1.5 rounded'></BiSolidCategoryAlt>
					}
					loadingQuery={false}
					query='85.5 MB'
				></Statistics>
				<Statistics
					title='Abg. Provisioned Memory'
					icon={
						<IoIosCube className='text-[25px] md:text-[32px]  text-white p-1.5 rounded'></IoIosCube>
					}
					loadingQuery={false}
					query='128 MB'
				></Statistics>
				<Statistics
					title='Avg Duration / Invocation'
					icon={
						<AiOutlineShop className='text-[25px] md:text-[32px]  text-white p-1.5 rounded'></AiOutlineShop>
					}
					loadingQuery={false}
					query='1.00028182S'
				></Statistics>
				<Statistics
					title='Total Duration'
					icon={
						<AiOutlineUser className='text-[25px] md:text-[32px]  text-white p-1.5 rounded'></AiOutlineUser>
					}
					loadingQuery={false}
					query='135.0182S'
				></Statistics>
			</div>
		</div>
	)
}

export default StatisticsList
