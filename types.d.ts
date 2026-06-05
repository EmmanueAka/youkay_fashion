
export interface DatabaseOrder {
	id: string;
	created_at: string;
	total: number;
	customer_name?: string;
	product_name?: string;
	status?: string;
}

export interface MonthlySales {
	month: string;
	total_amount: number;
}

export interface Category {
	id: string | number;
	name: string;
}

export interface ProductUploadModalProps{
	onClose: () => void;
	onSuccess?: () => void;
}

export interface  CategoryJoin {
	name: string;
}
export interface ProductRecord {
	id: string | number;
	name: string;
	price: number;
	description: string;
	image_url: string;
	sizes: string[];
	tag: string[];
	stock: number | null;
	created_at: string;
	categories: CategoryJoin | null;
}

export interface OrderRecord{
	id: string | number;
	created_at: string;
	total: number;
	customer_name: string;
	status: 'paid' | 'shipped' | 'pending' | 'delivered' | 'cancelled';
	product_name: string
}

export interface CustomerProfile {
	id: string
	full_name: string;
	email: string;
	avatar_url: string;
	city: string;
	country: string;
	address: string;
	total_spend: number;
	total_orders: number;
	last_active: string;
}