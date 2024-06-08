/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { BsFillPinAngleFill, BsPersonCircle } from 'react-icons/bs'
import { TbRulerMeasure } from 'react-icons/tb'
import { IoIosCube } from 'react-icons/io'
import {
	BiLogOut,
	BiSolidCategoryAlt,
	BiMenu,
	BiGitBranch,
} from 'react-icons/bi'
import { LiaWindowClose } from 'react-icons/lia'
import { AiOutlineMenuFold, AiFillShop } from 'react-icons/ai'

const Sidebar = () => {
	const [sidebarOpen, setSidebarOpen] = useState(false)
	const [activePage, setActivePage] = useState('Dashboard')
	return (
		<>
			<BiMenu className='absolute ml-8 mt-12 lg:hidden text-third-dark rounded bg-white text-3xl'></BiMenu>
			<div
				className={`bg-[#0C1924]  h-screen hidden lg:block ${
					sidebarOpen ? 'w-[6vw] px-2 py-10' : 'w-[20vw] p-10 '
				} transition-all duration-300 ease-in-out`}
			>
				<div className='relative h-full'>
					<div
						className={`${
							sidebarOpen ? 'flex-col' : ''
						} flex justify-between items-center`}
					>
						<div>
							{sidebarOpen ? (
								<>
									{/* <img className='w-10 mx-auto' src={Gebeya} alt='Gebeya Logo'></img> */}
								</>
							) : (
								<>
									{/* <img className='w-32 mb-1' src={LogoLight} alt='Gebeya Logo'></img> */}
								</>
							)}
						</div>
						<LiaWindowClose className='text-xl hover:text-third-dark text-white block lg:hidden '></LiaWindowClose>
						<AiOutlineMenuFold
							className={` ${
								sidebarOpen ? 'rotate-180' : 'rotate-0'
							} text-white text-xl hover:text-third-dark hidden lg:block transition-all duration-300 ease-in-out`}
						/>
					</div>
					<div className='space-y-6 my-10'>
						<div
							className={`${
								activePage === 'Dashboard'
									? 'bg-[#00A9817D] border-l-4 border-[#00D9A5] px-4 py-2 '
									: ''
							} ${
								sidebarOpen ? 'justify-center' : ''
							} w-full flex gap-4 items-center  cursor-pointer transition-all duration-300 ease-in-out`}
						>
							<BsFillPinAngleFill
								className={`${sidebarOpen ? 'text-2xl' : ''} ${
									activePage === 'Dashboard' ? 'text-white' : ''
								} text-[#00D9A5]`}
							></BsFillPinAngleFill>

							<div className={`text-sm text-white ${sidebarOpen ? 'hidden' : ''}`}>
								Home
							</div>
						</div>
						{/* <div
							className={` ${
								sidebarOpen ? 'text-xs' : ''
							} font-semibold text-[#45505D]`}
						>
							Management
						</div> */}
						<a
							href='/'
							className={`${
								activePage === 'Categories'
									? 'bg-[#00A9817D] border-l-4 border-[#00D9A5] px-4 py-2 '
									: ''
							} ${
								sidebarOpen ? 'justify-center' : ''
							} w-full flex gap-4 items-center  cursor-pointer transition-all duration-300 ease-in-out`}
						>
							<BiSolidCategoryAlt
								className={` ${sidebarOpen ? 'text-2xl' : ''} text-[#00D9A5]`}
							></BiSolidCategoryAlt>

							<div className={`text-sm text-white ${sidebarOpen ? 'hidden' : ''}`}>
								Dashboard
							</div>
						</a>
						<a
							href='/'
							className={`${
								activePage === 'Product Attribute'
									? 'bg-[#00A9817D] border-l-4 border-[#00D9A5] px-4 py-2 '
									: ''
							} ${
								sidebarOpen ? 'justify-center' : ''
							} w-full flex gap-4 items-center  cursor-pointer transition-all duration-300 ease-in-out`}
						>
							<TbRulerMeasure
								className={` ${sidebarOpen ? 'text-2xl' : ''} text-[#00D9A5]`}
							></TbRulerMeasure>

							<div className={`text-xs text-white ${sidebarOpen ? 'hidden' : ''}`}>
								New Analytics
							</div>
						</a>
					</div>
				</div>
			</div>
		</>
	)
}

export default Sidebar
