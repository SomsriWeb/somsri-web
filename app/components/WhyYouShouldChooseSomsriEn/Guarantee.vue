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
          Easy ordering process with fast, efficient production.
        </p>
        <p class="text-[4rem] font-bold leading-16 text-stone-800">
          On time delivery with a 90 day product warranty.
        </p>
        <p class="text-stone-800 text-xl font-light">
          At SomsriShirt, we care about every step from design, production,
          screen printing, to embroidery. With our experienced professional team
          and in-house factory, we can handle all types of apparel orders.
          That’s why our clients trust us every piece is beautifully made, true
          to design, with vibrant, long-lasting prints that won’t fade, peel, or
          wash out easily delivering confidence every time you wear it.
        </p>

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
