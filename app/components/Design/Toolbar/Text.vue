<script lang="ts" setup>
	import type { DesignData, TextPayload } from "@/types/design"
	import * as Fabric from "fabric"

	import TextButton from "./Text/TextButton.vue"
	import deleteObjectBtn from "~/lib/design/deleteObjectBtn"

	// PROPS
	interface Props {
		design: DesignData
	}
	const props = defineProps<Props>()
	const { design } = toRefs(props)

	// MODEL
	const open = defineModel<boolean>("open", { required: true, default: false })

	// VARIABLE
	const textTemplates: TextPayload[] = [
		{
			id: useId(),
			text: "ตัวขนาดธรรมดา",
			fontWeight: 400,
			fill: "#000000",
			fontSize: 18,
		},
		{
			id: useId(),

			text: "ตัวขนาดกลาง",
			fontWeight: 500,
			fill: "#000000",
			fontSize: 20,
		},
		{
			id: useId(),
			text: "ตัวขนาดใหญ่",
			fontWeight: 700,
			fill: "#000000",
			fontSize: 24,
		},
	]

	// FUNCTION
	function closeTab() {
		open.value = false
	}

	function addTextToCanvas(textStyle: TextPayload) {
		const textObj = new Fabric.FabricText(textStyle.text, {
			fontWeight: textStyle.fontWeight,
			fontSize: textStyle.fontSize,
			fill: textStyle.fill,
			left: 50,
			top: 50,
			fontFamily: "IBM Plex Sans Thai",
		})

		textObj.controls.deleteControl = deleteObjectBtn(textObj)
		;(design.value.activeCanvas as Fabric.Canvas).add(textObj)
		closeTab()
	}
</script>

<template>
	<div
		class="w-screen h-[90vh] max-w-56 max-h-[22rem] bg-stone-100 rounded-lg p-3 shadow-lg space-y-3"
	>
		<div class="flex justify-between items-center gap-3 mb-3">
			<ProseH2>เพิ่มข้อความ</ProseH2>
			<UButton
				size="sm"
				type="button"
				icon="i-material-symbols-close-rounded"
				color="error"
				variant="ghost"
				class="!min-w-fit"
				@click="closeTab()"
			/>
		</div>

		<div class="flex flex-col gap-3">
			<TextButton
				v-for="textTemplate in textTemplates"
				:key="textTemplate.id"
				:text-payload="textTemplate"
				@click="addTextToCanvas(textTemplate)"
			/>
		</div>
	</div>
</template>
