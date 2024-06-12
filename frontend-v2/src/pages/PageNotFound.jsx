/* eslint-disable react/prop-types */
import Gebeya from '../assets/lambda-logo.svg'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'

const PageNotFound = ({ code = '404', message = 'Resource Not Found' }) => {
	const history = useNavigate()

	return (
		<div className='bg-[#08141F] h-screen w-screen  overflow-y-hidden flex flex-col items-center justify-center relative'>
			<div className='absolute right-0 top-24'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='128.5'
					height='273'
					viewBox='0 0 282 590'
					fill='none'
				>
					<circle
						cx='272.5'
						cy='272.5'
						r='272.143'
						stroke='url(#paint0_linear_23631_860)'
						strokeWidth='0.713584'
					/>
					<path
						d='M482 274.24C482 397.461 388.184 497.312 272.501 497.312C156.818 497.312 63.0013 397.461 63.0013 274.24C63.0013 151.019 156.818 51.1676 272.501 51.1676C388.184 51.1676 482 151.019 482 274.24Z'
						stroke='url(#paint1_linear_23631_860)'
						strokeWidth='0.713584'
					/>
					<path
						d='M424.227 274.336C424.227 363.586 356.276 435.898 272.501 435.898C188.726 435.898 120.775 363.586 120.775 274.336C120.775 185.086 188.726 112.773 272.501 112.773C356.276 112.773 424.227 185.086 424.227 274.336Z'
						stroke='url(#paint2_linear_23631_860)'
						strokeWidth='0.713584'
					/>
					<path
						d='M363.57 274.436C363.57 328.021 322.775 371.421 272.499 371.421C222.222 371.421 181.427 328.021 181.427 274.436C181.427 220.852 222.222 177.452 272.499 177.452C322.775 177.452 363.57 220.852 363.57 274.436Z'
						stroke='url(#paint3_linear_23631_860)'
						strokeWidth='0.713584'
					/>
					<path
						d='M512.627 272.848C512.627 423.376 402.592 545.339 266.933 545.339C131.274 545.339 21.2396 423.376 21.2396 272.848C21.2396 122.32 131.274 0.356792 266.933 0.356792C402.592 0.356792 512.627 122.32 512.627 272.848Z'
						stroke='url(#paint4_linear_23631_860)'
						strokeWidth='0.713584'
					/>
					<path
						d='M457.638 274.588C457.638 398.037 372.826 498.008 268.323 498.008C163.821 498.008 79.0091 398.037 79.0091 274.588C79.0091 151.139 163.821 51.1676 268.323 51.1676C372.826 51.1676 457.638 151.139 457.638 274.588Z'
						stroke='url(#paint5_linear_23631_860)'
						strokeWidth='0.713584'
					/>
					<path
						d='M406.568 274.588C406.568 364.013 345.135 436.403 269.47 436.403C193.806 436.403 132.372 364.013 132.372 274.588C132.372 185.163 193.806 112.773 269.47 112.773C345.135 112.773 406.568 185.163 406.568 274.588Z'
						stroke='url(#paint6_linear_23631_860)'
						strokeWidth='0.713584'
					/>
					<path
						d='M352.954 274.588C352.954 328.292 316.065 371.724 270.677 371.724C225.29 371.724 188.4 328.292 188.4 274.588C188.4 220.883 225.29 177.452 270.677 177.452C316.065 177.452 352.954 220.883 352.954 274.588Z'
						stroke='url(#paint7_linear_23631_860)'
						strokeWidth='0.713584'
					/>
					<path
						d='M311.837 274.588C311.837 301.499 293.357 323.211 270.679 323.211C248.001 323.211 229.521 301.499 229.521 274.588C229.521 247.676 248.001 225.965 270.679 225.965C293.357 225.965 311.837 247.676 311.837 274.588Z'
						stroke='url(#paint8_linear_23631_860)'
						strokeWidth='0.713584'
					/>
					<defs>
						<linearGradient
							id='paint0_linear_23631_860'
							x1='272.5'
							y1='0'
							x2='272.5'
							y2='545'
							gradientUnits='userSpaceOnUse'
						>
							<stop offset='0.416667' stopColor='#FF8900' />
							<stop offset='0.96875' stopColor='#08D7A0' />
							<stop offset='1' stopColor='#00D9A5' />
						</linearGradient>
						<linearGradient
							id='paint1_linear_23631_860'
							x1='272.501'
							y1='50.8108'
							x2='272.501'
							y2='497.669'
							gradientUnits='userSpaceOnUse'
						>
							<stop offset='0.416667' stopColor='#FF8900' />
							<stop offset='0.96875' stopColor='#08D7A0' />
							<stop offset='1' stopColor='#00D9A5' />
						</linearGradient>
						<linearGradient
							id='paint2_linear_23631_860'
							x1='272.501'
							y1='112.417'
							x2='272.501'
							y2='436.255'
							gradientUnits='userSpaceOnUse'
						>
							<stop offset='0.416667' stopColor='#FF8900' />
							<stop offset='0.96875' stopColor='#08D7A0' />
							<stop offset='1' stopColor='#00D9A5' />
						</linearGradient>
						<linearGradient
							id='paint3_linear_23631_860'
							x1='272.499'
							y1='177.095'
							x2='272.499'
							y2='371.778'
							gradientUnits='userSpaceOnUse'
						>
							<stop offset='0.416667' stopColor='#FF8900' />
							<stop offset='0.96875' stopColor='#08D7A0' />
							<stop offset='1' stopColor='#00D9A5' />
						</linearGradient>
						<linearGradient
							id='paint4_linear_23631_860'
							x1='266.933'
							y1='0'
							x2='266.933'
							y2='545.696'
							gradientUnits='userSpaceOnUse'
						>
							<stop offset='0.416667' stopColor='#FF8900' />
							<stop offset='0.96875' stopColor='#08D7A0' />
							<stop offset='1' stopColor='#00D9A5' />
						</linearGradient>
						<linearGradient
							id='paint5_linear_23631_860'
							x1='268.323'
							y1='50.8108'
							x2='268.323'
							y2='498.365'
							gradientUnits='userSpaceOnUse'
						>
							<stop offset='0.416667' stopColor='#FF8900' />
							<stop offset='0.96875' stopColor='#08D7A0' />
							<stop offset='1' stopColor='#00D9A5' />
						</linearGradient>
						<linearGradient
							id='paint6_linear_23631_860'
							x1='269.47'
							y1='112.417'
							x2='269.47'
							y2='436.759'
							gradientUnits='userSpaceOnUse'
						>
							<stop offset='0.416667' stopColor='#FF8900' />
							<stop offset='0.96875' stopColor='#08D7A0' />
							<stop offset='1' stopColor='#00D9A5' />
						</linearGradient>
						<linearGradient
							id='paint7_linear_23631_860'
							x1='270.677'
							y1='177.095'
							x2='270.677'
							y2='372.081'
							gradientUnits='userSpaceOnUse'
						>
							<stop offset='0.416667' stopColor='#FF8900' />
							<stop offset='0.96875' stopColor='#08D7A0' />
							<stop offset='1' stopColor='#00D9A5' />
						</linearGradient>
						<linearGradient
							id='paint8_linear_23631_860'
							x1='270.679'
							y1='225.608'
							x2='270.679'
							y2='323.568'
							gradientUnits='userSpaceOnUse'
						>
							<stop offset='0.416667' stopColor='#FF8900' />
							<stop offset='0.96875' stopColor='#08D7A0' />
							<stop offset='1' stopColor='#00D9A5' />
						</linearGradient>
					</defs>
				</svg>
			</div>
			<div className='p-10 absolute top-0 left-0'>
				<img src={Gebeya} alt='Logo' className='w-auto h-10'></img>
			</div>
			<div className='lg:w-7/12'>
				<div
					onClick={() => {
						history(-1)
					}}
					className='text-white self-left cursor-pointer w-fit flex gap-3 items-center border border-[#FF8900] py-1 px-7'
				>
					<IoMdArrowRoundBack></IoMdArrowRoundBack>
					<div>Back</div>
				</div>
				<div className='grid lg:grid-cols-2  lg:gap-20 items-center'>
					<div className='text-[10rem] lg:text-[14.5rem] font-bold text-center lg:text-left'>
						<span className='text-[#FF8900]'>{code.charAt(0)}</span>
						<span className='text-white'>{code.charAt(1)}</span>
						<span className='text-[#FF8900]'>{code.charAt(2)}</span>
					</div>
					<div className='text-[3rem] text-center lg:text-left'>
						{/* <div className='text-[#FF8900]'>OH</div> */}
						{/* <svg
							xmlns='http://www.w3.org/2000/svg'
							width='120'
							height='16'
							viewBox='0 0 151 16'
							className='mx-auto lg:m-0'
							fill='none'
						>
							<path
								d='M4.07491 2.26069L4.82329 0.960716L4.07491 2.26069ZM14.2622 13.6294L14.2958 12.1297L14.2622 13.6294ZM39.6554 13.6294L39.6218 12.1297L39.6554 13.6294ZM51.8427 2.26069L51.9085 3.75924L51.8427 2.26069ZM65.0487 13.6294L65.0809 15.129L65.0487 13.6294ZM76.7453 2.26069L76.7131 0.761033L76.7453 2.26069ZM101.157 2.26069L101.126 0.761005L101.157 2.26069ZM113.873 13.6294L113.809 12.1307L113.873 13.6294ZM125.569 2.26069L125.537 0.761033L125.569 2.26069ZM145.925 3.6818L147.144 4.55573L145.925 3.6818ZM149 3.76069C149.828 3.76069 150.5 3.08911 150.5 2.26069C150.5 1.43226 149.828 0.760686 149 0.760686V3.76069ZM1.71113 0.0281917C0.898208 0.187731 0.368539 0.976066 0.528079 1.78899C0.687618 2.60191 1.47595 3.13157 2.28887 2.97203L1.71113 0.0281917ZM3.32652 3.56066C5.44939 4.78277 6.25135 7.00346 7.45443 9.65359C8.01218 10.8822 8.68859 12.2379 9.73108 13.2819C10.8384 14.3909 12.29 15.0856 14.2286 15.129L14.2958 12.1297C13.128 12.1036 12.4135 11.7226 11.854 11.1622C11.2295 10.5368 10.7381 9.62943 10.1861 8.41348C9.16971 6.17456 7.98435 2.78051 4.82329 0.960716L3.32652 3.56066ZM14.2286 15.129C16.3526 15.1766 17.9272 14.2164 19.1242 12.9383C20.267 11.7182 21.1493 10.1162 21.9211 8.72666C22.7386 7.25479 23.4466 5.99284 24.2937 5.07342C25.0907 4.20844 25.9072 3.76069 26.9588 3.76069V0.760686C24.8386 0.760686 23.2749 1.75179 22.0874 3.04064C20.9501 4.27505 20.0695 5.88192 19.2985 7.26999C18.4818 8.74042 17.7758 9.98945 16.9346 10.8876C16.1476 11.7279 15.3427 12.1532 14.2958 12.1297L14.2286 15.129ZM26.9588 3.76069C28.0104 3.76069 28.8269 4.20844 29.6239 5.07342C30.471 5.99284 31.179 7.25479 31.9965 8.72666C32.7683 10.1162 33.6506 11.7182 34.7934 12.9383C35.9904 14.2164 37.565 15.1766 39.689 15.129L39.6218 12.1297C38.5749 12.1532 37.77 11.7279 36.983 10.8876C36.1418 9.98945 35.4358 8.74042 34.6191 7.26999C33.8481 5.88192 32.9675 4.27505 31.8302 3.04064C30.6427 1.75179 29.079 0.760686 26.9588 0.760686V3.76069ZM39.689 15.129C41.7607 15.0826 43.2758 14.1065 44.4211 12.8378C45.5157 11.6252 46.3472 10.0593 47.0733 8.70317C47.8424 7.26694 48.507 6.03832 49.3149 5.12853C50.0756 4.27189 50.8708 3.80484 51.9085 3.75924L51.7769 0.762132C49.7109 0.852903 48.2073 1.85772 47.0717 3.13652C45.9833 4.36217 45.1539 5.93258 44.4286 7.28702C43.6605 8.72159 42.9973 9.93796 42.1943 10.8275C41.442 11.6608 40.6564 12.1066 39.6218 12.1297L39.689 15.129ZM51.9085 3.75924C52.9854 3.71193 53.8236 4.13438 54.6501 4.98318C55.5318 5.88865 56.2819 7.15706 57.1469 8.64469C57.9646 10.0508 58.8962 11.6735 60.0804 12.9095C61.3156 14.1988 62.926 15.1754 65.0809 15.129L65.0164 12.1297C63.9341 12.153 63.0837 11.7077 62.2466 10.8341C61.3585 9.90709 60.6062 8.62563 59.7403 7.13661C58.9219 5.72914 57.9887 4.11151 56.7995 2.89024C55.5551 1.61231 53.9346 0.667331 51.7769 0.762132L51.9085 3.75924ZM65.0809 15.129C67.192 15.0836 68.6974 14.0924 69.805 12.7837C70.853 11.5452 71.6032 9.94946 72.251 8.59052C72.9419 7.14138 73.5304 5.92907 74.2791 5.0444C74.9683 4.23001 75.7177 3.78313 76.7776 3.76034L76.7131 0.761033C74.602 0.806426 73.0966 1.79767 71.9891 3.1064C70.941 4.34483 70.1908 5.9406 69.543 7.29954C68.8521 8.74868 68.2636 9.96099 67.5149 10.8457C66.8257 11.66 66.0763 12.1069 65.0164 12.1297L65.0809 15.129ZM76.7776 3.76034C77.8598 3.73707 78.6313 4.16418 79.3523 4.97501C80.1374 5.85802 80.7678 7.09015 81.5066 8.56471C82.1999 9.94858 83.0003 11.5718 84.0935 12.8212C85.2465 14.139 86.7989 15.1294 88.9513 15.1294V12.1294C87.8656 12.1294 87.0824 11.6813 86.3513 10.8457C85.5604 9.94173 84.9281 8.69664 84.1888 7.22093C83.4949 5.83592 82.6928 4.21718 81.5942 2.98161C80.4315 1.67386 78.8682 0.714693 76.7131 0.761033L76.7776 3.76034ZM88.9513 15.1294C91.0904 15.1294 92.6407 14.1686 93.7992 12.8707C94.8964 11.6415 95.6983 10.0431 96.3928 8.67345C97.1316 7.21626 97.764 5.98519 98.5562 5.0834C99.291 4.24701 100.086 3.7831 101.188 3.76037L101.126 0.761005C98.9908 0.805057 97.4513 1.79562 96.3024 3.10338C95.211 4.34574 94.4108 5.94849 93.717 7.31677C92.9789 8.77264 92.3481 9.99131 91.5611 10.8729C90.8356 11.6858 90.0504 12.1294 88.9513 12.1294V15.1294ZM101.188 3.76037C102.307 3.73729 103.125 4.18423 103.896 5.02936C104.727 5.94128 105.403 7.20586 106.19 8.69823C106.93 10.101 107.783 11.7346 108.928 12.9707C110.139 14.2774 111.747 15.2203 113.936 15.128L113.809 12.1307C112.695 12.1777 111.889 11.7521 111.129 10.9319C110.304 10.0411 109.63 8.78964 108.844 7.29838C108.104 5.89673 107.253 4.2584 106.112 3.00798C104.911 1.69076 103.313 0.715897 101.126 0.761005L101.188 3.76037ZM113.936 15.128C116.036 15.0395 117.529 14.0335 118.63 12.7251C119.674 11.4836 120.424 9.89566 121.072 8.5448C121.762 7.10528 122.35 5.90562 123.098 5.0317C123.784 4.22817 124.535 3.78327 125.602 3.76034L125.537 0.761033C123.433 0.806284 121.928 1.78317 120.817 3.08232C119.767 4.31107 119.015 5.89498 118.367 7.2472C117.676 8.68807 117.086 9.90001 116.334 10.7939C115.638 11.6208 114.878 12.0857 113.809 12.1307L113.936 15.128ZM125.602 3.76034C126.684 3.73707 127.455 4.16418 128.176 4.97501C128.961 5.85802 129.592 7.09015 130.331 8.56471C131.024 9.94858 131.824 11.5718 132.917 12.8212C134.071 14.139 135.623 15.1294 137.775 15.1294V12.1294C136.69 12.1294 135.906 11.6813 135.175 10.8457C134.384 9.94173 133.752 8.69664 133.013 7.22093C132.319 5.83592 131.517 4.21718 130.418 2.98161C129.255 1.67386 127.692 0.714693 125.537 0.761033L125.602 3.76034ZM137.775 15.1294C139.304 15.1294 140.553 14.6431 141.573 13.817C142.552 13.0237 143.26 11.9658 143.836 10.9121C144.404 9.87415 144.93 8.66803 145.432 7.60718C145.956 6.50204 146.491 5.46732 147.144 4.55573L144.706 2.80788C143.89 3.94552 143.263 5.17887 142.721 6.32313C142.158 7.51168 141.716 8.53629 141.204 9.47292C140.701 10.3938 140.217 11.0543 139.685 11.4858C139.193 11.8845 138.609 12.1294 137.775 12.1294V15.1294ZM147.144 4.55573C147.373 4.23634 147.769 4.01564 148.245 3.88391C148.469 3.82181 148.674 3.79012 148.822 3.77447C148.894 3.76677 148.949 3.7633 148.981 3.76176C148.997 3.761 149.007 3.76073 149.011 3.76065C149.012 3.76061 149.012 3.76062 149.011 3.76064C149.01 3.76065 149.008 3.76066 149.007 3.76067C149.006 3.76067 149.005 3.76068 149.004 3.76068C149.003 3.76068 149.003 3.76068 149.002 3.76068C149.002 3.76069 149.001 3.76069 149.001 3.76069C149.001 3.76069 149 3.76069 149 2.26069C149 0.760686 148.999 0.760686 148.999 0.760687C148.999 0.760687 148.998 0.760687 148.998 0.760688C148.997 0.760689 148.996 0.76069 148.996 0.760692C148.994 0.760697 148.992 0.760704 148.99 0.760714C148.987 0.760735 148.982 0.760768 148.977 0.760821C148.968 0.760927 148.956 0.76111 148.943 0.761418C148.915 0.762034 148.88 0.763152 148.838 0.765164C148.754 0.76918 148.64 0.776805 148.504 0.791311C148.234 0.820072 147.861 0.877204 147.444 0.992746C146.637 1.21629 145.496 1.70616 144.706 2.80788L147.144 4.55573ZM4.82329 0.960716C3.9779 0.474035 3.32777 0.220358 2.82928 0.097438C2.57827 0.0355431 2.36166 0.005813 2.17557 -0.00214648C2.08248 -0.00612807 1.9973 -0.00464702 1.9197 0.000924468C1.88092 0.00370824 1.84415 0.00750518 1.80935 0.0121235C1.79196 0.0144318 1.77507 0.0169429 1.7587 0.0196309C1.75051 0.0209748 1.74245 0.0223624 1.73452 0.0237905C1.73056 0.0245045 1.72663 0.0252286 1.72273 0.0259624C1.72078 0.0263292 1.71884 0.0266984 1.7169 0.0270699C1.71594 0.0272561 1.71449 0.0275353 1.71401 0.0276291C1.71257 0.0279099 1.71113 0.0281917 2 1.50011C2.28887 2.97203 2.28744 2.97232 2.286 2.97259C2.28553 2.97269 2.2841 2.97296 2.28315 2.97315C2.28125 2.97351 2.27936 2.97387 2.27748 2.97422C2.27372 2.97493 2.26999 2.97562 2.2663 2.97628C2.25893 2.97761 2.2517 2.97885 2.24462 2.98002C2.23046 2.98234 2.21692 2.98434 2.20401 2.98605C2.17819 2.98948 2.15497 2.99175 2.13452 2.99322C2.09356 2.99616 2.06412 2.99583 2.04737 2.99511C2.01396 2.99368 2.03242 2.9908 2.11104 3.01019C2.27181 3.04983 2.65913 3.17644 3.32652 3.56066L4.82329 0.960716Z'
								fill='#FF8900'
							/>
						</svg> */}
						<div className=' text-white text-[3.5rem]'>{message}</div>
					</div>
				</div>
			</div>
			<div className='absolute left-0 bottom-0'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='128.5'
					height=' 273'
					viewBox='0 0 282 590'
					fill='none'
				>
					<circle
						cx='-14.2679'
						cy='295.732'
						r='295.345'
						stroke='url(#paint0_linear_23631_861)'
						strokeWidth='0.774421'
					/>
					<path
						d='M213.093 297.621C213.093 431.347 111.277 539.711 -14.2679 539.711C-139.813 539.711 -241.628 431.347 -241.628 297.621C-241.628 163.894 -139.813 55.53 -14.2679 55.53C111.277 55.53 213.093 163.894 213.093 297.621Z'
						stroke='url(#paint1_linear_23631_861)'
						strokeWidth='0.774421'
					/>
					<path
						d='M150.394 297.725C150.394 394.583 76.6502 473.061 -14.2675 473.061C-105.185 473.061 -178.929 394.583 -178.929 297.725C-178.929 200.866 -105.185 122.388 -14.2675 122.388C76.6502 122.388 150.394 200.866 150.394 297.725Z'
						stroke='url(#paint2_linear_23631_861)'
						strokeWidth='0.774421'
					/>
					<path
						d='M84.5666 297.834C84.5666 355.987 40.2938 403.087 -14.2692 403.087C-68.8322 403.087 -113.105 355.987 -113.105 297.834C-113.105 239.681 -68.8322 192.581 -14.2692 192.581C40.2938 192.581 84.5666 239.681 84.5666 297.834Z'
						stroke='url(#paint3_linear_23631_861)'
						strokeWidth='0.774421'
					/>
					<path
						d='M246.328 296.11C246.328 459.472 126.913 591.832 -20.3122 591.832C-167.537 591.832 -286.953 459.472 -286.953 296.11C-286.953 132.748 -167.537 0.387211 -20.3122 0.387211C126.913 0.387211 246.328 132.748 246.328 296.11Z'
						stroke='url(#paint4_linear_23631_861)'
						strokeWidth='0.774421'
					/>
					<path
						d='M186.652 297.998C186.652 431.972 94.6089 540.466 -18.8029 540.466C-132.215 540.466 -224.257 431.972 -224.257 297.998C-224.257 164.024 -132.215 55.53 -18.8029 55.53C94.6089 55.53 186.652 164.024 186.652 297.998Z'
						stroke='url(#paint5_linear_23631_861)'
						strokeWidth='0.774421'
					/>
					<path
						d='M131.23 297.998C131.23 395.048 64.558 473.608 -17.5569 473.608C-99.6718 473.608 -166.343 395.048 -166.343 297.998C-166.343 200.949 -99.6718 122.388 -17.5569 122.388C64.558 122.388 131.23 200.949 131.23 297.998Z'
						stroke='url(#paint6_linear_23631_861)'
						strokeWidth='0.774421'
					/>
					<path
						d='M73.0453 297.998C73.0453 356.281 33.0104 403.416 -16.2466 403.416C-65.5037 403.416 -105.539 356.281 -105.539 297.998C-105.539 239.715 -65.5037 192.581 -16.2466 192.581C33.0104 192.581 73.0453 239.715 73.0453 297.998Z'
						stroke='url(#paint7_linear_23631_861)'
						strokeWidth='0.774421'
					/>
					<path
						d='M28.4206 297.998C28.4206 327.204 8.36488 350.767 -16.2465 350.767C-40.8579 350.767 -60.9136 327.204 -60.9136 297.998C-60.9136 268.793 -40.8579 245.23 -16.2465 245.23C8.36488 245.23 28.4206 268.793 28.4206 297.998Z'
						stroke='url(#paint8_linear_23631_861)'
						strokeWidth='0.774421'
					/>
					<defs>
						<linearGradient
							id='paint0_linear_23631_861'
							x1='-14.2679'
							y1='0'
							x2='-14.2679'
							y2='591.464'
							gradientUnits='userSpaceOnUse'
						>
							<stop offset='0.4375' stopColor='#FF8900' />
							<stop offset='1' stopColor='#00D9A5' />
						</linearGradient>
						<linearGradient
							id='paint1_linear_23631_861'
							x1='-14.2679'
							y1='55.1428'
							x2='-14.2679'
							y2='540.098'
							gradientUnits='userSpaceOnUse'
						>
							<stop offset='0.4375' stopColor='#FF8900' />
							<stop offset='1' stopColor='#00D9A5' />
						</linearGradient>
						<linearGradient
							id='paint2_linear_23631_861'
							x1='-14.2675'
							y1='122.001'
							x2='-14.2675'
							y2='473.448'
							gradientUnits='userSpaceOnUse'
						>
							<stop offset='0.4375' stopColor='#FF8900' />
							<stop offset='1' stopColor='#00D9A5' />
						</linearGradient>
						<linearGradient
							id='paint3_linear_23631_861'
							x1='-14.2692'
							y1='192.193'
							x2='-14.2692'
							y2='403.474'
							gradientUnits='userSpaceOnUse'
						>
							<stop offset='0.4375' stopColor='#FF8900' />
							<stop offset='1' stopColor='#00D9A5' />
						</linearGradient>
						<linearGradient
							id='paint4_linear_23631_861'
							x1='-20.3122'
							y1='0'
							x2='-20.3122'
							y2='592.22'
							gradientUnits='userSpaceOnUse'
						>
							<stop offset='0.4375' stopColor='#FF8900' />
							<stop offset='1' stopColor='#00D9A5' />
						</linearGradient>
						<linearGradient
							id='paint5_linear_23631_861'
							x1='-18.8029'
							y1='55.1428'
							x2='-18.8029'
							y2='540.854'
							gradientUnits='userSpaceOnUse'
						>
							<stop offset='0.4375' stopColor='#FF8900' />
							<stop offset='1' stopColor='#00D9A5' />
						</linearGradient>
						<linearGradient
							id='paint6_linear_23631_861'
							x1='-17.5569'
							y1='122.001'
							x2='-17.5569'
							y2='473.996'
							gradientUnits='userSpaceOnUse'
						>
							<stop offset='0.4375' stopColor='#FF8900' />
							<stop offset='1' stopColor='#00D9A5' />
						</linearGradient>
						<linearGradient
							id='paint7_linear_23631_861'
							x1='-16.2466'
							y1='192.193'
							x2='-16.2466'
							y2='403.803'
							gradientUnits='userSpaceOnUse'
						>
							<stop offset='0.4375' stopColor='#FF8900' />
							<stop offset='1' stopColor='#00D9A5' />
						</linearGradient>
						<linearGradient
							id='paint8_linear_23631_861'
							x1='-16.2465'
							y1='244.843'
							x2='-16.2465'
							y2='351.154'
							gradientUnits='userSpaceOnUse'
						>
							<stop offset='0.4375' stopColor='#FF8900' />
							<stop offset='1' stopColor='#00D9A5' />
						</linearGradient>
					</defs>
				</svg>
			</div>
		</div>
	)
}

export default PageNotFound
