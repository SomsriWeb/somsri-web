import type { FabricRatingRow } from './FabricRatingTable.types';

export const DEFAULT_RATING_HEADERS: string[] = ['ผ้า รังผึ้งไมโคร', 'ผ้า สายฟ้า', 'ดาวกระจาย', 'เม็ดข้าวสาร'];

export const DEFAULT_RATING_ROWS: FabricRatingRow[] = [
    { label: 'การระบายอากาศ', labelEn: 'Ventilation', ratings: [5, 3, 5, 3] },
    { label: 'ความยืดหยุ่น', labelEn: 'Flexibility', ratings: [3, 5, 4, 3] },
    { label: 'ความชัดของลายพิมพ์', labelEn: 'Durability / Strength', ratings: [4, 4, 3, 5] },
    { label: 'ความสบาย', labelEn: 'Print Clarity', ratings: [3, 4, 4, 5] },
    { label: 'ความเบาสบาย', labelEn: 'Lightweight & Comfort', ratings: [4, 4, 5, 4] },
];