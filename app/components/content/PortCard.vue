<script setup lang="ts">
const props = defineProps<{
  type: "artist" | "organization" | "other";
}>();

const collectionMap = {
  artist: "portCardArtist",
  organization: "portCardOrganization",
  other: "portCardOther",
};

const { data: datacards } = await useAsyncData(`portcard-${props.type}`, () => {
  return queryCollection(collectionMap[props.type]).order("name", "ASC").all();
});
</script>

<template>
  <div class="px-4 py-10">
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 place-items-center"
    >
      <div
        v-for="item in datacards"
        :key="item.name"
        class="flex flex-col items-center text-center"
      >
        <div
          class="w-full max-w-[250px] h-[400px] rounded-2xl overflow-hidden shadow-md"
        >
          <img
            :src="item.image"
            :alt="item.name"
            class="w-full h-full object-cover"
          />
        </div>
        <p class="text-base sm:text-lg font-semibold text-primary mt-3">
          {{ item.name }}
        </p>
        <p class="text-sm text-primary mt-1">• {{ item.method }}</p>
      </div>
    </div>
  </div>
</template>
