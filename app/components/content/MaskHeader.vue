<script setup lang="ts">
	import { ProseH1 } from "#components"
	import ProseH2 from "./ProseH2.vue"
</script>
<template>
	<div>
		<ProseImg src="/mask/cover2.png" alt="" />
		<ProseH1 class="text-center">
			<slot name="title" mdc-unwrap="p" />
		</ProseH1>
		<ProseH2 size="sm" class="text-center">
			<slot name="description" mdc-unwrap="p" />
		</ProseH2>
	</div>
</template>
