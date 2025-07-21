<script setup lang="ts">
	const { data: databrand } = await useAsyncData(`databrand`, () => {
		return queryCollection("brandService").order("order", "ASC").all()
	})
</script>

<!--Component ส่วน Oursurvice หน้า brand -->
<template>
	<div
		class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 place-items-center"
	>
		<div
			v-for="item in databrand"
			:key="item.name"
			class="flex flex-col items-center text-center"
		>
			<div>
				<ProseImg :src="item.image" :alt="item.name" />
			</div>
			<ProseH3 size="sm" class="text-base sm:text-lg font-semibold text-primary mt-3">
				{{ item.name }}
			</ProseH3>
			<ProseP class="text-sm text-primary mt-1">• {{ item.method }}</ProseP>
		</div>
	</div>
</template>
