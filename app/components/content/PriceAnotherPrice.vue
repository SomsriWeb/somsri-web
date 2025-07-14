<script setup lang="ts">
	// VARIABLE
	const { data: priceTabData } = await useAsyncData(`priceTab`, () =>
		queryCollection("priceTab").order("order", "ASC").all()
	)
	const activeTab = ref<string>(priceTabData.value?.[0]?.uid ?? "")
</script>
<template>
	<div class="flex flex-col items-center">
		<ProseH2 v-if="$slots.title" class="mb-2"><slot name="title" mdc-unwrap="p" /></ProseH2>
		<div class="border-2 border-primary rounded-lg p-2 max-w-[30rem]">
			<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 overflow-x-auto mb-2">
				<UButton
					v-for="tab in priceTabData"
					:key="tab.uid"
					:variant="activeTab === tab.uid ? 'solid' : 'outline'"
					@click="activeTab = tab.uid"
				>
					{{ tab.name }}
				</UButton>
			</div>
			<img
				v-for="tab in priceTabData"
				:key="tab.uid"
				:src="tab.imageUrl"
				:alt="tab.name"
				class="w-full rounded-lg"
				:class="[activeTab === tab.uid ? 'block' : 'hidden']"
			/>
		</div>
	</div>
</template>
