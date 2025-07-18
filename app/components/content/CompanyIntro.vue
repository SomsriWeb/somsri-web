<script setup lang="ts">
	const imgs = [
		"/pants/cut2.jpg",
		"/pants/screen3.jpg",
		"/pants/screen4.jpg",
		"/pants/screen5.jpg",
		"/pants/screen6.jpg",
	]
</script>
<template>
	<div>
		<!-- Section ข้อความ -->
		<section class="flex flex-col items-center text-center px-4 py-10">
			<ProseH2 class="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
				COMPANY INTRODUCTION
			</ProseH2>
			<ProseH2
				class="text-xl sm:text-2xl md:text-3xl font-bold mb-4 inline-flex items-center gap-2 flex-wrap justify-center"
			>
				<Icon name="lucide:shirt" class="text-primary w-5 h-5 sm:w-6 sm:h-6" />
				บริษัท สมศรี การ์เมนท์ จำกัด
			</ProseH2>
			<p class="text-sm sm:text-base max-w-3xl">
				<slot name="company-description" mdc-unwrap="p" />
			</p>
		</section>

		<!--รูป-->
		<ClientOnly>
			<Vue3Marquee class="rounded-xl" :duration="80">
				<img v-for="img in imgs" :key="img" :src="img" class="max-h-[17rem] object-cover" />
			</Vue3Marquee>
		</ClientOnly>
	</div>
</template>
