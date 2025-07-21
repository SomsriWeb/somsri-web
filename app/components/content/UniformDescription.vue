<script setup lang="ts">
const props = defineProps<{
  actionLink: string;
}>();
</script>

<template>
  <div class="flex flex-col items-center w-full m-0 p-4 space-y-6">
   
    <!-- หัวเรื่อง -->
    <ProseH1 class="text-center">
      <slot name="title" mdc-unwrap="p" />
    </ProseH1>

    <!-- คำอธิบาย -->
    <ProseH2 class="text-center text-lg">
      <slot name="description" mdc-unwrap="p" />
    </ProseH2>

    <img
      src="/polo/step-1024x543.png"
      alt="uniform"
      class="w-full max-w-md h-auto object-contain"
    />

    <!-- ปุ่มสั่งทำเสื้อ -->
    <div>
      <a :href="props.actionLink" target="_blank" rel="noopener">
        <UButton size="xl" color="primary" variant="solid" icon="i-lucide-send">
          สั่งทำเสื้อ
        </UButton>
      </a>
    </div>
  </div>
</template>
