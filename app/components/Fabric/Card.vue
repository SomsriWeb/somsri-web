<script setup lang="ts">
// PROPS
interface Props {
    name: string;
    imageUrl: string;
    popupImageUrl: string | undefined;
    usePopup?: boolean;
    alt?: string;
}

const { name, imageUrl, popupImageUrl, alt = '', usePopup = false } = defineProps<Props>();

// VARIABLE
const isModalOpen = ref<boolean>(false);

// COMPUTED
const popupImageAlt = computed(() => `${name} popup`);

// FUNCTION
function openPopup() {
    if (usePopup) {
        isModalOpen.value = true;
    }
}
</script>
<template>
    <div class="fabric-card cursor-pointer h-full min-w-0">
        <div
            class="fabric-card__media relative aspect-square w-full overflow-hidden rounded-xl transition-all duration-300 hover:scale-105"
        >
            <ProseImg :src="imageUrl" :alt="alt || name" @click="openPopup" />

            <div
                class="bg-primary absolute inset-x-0 bottom-0 w-full p-0.5 px-2 md:px-3 text-white font-medium text-xs xl:text-lg"
            >
                <p class="line-clamp-2 min-h-[2lh] leading-tight">{{ name }}</p>
            </div>
        </div>

        <UModal v-if="usePopup && popupImageUrl" :class="{ hidden: !isModalOpen }" class="max-w-sm" :modal="isModalOpen" :overlay="isModalOpen" open @update:open="(value) => (isModalOpen = value)">
            <template #content>
                <img :src="popupImageUrl" :alt="popupImageAlt" />
            </template>
        </UModal>
    </div>
</template>

<style scoped>
/* ProseImg ใส่ w-full อย่างเดียว — บังคับเต็มกรอบจัตุรัส + crop ให้การ์ดเท่ากัน */
.fabric-card__media :deep(img) {
    display: block;
    height: 100%;
    width: 100%;
    object-fit: cover;
}
</style>
