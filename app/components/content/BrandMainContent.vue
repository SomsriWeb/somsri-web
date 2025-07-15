<script setup lang="ts">
import ProseH2 from './ProseH2.vue';

</script>

<template>
  <div class="flex justify-center text-3xl pb-5 text-center font-bold text-primary">
    <ProseH2><slot mdc-unwrap="p" name="title-h2" /></ProseH2>
  </div>
</template>