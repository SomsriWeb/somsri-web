<script setup lang="ts">
interface PriceRow {
    qty: string
    prices: string[]
}

interface PriceGroup {
    size: string
    rows: PriceRow[]
}

interface LeftPanel {
    image?: string
    title: string
    lines?: string[]
}

interface Props {
    columns: string[]
    columnSubtitles?: string[]
    columnBadges?: (string | null)[]
    groups: PriceGroup[]
    showSize?: boolean
    leftPanel?: LeftPanel
    leftNotes?: string[]
    rightNotes?: string[]
}

const {
    columns,
    columnSubtitles = [],
    columnBadges = [],
    groups,
    showSize = true,
    leftPanel,
    leftNotes = [],
    rightNotes = [],
} = defineProps<Props>()
</script>

<template>
    <div class="pl-1 pr-1 md:pl-0 md:pr-0 py-4 max-w-md md:max-w-3xl lg:max-w-4xl xl:max-w-[55rem] mx-auto w-full overflow-hidden">
        <div class="flex gap-1.5 md:gap-4 w-full">
            
            <div
                v-if="leftPanel"
                class="border border-primary md:border-2 rounded-lg md:rounded-2xl flex flex-col items-center justify-center text-center gap-2 md:gap-3 pl-2 pr-2 md:pl-4 md:pr-4 w-[22%] shrink-0"
            >
                <img
                    v-if="leftPanel.image"
                    :src="leftPanel.image"
                    :alt="leftPanel.title"
                    class="w-14 h-14 md:w-16 md:h-16 lg:w-24 lg:h-24 object-contain"
                />
                <div class="text-primary font-bold text-base md:text-lg lg:text-2xl leading-tight break-words">
                    {{ leftPanel.title }}
                </div>
                <div
                    v-for="(line, li) in leftPanel.lines"
                    :key="li"
                    class="text-primary/70 text-sm md:text-base lg:text-lg leading-tight break-words"
                >
                    {{ line }}
                </div>
            </div>

            <div class="flex-1 w-full flex flex-col gap-3 md:gap-6 lg:gap-10">
                <div
                    v-for="group in groups"
                    :key="group.size"
                    class="grid gap-1 md:gap-4 lg:gap-8 w-full" 
                    :style="{ gridTemplateColumns: `repeat(${(showSize ? 2 : 1) + columns.length}, minmax(0, 1fr))` }"
                >
                    <div
                        class="bg-primary text-white rounded-lg md:rounded-2xl flex flex-col shadow-sm md:shadow-lg border md:border-2 border-white"
                        :class="showSize ? 'col-span-2' : 'col-span-1'"
                    >
                        <div
                            class="grid border-b md:border-b-2 border-white h-[4rem] md:h-[6rem] lg:h-[8.5rem]"
                            :class="showSize ? 'grid-cols-2' : 'grid-cols-1'"
                        >
                            <div
                                v-if="showSize"
                                class="pl-1 pr-1 md:pl-2 md:pr-2 text-sm md:text-2xl lg:text-4xl font-bold text-center flex items-center justify-center break-words"
                            >
                                ขนาด
                            </div>
                            <div class="pl-1 pr-1 md:pl-2 md:pr-2 text-sm md:text-2xl lg:text-4xl font-bold text-center flex flex-col items-center justify-center gap-1 md:gap-2">
                                <i class="ti ti-users text-lg md:text-4xl lg:text-6xl leading-none" aria-hidden="true" />
                                <span class="leading-none mt-1 text-xs md:text-base lg:text-2xl font-medium">จำนวน</span>
                            </div>
                        </div>

                        <div class="grid flex-1" :class="showSize ? 'grid-cols-2' : 'grid-cols-1'">
                            <div
                                v-if="showSize"
                                class="flex items-center justify-center text-center font-bold text-sm md:text-2xl lg:text-4xl pl-1 pr-1 border-r md:border-r-2 border-white break-words"
                            >
                                {{ group.size }}
                            </div>

                            <div class="flex flex-col">
                                <div
                                    v-for="(row, ri) in group.rows"
                                    :key="ri"
                                    class="h-[3.5rem] md:h-[5.5rem] lg:h-[7.5rem] flex flex-col items-center justify-center text-sm md:text-2xl lg:text-4xl pl-1 pr-1 border-t border-white/20 first:border-t-0"
                                >
                                    <div class="font-bold text-sm md:text-2xl lg:text-3xl xl:text-4xl leading-tight text-center whitespace-nowrap">
                                        {{ row.qty }}
                                    </div>
                                    <div class="text-white/90 text-xs md:text-base lg:text-2xl font-medium leading-none mt-1">
                                        ชิ้น
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        v-for="(col, ci) in columns"
                        :key="col"
                        class="relative border border-primary md:border-2 rounded-lg md:rounded-2xl flex flex-col col-span-1 bg-white"
                    >
                        <div
                            v-if="columnBadges[ci]"
                            class="absolute -top-2.5 -right-2.5 md:-top-3 md:-right-3 bg-yellow-400 text-primary text-xs md:text-sm lg:text-base font-bold rounded-full w-10 h-10 md:w-14 md:h-14 lg:w-20 lg:h-20 flex items-center justify-center text-center leading-none shadow-md z-10"
                        >
                            {{ columnBadges[ci] }}
                        </div>

                        <div class="pl-1 pr-1 text-center text-primary border-b border-primary md:border-b-2 h-[4rem] md:h-[6rem] lg:h-[8.5rem] flex flex-col justify-center items-center">
                            <div class="text-sm md:text-2xl lg:text-3xl xl:text-4xl font-extrabold leading-tight break-words">
                                {{ col }}
                            </div>
                            <div v-if="columnSubtitles[ci]" class="text-xs md:text-sm lg:text-xl text-primary/90 mt-1 md:mt-2 font-bold leading-tight break-words">
                                {{ columnSubtitles[ci] }}
                            </div>
                        </div>

                        <div class="flex flex-col flex-1">
                            <div
                                v-for="(row, ri) in group.rows"
                                :key="ri"
                                class="h-[3.5rem] md:h-[5.5rem] lg:h-[7.5rem] flex flex-col items-center justify-center pl-1 pr-1 border-t border-primary/20 md:border-primary first:border-t-0"
                            >
                                <div class="font-extrabold text-primary text-base md:text-2xl lg:text-4xl xl:text-5xl leading-none text-center whitespace-nowrap">
                                    {{ row.prices[ci] }}.-
                                </div>
                                <div class="text-primary/90 text-xs md:text-sm lg:text-xl font-medium mt-1 leading-none text-center">
                                    บาท/ชิ้น
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div
            v-if="leftNotes.length || rightNotes.length"
            class="mt-4 md:mt-8 flex flex-col md:flex-row gap-3 md:gap-10 md:justify-between pl-2 pr-2 md:pl-0 md:pr-0"
        >
            <div v-if="leftNotes.length" class="flex-1 md:flex-none md:max-w-[48%] flex flex-col gap-1">
                <p
                    v-for="(note, ni) in leftNotes"
                    :key="ni"
                    class="m-0! text-sm md:text-sm lg:text-base leading-relaxed text-primary"
                >
                    {{ note }}
                </p>
            </div>
            <div v-if="rightNotes.length" class="flex-1 md:flex-none md:max-w-[48%] md:ml-auto flex flex-col gap-1 text-left md:text-right">
                <p
                    v-for="(note, ni) in rightNotes"
                    :key="ni"
                    class="m-0! text-sm md:text-sm lg:text-base leading-relaxed text-primary"
                >
                    {{ note }}
                </p>
            </div>
        </div>
    </div>
</template>