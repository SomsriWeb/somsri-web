<script setup lang="ts">
	import ProseH2 from "./ProseH2.vue"

interface Slots {
    /**
     * หัวข้อรอง ข้อความที่แสดงจะเป็น H2
     */
    titleH2(): unknown;
}
defineSlots<Slots>();

</script>

<template>
	<div>
		<ProseH2><slot mdc-unwrap="p" name="titleH2" /></ProseH2>
	</div>
</template>
