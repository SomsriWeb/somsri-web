<script lang="ts" setup>
	import { UButton } from "#components"

	const props = defineProps<{
		actionLink: string
	}>()
</script>

<template>
	<div class="flex justify-center">
		<a :href="props.actionLink" target="_blank">
			<UButton
				icon="ix:user-manual-filled"
				class="relative inline-flex rounded-lg px-4 py-3 text-white bg-primary hover:bg-primary-50 cursor-pointer"
			>
				สามารถอ่านต่อได้ที่
				<span
					class="absolute top-0 right-0 -mt-1 -mr-1 flex size-3 rounded-full bg-primary-200 animate-ping"
				/>
			</UButton>
		</a>
	</div>
</template>
