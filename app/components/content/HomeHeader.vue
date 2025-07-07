<script lang="ts" setup>
	defineProps<{
		actionLink: string
	}>()
</script>
<template>
	<header>
		<NuxtImg src="/home/header.jpg" class="w-screen h-screen object-cover" />
		<div class="absolute inset-0 bg-black/30" />
		<div class="absolute bottom-[5rem] left-[5rem] text-white max-w-[40rem]">
			<h1 class="text-7xl font-bold"><slot name="title" mdc-unwrap="p" /></h1>
			<p class="font-light text-xl mb-5">
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
