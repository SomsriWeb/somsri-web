<script setup lang="ts">
// PROPS
interface Props {
    titleTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
}
const { titleTag = 'p' } = defineProps<Props>();

// VARIABLE
const features = [
    {
        id: 'blanket-feature-1',
        icon: 'i-lucide-feather',
        text: 'สัมผัสนุ่มฟู เบา สบาย',
    },
    {
        id: 'blanket-feature-2',
        icon: 'i-lucide-sun',
        text: 'ระบายอากาศดี',
    },
    {
        id: 'blanket-feature-3',
        icon: 'i-hugeicons-baby-girl-dress',
        text: 'ไม่หด ไม่ขึ้นขุย',
    },
    {
        id: 'blanket-feature-4',
        icon: 'i-lucide-images',
        text: 'พิมพ์ลายได้คมชัด',
    },
];
</script>
<template>
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div v-for="feat of features" :key="feat.id" class="flex flex-col items-center gap-1">
            <Icon :name="feat.icon" class="text-primary" size="2rem" />
            <component :is="titleTag" class="text-sm text-primary text-center">{{ feat.text }}</component>
        </div>
    </div>
</template>
