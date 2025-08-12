<script setup lang="ts">
	// PROPS
	interface Props {
		name: string
		imageUrl: string
		popupImageUrl: string
		usePopup?: boolean
		alt?: string
	}

	const { name, imageUrl, popupImageUrl, alt = "", usePopup = false } = defineProps<Props>()

	// VARIABLE
	const isModalOpen = ref<boolean>(false)

	// COMPUTED
	const popupImageAlt = computed(() => `${name} popup`)

	// FUNCTION
	function openPopup() {
		if (usePopup) {
			isModalOpen.value = true
		}
	}
</script>
<template>
	<div class="cursor-pointer">
		<ProseImg
			class="rounded-xl hover:scale-105 transition-all duration-300"
			:src="imageUrl"
			:alt="alt || name"
			@click="openPopup"
		/>

		<UModal
			v-if="usePopup"
			:class="{ hidden: !isModalOpen }"
			class="max-w-sm"
			:modal="isModalOpen"
			:overlay="isModalOpen"
			open
			@update:open="(value) => (isModalOpen = value)"
		>
			<template #content>
				<img :src="popupImageUrl" :alt="popupImageAlt" />
			</template>
		</UModal>
	</div>
</template>
