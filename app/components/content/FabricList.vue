<script setup lang="ts">
	const { data: fabrics } = await useAsyncData("fabrics", () =>
		queryCollection("fabric").order("order", "ASC").all()
	)
</script>
<template>
	<div class="grid grid-cols-2 sm:grid-cols-4 gap-5">
		<FabricCard
			v-for="fabric in fabrics"
			:key="fabric.name"
			:name="fabric.name"
			:image-url="fabric.imgUrl"
			:popup-image-url="fabric.popupImageUrl"
		/>
	</div>
</template>
