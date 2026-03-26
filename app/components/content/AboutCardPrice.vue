<script setup lang="ts">
interface Slots {
    /**
     * ข้อความที่เป็นหัวข้อ
     */
    startpriceHeader(): unknown;
    startpriceImage(): unknown;
    startpriceValue(): unknown;
    startpriceDescription(): unknown;
}
defineSlots<Slots>();
</script>
<template>
    <div class="text-stone-500 font-light text-left max-w-4xl w-full px-4">
        <div class="flex flex-col gap-4 md:flex-row items-center">
            <div class="flex flex-col gap-2">
                <div class="text-primary text-3xl font-bold">
                    <slot mdc-unwrap="p" name="startpriceHeader" />
                    <slot mdc-unwrap="p" name="startpriceValue" />
                </div>
                <slot mdc-unwrap="p" name="startpriceDescription" />
            </div>
            <slot mdc-unwrap="p" name="startpriceImage" />
        </div>
    </div>
</template>
