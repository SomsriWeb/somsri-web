<script setup lang="ts">
	const { data: brandcard } = await useAsyncData(`brandcard`, () => {
		return queryCollection("brandPortCard").order("order", "ASC").all()
	})
</script>

<template>
	<div class="px-4 pb-5">
		<div
			class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 place-items-center"
		>
			<div
				v-for="item in brandcard"
				:key="item.order"
				class="flex flex-col items-center text-center"
			>
				<div class="w-full max-w-[500px] rounded-2xl overflow-hidden shadow-md">
					<ProseImg :src="item.image" />
				</div>
			</div>
		</div>
	</div>
</template>
