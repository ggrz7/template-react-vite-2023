import * as React from "react";
import Box from "@mui/material/Box";

import {MenuBar, SideBar} from '../../components'
import {userOptions, appOptions} from '../../../constants'

interface LayoutPrivateProps extends FCProps {
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
		<Box sx={{display: 'flex'}}>
			<MenuBar userOptions={userOptions} appOptions={appOptions} handleToggleDrawerOpen={handleToggleDrawerOpen}/>
			<SideBar open={open} handleDrawerClose={handleDrawerClose}/>
			{
				children
			}
		</Box>
	)
}

export default LayoutPrivate
