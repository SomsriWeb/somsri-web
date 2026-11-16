<script setup lang="ts">
	const { t } = useI18n({ useScope: 'local' })

	// VARIALBE
	const items = computed(() => [
		{
			key: "rubber",
			title: t("rubber.title"),
			advantage: t("rubber.advantage"),
			disadvantage: t("rubber.disadvantage"),
			image: "/produce-tshirt/rubber.png",
		},
		{
			key: "ink",
			title: t("ink.title"),
			advantage: t("ink.advantage"),
			disadvantage: t("ink.disadvantage"),
			image: "/produce-tshirt/ink.png",
		},
		{
			key: "plastisol",
			title: t("plastisol.title"),
			advantage: t("plastisol.advantage"),
			disadvantage: t("plastisol.disadvantage"),
			image: "/produce-tshirt/plastisol.png",
		},
	])
</script>

<i18n lang="json">
{
	"th": {
		"rubber": {
			"title": "สียาง",
			"advantage": "ผิวสัมผัสเรียบ",
			"disadvantage": "ไม่เหมาะกับงานที่มีรายละเอียด เล็กมาก เพราะงานสกรีนอาจไม่คมได้"
		},
		"ink": {
			"title": "สีจม",
			"advantage": "เนื้อสกรีนจมไปกับเนื้อผ้า ให้ความรู้สึกเนื้อสกรีนเป็นเนื้อเดียวกับเสื้อ",
			"disadvantage": "เหมาะกับผ้าสีอ่อนเท่านั้น เช่น สีขาว สีฟ้าอ่อน สีชมพูอ่อน เป็นต้น"
		},
		"plastisol": {
			"title": "สีพลาสติซอล",
			"advantage": "สามารถสกรีนงานรายละเอียดเล็กได้",
			"disadvantage": "ผิวสัมผัสหยาบ"
		},
		"pros": "ข้อดี: {text}",
		"cons": "ข้อจำกัด: {text}"
	},
	"en": {
		"rubber": {
			"title": "Rubber ink",
			"advantage": "Smooth finish",
			"disadvantage": "Not suited to very fine details, as the print may lose sharpness"
		},
		"ink": {
			"title": "Water-based ink",
			"advantage": "The ink soaks into the fabric, so the print feels like part of the shirt",
			"disadvantage": "Only suitable for light-colored fabrics, e.g. white, light blue or light pink"
		},
		"plastisol": {
			"title": "Plastisol ink",
			"advantage": "Can print fine details",
			"disadvantage": "Rougher texture"
		},
		"pros": "Pros: {text}",
		"cons": "Limitations: {text}"
	}
}
</i18n>

<template>
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
		<Card v-for="item in items" :key="item.key" class="shadow">
			<ProseImg :src="item.image" class="rounded-lg aspect-square object-cover" />
			<ProseH4>{{ item.title }}</ProseH4>
			<div>
				<ProseP class="!text-primary leading-none">{{ t("pros", { text: item.advantage }) }}</ProseP>
				<ProseP class="!text-primary leading-none"
					>{{ t("cons", { text: item.disadvantage }) }}</ProseP
				>
			</div>
		</Card>
	</div>
</template>
