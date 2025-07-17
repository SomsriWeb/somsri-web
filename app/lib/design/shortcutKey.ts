export interface ShortcutKey {
	id: string
	name: string
	keys: string[]
}

const shortcuts: ShortcutKey[] = [
	// {
	//     id: useId(),
	//     name: 'ย้อนกลับ',
	//     keys: [metaSymbol.value, 'Z'],
	// },
	// {
	//     id: useId(),
	//     name: 'ทำซ้ำ',
	//     keys: [metaSymbol.value, 'D'],
	// },
	// {
	//     id: useId(),
	//     name: 'เลือกวัตถุทั้งหมด',
	//     keys: [metaSymbol.value, 'A'],
	// },
	{
		id: useId(),
		name: "จัดกลุ่มวัตถุที่เลือก",
		keys: ["meta", "G"],
	},
	// {
	//     id: useId(),
	//     name: 'เปิด / ปิดแท็บเลเยอร์',
	//     keys: [metaSymbol.value, 'L'],
	// },
	{
		id: useId(),
		name: "เลือกวัตถุมากกว่า 1 อัน",
		keys: ["Shift", "Click"],
	},
	// {
	//     id: useId(),
	//     name: 'ลบวัตถุ',
	//     keys: ['Backspace'],
	// },
]

export default shortcuts
