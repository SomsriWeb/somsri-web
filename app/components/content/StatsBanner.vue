<script setup lang="ts">
interface Props {
    /**
     * class สำหรับ wrapper ของ banner (พื้นหลัง/ระยะขอบ ฯลฯ)
     */
    wrapperClass?: string;

    /**
     * class สำหรับ inner wrapper (กำหนด padding ให้ตรงกับ layout)
     */
    innerClass?: string;

    /**
     * class สำหรับ grid ภายใน (จำนวนคอลัมน์/ช่องว่าง ฯลฯ)
     */
    gridClass?: string;

    /**
     * class สำหรับแต่ละช่องของสถิติ
     */
    itemClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
    // full-bleed background (กว้างเต็มจอ) แม้อยู่ใน layout หลายคอลัมน์
    // ใช้ translate แทน -ml/-mr 50vw เพื่อไม่ “ดันไปทางขวา” เมื่อ parent ไม่ได้อยู่กึ่งกลาง viewport
    wrapperClass: 'relative left-1/2 w-screen -translate-x-1/2 bg-primary text-white',
    // ให้แนว padding ตรงกับ Container.vue (px-5 lg:px-[4.6rem])
    innerClass: 'px-5 lg:px-[4.6rem]',
    gridClass: 'grid grid-cols-2 sm:grid-cols-4 gap-y-6',
    itemClass: 'flex flex-col items-center justify-center text-center py-6',
});

type Slots = {
    'item-1'?: () => unknown;
    'item-2'?: () => unknown;
    'item-3'?: () => unknown;
    'item-4'?: () => unknown;
};

defineSlots<Slots>();
</script>

<template>
    <section :class="props.wrapperClass" aria-label="สถิติ">
        <div :class="props.innerClass">
            <div :class="props.gridClass">
                <div :class="props.itemClass">
                    <slot name="item-1" />
                </div>
                <div :class="props.itemClass">
                    <slot name="item-2" />
                </div>
                <div :class="props.itemClass">
                    <slot name="item-3" />
                </div>
                <div :class="props.itemClass">
                    <slot name="item-4" />
                </div>
            </div>
        </div>
    </section>
</template>

