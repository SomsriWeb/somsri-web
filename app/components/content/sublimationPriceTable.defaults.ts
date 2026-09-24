import type { SublimationPricePackage } from './SublimationPriceTable.types';

export const DEFAULT_PRICE_PACKAGES: SublimationPricePackage[] = [
    {
        label: 'ชิ้นหน้า 1 ชิ้น',
        rangeLabel: '30-99',
        headlinePrice: 40,
        tiers: [
            { min: 100, price: 30 },
            { min: 301, price: 25 },
            { min: 501, price: 20 },
            { min: 700 },
        ],
    },
    {
        label: 'ชิ้นหน้าและหลัง',
        rangeLabel: '30-99',
        headlinePrice: 65,
        tiers: [
            { min: 100, price: 50 },
            { min: 301, price: 45 },
            { min: 501, price: 40 },
            { min: 700 },
        ],
    },
    {
        label: 'เต็มตัว',
        rangeLabel: '30-99',
        headlinePrice: 80,
        tiers: [
            { min: 100, price: 50 },
            { min: 301, price: 45 },
            { min: 501, price: 55 },
            { min: 700 },
        ],
    },
];