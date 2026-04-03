import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useDebounceFn } from '@vueuse/core';

/**
 * หลังเปลี่ยนหน้า / รูปโหลด / เลย์เอาต์ขยาย — refresh ScrollTrigger ให้ start/end ตรง
 * (รันหลัง gsap.client.ts ลงทะเบียนปลั๊กอินแล้ว)
 */
export default defineNuxtPlugin(() => {
    const router = useRouter();

    const refresh = useDebounceFn(() => {
        nextTick(() => {
            ScrollTrigger.refresh();
        });
    }, 200);

    router.afterEach(() => {
        nextTick(refresh);
    });

    window.addEventListener('load', () => refresh());

    /** ผูก img ที่มีอยู่ + ที่ Vue เพิ่มทีหลัง — lazy load ไม่ทำให้ ScrollTrigger ค้างค่าเก่า */
    const bindImgListeners = (root: Element | DocumentFragment) => {
        const imgs = root.querySelectorAll?.('img') ?? [];
        imgs.forEach((img) => {
            const el = img as HTMLImageElement & { __stRefreshBound?: boolean };
            if (el.__stRefreshBound) return;
            el.__stRefreshBound = true;
            el.addEventListener('load', () => refresh(), { passive: true });
            el.addEventListener('error', () => refresh(), { passive: true });
        });
    };

    bindImgListeners(document.documentElement);

    const mo = new MutationObserver((records) => {
        for (const rec of records) {
            rec.addedNodes.forEach((node) => {
                if (node instanceof Element) bindImgListeners(node);
            });
        }
    });
    mo.observe(document.documentElement, { childList: true, subtree: true });

    /** ความสูง/ความกว้าง body เปลี่ยนเมื่อรูปขยายกล่อง — จับซ้ำกับ img load ได้ (debounce รวม) */
    if (typeof ResizeObserver !== 'undefined' && document.body) {
        const ro = new ResizeObserver(() => refresh());
        ro.observe(document.body);
    }
});
