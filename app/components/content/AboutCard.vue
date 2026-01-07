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
    <div class="grid grid-cols-2 gap-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
        <div class="grid items-center justify-center border text-primary rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-2 text-center">
            <slot name="strategyimage1" mdc-unwrap="p" />
            <slot name="strategyList1" mdc-unwrap="p" />
        </article>
        <article class="grid items-center justify-center border text-primary rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-2 text-center" role="listitem">
            <slot name="strategyimage2" mdc-unwrap="p" />
            <slot name="strategyList2" mdc-unwrap="p" />
        </article>
        <article class="grid items-center justify-center border text-primary rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-2 text-center" role="listitem">
            <slot name="strategyimage3" mdc-unwrap="p" />
            <slot name="strategyList3" mdc-unwrap="p" />
        </article>
        <article class="grid items-center justify-center border text-primary rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-2 text-center" role="listitem">
            <slot name="strategyimage4" mdc-unwrap="p" />
            <slot name="strategyList4" mdc-unwrap="p" />
        </article>
    </section>
</template>
