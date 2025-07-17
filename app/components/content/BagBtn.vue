<script setup lang="ts">
const props = defineProps<{
  actionLink: string
}>()
</script>
 
<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-md mx-auto p-8 m-0 w-full px-5">
    <!-- ปุ่มออกแบบ -->
    <div class="flex justify-center">
      <nuxt-link to="/design" class="w-full max-w-[200px]">
        <UButton
          icon="material-symbols:shopping-basket-sharp"
          class="w-full bg-primary text-white text-sm px-4 py-2"
          size="md"
        >
          ออกแบบกระเป๋าผ้า
        </UButton>
      </nuxt-link>
    </div>

    <!-- ปุ่มติดต่อ -->
    <div class="flex justify-center">
      <a :href="props.actionLink" target="_blank" rel="noopener" class="w-full max-w-[200px]">
        <UButton
          icon="i-lucide-send"
          class="w-full bg-primary text-white text-sm px-4 py-2"
          size="md"
        >
          ติดต่อสอบถาม
        </UButton>
      </a>
    </div>
  </div>
</template>


