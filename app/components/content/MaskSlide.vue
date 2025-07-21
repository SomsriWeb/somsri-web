<script setup lang="ts">
	const { data: maskData } = await useAsyncData("maskData", () => {
		return queryCollection("mask").where("order", "IN", [4, 5, 6]).all()
	})

	const containerRef = ref(null)
	const swiperOptions = computed(() => ({
		slidesPerView: 1,
		loop: true,
		effect: "creative",
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},
		breakpoints: {
			320: {
				slidesPerView: 1,
				spaceBetween: 10,
			},
			640: {
				slidesPerView: 1.2,
				spaceBetween: 20,
			},
			768: {
				slidesPerView: 1.5,
				spaceBetween: 30,
			},
		},
	}))

	const swiper = useSwiper(containerRef, swiperOptions.value)
</script>

<template>
	<ProseH2 class="text-center mb-5">เนื้อผ้าและคุณสมบัติ</ProseH2>
	<div class="flex flex-col items-center justify-center px-4 p-5">
		<ClientOnly>
			<swiper-container ref="containerRef">
				<swiper-slide v-for="(item, index) in maskData" :key="index">
					<ProseImg :src="item.image" :alt="`sport-image-${index}`" />
				</swiper-slide>
			</swiper-container>
		</ClientOnly>

		<div class="w-full flex justify-center gap-3 mt-5 pr-2 sm:pr-4 md:pr-8">
			<UButton
				icon="i-heroicons-chevron-left"
				class="!text-primary !min-w-fit rounded-full"
				color="neutral"
				variant="outline"
				@click="swiper.prev()"
			/>
			<UButton
				icon="i-heroicons-chevron-right"
				class="!text-primary !min-w-fit rounded-full"
				color="neutral"
				variant="outline"
				@click="swiper.next()"
			/>
		</div>
	</div>
</template>
