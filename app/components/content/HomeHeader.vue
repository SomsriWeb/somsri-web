<script lang="ts" setup>
	defineProps<{
		actionLink: string
	}>()
</script>
<template>
	<header>
		<NuxtImg
			src="/home/header.jpg"
			class="w-screen h-screen object-cover"
			format="webp"
			placeholder
			preload
		/>
		<div class="absolute inset-0 bg-black/30" />
		<div
			class="absolute bottom-5 xl:bottom-[5rem] left-5 md:left-[5rem] text-white max-w-[10rem] sm:max-w-[20rem] md:max-w-[23rem] lg:max-w-[33rem] xl:max-w-[40rem]"
		>
			<h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
				<slot name="title" mdc-unwrap="p" />
			</h1>
			<p class="font-light text-base md:text-lg lg:text-xl mb-5">
				<slot name="description" mdc-unwrap="p" />
			</p>

			<NuxtLink :to="actionLink" external>
				<UButton color="primary" size="xl" class="!min-w-[9rem]">
					<Icon name="lucide:message-circle" size="1rem" />
					<slot name="button" mdc-unwrap="p" />
				</UButton>
			</NuxtLink>
		</div>
	</header>
</template>
