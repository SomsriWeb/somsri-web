<script lang="ts" setup>
	import shortcuts from "~/lib/design/shortcutKey"

	// MODEL
	const open = defineModel<boolean>("open", { required: true, default: false })

	// FUNCTION
</script>
<template>
	<UModal v-model:open="open">
		<template #content>
			<div class="p-4">
				<div class="flex justify-between items-center gap-3 mb-3">
					<ProseH2>คีย์ลัด</ProseH2>
					<UButton
						type="button"
						icon="i-material-symbols-close-rounded"
						color="neutral"
						variant="outline"
						class="!min-w-fit"
						@click="open = false"
					/>
				</div>

				<div class="space-y-3">
					<div
						v-for="shortcut in shortcuts"
						:key="shortcut.id"
						class="grid grid-cols-3 gap-3"
					>
						<div class="flex items-center gap-2">
							<template v-for="(key, keyIndex) in shortcut.keys" :key="key">
								<UKbd :value="key" class="text-lg !h-fit" />
								<p v-if="keyIndex !== shortcut.keys.length - 1">+</p>
							</template>
						</div>
						<p class="col-span-2">{{ shortcut.name }}</p>
					</div>
				</div>
			</div>
		</template>
	</UModal>
</template>
