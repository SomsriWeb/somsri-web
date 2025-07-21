<script setup lang="ts">
	import ProseH2 from "./ProseH2.vue"
</script>

<template>
	<div>
		<ProseH2><slot mdc-unwrap="p" name="title-h2" /></ProseH2>
	</div>
</template>
