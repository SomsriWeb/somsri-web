<script setup lang="ts">
	// VARIABLE
	const { t, locale } = useI18n({ useScope: 'local' })
	const isEn = computed(() => locale.value === "en")
	const data = computed(() => [
		{
			label: t("q1"),
			slot: "1" as const,
		},
		{
			label: t("q2"),
			slot: "2" as const,
		},
		{
			label: t("q3"),
			slot: "3" as const,
		},
		{
			label: t("q4"),
			slot: "4" as const,
		},
		{
			label: t("q5"),
			slot: "5" as const,
		},
	])
</script>

<i18n lang="json">
{
	"th": {
		"q1": "สมศรีมีเสื้อ รับผลิตเสื้อ ประเภทใดได้บ้าง?",
		"q2": "ปริมาณการสั่งผลิตเสื้อขั้นต่ำคือเท่าไหร่?",
		"q3": "ราคาในการผลิตเสื้อเริ่มต้นที่เท่าไหร่?",
		"q4": "เนื้อผ้าที่ใช้ในการผลิตเสื้อมีอะไรบ้าง?",
		"q5": "ขั้นตอนการสั่งผลิตเสื้อ"
	},
	"en": {
		"q1": "What types of shirts can SomsriTshirt produce?",
		"q2": "What is the minimum order quantity?",
		"q3": "What is the starting price for custom shirts?",
		"q4": "Which fabrics are used for shirt production?",
		"q5": "How to order custom shirts"
	}
}
</i18n>

<template>
	<div class="border border-stone-200 rounded-xl p-2">
		<UAccordion
			:items="data"
			:ui="{ trigger: 'p-1', item: 'border-stone-200', content: 'px-3' }"
		>
			<template #default="{ item }">
				<h3 class="text-xl font-medium text-stone-800">{{ item.label }}</h3>
			</template>

			<template #1>
				<template v-if="isEn">
					<ProseP>Our factory specializes in producing many types of shirts, such as:</ProseP>
					<ul class="list-disc list-inside">
						<ProseLi>Crew-neck T-shirts</ProseLi>
						<ProseLi>Band T-shirts, vintage T-shirts, tie-dye T-shirts</ProseLi>
						<ProseLi>V-neck T-shirts</ProseLi>
						<ProseLi>Polo shirts</ProseLi>
						<ProseLi>Sportswear</ProseLi>
						<ProseLi>Corporate uniforms</ProseLi>
						<ProseLi>Caps</ProseLi>
						<ProseLi>Tote bags</ProseLi>
					</ul>
					<ProseP>If you have a special style or a custom design, send it to us for review!</ProseP>
				</template>
				<template v-else>
					<ProseP>โรงงานของเราเชี่ยวชาญในการผลิตเสื้อหลากหลายประเภท เช่น:</ProseP>
					<ul class="list-disc list-inside">
						<ProseLi>เสื้อคอกลม</ProseLi>
						<ProseLi>เสื้อวง เสื้อวินเทจ เสื้อมัดย้อม</ProseLi>
						<ProseLi>เสื้อคอวี</ProseLi>
						<ProseLi>เสื้อโปโล</ProseLi>
						<ProseLi>เสื้อกีฬา</ProseLi>
						<ProseLi>เสื้อยูนิฟอร์มสำหรับองค์กร</ProseLi>
						<ProseLi>หมวก</ProseLi>
						<ProseLi>กระเป๋าผ้า</ProseLi>
					</ul>
					<ProseP>หากคุณมีรูปแบบพิเศษหรือดีไซน์เฉพาะ สามารถส่งแบบมาให้เราตรวจสอบได้!</ProseP>
				</template>
			</template>

			<template #2>
				<ProseP v-if="isEn"
					>The minimum order starts at <span class="font-bold">100 - 250</span> pieces
					per order</ProseP
				>
				<ProseP v-else
					>การสั่งผลิตขั้นต่ำเริ่มต้นที่ <span class="font-bold">100 - 250</span> ตัว
					ต่อออเดอร์</ProseP
				>
			</template>

			<template #3>
				<ProseP v-if="isEn"
					>Custom shirt prices at Somsri start at 140 - 235 THB per piece for a minimum order of
					100 - 250 pieces</ProseP
				>
				<ProseP v-else
					>เรทราคาผลิตเสื้อกับสมศรีเริ่มต้นที่ 140 - 235 บาท ต่อการสั่งซื้อขั้นต่ำจำนวน
					100 - 250 ตัว</ProseP
				>
			</template>

			<template #4>
				<template v-if="isEn">
					<ProseP>We offer many fabric types, such as:</ProseP>
					<ul class="list-disc list-inside">
						<ProseLi>100% cotton</ProseLi>
						<ProseLi>Polyester</ProseLi>
						<ProseLi>Cotton-polyester blends</ProseLi>
						<ProseLi>Dry Fit fabric (ideal for sportswear)</ProseLi>
					</ul>
					<ProseP>Customers can choose the material that suits their needs and intended use!</ProseP>
				</template>
				<template v-else>
					<ProseP>เรามีเนื้อหาหลายรูปแบบ เช่น:</ProseP>
					<ul class="list-disc list-inside">
						<ProseLi>ผ้าคอตตอน 100%</ProseLi>
						<ProseLi>ผ้าโพลีเอสเตอร์</ProseLi>
						<ProseLi>ผ้าผสมคอตตอนและโพลีเอสเตอร์</ProseLi>
						<ProseLi>ผ้า Dry Fit (เหมาะสำหรับเสื้อกีฬา)</ProseLi>
					</ul>
					<ProseP>ลูกค้าสามารถเลือกวัสดุได้ตามความต้องการหรือการใช้งาน!</ProseP>
				</template>
			</template>

			<template #5>
				<template v-if="isEn">
					<ProseP
						>Once you have chosen your fabric, ordering with SomsriTshirt takes 4 steps:
					</ProseP>
					<ul class="list-decimal list-inside">
						<ProseLi>Send us your shirt design, print artwork, logo and preferred colors.</ProseLi>
						<ProseLi
							>Our graphic team drafts the design and sends you a mock-up to review,
							so you can check everything is correct and request pattern adjustments before actual production.</ProseLi
						>
						<ProseLi
							>After approval, production takes no more than 15 days
							(for urgent orders, please tell us the date you need the products).
							We deliver every order to you on time.</ProseLi
						>
						<ProseLi>Delivery, with a 90-day satisfaction guarantee on every piece.</ProseLi>
					</ul>
				</template>
				<template v-else>
					<ProseP
						>การสั่งผลิตกับสมศรีมีเสื้อหลังจากเลือกเนื้อผ้าที่ต้องการแล้วมี 4 Step ดังนี้
					</ProseP>
					<ul class="list-decimal list-inside">
						<ProseLi>ส่งแบบเสื้อ ลายสกรีน โลโก้และสีที่ต้องการ</ProseLi>
						<ProseLi
							>ทีมกราฟฟิกดราฟแบบ และส่งตัวอย่างให้ตรวจสอบ
							ได้เห็นสินค้าที่มีความถูกต้องพร้อมปรับแก้แพทเทิร์นชิ้นงานก่อนการลงผลิตจริง</ProseLi
						>
						<ProseLi
							>หลังอนุมัติแบบ ใช้เวลาผลิตไม่เกิน 15 วันในการผลิต
							(กรณีงานด่วนโปรดแจ้งวันที่ต้องการใช้สินค้า)
							เราสามารถจัดส่งสินค้าถึงมือลูกค้าได้ตรงตามเวลาทุกออเดอร์</ProseLi
						>
						<ProseLi>ส่งสินค้า พร้อมรับประกันความพึงพอใจ 90 วันทุกชิ้น</ProseLi>
					</ul>
				</template>
			</template>
		</UAccordion>
	</div>
</template>
