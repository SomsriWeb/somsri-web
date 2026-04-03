import type { Ref } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type GsapContext = ReturnType<typeof gsap.context>;

export interface ScrollTriggerRefContext {
    gsap: typeof gsap;
    ScrollTrigger: typeof ScrollTrigger;
    el: HTMLElement;
}

/**
 * สร้างแอนิเมชันที่ผูกกับ ScrollTrigger ตาม element จาก ref (client-only)
 * ต้องมี `app/plugins/gsap.client.ts` ลงทะเบียน ScrollTrigger แล้ว
 */
export function useScrollTriggerRef(
    target: Ref<HTMLElement | null>,
    build: (ctx: ScrollTriggerRefContext) => void,
): void {
    if (import.meta.server) return;

    let context: GsapContext | null = null;

    const prefersReducedMotion = () =>
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const clear = () => {
        context?.revert();
        context = null;
    };

    const run = () => {
        clear();
        const el = target.value;
        if (!el || prefersReducedMotion()) return;

        context = gsap.context(() => {
            build({ gsap, ScrollTrigger, el });
        }, el);
    };

    watch(
        () => target.value,
        (el) => {
            if (el) nextTick(run);
            else clear();
        },
        { flush: 'post', immediate: true },
    );

    onBeforeUnmount(clear);
}
