<script lang="ts" setup></script>
<template>
	<header>
		<NuxtImg src="/home/header.jpg" class="w-screen h-screen object-cover" />
		<div class="absolute inset-0 bg-black/30" />
		<div class="absolute bottom-[5rem] left-[5rem] text-white max-w-[40rem]">
			<h1 class="text-8xl font-bold"><slot name="title" /></h1>
			<p class="font-light mb-5">
				<slot name="description" />
			</p>

			<UButton color="primary" size="xl" class="!min-w-[13rem]">
				<Icon name="lucide:message-circle" size="1.5rem" />
				<slot name="button" />
			</UButton>
		</div>
	</header>
</template>
