import type { Ref } from 'vue';

export interface UseScrollRevealUpOptions {
    /**
     * - `undefined` — หา `:scope > div` ถ้าไม่มีแม็ตช์จะแอนิเมททั้ง root
     * - `null` — แอนิเมททั้ง root เสมอ (ไม่ query ลูก)
     * - `string` — selector เอง ถ้าไม่มีแม็ตช์จะใช้ root
     */
    childSelector?: string | null;
    /** ScrollTrigger start (เช่น top 60%) */
    start?: string;
    duration?: number;
    /** ใช้เมื่อแอนิเมทหลาย element พร้อมกัน */
    stagger?: number;
    y?: number;
    ease?: string;
    toggleActions?: string;
}

const defaultChildSelector = ':scope > div';

/**
 * เลื่อนขึ้น + fade-in เมื่อสกรอล์ถึง — ห่อ `useScrollTriggerRef` ไม่ต้องเขียน scrollTrigger ซ้ำในทุกคอมโพเนนต์
 */
export function useScrollRevealUp(
    target: Ref<HTMLElement | null>,
    options?: UseScrollRevealUpOptions,
): void {
    const {
        childSelector: childSelectorOpt,
        start = 'top 60%',
        duration = 1.1,
        stagger = 0.28,
        y = 48,
        ease = 'power2.out',
        toggleActions = 'play none none reverse',
    } = options ?? {};

    useScrollTriggerRef(target, ({ gsap, el }) => {
        let targets: HTMLElement | NodeListOf<HTMLElement>;
        let useStagger = false;

        if (childSelectorOpt === null) {
            targets = el;
        } else {
            const sel = childSelectorOpt ?? defaultChildSelector;
            const nodes = el.querySelectorAll<HTMLElement>(sel);
            if (nodes.length > 0) {
                targets = nodes;
                useStagger = nodes.length > 1;
            } else {
                targets = el;
            }
        }

        gsap.from(targets, {
            opacity: 0,
            y,
            duration,
            ease,
            ...(useStagger ? { stagger } : {}),
            scrollTrigger: {
                trigger: el,
                start,
                toggleActions,
            },
        });
    });
}
