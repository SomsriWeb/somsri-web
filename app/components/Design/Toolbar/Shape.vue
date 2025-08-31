<script lang="ts" setup>
	import * as Fabric from "fabric"
	import deleteObjectBtn from "~/lib/design/deleteObjectBtn"
	import shapeList, { type Shape } from "~/lib/design/shape"
	import type { DesignData } from "~/types/design"
	// PROPS
	interface Props {
		design: DesignData
	}
	const props = defineProps<Props>()
	const { design } = toRefs(props)

	// MODEL
	const open = defineModel<boolean>("open", { required: true, default: false })

	// COMPUTED
	const activeCanvas = computed<Fabric.Canvas>(() => design.value.activeCanvas as Fabric.Canvas)

	// FUNCTION
	function addShape(shape: Shape) {
		const pathPayload = new Fabric.Path(shape.path, { fill: "black", stroke: "black" })
		pathPayload.controls.deleteControl = deleteObjectBtn(pathPayload)
		activeCanvas.value.add(pathPayload)
	}
</script>

<template>
	<div
		class="w-screen h-[90vh] max-w-56 max-h-[22rem] bg-stone-100 rounded-lg p-3 shadow-lg space-y-3"
	>
		<div class="flex justify-between items-center gap-3 mb-3">
			<ProseH2>เพิ่มรูปร่าง</ProseH2>
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

		<div class="grid grid-cols-3 gap-3 overflow-auto max-h-[26rem]">
			<div
				v-for="shape in shapeList"
				:key="shape.name"
				class="p-2 w-full rounded-xl aspect-square bg-white cursor-pointer hover:shadow-lg transition"
				@click="addShape(shape)"
			>
				<img :src="shape.imgUrl" class="w-full h-full" :alt="shape.name" />
				<!-- <svg class="d-flex align-items-center justify-content-center ">
                    <g>
                        <path v-for="vals in shape.shape" :d="vals" fill="#000000" data-original="#000000">
                        </path>
                    </g>
                </svg> -->
			</div>
		</div>
	</div>
</template>
