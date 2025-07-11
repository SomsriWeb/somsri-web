<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const { data: sportData } = await useAsyncData('sportData', () => {
  return queryCollection("sportCarousel").order("order", "ASC").all()
})
</script>

<template>
  <div class="w-full flex justify-center px-4 pb-5">
    <Swiper
      :modules="[Autoplay, Pagination, Navigation]"
      :slides-per-view="1"
      :loop="true"
      :autoplay="{ delay: 3000, disableOnInteraction: false }"
      :pagination="{ clickable: true }"
      :navigation="true"
      class="w-full max-w-[1200px] h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] rounded-2xl overflow-hidden shadow-lg"
    >
      <SwiperSlide v-for="(item, index) in sportData" :key="index">
        <img
          :src="item.image"
          :alt="`sport-image-${index}`"
          class="w-full h-full object-fill"
        />
      </SwiperSlide>
    </Swiper>
  </div>
</template>
