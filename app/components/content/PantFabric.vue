<script setup lang="ts"></script>

<template>
  <!-- หัวข้อหลัก -->
  <div class="pt-5 text-center px-4">
    <h1 class="text-white text-3xl sm:text-4xl md:text-[4rem] leading-none font-bold p-4 bg-primary rounded-2xl">
      เนื้อผ้าแนะนำ
    </h1>
  </div>

  <!-- รายการผ้า Fasbix -->
  <div class="flex flex-col md:flex-row items-center gap-8 max-w-6xl mx-auto py-8 px-4">
    <!-- เนื้อหา -->
    <div class="w-full md:w-1/2 text-start">
      <h2 class="text-primary text-2xl sm:text-3xl md:text-4xl font-bold mb-4">ผ้า Fasbix</h2>
      <p class="text-base md:text-lg">
        <slot name="fabric" />
      </p>
      <ul class="space-y-3 text-gray-800 mt-4">
        <li class="flex items-center gap-2">
          <Icon name="lucide:check-circle" class="text-primary w-5 h-5" />
          ผ้าอยู่ทรง ดูเรียบร้อย
        </li>
        <li class="flex items-center gap-2">
          <Icon name="lucide:check-circle" class="text-primary w-5 h-5" />
          ระบายอากาศได้ดี
        </li>
        <li class="flex items-center gap-2">
          <Icon name="lucide:check-circle" class="text-primary w-5 h-5" />
          เนื้อผ้ายอดนิยม
        </li>
      </ul>
    </div>

    <!-- ภาพ -->
    <div class="flex-shrink-0 w-full md:w-1/2">
      <img
        src="/pants/image1.png"
        alt="ผ้า Fasbix"
        class="rounded-[2rem] w-full object-cover max-h-[400px]"
      />
    </div>
  </div>

  <!-- รายการผ้า French Terry -->
  <div class="flex flex-col md:flex-row items-center gap-8 max-w-6xl mx-auto py-8 px-4">
    <!-- รูปภาพ -->
    <div class="flex-shrink-0 w-full md:w-1/2">
      <img
        src="/pants/image2.png"
        alt="ผ้า French Terry"
        class="rounded-[2rem] w-full object-cover max-h-[400px]"
      />
    </div>

    <!-- เนื้อหา -->
    <div class="w-full md:w-1/2 text-start">
      <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-4">
        ผ้า French Terry
      </h2>
      <p class="mb-4 text-base md:text-lg">
        <slot name="fabric-2" />
      </p>
      <ul class="space-y-3 text-gray-800">
        <li class="flex items-center gap-2">
          <Icon name="lucide:check-circle" class="text-primary w-5 h-5" />
          ผ้ายืดหยุ่น
        </li>
        <li class="flex items-center gap-2">
          <Icon name="lucide:check-circle" class="text-primary w-5 h-5" />
          เบาสบาย
        </li>
      </ul>
    </div>
  </div>
</template>
