<script setup lang="ts">
	// PROPS
	interface Props {
		to: string
	}
	const { to } = defineProps<Props>()
</script>
<template>
	<NuxtLink :to="to" class="block">
		<UButton>
			<slot mdc-unwrap="p" />
		</UButton>
	</NuxtLink>
</template>
