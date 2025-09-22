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
          want to make a shirt but haven't designed it yet because we have
        </p>
        <p class="text-[4rem] font-bold leading-16 text-stone-800">
          Shirt Design Service
        </p>
        <p class="text-stone-800 text-xl font-light">
          SomsriShirt offers unique and personalized shirt design services —
          from graphics and logos to text and more. Our team provides full
          consultation until you’re completely satisfied. You can design and
          produce shirts exactly the way you want, ensuring the perfect result
          every time.
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
