<script setup lang="ts">
	// PROPS
	interface Props {
		type: "tshirt" | "polo" | "sweater" | "jacket" | "coat" | "dress" | "other"
	}
	const { type } = defineProps<Props>()

	// VARIABLE
	console.log(type)
	const { data } = await useAsyncData("fabrics", () => {
		return queryCollection("fabrics").order("labelEn", "ASC").all()
	})

	// COMPUTED
	const fabrics = computed(() => {
		return data.value?.filter((fabric) => fabric.forProductType.includes(type))
	})
</script>
<template>
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-5">
		<div v-for="fabric in fabrics" :key="fabric.id">
			<ProseImg :src="fabric.image" :alt="fabric.labelEn" class="rounded-lg mb-1" />
			<h3 class="text-xl uppercase text-black font-medium">
				{{ fabric.labelEn }}
			</h3>
			<p class="text-stone-500 font-stretch-condensed leading-none mb-1">
				สำหรับทำ{{ fabric.recommendForStyle }}
			</p>
			<ul class="list-disc list-inside font-light text-primary">
				<li v-for="advantage in fabric.advantage" :key="advantage" class="leading-none">
					{{ advantage }}
				</li>
			</ul>
		</div>
	</div>
</template>
