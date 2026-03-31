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
const { data: pins } = useAsyncData('data-pin', () => {
    return queryCollection('pin').order('order', 'ASC').all();
});

// STATE
const isModalOpen = ref(false);
const initialImageIndex = ref(0);
const selectedCategory = ref<string | null>(null);

// COMPUTED
// Group pins by category (using id path)
const pinsByCategory = computed(() => {
    if (!pins.value || pins.value.length === 0) return new Map<string, NonNullable<typeof pins.value>>();
    
    const grouped = new Map<string, NonNullable<typeof pins.value>>();
    pins.value.forEach((pin) => {
        // Use category field if available, otherwise extract from id or url
        let category = (pin as { category?: string }).category;
        
        if (!category) {
            // Try to extract from id path (e.g., "pin/original/org" -> "original")
            if (pin.id && typeof pin.id === 'string') {
                const parts = pin.id.split('/');
                if (parts.length >= 2 && parts[0] === 'pin' && parts[1]) {
                    category = parts[1]; // Get folder name (original, satin, puff, etc.)
                }
            }
            
            // Fallback: try to extract from url if id doesn't work
            if (!category && pin.url) {
                const urlParts = pin.url.replace('/pin/', '').split('/');
                if (urlParts[0]) {
                    category = urlParts[0];
                }
            }
        }
        
        // Ensure category is a valid string
        const finalCategory = category || 'default';
        
        if (!grouped.has(finalCategory)) {
            grouped.set(finalCategory, []);
        }
        const categoryPins = grouped.get(finalCategory);
        if (categoryPins) {
            categoryPins.push(pin);
        }
    });
    return grouped;
});

// Get first pin from each category for display
const displayedPins = computed(() => {
    if (!pinsByCategory.value || pinsByCategory.value.size === 0) return [];
    
    const firstPins: NonNullable<typeof pins.value> = [];
    pinsByCategory.value.forEach((categoryPins) => {
        if (categoryPins.length > 0) {
            // Get the first pin (lowest order) from each category
            const sorted = [...categoryPins].sort((a, b) => (a.order || 0) - (b.order || 0));
            if (sorted[0]) {
                firstPins.push(sorted[0]);
            }
        }
    });
    
    // Sort by order
    return firstPins.sort((a, b) => (a.order || 0) - (b.order || 0));
});

// Get images for selected category
const galleryImages = computed(() => {
    if (!selectedCategory.value || !pinsByCategory.value) return [];
    
    const categoryPins = pinsByCategory.value.get(selectedCategory.value);
    if (!categoryPins || categoryPins.length === 0) return [];
    
    return categoryPins
        .sort((a, b) => (a.order || 0) - (b.order || 0))
        .map((pin) => ({
            id: pin.id,
            image: pin.image,
            alt: lang === 'th' ? pin.alt : pin['alt-en'],
            title: lang === 'th' ? pin.name : pin['name-en'],
            'title-en': pin['name-en'],
        }));
});

// FUNCTIONS
function openModal(pin: NonNullable<typeof pins.value>[number]) {
    // Use category field if available, otherwise extract from id or url
    let category = (pin as { category?: string }).category;
    
    if (!category) {
        // Try to extract from id path
        if (pin.id && typeof pin.id === 'string') {
            const parts = pin.id.split('/');
            if (parts.length >= 2 && parts[0] === 'pin' && parts[1]) {
                category = parts[1];
            }
        }
        
        // Fallback: try to extract from url if id doesn't work
        if (!category && pin.url) {
            const urlParts = pin.url.replace('/pin/', '').split('/');
            if (urlParts[0]) {
                category = urlParts[0];
            }
        }
    }
    
    // Ensure category is a valid string
    selectedCategory.value = category || 'default';
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

        <UCarousel
            v-slot="{ item }"
            :items="displayedPins"
            loop
            :start-index="2"
            align="center"
            :contain-scroll="false"
            arrows
            prev-icon="i-heroicons-chevron-left"
            next-icon="i-heroicons-chevron-right"
            class="w-full"
            :ui="{
                root: 'relative w-full min-w-0 overflow-hidden',
                viewport: 'min-w-0 px-10 sm:px-12',
                container: 'flex gap-5',
                item: 'min-w-0 shrink-0 grow-0 basis-full sm:basis-1/2 md:basis-1/3 xl:basis-1/5',
                controls: 'absolute inset-0 z-10 pointer-events-none',
                arrows: 'absolute inset-0 flex items-center justify-between px-2 sm:px-3',
                prev: '!static !relative !inset-auto !translate-none sm:!start-auto sm:!end-auto pointer-events-auto z-20 rounded-full bg-primary text-white shadow-md',
                next: '!static !relative !inset-auto !translate-none sm:!start-auto sm:!end-auto pointer-events-auto z-20 rounded-full bg-primary text-white shadow-md',
            }"
            :prev="{
                color: 'neutral',
                variant: 'solid',
                disabled: false,
                class: 'min-w-fit! p-2! sm:p-2.5! rounded-full',
            }"
            :next="{
                color: 'neutral',
                variant: 'solid',
                disabled: false,
                class: 'min-w-fit! p-2! sm:p-2.5! rounded-full',
            }"
            aria-label="ผลงานพิน"
        >
            <div
                class="relative min-w-0 w-full cursor-pointer group"
                @click="openModal(item)"
            >
                <HomePortfolioCard
                    :name="lang === 'th' ? item.name : item['name-en']"
                    :url="item.url"
                    :image="item.image"
                    :alt="lang === 'th' ? item.alt : item['alt-en']"
                />
            </div>
        </UCarousel>

        <!-- Modal Component -->
        <ImageGalleryModal
            v-model:open="isModalOpen"
            :images="galleryImages"
            :lang="lang"
            :initial-index="initialImageIndex"
        />
    </div>
</template>
