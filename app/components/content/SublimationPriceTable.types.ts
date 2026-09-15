export interface SublimationPriceTier {
    /** จำนวนขั้นต่ำของช่วงนี้ เช่น 100, 301, 501, 700 */
    min: number;
    /** ราคาต่อตัว (บาท) — ไม่ใส่ = แสดงเป็น label พิเศษ (เช่น "ราคาพิเศษ") */
    price?: number;
    /** ข้อความแสดงแทนราคา เมื่อไม่ระบุ price เช่น "ราคาพิเศษ" (ค่าเริ่มต้นคือ "ราคาพิเศษ") */
    specialLabel?: string;
}

export interface SublimationPricePackage {
    /** ชื่อหัวคอลัมน์ เช่น "สกรีนหน้า 1 จุด" */
    label: string;
    /** ช่วงจำนวนตัวของราคาเด่นด้านบน เช่น "30-99" */
    rangeLabel: string;
    /** ราคาเด่น (ตัวเลขใหญ่) ของช่วงจำนวนตัวด้านบน */
    headlinePrice: number;
    /** แถวราคาตามจำนวน — เรียงจากน้อยไปมาก */
    tiers: SublimationPriceTier[];
}