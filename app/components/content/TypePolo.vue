<script setup lang="ts">
const props = defineProps<{
  actionLink: string;
}>();
</script>

<template>
  <section class="bg-white pt-20 px-4 text-primary text-center space-y-10 md:grid-cols-4">
    <!-- หัวข้อหลัก -->
    <div class="space-y-4">
      <h2 class="text-2xl md:text-4xl font-bold">หลากเทคนิคสกรีนเลือกได้ให้ตอบโจทย์</h2>
      <p >ปัก ปักทรานเฟอร์ สกรีน พิมพ์ลาย</p>
    </div>

    <!-- ภาพเทคนิค -->
    <div class="flex justify-center">
      <img src="/polo/type-1-unsmushed.png" alt="เทคนิคสกรีน" class="max-w-full h-auto" />
    </div>

    <!-- ราคาเสื้อโปโล -->
    <div class="space-y-4">
      <h2 class="text-xl md:text-4xl font-bold">ราคาเสื้อโปโล</h2>
      <div class="flex justify-center">
        <img src="/polo/polo_price_01092565.jpg" alt="ราคาโปโล" class="w-full max-w-md h-auto object-contain" />
      </div>
    </div>

    <!-- ขั้นตอนสั่งซื้อ -->
    <div class="flex justify-center">
      <img src="/polo/step-1024x543.png" alt="ขั้นตอนสั่ง" class="w-full max-w-md h-auto object-contain" />
    </div>

    <!-- ปุ่มสั่งทำเสื้อ -->
    <div>
      <a :href="props.actionLink" target="_blank" rel="noopener">
        <UButton size="xl" color="primary" variant="solid" icon="i-lucide-send">
          สั่งทำเสื้อ
        </UButton>
      </a>
    </div>

    <!-- ผลงานการันตี -->
    <div class="space-y-4">
      <h2 class="text-xl md:text-4xl font-bold">ผลงาน การันตีคุณภาพ</h2>
      <div class="flex justify-center">
        <img src="/polo/preview-768x546.png" alt="ผลงาน" class="max-w-full h-auto" />
      </div>
    </div>

    <!-- ปุ่มขอผ้าตัวอย่าง -->
     
  <div class="flex justify-center relative">
    <a :href="props.actionLink" target="_blank" rel="noopener">
      <UButton
        size="xl"
        color="primary"
        variant="solid"
        icon="i-lucide-send"
        class="relative"
      >
        ส่งตัวอย่างผ้าฟรีเมื่อสั่ง 100 ตัวขึ้นไป
 
        <!-- จุด ping animation -->
        <span
          class="absolute top-0 right-0 -mt-1 -mr-1 flex size-3 rounded-full bg-primary-200 animate-ping"
        ></span>
 
      </UButton>
    </a>
  </div>
  </section>
</template>
