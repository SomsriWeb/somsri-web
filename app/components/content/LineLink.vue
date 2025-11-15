<script setup lang="ts">
import { LINE_LINK } from '~/lib/lineLink';
import { useSlots, cloneVNode, isVNode } from 'vue';

// INJECT
const lineLink = inject<string>(LINE_LINK);

const slots = useSlots();

const WrappedComponent = () => {
    // 4. ดึง VNodes ของ component ลูกๆ ออกมาจาก default slot
    const children = slots.default ? slots.default() : [];

    // 5. วน Loop (map) VNodes ทั้งหมด
    const newChildren = children.map((child) => {
        // 6. ตรวจสอบว่า VNode นี้เป็น "Component" จริงๆ
        //    (ไม่ใช่แค่ตัวหนังสือ, หรือแท็ก <div> ธรรมดา)
        if (isVNode(child) && typeof child.type === 'object') {
            // 7. ถ้าใช่ => "โคลน" VNode นี้ขึ้นมาใหม่
            //    และ "ยัด" (merge) prop 'to' ของเราเข้าไปให้
            return cloneVNode(child, { to: lineLink });
        }

        // 8. ถ้าไม่ใช่ (เช่น เป็นตัวหนังสือ) ก็ return มันกลับไปเฉยๆ
        return child;
    });

    // 9. ส่ง VNodes ชุดใหม่ (ที่ถูกยัด prop ไปแล้ว) กลับไปให้ Vue render
    return newChildren;
};
</script>
<template>
    <WrappedComponent />
</template>
