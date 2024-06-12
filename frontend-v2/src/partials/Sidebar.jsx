/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { BsFillPinAngleFill, BsPersonCircle } from 'react-icons/bs'
import { TbRulerMeasure } from 'react-icons/tb'
import { HiHome } from 'react-icons/hi2'

import { IoIosCube } from 'react-icons/io'
import lambdaLogo from '../assets/lambda-logo.svg'
import { DiGoogleAnalytics } from 'react-icons/di'

import {
	BiLogOut,
	BiSolidCategoryAlt,
	BiMenu,
	BiGitBranch,
} from 'react-icons/bi'
import { LiaWindowClose } from 'react-icons/lia'
import { AiOutlineMenuFold, AiFillShop } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'

const Sidebar = () => {
	const [sidebarOpen, setSidebarOpen] = useState(false)
	const [menuClicked, setMenuClicked] = useState(false)
	const [activePage, setActivePage] = useState('Home')

	return (
		<>
			<BiMenu
				className='absolute ml-8 mt-12 lg:hidden text-greenLime rounded bg-white text-3xl cursor-pointer'
				onClick={() => {
					setMenuClicked((prev) => !prev)
				}}
			></BiMenu>
			<div
				className={`bg-darkblueMedium  h-screen hidden lg:block ${
					sidebarOpen ? 'w-[6vw] px-2 py-10' : 'w-[20vw] p-10 '
				} ${
					menuClicked ? 'w-[70vw] absolute z-50 !block ' : ''
				}transition-all duration-300 ease-in-out`}
			>
				<div className='relative h-full'>
					<div
						className={`   ${sidebarOpen ? '' : `bg-[#1A2833] -m-10 -mx-7 pt-8 px-4 py-6 mb-4 rounded-b-lg`}`}
					>
						<div
							className={`${
								sidebarOpen ? 'flex-col' : ''
							} flex justify-between items-center`}
						>
							<div>
								{sidebarOpen ? (
									<>
										{/* <img className='w-10 mx-auto' src={lambdaLogo} alt=''></img> */}
									</>
								) : (
									<>
										<img className='w32 mx-auto' src={lambdaLogo} alt=''></img>
									</>
								)}
							</div>
							<LiaWindowClose
								className='text-xl hover:text-third-dark text-white block lg:hidden cursor-pointer '
								onClick={() => {
									setMenuClicked((prev) => !prev)
								}}
							></LiaWindowClose>
							<AiOutlineMenuFold
								size={30}
								className={` ${
									sidebarOpen ? 'rotate-180' : 'rotate-0'
								} text-white text-xl hover:text-lambdaPrimary-light hidden lg:block transition-all duration-300 ease-in-out cursor-pointer`}
								onClick={() => {
									setSidebarOpen((prev) => !prev)
								}}
							/>
						</div>
					</div>

					<div className='space-y-12 my-16 '>
						<Link
							to='/'
							className={`${
								activePage === 'Home'
									? 'bg-lambdaPrimary-light border-l-8 rounded-tr-sm rounded-br-sm border-lambdaPrimary px-4 py-2 '
									: 'hover:text-lambdaPrimary '
							} ${
								sidebarOpen ? 'justify-center' : ''
							} w-full flex gap-4 items-center  cursor-pointer transition-all duration-300 ease-in-out`}
						>
							<HiHome
								size={25}
								className={`${
									activePage === 'Dashboard' ? 'text-white' : ''
								} text-white`}
							></HiHome>

							<div
								className={`text-sm text-white ${sidebarOpen ? 'hidden' : 'sidebar'}`}
							>
								Home
							</div>
						</Link>
						<div
							className={` ${
								sidebarOpen ? 'text-xs' : ''
							} font-medium uppercase text-[#45505D]`}
						>
							analytics
						</div>
						<Link
							to='/dashboard'
							className={`${
								activePage === 'Dashboard'
									? 'bg-lambdaPrimary-light border-l-8 border-lambdaPrimary px-4 py-2 '
									: ''
							} ${
								sidebarOpen ? 'justify-center' : ''
							} w-full flex gap-4 items-center  cursor-pointer transition-all duration-300 ease-in-out`}
						>
							<BiSolidCategoryAlt
								size={25}
								className={`  text-lambdaPrimary`}
							></BiSolidCategoryAlt>

							<div
								className={`text-sm text-white ${sidebarOpen ? 'hidden' : 'sidebar'}`}
							>
								Dashboard
							</div>
						</Link>
						<Link
							to='/analytics'
							className={`${
								activePage === 'NewAnalysis'
									? 'bg-lambdaPrimary-light border-l-8 border-lambdaPrimary px-4 py-2 '
									: ''
							} ${
								sidebarOpen ? 'justify-center' : ''
							} w-full flex gap-4 items-center  cursor-pointer transition-all duration-300 ease-in-out`}
						>
							<DiGoogleAnalytics
								size={25}
								className={`  text-lambdaPrimary`}
							></DiGoogleAnalytics>

							<div
								className={`text-sm text-white ${sidebarOpen ? 'hidden' : 'sidebar'}`}
							>
								New Analytics
							</div>
						</Link>
					</div>
				</div>
				<a
					href='https://github.com/gham-khaled/lambda-memory-analysis/tree/dashboard-v2'
					target='_blank'
					className={`${sidebarOpen ? 'hidden' : 'flex'} text-white font-light bg-darkblueLight px-4 text-xs py-2 -mx-2 rounded-md`}
				>
					GitHub:{' '}
					<span className='font-semibold pl-2 uppercase'>Ghamgui Khaled </span>
				</a>
			</div>
		</>
	)
}

export default Sidebar
