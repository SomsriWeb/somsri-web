<script setup lang="ts">
import BandPriceGroupSlider from '~/components/BandPriceGroupSlider.vue';

interface PriceTier {
    qty: string;
    price: number | string;
}

interface SizeCard {
    size: string;
    startQty?: string;
    startPrice: number | string;
    tiers: PriceTier[];
}

interface FabricGroup {
    title: string;
    description: string;
    sizes: SizeCard[];
}

interface Props {
    groups?: FabricGroup[];
    note1?: string;
    note2?: string;
}

const defaultGroups: FabricGroup[] = [
    {
        title: 'Cotton 100% (เสื้อยืดเปล่า)',
        description:
            'คอตตอน 100% ผ่านกระบวนการผลิตเส้นด้ายโดยวิธีการสางเส้นใยฝ้ายโดยเครื่องจักร ทำให้ได้ผลผลิตเป็นเส้นด้ายใยสั้นที่มีขนาดใหญ่ มีความเหนียวนุ่ม',
        sizes: [
            {
                size: 'Size S',
                startQty: '100+ ตัว',
                startPrice: 112,
                tiers: [
                    { qty: '151 +', price: 108 },
                    { qty: '251 +', price: 102 },
                    { qty: '351 +', price: 98 },
                    { qty: '501 +', price: 90 },
                ],
            },
            {
                size: 'Size M',
                startQty: '100+ ตัว',
                startPrice: 112,
                tiers: [
                    { qty: '151 +', price: 108 },
                    { qty: '251 +', price: 102 },
                    { qty: '351 +', price: 98 },
                    { qty: '501 +', price: 90 },
                ],
            },
            {
                size: 'Size L',
                startQty: '100+ ตัว',
                startPrice: 112,
                tiers: [
                    { qty: '151 +', price: 108 },
                    { qty: '251 +', price: 102 },
                    { qty: '351 +', price: 98 },
                    { qty: '501 +', price: 90 },
                ],
            },
            {
                size: 'Size XL',
                startQty: '100+ ตัว',
                startPrice: 112,
                tiers: [
                    { qty: '151 +', price: 108 },
                    { qty: '251 +', price: 102 },
                    { qty: '351 +', price: 98 },
                    { qty: '501 +', price: 90 },
                ],
            },
        ],
    },
    {
        title: 'Cotton Comb 32 (เสื้อยืดเปล่า)',
        description:
            'มาตรฐาน เป็นที่นิยม เกรดผ้า เกรดผ้าหนาระดับปานกลาง ผ้าจะทิ้งตัวสวมใส่สบาย ระบายอากาศได้อย่างดีเยี่ยม ผ้าชนิดนี้เป็นผ้าที่ขายดีที่สุดสำหรับคนเริ่มต้นสร้างแบรนด์เสื้อผ้า',
        sizes: [
            {
                size: 'Size S',
                startQty: '100+ ตัว',
                startPrice: 122,
                tiers: [
                    { qty: '151 +', price: 118 },
                    { qty: '251 +', price: 112 },
                    { qty: '351 +', price: 108 },
                    { qty: '501 +', price: 100 },
                ],
            },
            {
                size: 'Size M',
                startQty: '100+ ตัว',
                startPrice: 122,
                tiers: [
                    { qty: '151 +', price: 118 },
                    { qty: '251 +', price: 112 },
                    { qty: '351 +', price: 108 },
                    { qty: '501 +', price: 100 },
                ],
            },
            {
                size: 'Size L',
                startQty: '100+ ตัว',
                startPrice: 122,
                tiers: [
                    { qty: '151 +', price: 118 },
                    { qty: '251 +', price: 112 },
                    { qty: '351 +', price: 108 },
                    { qty: '501 +', price: 100 },
                ],
            },
            {
                size: 'Size XL',
                startQty: '100+ ตัว',
                startPrice: 122,
                tiers: [
                    { qty: '151 +', price: 118 },
                    { qty: '251 +', price: 112 },
                    { qty: '351 +', price: 108 },
                    { qty: '501 +', price: 100 },
                ],
            },
        ],
    },
];

const props = withDefaults(defineProps<Props>(), {
    groups: () => [],
    note1: '* ราคานี้เป็นราคาเสื้อเปล่ายังไม่รวม Vat 7 %',
    note2: 'หากต้องการเป็นไซส์ XL ล้วนหรือไซส์ XL เกินครึ่งนึงของจำนวนตัวที่สั่งซื้อทั้งหมด ราคาจะเพิ่มตัวละ 20 บาท (เนื่องจาก เสื้อไซส์ใหญ่จะใช้ผ้าเยอะนะคะ)',
});

const displayGroups = computed(() => (props.groups && props.groups.length > 0 ? props.groups : defaultGroups));
</script>

<template>
    <section class="w-full py-8 lg:py-12">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 lg:space-y-16">
            <!-- Fabric Groups with Swiper Slider -->
            <BandPriceGroupSlider
                v-for="group in displayGroups"
                :key="group.title"
                :title="group.title"
                :description="group.description"
                :sizes="group.sizes"
            />

            <!-- Footer Notes -->
            <div class="pt-2 text-left space-y-1.5 px-2">
                <p class="text-sm sm:text-base font-semibold text-primary">
                    {{ note1 }}
                </p>
                <p class="text-sm sm:text-base font-semibold text-primary leading-relaxed">
                    {{ note2 }}
                </p>
            </div>
        </div>
    </section>
</template>
