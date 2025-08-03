<script setup lang="ts">
	const { data: products } = await useAsyncData("data-products", () => {
		return queryCollection("product").where("featured", "=", true).order("order", "ASC").all()
	})
</script>

<template>
	<div>
		<div class="mb-5">
			<slot name="title" />
			<slot name="description" />
		</div>

		<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[2.5rem] mb-5">
			<HomeProductCard
				v-for="product in products"
				:key="product.name"
				:name="product.name"
				:url="product.url"
				:image="product.image"
			/>
		</div>

		<div class="flex justify-end">
			<NuxtLink to="/product-type">
				<UButton
					color="neutral"
					variant="outline"
					class="rounded-full"
					trailing-icon="lucide:chevron-right"
					>ดูสินค้าอื่น ๆ</UButton
				>
			</NuxtLink>
		</div>
	</div>
</template>
