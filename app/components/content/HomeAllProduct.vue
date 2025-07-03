<script setup lang="ts">
	const { data: products } = await useAsyncData("data-products", () => {
		return queryCollection("product").order("order", "ASC").all()
	})
</script>

<template>
	<div class="px-[4.6rem] py-[3rem]">
		<h2 class="text-primary text-[4rem] leading-none font-bold">สินค้าทั้งหมด</h2>
		<p class="text-stone-500 font-light text-xl mb-5">	
			สมศรีมีเสื้อผลิตสินค้าต่าง ๆ ไม่ว่าจะเป็นเสื้อยืด เสื้อโปโล เสื้อกีฬา และสินค้าอื่น ๆ
		</p>

		<div class="grid grid-cols-3 gap-[2.5rem] mb-5">
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
