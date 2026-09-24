export interface FabricRatingRow {
    /** ชื่อหัวข้อสรรพคุณ (ภาษาไทย) เช่น "การระบายอากาศ" */
    label: string;
    /** คำอธิบายภาษาอังกฤษ (ในวงเล็บ) เช่น "Ventilation" */
    labelEn?: string;
    /** คะแนนของแต่ละคอลัมน์ผ้า เรียงตามลำดับ fabricHeaders ค่าเป็นตัวเลข 1-5 */
    ratings: number[];
}