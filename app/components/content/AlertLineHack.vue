<script setup lang="ts">
import { LANGUAGE } from '~/lib/language';

const LANG = inject<'th' | 'en' | Ref<'th' | 'en'>>(LANGUAGE, 'th');
const lang = computed<'th' | 'en'>(() => (typeof LANG === 'string' ? LANG : LANG.value));
</script>

<template>
    <UModal :default-open="true" :close="false">
        <template #body>
            <div class="text-left space-y-3 block">
                <template v-if="lang === 'en'">
                    <p class="font-bold text-3xl">Important notice from “Somsri T-Shirt”</p>
                    <p>
                        Our previous LINE Official Account is currently unavailable due to an incident (hijacked). We are working to resolve it urgently. For your safety and to keep communication smooth, please contact us via our new LINE OA only.
                    </p>
                    <div>
                        <p>Please contact: 👉 LINE ID: @ssgm</p>
                        <p>
                            Or click:
                            <NuxtLink class="underline" to="https://contact.somsritshirt.com/4d6df" external>https://lin.ee/EU8x2b5</NuxtLink>
                        </p>
                    </div>
                    <p>Alternatively, contact us via the official Facebook Page only.</p>
                    <p>⚠️ Warning: Please do not transfer money via the old LINE account until further notice. Sorry for the inconvenience.</p>
                </template>
                <template v-else>
                    <p class="font-bold text-3xl">ประกาศสำคัญจาก "สมศรีมีเสื้อ"</p>
                    <p>
                        เนื่องจากขณะนี้ Line Official Account เดิมของทางร้านเกิดปัญหาขัดข้อง (ถูกแฮ็ก) และกำลังอยู่ในระหว่างการดำเนินการแก้ไขอย่างเร่งด่วน
                        เพื่อความปลอดภัยและความต่อเนื่องในการสั่งซื้อ/สอบถามข้อมูล
                    </p>
                    <div>
                        <p>รบกวนลูกค้าทุกท่านติดต่อเราผ่านทาง Line OA ใหม่ที่นี่เท่านั้น: 👉 Line ID: @ssgm</p>
                        <p>หรือคลิก: <NuxtLink class="underline" to="https://contact.somsritshirt.com/4d6df" external>https://lin.ee/EU8x2b5</NuxtLink></p>
                    </div>
                    <p>หรือทาง Facebook Page สมศรีมีเสื้อเท่านั้น</p>
                    <p>⚠️ ข้อควรระวัง: โปรดงดทำธุรกรรมหรือโอนเงินผ่านบัญชีไลน์เดิมจนกว่าจะมีประกาศเปลี่ยนแปลง ขออภัยในความไม่สะดวกอย่างสูงค่ะ</p>
                </template>
            </div>
        </template>

        <template #footer="{ close }">
            <div class="w-full flex justify-end gap-5">
                <UButton @click="close()">{{ lang === 'en' ? 'I understand' : 'ฉันเข้าใจแล้ว' }}</UButton>
            </div>
        </template>
    </UModal>
</template>
