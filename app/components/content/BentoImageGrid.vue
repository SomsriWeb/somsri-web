<script setup lang="ts">
interface Props {
    gapClass?: string;
    cellClass?: string;
    cell1Class?: string;
    cell2Class?: string;
    cell3Class?: string;
    cell4Class?: string;
    cell5Class?: string;
    imageFit?: 'cover' | 'contain';
    /**
     * คอลัมน์ซ้าย (รูป 2 บน + 4 ล่าง) สัดส่วนแถว — default 2:1 (สลับจากกลาง)
     */
    stackRowTopFr?: number;
    stackRowBottomFr?: number;
    /** @deprecated */
    leftRowTopFr?: number;
    leftRowBottomFr?: number;
    /** คอลัมน์กลาง: บน 1 ส่วน ล่าง 2 ส่วน (3 แถว) */
    midRowTopFr?: number;
    midRowBottomFr?: number;
    /** ความกว้าง: ซ้าย (คู่รูป) / กลาง / ขวา (รูปใหญ่) */
    colLeftFr?: number;
    colMidFr?: number;
    colRightFr?: number;
    /** @deprecated ใช้ colRightFr — เดิมใช้กับคอลัมน์รูปใหญ่ */
    colHeroFr?: number;
}

const props = withDefaults(defineProps<Props>(), {
    gapClass: 'gap-3 md:gap-3',
    cellClass: '',
    cell1Class: '',
    cell2Class: '',
    cell3Class: '',
    cell4Class: '',
    cell5Class: '',
    imageFit: 'cover',
    stackRowTopFr: 2,
    stackRowBottomFr: 1,
    midRowTopFr: 1,
    midRowBottomFr: 1,
    colLeftFr: 1.15,
    colMidFr: 1,
    colRightFr: 1,
});

const rootClass = computed(() =>
    [props.gapClass, props.imageFit === 'cover' ? 'bento-fit-cover' : null].filter(Boolean),
);

const colRight = computed(() => props.colHeroFr ?? props.colRightFr);

const gridVars = computed(() => ({
    '--bento-col-left': `${props.colLeftFr}fr`,
    '--bento-col-mid': `${props.colMidFr}fr`,
    '--bento-col-right': `${colRight.value}fr`,
}));

const pairColVars = computed(() => ({
    '--bento-pair-top': `${props.stackRowTopFr ?? props.leftRowTopFr ?? 2}fr`,
    '--bento-pair-bottom': `${props.stackRowBottomFr ?? props.leftRowBottomFr ?? 1}fr`,
}));

const midColVars = computed(() => ({
    '--bento-mid-top': `${props.midRowTopFr}fr`,
    '--bento-mid-bottom': `${props.midRowBottomFr}fr`,
}));

function classesForCell(base: string, n: 1 | 2 | 3 | 4 | 5): string[] {
    const bySlot = {
        1: props.cell1Class,
        2: props.cell2Class,
        3: props.cell3Class,
        4: props.cell4Class,
        5: props.cell5Class,
    } as const;
    return [base, props.cellClass, bySlot[n]].filter((c): c is string => Boolean(c));
}

defineSlots<Record<string, () => unknown>>();
</script>

<template>
    <div
        class="bento-grid-root w-full max-w-full"
        dir="ltr"
        :class="rootClass"
        :style="gridVars"
    >
        <!-- คอลัมน์ 1 ซ้าย: รูป 2 + 4 (บนใหญ่ ล่างเล็ก — สลับจากกลาง) — ลำดับ DOM ตรงกับลำดับคอลัมน์ -->
        <div
            class="bento-grid__track bento-grid__track--pair bento-grid__subgrid bento-grid__subgrid--pair max-md:contents md:min-h-0 md:gap-3"
            :style="pairColVars"
        >
            <div
                :class="
                    classesForCell(
                        'bento-grid__cell bento-grid__cell--pair-top bento-grid__cell--2 order-2 flex min-h-36 w-full min-w-0 overflow-hidden rounded-xl md:min-h-0',
                        2,
                    )
                "
            >
                <slot name="item-2" mdc-unwrap="p" />
            </div>
            <div
                :class="
                    classesForCell(
                        'bento-grid__cell bento-grid__cell--pair-bottom bento-grid__cell--4 order-4 flex min-h-32 w-full min-w-0 overflow-hidden rounded-xl md:min-h-0',
                        4,
                    )
                "
            >
                <slot name="item-4" mdc-unwrap="p" />
            </div>
        </div>

        <!-- คอลัมน์ 2 กลาง: รูป 3 บน (1 แถว) + รูป 5 ล่าง span 2 แถว -->
        <div
            class="bento-grid__track bento-grid__track--mid bento-grid__subgrid bento-grid__subgrid--mid max-md:contents md:min-h-0 md:gap-3"
            :style="midColVars"
        >
            <div
                :class="
                    classesForCell(
                        'bento-grid__cell bento-grid__cell--3 bento-grid__cell--mid-top order-3 flex min-h-28 w-full min-w-0 overflow-hidden rounded-xl md:min-h-0',
                        3,
                    )
                "
            >
                <slot name="item-3" mdc-unwrap="p" />
            </div>
            <div
                :class="
                    classesForCell(
                        'bento-grid__cell bento-grid__cell--5 bento-grid__cell--mid-bottom order-5 flex min-h-40 w-full min-w-0 overflow-hidden rounded-xl md:min-h-0',
                        5,
                    )
                "
            >
                <slot name="item-5" mdc-unwrap="p" />
            </div>
        </div>

        <!-- คอลัมน์ 3 ขวา: รูป 1 เต็มความสูง -->
        <div
            :class="
                classesForCell(
                    'bento-grid__track bento-grid__track--hero bento-grid__cell bento-grid__cell--1 order-1 flex min-h-48 w-full min-w-0 overflow-hidden rounded-xl md:min-h-0 md:h-full md:self-stretch',
                    1,
                )
            "
        >
            <slot name="item-1" mdc-unwrap="p" />
        </div>
    </div>
</template>

<style scoped>
.bento-grid-root {
    display: flex;
    flex-direction: column;
    direction: ltr;
}

@media (min-width: 768px) {
    .bento-grid-root {
        display: grid;
        direction: ltr;
        width: 100%;
        box-sizing: border-box;
        grid-template-columns:
            minmax(0, var(--bento-col-left, 1fr)) minmax(0, var(--bento-col-mid, 1fr))
            minmax(0, var(--bento-col-right, 1fr));
        /* ความสูงแถวชัด — ให้ลูก h-full ทำงาน */
        grid-template-rows: minmax(0, 1fr);
        align-items: stretch;
        min-height: 0;
        height: clamp(12rem, 38vw, 22rem);
        max-height: min(24rem, 90vw);
    }

    .bento-grid__track--pair {
        grid-column: 1;
        grid-row: 1;
        min-height: 0;
        align-self: stretch;
    }

    .bento-grid__track--mid {
        grid-column: 2;
        grid-row: 1;
        min-height: 0;
        align-self: stretch;
    }

    .bento-grid__track--hero {
        grid-column: 3;
        grid-row: 1;
        min-height: 0;
        align-self: stretch;
    }

    .bento-grid__subgrid--pair {
        display: grid;
        grid-template-rows: minmax(0, var(--bento-pair-top, 2fr)) minmax(0, var(--bento-pair-bottom, 1fr));
        min-height: 0;
        height: 100%;
    }

    .bento-grid__subgrid--mid {
        display: grid;
        grid-template-rows:
            minmax(0, var(--bento-mid-top, 1fr)) minmax(0, var(--bento-mid-bottom, 1fr))
            minmax(0, var(--bento-mid-bottom, 1fr));
        min-height: 0;
        height: 100%;
    }

    .bento-grid__cell--mid-top {
        grid-row: 1;
    }

    .bento-grid__cell--mid-bottom {
        grid-row: 2 / span 2;
    }

    .bento-grid__cell--pair-top {
        grid-row: 1;
    }

    .bento-grid__cell--pair-bottom {
        grid-row: 2;
    }

    .bento-grid__cell {
        min-height: 0;
        height: 100%;
    }
}

.bento-grid__cell :deep(img) {
    margin: auto;
}

.bento-grid-root.bento-fit-cover .bento-grid__cell :deep(img) {
    margin: 0;
    height: 100%;
    width: 100%;
    max-height: none;
    max-width: none;
    object-fit: cover;
}

.bento-grid-root:not(.bento-fit-cover) .bento-grid__cell :deep(img) {
    height: auto !important;
    width: auto !important;
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
    object-position: center;
}
</style>
