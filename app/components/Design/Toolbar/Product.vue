<script setup lang="ts">
	import { products, fabrics, productStyle, ProductTypeKey } from "@/lib/design/variable"
	import type { DesignData, ProductStyle } from "@/types/design"
	import type { SelectOption } from "@/types/Global"

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
	const emit = defineEmits<Emit>()

	// MODEL
	const open = defineModel<boolean>("open", { required: true, default: false })

	// VARIABLE
	const activeStyleClass = "bg-primary-500/10 border-primary-500"
	const nonActiveStyleClass = "bg-stone-200 border-stone-500"
	const subComponentMenuState = ref<boolean>(false)
	// const activeSubComponentMenuKey = ref<string>('');

	// COMPUTED
	const fabricOptions = computed<SelectOption[]>(() => fabrics[design.value.type] || [])
	const styleOptions = computed<ProductStyle[]>(() => productStyle[design.value.type])
	const isPolo = computed<boolean>(() => design.value.type === ProductTypeKey.POLO)
	const isApron = computed<boolean>(() => design.value.type === ProductTypeKey.APRON)
	// const activeSubComponentMetadata = computed<{ label: string; value: PoloComponent } | undefined>(() => poloComponentLabel.find((item) => item.value === activeSubComponentMenuKey.value));

	// FUNCTIONMAKE
	function setToProductDefault() {
		emit("initCanvas")
	}

	function selectStyle(style: string) {
		design.value.style = style
	}
</script>

<template>
	<div
		class="w-screen h-screen max-w-96 max-h-[30rem] bg-stone-100 rounded-lg p-3 shadow-lg space-y-3"
	>
		<div class="flex justify-between items-center gap-3 mb-3">
			<ProseH2>ตั้งค่าสินค้า</ProseH2>
			<UButton
				type="button"
				icon="i-material-symbols-close-rounded"
				color="error"
				class="!min-w-fit"
				@click="open = false"
			/>
		</div>

		<template v-if="!subComponentMenuState">
			<UFormField label="ประเภทสินค้า">
				<USelectMenu
					v-model="design.type"
					class="w-full"
					:items="products"
					value-key="value"
					@change="setToProductDefault()"
				/>
			</UFormField>

			<UFormField label="ประเภทเนื้อผ้า">
				<USelectMenu
					v-model="design.fabric"
					class="w-full"
					:items="fabricOptions"
					value-key="value"
				/>
			</UFormField>

			<!-- <div v-if="isPolo">
                <label class="font-medium">ส่วนประกอบสินค้า</label>
                <div class="space-y-3">
                    <UButton v-for="comp in poloComponentLabel" :key="'component-' + comp.value" class="justify-between w-full text-md" color="gray" @click="openSubComponentMenu(comp.value)">
                        <p class="font-medium">{{ comp.label }}</p>
                        <Icon name="material-symbols:chevron-right-rounded" size="1.5rem" class="text-neutral-500" />
                    </UButton>
                </div>
            </div> -->

			<div v-if="!isApron && !isPolo">
				<label class="font-medium">ลักษณะสินค้า</label>

				<UCarousel
					v-slot="{ item }"
					:items="styleOptions"
					:ui="{ container: 'flex gap-3' }"
					class="rounded-lg overflow-hidden"
				>
					<button
						class="flex flex-col justify-center items-center border-2 p-3 rounded-xl"
						:class="[
							design.style === item.value ? activeStyleClass : nonActiveStyleClass,
						]"
						@click="selectStyle(item.value)"
					>
						<p class="font-medium text-primary-500 text-xl">
							{{ item.label }}
						</p>
						<img
							class="w-[6rem] h-[6rem] rounded-xl"
							:src="item.imgUrl"
							:alt="item.label"
						/>
					</button>
				</UCarousel>
			</div>
		</template>
	</div>
</template>
