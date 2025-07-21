<script setup lang="ts">

interface Props {
  type: "portCardArtist" | "portCardOrganization" | "portCardOther";
}

const props = defineProps<Props>();

const { data: datacards } = await useAsyncData(`portcard-${props.type}`, () => {
  return queryCollection(props.type).order("name", "ASC").all();
});
</script>

<template>
  <div>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 place-items-center"
    >
      <div
        v-for="item in datacards"
        :key="item.name"
        class="flex flex-col items-center text-center w-full max-w-[250px]"
      >
        <!-- Responsive square image -->
        <div class="w-full aspect-square rounded-2xl overflow-hidden shadow-md">
          <img
            :src="item.image"
            :alt="item.name"
            class="w-full h-full object-cover"
          />
        </div>

        <!-- Text -->
        <span class=" text-base sm:text-lg font-semibold text-primary mt-3">
          {{ item.name }}
        </span>
        <p class="text-sm text-primary mt-1">• {{ item.method }}</p>
      </div>
    </div>
  </div>
</template>

