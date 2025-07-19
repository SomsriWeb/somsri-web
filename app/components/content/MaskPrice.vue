<script setup lang="ts">
import ProseH2 from "./ProseH2.vue";

const props = defineProps<{
  actionLink: string;
}>();
</script>

<template>
  <section class="flex flex-col items-center px-4 py-6 gap-6">
    <div class="w-full max-w-[700px]">
      <img
        src="/mask/price.png"
        alt="เรทราคาผ้าปิดจมูก"
        class="w-full rounded-xl shadow-lg object-contain"
      />
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-[700px]">
      <div class="w-full">
        <img
          src="/mask/price_screen.jpg"
          alt="ราคาผ้าปิดจมูก ปลีก"
          class="w-full rounded-xl shadow-md object-contain"
        />
      </div>
      <div class="w-full">
        <img
          src="/mask/price_single.jpg"
          alt="ราคาพิมพ์ผ้าปิดจมูก"
          class="w-full rounded-xl shadow-md object-contain"
        />
      </div>
    </div>
    <ProseH2
      class="sm:text-xl text-center font-bold p-4 sm:p-5 mb-6 sm:mb-10 py-10"
    >
      <slot name="mask" mdc-unwrap="p" />
    </ProseH2>
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
        สั้งทำหน้ากากผ้า
      </UButton>
    </a>
  </section>
</template>
