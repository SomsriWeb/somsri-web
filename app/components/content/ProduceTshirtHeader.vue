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
			<NuxtImg
				:src="image"
				class="w-screen h-screen object-cover"
				placeholder
				format="webp"
			/>
			<div class="absolute inset-0 bg-black/30" />
			<div class="absolute bottom-[3rem] px-5 md:px-[4.6rem] text-white">
				<component :is="titleAsTag" class="font-bold text-6xl leading-none"
					><slot name="title" mdc-unwrap="p"
				/></component>
				<p class="font-bold text-xl mb-3">
					<slot name="secondary-title" mdc-unwrap="p" />
				</p>
				<p class="font-light text-xl mb-3" name="description" mdc-unwrap="p">
					<slot name="description" mdc-unwrap="p" />
				</p>
				<LineLink>
					<UButton>ปรึกษาฟรี</UButton>
				</LineLink>
			</div>
		</header>
	</div>
</template>
