<script setup lang="ts"></script>

<template>
  <div
    class="flex flex-col md:flex-row items-center gap-8 max-w-6xl mx-auto py-8 px-4"
  >
    <div class="w-full md:w-1/2">
      <h1
        class="text-primary text-3xl sm:text-4xl md:text-[4rem] leading-none font-bold mb-4"
      >
        สมศรีการ์เมนท์
      </h1>
      <p>
        <slot name="description" mdc-unwrap="p" />
      </p>
    </div>

    <div class="w-full md:w-1/2">
      <img
        src="/pants/Pants_logo_resize.png"
        alt="โลโก้ สมศรี"
        class="rounded-[2rem] w-full object-contain max-h-[400px]"
      />
    </div>
  </div>
</template>
