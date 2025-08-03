<script setup lang="ts">
	const imgs = [
		"/home/portfolio/1.jpg",
		"/home/portfolio/2.jpg",
		"/home/portfolio/3.jpg",
		"/home/portfolio/4.jpg",
		"/home/portfolio/5.jpg",
		"/home/portfolio/6.jpg",
		"/home/portfolio/7.jpg",
	]
</script>

<template>
	<div>
		<div class="mb-5">
			<slot name="title" />
			<slot name="description" />
		</div>

		<ClientOnly>
			<Vue3Marquee class="rounded-xl" :duration="40">
				<ProseImg
					v-for="img in imgs"
					:key="img"
					:src="img"
					class="max-h-[17rem] object-cover"
				/>
			</Vue3Marquee>
		</ClientOnly>
	</div>
</template>
