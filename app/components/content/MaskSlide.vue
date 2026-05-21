<script setup lang="ts">
	import type { SwiperContainer } from "swiper/element"

	const { data: maskData } = await useAsyncData("maskData", () => {
		return queryCollection("mask").where("order", "IN", [4, 5, 6]).order("order", "ASC").all()
	})

	const containerRef = ref<SwiperContainer | null>(null)
	const swiperOptions = computed(() => ({
		slidesPerView: 1,
		spaceBetween: 30,
		loop: true,
		effect: "creative",
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},
	}))

	const swiper = useSwiper(containerRef, swiperOptions.value)

	/**
	 * `useSwiper` init แค่ครั้งเดียวใน onMounted + nextTick — ถ้า `swiper-container` อยู่ใน
	 * `<ClientOnly>` ครั้งนั้น ref ยังเป็น null จะไม่มีการ retry ทำให้ Swiper ไม่ถูก initialize
	 * (ดูคอมเมนต์ใน Carousel.vue)
	 */
	function mountSwiperWhenReady() {
		const el = containerRef.value
		if (!el || el.nodeName !== "SWIPER-CONTAINER") return
		const opts = swiperOptions.value
		if (!el.swiper) {
			Object.assign(el, opts)
			el.initialize?.()
		}
		swiper.instance.value = el.swiper
	}

	watch(containerRef, () => nextTick(mountSwiperWhenReady), { flush: "post" })
</script>

<template>
	<ProseH2 class="text-center mb-5">เนื้อผ้าและคุณสมบัติ</ProseH2>
	<div class="flex flex-col items-center justify-center px-4 p-5">
		<ClientOnly>
			<swiper-container ref="containerRef" class="w-full max-w-full">
				<swiper-slide
					v-for="(item, index) in maskData ?? []"
					:key="index"
					class="!flex items-center justify-center"
				>
					<ProseImg
						:lazy="false"
						:src="item.image"
						:alt="item.alt ?? item.name ?? `mask-fabric-${index}`"
						class="mx-auto block max-w-[30rem] w-full"
					/>
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
