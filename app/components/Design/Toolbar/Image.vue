<script setup lang="ts">
	import { type Canvas, FabricImage } from "fabric"
	import deleteObjectBtn from "~/lib/design/deleteObjectBtn"
	import type { DesignData } from "~/types/design"

	// PROPS
	interface Props {
		design: DesignData
	}
	const props = defineProps<Props>()
	const { design } = toRefs(props)

	// MODEL
	const open = defineModel<boolean>("open", { required: true, default: false })

	// ELEMENT
	const fileInputEl = ref<HTMLInputElement>()

	// COMPUTED
	const activeCanvas = computed<Canvas>(() => design.value.activeCanvas as Canvas)

	// FUNCTION
	function openUploadModal() {
		if (fileInputEl.value) {
			fileInputEl.value.click()
		}
	}

	function getFile(e: Event) {
		const files = (e.target as HTMLInputElement).files || []
		for (let i = 0; i < files.length; i++) {
			const file = files[i]
			if (!file) continue

			const name = file.name.slice(0, file.name.lastIndexOf("."))

			const reader = new FileReader()

			reader.onload = (e) => {
				const fileUrl = (e.target?.result as string) || "" // ได้ Base64 ของไฟล์
				design.value.imageLists.push({
					id: useId(),
					name: name,
					file: file,
					url: fileUrl,
				})
			}

			reader.readAsDataURL(file)
		}
	}

	function closeTab() {
		open.value = false
	}

	function insertImageToCanvas(fileIndex: number) {
		if (!design.value.imageLists[fileIndex]) return

		const fileUrl = design.value.imageLists[fileIndex].url
		const imgEl = document.createElement("img")
		imgEl.src = fileUrl

		imgEl.onload = () => {
			const imgPayload = new FabricImage(imgEl)
			imgPayload.controls.deleteControl = deleteObjectBtn(imgPayload)
			activeCanvas.value.add(imgPayload)
			closeTab()
		}
	}
</script>
<template>
	<div
		class="w-screen h-screen max-w-96 max-h-[30rem] bg-stone-100 rounded-lg p-3 shadow-lg space-y-3"
	>
		<div class="flex justify-between items-center gap-3 mb-3">
			<ProseH2>เพิ่มรูปภาพ</ProseH2>
			<UButton
				type="button"
				icon="i-material-symbols-close-rounded"
				color="error"
				class="!min-w-fit"
				@click="open = false"
			/>
		</div>

		<UButton type="button" class="w-full justify-center" size="xl" @click="openUploadModal()"
			>อัปโหลดภาพ</UButton
		>
		<input
			id="upload-img-input"
			ref="fileInputEl"
			type="file"
			class="hidden"
			accept="image/*"
			multiple
			@change="getFile($event)"
		/>

		<div class="grid grid-cols-2 gap-3 overflow-auto max-h-[26rem]">
			<div
				v-for="(img, imgI) in design.imageLists"
				:key="'image-' + img.id"
				class="w-full h-full"
			>
				<img
					loading="lazy"
					draggable="false"
					:alt="img.name"
					class="w-full h-full rounded-xl cursor-pointer object-cover hover:shadow-lg transition"
					:src="img.url"
					@click="insertImageToCanvas(imgI)"
				/>
			</div>
		</div>
	</div>
</template>
