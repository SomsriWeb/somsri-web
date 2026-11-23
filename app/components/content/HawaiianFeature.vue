<script setup lang="ts">
// PROPS
interface Props {
    titleTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
}
const { titleTag = 'p' } = defineProps<Props>();

// VARIABLE
const featureItems = [
    {
        id: 'hawaiian-feature-1',
        icon: 'i-lucide-feather',
        text: 'เนื้อผ้านุ่ม ลื่น และเบาเป็นพิเศษ',
        'text-en': 'Extra soft, smooth and lightweight',
        description: 'สัมผัสเรียบหรู ให้ความรู้สึกสบายเมื่อสวมใส่ เหมาะกับอากาศร้อน',
        'description-en': 'A luxuriously smooth touch that feels comfortable to wear, ideal for hot weather',
    },
    {
        id: 'hawaiian-feature-2',
        icon: 'i-material-symbols-cool-to-dry-outline-rounded',
        text: 'ระบายอากาศดี ไม่อับชื้น',
        'text-en': 'Breathable and moisture-free',
        description: 'เส้นใยไหมละเอียดช่วยให้ผ้าระบายความร้อนได้ดี เหมาะกับเสื้อเชิ้ตและเสื้อฮาวาย',
        'description-en': 'Fine silk fibers help the fabric release heat well, perfect for shirts and Hawaiian shirts',
    },
    {
        id: 'hawaiian-feature-3',
        icon: 'i-lucide-palette',
        text: 'สีสวยคม ไม่ซีดง่าย',
        'text-en': 'Vivid colors that resist fading',
        description: 'ย้อมสีได้ติดแน่น ให้เฉดสีลึกและสม่ำเสมอ เหมาะกับงานแฟชั่นระดับพรีเมียม',
        'description-en': 'Dyes hold firmly for deep, even shades, ideal for premium fashion',
    },
    {
        id: 'hawaiian-feature-4',
        icon: 'i-humbleicons-ai',
        text: 'เงางามหรูหรา มีมิติในแสงธรรมชาติ',
        'text-en': 'A luxurious sheen with depth in natural light',
        description: 'ผ้าไหมอิตาลีมีความเงาแบบซาตินอ่อน ๆ ดูแพงโดยไม่ฉูดฉาด',
        'description-en': 'Italian silk has a soft satin sheen that looks expensive without being flashy',
    },
];

const { locale } = useI18n();
const features = computed(() =>
    featureItems.map((feat) => {
        const en = locale.value === 'en';
        return {
            id: feat.id,
            icon: feat.icon,
            text: en ? feat['text-en'] : feat.text,
            description: en ? feat['description-en'] : feat.description,
        };
    }),
);
</script>
<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div v-for="feat of features" :key="feat.id" class="flex flex-col items-center gap-1">
            <Icon :name="feat.icon" class="text-primary" size="2rem" />
            <component :is="titleTag" class="text-primary text-center font-bold">{{ feat.text }}</component>
            <p class="text-xs text-stone-600 text-center">{{ feat.text }}</p>
        </div>
    </div>
</template>
