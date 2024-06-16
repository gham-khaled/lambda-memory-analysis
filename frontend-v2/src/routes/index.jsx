import Analysis from '../pages/Analysis'
import Dashboard from '../pages/Dashboard'
import Home from '../pages/Home'
import PageNotFound from '../pages/PageNotFound'

const appRoutes = [
	{
		path: '/',
		element: <Home />,
	},
	{
		path: '/dashboard/:reportID',
		element: <Dashboard />,
	},
	{
		path: '/analytics',
		element: <Analysis />,
	},
	{
		path: '*',
		element: <PageNotFound />,
	},
]

export default appRoutes
