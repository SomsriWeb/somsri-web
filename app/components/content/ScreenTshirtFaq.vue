<script setup lang="ts">
	const { t } = useI18n({ useScope: 'local' })

	// VARIABLE
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
		{
			label: t("q6"),
			slot: "6" as const,
		},
		{
			label: t("q7"),
			slot: "7" as const,
		},
	])
</script>

<i18n lang="json">
{
	"th": {
		"q1": "รับสกรีนเสื้อ เทคนิคอะไรบ้าง?",
		"q2": "ปริมาณการสั่งผลิตและสกรีนเสื้อขั้นต่ำคือเท่าไหร่?",
		"q3": "ราคาในการสกรีนเสื้อเริ่มต้นที่เท่าไหร่?",
		"q4": "เนื้อผ้าที่ใช้ในการผลิตเสื้อมีอะไรบ้าง?",
		"q5": "ขั้นตอนการสั่งผลิตและสกรีนเสื้อ",
		"q6": "สามารถส่งแบบลายสกรีนมาเองได้หรือไม่?",
		"q7": "มีบริการจัดส่งทั่วประเทศไทยหรือไม่",
		"a1": {
			"intro": "เรามีเทคนิคการสกรีนหลากหลายให้เลือก:",
			"silkLabel": "สกรีนซิลค์สกรีน:",
			"silk": "เหมาะสำหรับออเดอร์จำนวนมาก",
			"dtgLabel": "สกรีน DTG (Direct-to-Garment):",
			"dtg": "เหมาะสำหรับลายที่มีสีสันซับซ้อน",
			"dtfLabel": "สกรีน DTF (Direct-to-Film):",
			"dtf": "ให้สีคมชัดและติดทนนาน",
			"flexLabel": "งานพิมพ์เฟล็กซ์ (Flex Printing):",
			"flex": "เหมาะสำหรับข้อความหรือลายที่เรียบง่าย"
		},
		"a2": {
			"before": "การสั่งผลิตขั้นต่ำเริ่มต้นที่",
			"after": "ตัว ต่อออเดอร์"
		},
		"a3": "เรทราคาสกรีนเสื้อกับสมศรีเริ่มต้นที่ 140 - 235 บาท ต่อการสั่งซื้อขั้นต่ำจำนวน 100 - 250 ตัว",
		"a4": {
			"intro": "เรามีเนื้อหาหลายรูปแบบ เช่น:",
			"cotton": "ผ้าคอตตอน 100%",
			"polyester": "ผ้าโพลีเอสเตอร์",
			"blend": "ผ้าผสมคอตตอนและโพลีเอสเตอร์",
			"dryFit": "ผ้า Dry Fit (เหมาะสำหรับเสื้อกีฬา)",
			"outro": "ลูกค้าสามารถเลือกวัสดุได้ตามความต้องการหรือการใช้งาน!"
		},
		"a5": {
			"intro": "การสั่งผลิตกับสมศรีมีเสื้อหลังจากเลือกเนื้อผ้าที่ต้องการแล้วมี 4 Step ดังนี้",
			"step1": "ส่งแบบเสื้อ ลายสกรีน โลโก้และสีที่ต้องการ",
			"step2": "ทีมกราฟฟิกดราฟแบบ และส่งตัวอย่างให้ตรวจสอบ ได้เห็นสินค้าที่มีความถูกต้องพร้อมปรับแก้แพทเทิร์นชิ้นงานก่อนการลงผลิตจริง",
			"step3": "หลังอนุมัติแบบ ใช้เวลาผลิตไม่เกิน 15 วันในการผลิต (กรณีงานด่วนโปรดแจ้งวันที่ต้องการใช้สินค้า) เราสามารถจัดส่งสินค้าถึงมือลูกค้าได้ตรงตามเวลาทุกออเดอร์",
			"step4": "ส่งสินค้า พร้อมรับประกันความพึงพอใจ 90 วันทุกชิ้น"
		},
		"a6": "ลูกค้าสามารถส่งไฟล์ดีไซน์ในรูปแบบ AI, PSD, หรือ PNG ความละเอียดสูง หรือหากไม่มีแบบ ทีมงานของเราสามารถช่วยออกแบบลายที่ตรงกับความต้องการของคุณได้",
		"a7": "เรามีบริการจัดส่งให้ถึงที่ ส่งตรงเวลา จัดส่งฟรีในพื้นที่กรุงเทพฯ"
	},
	"en": {
		"q1": "Which screen printing techniques do you offer?",
		"q2": "What is the minimum order quantity for printed shirts?",
		"q3": "How much does shirt screen printing cost?",
		"q4": "What fabrics do you use?",
		"q5": "How does the ordering and printing process work?",
		"q6": "Can I send you my own print design?",
		"q7": "Do you deliver nationwide in Thailand?",
		"a1": {
			"intro": "We offer a wide range of printing techniques:",
			"silkLabel": "Silk screen printing:",
			"silk": "ideal for large orders",
			"dtgLabel": "DTG (Direct-to-Garment) printing:",
			"dtg": "ideal for complex, multi-color designs",
			"dtfLabel": "DTF (Direct-to-Film) printing:",
			"dtf": "sharp, vivid colors that last",
			"flexLabel": "Flex printing:",
			"flex": "ideal for text and simple designs"
		},
		"a2": {
			"before": "Minimum orders start at",
			"after": "pieces per order"
		},
		"a3": "Screen printed shirts with SomsriTshirt start at 140 - 235 THB per piece, with a minimum order of 100 - 250 pieces.",
		"a4": {
			"intro": "We offer many fabric options, such as:",
			"cotton": "100% cotton",
			"polyester": "Polyester",
			"blend": "Cotton-polyester blend",
			"dryFit": "Dry Fit fabric (ideal for sportswear)",
			"outro": "Choose the material that best suits your needs and use!"
		},
		"a5": {
			"intro": "Once you have chosen your fabric, ordering with SomsriTshirt takes 4 steps:",
			"step1": "Send us your shirt design, print artwork, logo and preferred colors.",
			"step2": "Our graphic team drafts the design and sends you a sample to check, so you can review the product and adjust the pattern before mass production.",
			"step3": "After design approval, production takes no more than 15 days (for rush orders, please tell us the date you need the items). We deliver every order on time.",
			"step4": "Delivery, with a 90-day satisfaction guarantee on every piece."
		},
		"a6": "You can send your design files as AI, PSD or high-resolution PNG. No design yet? Our team can create artwork that matches exactly what you need.",
		"a7": "We deliver to your door, on time — with free delivery within Bangkok."
	}
}
</i18n>

<template>
	<div class="border border-stone-200 rounded-xl p-2">
		<UAccordion
			:items="data"
			:ui="{ trigger: 'p-1', item: 'border-stone-200', content: 'px-3' }"
		>
			<template #1>
				<ProseP>{{ t('a1.intro') }}</ProseP>
				<ul class="list-disc list-inside">
					<ProseLi><span class="font-bold">{{ t('a1.silkLabel') }}</span> {{ t('a1.silk') }}</ProseLi>
					<ProseLi><span class="font-bold">{{ t('a1.dtgLabel') }}</span> {{ t('a1.dtg') }}</ProseLi>
					<ProseLi><span class="font-bold">{{ t('a1.dtfLabel') }}</span> {{ t('a1.dtf') }}</ProseLi>
					<ProseLi><span class="font-bold">{{ t('a1.flexLabel') }}</span> {{ t('a1.flex') }}</ProseLi>
				</ul>
			</template>

			<template #2>
				<ProseP>{{ t('a2.before') }} <span class="font-bold">100 - 250</span> {{ t('a2.after') }}</ProseP>
			</template>

			<template #3>
				<ProseP>{{ t('a3') }}</ProseP>
			</template>

			<template #4>
				<ProseP>{{ t('a4.intro') }}</ProseP>
				<ul class="list-disc list-inside">
					<ProseLi>{{ t('a4.cotton') }}</ProseLi>
					<ProseLi>{{ t('a4.polyester') }}</ProseLi>
					<ProseLi>{{ t('a4.blend') }}</ProseLi>
					<ProseLi>{{ t('a4.dryFit') }}</ProseLi>
				</ul>
				<ProseP>{{ t('a4.outro') }}</ProseP>
			</template>

			<template #5>
				<ProseP>{{ t('a5.intro') }}</ProseP>
				<ul class="list-decimal list-inside">
					<ProseLi>{{ t('a5.step1') }}</ProseLi>
					<ProseLi>{{ t('a5.step2') }}</ProseLi>
					<ProseLi>{{ t('a5.step3') }}</ProseLi>
					<ProseLi>{{ t('a5.step4') }}</ProseLi>
				</ul>
			</template>

			<template #6>
				<ProseP>{{ t('a6') }}</ProseP>
			</template>

			<template #7>
				<ProseP>{{ t('a7') }}</ProseP>
			</template>
		</UAccordion>
	</div>
</template>
