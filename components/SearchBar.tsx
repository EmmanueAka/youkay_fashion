'use client'
import React, {useState} from 'react'
import {useRouter} from "next/navigation";
import {Product} from "@/types";


interface Category {
	id: number
	name: string
}

const SearchBar = () => {
	const router = useRouter()
	const [query, setQuery] = useState('')
	const [categories, setCategories] = useState<Category[]>([])
	const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
	const [results, setResults] = useState<Product[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	return (
		<div>SearchBar</div>
	)
}
export default SearchBar
