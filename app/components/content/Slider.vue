<script setup lang="ts">
	// PROPS
	interface Props {
		items: number
		slidesPerView?: number
	}
	const { items, slidesPerView = 1 } = defineProps<Props>()

	// VARIABLE
	const containerRef = ref(null)
	const swiperOptions = computed(() => ({
		slidesPerView: slidesPerView,
		spaceBetween: 30,
		autoplay: {
			delay: 1000,
		},
		loop: true,
		effect: "creative",
		breakpoints: {
			320: {
				slidesPerView: 1,
			},
			640: {
				slidesPerView,
			},
		},
	}))
	const swiper = useSwiper(containerRef, swiperOptions.value)
</script>

<template>
	<div>
		<ClientOnly>
			<swiper-container ref="containerRef">
				<swiper-slide v-for="item in items" :key="item">
					<slot :name="`item-${item}`" />
				</swiper-slide>
			</swiper-container>

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
		</ClientOnly>
	</div>
</template>
