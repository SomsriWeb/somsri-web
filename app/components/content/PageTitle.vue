<script setup lang="ts">
// SLOT
interface Slots {
    /**
     * ข้อความหัวข้อ เเสดงเป็น H1
     */
    default(): unknown;
}
defineSlots<Slots>();
</script>

<template>
	<h1 class="text-primary text-[2.5rem] sm:text-[4rem] leading-none font-bold text-center">
		<slot mdc-unwrap="h1 h2 h3 h4 h5 h6 p" />
	</h1>
</template>
