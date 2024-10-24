import PopBox from '@apps/onetwobet/components/common/PopBox'
import QuickLink from '@apps/onetwobet/components/home/QuickLink'
import { useState } from 'react'
import Footer from './Footer'
import Header from './Header'
import Submenu from './Submenu'

const Layout = ({ children }) => {
	const [isSubmenuOpen, setSubmenuOpen] = useState<boolean>(false)

	return (
		<>
			<Header setSubmenuOpen={setSubmenuOpen} />
			<PopBox />
			{children}
			<Footer />
			<QuickLink />
			<Submenu isSubmenuOpen={isSubmenuOpen} />
		</>
	)
}

export default Layout
