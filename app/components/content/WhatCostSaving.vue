<script setup lang="ts">
// PROPS
interface Props {
    /**
     * เปลี่ยน Tag หัวข้อ
     * @default h2
     */
    titleAsTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}
const { titleAsTag = 'h2' } = defineProps<Props>();

// SLOTS
interface Slots {
    /**
     * ข้อความในหัวข้อ
     * @default เลือก Somsri แล้วดียังไง?
     */
    title(): unknown;
}
defineSlots<Slots>();

// VARIABLE
const { data } = await useAsyncData('what-cost-saving', () => queryCollection('whatCostSaving').order('order', 'ASC').all());
</script>

<template>
    <Container class="grid grid-cols-2 py-5! md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-5 bg-primary" no-space>
        <component
            :is="titleAsTag"
            class="col-span-2 md:col-span-full lg:col-span-1 font-bold text-white text-xl sm:text-3xl lg:text-4xl leading-none mb-1 sm:mb-0"
        >
            <slot name="title" mdc-unwrap="p">เลือก Somsri แล้วดียังไง? </slot>
        </component>

        <div v-for="item in data" :key="item.label" class="flex flex-col justify-start items-center">
            <ProseImg v-if="item.image" :src="item.image" :alt="item.label" class="max-w-8 sm:max-w-12 lg:max-w-16" />
            <p class="font-bold font-stretch-condensed text-xs sm:text-base md:text-lg lg:text-xl text-white leading-tight text-center mt-1.5 sm:mt-3">
                {{ item.label }}
            </p>
        </div>
    </Container>
</template>
