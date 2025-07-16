<script lang="ts" setup>
	import * as Fabric from "fabric"
	import { CanvasSideId, Side, type DesignData } from "~/types/design"
	import { FabricKey, ProductTypeKey } from "~/lib/design/variable"
	import { CanvasSideId as SideCanvasId } from "~/types/design"
	import exportCanvas from "~/lib/design/exportCanvas"
	import { PoloComponent } from "~/lib/design/polo"
	import { getCanvasData } from "~/lib/design/productCanvasDetails"

	// VARIABLE
	const designPayload = ref<DesignData>({
		color: "ffffff",
		type: ProductTypeKey.TSHIRT,
		style: "tshirt",
		fabric: FabricKey.COTTONCOMB,
		canvas: [],
		activeCanvas: new Fabric.Canvas(),
		activeSide: Side.FRONT,
		activeSideIndex: 0,
		sideSeq: [
			{
				id: SideCanvasId.FRONT,
				name: Side.FRONT,
			},
			{
				id: SideCanvasId.RIGHT,
				name: Side.RIGHT,
			},
			{
				id: SideCanvasId.BACK,
				name: Side.BACK,
			},
			{
				id: SideCanvasId.LEFT,
				name: Side.LEFT,
			},
		],
		imageLists: [],
		components: {},
		useGrid: false,
		gridObjects: [],
	})
	const selectedObject = ref<Fabric.FabricObject[]>([])

	// COMPUTED
	const activeCanvas = computed<Fabric.Canvas>(
		() => designPayload.value.activeCanvas as unknown as Fabric.Canvas
	)
	const activeObject = computed<Fabric.FabricObject>(
		() => selectedObject.value[0] as unknown as Fabric.FabricObject
	)

	// FUNCTION
	function initCanvas() {
		designPayload.value = getCanvasData(designPayload.value.type)
		const canvasSettings = { width: 500, height: 500, enablePointerEvents: true }
		const frontCanvas = markRaw(
			new Fabric.Canvas(CanvasSideId.FRONT.toString(), canvasSettings)
		)

		if (designPayload.value.type === ProductTypeKey.POLO) {
			designPayload.value.components = {
				[PoloComponent.COLLAR]: "style1",
				[PoloComponent.PLACKET]: "style1",
				[PoloComponent.POCKET]: "style1",
				[PoloComponent.SLEEVE]: "style1",
			}
		} else {
			designPayload.value.components = {}
		}

		designPayload.value.activeCanvas = frontCanvas
		designPayload.value.canvas = [
			frontCanvas,
			markRaw(new Fabric.Canvas(CanvasSideId.RIGHT.toString(), canvasSettings)),
			markRaw(new Fabric.Canvas(CanvasSideId.BACK.toString(), canvasSettings)),
			markRaw(new Fabric.Canvas(CanvasSideId.LEFT.toString(), canvasSettings)),
		]

		// ADD EVENT
		for (const canvas of designPayload.value.canvas) {
			selectObjectListener(canvas as unknown as Fabric.Canvas)
			deselectObjectListener(canvas as unknown as Fabric.Canvas)
		}
		groupSelectedObjectsListener()
		// deleteWithBackspaceListener();
	}

	function groupSelectedObjectsListener() {
		document.addEventListener("keydown", (event) => {
			const isMac = /Mac|iPod|iPhone|iPad/.test(navigator.userAgent)
			const isModifierPressed = isMac ? event.metaKey : event.ctrlKey

			if (isModifierPressed && event.key === "g") {
				event.preventDefault()
				const activeObjects = activeCanvas.value.getActiveObjects() // ดึง Object ที่เลือกทั้งหมด

				if (activeObjects.length > 1) {
					// สร้าง Group
					const group = new Fabric.Group(activeObjects)

					// ลบ Object เดิม
					activeObjects.forEach((obj) => {
						activeCanvas.value.remove(obj)
					})

					// เพิ่ม Group ลงใน Canvas
					activeCanvas.value.add(group)

					// ตั้งให้ Group เป็น Active Object
					activeCanvas.value.setActiveObject(group)

					activeCanvas.value.renderAll() // อัปเดต Canvas
				}
			}
		})
	}

	function selectObjectListener(canvas: Fabric.Canvas) {
		canvas.on("selection:created", (e) => {
			selectedObject.value = e.selected
		})

		canvas.on("selection:updated", (e) => {
			selectedObject.value = e.selected
		})
	}

	function deselectObjectListener(canvas: Fabric.Canvas) {
		canvas.on("selection:cleared", () => {
			selectedObject.value = []
		})
	}

	function destroyCanvas() {
		selectedObject.value = []
		for (const canvas of designPayload.value.canvas) {
			;(canvas as Fabric.Canvas).dispose()
		}
	}

	function reinitCanvas() {
		destroyCanvas()
		initCanvas()
	}

	// ONMOUNTED
	onMounted(() => {
		initCanvas()
	})
</script>
<template>
	<div class="h-screen relative">
		<DesignToolbar
			:design="designPayload"
			class="absolute top-0 left-0 z-[1]"
			@init-canvas="reinitCanvas()"
		/>

		<div class="flex justify-center h-screen">
			<DesignWorkspace :design="designPayload" @change-side="() => (selectedObject = [])" />
		</div>

		<!-- OBJECT SETTINGS -->
		<template v-if="activeObject">
			<DesignSettingsText
				v-if="activeObject.type === 'text'"
				class="absolute top-0 right-3 z-[1]"
				:active-object="activeObject"
				:design="designPayload"
			/>
			<DesignSettingsShape
				v-else-if="activeObject.type === 'path'"
				class="absolute top-0 right-3 z-[1]"
				:active-object="activeObject"
				:design="designPayload"
			/>
		</template>

		<!-- FOOTER -->
		<DesignFooterToolbar
			class="absolute bottom-0"
			:design="designPayload"
			@export="exportCanvas(designPayload as DesignData)"
		/>
	</div>
</template>
