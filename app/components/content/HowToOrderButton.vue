<script setup lang="ts">
const props = defineProps<{
  actionLink: string
}>()
</script>

<template>
  <section class="py-5 flex justify-center">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 px-6 sm:px-12 md:px-24 lg:px-36 py-10 bg-white rounded-2xl w-full max-w-2xl">
      
      <!-- ปุ่ม 1 -->
      <nuxt-link to="/step-order" class="flex justify-center">
        <UButton
          size="xl"
          color="primary"
          variant="solid"
          icon="i-lucide-list-checks"
          class="w-full max-w-xs"
        >
          ขั้นตอนการสั่งซื้อ
        </UButton>
      </nuxt-link>

      <!-- ปุ่ม 2 -->
      <nuxt-link to="/step-product" class="flex justify-center">
        <UButton
          size="xl"
          color="primary"
          variant="solid"
          icon="i-lucide-cog"
          class="w-full max-w-xs"
        >
          ขั้นตอนการผลิต
        </UButton>
      </nuxt-link>

      <!-- ปุ่ม 3 -->
      <a
        :href="props.actionLink"
        target="_blank"
        rel="noopener"
        class="flex justify-center"
      >
        <UButton
          size="xl"
          color="primary"
          variant="solid"
          icon="i-lucide-send"
          class="w-full max-w-xs"
        >
          ส่งแบบ
        </UButton>
      </a>

      <!-- ปุ่ม 4 -->
      <nuxt-link to="/portfolio" class="flex justify-center">
        <UButton
          size="xl"
          color="primary"
          variant="solid"
          icon="i-lucide-image"
          class="w-full max-w-xs"
        >
          ผลงานทีมกราฟฟิก
        </UButton>
      </nuxt-link>
    </div>
  </section>
</template>
