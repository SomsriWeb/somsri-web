<script setup lang="ts">
	// PROPS
	interface Props {
		name: string
		imageUrl: string
		popupImageUrl: string
	}

	const { name, imageUrl, popupImageUrl } = defineProps<Props>()

	// VARIABLE
	const isModalOpen = ref<boolean>(false)

	// COMPUTED
	const popupImageAlt = computed(() => `${name} popup`)
</script>
<template>
	<div class="cursor-pointer">
		<img
			class="rounded-xl hover:scale-105 transition-all duration-300"
			:src="imageUrl"
			:alt="name"
			@click="isModalOpen = true"
		/>

		<UModal
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
