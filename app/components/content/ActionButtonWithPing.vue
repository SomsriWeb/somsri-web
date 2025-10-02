<template>
    <UButton size="xl" color="primary" variant="solid" icon="i-lucide-send" class="relative">
        <slot mdc-unwrap="h1 h2 h3 h4 h5 h6 p" />

        <!-- จุด ping animation -->
        <span class="absolute top-0 right-0 -mt-1 -mr-1 flex size-3 rounded-full bg-primary-200 animate-ping" />
    </UButton>
</template>
