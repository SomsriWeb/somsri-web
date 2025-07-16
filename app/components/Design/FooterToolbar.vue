<script lang="ts" setup>
	import ShortcutModal from "./FooterToolbar/ShortcutModal.vue"

	// EMIT
	type Emit = {
		export: []
	}
	defineEmits<Emit>()

	// VARIABLE
	const shortcutModalStatus = ref<boolean>(false)
</script>
<template>
	<div class="flex justify-between items-center gap-3 w-full bg-stone-100 p-2">
		<!-- SHORTCUT MODAL -->
		<div>
			<UButton
				icon="i-material-symbols-keyboard-alt-outline-rounded"
				label="คีย์ลัด"
				color="neutral"
				variant="outline"
				@click="shortcutModalStatus = true"
			/>
			<ShortcutModal v-model:open="shortcutModalStatus" />
		</div>

		<UButton
			type="button"
			color="primary"
			icon="i-material-symbols-download"
			@click="$emit('export')"
			>ดาวน์โหลด</UButton
		>
	</div>
</template>
