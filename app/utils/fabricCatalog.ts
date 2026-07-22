import type { FabricsCollectionItem } from '@nuxt/content';

export interface FabricFilterState {
    shirtTypes: string[];
    materials: string[];
    usages: string[];
    gramMin: number | null;
    gramMax: number | null;
}

export const defaultFabricFilterState = (): FabricFilterState => ({
    shirtTypes: [],
    materials: [],
    usages: [],
    gramMin: null,
    gramMax: null,
});

export const shirtTypeOptions = [
    { id: 'tshirt', label: 'เสื้อยืด', productTypes: ['tshirt'] },
    { id: 'polo', label: 'เสื้อโปโล', productTypes: ['polo'] },
    { id: 'sweater', label: 'เสื้อ Sweter', productTypes: ['other', 'brand'] },
] as const;

export const materialOptions = [
    { id: 'cotton', label: 'Cotton 100%', keywords: ['cotton', 'คอตตอน', 'muslin'] },
    { id: 'blend', label: 'เนื้อผ้าผสม', keywords: ['cvc', 'tc', 'semi', 'comb', 'oe', 'interlock', 'prime'] },
    { id: 'polyester', label: 'Polyester 100%', keywords: ['micro', 'dry', 'juti', 'fashion', 'poly', 'nano', 'tk'] },
    { id: 'spandex', label: 'Spandex', keywords: ['spandex', 'supersoft', 'supersoff'] },
] as const;

export const usageOptions = [
    { id: 'corporate', label: 'เสื้อองค์กร', keywords: ['องค์กร', 'ยูนิฟอร์ม', 'พนักงาน'] },
    { id: 'brand', label: 'เสื้อแบรนด์', keywords: ['แบรนด์', 'brand'] },
    { id: 'fashion', label: 'เสื้อแฟชั่น', keywords: ['แฟชั่น', 'fashion'] },
    { id: 'marketing', label: 'เสื้อแจก Marketing', keywords: ['แจก', 'marketing', 'อีเวนต์'] },
    { id: 'sport', label: 'เสื้อกีฬา', keywords: ['กีฬา', 'sport'] },
    { id: 'event', label: 'เสื้ออีเวนต์', keywords: ['อีเวนต์', 'event'] },
    { id: 'uniform', label: 'เสื้อยูนิฟอร์ม', keywords: ['ยูนิฟอร์ม', 'uniform'] },
    { id: 'school', label: 'เสื้อนักเรียน', keywords: ['นักเรียน', 'school'] },
    { id: 'team', label: 'เสื้อทีม', keywords: ['ทีม', 'team'] },
] as const;

function fabricSearchText(fabric: FabricsCollectionItem) {
    return [fabric.uid, fabric.nameEn, fabric.nameTh, fabric.recommendForStyle, ...(fabric.advantage || [])]
        .join(' ')
        .toLowerCase();
}

export function extractFabricGram(fabric: FabricsCollectionItem): number | null {
    return typeof fabric.gramWeight === 'number' ? fabric.gramWeight : null;
}

function matchesKeywords(text: string, keywords: readonly string[]) {
    return keywords.some((keyword) => text.includes(keyword.toLowerCase()));
}

function matchesShirtTypes(fabric: FabricsCollectionItem, selected: string[]) {
    if (!selected.length) {
        return true;
    }

    return selected.some((id) => {
        const option = shirtTypeOptions.find((item) => item.id === id);
        return option?.productTypes.some((type) => fabric.forProductType?.includes(type));
    });
}

function matchesMaterials(fabric: FabricsCollectionItem, selected: string[]) {
    if (!selected.length) {
        return true;
    }

    const text = fabricSearchText(fabric);

    return selected.some((id) => {
        const option = materialOptions.find((item) => item.id === id);
        return option ? matchesKeywords(text, option.keywords) : false;
    });
}

function matchesUsages(fabric: FabricsCollectionItem, selected: string[]) {
    if (!selected.length) {
        return true;
    }

    const text = fabricSearchText(fabric);

    return selected.some((id) => {
        const option = usageOptions.find((item) => item.id === id);
        return option ? matchesKeywords(text, option.keywords) : false;
    });
}

function matchesGramRange(fabric: FabricsCollectionItem, gramMin: number | null, gramMax: number | null) {
    if (gramMin === null && gramMax === null) {
        return true;
    }

    const gram = extractFabricGram(fabric);
    if (gram === null) {
        return false;
    }

    if (gramMin !== null && gram < gramMin) {
        return false;
    }

    if (gramMax !== null && gram > gramMax) {
        return false;
    }

    return true;
}

export function filterFabrics(fabrics: FabricsCollectionItem[], filters: FabricFilterState, pageType = 'fabric-specification') {
    return fabrics
        .filter((fabric) => fabric.forProductType?.includes(pageType))
        .filter((fabric) => matchesShirtTypes(fabric, filters.shirtTypes))
        .filter((fabric) => matchesMaterials(fabric, filters.materials))
        .filter((fabric) => matchesUsages(fabric, filters.usages))
        .filter((fabric) => matchesGramRange(fabric, filters.gramMin, filters.gramMax))
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export function toggleFilterValue(values: string[], value: string) {
    return values.includes(value) ? values.filter((item) => item !== value) : [...values, value];
}
