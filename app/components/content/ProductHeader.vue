<script setup lang="ts">
	import ProseH1 from "./ProseH1.vue"
	import ProseH2 from "./ProseH2.vue"
	import ProseP from "./ProseP.vue"
</script>

<template>
	<div>
		<ProseH1 class="text-primary text-3xl sm:text-3xl md:text-4xl font-bold text-center">
			<slot name="title" mdc-unwrap="p" />
		</ProseH1>

		<ProseP class="text-base sm:text-lg text-start mb-5">
			<slot name="description" />
		</ProseP>

		<ProseH2 class="text-lg sm:text-xl text-center font-bold">
			<slot name="productheader" mdc-unwrap="p" />
		</ProseH2>
	</div>
</template>
