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
    <div class="cursor-pointer">
        <div class="relative rounded-xl overflow-hidden hover:scale-105 transition-all duration-300">
            <ProseImg :src="imageUrl" :alt="alt || name" @click="openPopup" />

            <div class="bg-primary absolute bottom-0 w-full p-0.5 px-2 md:px-3 text-white font-medium text-xs xl:text-lg">
                <p>{{ name }}</p>
            </div>
        </div>

        <UModal v-if="usePopup && popupImageUrl" :class="{ hidden: !isModalOpen }" class="max-w-sm" :modal="isModalOpen" :overlay="isModalOpen" open @update:open="(value) => (isModalOpen = value)">
            <template #content>
                <img :src="popupImageUrl" :alt="popupImageAlt" />
            </template>
        </UModal>
    </div>
</template>
