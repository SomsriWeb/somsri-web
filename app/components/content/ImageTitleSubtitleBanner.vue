<script setup lang="ts">
// SLOTS
interface Slots {
    /**
     * ภาพพื้นหลังของ section
     */
    image(): unknown;

    /**
     * หัวข้อหลัก
     */
    title(): unknown;

    /**
     * ข้อความรองใต้หัวข้อ
     */
    subtitle(): unknown;
}
defineSlots<Slots>();
</script>

<template>
  <section class="relative isolate grid min-h-56 md:min-h-72">
    <!-- พื้นหลัง: ยืดตามความสูงของ section เสมอ -->
    <div class="relative col-start-1 row-start-1 min-h-full w-full overflow-hidden">
      <div class="absolute inset-0 [&_img]:h-full [&_img]:w-full [&_img]:object-cover [&_img]:object-center">
        <slot name="image" mdc-unwrap="p" />
      </div>
      <div class="absolute inset-0 bg-linear-to-r from-white/65 via-white/45 to-white/60" />
    </div>

    <!-- ข้อความ: กำหนดความสูงขั้นต่ำของ section เมื่อเนื้อหายาวกว่ารูป -->
    <div
      class="relative z-10 col-start-1 row-start-1 flex items-center justify-center px-5 py-10 text-center sm:px-6 md:py-14"
    >
      <div class="w-full max-w-3xl space-y-3 md:max-w-4xl md:space-y-5">
        <div
          class="text-primary text-2xl font-bold leading-tight sm:text-3xl md:text-4xl xl:text-5xl [&_h1]:text-inherit [&_h2]:text-inherit [&_p]:text-inherit"
        >
          <slot name="title" mdc-unwrap="h1 h2 h3 h4 h5 h6 p" />
        </div>

        <div
          class="mx-auto max-w-3xl text-sm leading-snug text-stone-700 sm:text-base md:max-w-4xl md:text-xl md:leading-relaxed [&_p]:text-inherit"
        >
          <slot name="subtitle" mdc-unwrap="p" />
        </div>
      </div>
    </div>
  </section>
</template>
