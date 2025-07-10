<script setup lang="ts">
const { data: polo } = await useAsyncData("polo", () =>
  queryCollection("PoloProduct").order("order", "ASC").all()
);
</script>

<template>
  <section class="pt-10 pb-16 bg-primary text-center">
    <h2 class="text-white text-xl md:text-3xl font-bold mb-6">
      เนื้อผ้าและคุณสมบัติพิเศษ
    </h2>

    <div
      class="max-w-6xl mx-auto grid gap-8 px-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
    >
      <div
        v-for="(item, index) in polo"
        :key="index"
        class="bg-white rounded-3xl p-5 shadow-md flex flex-col items-center"
      >
        <img
          :src="item.image"
          :alt="item.name"
          class="w-3xl h-auto object-contain rounded-lg"
        />
        <h3 class="mt-4 text-lg font-semibold text-gray-800">
          {{ item.name }}
        </h3>
      </div>
    </div>
    <div
      class="mt-10 flex flex-col md:flex-row justify-center items-center gap-4"
    >
      <nuxt-link to="/fabric-specification">
        <UButton
          size="xl"
          color="neutral"
          variant="soft"
          icon="i-lucide-file-search"
          class="w-64"
        >
          ดูเพิ่มเติม
        </UButton>
      </nuxt-link>

      <nuxt-link to="/design">
        <UButton
          size="xl"
          color="neutral"
          variant="soft"
          icon="i-lucide-shirt"
          class="w-64"
        >
          ออกแบบเสื้อโปโล
        </UButton>
      </nuxt-link>
    </div>
  </section>
</template>
