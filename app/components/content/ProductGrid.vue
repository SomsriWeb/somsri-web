<script setup lang="ts">
	import ProseH2 from "./ProseH2.vue"

	const { data: products } = await useAsyncData("products", () =>
		queryCollection("product").where("featured", "=", true).order("order", "ASC").all()
	)
</script>

<template>
	<section class="max-w-6xl mx-auto py-5 px-4">
		<ProseH2 class="text-2xl font-bold mb-5 text-center">สินค้าของเรา</ProseH2>
		<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
			<div
				v-for="(item, index) in products"
				:key="index"
				class="bg-white rounded-lg shadow-md p-4 flex flex-col items-center w-full"
			>
				<img :src="item.image" :alt="item.name" class="w-full h-auto rounded mb-4" />
				<h3 class="text-lg font-semibold mb-2">{{ item.name }}</h3>
				<NuxtLink
					:to="item.url"
					class="bg-primary-400 text-white px-4 py-2 rounded shadow hover:bg-primary-500"
				>
					รายละเอียด
				</NuxtLink>
			</div>
		</div>
	</section>
</template>
