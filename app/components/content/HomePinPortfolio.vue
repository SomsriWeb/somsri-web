<script setup lang="ts">
// PROPS
interface Props {
    /**
     * ใช้ภาษาไทยเป็นค่า default
     */
    lang?: 'th' | 'en';
}
const { lang = 'th' } = defineProps<Props>();

interface Slots {
    /**
     * หัวข้อ
     */
    title(): unknown;

    /**
     * รายละเอียด
     */
    description(): unknown;
}
defineSlots<Slots>();

// VARIABLE
const { data: pins } = await useAsyncData('data-pin', () => {
    return queryCollection('pin').order('order', 'ASC').all();
});

// STATE
const isModalOpen = ref(false);
const initialImageIndex = ref(0);

// COMPUTED
const displayedPins = computed(() => {
    if (!pins.value || pins.value.length === 0) return [];
    return pins.value.slice(0, 5);
});

// Convert pins to image format for gallery
const galleryImages = computed(() => {
    if (!pins.value || pins.value.length === 0) return [];
    return pins.value.map((pin) => ({
        id: pin.id,
        image: pin.image,
        alt: lang === 'th' ? pin.alt : pin['alt-en'],
        title: lang === 'th' ? pin.name : pin['name-en'],
        'title-en': pin['name-en'],
    }));
});

// FUNCTIONS
function openModal() {
    initialImageIndex.value = 0;
    isModalOpen.value = true;
}
</script>

<template>
    <div>
        <div class="mb-5">
            <slot name="title" />
            <slot name="description" />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5">
            <div
                v-for="(pin, index) in displayedPins"
                :key="pin.name"
                class="relative group"
            >
                <HomePortfolioCard
                    :name="lang === 'th' ? pin.name : pin['name-en']"
                    :url="pin.url"
                    :image="pin.image"
                    :alt="lang === 'th' ? pin.alt : pin['alt-en']"
                />
            </div>
        </div>

        <!-- View More Button -->
        <div class="flex justify-center mt-6">
            <UButton
                @click="openModal"
                color="primary"
                variant="solid"
                size="lg"
            >
                {{ lang === 'th' ? 'ดูเพิ่มเติม' : 'View More' }}
            </UButton>
        </div>

        <!-- Modal Component -->
        <ImageGalleryModal
            v-model:open="isModalOpen"
            :images="galleryImages"
            :lang="lang"
            :initial-index="initialImageIndex"
        />
    </div>
</template>
