<script setup lang="ts">
	interface Props {
		actionLink: string
	}
	const props = defineProps<Props>()
</script>

<template>
  <!-- ปุ่มขอผ้าตัวอย่าง -->
  <div class="flex justify-center">
    <a :href="props.actionLink" target="_blank" rel="noopener">
      <UButton size="xl" color="primary" variant="solid" icon="i-lucide-send">
        ส่งตัวอย่างผ้าฟรีเมื่อสั่ง 100 ตัวขึ้นไป
      </UButton>
    </a>
  </div>
</template>
