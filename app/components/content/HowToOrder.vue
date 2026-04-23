<script setup lang="ts">
interface Props {
    titleAsTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    titleCenter?: boolean;
}
const { titleAsTag = 'h2', titleCenter = false } = defineProps<Props>();

const { data } = await useAsyncData('how-to-order', () =>
    queryCollection('howToOrder').order('order', 'ASC').all(),
);

const rootRef = ref<HTMLElement | null>(null);

const DIM_OPACITY = 0.4;

useScrollTriggerRef(rootRef, ({ gsap, el }) => {
    type Timeline = ReturnType<typeof gsap.timeline>;
    let loop: Timeline | null = null;

    const steps = el.querySelectorAll<HTMLElement>('.how-step');
    const badges = el.querySelectorAll<HTMLElement>('.how-step__badge');

    const killLoop = () => {
        loop?.kill();
        loop = null;
    };

    const startLoop = () => {
        killLoop();
        if (steps.length === 0) return;

        const tl = gsap.timeline({ repeat: -1 });
        const step = 0.35;  // ระยะห่างระหว่างจังหวะ spotlight
        const fadeIn = 0.3;
        const hold = 0.25;
        const fadeOut = 0.5;
        const tail = 0.9;   // พักก่อนเริ่มรอบใหม่

        steps.forEach((stepEl, i) => {
            const badge = badges[i];
            const at = i * step;
            tl.to(
                stepEl,
                { opacity: 1, duration: fadeIn, ease: 'sine.out' },
                at,
            );
            if (badge)
                tl.to(
                    badge,
                    { scale: 1.2, duration: fadeIn, ease: 'back.out(2)' },
                    at,
                );
            tl.to(
                stepEl,
                {
                    opacity: DIM_OPACITY,
                    duration: fadeOut,
                    ease: 'sine.in',
                },
                at + fadeIn + hold,
            );
            if (badge)
                tl.to(
                    badge,
                    { scale: 1, duration: fadeOut, ease: 'sine.in' },
                    at + fadeIn + hold,
                );
        });
        tl.to({}, { duration: tail });
        loop = tl;
    };

    gsap.set(steps, { opacity: 0, y: 30 });
    gsap.set(badges, { scale: 0 });

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: el,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
            onLeaveBack: () => {
                killLoop();
                gsap.set(steps, { opacity: DIM_OPACITY });
            },
        },
    });

    tl.to(steps, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.12,
        ease: 'power2.out',
    });

    tl.to(
        badges,
        {
            scale: 1,
            duration: 0.4,
            stagger: 0.12,
            ease: 'back.out(2.2)',
        },
        '<0.1',
    );

    // พักหลังโชว์ทุกสเต็ปเต็ม แล้วค่อย dim ลงเข้าสู่โหมด spotlight
    tl.to({}, { duration: 0.7 });
    tl.to(steps, {
        opacity: DIM_OPACITY,
        duration: 0.55,
        ease: 'power1.inOut',
    });

    tl.call(() => startLoop());

    onBeforeUnmount(killLoop);
});
</script>

<template>
    <div>
        <component :is="titleAsTag" class="font-bold text-[2rem] md:text-[2.5rem] leading-none text-primary font-stretch-condensed" :class="{ 'text-center': titleCenter }">
            <slot name="title" mdc-unwrap="p">ขั้นตอนการสั่งผลิต</slot>
        </component>

        <div ref="rootRef" class="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12 mt-8">
            <div
                v-for="(item, i) in data"
                :key="item.label"
                class="how-step flex flex-col items-center text-center"
            >
                <div class="relative inline-block">
                    <ProseImg
                        v-if="item.image"
                        class="max-w-14 md:max-w-20 mx-auto"
                        :src="item.image"
                        :alt="item.label"
                    />
                    <span class="how-step__badge absolute -bottom-1 -right-1 w-6 h-6 md:w-7 md:h-7 rounded-full bg-primary text-white text-xs md:text-sm font-bold flex items-center justify-center shadow-lg shadow-primary/40 ring-2 ring-white">
                        {{ i + 1 }}
                    </span>
                </div>
                <p class="mt-4 font-bold font-stretch-condensed text-primary text-sm md:text-lg leading-tight">
                    {{ item.label }}
                </p>
                <p v-if="item.description" class="mt-1 text-primary/70 text-xs leading-snug px-2">
                    {{ item.description }}
                </p>
            </div>
        </div>

        <ProseP class="text-primary! font-stretch-condensed font-bold! text-center text-xl mt-10">
            **ทางเรามีบริการ QC & Pack อย่างดี รับประกันคุณภาพสูง**
        </ProseP>
    </div>
</template>
