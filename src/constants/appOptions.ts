
export const UserOptions = [
	{
		name: "notifications",
		visible: true,
		route: '/notifications'
	},
	{
		name: "chat",
		visible: true,
		route: '/chat'
	},
	{
		name: "my_profile",
		route: '/my_profile'
	},
	{
		name: "account_settings",
		route: '/account_settings'
	},
	{
		name: "dashboard_settings",
		route: '/dashboard_settings'
	},
	{
		name: "logout",
		action: "logout"
	},
]

export const AppOptions = [
	{
		name: "dashboard",
		route: '/'
	},
	{
		name: "trader",
		children : [
			{
				name: "balance",
				route: '/balance'
			},
			{
				name: "strategies",
				route: '/strategies'
			},
			{
				name: "subscribers",
				route: '/subscribers'
			},
		]
	},
	{
		name: "subscriber",
		children : [
			{
				name: "portfolio",
				route: '/portfolio'
			},
			{
				name: "subscriptions",
				route: '/subscriptions'
			},
			{
				name: "marketplace",
				route: '/marketplace'
			},
		]
	},
]
