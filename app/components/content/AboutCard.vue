<script setup lang="ts">
interface Slots {
    strategyimage1(): unknown;
    strategyList1(): unknown;
    strategyimage2(): unknown;
    strategyList2(): unknown;
    strategyimage3(): unknown;
    strategyList3(): unknown;
    strategyimage4(): unknown;
    strategyList4(): unknown;
}
defineSlots<Slots>();
</script>
<template>
    <div class="grid grid-cols-4 gap-4 text-sm">
        <div class="grid items-center justify-center border text-primary rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div class="m-2">
                <slot name="strategyimage1" mdc-unwrap="p" />
            </div>
            <div class="text-center">
                <slot name="strategyList1" mdc-unwrap="p" />
            </div>
        </div>
        <div class="grid items-center justify-center border text-primary rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div class="m-2">
                <slot name="strategyimage2" mdc-unwrap="p" />
            </div>
            <div class="text-center">
            <slot name="strategyList2" mdc-unwrap="p" />
            </div>
        </div>
        <div class="grid items-center justify-center border text-primary rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div class="m-2">
                <slot name="strategyimage3" mdc-unwrap="p" />
            </div>
            <div class="text-center">
            <slot name="strategyList3" mdc-unwrap="p" />
            </div>
        </div>
        <div class="grid items-center justify-center border text-primary rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div class="m-2">
                <slot name="strategyimage4" mdc-unwrap="p" class="rounded-lg"/>
            </div>
            <div class="text-center">
            <slot name="strategyList4" mdc-unwrap="p" />
            </div>
        </div>
    </div>
</template>
