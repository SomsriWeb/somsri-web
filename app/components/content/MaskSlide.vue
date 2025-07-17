<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAsyncData } from '#app'
import { useSwiper } from 'swiper/vue'

const { data: maskData } = await useAsyncData('maskData', () => {
  return queryCollection("mask").where("order", "in", [4, 5, 6]).all()
})

const containerRef = ref(null)
const swiperOptions = computed(() => ({
  slidesPerView: 1,
  loop: true,
  effect: "creative",
  autoplay: {
    delay: 3000,
    disableOnInteraction: false
  },
  breakpoints: {
    640: {
      slidesPerView: 1.2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 1.5,
      spaceBetween: 30,
    }
  }
}))

const swiper = ref<any>(null)

onMounted(() => {
  swiper.value = useSwiper(containerRef, swiperOptions.value)
})
</script>

<template>
  <h2 class="text-3xl font-bold text-center mb-6 text-primary">เนื้อผ้าและคุณสมบัติ</h2>
  <div class="flex flex-col items-center justify-center px-4 p-5">
    <ClientOnly>
      <div class="flex justify-center items-center w-full">
        <swiper-container
          ref="containerRef"
          :autoplay="{ delay: 3000, disableOnInteraction: false }"
          class="w-full max-w-full rounded-xl overflow-hidden"
        >
          <swiper-slide v-for="(item, index) in maskData" :key="index">
            <img
              :src="item.image"
              :alt="`sport-image-${index}`"
              class="w-full h-full sm:h-[350px] object-contain mx-auto  rounded-2xl"
            />
          </swiper-slide>
        </swiper-container>
      </div>
    </ClientOnly>

    <div class="w-full flex justify-center gap-3 mt-5 pr-2 sm:pr-4 md:pr-8">
      <UButton
        icon="i-heroicons-chevron-left"
        class="!text-primary !min-w-fit rounded-full"
        color="neutral"
        variant="outline"
        @click="swiper?.value?.slidePrev()"
      />
      <UButton
        icon="i-heroicons-chevron-right"
        class="!text-primary !min-w-fit rounded-full"
        color="neutral"
        variant="outline"
        @click="swiper?.value?.slideNext()"
      />
    </div>
  </div>
</template>
