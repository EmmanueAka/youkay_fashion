'use client'

import React, {createContext, useContext, useEffect, useState} from "react";


export interface CartItem{
	id: string;
	name: string;
	price: number;
	imageUrl: string;
	quantity: number;
}

interface CartContextType{
	cart: CartItem[];
	addToCart: (product: any) => void;
	removeFromCart: (productId: string) => void;
	clearCart: () => void;
	getCartTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider: React.FC<{ children: React.ReactNode}> = ({ children})=> {
	const [cart, setCart] = useState<CartItem[]>(() => {
		if (typeof window !== 'undefined'){
			const saved = localStorage.getItem('cart')
			return saved ? JSON.parse(saved) : [];
		}
		return [];
	});

	useEffect(() => {
		localStorage.getItem('cart', JSON.stringify(cart));
	}, [cart]);

	const addToCart = (product: any) => {
		setCart((prev) => {
			const existing = prev.find((item) => item.id === product.id)
			if(existing){
				return prev.map((item) =>
				item.id === product.id ? { ...item, quantity: item.quantity + 1} : item
				);
			}
			return [
				...prev,
				{
					id: product.id,
					name: product.name,
					price: Number(product.price),
					imageUrl: product.imageUrl,
					quantity: 1

				}
			];
		});
	};

	const removeFromCart = (productId: string) => {
		setCart((prev) => prev.filter((item) => item.id !== productId))
	};

	const clearCart = () => setCart([]);

	const getCartTotal = () => cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

	return (
		<CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, getCartTotal}}>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = () => {
	const context = useContext(CartContext);
	if(!context) throw new Error('useCart must be used within a CartProvider')
	return context;
}