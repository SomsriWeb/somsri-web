<script setup lang="ts">
// ถ้าใช้ Nuxt 3 ปกติมันจะ Auto-import ให้ แต่ถ้า error ให้เพิ่มบรรทัดล่างนี้ครับ
// import { computed } from 'vue'; 

interface Props {
    basePath?: string;
    imageExtension?: string;
    title?: string;
    layout?: 'headband' | 'bottle'; 
}

const props = withDefaults(defineProps<Props>(), {
    basePath: '/headband', 
    imageExtension: 'png',
    title: 'ไอเดียการใช้งาน',
    layout: 'headband',
});

// จัดการชุดข้อมูลรูปภาพตาม Layout ที่เลือกอัตโนมัติ
const items = computed(() => {
    if (props.layout === 'bottle') {
        return ['g1', 'g2', 'g3']; 
    }
    // ถ้าเป็นหน้าปกติ (headband)
    return ['hb1', 'hb2', 'hb3', 'hb4', 'hb5', 'hb6'];
});

// ปรับให้รองรับ undefined ได้ เผื่อในกรณีที่หา Array ไม่เจอ TypeScript จะได้ไม่ฟ้อง Error
const imageSrc = (key?: string) => {
    if (!key) return '';
    return `${props.basePath}/${key}.${props.imageExtension}`;
};
</script>

<template>
    <div class="w-full bg-white py-10 px-4 lg:px-8">
        <h2 class="text-center text-2xl lg:text-3xl font-bold text-primary mb-8">
            {{ props.title }}
        </h2>

        <template v-if="props.layout === 'headband'">
            <div class="desktop-grid" style="display:none; flex-direction:column; gap:1rem;">
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
                    <div
                        v-for="index in [0, 1]"
                        :key="index"
                        style="border-radius:1rem; overflow:hidden; aspect-ratio:1/1;"
                    >
                        <img :src="imageSrc(items[index])" :alt="items[index]" style="width:100%; height:100%; object-fit:cover; object-position:center;" />
                    </div>
                </div>
                <div style="display:grid; grid-template-columns:repeat(4,1fr); gap:1rem;">
                    <div
                        v-for="index in [2, 3, 4, 5]"
                        :key="index"
                        style="border-radius:1rem; overflow:hidden; aspect-ratio:1/1;"
                    >
                        <img :src="imageSrc(items[index])" :alt="items[index]" style="width:100%; height:100%; object-fit:cover;" />
                    </div>
                </div>
            </div>

            <div class="mobile-grid max-w-lg mx-auto" style="display:flex; flex-direction:column; gap:1rem;">
                <div style="border-radius:1rem; overflow:hidden;">
                    <img :src="imageSrc(items[0])" :alt="items[0]" style="width:100%; object-fit:contain;" />
                </div>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
                    <div
                        v-for="index in [2, 3, 4, 5]"
                        :key="index"
                        style="border-radius:1rem; overflow:hidden; aspect-ratio:1/1;"
                    >
                        <img :src="imageSrc(items[index])" :alt="items[index]" style="width:100%; height:100%; object-fit:cover;" />
                    </div>
                </div>
                <div style="border-radius:1rem; overflow:hidden;">
                    <img :src="imageSrc(items[1])" :alt="items[1]" style="width:100%; object-fit:contain;" />
                </div>
            </div>
        </template>

        <template v-else-if="props.layout === 'bottle'">
            <div class="desktop-grid" style="display:none; flex-direction:column; gap:1rem;">
                <div style="display:grid; grid-template-columns:3fr 2fr; gap:1rem;">
                    
                    <div style="border-radius:1rem; overflow:hidden;">
                        <img :src="imageSrc(items[0])" :alt="items[0]" style="width:100%; height:100%; object-fit:cover; object-position:center;" />
                    </div>

                    <div style="display:flex; flex-direction:column; gap:1rem;">
                        <div style="border-radius:1rem; overflow:hidden; aspect-ratio:1/1;">
                            <img :src="imageSrc(items[1])" :alt="items[1]" style="width:100%; height:100%; object-fit:cover; object-position:center;" />
                        </div>
                        <div style="border-radius:1rem; overflow:hidden; aspect-ratio:1/1;">
                            <img :src="imageSrc(items[2])" :alt="items[2]" style="width:100%; height:100%; object-fit:cover; object-position:center;" />
                        </div>
                    </div>
                    
                </div>
            </div>

            <div class="mobile-grid max-w-lg mx-auto" style="display:flex; flex-direction:column; gap:1rem;">
                <div style="border-radius:1rem; overflow:hidden;">
                    <img :src="imageSrc(items[0])" :alt="items[0]" style="width:100%; object-fit:contain;" />
                </div>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
                    <div style="border-radius:1rem; overflow:hidden; aspect-ratio:1/1;">
                        <img :src="imageSrc(items[1])" :alt="items[1]" style="width:100%; height:100%; object-fit:cover;" />
                    </div>
                    <div style="border-radius:1rem; overflow:hidden; aspect-ratio:1/1;">
                        <img :src="imageSrc(items[2])" :alt="items[2]" style="width:100%; height:100%; object-fit:cover;" />
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<style scoped>
@media (min-width: 1024px) {
    .desktop-grid {
        display: flex !important;
    }
    .mobile-grid {
        display: none !important;
    }
}
</style>