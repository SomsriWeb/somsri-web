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
		<ProseH2 class="text-primary text-3xl lg:text-[4rem] leading-none font-bold">
			<slot v-if="$slots.title" name="title" mdc-unwrap="p" />
		</ProseH2>
		<ProseP class="text-stone-500 font-light text-xl mb-5">
			<slot v-if="$slots.description" name="description" mdc-unwrap="p" />
		</ProseP>

		<ClientOnly>
			<Vue3Marquee class="rounded-xl" :duration="40">
				<img v-for="img in imgs" :key="img" :src="img" class="max-h-[17rem] object-cover" />
			</Vue3Marquee>
		</ClientOnly>
	</div>
</template>
