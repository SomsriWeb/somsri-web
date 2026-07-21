<script setup lang="ts">
interface PriceRow {
    label: string
    subtitle?: string
    /** ใส่ตัวเลขราคาเป็น string, หรือ null เพื่อแสดงข้อความ contactText แทน */
    prices: (string | null)[]
}

interface LeftPanel {
    image?: string
    title?: string
    lines?: string[]
}

interface Props {
    quantities: string[]
    rows: PriceRow[]
    leftPanel?: LeftPanel
    contactText?: string
    leftNotes?: string[]
    rightNotes?: string[]
}

const {
    quantities,
    rows,
    leftPanel,
    contactText = 'ติดต่อสอบถาม',
    leftNotes = [],
    rightNotes = [],
} = defineProps<Props>()

const colCount = computed(() => quantities.length + 1)
const gridCols = computed(() => `repeat(${colCount.value}, minmax(0, 1fr))`)
</script>

<template>
    <div class="px-1 md:px-0 py-4 pb-24 md:pb-8 max-w-md md:max-w-3xl lg:max-w-4xl xl:max-w-[55rem] mx-auto w-full overflow-hidden">
        <div class="flex gap-1.5 md:gap-4 w-full">

            <div
                v-if="leftPanel"
                class="hidden md:flex border border-primary md:border-2 rounded-lg md:rounded-2xl flex-col items-center justify-center text-center gap-2 md:gap-3 px-2 md:px-4 w-[22%] shrink-0"
            >
                <img
                    v-if="leftPanel.image"
                    :src="leftPanel.image"
                    :alt="leftPanel.title ?? ''"
                    class="w-14 h-14 md:w-16 lg:w-24 md:h-16 lg:h-24 object-contain"
                />
                <div v-if="leftPanel.title" class="text-primary font-bold text-base md:text-lg lg:text-2xl leading-tight break-words">
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

            <div class="flex-1 w-full min-w-0 flex flex-col gap-3 md:gap-4">

                <div
                    class="grid bg-primary text-white rounded-lg md:rounded-2xl overflow-hidden shadow-sm border border-primary md:border-2"
                    :style="{ gridTemplateColumns: gridCols }"
                >
                    <div class="flex flex-col items-center justify-center gap-1 md:gap-2 h-[4rem] md:h-[6rem] lg:h-[8.5rem]">
                        <i class="ti ti-users text-lg md:text-4xl lg:text-6xl leading-none" aria-hidden="true" />
                        <span class="text-sm md:text-2xl lg:text-4xl font-bold leading-none mt-1">จำนวน</span>
                    </div>
                    
                    <div
                        v-for="(q, qi) in quantities"
                        :key="qi"
                        class="flex flex-col items-center justify-center h-[4rem] md:h-[6rem] lg:h-[8.5rem] px-1 md:px-2 border-l border-white/20 md:border-white"
                    >
                        <div class="font-bold text-sm md:text-2xl lg:text-3xl xl:text-4xl leading-tight text-center whitespace-nowrap">{{ q }}</div>
                        <div class="text-white/90 text-xs md:text-base lg:text-2xl font-medium leading-none mt-1">ชิ้น</div>
                    </div>
                </div>

                <div class="border border-primary md:border-2 rounded-lg md:rounded-2xl overflow-hidden bg-white shadow-sm">
                    <div
                        v-for="(row, ri) in rows"
                        :key="ri"
                        class="grid border-t border-primary/20 md:border-primary first:border-t-0"
                        :style="{ gridTemplateColumns: gridCols }"
                    >
                        <div class="flex flex-col items-center justify-center text-center text-primary px-1 md:px-2 h-[3.5rem] md:h-[5.5rem] lg:h-[7.5rem] border-r border-primary/20 md:border-primary">
                            <img
                                v-if="leftPanel?.image"
                                :src="leftPanel.image"
                                :alt="row.label"
                                class="block md:hidden w-9 h-9 sm:w-10 sm:h-10 object-contain"
                            />
                            <div class="hidden md:block text-sm md:text-xl lg:text-3xl xl:text-4xl font-extrabold leading-tight break-words">{{ row.label }}</div>
                            <div v-if="row.subtitle" class="hidden md:block text-xs md:text-sm lg:text-xl text-primary/90 font-bold mt-1 md:mt-2 leading-tight break-words">{{ row.subtitle }}</div>
                        </div>

                        <div
                            v-for="(price, pi) in row.prices"
                            :key="pi"
                            class="flex flex-col items-center justify-center px-1 h-[3.5rem] md:h-[5.5rem] lg:h-[7.5rem] border-l border-primary/20 md:border-primary first:border-l-0"
                        >
                            <template v-if="price !== null">
                                <div class="font-extrabold text-primary text-base md:text-2xl lg:text-4xl xl:text-5xl leading-none text-center whitespace-nowrap">{{ price }}.-</div>
                                <div class="text-primary/90 text-xs md:text-sm lg:text-xl font-medium mt-1 leading-none text-center">บาท/ชิ้น</div>
                            </template>
                            <template v-else>
                                <div class="font-extrabold text-primary text-xs md:text-xl lg:text-3xl xl:text-4xl leading-tight text-center">{{ contactText }}</div>
                            </template>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div
            v-if="leftNotes.length || rightNotes.length"
            class="mt-6 md:mt-8 flex flex-col md:flex-row gap-4 md:gap-10 md:justify-between px-3 md:px-0"
        >
            <div v-if="leftNotes.length" class="flex-1 md:flex-none md:max-w-[48%] flex flex-col gap-2 text-left">
                <p
                    v-for="(note, ni) in leftNotes"
                    :key="ni"
                    class="m-0! text-xs md:text-sm lg:text-base leading-relaxed text-primary"
                >
                    {{ note }}
                </p>
            </div>
            
            <div v-if="rightNotes.length" class="flex-1 md:flex-none md:max-w-[48%] md:ml-auto flex flex-col gap-2 text-left md:text-right">
                <p
                    v-for="(note, ni) in rightNotes"
                    :key="ni"
                    class="m-0! text-xs md:text-sm lg:text-base leading-relaxed text-primary"
                >
                    {{ note }}
                </p>
            </div>
        </div>
    </div>
</template>