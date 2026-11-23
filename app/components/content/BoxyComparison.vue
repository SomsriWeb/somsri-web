<script setup lang="ts">
interface ComparisonRow {
    label: string;
    values: string[];
}

interface Props {
    title: string;
    paragraphs: string[];
    columns: string[];
    rows: ComparisonRow[];
    diagramCaption: string;
}

defineProps<Props>();
</script>

<template>
    <section class="scroll-mt-24 px-5 py-10 lg:px-18 lg:py-14">
        <div class="mx-auto max-w-6xl">
            <ProseH2 class="mb-5">
                {{ title }}
            </ProseH2>

            <div class="grid items-start gap-6 lg:grid-cols-2 lg:gap-10">
                <div class="min-w-0">
                    <p
                        v-for="paragraph in paragraphs"
                        :key="paragraph"
                        class="mb-4 text-base leading-relaxed text-stone-600"
                    >
                        {{ paragraph }}
                    </p>

                    <div
                        role="region"
                        aria-label="เปรียบเทียบทรงเสื้อ"
                        tabindex="0"
                        class="overflow-x-auto rounded-xl border border-stone-200 focus-visible:outline-2 focus-visible:outline-primary"
                    >
                        <table class="w-full min-w-[28rem] border-collapse text-sm">
                            <caption class="sr-only">
                                เปรียบเทียบทรง Regular, Oversize และ Boxy
                            </caption>

                            <thead>
                                <tr class="bg-primary text-white">
                                    <th
                                        scope="col"
                                        class="px-3 py-3 text-left"
                                    >
                                        รายละเอียด
                                    </th>

                                    <th
                                        v-for="column in columns"
                                        :key="column"
                                        scope="col"
                                        class="px-3 py-3 text-left"
                                    >
                                        {{ column }}
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr
                                    v-for="row in rows"
                                    :key="row.label"
                                    class="border-t border-stone-200"
                                >
                                    <th
                                        scope="row"
                                        class="px-3 py-3 text-left font-semibold text-stone-900"
                                    >
                                        {{ row.label }}
                                    </th>

                                    <td
                                        v-for="(value, index) in row.values"
                                        :key="index"
                                        class="px-3 py-3 text-stone-600"
                                    >
                                        {{ value }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <figure class="min-w-0 rounded-xl border border-stone-200 bg-white p-4">
                    <svg
                        viewBox="0 0 520 300"
                        width="520"
                        height="300"
                        role="img"
                        aria-label="ภาพเปรียบเทียบทรงเสื้อ Regular และ Boxy"
                        class="h-auto w-full"
                    >
                        <g
                            fill="currentColor"
                            fill-opacity="0.1"
                            stroke="currentColor"
                            stroke-width="2.5"
                            stroke-linejoin="round"
                            class="text-stone-400"
                        >
                            <path d="M70 60 L105 45 Q125 60 145 45 L180 60 L210 100 L185 115 L172 98 L172 245 L78 245 L78 98 L65 115 L40 100 Z" />
                        </g>

                        <g
                            fill="currentColor"
                            fill-opacity="0.1"
                            stroke="currentColor"
                            stroke-width="3"
                            stroke-linejoin="round"
                            class="text-primary"
                        >
                            <path d="M300 62 L345 48 Q375 64 405 48 L450 62 L496 118 L462 136 L448 112 L448 215 L302 215 L302 112 L288 136 L254 118 Z" />
                        </g>

                        <g
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-dasharray="5 4"
                            class="text-primary"
                        >
                            <path d="M302 232 H448" />
                            <path d="M466 62 V215" />
                        </g>

                        <g
                            font-size="17"
                            fill="currentColor"
                            text-anchor="middle"
                            class="text-stone-700"
                        >
                            <text x="125" y="275">Regular</text>
                            <text
                                x="375"
                                y="275"
                                font-weight="700"
                                class="text-primary"
                            >
                                Boxy
                            </text>
                            <text x="375" y="250" font-size="14">
                                อกกว้าง
                            </text>
                            <text
                                x="492"
                                y="145"
                                font-size="14"
                                transform="rotate(90 492 145)"
                            >
                                ตัวสั้น
                            </text>
                        </g>
                    </svg>

                    <figcaption class="mt-3 text-sm text-stone-600">
                        {{ diagramCaption }}
                    </figcaption>
                </figure>
            </div>
        </div>
    </section>
</template>