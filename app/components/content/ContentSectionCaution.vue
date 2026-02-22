<script setup lang="ts">
interface Slots {
    title(): unknown;
    card1Title(): unknown;
    card1Description(): unknown;
    card2Title(): unknown;
    card2Description(): unknown;
    footer(): unknown;
}
defineSlots<Slots>();

const cardUi = {
    root: 'flex-1 flex flex-col min-h-0 my-5',
    header: 'p-3 sm:p-4 pb-0',
    body: 'flex flex-col flex-1 p-3 sm:p-4 pt-3',
}
</script>

<template>
    <section class="w-full px-5 lg:px-[4.6rem] space-y-5">
        <h2 class="text-primary text-left text-2xl md:text-3xl font-bold mb-6">
            <slot name="title">
                ข้อควรระวัง
            </slot>
        </h2>
        <div class="max-w-3xl mx-auto">
            <div class="flex flex-col sm:flex-row gap-5 items-stretch">
                <UCard :ui="cardUi">
                    <template #header>
                        <div class="aspect-4/3 w-full rounded-md">
                        <img
                            src="/somsri-with-tie-dye/Wash_separately.png"
                            alt="แยกซักกับผ้าชนิดอื่น"
                            class="w-full h-full object-cover"
                        >
                        </div>
                    </template>
                    <div class="flex flex-col items-center text-center space-y-2">
                        <h4 class="text-primary text-lg font-bold">
                            <slot name="card1Title" mdc-unwrap="p">
                            แยกซักกับผ้าชนิดอื่น
                        </slot>
                    </h4>
                    <p class="text-stone-500 text-center text-sm font-light">
                        <slot name="card1Description" mdc-unwrap="p">
                            ผ้ามัดย้อมที่เพิ่งซื้อมาใหม่ อาจมีสีตกออกมา จึงไม่ควรซักปะปนกับผ้าชนิดอื่น ๆ
                        </slot>
                        </p>
                    </div>
                </UCard>
                <UCard :ui="cardUi">
                    <template #header>
                        <div class="aspect-4/3 w-full rounded-md">
                        <img
                            src="/somsri-with-tie-dye/strong_detergents.png"
                            alt="เลี่ยงการใช้ผงซักฟอกเข้มข้น"
                            class="w-full h-full object-cover"
                        >
                        </div>
                    </template>
                    <div class="flex flex-col items-center text-center space-y-2">
                        <h4 class="text-primary text-lg font-bold">
                            <slot name="card2Title" mdc-unwrap="p">
                            เลี่ยงการใช้ผงซักฟอกเข้มข้น
                        </slot>
                    </h4>
                    <p class="text-stone-500 text-center text-sm font-light">
                        <slot name="card2Description" mdc-unwrap="p">
                            ผงซักฟอกเข้มข้นจะทำให้ผ้ามัดย้อมสีจางลง และควรกลับด้านผ้าก่อนนำไปตากแดด
                        </slot>
                        </p>
                    </div>
                </UCard>
            </div>
        </div>
        <p class="text-primary text-center font-bold text-lg">
            <slot name="footer" mdc-unwrap="p">
                งานมัดย้อมจะประเมินราคาตามจำนวน ขนาด และสีที่ใช้สามารถส่งแบบมาให้แอดมินประเมินทางแชทไลน์ได้เลยนะคะ
            </slot>
        </p>
    </section>
</template>
