<script lang="ts"></script>
<template>
	<header>
		<NuxtImg src="/home/header.jpg" class="w-screen h-screen object-cover" />
		<div class="absolute inset-0 bg-black/50"></div>
		<div class="absolute bottom-[5rem] left-[5rem] text-white max-w-[40rem]">
			<slot></slot>
		</div>
	</header>
</template>
