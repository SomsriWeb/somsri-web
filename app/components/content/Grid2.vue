<script setup lang="ts">
	// PROPS
	interface Props {
		col1Class?: string
		col2Class?: string
	}
	const props = defineProps<Props>()

	// STOTS
	interface Slots {
    /**
     * ใช้สำหรับใส่เนื้อหาคอลัมน์แรก (ฝั่งซ้ายเมื่อเป็นหน้าจอ desktop)
     */
    Col1(): unknown;

    /**
     * ใช้สำหรับใส่เนื้อหาคอลัมน์ที่สอง (ฝั่งขวาเมื่อเป็นหน้าจอ desktop)
     */
    Col2(): unknown;

}
defineSlots<Slots>();
</script>

<template>
	<div class="grid grid-cols-1 md:grid-cols-2 gap-5">
		<div :class="props.col1Class" class="space-y-3">
			<slot name="Col1" />
		</div>
		<div :class="props.col2Class" class="space-y-3">
			<slot name="Col2" />
		</div>
	</div>
</template>
