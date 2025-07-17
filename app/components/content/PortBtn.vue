<script setup lang="ts">
interface Props {
  to: string;
}
const { to } = defineProps<Props>();
</script>

<template>
  <!-- ปุ่มขอผ้าตัวอย่าง -->
  <div class="flex justify-center relative pt-5">
    <NuxtLink :to="to" class="block">
      <UButton
        size="xl"
        color="primary"
        variant="solid"
        icon="i-lucide-send"
        class="relative"
      >
        เรทราคาเสื้อ
        <!-- จุด ping animation -->
        <span
          class="absolute top-0 right-0 -mt-1 -mr-1 flex size-3 rounded-full bg-primary-200 animate-ping"
        ></span>
      </UButton>
    </NuxtLink>
  </div>
</template>
