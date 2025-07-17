export enum PoloComponent {
    COLLAR = 'collar',
    PLACKET = 'placket',
    SLEEVE = 'sleeve',
    POCKET = 'pocket',
}

export const poloComponentLabel: { label: string; value: PoloComponent }[] = [
    {
        label: 'ปกเสื้อ',
        value: PoloComponent.COLLAR,
    },
    { label: 'สาบเสื้อ', value: PoloComponent.PLACKET },
    { label: 'แขนเสื้อ', value: PoloComponent.SLEEVE },
    { label: 'กระเป๋า', value: PoloComponent.POCKET },
];

export const poloComponentList: Record<PoloComponent, { label: string; imgUrl: string; value: string }[]> = {
    [PoloComponent.COLLAR]: [
        {
            label: 'style1',
            value: 'style1',
            imgUrl: '/image/product/polo/collar/polo_collar_style1.png',
        },
        {
            label: 'style2',
            value: 'style2',
            imgUrl: '/image/product/polo/collar/polo_collar_style2.png',
        },
        {
            label: 'style3',
            value: 'style3',
            imgUrl: '/image/product/polo/collar/polo_collar_style3.png',
        },
        {
            label: 'style4',
            value: 'style4',
            imgUrl: '/image/product/polo/collar/polo_collar_style4.png',
        },
        {
            label: 'style5',
            value: 'style5',
            imgUrl: '/image/product/polo/collar/polo_collar_style5.png',
        },
        {
            label: 'style6',
            value: 'style6',
            imgUrl: '/image/product/polo/collar/polo_collar_style6.png',
        },
    ],
    [PoloComponent.PLACKET]: [
        {
            label: 'style1',
            value: 'style1',
            imgUrl: '/image/product/polo/placket/polo_placket_style1.png',
        },
        {
            label: 'style2',
            value: 'style2',
            imgUrl: '/image/product/polo/placket/polo_placket_style2.png',
        },
        {
            label: 'style3',
            value: 'style3',
            imgUrl: '/image/product/polo/placket/polo_placket_style3.png',
        },
        {
            label: 'style4',
            value: 'style4',
            imgUrl: '/image/product/polo/placket/polo_placket_style4.png',
        },
        {
            label: 'style5',
            value: 'style5',
            imgUrl: '/image/product/polo/placket/polo_placket_style5.png',
        },
        {
            label: 'style6',
            value: 'style6',
            imgUrl: '/image/product/polo/placket/polo_placket_style6.png',
        },
    ],
    [PoloComponent.SLEEVE]: [
        {
            label: 'style1',
            value: 'style1',
            imgUrl: '/image/product/polo/sleeve/polo_sleeve_style1.png',
        },
        {
            label: 'style2',
            value: 'style2',
            imgUrl: '/image/product/polo/sleeve/polo_sleeve_style2.png',
        },
        {
            label: 'style3',
            value: 'style3',
            imgUrl: '/image/product/polo/sleeve/polo_sleeve_style3.png',
        },
        {
            label: 'style4',
            value: 'style4',
            imgUrl: '/image/product/polo/sleeve/polo_sleeve_style4.png',
        },
        {
            label: 'style5',
            value: 'style5',
            imgUrl: '/image/product/polo/sleeve/polo_sleeve_style5.png',
        },
        {
            label: 'style6',
            value: 'style6',
            imgUrl: '/image/product/polo/sleeve/polo_sleeve_style6.png',
        },
        {
            label: 'style7',
            value: 'style7',
            imgUrl: '/image/product/polo/sleeve/polo_sleeve_style7.png',
        },
        {
            label: 'style8',
            value: 'style8',
            imgUrl: '/image/product/polo/sleeve/polo_sleeve_style8.png',
        },
        {
            label: 'style9',
            value: 'style9',
            imgUrl: '/image/product/polo/sleeve/polo_sleeve_style9.png',
        },
        {
            label: 'style10',
            value: 'style10',
            imgUrl: '/image/product/polo/sleeve/polo_sleeve_style10.png',
        },
    ],
    [PoloComponent.POCKET]: [
        {
            label: 'style1',
            value: 'style1',
            imgUrl: '/image/product/polo/pocket/polo_pocket_style1.png',
        },
        {
            label: 'style2',
            value: 'style2',
            imgUrl: '/image/product/polo/pocket/polo_pocket_style2.png',
        },
        {
            label: 'style3',
            value: 'style3',
            imgUrl: '/image/product/polo/pocket/polo_pocket_style3.png',
        },
        {
            label: 'style4',
            value: 'style4',
            imgUrl: '/image/product/polo/pocket/polo_pocket_style4.png',
        },
        {
            label: 'style5',
            value: 'style5',
            imgUrl: '/image/product/polo/pocket/polo_pocket_style5.png',
        },
    ],
};
