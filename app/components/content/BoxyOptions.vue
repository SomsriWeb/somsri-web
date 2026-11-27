<script setup lang="ts">
interface ColorItem {
    name: string;
    color: string;
}

interface SizeRow {
    label: string;
    values: (string | number)[];
}

interface Props {
    colorTitle: string;
    colors: ColorItem[];
    colorNote?: string;
    sizeTitle: string;
    sizeLabels: string[];
    sizeRows: SizeRow[];
    sizeNote?: string;
}

defineProps<Props>();
</script>

<template>
    <section class="scroll-mt-24 px-5 py-10 lg:px-18 lg:py-14">
        <div class="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
            <div class="min-w-0 rounded-xl border border-stone-200 bg-white p-5">
                <ProseH2>{{ colorTitle }}</ProseH2>

                <ul class="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <li
                        v-for="color in colors"
                        :key="color.name"
                        class="flex items-center gap-2 text-sm text-stone-700"
                    >
                        <span
                            aria-hidden="true"
                            class="size-6 shrink-0 rounded-full border border-stone-300"
                            :style="{ backgroundColor: color.color }"
                        />
                        <span>{{ color.name }}</span>
                    </li>
                </ul>

                <p
                    v-if="colorNote"
                    class="mt-5 text-sm leading-relaxed text-stone-600"
                >
                    {{ colorNote }}
                </p>

                <NuxtLink
                    to="/faded-shirt"
                    class="mt-3 inline-block text-sm text-primary underline underline-offset-4"
                >
                    ดูเสื้อฟอกสีเฟด
                </NuxtLink>
            </div>

            <div class="min-w-0 rounded-xl border border-stone-200 bg-white p-5">
                <ProseH2>{{ sizeTitle }}</ProseH2>

                <div
                    role="region"
                    :aria-label="sizeTitle"
                    tabindex="0"
                    class="mt-5 overflow-x-auto rounded-lg border border-stone-200 focus-visible:outline-2 focus-visible:outline-primary"
                >
                    <table class="w-full min-w-[22rem] border-collapse text-sm">
                        <caption class="sr-only">
                            ตารางไซซ์ตั้งต้นเสื้อ Boxy หน่วยนิ้ว
                        </caption>

                        <thead>
                            <tr class="bg-primary text-white">
                                <th
                                    scope="col"
                                    class="sticky left-0 z-20 bg-primary px-3 py-3 text-left"
                                >
                                    นิ้ว
                                </th>

                                <th
                                    v-for="size in sizeLabels"
                                    :key="size"
                                    scope="col"
                                    class="px-3 py-3 text-center"
                                >
                                    {{ size }}
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr
                                v-for="row in sizeRows"
                                :key="row.label"
                                class="border-t border-stone-200"
                            >
                                <th
                                    scope="row"
                                    class="sticky left-0 z-10 bg-white px-3 py-3 text-left whitespace-nowrap"
                                >
                                    {{ row.label }}
                                </th>

                                <td
                                    v-for="(value, index) in row.values"
                                    :key="index"
                                    class="bg-white px-3 py-3 text-center"
                                >
                                    {{ value }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p
                    v-if="sizeNote"
                    class="mt-4 text-sm leading-relaxed text-stone-600"
                >
                    {{ sizeNote }}
                </p>

                <NuxtLink
                    to="/size"
                    class="mt-3 inline-block text-sm text-primary underline underline-offset-4"
                >
                    ตารางไซซ์ทรงปกติ
                </NuxtLink>
            </div>
        </div>
    </section>
</template>