<script lang="ts" setup>
	import type { Canvas, FabricObject, Path } from "fabric"
	import cloneDeep from "lodash/cloneDeep"
	import type { DesignData } from "~/types/design"
	import { ColorPicker } from "vue3-colorpicker"
	import "vue3-colorpicker/style.css"

	// PROPS
	interface Props {
		design: DesignData
		activeObject: FabricObject
	}
	const props = defineProps<Props>()
	const { activeObject, design } = toRefs(props)

	// VARIABLE
	const editableTextData = ref<Path>(cloneDeep(activeObject.value) as Path)

	// COMPUTED
	const activeCanvas = computed<Canvas>(() => design.value.activeCanvas)

	// FUNCTION
	function rerender() {
		activeCanvas.value.renderAll()
	}

	function setShapeColor() {
		activeObject.value.set("fill", editableTextData.value.fill)
		rerender()
	}

	function setShapeBgColor() {
		activeObject.value.set("backgroundColor", editableTextData.value.backgroundColor)
		rerender()
	}
</script>

<template>
	<div class="h-screen flex items-center max-w-96">
		<div class="w-full h-fit max-h-[30rem] bg-stone-100 rounded-lg p-3 shadow-lg space-y-3">
			<div class="flex justify-between items-center gap-3 mb-3">
				<ProseH2>ตั้งค่ารูปร่าง</ProseH2>
			</div>

			<div class="flex gap-1">
				<div>
					<label class="block">
						<p>สีรูปร่าง</p>
					</label>
					<ColorPicker
						v-model:pure-color="editableTextData.fill"
						format="hex8"
						@update:pure-color="() => setShapeColor()"
					/>
				</div>
				<div>
					<label class="block">
						<p>สีพื้นหลัง</p>
					</label>
					<ColorPicker
						v-model:pure-color="editableTextData.backgroundColor"
						format="hex8"
						@update:pure-color="() => setShapeBgColor()"
					/>
				</div>
			</div>
		</div>
	</div>
</template>
