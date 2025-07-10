<script setup lang="ts">
const props = defineProps<{
  actionLink: string
}>()
</script>

<template>
  <div class="flex justify-center items-center m-0">
    <img src="/polo/cover-1.png" alt="" />
  </div>
  <div class="text-white bg-primary m-0">
    <h1 class="flex justify-center items-center font-bold m-3 py-5 text-[2rem]">
      รับผลิตเสื้อโปโล
    </h1>
    <p class="text-center px-30"><slot mdc-unwrap="p" name="description" /></p>
    <div class="flex justify-center items-center font-bold m-3 py-5">
      <a :href="props.actionLink" target="_blank" rel="noopener">
      <UButton size="xl" color="warning" variant="solid" icon="i-lucide-send">
        สั่งทำเสื้อ
      </UButton>
    </a>
    </div>
  </div>
  
</template>
