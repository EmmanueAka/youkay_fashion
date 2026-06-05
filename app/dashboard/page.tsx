
import { supabase } from "@/lib/supabaseClient";
import {redirect} from "next/navigation";


export default async function DashboardEntry () {

	const supaAdmin = await supabase
	const { data: { session }} = await supaAdmin.auth.getSession();


	if(!session){
		redirect("/dashboard/sign-in")
	}else {
		redirect("/dashboard/main")
	}

	return (
		<div className='flex items-center justify-center h-screen'>
			<p>Redirecting...</p>
		</div>
	)
}