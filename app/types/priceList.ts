export interface PriceList {
	fabricName: string
	rates: {
		min: number
		max: number | null
		price: number | null
	}[]
}
