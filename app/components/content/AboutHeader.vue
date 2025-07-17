<script lang="ts" setup>
import ProseH1 from './ProseH1.vue';
import ProseH2 from './ProseH2.vue';
import ProseP from './ProseP.vue';


</script>
<template>
  <div class="px-4 sm:px-8 lg:px-36">
    <ProseH1
      class="text-center text-3xl font-bold bg-primary text-white py-3 rounded-2xl"
    >
      <slot mdc-unwrap="p" name="header" />
    </ProseH1>

    <div class="flex justify-center pt-5">
        <slot mdc-unwrap="p" name="image-banner" />
    </div>

    <div class="font-light text-lg pt-5 text-stone-500">
      <ProseP>
        <slot mdc-unwrap="p" name="description-text" />
      </ProseP>
    </div>
    <div
      class="flex justify-center text-stone-500 font-light text-left max-w-4xl w-full px-4"
    >
      <slot mdc-unwrap="p" name="description-list" />
    </div>

    <div>
      <ProseH2 class="text-center text-3xl font-bold text-primary">
        <slot mdc-unwrap="p" name="slogan-text" />
      </ProseH2>
      <ProseP class="text-center text-lg font-bold text-primary">
        <slot mdc-unwrap="p" name="description-slogan" />
      </ProseP>
    </div>

    <div>
      <ProseP class="text-start text-lg font-bold text-primary">
        <slot mdc-unwrap="p" name="strategy-text" />
      </ProseP>
      <div
        class="flex justify-start font-light text-stone-500 max-w-4xl w-full px-4"
      >
        <slot mdc-unwrap="p" name="strategy-list" />
      </div>
    </div>
  </div>
</template>
