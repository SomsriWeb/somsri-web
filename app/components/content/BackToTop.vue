<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

import { LINE_LINK } from '~/lib/lineLink';

const lineLinkFromPage = inject<string | undefined>(LINE_LINK);
const lineLink = computed(() => lineLinkFromPage || 'https://line.me/R/ti/p/%40diz8986o');

const showButton = ref(false);

const handleScroll = () => {
    showButton.value = window.scrollY > 200;
};

const scrollToTop = () => {
    window.scrollTo({
        top: 0,

        behavior: 'smooth',
    });
};

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
    <div class="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
        <NuxtLink :to="lineLink" external target="_blank" rel="noopener noreferrer" class="leading-none" aria-label="ติดต่อทาง LINE">
            <UButton icon="fa6-brands:line" size="sm" square class="rounded-full min-w-0! bg-[#06C755] text-white hover:bg-[#05b04c]" />
        </NuxtLink>

        <UButton v-if="showButton" icon="i-lucide-arrow-up" size="sm" square class="rounded-full min-w-0!" aria-label="Back to top" @click="scrollToTop" />
    </div>
</template>
