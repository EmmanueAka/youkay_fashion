'use client'

import React, {createContext, useContext, useEffect, useState} from "react";


export interface CartItem{
	id: string;
	name: string;
	price: number;
	imageUrl: string;
	quantity: number;
	selectedSize?: string;
}

interface CartContextType{
	cart: CartItem[];
	addToCart: (product: any) => void;
	removeFromCart: (productId: string, size?: string) => void;
	clearCart: () => void;
	getCartTotal: () => number;
	getCartCount: () => number;
	updateCartQuantity: (productId: string, size?: string, quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider: React.FC<{ children: React.ReactNode}> = ({ children})=> {
	const [cart, setCart] = useState<CartItem[]>([]);
	const [isHydrated, setIsHydrated] = useState(false)

	useEffect(() => {
		const saved = localStorage.getItem("cart");
		if(saved){
			try {
				setCart(JSON.parse(saved));
			}catch (e){
				console.error("Failed to parse cart memory:", e)
			}
		}
		setIsHydrated(true)
	}, []);

	useEffect(() => {
		if (isHydrated){
			localStorage.setItem('cart', JSON.stringify(cart))
		}
	}, [cart, isHydrated]);

	const addToCart = (product: any) => {
		setCart((prev) => {
			// FIXED: Return the boolean explicitly so .find() accurately matches properties
			const existing = prev.find((item) => {
				return item.id === product.id && item.selectedSize === product.selectedSize;
			});

			if(existing){
				return prev.map((item) =>
					item.id === product.id && item.selectedSize === product.selectedSize
						? { ...item, quantity: item.quantity + 1}
						: item
				);
			}
			return [
				...prev,
				{
					id: product.id,
					name: product.name,
					price: Number(product.price),
					imageUrl: product.imageUrl || product.image_url || "",
					quantity: 1,
					selectedSize: product.selectedSize

				}
			];
		});
	};

	const removeFromCart = (productId: string, size?: string) => {
		setCart((prev) =>
			prev.map((item) => {
				if (item.id === productId && item.selectedSize === size) {
					return { ...item, quantity: item.quantity - 1 };
				}
				return item;
			}).filter((item) => item.quantity > 0)
		);
	};

	const clearCart = () => setCart([]);

	const getCartTotal = () => cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

	const getCartCount = () => cart.reduce((sum, item) => sum + item.quantity, 0)

	return (
		<CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, getCartTotal, getCartCount}}>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = () => {
	const context = useContext(CartContext);
	if(!context) throw new Error('useCart must be used within a CartProvider')
	return context;
}
