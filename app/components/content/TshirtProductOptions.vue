
<script setup lang="ts">
import { tshirtStyles } from '~/data/tshirtStyles';
import {
    ProductTypeKey,
    FabricKey,
    fabrics as fabricOptions,
} from '~/lib/design/variable';
import colorCode from '~/lib/design/fabricColors';

const scrollColors = (event: MouseEvent, direction: number) => {
    const button = event.currentTarget as HTMLButtonElement;
    const palette = button.parentElement?.querySelector<HTMLElement>('[data-color-palette]');
    palette?.scrollBy({
        left: direction * palette.clientWidth * 0.75,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
};

const previewOpen = ref(false);
const preview = ref({ image: '', title: '' });
const openPreview = (image: string, title: string) => {
    preview.value = { image, title };
    previewOpen.value = true;
};

// ดึงข้อมูลเนื้อผ้า
const { data: fabricData } = await useAsyncData(
    'tshirt-product-options-fabrics',
    () => queryCollection('fabrics').order('nameEn', 'ASC').all(),
);

// ดึงข้อมูลไซซ์
const { data: sizeData } = await useAsyncData(
    'tshirt-product-options-sizes',
    () => queryCollection('size').order('order', 'ASC').all(),
);



// ข้อมูลชนิดผ้าเสื้อยืด
const tshirtFabricOptions = fabricOptions[ProductTypeKey.TSHIRT];
const tshirtFabricImages: Record<string, string> = {
    [FabricKey.COTTONCOMB]: '/fabrics/cotton-comb-32.png',
    [FabricKey.COTTON100]: '/fabrics/cotton-prime.jpg',
    [FabricKey.SUPERSOFF]: '/fabrics/supersoff-32.png',
    [FabricKey.MICROSPORT]: '/fabrics/microsport.png',
};
// กรองรายละเอียดผ้าเฉพาะเสื้อยืด
const tshirtFabrics = computed(() => {
    return (fabricData.value || []).filter((fabric) =>
        fabric.forProductType?.includes(ProductTypeKey.TSHIRT),
    );
});

// ดึงสีตามชนิดผ้า
const getFabricColors = (fabricValue: string) => {
    return colorCode[ProductTypeKey.TSHIRT]?.[fabricValue as FabricKey] || [];
};
</script>

<template>
    <section class="min-w-0 space-y-9 sm:space-y-12 lg:space-y-14">

        <!-- ผลิตเสื้อแบบไหนได้บ้าง -->
<div>
    <div class="mb-5 sm:mb-7 space-y-2">
        <ProseH2>
            ผลิตเสื้อแบบไหนได้บ้าง
        </ProseH2>

        <p class="text-sm leading-relaxed text-stone-600">
            ตัวอย่างรูปแบบงานที่สามารถผลิตได้
        </p>
    </div>

    <div class="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-6 sm:gap-x-6 sm:gap-y-8">
        <button
            v-for="option in [
                {
                    name: 'งานสกรีน',
                    image: '/screen/org(11).jpg',
                },
                {
                    name: 'งาน DTF',
                    image: '/screen/DFT(17).jpg',
                },
                {
                    name: 'งาน DTG',
                    image: '/screen/dtg(2).jpg',
                },
                {
                    name: 'งานปัก',
                    image: '/polo/ปักธรรมดา2.jpg',
                },
                {
                    name: 'งานปักทรานส์เฟอร์',
                    image: '/polo/ปักทรานเฟอร์2.jpg',
                },
                {
                    name: 'Sublimation',
                    image: '/produce-tshirt/sublimation-port-1.png',
                },
            ]"
            :key="option.name"
            type="button"
            :aria-label="`ดูภาพ${option.name}`"
            @click="openPreview(option.image, option.name)"
            class="group w-full max-w-48 min-w-0 cursor-zoom-in rounded-2xl text-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
            <div class="aspect-square overflow-hidden rounded-2xl bg-stone-100 shadow-sm">
                <img
                    :src="option.image"
                    :alt="`ตัวอย่าง${option.name}`"
                    loading="lazy"
                    class="h-full w-full object-cover transition-transform duration-300 motion-safe:group-hover:scale-[1.03]"
                />
            </div>
            <p class="mt-3 min-h-10 px-1 text-lg font-medium leading-6 text-primary sm:mt-4">
                {{ option.name }}
            </p>
        </button>
    </div>
</div>

<!-- ทรงเสื้อ -->
<div>
    <ProseH2 class="mb-4 sm:mb-5">
        ทรงเสื้อ
    </ProseH2>

    <div class="grid w-full max-w-3xl grid-cols-2 min-[400px]:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        <div
            v-for="style in tshirtStyles"
            :key="style.label"
            class="min-w-0 overflow-hidden rounded-xl border border-stone-200 bg-white"
        >
            <div
                class="aspect-square bg-stone-50 flex items-center justify-center"
            >
                <img
                    v-if="style.image"
                    :src="style.image"
                    :alt="style.label"
                    loading="lazy"
                    class="w-full h-full object-contain p-2 sm:p-3"
                />

                <span
                    v-else
                    class="text-sm text-stone-400"
                >
                    รูปทรงเสื้อ
                </span>
            </div>

            <div class="flex min-h-12 items-center justify-center px-2 py-2 text-center border-t border-stone-100">
                <p class="text-base leading-6 font-medium text-stone-700">
                    {{ style.label }}
                </p>
            </div>
        </div>
    </div>
</div>

       <!-- ประเภทผ้า -->
<div>
    <ProseH2 class="mb-4 sm:mb-5">ประเภทผ้า</ProseH2>

    <div class="grid max-w-3xl grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div
            v-for="fabricOption in tshirtFabricOptions"
            :key="fabricOption.value"
            class="min-w-0 border border-stone-200 rounded-xl p-3 sm:p-4 text-center"
        >
            <div class="w-20 sm:w-24 aspect-square max-w-full mx-auto rounded-lg overflow-hidden mb-3">
                    <img
                            :src="tshirtFabricImages[String(fabricOption.value)]"
                            :alt="fabricOption.label"
                            class="w-full h-full object-cover"
                    />
            </div>

            <p class="text-sm font-medium text-stone-700">
                {{ fabricOption.label }}
            </p>
        </div>
    </div>
</div>

        <!-- สีผ้า-->
        <div>
            <ProseH2 class="mb-4 sm:mb-5">เฉดสีเสื้อผ้า</ProseH2>

            <p class="mb-4 text-sm leading-relaxed text-stone-600">ปัดแถบสีซ้าย–ขวา หรือกดลูกศรเพื่อดูสีเพิ่มเติม</p>
            <div class="grid min-w-0 grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
                <div
                    v-for="fabric in tshirtFabricOptions"
                    :key="fabric.value"
                    class="min-w-0 border border-stone-200 rounded-xl bg-stone-50/50 p-3 sm:p-4"
                >
                    <h4 class="text-sm sm:text-base font-semibold mb-2">
                        {{ fabric.label }}
                    </h4>

                    <div class="flex min-w-0 items-center gap-2">
                        <button
                            type="button"
                            :aria-label="`เลื่อนสี${fabric.label}ไปทางซ้าย`"
                            class="flex size-11 shrink-0 items-center justify-center rounded-full border border-stone-200 text-primary hover:bg-stone-50 focus-visible:outline-2 focus-visible:outline-primary"
                            @click="scrollColors($event, -1)"
                        >
                            <UIcon name="i-lucide-chevron-left" class="size-4" />
                        </button>
                        <div
                            data-color-palette
                            tabindex="0"
                            role="region"
                            :aria-label="`เฉดสี${fabric.label} เลื่อนเพื่อดูสีทั้งหมด`"
                            class="flex min-w-0 flex-1 gap-2 overflow-x-auto overscroll-x-contain py-2 focus-visible:outline-2 focus-visible:outline-primary"
                        >
                        <div
                            v-for="(color, index) in getFabricColors(String(fabric.value))"
                            :key="`${fabric.value}-${index}`"
                            class="w-8 h-8 shrink-0 rounded-full border border-stone-300"
                            :style="{ backgroundColor: `#${color}` }"
                            :title="`#${color}`"
                        />
                        </div>
                        <button
                            type="button"
                            :aria-label="`เลื่อนสี${fabric.label}ไปทางขวา`"
                            class="flex size-11 shrink-0 items-center justify-center rounded-full border border-stone-200 text-primary hover:bg-stone-50 focus-visible:outline-2 focus-visible:outline-primary"
                            @click="scrollColors($event, 1)"
                        >
                            <UIcon name="i-lucide-chevron-right" class="size-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>

    

    <UModal
        v-model:open="previewOpen"
        :title="preview.title"
        description="ภาพตัวอย่าง กดปุ่มปิดหรือกด Escape เพื่อกลับไปดูรายการ"
        :ui="{
            content: 'w-[calc(100vw-2rem)] max-w-xl max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-2xl bg-white',
            overlay: 'bg-stone-900/50 backdrop-blur-sm',
            body: 'p-3 sm:p-5',
        }"
    >
        <template #body>
            <div class="flex items-center justify-center rounded-xl bg-stone-50 p-3">
                <img
                    v-if="preview.image"
                    :src="preview.image"
                    :alt="preview.title"
                    class="max-h-[65dvh] w-full object-contain"
                />
            </div>
        </template>
    </UModal>
    </section>
</template>
