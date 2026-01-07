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
const { data: screens } = await useAsyncData('data-screens', () => {
    return queryCollection('screen').order('order', 'ASC').all();
});

// STATE
const isModalOpen = ref(false);
const initialImageIndex = ref(0);
const selectedCategory = ref<string | null>(null);

// COMPUTED
// Group screens by category
const screensByCategory = computed(() => {
    if (!screens.value || screens.value.length === 0) return new Map<string, NonNullable<typeof screens.value>>();
    
    const grouped = new Map<string, NonNullable<typeof screens.value>>();
    screens.value.forEach((screen) => {
        // Use category field if available, otherwise extract from id or url
        let category = (screen as { category?: string }).category;
        
        if (!category) {
            // Try to extract from id path (e.g., "screen/DTF/dft" -> "DTF")
            if (screen.id && typeof screen.id === 'string') {
                const parts = screen.id.split('/');
                if (parts.length >= 2 && parts[0] === 'screen' && parts[1]) {
                    category = parts[1]; // Get folder name (DTF, DTG, foil, etc.)
                }
            }
            
            // Fallback: try to extract from url if id doesn't work
            if (!category && screen.url) {
                const urlParts = screen.url.replace('/screen/', '').split('/');
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
        const categoryScreens = grouped.get(finalCategory);
        if (categoryScreens) {
            categoryScreens.push(screen);
        }
    });
    return grouped;
});

// Get first screen from each category for display
const displayedScreens = computed(() => {
    if (!screensByCategory.value || screensByCategory.value.size === 0) return [];
    
    const firstScreens: NonNullable<typeof screens.value> = [];
    screensByCategory.value.forEach((categoryScreens) => {
        if (categoryScreens.length > 0) {
            // Get the first screen (lowest order) from each category
            const sorted = [...categoryScreens].sort((a, b) => (a.order || 0) - (b.order || 0));
            if (sorted[0]) {
                firstScreens.push(sorted[0]);
            }
        }
    });
    
    // Sort by order
    return firstScreens.sort((a, b) => (a.order || 0) - (b.order || 0));
});

// Get images for selected category
const galleryImages = computed(() => {
    if (!selectedCategory.value || !screensByCategory.value) return [];
    
    const categoryScreens = screensByCategory.value.get(selectedCategory.value);
    if (!categoryScreens || categoryScreens.length === 0) return [];
    
    return categoryScreens
        .sort((a, b) => (a.order || 0) - (b.order || 0))
        .map((screen) => ({
            id: screen.id,
            image: screen.image,
            alt: lang === 'th' ? screen.alt : screen['alt-en'],
            title: lang === 'th' ? screen.name : screen['name-en'],
            'title-en': screen['name-en'],
        }));
});

// FUNCTIONS
function openModal(screen: NonNullable<typeof screens.value>[number]) {
    // Use category field if available, otherwise extract from id or url
    let category = (screen as { category?: string }).category;
    
    if (!category) {
        // Try to extract from id path
        if (screen.id && typeof screen.id === 'string') {
            const parts = screen.id.split('/');
            if (parts.length >= 2 && parts[0] === 'screen' && parts[1]) {
                category = parts[1];
            }
        }
        
        // Fallback: try to extract from url if id doesn't work
        if (!category && screen.url) {
            const urlParts = screen.url.replace('/screen/', '').split('/');
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
                v-for="(screen, index) in displayedScreens"
                :key="screen.name"
                class="relative group cursor-pointer"
                @click="openModal(screen)"
            >
                <HomePortfolioCard
                    :name="lang === 'th' ? screen.name : screen['name-en']"
                    :url="screen.url"
                    :image="screen.image"
                    :alt="lang === 'th' ? screen.alt : screen['alt-en']"
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
