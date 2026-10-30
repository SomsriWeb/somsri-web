<script setup lang="ts">
import { LINE_LINK } from '~/lib/lineLink';

interface Crumb {
    label: string;
    /** ไม่ใส่ = หน้าปัจจุบัน (ไม่เป็นลิงก์) */
    to?: string;
}
interface Fact {
    value: string;
    label: string;
}
interface HeroImage {
    src: string;
    alt: string;
}

interface Props {
    breadcrumbs?: Crumb[];
    /** กล่องตัวเลขเด่น 4 ช่องใต้คำอธิบาย */
    facts?: Fact[];
    /** รูปแรกเป็นรูปใหญ่ 16:9 รูปที่ 2-3 เป็นรูปสี่เหลี่ยมจัตุรัสด้านล่าง */
    images: HeroImage[];
    /** ป้ายลอยมุมรูป เช่น "10,000+ องค์กร" */
    badgeValue?: string;
    badgeLabel?: string;
    lineLabel?: string;
    secondaryLabel?: string;
    secondaryTo?: string;
}
const {
    breadcrumbs = [],
    facts = [],
    images,
    badgeValue,
    badgeLabel,
    lineLabel = 'แอดไลน์ ขอใบเสนอราคา',
    secondaryLabel,
    secondaryTo,
} = defineProps<Props>();

interface Slots {
    /** ป้ายเล็กเหนือ H1 */
    eyebrow?: () => unknown;
    /** H1 สี primary */
    title(): unknown;
    /** บรรทัดรองใต้ H1 (อยู่ใน H1 ตัวเล็กสีดำ) */
    subtitle?: () => unknown;
    description?: () => unknown;
    /** ข้อความเล็กใต้ปุ่ม */
    hint?: () => unknown;
}
defineSlots<Slots>();

const lineLink = inject<string>(LINE_LINK);
</script>

<template>
    <section class="bg-gradient-to-b from-white to-stone-100 pt-4 pb-10 md:pb-16">
        <div class="px-6 lg:px-18">
            <nav v-if="breadcrumbs.length" aria-label="breadcrumb" class="text-xs text-slate-500">
                <template v-for="(crumb, i) in breadcrumbs" :key="i">
                    <span v-if="i > 0" class="mx-1.5">›</span>
                    <NuxtLink v-if="crumb.to" :to="crumb.to" class="hover:text-primary">{{ crumb.label }}</NuxtLink>
                    <span v-else aria-current="page">{{ crumb.label }}</span>
                </template>
            </nav>

            <div class="mt-4 grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
                <div>
                    <span
                        v-if="$slots.eyebrow"
                        class="mb-2 inline-block rounded-full bg-primary/12 px-3 py-0.5 text-xs font-bold tracking-wide text-primary md:text-sm"
                    >
                        <slot name="eyebrow" mdc-unwrap="p" />
                    </span>
                    <h1 class="text-3xl leading-tight font-bold text-balance text-primary md:text-5xl">
                        <slot name="title" mdc-unwrap="p" />
                        <small v-if="$slots.subtitle" class="mt-2 block text-base leading-snug font-bold text-stone-900 md:text-2xl">
                            <slot name="subtitle" mdc-unwrap="p" />
                        </small>
                    </h1>
                    <div v-if="$slots.description" class="mt-4 max-w-[56ch] text-sm md:text-lg">
                        <slot name="description" mdc-unwrap="p" />
                    </div>

                    <div v-if="facts.length" class="my-6 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                        <div
                            v-for="(fact, i) in facts"
                            :key="i"
                            class="rounded-xl border border-stone-200 bg-white px-2.5 py-3 text-center"
                        >
                            <b class="block text-xl leading-tight text-primary md:text-2xl">{{ fact.value }}</b>
                            <span class="text-xs text-slate-500">{{ fact.label }}</span>
                        </div>
                    </div>

                    <div class="flex flex-wrap gap-3">
                        <UButton :to="lineLink" color="line" icon="hugeicons:line" class="px-6 py-2.5 text-sm md:text-base">
                            {{ lineLabel }}
                        </UButton>
                        <UButton
                            v-if="secondaryLabel && secondaryTo"
                            :to="secondaryTo"
                            variant="outline"
                            icon="lucide:file-text"
                            class="bg-white px-6 py-2.5 text-sm md:text-base"
                        >
                            {{ secondaryLabel }}
                        </UButton>
                    </div>

                    <div v-if="$slots.hint" class="mt-3 text-xs text-slate-500 [&_a]:text-primary">
                        <slot name="hint" mdc-unwrap="p" />
                    </div>
                </div>

                <div class="relative grid grid-cols-2 gap-3">
                    <NuxtImg
                        v-for="(img, i) in images"
                        :key="img.src"
                        :src="img.src"
                        :alt="img.alt"
                        :loading="i === 0 ? 'eager' : 'lazy'"
                        :fetchpriority="i === 0 ? 'high' : undefined"
                        format="webp"
                        class="w-full rounded-xl bg-primary/12 object-cover"
                        :class="i === 0 ? 'col-span-2 aspect-video' : 'aspect-square'"
                    />
                    <div
                        v-if="badgeValue"
                        class="absolute bottom-6 left-2.5 flex items-center gap-3 rounded-xl bg-white px-4 py-3 text-xs shadow-xl lg:-left-5"
                    >
                        <UIcon name="lucide:shield-check" class="size-8 shrink-0 text-primary" />
                        <div>
                            <b class="block text-lg leading-tight text-primary">{{ badgeValue }}</b>
                            {{ badgeLabel }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
