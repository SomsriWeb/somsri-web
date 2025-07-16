<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
	import ColorTab from "~/components/Design/Toolbar/Color.vue"
	import ProductTab from "~/components/Design/Toolbar/Product.vue"
	import TextTab from "~/components/Design/Toolbar/Text.vue"
	import ImageTab from "~/components/Design/Toolbar/Image.vue"
	import ShapeTab from "~/components/Design/Toolbar/Shape.vue"
	import type { DesignData } from "@/types/design"

	// TYPE / INTERFACE
	enum Tab {
		PRODUCT = 1,
		COLOR = 2,
		TEXT = 3,
		IMAGE = 4,
		SHAPE = 5,
	}

	// PROPS
	interface Props {
		design: DesignData
	}
	const props = defineProps<Props>()
	const { design } = toRefs(props)

	// EMIT
	type Emit = {
		initCanvas: []
	}
	defineEmits<Emit>()

	// VARIABLE
	const activeTab = ref<Tab>()
	const tabState = ref<boolean>(false)
</script>

<template>
	<div class="flex items-center h-screen">
		<UPopover
			v-model:open="tabState"
			class="flex items-center gap-3"
			:content="{ side: 'right' }"
		>
			<div class="rounded-r-xl p-2 bg-white drop-shadow-xl flex flex-col">
				<UTooltip
					text="ตั้งค่าสินค้า"
					arrow
					:content="{ side: 'right' }"
					@click="activeTab = Tab.PRODUCT"
				>
					<UButton
						size="lg"
						square
						color="primary"
						variant="ghost"
						icon="i-material-symbols-dry-cleaning-outline-rounded"
						class="!min-w-fit"
					/>
				</UTooltip>

				<UTooltip
					text="ตั้งค่าสีผ้า"
					arrow
					:content="{ side: 'right' }"
					@click="activeTab = Tab.COLOR"
				>
					<UButton
						size="lg"
						square
						color="primary"
						variant="ghost"
						icon="i-material-symbols-palette-outline"
						class="!min-w-fit"
					/>
				</UTooltip>

				<UTooltip
					text="เพิ่มข้อความ"
					arrow
					:content="{ side: 'right' }"
					@click="activeTab = Tab.TEXT"
				>
					<UButton
						size="lg"
						square
						color="primary"
						variant="ghost"
						icon="i-material-symbols-insert-text-outline-rounded"
						class="!min-w-fit"
					/>
				</UTooltip>

				<UTooltip
					text="เพิ่มรูปภาพ"
					arrow
					:content="{ side: 'right' }"
					@click="activeTab = Tab.IMAGE"
				>
					<UButton
						size="lg"
						square
						color="primary"
						variant="ghost"
						icon="i-material-symbols-image-outline-rounded"
						class="!min-w-fit"
					/>
				</UTooltip>

				<UTooltip
					text="เพิ่มรูปร่าง"
					arrow
					:content="{ side: 'right' }"
					@click="activeTab = Tab.SHAPE"
				>
					<UButton
						size="lg"
						square
						color="primary"
						variant="ghost"
						icon="i-material-symbols-shapes-outline-rounded"
						class="!min-w-fit"
					/>
				</UTooltip>
			</div>

			<template #content>
				<ProductTab
					v-if="activeTab === Tab.PRODUCT"
					v-model:open="tabState"
					:design="design"
					@init-canvas="$emit('initCanvas')"
				/>
				<ColorTab
					v-else-if="activeTab === Tab.COLOR"
					v-model:open="tabState"
					:design="design"
				/>
				<TextTab
					v-else-if="activeTab === Tab.TEXT"
					v-model:open="tabState"
					:design="design"
				/>
				<ImageTab
					v-else-if="activeTab === Tab.IMAGE"
					v-model:open="tabState"
					:design="design"
				/>
				<ShapeTab
					v-else-if="activeTab === Tab.SHAPE"
					v-model:open="tabState"
					:design="design"
				/>
			</template>
		</UPopover>
	</div>
</template>
