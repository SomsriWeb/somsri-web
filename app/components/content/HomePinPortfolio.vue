<script setup lang="ts">
	// VARIABLE
	const { data: pins } = await useAsyncData("data-pin", () => {
		return queryCollection("pin").order("order", "ASC").all()
	})
	const containerRef = ref(null)
	const swiper = useSwiper(containerRef, {
		loop: true,
		slidesPerView: 4,
		spaceBetween: 30,
		autoplay: {
			delay: 2500,
			disableOnInteraction: false,
		},
	})
</script>

<template>
	<div class="px-[4.6rem] py-[3rem]">
		<h2 class="text-primary text-[4rem] leading-none font-bold">ตัวอย่างงานปักเสื้อ</h2>
		<p class="text-stone-500 font-light mb-5">
			เรามีเทคนิคการปักที่หลากหลาย รองรับการผลิตตามความต้องการของลูกค้าทุกรูปแบบ
		</p>

		<ClientOnly>
			<swiper-container ref="containerRef" class="mb-5">
				<swiper-slide v-for="pin in pins" :key="pin.name">
					<HomePortfolioCard :name="pin.name" :url="pin.url" :image="pin.image" />
				</swiper-slide>
			</swiper-container>
		</ClientOnly>

		<div class="flex justify-end gap-5">
			<UButton
				color="neutral"
				variant="outline"
				icon="lucide:chevron-left"
				class="rounded-full !min-w-fit"
				@click="swiper.prev()"
			/>
			<UButton
				color="neutral"
				variant="outline"
				icon="lucide:chevron-right"
				class="rounded-full !min-w-fit"
				@click="swiper.next()"
			/>
		</div>
	</div>
</template>
