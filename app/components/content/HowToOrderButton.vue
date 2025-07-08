<script setup lang="ts"></script>
<template>
  <section class="bg-primary py-12 flex justify-center">
    <div div class="grid grid-cols-2 gap-4">
      <nuxt-link to="/step-order">
        <UButton color="neutral"> ขั้นตอนการสั่งซื้อ </UButton>
      </nuxt-link>

      <nuxt-link to="/step-product">
        <UButton color="neutral"> ขั้นตอนการผลิต </UButton>
      </nuxt-link>

      <nuxt-link to="###">
        <UButton color="neutral"> ส่งแบบ </UButton>
      </nuxt-link>

      <nuxt-link to="###">
        <UButton color="neutral"> ผลงานทีมกราฟฟิก </UButton>
      </nuxt-link>
    </div>
  </section>
</template>
