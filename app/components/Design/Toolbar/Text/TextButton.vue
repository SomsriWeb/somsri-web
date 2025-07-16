<script lang="ts" setup>
	import type { TextPayload } from "~/types/design"
	import type { Properties } from "csstype"

	// PROPS
	interface Props {
		textPayload: TextPayload
	}
	const props = defineProps<Props>()
	const { textPayload } = toRefs(props)

	// VARIABLE
	const buttonStyle: Properties = {
		fontSize: `${textPayload.value.fontSize}px`,
		fontWeight: textPayload.value.fontWeight,
	}
</script>
<template>
	<UButton type="button" color="neutral" variant="outline" :style="buttonStyle">{{
		textPayload.text
	}}</UButton>
</template>
