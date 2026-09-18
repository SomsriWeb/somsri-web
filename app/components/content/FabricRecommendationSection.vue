<script setup lang="ts">
export interface FabricItem {
    title: string;
    description: string;
    imageDesktop: string;
    imageMobile?: string;
}

interface Props {
    sectionId?: string;
    title?: string;
    subtitle?: string;
    buttonText?: string;
    buttonLink?: string;
    showButton?: boolean;
    items?: FabricItem[];
}

const props = withDefaults(defineProps<Props>(), {
    sectionId: 'fabric',
    title: 'เนื้อผ้าและสีเสื้อวงแนะนำ',
    subtitle: 'เสื้อวงที่ดีไม่ได้มีแค่ Artwork ที่โดดเด่นแต่เนื้อผ้าและโทนสีก็มีส่วนสำคัญในการสร้าง Character ของเสื้อให้ชัดขึ้น',
    buttonText: 'ดูตัวอย่างผ้า',
    buttonLink: '/fabric-specification',
    showButton: true,
    items: () => [
        {
            title: 'Cotton 100%',
            description: 'เนื้อผ้าคอตตอน 100% นุ่ม ใส่สบาย ให้สัมผัสเป็นธรรมชาติ',
            imageDesktop: '/band-shirt/fabric-cotton-desktop.png',
            imageMobile: '/band-shirt/fabric-cotton-mobile.png',
        },
        {
            title: 'Faded Color',
            description: 'สีฟอกเฟดสไตล์ Vintage ให้มิติที่ไม่เหมือนเสื้อสีพื้นทั่วไป',
            imageDesktop: '/band-shirt/fabric-faded-desktop.png',
            imageMobile: '/band-shirt/fabric-faded-mobile.png',
        },
        {
            title: 'Tie dye',
            description: 'ลายมัดย้อมเฉพาะตัว เพิ่ม Mood และเอกลักษณ์ให้เสื้อวงแต่ละชิ้น',
            imageDesktop: '/band-shirt/fabric-tiedye-desktop.png',
            imageMobile: '/band-shirt/fabric-tiedye-mobile.png',
        },
    ],
});

interface Slots {
    title?(): unknown;
    subtitle?(): unknown;
    button?(): unknown;
    'item-1-title'?(): unknown;
    'item-1-desc'?(): unknown;
    'item-2-title'?(): unknown;
    'item-2-desc'?(): unknown;
    'item-3-title'?(): unknown;
    'item-3-desc'?(): unknown;
}
defineSlots<Slots>();

function handleButtonClick(e: MouseEvent) {
    if (props.buttonLink?.startsWith('#')) {
        const target = document.querySelector(props.buttonLink);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            window.history.pushState(null, '', props.buttonLink);
        }
    }
}
</script>

<template>
    <section :id="sectionId" class="w-full py-10 lg:py-16 scroll-mt-20 lg:scroll-mt-24">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- ================= Desktop Layout (md:block) ================= -->
            <div class="hidden md:block">
                <!-- Header: Left Title + Subtitle / Right Outlined Button -->
                <div class="flex justify-between items-start gap-8 mb-8 lg:mb-10">
                    <div class="flex-1 max-w-xl">
                        <h2 class="text-3xl lg:text-4xl font-bold text-primary tracking-tight leading-tight mb-3">
                            <slot name="title">{{ title }}</slot>
                        </h2>
                        <p class="text-base sm:text-lg lg:text-xl text-stone-800 leading-relaxed font-normal">
                            <slot name="subtitle">{{ subtitle }}</slot>
                        </p>
                    </div>

                    <div v-if="showButton" class="pt-1 flex-shrink-0">
                        <slot name="button">
                            <NuxtLink
                                :to="buttonLink"
                                class="inline-flex items-center justify-center px-6 py-2.5 rounded-lg border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold text-lg transition duration-200 shadow-sm"
                                @click="handleButtonClick"
                            >
                                {{ buttonText }}
                            </NuxtLink>
                        </slot>
                    </div>
                </div>

                <!-- Desktop Cards Grid -->
                <div class="space-y-6 lg:space-y-8">
                    <!-- Top Row: 2 equal cards (Cotton 100% & Faded Color) -->
                    <div class="grid grid-cols-2 gap-6 lg:gap-8">
                        <!-- Card 1: Cotton 100% -->
                        <div class="group relative aspect-[570/383] w-full rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition duration-300">
                            <NuxtImg
                                :src="items[0]?.imageDesktop"
                                :alt="items[0]?.title || 'Cotton 100%'"
                                class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                loading="lazy"
                            />
                            <!-- Scrim Overlay for high text contrast -->
                            <div class="absolute inset-0 bg-black/40 group-hover:bg-black/35 transition duration-300" />
                            
                            <!-- Centered Text -->
                            <div class="relative z-10 h-full flex flex-col items-center justify-center text-center p-6 lg:p-8 text-white">
                                <h3 class="text-3xl lg:text-4xl font-bold tracking-tight mb-2 drop-shadow-md">
                                    <slot name="item-1-title">{{ items[0]?.title }}</slot>
                                </h3>
                                <p class="text-base sm:text-lg lg:text-xl text-white/95 font-normal leading-relaxed max-w-sm drop-shadow">
                                    <slot name="item-1-desc">{{ items[0]?.description }}</slot>
                                </p>
                            </div>
                        </div>

                        <!-- Card 2: Faded Color -->
                        <div class="group relative aspect-[570/383] w-full rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition duration-300">
                            <NuxtImg
                                :src="items[1]?.imageDesktop"
                                :alt="items[1]?.title || 'Faded Color'"
                                class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                loading="lazy"
                            />
                            <!-- Scrim Overlay for high text contrast -->
                            <div class="absolute inset-0 bg-black/40 group-hover:bg-black/35 transition duration-300" />

                            <!-- Centered Text -->
                            <div class="relative z-10 h-full flex flex-col items-center justify-center text-center p-6 lg:p-8 text-white">
                                <h3 class="text-3xl lg:text-4xl font-bold tracking-tight mb-2 drop-shadow-md">
                                    <slot name="item-2-title">{{ items[1]?.title }}</slot>
                                </h3>
                                <p class="text-base sm:text-lg lg:text-xl text-white/95 font-normal leading-relaxed max-w-sm drop-shadow">
                                    <slot name="item-2-desc">{{ items[1]?.description }}</slot>
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Bottom Row: 1 Full-width Wide Card (Tie dye) -->
                    <div class="group relative aspect-[1024/314] min-h-[220px] lg:min-h-[280px] w-full rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition duration-300">
                        <NuxtImg
                            :src="items[2]?.imageDesktop"
                            :alt="items[2]?.title || 'Tie dye'"
                            class="absolute inset-0 w-full h-full object-cover object-left group-hover:scale-[1.02] transition duration-500"
                            loading="lazy"
                        />
                        <!-- Subtle dark gradient on the right to make text stand out while model on left is clear -->
                        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-black/30 to-black/60" />

                        <!-- Right-aligned Text Column (Matching Figma) -->
                        <div class="relative z-10 h-full w-full grid grid-cols-2 items-center">
                            <div></div> <!-- Left half: empty so model is visible -->
                            <div class="flex flex-col items-center justify-center text-center p-6 lg:pr-12 text-white">
                                <h3 class="text-3xl lg:text-4xl font-bold tracking-tight mb-2 drop-shadow-md">
                                    <slot name="item-3-title">{{ items[2]?.title }}</slot>
                                </h3>
                                <p class="text-base sm:text-lg lg:text-xl text-white/95 font-normal leading-relaxed max-w-md drop-shadow">
                                    <slot name="item-3-desc">{{ items[2]?.description }}</slot>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ================= Mobile Layout (md:hidden) ================= -->
            <div class="block md:hidden text-center space-y-6">
                <!-- Mobile Header: Centered Title + Subtitle + Button -->
                <div class="space-y-3 px-2">
                    <h2 class="text-3xl font-bold text-primary tracking-tight">
                        <slot name="title">{{ title }}</slot>
                    </h2>
                    <p class="text-base sm:text-lg text-stone-800 font-normal leading-relaxed">
                        <slot name="subtitle">{{ subtitle }}</slot>
                    </p>

                    <div v-if="showButton" class="pt-2">
                        <slot name="button">
                            <NuxtLink
                                :to="buttonLink"
                                class="inline-flex items-center justify-center px-6 py-2 rounded-lg border-2 border-primary text-primary font-bold text-base hover:bg-primary hover:text-white transition duration-200"
                                @click="handleButtonClick"
                            >
                                {{ buttonText }}
                            </NuxtLink>
                        </slot>
                    </div>
                </div>

                <!-- Mobile Cards Stack (3 items) -->
                <div class="space-y-4 pt-2">
                    <div
                        v-for="(item, idx) in items"
                        :key="idx"
                        class="relative aspect-[337/135] w-full rounded-2xl overflow-hidden shadow-sm"
                    >
                        <NuxtImg
                            :src="item.imageMobile || item.imageDesktop"
                            :alt="item.title"
                            class="absolute inset-0 w-full h-full object-cover"
                            loading="lazy"
                        />
                        <!-- Scrim Overlay for crisp white text -->
                        <div class="absolute inset-0 bg-black/45" />

                        <!-- Centered Content -->
                        <div class="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 py-2 text-white">
                            <h3 class="text-2xl sm:text-3xl font-bold tracking-tight mb-1 drop-shadow-md">
                                {{ item.title }}
                            </h3>
                            <p class="text-sm sm:text-base text-white/95 font-normal leading-snug drop-shadow max-w-[280px]">
                                {{ item.description }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
