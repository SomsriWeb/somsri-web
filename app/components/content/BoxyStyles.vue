<script setup lang="ts">
type StyleVariant = 'classic' | 'cropped' | 'drop' | 'heavy';

interface StyleItem {
    variant: StyleVariant;
    name: string;
    description: string;
    specs: {
        label: string;
        value: string;
    }[];
    suitable: string;
}

interface Props {
    title: string;
    description?: string;
    items: StyleItem[];
    note?: string;
}

defineProps<Props>();

// เส้นรูปร่างจาก SVG ในหน้า Boxy เดิม
const silhouettes: Record<StyleVariant, string> = {
    classic:
        'M90,34 L54,46 L24,86 L46,106 L52,83 L52,184 L168,184 L168,83 L174,106 L196,86 L166,46 L130,34 L130,34 Q110,62 90,34 Z',
    cropped:
        'M90,34 L54,46 L26,84 L48,104 L50,82 L50,158 L170,158 L170,82 L172,104 L194,84 L166,46 L130,34 L130,34 Q110,62 90,34 Z',
    drop:
        'M90,34 L44,54 L20,98 L45,120 L50,95 L50,186 L170,186 L170,95 L175,120 L200,98 L176,54 L130,34 L130,34 Q110,62 90,34 Z',
    heavy:
        'M93,34 L56,46 L24,92 L46,112 L54,86 L54,186 L166,186 L166,86 L174,112 L196,92 L164,46 L127,34 L127,34 Q110,58 93,34 Z',
};

const regularSilhouette =
    'M90,34 L68,42 L41,72 L58,87 L70,70 L70,196 L150,196 L150,70 L162,87 L179,72 L152,42 L130,34 L130,34 Q110,62 90,34 Z';
</script>

<template>
    <section class="scroll-mt-24 px-5 py-10 lg:px-18 lg:py-14">
        <div class="mx-auto max-w-6xl">
            <header class="mb-6">
                <ProseH2>{{ title }}</ProseH2>

                <p
                    v-if="description"
                    class="mt-3 text-base text-stone-600"
                >
                    {{ description }}
                </p>
            </header>

            <p class="mb-5 text-sm text-stone-500">
                พื้นสีคือทรง Boxy · เส้นประคือเสื้อยืดทรงปกติ
            </p>

            <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <article
                    v-for="item in items"
                    :key="item.variant"
                    class="min-w-0 rounded-xl border border-stone-200 bg-white p-4"
                >
                    <svg
                        viewBox="0 0 220 210"
                        role="img"
                        :aria-label="`ภาพทรง ${item.name} เทียบทรงปกติ`"
                        class="mx-auto mb-4 aspect-[220/210] w-full max-w-56 text-primary"
                    >
                        <path
                            :d="silhouettes[item.variant]"
                            fill="currentColor"
                            fill-opacity="0.1"
                            stroke="currentColor"
                            stroke-width="3"
                            stroke-linejoin="round"
                        />

                        <g
                            v-if="item.variant === 'cropped'"
                            class="text-stone-500"
                        >
                            <path
                                d="M40,158 H180"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-dasharray="4 3"
                            />
                            <text
                                x="186"
                                y="162"
                                font-size="11"
                                fill="currentColor"
                            >
                                เอว
                            </text>
                        </g>

                        <path
                            v-if="item.variant === 'drop'"
                            d="M45,56 L52,95 M175,56 L168,95"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2.5"
                            stroke-dasharray="4 3"
                        />

                        <g v-if="item.variant === 'heavy'">
                            <path
                                d="M93,34 Q110,60 127,34"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="7"
                                stroke-linecap="round"
                            />
                            <path
                                d="M56,178 H164"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-dasharray="3 3"
                            />
                        </g>

                        <path
                            :d="regularSilhouette"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1.6"
                            stroke-dasharray="5 4"
                            class="text-stone-400"
                        />
                    </svg>

                    <h3 class="text-lg font-semibold leading-tight text-primary">
                        {{ item.name }}
                    </h3>

                    <p class="mt-2 text-sm text-stone-600">
                        {{ item.description }}
                    </p>

                    <dl class="mt-4 space-y-2 text-sm">
                        <div
                            v-for="spec in item.specs"
                            :key="spec.label"
                            class="flex justify-between gap-3"
                        >
                            <dt class="shrink-0 text-stone-500">
                                {{ spec.label }}
                            </dt>
                            <dd class="text-right text-stone-800">
                                {{ spec.value }}
                            </dd>
                        </div>
                    </dl>

                    <p class="mt-4 border-t border-stone-100 pt-3 text-sm text-stone-600">
                        <strong class="text-stone-900">เหมาะกับ:</strong>
                        {{ item.suitable }}
                    </p>
                </article>
            </div>

            <p
                v-if="note"
                class="mt-4 text-sm leading-relaxed text-stone-600"
            >
                {{ note }}
            </p>
        </div>
    </section>
</template>