<script setup lang="ts">
const { t } = useI18n({ useScope: 'local' });
</script>

<i18n lang="json">
{
	"th": { "title": "ตัวอย่างสินค้า", "alt": "ตัวอย่างกางเกง" },
	"en": { "title": "Product Samples", "alt": "Pants sample" }
}
</i18n>

<template>
	<section class="w-full px-4 py-10 flex flex-col items-center text-center">
		<h2
			class="text-white text-3xl sm:text-4xl md:text-5xl font-bold bg-primary px-6 py-4 rounded-2xl mb-6 shadow"
		>
			{{ t('title') }}
		</h2>

		<ProseImg
			src="/pants/image3.png"
			:alt="t('alt')"
			class="max-w-md md:max-w-lg lg:max-w-xl object-contain"
		/>
	</section>
</template>
