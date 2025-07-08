<script setup lang="ts">
const props = defineProps<{
  actionLink: string
}>()
</script>

<template>
  <section class="bg-primary py-12 flex justify-center">
    <div class="grid grid-cols-2 gap-4 text-primary">
      <nuxt-link to="/step-order">
        <UButton size="xl" color="neutral" variant="soft" icon="i-lucide-list-checks" class="text-primary "> ขั้นตอนการสั่งซื้อ </UButton>
      </nuxt-link>

      <nuxt-link to="/step-product">
        <UButton size="xl" color="neutral" variant="soft" icon="i-lucide-cog"> ขั้นตอนการผลิต </UButton>
      </nuxt-link>

      <a :href="props.actionLink" target="_blank" rel="noopener">
        <UButton size="xl" color="neutral" variant="soft" icon="i-lucide-send"> ส่งแบบ </UButton>
      </a>

      <nuxt-link to="/protfolio">
        <UButton  size="md" color="neutral"  variant="solid" icon="i-lucide-image"  > ผลงานทีมกราฟฟิก </UButton>
      </nuxt-link>
    </div>
  </section>
</template>
