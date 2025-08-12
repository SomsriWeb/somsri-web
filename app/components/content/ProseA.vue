<script setup lang="ts">
	// PROPS
	interface Props {
		href: string
		target: "_blank" | "_parent" | "_self" | "_top" | (string & object) | null | undefined
	}
	const props = defineProps<Props>()
</script>
<template>
	<NuxtLink :href="props.href" :target="props.target" class="underline text-primary-500">
		<slot />
	</NuxtLink>
</template>
