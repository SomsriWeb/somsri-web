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
     * ข้อความของหัวข้อ
     * @default เลือก Somsri แล้วดียังไง?
     */
    title(): unknown;
}
defineSlots<Slots>();

// VARIABLE
const { data } = await useAsyncData('why-choose-somsri', () => queryCollection('whyChooseSomsri').order('order', 'ASC').all());

const sectionRef = ref<HTMLElement | null>(null);

useScrollRevealUp(sectionRef, {
    childSelector: ':scope > *',
    start: 'top 88%',
    duration: 0.55,
    stagger: 0.08,
    y: 24,
});
</script>

<template>
    <Container class="bg-primary py-5!" no-space>
        <!-- รอข้อมูลก่อน mount เพื่อให้ useScrollTriggerRef เห็นลูกครบก่อนสร้างแอนิเมชัน -->
        <div v-if="data" ref="sectionRef">
            <component :is="titleAsTag" class="font-bold text-white text-4xl mb-5 leading-none"><slot name="title" mdc-unwrap="p">เลือก Somsri แล้วดียังไง? </slot></component>

            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 ">
                <div v-for="item in data" :key="item.label" class="flex flex-col justify-start items-center">
                    <ProseImg v-if="item.image" :src="item.image" :alt="item.label" class="max-w-[4rem]" />
                    <p class="font-bold font-stretch-condensed text-xl text-white leading-none text-center mt-3">
                        {{ item.label }}
                    </p>
                </div>
            </div>
        </div>
    </Container>
</template>
