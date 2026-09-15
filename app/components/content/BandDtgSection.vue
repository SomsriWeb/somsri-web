<script setup lang="ts">
interface Props {
    mainShirtImage?: string;
    sampleImage1?: string; // Cheunjai (Vertical)
    sampleImage2?: string; // Maleehuana (Horizontal)
}

withDefaults(defineProps<Props>(), {
    mainShirtImage: '/band-shirt/dtg-bigass.png',
    sampleImage1: '/band-shirt/dtg-cheunjai.png',
    sampleImage2: '/band-shirt/dtg-maleehuana.png',
});

interface Slots {
    title?(): unknown;
    subtitle?(): unknown;
    headerDescription?(): unknown;
    sampleTitle?(): unknown;
    sampleDescription?(): unknown;
}
defineSlots<Slots>();
</script>

<template>
    <section class="w-full py-8 lg:py-14">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- ================= Desktop Layout (md:block) ================= -->
            <div class="hidden md:block">
                <!-- Header: Left Title / Right Description -->
                <div class="flex justify-between items-start gap-8 lg:gap-12 mb-6 lg:mb-8">
                    <div class="flex-1">
                        <h2 class="text-3xl lg:text-4xl font-bold text-primary tracking-tight leading-none mb-2">
                            <slot name="title">เสื้อวง เสื้อวงวินเทจ</slot>
                        </h2>
                        <p class="text-xl lg:text-2xl font-bold text-stone-900 leading-snug">
                            <slot name="subtitle">
                                เหมาะกับระบบการสกรีน<br />ประเภทใด?
                            </slot>
                        </p>
                    </div>
                    <div class="flex-1 text-base sm:text-lg lg:text-xl text-stone-800 leading-relaxed font-normal text-left pt-1">
                        <slot name="headerDescription">
                            การสกรีนเสื้อวงวินเทจ เหมาะกับการ <NuxtLink to="/screen" class="text-primary font-medium underline">สกรีนแบบ DTG (Direct to garment)</NuxtLink> ที่เป็นเทคนิคสุดล้ำที่เป็นที่นิยมมากในปัจจุบันกับวงการพิมพ์ผลิตผ้า เหมาะกับการสร้างเอกลักษณ์ให้เสื้อผ้า เป็นการพิมพ์พ่นเสื้อผ้าโดยตรง ด้วยเครื่องสกรีน Brother GTX Pro Bulk
                        </slot>
                    </div>
                </div>

                <!-- Big Shirt Mockup -->
                <div class="w-full flex justify-center my-6 lg:my-8">
                    <NuxtImg
                        :src="mainShirtImage"
                        alt="เสื้อวงวินเทจ สกรีนแบบ DTG"
                        class="w-full max-w-2xl lg:max-w-3xl object-contain drop-shadow-sm hover:scale-[1.01] transition duration-300"
                        loading="lazy"
                    />
                </div>

                <!-- Bottom Showcase Grid: Left Cheunjai / Right Maleehuana + Centered Text -->
                <div class="grid grid-cols-2 gap-6 lg:gap-8 items-stretch mt-6">
                    <!-- Left: Cheunjai Vertical Image (height matches Right Column automatically) -->
                    <div class="relative w-full h-full min-h-0 rounded-2xl overflow-hidden shadow-sm">
                        <NuxtImg
                            :src="sampleImage1"
                            alt="ตัวอย่างงานสกรีน DTG บนเสื้อวง"
                            class="absolute inset-0 w-full h-full object-cover"
                            loading="lazy"
                        />
                    </div>

                    <!-- Right: Maleehuana (Top) + DTG Text (Bottom, Centered) -->
                    <div class="w-full flex flex-col items-center">
                        <NuxtImg
                            :src="sampleImage2"
                            alt="ตัวอย่างงานสกรีน DTG ศิลปิน"
                            class="w-full aspect-[16/10] object-cover rounded-2xl shadow-sm"
                            loading="lazy"
                        />
                        <div class="mt-5 lg:mt-6 text-center flex flex-col items-center px-2">
                            <h3 class="text-3xl lg:text-4xl font-bold text-primary mb-3">
                                <slot name="sampleTitle">ตัวอย่างการสกรีนแบบ DTG</slot>
                            </h3>
                            <p class="text-base sm:text-lg lg:text-xl text-stone-800 leading-relaxed font-normal">
                                <slot name="sampleDescription">
                                    ใช้หมึกพิเศษที่สามารถซึมซับลงบนเส้นใยผ้าได้ผ่านการสั่งงานผ่านคอมพิวเตอร์เครื่องเดียว เพื่อให้ลวดลายบนผ้ามีความละเอียดสูง สีสันสดใส ดูเป็นธรรมชาติไม่แข็งทื่อและยังไม่ต้องเสียเวลาในขั้นตอนการทำแผ่นเฟรมไม่ต้องเปลืองสีสามารถพิมพ์ได้ตัวต่อตัว เป็นมิตรกับสิ่งแวดล้อมและที่สำคัญยังช่วยลดต้นทุนการผลิตลงได้อีกขั้นนึง แต่ได้ลายผ้าที่มีคุณภาพสูง
                                </slot>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ================= Mobile Layout (md:hidden) ================= -->
            <div class="block md:hidden text-center space-y-6">
                <!-- Mobile Header: Centered -->
                <div class="space-y-3">
                    <h2 class="text-3xl font-bold text-primary">
                        <slot name="title">เสื้อวง เสื้อวงวินเทจ</slot>
                    </h2>
                    <p class="text-xl sm:text-2xl font-bold text-stone-900">
                        <slot name="subtitle">เหมาะกับระบบการสกรีนประเภทใด?</slot>
                    </p>
                    <p class="text-base text-stone-800 leading-relaxed font-normal px-2 pt-1 text-center">
                        <slot name="headerDescription">
                            การสกรีนเสื้อวงวินเทจ เหมาะกับการ <NuxtLink to="/screen" class="text-primary font-medium underline">สกรีนแบบ DTG (Direct to garment)</NuxtLink> ที่เป็นเทคนิคสุดล้ำที่เป็นที่นิยมมากในปัจจุบันกับวงการพิมพ์ผลิตผ้า เหมาะกับการสร้างเอกลักษณ์ให้เสื้อผ้า เป็นการพิมพ์พ่นเสื้อผ้าโดยตรง ด้วยเครื่องสกรีน Brother GTX Pro Bulk
                        </slot>
                    </p>
                </div>

                <!-- Big Shirt Mockup -->
                <div class="w-full flex justify-center py-2">
                    <NuxtImg
                        :src="mainShirtImage"
                        alt="เสื้อวงวินเทจ สกรีนแบบ DTG"
                        class="w-full max-w-[300px] object-contain"
                        loading="lazy"
                    />
                </div>

                <!-- Sample Image 2 (Maleehuana) -->
                <div class="w-full">
                    <NuxtImg
                        :src="sampleImage2"
                        alt="ตัวอย่างงานสกรีน DTG ศิลปิน"
                        class="w-full aspect-[16/10] object-cover rounded-xl shadow-sm"
                        loading="lazy"
                    />
                </div>

                <!-- DTG Explanation (Mobile) -->
                <div class="space-y-3 px-2 text-center">
                    <h3 class="text-2xl sm:text-3xl font-bold text-primary">
                        <slot name="sampleTitle">ตัวอย่างการสกรีนแบบ DTG</slot>
                    </h3>
                    <p class="text-base text-stone-800 leading-relaxed font-normal">
                        <slot name="sampleDescription">
                            ใช้หมึกพิเศษที่สามารถซึมซับลงบนเส้นใยผ้าได้ผ่านการสั่งงานผ่านคอมพิวเตอร์เครื่องเดียว เพื่อให้ลวดลายบนผ้ามีความละเอียดสูง สีสันสดใสดูเป็นธรรมชาติไม่แข็งทื่อและยังไม่ต้องเสียเวลาในขั้นตอนการทำแผ่นเฟรมไม่ต้องเปลืองสีสามารถพิมพ์ได้ตัวต่อตัว เป็นมิตรกับสิ่งแวดล้อมและที่สำคัญยังช่วยลดต้นทุนการผลิตลงได้อีกขั้นนึง แต่ได้ลายผ้าที่มีคุณภาพสูง
                        </slot>
                    </p>
                </div>

                <!-- Sample Image 1 (Cheunjai) -->
                <div class="w-full pt-2 flex justify-center">
                    <NuxtImg
                        :src="sampleImage1"
                        alt="ตัวอย่างงานสกรีน DTG บนเสื้อวง"
                        class="w-full max-w-[340px] aspect-[3/4] object-cover rounded-xl shadow-sm"
                        loading="lazy"
                    />
                </div>
            </div>
        </div>
    </section>
</template>
