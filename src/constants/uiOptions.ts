import NotificationsIcon from "@mui/icons-material/Notifications";
import MailIcon from "@mui/icons-material/Mail";

export const userOptions = [
	{
		name: "notifications",
		visible: true,
		icon: NotificationsIcon,
		route: '/notifications'
	},
	{
		name: "chat",
		visible: true,
		icon: MailIcon,
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

export const appOptions = [
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
