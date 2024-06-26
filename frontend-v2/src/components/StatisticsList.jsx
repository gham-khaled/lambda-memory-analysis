/* eslint-disable react/prop-types */

import { BiMemoryCard, BiSolidMemoryCard } from 'react-icons/bi'
import Statistics from './Statistics'

import {
	AiFillCloseCircle,
	AiFillInfoCircle,
	AiFillSave,
	AiOutlineCustomerService,
	AiOutlineFieldTime,
	AiTwotoneAlert,
} from 'react-icons/ai'
import { Tooltip } from 'react-tooltip'
import ReactDOMServer from 'react-dom/server'
import { IoCalculator, IoContractOutline } from 'react-icons/io5'

const StatisticsList = ({ summary = {} }) => {
	const {
		allDurationInSeconds = 0.0,
		avgProvisionedMemoryMB = 0.0,
		MemoryCost = 0.0,
		InvocationCost = 0.0,
		totalCost = 0.0,
		avgMaxMemoryUsedMB = 0.0,
		potentialSavings = 0.0,
		avgDurationPerInvocation = 0.0,
	} = summary

	return (
		<div className='col-span-12 lg:col-span-12 space-y-4'>
			<div className='grid grid-cols-2 md:grid-cols-4  gap-x-12 gap-y-6'>
				<div
					className='cursor-pointer hover:scale-105 duration-150  '
					data-tooltip-place='bottom-end'
					data-tooltip-id='memoryCost'
					data-tooltip-html={ReactDOMServer.renderToStaticMarkup(
						<div className='text-white flex flex-row gap-x-2 items-center ≈'>
							<AiFillInfoCircle
								color='skyblue'
								className='text-[12px] md:text-[32px]  text-white p-1.5 rounded'
							/>
							{'$' + MemoryCost}
						</div>
					)}
				>
					<Tooltip id='memoryCost' />
					<Statistics
						title={'Memory Cost'}
						icon={
							<BiMemoryCard className='text-[25px] md:text-[32px]  text-white p-1.5 rounded' />
						}
						loadingQuery={false}
						query={'$' + MemoryCost}
					/>
				</div>
				<div
					className='cursor-pointer hover:scale-105 duration-150  '
					data-tooltip-place='bottom-end'
					data-tooltip-id='invocationCost'
					data-tooltip-html={ReactDOMServer.renderToStaticMarkup(
						<div className='text-white flex flex-row gap-x-2 items-center ≈'>
							<AiFillCloseCircle
								color='red'
								className='text-[12px] md:text-[32px]  text-white p-1.5 rounded'
							/>
							{'$' + InvocationCost}
						</div>
					)}
				>
					<Tooltip id='invocationCost' />
					<Statistics
						title='Invocation Cost'
						icon={
							<IoCalculator className='text-[25px] md:text-[32px]  text-white p-1.5 rounded' />
						}
						loadingQuery={false}
						query={'$' + InvocationCost}
					/>
				</div>
				<div className='cursor-pointer hover:scale-105 duration-150  '>
					<Statistics
						title='Total Cost'
						icon={
							<AiOutlineCustomerService className='text-[25px] md:text-[32px]  text-white p-1.5 rounded' />
						}
						loadingQuery={false}
						query={'$' + totalCost}
					/>
				</div>
				<div className='cursor-pointer hover:scale-105 duration-150  '>
					<Statistics
						title='Potential Savings'
						icon={
							<AiFillSave className='text-[25px] md:text-[32px]  text-white p-1.5 rounded' />
						}
						loadingQuery={false}
						query={'$' + potentialSavings}
					/>
				</div>
				<div className='cursor-pointer hover:scale-105 duration-150  '>
					<Statistics
						title={'Avg.Max Memory Used'}
						icon={
							<BiSolidMemoryCard className='text-[25px] md:text-[32px]  text-white p-1.5 rounded' />
						}
						loadingQuery={false}
						query={avgMaxMemoryUsedMB + ' MB'}
					/>
				</div>
				<div className='cursor-pointer hover:scale-105 duration-150  '>
					<Statistics
						title='Abg. Provisioned Memory'
						icon={
							<IoContractOutline className='text-[25px] md:text-[32px]  text-white p-1.5 rounded' />
						}
						loadingQuery={false}
						query={avgProvisionedMemoryMB + ' MB'}
					/>
				</div>
				<div className='cursor-pointer hover:scale-105 duration-150  '>
					<Statistics
						title='Avg Duration / Invocation'
						icon={
							<AiOutlineFieldTime className='text-[25px] md:text-[32px]  text-white p-1.5 rounded' />
						}
						loadingQuery={false}
						query={avgDurationPerInvocation + ' Sec'}
					/>
				</div>
				<div className='cursor-pointer hover:scale-105 duration-150  '>
					<Statistics
						title='Total Duration'
						icon={
							<AiTwotoneAlert className='text-[25px] md:text-[32px]  text-white p-1.5 rounded' />
						}
						loadingQuery={false}
						query={allDurationInSeconds + ' Sec'}
					/>
				</div>
			</div>
		</div>
	)
}

export default StatisticsList
