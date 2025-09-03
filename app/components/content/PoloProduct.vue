<script setup lang="ts">
	const { data: polo } = await useAsyncData("polo", () =>
		queryCollection("poloProduct").order("order", "ASC").all()
	)
</script>

<template>
	<section class="pt-5 pb-10">
		<ProseH2 class="text-center"> เนื้อผ้าและคุณสมบัติพิเศษ </ProseH2>
		<div class="grid grid-rows-1 gap-2">
			<div
				v-for="(item, index) in polo"
				:key="index"
				class="flex flex-col items-center pb-10"
			>
				<ProseImg :src="item.image" :alt="item.alt || item.name" class="max-w-[25rem]" />
			</div>
		</div>

		<div class="mt-10 flex flex-row flex-wrap justify-center items-center gap-4 px-5">
			<nuxt-link to="/fabric-specification">
				<UButton
					size="xl"
					color="primary"
					variant="solid"
					icon="i-lucide-file-search"
					class="min-w-[9rem] px-4"
				>
					ดูเพิ่มเติม
				</UButton>
			</nuxt-link>

			<nuxt-link to="/shop">
				<UButton
					size="xl"
					color="primary"
					variant="solid"
					icon="i-lucide-shirt"
					class="min-w-[12rem] px-4"
				>
					ออกแบบเสื้อโปโล
				</UButton>
			</nuxt-link>
		</div>
	</section>
</template>
