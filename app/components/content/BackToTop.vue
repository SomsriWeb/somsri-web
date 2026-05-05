<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const showButton = ref(false);

const handleScroll = () => {
    // Show button if user has scrolled down more than 200px
    showButton.value = window.scrollY > 200;
};

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth', // Smooth scrolling animation
    });
};

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
    // Clean up event listener when component is unmounted
    window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
    <UButton v-if="showButton" icon="i-lucide-arrow-up" class="absolute fixed bottom-4 right-4 rounded-full !min-w-0 z-50" @click="scrollToTop" aria-label="Back to top" />
</template>
