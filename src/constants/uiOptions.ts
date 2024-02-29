import SvgIcon from "@mui/material/SvgIcon/SvgIcon";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MailIcon from "@mui/icons-material/Mail";


export type Option = {
	name: string
	visible?: boolean
	icon?: typeof SvgIcon;
	route?: string
	action?: string
	children?: Option[]
}
export const userOptions: Option[] = [
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

export const appOptions: Option[] = [
	{
		name: "dashboard",
		route: '/dashboard'
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
