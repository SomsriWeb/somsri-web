<script setup lang="ts">
// VARIABLE
const features = [
    {
        id: 'jersey-feature-1',
        icon: 'i-lucide-sun',
        text: 'ระบายอากาศดี',
    },
    {
        id: 'jersey-feature-2',
        icon: 'i-lucide-feather',
        text: 'นุ่มเรียบ ไม่ระคายผิว',
    },
    {
        id: 'jersey-feature-3',
        icon: 'i-material-symbols-cool-to-dry-outline-rounded',
        text: 'แห้งไว ไม่อับชื้น',
    },
    {
        id: 'jersey-feature-4',
        icon: 'i-lucide-palette',
        text: 'คงรูป สีไม่ซีดง่าย',
    },
];
</script>
<template>
    <div class="grid grid-cols-5 gap-3">
        <div class="col-span-2 flex flex-col items-center gap-1">
            <div class="rounded-full aspect-square overflow-hidden border-3 border-primary max-w-20">
                <ProseImg src="/fabrics/microsport.png" />
            </div>

            <p class="text-center text-primary font-bold">เนื้อผ้าไมโครสปอร์ต</p>

            <div v-for="feat of features" :key="feat.id" class="flex flex-col items-center gap-1">
                <Icon :name="feat.icon" class="text-primary" />
                <p class="text-xs text-primary text-center">{{ feat.text }}</p>
            </div>
        </div>

        <div class="col-span-3">
            <div class="relative h-full">
                <div class="w-full h-[50%] bg-linear-to-t from-white to-transparent absolute bottom-0" />
                <ProseImg src="/jersey/jersey-model.png" class="h-full object-cover object-left" />
            </div>
        </div>
    </div>
</template>
