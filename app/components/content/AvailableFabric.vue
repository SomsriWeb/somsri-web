<script setup lang="ts">
// PROPS
interface Props {
    /**
     * ประเภทของสินค้า
     */
    type: 'tshirt' | 'polo' | 'sweater' | 'jacket' | 'coat' | 'dress' | 'other';
}
const { type } = defineProps<Props>();

// VARIABLE
const { data } = await useAsyncData('fabrics', () => {
    return queryCollection('fabrics').order('labelEn', 'ASC').all();
});

// COMPUTED
const fabrics = computed(() => {
    return data.value?.filter((fabric) => fabric.forProductType.includes(type));
});
</script>
<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        <div v-for="fabric in fabrics" :key="fabric.id" class="">
            <ProseImg :src="fabric.image" :alt="fabric.labelEn" class="rounded-lg mb-2" />

            <!-- หัวข้อ -->
            <h3 class="text-lg uppercase text-black font-medium w-max leading-none">
                {{ fabric.labelEn }}
            </h3>

            <!-- คำอธิบาย (เทา) -->
            <p class="text-stone-500 text-sm leading-normal w-max mb-1">สำหรับทำ{{ fabric.recommendForStyle }}</p>

            <!-- รายการ (แดง) -->
            <ul class="list-disc list-inside font-light text-primary space-y-1 ">
                <li v-for="advantage in fabric.advantage" :key="advantage" class="text-sm w-max leading-none ">
                    {{ advantage }}
                </li>
            </ul>
        </div>
    </div>
</template>
