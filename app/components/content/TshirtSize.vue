<script setup lang="ts">
// VARIABLE
const { data: sizeData } = await useAsyncData(`sizeTab`, () => queryCollection('size').order('order', 'ASC').all());
</script>
<template>
    <div>
        <div class="border-2 border-primary rounded-lg p-2">
            <div class="grid grid-cols-2 gap-3">
                <ProseImg v-for="tab in sizeData" :key="tab.uid" :src="tab.imageUrl" :alt="tab.name" class="rounded-lg" />
            </div>
        </div>
    </div>
</template>
