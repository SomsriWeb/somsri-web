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
  </div>
</template>
