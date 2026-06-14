import React from 'react'
import {useCart} from "@/app/context/CartContext";
import {useRouter} from "next/navigation";
import {supabase} from "@/lib/supabaseClient";


interface CartSidebarProps {
	isOpen: boolean;
	onClose: () => void;
}

const CheckoutSideBar: React.FC<CartSidebarProps> = ({isOpen, onClose}) => {
	const {cart, removeFromCart, getCartTotal} = useCart();
	const router = useRouter();

	if (!isOpen) return null;

	const handleCheckoutClick = async () => {
		if (cart.length === 0) return alert("Your bag is empty!")


		try {
			const {data: {session}} = await supabase.auth.getSession();

			if (!session) {
				localStorage.setItem("post_login_redirect_action", "trigger_checkout")

				window.location.href = `/sign-up?redirect=${encodeURIComponent('/checkout-session')}`
				onClose()
				return;
			}

			const customerEmail = session.user.email || "customer@example.com"
			const res = await fetch("https://vwivapsgkdqudwuvgkbo.supabase.co/functions/v1/checkout-session", {
				method: "POST",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify({
					cartItems: cart,
					email: customerEmail
				})
			});

			const data = await res.json();
			if (data?.url) {
				window.location.href = data.url;
			} else {
				alert(data.error || "failed to start checkout")
			}

			router.push("/checkout");
		} catch (err: any) {
			console.error("Error checking out", err.message)
			alert("An error occurred while connecting to the checkout processor")
		}
	}
	return (
		<div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs">
			{/* Backdrop Closer Clicker */}
			<div className="absolute inset-0" onClick={onClose}/>

			<div
				className="relative w-full max-w-md h-full bg-background shadow-2xl p-6 flex flex-col z-10 text-on-background">
				<div className="flex justify-between items-center mb-6 border-b border-outline-variant pb-4">
					<h3 className="font-headline-sm text-headline-sm">Shopping Bag ({cart.length})</h3>
					<button onClick={onClose} className="p-2 cursor-pointer hover:bg-surface-container rounded-full">
						<span className="material-symbols-outlined">close</span>
					</button>
				</div>

				{/* Scrollable Cart Items Row */}
				<div className="flex-1 overflow-y-auto space-y-4">
					{cart.length === 0 ? (
						<p className="text-center text-on-surface-variant py-12">Your bag is empty.</p>
					) : (
						cart.map((item) => (
							<div key={item.id}
							     className="flex gap-4 p-2 bg-surface-container-low rounded-xl items-center">
								<img src={item.imageUrl} alt={item.name} className="w-16 h-20 object-cover rounded-md"/>
								<div className="flex-1">
									<h4 className="font-title-md font-medium">{item.name}</h4>
									<p className="text-primary font-bold">${item.price.toFixed(2)} x {item.quantity}</p>
								</div>
								<button
									onClick={() => removeFromCart(item.id, item.selectedSize)}
									className="text-error hover:bg-error/10 p-2 rounded-full cursor-pointer"
								>
									<span className="material-symbols-outlined">delete</span>
								</button>
							</div>
						))
					)}
				</div>

				{/* Checkout Execution Summary Panel */}
				<div className="border-t border-outline-variant pt-4 mt-4">
					<div className="flex justify-between font-headline-sm text-title-lg mb-6">
						<span>Subtotal:</span>
						<span className="text-primary font-bold">${getCartTotal().toFixed(2)}</span>
					</div>
					<button
						onClick={handleCheckoutClick}
						disabled={cart.length === 0}
						className="w-full py-4 bg-primary text-white rounded-full font-title-md font-bold tracking-wide hover:opacity-90 disabled:opacity-40 transition-all cursor-pointer shadow-md"
					>
						Proceed to Checkout
					</button>
				</div>
			</div>
		</div>
	)
}
export default CheckoutSideBar
