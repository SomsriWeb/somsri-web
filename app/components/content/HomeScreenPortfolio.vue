<script setup lang="ts">
// PROPS
interface Props {
    lang?: 'th' | 'en';
}
const { lang = 'th' } = defineProps<Props>();
// SLOTS
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
const { data: screens } = await useAsyncData('data-screens', () => {
    return queryCollection('screen').order('order', 'ASC').all();
});

// STATE
const isModalOpen = ref(false);
const initialImageIndex = ref(0);

// COMPUTED
const displayedScreens = computed(() => {
    if (!screens.value || screens.value.length === 0) return [];
    return screens.value.slice(0, 5);
});

// Convert screens to image format for gallery
const galleryImages = computed(() => {
    if (!screens.value || screens.value.length === 0) return [];
    return screens.value.map((screen) => ({
        id: screen.id,
        image: screen.image,
        alt: lang === 'th' ? screen.alt : screen['alt-en'],
        title: lang === 'th' ? screen.name : screen['name-en'],
        'title-en': screen['name-en'],
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

        <!-- ใช้ grid แทน swiper -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5">
            <HomePortfolioCard
                v-for="screen in displayedScreens"
                :key="screen.name"
                :name="lang === 'th' ? screen.name : screen['name-en']"
                :url="screen.url"
                :image="screen.image"
                :alt="lang === 'th' ? screen.alt : screen['alt-en']"
            />
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
