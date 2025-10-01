<script setup lang="ts">
//stot
interface Slots {
    /**
     * รูปภาพ
     */
    image(): unknown;


}
defineSlots<Slots>();
</script>
<template>
    <div>
            <div class="flex justify-center pb-5">
        <slot mdc-unwrap="p" name="image" />
    </div>
    </div>
</template>