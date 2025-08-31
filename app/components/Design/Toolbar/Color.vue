<script setup lang="ts">
	import colorCode from "~/lib/design/fabricColors"
	import type { DesignData } from "@/types/design"
	import ColorButton from "./Color/ColorButton.vue"

	// PROPS
	interface Props {
		design: DesignData
	}
	const props = defineProps<Props>()
	const { design } = toRefs(props)

	// MODEL
	const open = defineModel<boolean>("open", { required: true, default: false })

	// COMPUTED
	const colorOptions = computed<string[]>(
		() => colorCode[design.value.type][design.value.fabric] || []
	)

	// FUNCTION
	function setColor(color: string) {
		design.value.color = color
	}
</script>

<template>
	<div
		class="w-screen h-[90vh] max-w-56 max-h-[22rem] bg-stone-100 rounded-lg p-3 shadow-lg space-y-3"
	>
		<div class="flex justify-between items-center gap-3 mb-3">
			<ProseH2>ตั้งค่าสีผ้า</ProseH2>
			<UButton
				size="sm"
				type="button"
				icon="i-material-symbols-close-rounded"
				color="error"
				variant="ghost"
				class="!min-w-fit"
				@click="open = false"
			/>
		</div>

		<div class="grid grid-cols-6 gap-3 overflow-auto max-h-[26rem]">
			<ColorButton
				v-for="color in colorOptions"
				:key="color"
				:color="color"
				@click="setColor(color)"
			/>
		</div>
	</div>
</template>
