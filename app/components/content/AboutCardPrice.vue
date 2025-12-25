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
    <div class="flex gap-4 text-stone-500 font-light text-left max-w-4xl w-full px-4">
        <div class="flex flex-col gap-2 justify-center">
            <div class="text-primary text-3xl font-bold">
                <slot mdc-unwrap="p" name="startpriceHeader" />
            </div>
            <div class="text-primary text-3xl font-bold">
                <slot mdc-unwrap="p" name="startpriceValue" />
            </div>
            <div class="">
                <slot mdc-unwrap="p" name="startpriceDescription" />
            </div>
        </div>
        <div class="w-full flex justify-center items-baseline">
            <slot mdc-unwrap="p" name="startpriceImage" />
        </div>
    </div>
</template>
