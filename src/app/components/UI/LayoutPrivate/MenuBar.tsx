import * as React from "react";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import {AppBar} from "./styled.tsx";
import {Option} from "../../../../constants/uiOptions.ts";


const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

type MenuBarProps = {
	userOptions: Option[]
	appOptions: Option[]
	handleToggleDrawerOpen: () => void
}

const MenuBar = ({userOptions, appOptions, handleToggleDrawerOpen}: MenuBarProps) => {
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<Box sx={{display: 'flex'}}>
			<AppBar>
				<Container maxWidth="xl">
					<Toolbar disableGutters>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleToggleDrawerOpen}
							color="inherit"
						>
							<MenuIcon/>
						</IconButton>
						<Box sx={{flexGrow: 1, display: 'flex', alignItems: 'center', gap: '10px'}}>
							<IconButton sx={{p: 0}}>
								<Avatar alt="LemonBulls" src="/src/assets/logo.png"/>
							</IconButton>
							<Typography
								variant="h5"
								noWrap
								component="a"
								href="#app-bar-with-responsive-menu"
								sx={{
									mr: 2,
									flexGrow: 1,
									fontFamily: "monospace",
									fontWeight: 700,
									letterSpacing: ".3rem",
									color: "inherit",
									textDecoration: "none",
								}}
							>
								LemonBulls
							</Typography>
						</Box>

						<Box sx={{display: 'flex', gap: '10px'}}>
							<Box sx={{display: {xs: 'none', md: 'flex'}}}>
								{
									userOptions
										.filter(({visible}) => visible)
										.map(({name, icon: Icon}) => (
											<IconButton key={name} size="large" aria-label="show 4 new mails" color="inherit">
												<Badge badgeContent={4} color="error">
													{Icon ? <Icon /> : null}
												</Badge>
											</IconButton>
										))
								}
								<Menu
									sx={{mt: '45px'}}
									id="menu-appbar"
									anchorEl={anchorElUser}
									anchorOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									keepMounted
									transformOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									open={Boolean(anchorElUser)}
									onClose={handleCloseUserMenu}
								>
									{settings.map((setting) => (
										<MenuItem key={setting} onClick={handleCloseUserMenu}>
											<Typography textAlign="center">{setting}</Typography>
										</MenuItem>
									))}
								</Menu>
							</Box>
							<Tooltip title="Open user menu">
								<IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
									<Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg"/>
								</IconButton>
							</Tooltip>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>
		</Box>
	)
}

export default MenuBar
