<script setup lang="ts">
	// MODEL
	const open = defineModel<boolean>("open")

	// FUNCTION
	function closeModal() {
		open.value = false
	}

	const { t } = useI18n({ useScope: 'local' })
	const localizePath = await useLocalizedPath()
</script>

<i18n lang="json">
{
	"th": {
		"lead": "อยากทำเสื้อแต่ยังไม่ได้ออกแบบ ไม่เป็นไรเพราะเรามี",
		"title": "บริการออกแบบเสื้อ",
		"description": "สมศรีมีบริการออกแบบลายเสื้อเฉพาะตัว รูปแบบไม่ซ้ำใคร ไม่ว่าจะเป็น ลายกราฟิก โลโก้ ข้อความ และอื่นๆ เราพร้อมให้คำปรึกษาเรื่องการออกแบบจนกว่าลูกค้าจะพอใจ สามารถสั่งผลิตและออกแบบได้ตามความต้องการของลูกค้า เพื่อให้ท่านได้ผลิตเสื้อที่มีรูปแบบตรงตามความต้องการมากที่สุด",
		"seeMore": "ดูตัวอย่างผลงานเพิ่มเติม"
	},
	"en": {
		"lead": "Want custom shirts but don't have a design yet? No problem — we offer a",
		"title": "Shirt Design Service",
		"description": "SomsriTshirt creates one-of-a-kind shirt designs — graphics, logos, text and more. Our team advises you on every detail until you're completely satisfied, and we design and produce exactly to your requirements so your shirts turn out just the way you want.",
		"seeMore": "View more of our work"
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
				<p class="text-3xl text-stone-800 font-light">
					{{ t('lead') }}
				</p>
				<p class="text-[4rem] font-bold leading-16 text-stone-800">{{ t('title') }}</p>
				<p class="text-stone-800 text-xl font-light">
					{{ t('description') }}
				</p>

				<NuxtLink
					:to="localizePath('/portfolio')"
					class="text-primary hover:underline transition-all flex items-center gap-1"
				>
					{{ t('seeMore') }} <UIcon name="lucide:chevron-right" />
				</NuxtLink>
			</div>
		</template>
	</UModal>
</template>
