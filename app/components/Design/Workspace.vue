<script lang="ts" setup>
	import type { Canvas } from "fabric"
	import type { StyleValue } from "vue"
	import type { DesignData } from "~/types/design"

	// TYPE
	interface CanvasList {
		id: string
		isDisplay: boolean
	}

	// PROPS
	interface Props {
		design: DesignData
	}
	const props = defineProps<Props>()
	const { design } = toRefs(props)

	// EMIT
	type Emit = {
		changeSide: []
	}
	const emit = defineEmits<Emit>()

	// VARIABLE
	const imgEl = ref<HTMLImageElement>()
	const canvasWidth = ref<number>(500)
	const canvasHeight = ref<number>(500)

	// COMPUTED
	const img = computed<string>(
		() =>
			`/image/mockup/${design.value.type}/${design.value.style}/${design.value.fabric}/${design.value.activeSide}/${design.value.color}.png`
	)
	const canvasLists = computed<CanvasList[]>(() =>
		design.value.sideSeq.map((side) => ({
			id: side.id,
			isDisplay: side.name === design.value.activeSide,
		}))
	)
	const canvasSizeStyle = computed<StyleValue>(() => ({
		width: `${canvasWidth.value}px`,
		height: `${canvasHeight.value}px`,
	}))
	const activeCanvas = computed<Canvas>(() => design.value.activeCanvas as Canvas)

	// FUNCTION
	function turnLeft() {
		const nextSideIndex = design.value.activeSideIndex - 1
		const lastSideIndex = design.value.sideSeq.length - 1

		// ASSIGN SIDE INDEX
		design.value.activeSideIndex = nextSideIndex >= 0 ? nextSideIndex : lastSideIndex

		assignSideData()
		emit("changeSide")
	}

	function assignSideData() {
		// ASSIGN ACTIVE SIDE CANVAS
		const sideIndex = design.value.activeSideIndex
		if (!design.value.activeCanvas) return
		if (!design.value.sideSeq[sideIndex]) return

		design.value.activeCanvas = design.value.canvas[sideIndex] as Canvas

		// ASSIGN SIDE NAME
		design.value.activeSide = design.value.sideSeq[sideIndex].name
	}

	function turnRight() {
		const nextSideIndex = design.value.activeSideIndex + 1
		const maxSideIndex = design.value.sideSeq.length - 1

		// ASSIGN SIDE INDEX
		design.value.activeSideIndex = nextSideIndex <= maxSideIndex ? nextSideIndex : 0

		assignSideData()
		emit("changeSide")
	}

	function resizeCanvas() {
		if (imgEl.value) {
			canvasWidth.value = imgEl.value.width
			canvasHeight.value = imgEl.value.height

			const scale = canvasWidth.value / activeCanvas.value.getWidth()
			const zoom = activeCanvas.value.getZoom() * scale

			// SET FABRIC JS CANVAS SIZE
			activeCanvas.value.setDimensions({
				width: canvasWidth.value,
				height: canvasHeight.value,
			})
			activeCanvas.value.setViewportTransform([zoom, 0, 0, zoom, 0, 0])
		}
	}
</script>

<template>
	<div class="flex items-center justify-center gap-3">
		<UButton
			class="top-[50%] left-0 !min-w-fit"
			type="button"
			icon="i-material-symbols-arrow-circle-left-outline-rounded"
			@click="turnLeft()"
		/>
		<div class="relative flex justify-center">
			<ProseImg
				ref="imgEl"
				:src="img"
				class="absolute max-w-96 max-h-[27rem]"
				alt="สมศรีมีเสื้อ"
				@load="resizeCanvas"
			/>
			<div
				v-for="canvasSide in canvasLists"
				id="canvas-container"
				:key="canvasSide.id"
				class="border-dashed border-[1px] border-neutral-700 rounded-sm z-[10]"
				:class="{ hidden: !canvasSide.isDisplay }"
				:style="canvasSizeStyle"
			>
				<canvas :id="canvasSide.id" />
			</div>
		</div>
		<UButton
			class="top-[50%] right-0 !min-w-fit"
			type="button"
			icon="i-material-symbols-arrow-circle-right-outline-rounded"
			@click="turnRight()"
		/>
	</div>
</template>
