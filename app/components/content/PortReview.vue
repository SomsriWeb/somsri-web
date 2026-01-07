<script setup lang="ts">
import ProseH2 from './ProseH2.vue';
// SLOTS
interface Slots {
    /**
     * หัวข้อ
     */
     othertitle(): unknown;
}
defineSlots<Slots>();

// TYPES
interface ReviewItem {
    image: string;
    alt: string;
    order: number;
}

// VARIABLE
const { data: reviews } = await useAsyncData('data-portfolio-reviews', () => {
    return queryCollection('portfolioReview' as any).order('order' as any, 'ASC').all() as Promise<ReviewItem[]>;
});
</script>

<template>
    <div>
        <ProseH2 class="text-start text-5xl font-bold text-primary mb-3">
            <slot mdc-unwrap="p" name="othertitle" />
        </ProseH2>

        <UCarousel
            v-slot="{ item }"
            :items="reviews"
            loop
            dots
            :autoplay="{ delay: 3000 }"
            :ui="{
                item: 'ps-4 sm:basis-1/1 md:basis-1/2 lg:basis-1/3',
                dot: 'bg-stone-200 shadow-md data-[state=active]:bg-primary'
            }"
            class="w-full"
        >
            <div class="relative rounded-xl overflow-hidden w-full">
                <ProseImg
                    :src="item.image"
                    :alt="item.alt"
                    class="w-full h-auto object-cover rounded-xl"
                    sizes="sm:400px md:500px lg:600px"
                />
            </div>
        </UCarousel>
    </div>
</template>

