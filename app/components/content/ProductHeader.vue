<script setup lang="ts">
import ProseH1 from "./ProseH1.vue";
import ProseH2 from "./ProseH2.vue";
import ProseP from "./ProseP.vue";
</script>

<template>
  <div class="px-4 py-6 sm:px-8 md:px-16 lg:px-[4.6rem] lg:py-[3rem]">
    <ProseH1
      class=" text-primary text-2xl sm:text-3xl md:text-4xl font-bold text-center p-4 sm:p-5 mb-6 sm:mb-10"
    >
      <slot name="title" mdc-unwrap="p" />
    </ProseH1>

    <ProseP class="text-base sm:text-lg text-start">
      <slot name="description" mdc-unwrap="p" />
    </ProseP>

    <ProseH2
      class="text-lg sm:text-xl text-center font-bold p-4 sm:p-5 mb-6 sm:mb-10"
    >
      <slot name="productheader" mdc-unwrap="p" />
    </ProseH2>
  </div>
</template>
