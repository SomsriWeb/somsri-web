<script setup lang="ts">
	import ProseH1 from "./ProseH1.vue"
	import ProseH2 from "./ProseH2.vue"
	import ProseP from "./ProseP.vue"
</script>

<template>
	<div class="flex justify-center text-center mb-0">
		<ProseH1><slot mdc-unwrap="p" name="title-h1" /></ProseH1>
	</div>

	<div class="flex justify-center text-center">
		<ProseH2><slot mdc-unwrap="p" name="title-h2" /></ProseH2>
	</div>

	<div class="flex justify-center text-lg">
		<ProseP><slot mdc-unwrap="p" name="title-p" /></ProseP>
	</div>
</template>
