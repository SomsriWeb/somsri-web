<script setup lang="ts">
import ProseH1 from './ProseH1.vue';
import ProseH2 from './ProseH2.vue';
import ProseP from './ProseP.vue';

</script>

<template>
    <!--รูปภาพ เนื้อหา-->
    <div class="flex justify-center pb-5">
      <slot mdc-unwrap="p" name="image" />
  </div>

  <!--ข้อความหัวข้อ-->
  <div class="text-center text-primary text-3xl font-bold pb-5 m-0">
    <ProseH1><slot name="title-text" mdc-unwrap="p" /></ProseH1>
    <ProseH2><slot name="sub-title-text" mdc-unwrap="p" /></ProseH2>
    <ProseP class="text-lg font-light">
      <slot mdc-unwrap="p" name="discription-text" />
    </ProseP>


  </div>
</template>
