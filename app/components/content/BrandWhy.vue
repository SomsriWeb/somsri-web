<script setup lang="ts">
import { LANGUAGE } from '~/lib/language';

const LANG = inject<'th' | 'en' | Ref<'th' | 'en'>>(LANGUAGE, 'th');
const lang = computed<'th' | 'en'>(() => (typeof LANG === 'string' ? LANG : LANG.value));

const items = computed(() =>
    lang.value === 'en'
        ? [
              'Experts guide you throughout the process',
              'End-to-end, one-stop apparel production',
              'Quality-first — products delivered to customers must meet standards',
              'Fast service with multiple contact channels',
              'Flexible fashion production to your requirements',
              'Fair, friendly pricing — sustainable for you and us',
              'Design support and help choosing the right fabric for your style',
          ]
        : [
              'มีทีมงานผู้เชี่ยวชาญให้คำปรึกษาตลอดกระบวนการทำงาน',
              'ผลิตเสื้อผ้าแบบครบวงจร ครบจบใบที่เดียว',
              'เน้นคุณภาพ สินค้าที่ส่งถึงมือลูกค้าต้องมีคุณภาพ',
              'บริการรวดเร็ว หลากหลายช่องทาง',
              'สามารถผลิตงานแฟชั่นตามที่ลูกค้าต้องการได้ทุกแบบ',
              'ราคามาตรฐาน ราคาเป็นกันเอง ลูกค้าอยู่ได้ เราอยู่ได้',
              'มีบริการการออกแบบเสื้อผ้า และหาผ้าที่เหมาะสมกับแบบของลูกค้า',
          ],
);
</script>

<template>
    <div class="w-full max-w-[40rem] px-4 pb-5 sm:px-6 lg:px-8 mx-auto flex justify-center">
        <ul class="w-full space-y-6 rounded-2xl border-2 border-primary text-primary p-5 text-center bg-white shadow-lg">
            <li
                v-for="text in items"
                :key="text"
                class="flex flex-col items-center gap-2 sm:flex-row sm:items-start sm:gap-3 text-sm sm:text-base lg:text-lg"
            >
                <Icon name="uil:check-circle" class="text-primary" />
                <p>{{ text }}</p>
            </li>
        </ul>
    </div>
</template>
