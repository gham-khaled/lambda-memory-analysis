/* eslint-disable react/prop-types */

import { IoCalendarClearSharp } from 'react-icons/io5'

const Header = ({ title = 'Dashboard' }) => {
	return (
		<div className='sticky top-0 z-10 bg-darkblue pt-10 pb-4'>
			<div className='flex flex-row justify-between items-center lg:ml-0 mt-2 text-white'>
				<div className='w-[70%] flex flex-row gap-x-4 ml-10 lg:ml-0 lg:gap-x-10 items-center'>
					<div className=''>{title}</div>
					<div className='bg-[#1A2833] text-xs p-2 font-extralight text-gray-200 pl-3 lg:pr-16 rounded-md'>
						Detail for 100010
					</div>
				</div>
				<div className='w-[30%] flex-row justify-end hidden lg:flex'>
					<div className='p-2 px-4 rounded-md lg:rounded-3xl gap-6 font-semibold flex flex-row items-center justify-between bg-[#1A2833]'>
						<IoCalendarClearSharp className='text-[20px] text-white'></IoCalendarClearSharp>
						<div className='font-normal text-xs'>June 13, 2024 | 9:00PM</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Header
