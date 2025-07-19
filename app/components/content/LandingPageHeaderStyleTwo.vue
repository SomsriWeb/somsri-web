<script setup lang="ts">
	// PROPS
	interface Props {
		image: string
		titleAsTag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
	}
	const { image, titleAsTag = "h1" } = defineProps<Props>()
</script>

<template>
	<div>
		<header>
			<ProseImg
				:src="image"
				class="!w-screen !h-screen object-cover"
				placeholder
				format="webp"
			/>
			<div class="absolute inset-0 bg-black/30" />
			<div class="absolute bottom-[3rem] px-5 md:px-[4.6rem] text-white">
				<component :is="titleAsTag" class="font-bold text-6xl leading-none"
					><slot name="title" mdc-unwrap="p"
				/></component>
				<p v-if="$slots.secondaryTitle" class="font-bold text-xl mt-3">
					<slot name="secondary-title" mdc-unwrap="p" />
				</p>
				<p
					v-if="$slots.description"
					class="font-light text-xl mt-3"
					name="description"
					mdc-unwrap="p"
				>
					<slot name="description" mdc-unwrap="p" />
				</p>

				<div v-if="$slots.default" class="mt-5">
					<slot />
				</div>

				<LineLink>
					<UButton class="mt-5">ปรึกษาฟรี</UButton>
				</LineLink>
			</div>
		</header>
	</div>
</template>
