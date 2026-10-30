<script setup lang="ts">
interface Stat {
    value: string;
    label: string;
}
interface Props {
    items: Stat[];
}
const { items } = defineProps<Props>();
</script>

<template>
    <section class="bg-[#76182f] py-10 text-white md:py-14">
        <div class="grid grid-cols-2 gap-4 px-6 lg:px-18 md:grid-cols-3 lg:grid-cols-5">
            <div v-for="item in items" :key="item.value" class="rounded-xl border border-white/20 p-4 text-center md:p-5">
                <b class="block text-2xl leading-tight md:text-3xl">{{ item.value }}</b>
                <span class="text-xs text-[#f4e4e8] md:text-sm">{{ item.label }}</span>
            </div>
        </div>
    </section>
</template>
