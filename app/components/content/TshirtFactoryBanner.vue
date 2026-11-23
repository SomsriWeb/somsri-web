<script setup lang="ts">
	const { t } = useI18n({ useScope: 'local' })
</script>

<i18n lang="json">
{
	"th": {
		"need": "ต้องการสั่งผลิตเสื้อยืด",
		"brand": "อยากเริ่มทำแบรนด์เสื้อยืดเป็นของตัวเอง",
		"factory": "กำลังมองหาโรงงานผลิตเสื้อยืดที่ได้มาตรฐาน",
		"start": "แต่ไม่รู้จะเริ่มอย่างไรดี"
	},
	"en": {
		"need": "Need custom T-shirts produced?",
		"brand": "Want to start your own T-shirt brand?",
		"factory": "Looking for a T-shirt factory that meets quality standards?",
		"start": "But not sure where to start?"
	}
}
</i18n>

<template>
	<div class="flex flex-wrap gap-3">
		<p class="bg-primary text-white p-1.5 rounded-lg leading-none">{{ t('need') }}</p>
		<p class="bg-primary text-white p-1.5 rounded-lg leading-none">
			{{ t('brand') }}
		</p>
		<p class="bg-primary text-white p-1.5 rounded-lg leading-none">
			{{ t('factory') }}
		</p>
		<p class="bg-primary text-white p-1.5 rounded-lg leading-none">{{ t('start') }}</p>
	</div>
</template>
