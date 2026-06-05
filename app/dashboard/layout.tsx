import React from 'react'
import {AuthProvider} from "@/app/dashboard/(auth)/AuthProvider";

const Layout = ({children}:{children:React.ReactNode}) => {
	return (
		<div>
			<AuthProvider>
			{children}
			</AuthProvider>
		</div>
	)
}
export default Layout
