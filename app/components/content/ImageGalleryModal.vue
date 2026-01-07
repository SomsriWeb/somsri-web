<script setup lang="ts">
// PROPS
interface ImageItem {
    /**
     * Image URL
     */
    image: string;
    /**
     * Alt text for image
     */
    alt?: string;
    /**
     * Title for image (optional)
     */
    title?: string;
    /**
     * Title in English (optional, for multilingual support)
     */
    'title-en'?: string;
    /**
     * Unique identifier (optional)
     */
    id?: string | number;
}

interface Props {
    /**
     * ใช้ภาษาไทยเป็นค่า default
     */
    lang?: 'th' | 'en';
    /**
     * Array of images to display in gallery
     */
    images: ImageItem[];
    /**
     * Initial index to display
     */
    initialIndex?: number;
}

const { lang = 'th', initialIndex = 0, images } = defineProps<Props>();

// MODEL
const open = defineModel<boolean>('open', { default: false });

const currentImageIndex = ref(initialIndex);
const thumbnailScrollRef = ref<HTMLElement | null>(null);

// COMPUTED
const currentImage = computed(() => {
    if (!images || images.length === 0) return null;
    return images[currentImageIndex.value];
});

const currentTitle = computed(() => {
    if (!currentImage.value) return '';
    if (currentImage.value.title) {
        return lang === 'th' 
            ? currentImage.value.title 
            : (currentImage.value['title-en'] || currentImage.value.title);
    }
    return '';
});

const hasNext = computed(() => {
    if (!images || images.length === 0) return false;
    return currentImageIndex.value < images.length - 1;
});

const hasPrev = computed(() => {
    return currentImageIndex.value > 0;
});

// FUNCTIONS
function nextImage() {
    if (hasNext.value) {
        currentImageIndex.value++;
        scrollToThumbnail(currentImageIndex.value);
    }
}

function prevImage() {
    if (hasPrev.value) {
        currentImageIndex.value--;
        scrollToThumbnail(currentImageIndex.value);
    }
}

function selectImage(index: number) {
    currentImageIndex.value = index;
    scrollToThumbnail(index);
}

function scrollToThumbnail(index: number) {
    nextTick(() => {
        if (thumbnailScrollRef.value) {
            const thumbnail = thumbnailScrollRef.value.children[index] as HTMLElement;
            if (thumbnail) {
                thumbnail.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        }
    });
}

// Watch for initialIndex changes
watch(() => initialIndex, (newIndex) => {
    if (newIndex >= 0 && newIndex < images.length) {
        currentImageIndex.value = newIndex;
        nextTick(() => {
            scrollToThumbnail(newIndex);
        });
    }
});

// Watch for modal open to scroll to thumbnail
watch(open, (isOpen) => {
    if (isOpen) {
        nextTick(() => {
            scrollToThumbnail(currentImageIndex.value);
        });
    }
});

// Keyboard Navigation
function handleKeydown(event: KeyboardEvent) {
    if (!open.value) return;
    
    if (event.key === 'ArrowLeft') {
        prevImage();
    } else if (event.key === 'ArrowRight') {
        nextImage();
    } else if (event.key === 'Escape') {
        open.value = false;
    }
}

onMounted(() => {
    window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown);
});
</script>

<template>
    <UModal 
        v-model:open="open"
        class="max-w-3xl"
        :ui="{
            header: 'p-2 sm:px-4 min-h-fit',
            body: 'p-0 sm:p-0'
        }"
    >
        <template #header="{ close }">
            <div class="flex items-center justify-between w-full">
                <h2 v-if="currentTitle" class="text-xl font-bold text-primary">
                    {{ currentTitle }}
                </h2>
                <UButton
                    icon="i-lucide-x"
                    color="neutral"
                    variant="ghost"
                    class="rounded-full"
                    @click="close"
                />
            </div>
        </template>
        <template #body>
            <div class="relative">
                <!-- Main Image Area -->
                <div class="flex items-center justify-center relative">
                    <!-- Previous Arrow Button -->
                    <UButton
                        v-if="hasPrev"
                        icon="i-heroicons-chevron-left"
                        class="text-primary! min-w-fit! rounded-full absolute left-0 z-10"
                        color="neutral"
                        variant="outline"
                        size="lg"
                        @click="prevImage"
                    />

                    <!-- Large Image Display -->
                    <div class="flex-1 flex justify-center items-center max-h-[50vh] overflow-hidden p-4 bg-gray-50 relative">
                        <ProseImg
                            v-if="currentImage"
                            :src="currentImage.image"
                            :alt="currentImage.alt || ''"
                            class="max-w-full max-h-[50vh] object-contain rounded-lg"
                        />
                        <!-- Image Counter -->
                        <div v-if="currentImage" class="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                            {{ currentImageIndex + 1 }} / {{ images?.length || 0 }}
                        </div>
                    </div>

                    <!-- Next Arrow Button -->
                    <UButton
                        v-if="hasNext"
                        icon="i-heroicons-chevron-right"
                        class="text-primary! min-w-fit! rounded-full absolute right-0 z-10"
                        color="neutral"
                        variant="outline"
                        size="lg"
                        @click="nextImage"
                    />
                </div>
            </div>
        </template>
        <template #footer>
            <!-- Thumbnail Gallery -->
            <div class="overflow-x-auto pb-2 scrollbar-hide w-full">
                <div 
                    ref="thumbnailScrollRef"
                    class="flex gap-2 justify-center min-w-max px-4"
                >
                    <div
                        v-for="(image, index) in images"
                        :key="image.id || index"
                        @click="selectImage(index)"
                        class="shrink-0 cursor-pointer transition-all duration-200"
                        :class="{
                            'ring-2 ring-primary rounded-lg scale-105': index === currentImageIndex,
                            'opacity-60 hover:opacity-100': index !== currentImageIndex
                        }"
                    >
                        <ProseImg
                            :src="image.image"
                            :alt="image.alt || ''"
                            class="w-5 h-5 md:w-10 md:h-10 object-cover rounded-lg"
                        />
                    </div>
                </div>
            </div>
        </template>
    </UModal>
</template>

