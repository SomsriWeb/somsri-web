<script setup lang="ts">
import { useScrollTriggerRef } from '~/composables/useScrollTriggerRef';
// PROPS
interface Props {
    name: string;
    url: string;
    image: string;
    alt?: string;
    /** เปิดแอนิเมชัน scroll-reveal */
    revealOnScroll?: boolean;
    /**
     * เมื่อมีหลายการ์ดใน slot — ระยะห่างระหว่างการ์ด (วินาที) ให้เล่นทีละใบ ไม่พร้อมกัน
     */
    revealStagger?: number;
    /** ScrollTrigger start เมื่อมีหลายลูก (trigger ที่ root) */
    revealStart?: string;
}
const props = withDefaults(defineProps<Props>(), {
    revealOnScroll: true,
    revealStagger: 0.32,
    revealStart: 'top 78%',
});

defineSlots<{
    default(): unknown;
}>();

const rootRef = ref<HTMLElement | null>(null);

useScrollTriggerRef(rootRef, ({ gsap, el }) => {
    if (!props.revealOnScroll) return;

    const items = el.querySelectorAll<HTMLElement>(':scope > *');
    if (items.length === 0) return;

    if (items.length === 1) {
        const node = items[0]!;
        gsap.from(node, {
            opacity: 0,
            y: 40,
            duration: 0.75,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: node,
                start: 'top 88%',
                toggleActions: 'play none none reverse',
            },
        });
        return;
    }

    gsap.from(items, {
        opacity: 0,
        y: 40,
        duration: 0.75,
        stagger: props.revealStagger,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: el,
            start: props.revealStart,
            toggleActions: 'play none none reverse',
        },
    });
});
</script>
<template>
    <div ref="rootRef" class="min-w-0 w-full">
        <slot>
            <div class="relative h-full min-w-0 w-full rounded-xl overflow-hidden">
                <ProseImg
                    :src="image"
                    :alt="alt || name"
                    :class="['h-full w-full aspect-5/7 object-cover', props.imageRotateClass]"
                    sizes="sm:300px 3xl:400px"
                />
                <div class="absolute inset-0 bg-black/15" />
                <p class="absolute top-3 left-3 text-white text-xl">{{ name }}</p>

                <!-- TODO: รอทำหน้าแยกก่อนค่อยมาเปิด -->
                <!-- <UButton
			color="neutral"
			variant="outline"
			class="!text-primary absolute bottom-5 right-5 rounded-full !min-w-fit"
			icon="lucide:plus"
		/> -->
            </div>
        </slot>
    </div>
</template>
