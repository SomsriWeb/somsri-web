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

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5">
            <div
                v-for="(pin, index) in displayedPins"
                :key="pin.name"
                class="relative group cursor-pointer"
                @click="openModal(pin)"
            >
                <HomePortfolioCard
                    :name="lang === 'th' ? pin.name : pin['name-en']"
                    :url="pin.url"
                    :image="pin.image"
                    :alt="lang === 'th' ? pin.alt : pin['alt-en']"
                />
            </div>
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
