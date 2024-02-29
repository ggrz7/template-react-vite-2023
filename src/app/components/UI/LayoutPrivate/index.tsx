import * as React from "react";
import Box from "@mui/material/Box";

import {userOptions, appOptions} from '../../../../constants'
import MenuBar from "./MenuBar.tsx";
import SideBar from "./SideBar.tsx";


interface LayoutPrivateProps {
	children?: React.ReactNode
}

const LayoutPrivate = ({children}: LayoutPrivateProps) => {

	const [open, setOpen] = React.useState(false);

	const handleToggleDrawerOpen = () => {
		setOpen((value) => !value);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<>
			<MenuBar userOptions={userOptions} appOptions={appOptions} handleToggleDrawerOpen={handleToggleDrawerOpen}/>
			<SideBar open={open} handleDrawerClose={handleDrawerClose}/>
			<Box component="main" sx={{p: 3, marginLeft: open ? 30: 10}}>
				{
					children
				}
			</Box>
		</>
	)
}

export default LayoutPrivate
