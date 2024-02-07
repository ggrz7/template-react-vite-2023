import { MenuBar, SideBar } from '../../components'


interface LayoutPrivateProps extends FCProps {}
const LayoutPrivate = ({ children }: LayoutPrivateProps) => {
	return (
		<>
			<MenuBar />
			<SideBar />
			{ children }
		</>
	)
}

export default LayoutPrivate
