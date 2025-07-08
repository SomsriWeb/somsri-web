<script setup lang="ts">
	import type { PriceCarouselCollectionItem } from "@nuxt/content"

	// PROPS
	interface Props {
		priceData: PriceCarouselCollectionItem
	}
	const { priceData } = defineProps<Props>()

	// VARIABLE
	const containerRef = ref(null)
	const swiperOptions = computed(() => ({
		slidesPerView: 1,
		spaceBetween: 30,
		autoplay: {
			delay: 1000,
		},
		breakpoints: {
			320: {
				slidesPerView: 2,
			},
			640: {
				slidesPerView: 2,
			},
			768: {
				slidesPerView: 3,
			},
			1024: {
				slidesPerView: 3,
			},
			1280: {
				slidesPerView: 4,
			},
		},
		loop: true,
		effect: "creative",
	}))
	const swiper = useSwiper(containerRef, swiperOptions.value)
</script>

<template>
	<div>
		<ClientOnly>
			<swiper-container ref="containerRef">
				<swiper-slide v-for="priceList in priceData.priceLists" :key="priceList.fabricName">
					<PriceCarouselCard :price-lists="priceList" />
				</swiper-slide>
			</swiper-container>
		</ClientOnly>

		<div class="flex justify-end gap-3 mt-5">
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
