<script setup lang="ts">
const { t } = useI18n({ useScope: 'local' });
</script>

<i18n lang="json">
{
	"th": {
		"tshirtAlt": "รับผลิตเสื้อ เสื้อยืดแบรนด์ตัวเอง โรงงานผลิตเสื้อ คุณภาพดี"
	},
	"en": {
		"tshirtAlt": "Custom T-shirt manufacturing for your own brand — a quality apparel factory"
	}
}
</i18n>

<template>
	<div>
		<header>
			<NuxtImg
				src="/own-brand-tshirt-factory/bg.png"
				class="w-screen h-screen object-cover"
				format="webp"
				placeholder
			/>
			<div class="absolute inset-0 bg-black/30" />
			<div class="absolute bottom-[2rem] left-[5rem] text-white max-w-[35rem]">
				<h1 class="text-7xl font-bold"><slot name="title" mdc-unwrap="p" /></h1>
				<p class="font-light text-xl mb-5">
					<slot name="description" mdc-unwrap="p" />
				</p>
			</div>
			<ProseImg
				src="/tshirt-factory/tshirt.png"
				:alt="t('tshirtAlt')"
				class="absolute bottom-[5rem] right-[3rem]"
			/>
		</header>
	</div>
</template>
