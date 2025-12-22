<template>
    <UModal :default-open="true" :close="false">
        <template #body>
            <div class="text-left space-y-3 block">
                <p class="font-bold text-3xl">ประกาศสำคัญจาก "สมศรีมีเสื้อ"</p>
                <p>
                    เนื่องจากขณะนี้ Line Official Account เดิมของทางร้านเกิดปัญหาขัดข้อง (ถูกแฮ็ก) และกำลังอยู่ในระหว่างการดำเนินการแก้ไขอย่างเร่งด่วน
                    เพื่อความปลอดภัยและความต่อเนื่องในการสั่งซื้อ/สอบถามข้อมูล
                </p>
                <div>
                    <p>รบกวนลูกค้าทุกท่านติดต่อเราผ่านทาง Line OA ใหม่ที่นี่เท่านั้น: 👉 Line ID: @ssgm</p>
                    <p>หรือคลิก: <NuxtLink class="underline" href="https://lin.ee/EU8x2b5" external>https://lin.ee/EU8x2b5</NuxtLink></p>
                </div>
                <p>หรือทาง Facebook Page สมศรีมีเสื้อเท่านั้น</p>
                <p>⚠️ ข้อควรระวัง: โปรดงดทำธุรกรรมหรือโอนเงินผ่านบัญชีไลน์เดิมจนกว่าจะมีประกาศเปลี่ยนแปลง ขออภัยในความไม่สะดวกอย่างสูงค่ะ</p>
            </div>
        </template>

        <template #footer="{ close }">
            <div class="w-full flex justify-end gap-5">
                <UButton @click="close()">ฉันเข้าใจแล้ว</UButton>
            </div>
        </template>
    </UModal>
</template>
