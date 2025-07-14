<script setup lang="ts">
const props = defineProps<{
  actionLink: string
}>()
</script>

<template>
  <div class="text-primary  m-0">
    <h1 class="flex justify-center items-center font-bold m-3 py-5 text-[2rem]">
      รับผลิตเสื้อโปโล
    </h1>
    <p class="text-center "><slot mdc-unwrap="p" name="description" /></p>
    <div class="flex justify-center items-center font-bold m-3 py-5">
      <a :href="props.actionLink" target="_blank" rel="noopener">
      <UButton size="xl" color="primary" variant="solid" icon="i-lucide-send">
        สั่งทำเสื้อ
      </UButton>
    </a>
    </div>
  </div>
  
</template>
