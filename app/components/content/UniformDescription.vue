<script setup lang="ts">
// SLOTS
interface Slots {
    /**
     * หัวข้อ (แสดงผลเป็น H1)
     */
    title(): unknown;

    /**
     * รายละเอียด (แสดงผลเป็น H2)
     */
    description(): unknown;
}
defineSlots<Slots>();
</script>

<template>
    <div class="flex flex-col items-center w-full m-0 p-4 space-y-6">
        <!-- หัวเรื่อง -->
        <ProseH1 class="text-center">
            <slot name="title" mdc-unwrap="p" />
        </ProseH1>

        <!-- คำอธิบาย -->
        <ProseH2 class="text-center text-lg">
            <slot name="description" mdc-unwrap="p" />
        </ProseH2>
    </div>
</template>
