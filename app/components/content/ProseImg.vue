<script setup lang="ts">
	import { withTrailingSlash, withLeadingSlash, joinURL } from "ufo"
	import { useRuntimeConfig, computed } from "#imports"
	import { NuxtImg } from "#components"

	// PROPS
	interface Props {
		src?: string
		alt?: string
		width?: string | number
		height?: string | number
		lazy?: boolean
	}
	const props = withDefaults(defineProps<Props>(), {
		src: "",
		alt: "",
		width: undefined,
		height: undefined,
		lazy: true,
	})

	const refinedSrc = computed(() => {
		if (props.src?.startsWith("/") && !props.src.startsWith("//")) {
			const _base = withLeadingSlash(withTrailingSlash(useRuntimeConfig().app.baseURL))
			if (_base !== "/" && !props.src.startsWith(_base)) {
				return joinURL(_base, props.src)
			}
		}
		return props.src
	})

	console.log(props.alt)
</script>

<template>
	<component
		:is="NuxtImg"
		class="w-full"
		:src="refinedSrc"
		:alt="props.alt"
		:width="props.width"
		:height="props.height"
		format="webp"
		placeholder
		:loading="props.lazy ? 'lazy' : 'eager'"
	/>
</template>
