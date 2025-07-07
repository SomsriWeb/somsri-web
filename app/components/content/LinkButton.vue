<script setup lang="ts">
	// PROPS
	interface Props {
		to: string
	}
	const { to } = defineProps<Props>()
</script>
<template>
	<NuxtLink :to="to">
		<UButton>
			<slot mdc-unwrap="p" />
		</UButton>
	</NuxtLink>
</template>
