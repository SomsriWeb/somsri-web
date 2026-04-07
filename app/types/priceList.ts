export interface PriceList {
	fabricName: string
	fabricNameEn?: string
	rates: {
		min: number
		max: number | null
		price: number | null
	}[]
}

export interface PriceByFabricPriceList {
	minOrder: number
	maxOrder: number | null
	price: number | null
	attributes: {
		label: string
	}[]
}
