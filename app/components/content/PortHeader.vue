<script setup lang="ts">
import ProseH1 from './ProseH1.vue';
import ProseH2 from './ProseH2.vue';
import ProseP from './ProseP.vue';

</script>

<template>
  <div>
    <ProseH2 class="text-stert container text-5xl font-bold text-primary mb-3 pt-5">
      <slot mdc-unwrap="p" name="othertitle" />
    </ProseH2>

    <ProseP class="text-start text-lg font-light md:5">
      <slot mdc-unwrap="p" name="otherdescribetion" />
    </ProseP>
  </div>

  <div>
    <ProseH1 class="text-center text-5xl font-bold text-primary mb-3">
      <slot mdc-unwrap="p" name="title" />
    </ProseH1>
  </div>

  <div>
    <ProseP class="text-start text-stone-500 text-lg font-light md:5">
      <slot mdc-unwrap="p" name="describetion" />
    </ProseP>
  </div>

  <div>
    <ProseH2 class="text-start text-5xl font-bold text-primary mb-3">
      <slot mdc-unwrap="p" name="subtitle" />
    </ProseH2>
  </div>
</template>
