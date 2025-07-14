<script setup lang="ts">
const { data: polo } = await useAsyncData("polo", () =>
  queryCollection("PoloProduct").order("order", "ASC").all()
);
</script>

<template>
  <section class="pt-5 pb-10">
    <h2 class="text-white text-3xl md:text-3xl font-bold text-center mb-2 m-0">
      เนื้อผ้าและคุณสมบัติพิเศษ
    </h2>
    <div class="grid grid-rows-1 gap-2 ">
      <div
        v-for="(item, index) in polo"
        :key="index"
        class="flex flex-col items-center pb-10  "
      >
        <img
          :src="item.image"
          :alt="item.name"
          class=" w-full max-w-[25rem] "
        />
      </div>
    </div>

    <div
      class="mt-10 flex flex-col md:flex-row justify-center items-center gap-4 px-5"
    >
      <nuxt-link to="/fabric-specification">
        <UButton
          size="xl"
          color="primary"
          variant="solid"
          icon="i-lucide-file-search"
          class="w-30"
        >
          ดูเพิ่มเติม
        </UButton>
      </nuxt-link>

      <nuxt-link to="/design">
        <UButton
          size="xl"
          color="primary"
          variant="solid"
          icon="i-lucide-shirt"
          class=" w-[10rem]"
        >
          ออกแบบเสื้อโปโล
        </UButton>
      </nuxt-link>
    </div>
  </section>
</template>
