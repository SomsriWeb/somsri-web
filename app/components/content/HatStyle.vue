<script setup lang="ts">
	// VARIABLE
	const { data } = useAsyncData("hat-styles", () =>
		queryCollection("hatStyles").order("order", "ASC").all()
	)
</script>
<template>
	<div>
		<slot name="title">
			<ProseH2>ชนิดหมวกและราคา</ProseH2>
		</slot>

		<div class="grid grid-cols-2 md:grid-cols-3 gap-5">
			<div v-for="item in data" :key="item.label">
				<ProseImg :src="item.image" class="mb-1" />
				<p class="text-center text-primary text-xl">{{ item.label }}</p>
			</div>
		</div>
	</div>
</template>
