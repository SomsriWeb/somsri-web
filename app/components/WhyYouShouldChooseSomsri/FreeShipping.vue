<script setup lang="ts">
	// MODEL
	const open = defineModel<boolean>("open")

	// FUNCTION
	function closeModal() {
		open.value = false
	}

	const { t } = useI18n({ useScope: "local" })
	const localizePath = await useLocalizedPath()
</script>

<i18n lang="json">
{
	"th": {
		"question": "อยู่ในกรุงเทพมหานครฯ ใช่หรือไม่",
		"headline": "สมศรีส่งให้ฟรี",
		"description": "สมศรีมีเสื้อพร้อมการให้บริการแบบมืออาชีพ เพื่อให้คุณมั่นใจในบริการของเรา เรามีทีมงานยินดีให้คำปรึกษาฟรี",
		"seeMore": "ดูตัวอย่างผลงานเพิ่มเติม"
	},
	"en": {
		"question": "Based in Bangkok?",
		"headline": "We deliver for free",
		"description": "SomsriTshirt offers a fully professional service so you can order with confidence. Our team is always happy to give you free consultation.",
		"seeMore": "See more of our work"
	}
}
</i18n>
<template>
	<UModal
		:class="{ hidden: !open }"
		class="max-w-3xl"
		:modal="open"
		:overlay="open"
		open
		@update:open="(value) => (open = value)"
	>
		<template #content>
			<div class="m-7 space-y-3">
				<UButton
					icon="lucide:x"
					class="absolute top-4 right-4 rounded-full !min-w-fit"
					@click="closeModal"
				/>
				<p class="text-3xl text-stone-800 font-light">{{ t("question") }}</p>
				<p class="text-[4rem] font-bold leading-16 text-stone-800">{{ t("headline") }}</p>
				<p class="text-stone-800 text-xl font-light">
					{{ t("description") }}
				</p>

				<NuxtLink
					:to="localizePath('/portfolio')"
					class="text-primary hover:underline transition-all flex items-center gap-1"
				>
					{{ t("seeMore") }} <UIcon name="lucide:chevron-right" />
				</NuxtLink>
			</div>
		</template>
	</UModal>
</template>
