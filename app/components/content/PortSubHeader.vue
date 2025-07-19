<script setup>
import ProseP from './ProseP.vue';

</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 items-stretch">
    <!-- ฝั่งข้อความฝั่งซ้าย -->
    <div class="py-[3rem] flex flex-col justify-center px-4">
      <span class="text-start text-5xl font-bold text-primary mb-3">
        <div class="text-xl mb-1 text-primary">กลุ่มลูกค้า</div>
        <slot mdc-unwrap="p" name="subtitle" />
      </span>
      <ProseP class="text-start text-stone-500 text-lg font-light">
        <slot mdc-unwrap="p" name="describetion" />
      </ProseP>
    </div>

    <!-- ฝั่งรูปภาพขวา -->
    <div class="relative flex items-center justify-center p-6">
      <div
        class="w-[450px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] mx-auto rounded-2xl overflow-hidden"
      >
        <slot mdc-unwrap="p" name="image" />
      </div>
    </div>
  </div>
</template>

