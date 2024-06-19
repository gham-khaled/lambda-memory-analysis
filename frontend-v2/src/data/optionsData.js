const runtime = [
	'nodejs20.x',
	'nodejs18.x',
	'nodejs16.x',
	'python3.12',
	'python3.11',
	'python3.10',
	'python3.9',
	'python3.8',
	'java21',
	'java17',
	'java11',
	'java8.al2',
	'dotnet8',
	'dotnet7',
	'dotnet6',
	'ruby3.3',
	'ruby3.2',
	'provided.al2023',
	'provided.al2',
	'nodejs14.x',
	'ruby2.7',
	'provided',
	'go1.x',
	'java8',
]

const packageOptions = ['Zip', 'Image']

const architectureOptions = ['x86_64', 'arm64']

const statistics = [
	{
		title: 'Memory Cost',
		icon: 'BiSolidCategoryAlt',
		query: '',
	},
	{
		title: 'Invocation Cost',
		icon: 'IoIosCube',
		query: '',
	},
	{
		title: 'Total Cost',
		icon: 'AiOutlineShop',
		query: '',
	},
	{
		title: 'Potential Savings',
		icon: 'AiOutlineUser',
		query: '',
	},
	{
		title: 'Avg.Max Memory Used',
		icon: 'BiSolidCategoryAlt',
		query: '',
	},
	{
		title: 'Abg. Provisioned Memory',
		icon: 'IoIosCube',
		query: '',
	},
	{
		title: 'Avg Duration / Invocation',
		icon: 'AiOutlineShop',
		query: '',
	},
]

const errorMsgStyle = {
	fontSize: '12px',
	border: '0.4px solid #787474',
	borderRadius: '5px',
	background: '#253645',
	color: '#fff',
}

const successMsgStyle = {
	fontSize: '12px',
	border: '0.4px solid #787474',
	borderRadius: '5px',
	background: '#253645',
	color: '#fff',
}

const summaryColumns = [
	{ label: 'Report ID', key: 'reportID' },
	{ label: 'allDurationInSeconds', key: 'allDurationInSeconds' },
	{ label: 'Memory Cost', key: 'MemoryCost' },
	{ label: 'Invocation Cost', key: 'InvocationCost' },
	{ label: 'Total Cost', key: 'totalCost' },
	{ label: 'Avg Cost Per Invocation', key: 'avgCostPerInvocation' },
	{ label: 'Avg Max Memory Used MB', key: 'avgMaxMemoryUsedMB' },
	{ label: 'Avg Over Provisioned MB', key: 'avgOverProvisionedMB' },
	{ label: 'Avg Provisioned Memory MB', key: 'avgProvisionedMemoryMB' },
	{
		label: 'Avg Duration Per Invocation',
		key: 'avgDurationPerInvocation',
	},
	{ label: 'Status', key: 'status' },
	{ label: 'Start Date', key: 'startDate' },
	{ label: 'End Date', key: 'endDate' },
	{ label: 'Timeout Invocations', key: 'timeoutInvocations' },
	{ label: 'Memory Exceeded Invocation', key: 'memoryExceededInvocation' },
	{ label: 'Optimal Total Cost', key: 'optimalTotalCost' },
	{ label: 'Potential Savings', key: 'potentialSavings' },
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

export {
	runtime,
	packageOptions,
	architectureOptions,
	statistics,
	errorMsgStyle,
	successMsgStyle,
	summaryColumns,
	sampleData,
}