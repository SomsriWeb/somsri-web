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
const { data: screens } = useAsyncData('data-screens', () => {
    return queryCollection('screen').order('order', 'ASC').all();
});

// STATE
const isModalOpen = ref(false);
const initialImageIndex = ref(0);
const selectedCategory = ref<string | null>(null);

interface PortfolioScreenItem {
    name: string;
    'name-en'?: string;
    url: string;
    image: string;
    alt?: string;
    'alt-en'?: string;
}

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

function openModalFromItem(item: unknown) {
    openModal(item as NonNullable<typeof screens.value>[number]);
}

function getScreenName(item: unknown) {
    const screen = item as PortfolioScreenItem;
    return lang === 'th' ? screen.name : (screen['name-en'] || screen.name);
}

function getScreenAlt(item: unknown) {
    const screen = item as PortfolioScreenItem;
    return lang === 'th' ? (screen.alt || '') : (screen['alt-en'] || screen.alt || '');
}

function getScreenUrl(item: unknown) {
    return (item as PortfolioScreenItem).url;
}

function getScreenImage(item: unknown) {
    return (item as PortfolioScreenItem).image;
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
            :items="displayedScreens"
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
            aria-label="ผลงานพอร์ตโฟลิโอ"
        >
            <div
                class="relative min-w-0 w-full cursor-pointer group"
                @click="openModalFromItem(item)"
            >
                <HomePortfolioCard
                    :name="getScreenName(item)"
                    :url="getScreenUrl(item)"
                    :image="getScreenImage(item)"
                    :alt="getScreenAlt(item)"
                />
            </div>
        </UCarousel>

        <!-- Modal Component -->
        <ImageGalleryModal
            :key="selectedCategory || 'default'"
            v-model:open="isModalOpen"
            :images="galleryImages"
            :lang="lang"
            :initial-index="initialImageIndex"
        />
    </div>
</template>
