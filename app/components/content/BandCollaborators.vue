<script setup lang="ts">
interface Props {
    /** ความเร็วของ marquee (วินาที) */
    duration?: number;
}

withDefaults(defineProps<Props>(), {
    duration: 60,
});

const { data: artists } = await useAsyncData('band-collaborators', () =>
    queryCollection('collaborators')
        .where('category', '=', 'artist')
        .order('order', 'ASC')
        .all()
);
</script>

<template>
    <div class="w-full my-2 lg:my-4 py-2 overflow-hidden">
        <ClientOnly>
            <Vue3Marquee :duration="duration" class="rounded-xl min-h-full">
                <ProseImg
                    v-for="brand in artists"
                    :key="brand.src"
                    class="h-6 w-auto object-contain mx-2"
                    :src="brand.src"
                    :alt="brand.alt"
                />
            </Vue3Marquee>
        </ClientOnly>
    </div>
</template>
