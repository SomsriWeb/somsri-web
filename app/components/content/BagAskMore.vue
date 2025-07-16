<script setup lang="ts">
import ProseH2 from "./ProseH2.vue";
</script>

<template>
  <div class="flex justify-center p-4">
    <div class="bg-primary w-full max-w-2xl sm:max-w-3xl md:max-w-4xl p-6 sm:p-8 rounded-2xl mx-auto">
      <!-- Title -->
      <div class="text-center">
        <ProseH2 class="text-white text-lg">
          สอบถามเพิ่มเติม
        </ProseH2>
      </div>
      <div class="flex justify-center items-center gap-2 p-4 lg:gap-5 sm:gap-5 md:gap-5">
        <nuxt-link
          to="https://www.facebook.com/somsritshirt/"
          target="_blank"
          aria-label="Facebook"
        >
          <NuxtImg
            src="/bag/fb-240w.png"
            class="w-5 sm:w-10 object-contain"
            alt="Facebook"
          />
        </nuxt-link>

        <nuxt-link
          to="https://contact.somsritshirt.com/3d8f7"
          target="_blank"
          aria-label="LINE"
        >
          <NuxtImg
            src="/bag/line-2-unsmushed.png"
            class="w-5 sm:w-10 object-contain"
            alt="LINE"
          />
        </nuxt-link>

        <nuxt-link
          to="https://www.instagram.com/somsritshirt/"
          target="_blank"
          aria-label="Instagram"
        >
          <NuxtImg
            src="/bag/ig-2-unsmushed.png"
            class="w-5 sm:w-10 object-contain"
            alt="Instagram"
          />
        </nuxt-link>

        <nuxt-link to="tel:0634216521" target="_blank" aria-label="โทรศัพท์">
          <NuxtImg
            src="/bag/tel-1-unsmushed.png"
            class="w-5 sm:w-10 object-contain"
            alt="Phone"
          />
        </nuxt-link>
      </div>
    </div>
  </div>
 
</template>

