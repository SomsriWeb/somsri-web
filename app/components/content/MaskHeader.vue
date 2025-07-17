<script setup lang="ts">
import { ProseH1 } from '#components';
import ProseH2 from './ProseH2.vue';

</script>
<template>
  <div >
    <img src="/mask/cover2.png" alt="">
    <ProseH1
      class=" sm:text-2xl md:text-4xl font-bold text-center p-4 sm:p-5 mb-6 sm:mb-10"
    >
      <slot name="title" mdc-unwrap="p" />
    </ProseH1>
    <ProseH2 class="sm:text-xl text-center font-bold p-4 sm:p-5 mb-6 sm:mb-10">
      <slot name="description"  mdc-unwrap="p" />
    </ProseH2>
  </div>
</template>
