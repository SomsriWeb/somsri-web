import type { ProductStyle } from '~/types/design';
import type { SelectOption } from '~/types/Global';

export enum ProductTypeKey {
    TSHIRT = 'tshirt',
    POLO = 'polo',
    TOTEBAG = 'totebag',
    APRON = 'apron',
}

export enum FabricKey {
    COTTONCOMB = 'cottoncomb',
    COTTON100 = 'cotton100',
    SUPERSOFF = 'supersoff',
    MICROSPORT = 'microsport',
    TC_LACOSTE = 'tclacoste',
    DRYTECH = 'drytech',
    CANVAS_12_ONZE = 'canvas12onze',
    DEFAULT = 'default',
}

export function shortcut() {
    const commandKey = 'ctrl';

    return [
        //control = command, ctrl
        //if want to use ctrl, write it to ctrl
        {
            key: `${commandKey} + z`,
            action: 'ย้อนกลับ',
        },
        {
            key: `${commandKey} + r`,
            action: 'ทำประวัติต่อไป',
        },
        {
            key: `${commandKey} + d`,
            action: 'ทำซ้ำ',
        },
        {
            key: `${commandKey} + a`,
            action: 'เลือกวัตถุทั้งหมด',
        },
        {
            key: `${commandKey} + g`,
            action: 'กรุ๊ปวัตถุที่เลือก',
        },
        {
            key: `${commandKey} + f`,
            action: 'เปิด/ปิดแท็บเลเยอร์',
        },
        {
            key: 'Shift + Click',
            action: 'เลือกวัตถุมากกว่า 1 อัน',
        },
        {
            key: 'Right Click',
            action: 'เปิดแท็บเครื่องมือด่วน',
        },
        {
            key: 'Backspace',
            action: 'ลบ Object',
        },
    ];
}

export const products: SelectOption[] = [
    {
        label: 'เสื้อยืด',
        value: ProductTypeKey.TSHIRT,
    },
    { label: 'เสื้อโปโล', value: ProductTypeKey.POLO },
    { label: 'กระเป๋า', value: ProductTypeKey.TOTEBAG },
    { label: 'ผ้ากันเปื้อน', value: ProductTypeKey.APRON },
];

export const fabrics: Record<string, SelectOption[]> = {
    [ProductTypeKey.TSHIRT]: [
        {
            label: 'Cotton Comb',
            value: FabricKey.COTTONCOMB,
        },
        {
            label: 'Cotton 100%',
            value: FabricKey.COTTON100,
        },
        {
            label: 'SuperSoff',
            value: FabricKey.SUPERSOFF,
        },
        {
            label: 'ไมโครกีฬา',
            value: FabricKey.MICROSPORT,
        },
    ],
    [ProductTypeKey.POLO]: [
        {
            label: 'TC Lacoste',
            value: FabricKey.TC_LACOSTE,
        },
        {
            label: 'Drytech',
            value: FabricKey.DRYTECH,
        },
    ],
    [ProductTypeKey.TOTEBAG]: [
        {
            label: 'ผ้าแคนวาส 12 ออนซ์',
            value: FabricKey.CANVAS_12_ONZE,
        },
    ],
    [ProductTypeKey.APRON]: [
        {
            label: 'ผ้าทำผ้ากันเปื้อน',
            value: FabricKey.DEFAULT,
        },
    ],
};

export const productStyle: Record<ProductTypeKey, ProductStyle[]> = {
    [ProductTypeKey.TSHIRT]: [
        {
            label: 'เสื้อยืดคอกลม',
            value: 'tshirt',
            imgUrl: '/image/product/tshirt/tshirt_round_neck.png',
        },
        {
            label: 'เสื้อยืดคอวี',
            value: 'tshirtv',
            imgUrl: '/image/product/tshirt/tshirt_V_neck.png',
        },
    ],
    [ProductTypeKey.TOTEBAG]: [
        {
            label: 'ทรงมาตรฐาน',
            value: 'standard',
            imgUrl: '/image/product/bag/bag_standard.png',
        },
        {
            label: 'ทรงก้นหอย',
            value: 'spiral',
            imgUrl: '/image/product/bag/bag_spiral.png',
        },
        {
            label: 'ทรงเกาหลี',
            value: 'korea',
            imgUrl: '/image/product/bag/bag_Korea.png',
        },
    ],
    [ProductTypeKey.POLO]: [{ label: 'มาตรฐาน', value: 'standard', imgUrl: '' }],
    [ProductTypeKey.APRON]: [{ label: 'มาตรฐาน', value: 'standard', imgUrl: '' }],
};

export const sideModel = {
    [ProductTypeKey.APRON]: [
        ['front', 'หน้า', 'f'],
        ['back', 'หลัง', 'b'],
    ],
    [ProductTypeKey.POLO]: [
        ['front', 'หน้า', 'f'],
        ['left', 'ซ้าย', 'l'],
        ['back', 'หลัง', 'b'],
        ['right', 'ขวา', 'r'],
    ],
    [ProductTypeKey.TOTEBAG]: [
        ['front', 'หน้า', 'f'],
        ['back', 'หลัง', 'b'],
    ],
    [ProductTypeKey.TSHIRT]: [
        ['front', 'หน้า', 'f'],
        ['left', 'ซ้าย', 'l'],
        ['back', 'หลัง', 'b'],
        ['right', 'ขวา', 'r'],
    ],
};
