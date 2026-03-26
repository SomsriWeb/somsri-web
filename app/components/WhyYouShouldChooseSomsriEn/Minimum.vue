<script setup lang="ts">
// MODEL
const open = defineModel<boolean>("open");

// FUNCTION
function closeModal() {
  open.value = false;
}
</script>
<template>
  <UModal
    :class="{ hidden: !open }"
    class="max-w-3xl"
    :modal="open"
    :overlay="open"
    open
    @update:open="(value) => (open = value)"
  >
    <template #content>
      <div class="m-7 space-y-3">
        <UButton
          icon="lucide:x"
          class="absolute top-4 right-4 rounded-full !min-w-fit"
          @click="closeModal"
        />
        <p class="text-3xl text-stone-800 font-light">
          Small order? No problem because
        </p>
        <p class="text-[4rem] font-bold leading-16 text-stone-800">
          Minimum order of just 150 pieces.
        </p>
        <p class="text-stone-800 text-xl font-light">
          Even with a minimum order of just 150 pieces<sup>(1)</sup> SomsriShirt
          pays attention to every step of the design process to ensure results
          that truly satisfy our clients. Quality is guaranteed backed by
          countless customer reviews. With premium fabrics, sharp colors,
          durable prints, and long-lasting wear, every shirt is made to
          impress.
        </p>
        <!-- <ol class="list-decimal list-inside text-stone-500 text-sm font-light">
          <li>Except polo shirts minimum order only 50 pieces.</li>
        </ol> -->

        <NuxtLink
          to="/portfolio"
          class="text-primary hover:underline transition-all flex items-center gap-1"
        >
          View More Portfolio <UIcon name="lucide:chevron-right" />
        </NuxtLink>
      </div>
    </template>
  </UModal>
</template>
