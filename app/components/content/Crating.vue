<script setup lang="ts">
interface Slots {
    /**
     * ข้อความที่แสดงผล
     */
    header(): unknown;
    sloganText(): unknown;
    /**
     * ข้อความที่แสดงผล
     */
    subheader(): unknown;
    descriptionSlogan(): unknown;
}
defineSlots<Slots>();
</script>
<template>
    <div class="text-center font-bold text-primary grid grid-cols-2 justify-center rounded-2xl p-4 shadow-lg">
        <div class="text-2xl font-bold items-start">
            <div class="text-2xl font-bold">
                <slot mdc-unwrap="h3" name="header"></slot>
                <div class="text-xl font-bold">
                    <slot mdc-unwrap="p" name="sloganText" />
                </div>
            </div>
        </div>
        <div class="text-2xl font-bold">
            <div class="text-2xl font-bold">
                <slot mdc-unwrap="h3" name="subheader"></slot>
                <div class="text-xl font-bold">
                    <slot mdc-unwrap="p" name="descriptionSlogan" />
                </div>
            </div>
        </div>
       
    </div>
</template>
