<script setup lang="ts">

  const { data: sportData } = await useAsyncData('sportData', () => {
  return queryCollection("sportCarousel").order("order", "ASC").all()
})

	// VARIABLE
	const containerRef = ref(null)
	const swiperOptions = computed(() => ({
		slidesPerView: 1,
		loop: true,
		effect: "creative",
	}))
	const swiper = useSwiper(containerRef, swiperOptions.value)
</script>

<template>
  <div class="flex flex-col items-center justify-center px-4 p-5">
    <ClientOnly>
      <div class="flex justify-center items-center w-full">
        <swiper-container
          ref="containerRef"
          :autoplay="{ delay: 3000, disableOnInteraction: false }"
          class="w-full max-w-full sm:max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-[1366px] h-[320px] sm:h-[480px] md:h-[600px] lg:h-[720px] rounded-xl overflow-hidden"
        >
          <Swiper-Slide v-for="(item, index) in sportData" :key="index">
            <img
              :src="item.image"
              :alt="`sport-image-${index}`"
              class="w-full h-full object-fill"
            />
          </Swiper-Slide>
        </swiper-container>
      </div>
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