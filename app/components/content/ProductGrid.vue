<script setup lang="ts">
	import ProseH2 from "./ProseH2.vue"

	const { data: products } = await useAsyncData("products", () =>
		queryCollection("product").where("name", "NOT LIKE", "หมวก").order("order", "ASC").all()
	)
</script>

<template>
	<section>
		<ProseH2 class="text-5xl mb-5">สินค้าของเรา</ProseH2>
		<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
			<NuxtLink v-for="(item, index) in products" :key="index" :to="item.url">
				<Card class="shadow hover:scale-105 transition duration-300">
					<ProseImg
						:src="item.image"
						:alt="item.alt"
						class="aspect-square object-cover rounded-lg"
					/>
					<ProseH3 class="text-4xl text-center">{{ item.name }}</ProseH3>
					<NuxtLink :to="item.url">
						<UButton class="w-full">รายละเอียด</UButton></NuxtLink
					>
				</Card>
			</NuxtLink>
		</div>
	</section>
</template>
