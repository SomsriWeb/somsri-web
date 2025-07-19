<script setup lang="ts">
	// PROPS
	interface Props {
		image: string
	}
	const { image } = defineProps<Props>()
</script>
<template>
	<div class="grid grid-cols-1 md:grid-cols-5">
		<ProseImg :src="image" class="col-span-2" />

		<div class="col-span-3 flex flex-col justify-center items-center p-5">
			<ProseH1 class="!text-[5rem] text-center">
				<slot name="title" mdc-unwrap="p" />
			</ProseH1>

			<ProseP class="text-xl text-center !text-primary">
				<slot name="description" mdc-unwrap="p" />
			</ProseP>

			<div class="mt-5">
				<slot v-if="$slots.default" />
			</div>

			<LineLink class="mt-5">
				<UButton>ปรึกษาฟรี!</UButton>
			</LineLink>
		</div>
	</div>
</template>
