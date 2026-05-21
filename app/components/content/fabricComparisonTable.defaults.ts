import type { FabricComparisonRow } from './FabricComparisonTable.types';

export const DEFAULT_FABRIC_HEADERS: string[] = ['รังผึ้งไมโคร', 'สายฟ้า', 'ดาวกระจาย', 'เม็ดข้าวสาร'];

export const DEFAULT_FABRIC_ROWS: FabricComparisonRow[] = [
    {
        label: 'การระบายอากาศ',
        ratings: ['⭐⭐⭐⭐⭐', '⭐⭐⭐', '⭐⭐⭐⭐⭐', '⭐⭐⭐'],
    },
    {
        label: 'ความยืดหยุ่น',
        ratings: ['⭐⭐⭐', '⭐⭐⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐'],
    },
    {
        label: 'ความทนทาน/แข็งแรง',
        ratings: ['⭐⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐', '⭐⭐⭐⭐⭐'],
    },
    {
        label: 'ความชัดของลายพิมพ์',
        ratings: ['⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐⭐⭐'],
    },
    {
        label: 'ความเบาสบาย',
        ratings: ['⭐⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐⭐⭐', '⭐⭐⭐⭐'],
    },
];
