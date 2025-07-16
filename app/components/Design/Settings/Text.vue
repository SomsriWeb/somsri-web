<script lang="ts" setup>
	import type { Canvas, FabricObject, FabricText } from "fabric"
	import { ColorPicker } from "vue3-colorpicker"
	import "vue3-colorpicker/style.css"
	import type { DesignData } from "~/types/design"
	import cloneDeep from "lodash/cloneDeep"

	// TYPE
	type TextAlignStyle = "left" | "right" | "center"

	// PROPS
	interface Props {
		design: DesignData
		activeObject: FabricObject
	}
	const props = defineProps<Props>()
	const { activeObject, design } = toRefs(props)

	// VARIABLE
	const editableTextData = ref<FabricText>(cloneDeep(activeObject.value) as FabricText)
	const fonts = ref<string[]>([
		"Arial",
		"Helvetica",
		"Times New Roman",
		"Courier New",
		"Verdana",
		"Georgia",
		"Comic Sans MS",
		"Impact",
		"IBM Plex Sans Thai",
	])

	// COMPUTED
	const activeCanvas = computed<Canvas>(() => design.value.activeCanvas as Canvas)

	// FUNCTION
	function rerender() {
		activeCanvas.value.renderAll()
	}

	function setText() {
		activeObject.value.set("text", editableTextData.value.text)
		rerender()
	}

	function setFontFamily() {
		activeObject.value.set("fontFamily", editableTextData.value.fontFamily)
		rerender()
	}

	function setFontSize() {
		activeObject.value.set("fontSize", editableTextData.value.fontSize)
		rerender()
	}

	function setTextAlign(style: TextAlignStyle) {
		editableTextData.value.textAlign = style
		activeObject.value.set("textAlign", style)
		rerender()
	}

	function setTextColor() {
		activeObject.value.set("fill", editableTextData.value.fill)
		rerender()
	}

	function setTextBgColor() {
		activeObject.value.set("backgroundColor", editableTextData.value.backgroundColor)
		rerender()
	}

	function toggleBold() {
		if (editableTextData.value.fontWeight === 400) {
			editableTextData.value.fontWeight = 700
		} else {
			editableTextData.value.fontWeight = 400
		}

		activeObject.value.set("fontWeight", editableTextData.value.fontWeight)
		rerender()
	}

	function toggleUnderline() {
		editableTextData.value.underline = !editableTextData.value.underline

		activeObject.value.set("underline", editableTextData.value.underline)
		rerender()
	}

	function toggleItalic() {
		if (editableTextData.value.fontStyle === "normal") {
			editableTextData.value.fontStyle = "italic"
		} else {
			editableTextData.value.fontStyle = "normal"
		}

		activeObject.value.set("fontStyle", editableTextData.value.fontStyle)
		rerender()
	}
</script>

<template>
	<div class="h-screen flex items-center max-w-96">
		<div class="w-full h-fit max-h-[30rem] bg-stone-100 rounded-lg p-3 shadow-lg space-y-3">
			<div class="flex justify-between items-center gap-3 mb-3">
				<ProseH2>ตั้งค่าตัวอักษร</ProseH2>
			</div>

			<div>
				<label for="input-text">
					<p>ข้อความ</p>
				</label>
				<UTextarea
					id="input-text"
					v-model="editableTextData.text"
					class="w-full"
					@input="setText()"
				/>
			</div>

			<div class="grid grid-cols-12 gap-3">
				<div class="col-span-9">
					<label for="select-font">
						<p>ฟอนต์</p>
					</label>
					<USelectMenu
						id="select-font"
						v-model="editableTextData.fontFamily"
						class="w-full"
						:items="fonts"
						@change="() => setFontFamily()"
					/>
				</div>
				<div class="col-span-3">
					<label for="font-size">
						<p>ขนาดตัวอักษร</p>
					</label>
					<UInput
						id="font-size"
						v-model="editableTextData.fontSize"
						type="number"
						@change="() => setFontSize()"
					/>
				</div>
			</div>

			<div class="flex gap-1">
				<div>
					<label class="block">
						<p>สีตัวอักษร</p>
					</label>
					<ColorPicker
						v-model:pure-color="editableTextData.fill"
						format="hex8"
						@update:pure-color="() => setTextColor()"
					/>
				</div>

				<div>
					<label class="block">
						<p>สีพื้นหลัง</p>
					</label>
					<ColorPicker
						v-model:pure-color="editableTextData.backgroundColor"
						format="hex8"
						@update:pure-color="() => setTextBgColor()"
					/>
				</div>
			</div>

			<div class="grid grid-cols-12 gap-3">
				<div class="col-span-6">
					<label>
						<p>รูปแบบตัวอักษร</p>
					</label>
					<div class="flex gap-1">
						<UTooltip text="ตัวหนา">
							<UButton
								class="!min-w-fit"
								type="button"
								icon="i-material-symbols-format-bold-rounded"
								:color="editableTextData.fontWeight === 700 ? 'primary' : 'neutral'"
								:variant="editableTextData.fontWeight === 700 ? 'soft' : 'solid'"
								@click="toggleBold()"
							/>
						</UTooltip>
						<UTooltip text="ตัวเอียง">
							<UButton
								class="!min-w-fit"
								type="button"
								icon="i-material-symbols-format-italic-rounded"
								:color="
									editableTextData.fontStyle === 'italic' ? 'primary' : 'neutral'
								"
								:variant="
									editableTextData.fontStyle === 'italic' ? 'soft' : 'solid'
								"
								@click="toggleItalic()"
							/>
						</UTooltip>
						<UTooltip text="ขีดเส้นใต้">
							<UButton
								class="!min-w-fit"
								type="button"
								icon="i-material-symbols-format-underlined-rounded"
								:color="editableTextData.underline ? 'primary' : 'neutral'"
								:variant="editableTextData.underline ? 'soft' : 'solid'"
								@click="toggleUnderline()"
							/>
						</UTooltip>
					</div>
				</div>

				<div class="col-span-6">
					<label>
						<p>การจัดตำแหน่ง</p>
					</label>
					<div class="flex gap-1">
						<UTooltip text="ชิดซ้าย">
							<UButton
								class="!min-w-fit"
								type="button"
								icon="i-material-symbols-format-align-left-rounded"
								:color="
									editableTextData.textAlign === 'left' ? 'primary' : 'neutral'
								"
								:variant="editableTextData.textAlign === 'left' ? 'soft' : 'solid'"
								@click="setTextAlign('left')"
							/>
						</UTooltip>
						<UTooltip text="ตรงกลาง">
							<UButton
								class="!min-w-fit"
								type="button"
								icon="i-material-symbols-format-align-center-rounded"
								:color="
									editableTextData.textAlign === 'center' ? 'primary' : 'neutral'
								"
								:variant="
									editableTextData.textAlign === 'center' ? 'soft' : 'solid'
								"
								@click="setTextAlign('center')"
							/>
						</UTooltip>
						<UTooltip text="ชิดขวา">
							<UButton
								class="!min-w-fit"
								type="button"
								icon="i-material-symbols-format-align-right-rounded"
								:color="
									editableTextData.textAlign === 'right' ? 'primary' : 'neutral'
								"
								:variant="editableTextData.textAlign === 'right' ? 'soft' : 'solid'"
								@click="setTextAlign('right')"
							/>
						</UTooltip>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
