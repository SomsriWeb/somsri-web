<script setup lang="ts">
// PROPS
interface Props {
    titleTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
}
const { titleTag = 'p' } = defineProps<Props>();

// VARIABLE
const features = [
    {
        id: 'hawaiian-feature-1',
        icon: 'i-lucide-feather',
        text: 'เนื้อผ้านุ่ม ลื่น และเบาเป็นพิเศษ',
        description: 'สัมผัสเรียบหรู ให้ความรู้สึกสบายเมื่อสวมใส่ เหมาะกับอากาศร้อน',
    },
    {
        id: 'hawaiian-feature-2',
        icon: 'i-material-symbols-cool-to-dry-outline-rounded',
        text: 'ระบายอากาศดี ไม่อับชื้น',
        description: 'เส้นใยไหมละเอียดช่วยให้ผ้าระบายความร้อนได้ดี เหมาะกับเสื้อเชิ้ตและเสื้อฮาวาย',
    },
    {
        id: 'hawaiian-feature-3',
        icon: 'i-lucide-palette',
        text: 'สีสวยคม ไม่ซีดง่าย',
        description: 'ย้อมสีได้ติดแน่น ให้เฉดสีลึกและสม่ำเสมอ เหมาะกับงานแฟชั่นระดับพรีเมียม',
    },
    {
        id: 'hawaiian-feature-4',
        icon: 'i-humbleicons-ai',
        text: 'เงางามหรูหรา มีมิติในแสงธรรมชาติ',
        description: 'ผ้าไหมอิตาลีมีความเงาแบบซาตินอ่อน ๆ ดูแพงโดยไม่ฉูดฉาด',
    },
];
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
