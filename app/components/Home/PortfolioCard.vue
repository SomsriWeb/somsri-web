<script setup lang="ts">
// PROPS
interface Props {
    name: string;
    url: string;
    image: string;
    alt?: string;
}
defineProps<Props>();
</script>
<template>
    <div class="relative rounded-xl overflow-hidden h-full">
        <ProseImg :src="image" :alt="alt || name" class="h-full aspect-5/7 object-cover" sizes="sm:300px 3xl:400px" />
        <div class="absolute inset-0 bg-black/15" />
        <h3 class="absolute top-3 left-3 text-white text-xl">{{ name }}</h3>

        <!-- TODO: รอทำหน้าแยกก่อนค่อยมาเปิด -->
        <!-- <UButton
			color="neutral"
			variant="outline"
			class="!text-primary absolute bottom-5 right-5 rounded-full !min-w-fit"
			icon="lucide:plus"
		/> -->
    </div>
</template>
