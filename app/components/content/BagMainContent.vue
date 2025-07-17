<script setup lang="ts">
import ProseH1 from "./ProseH1.vue";
import ProseH2 from "./ProseH2.vue";
import ProseP from "./ProseP.vue";
</script>

<template>
      <div class="flex justify-center text-center">
    <ProseH1 class="text-4xl text-primary font-bold"
      ><slot mdc-unwrap="p" name="title-h1"
    /></ProseH1>
  </div>

  <div class="flex justify-center text-center">
    <ProseH2 class="text-3xl text-primary font-light"
      ><slot mdc-unwrap="p" name="title-h2"
    /></ProseH2>
  </div>

  <div class="flex justify-center text-lg ">
    <ProseP class="text-primary text-center"
      ><slot mdc-unwrap="p" name="title-p"
    /></ProseP>
  </div>

</template>

