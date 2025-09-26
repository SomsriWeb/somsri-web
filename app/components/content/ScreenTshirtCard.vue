<script setup lang="ts">

interface Slots {

	/**
     * ข้อความรายละเอียด เเสดงเป็น P
     */
	content(): unknown;

}
defineSlots<Slots>();
</script>


<template>
	<p class="rounded-xl bg-primary h-fit p-3 text-white">
		<slot name="content" mdc-unwrap="p" />
	</p>
</template>
