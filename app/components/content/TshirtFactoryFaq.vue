<script setup lang="ts">
	// VARIABLE
	const data = [
		{
			label: "สมศรีมีเสื้อ รับผลิตเสื้อ ประเภทใดได้บ้าง?",
			slot: "1" as const,
		},
		{
			label: "ปริมาณการสั่งผลิตเสื้อขั้นต่ำคือเท่าไหร่?",
			slot: "2" as const,
		},
		{
			label: "ราคาในการผลิตเสื้อเริ่มต้นที่เท่าไหร่?",
			slot: "3" as const,
		},
		{
			label: "เนื้อผ้าที่ใช้ในการผลิตเสื้อมีอะไรบ้าง?",
			slot: "4" as const,
		},
		{
			label: "ขั้นตอนการสั่งผลิตเสื้อ",
			slot: "5" as const,
		},
	]
</script>
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

			<template #2>
				<ProseP
					>การสั่งผลิตขั้นต่ำเริ่มต้นที่ <span class="font-bold">100 - 250</span> ตัว
					ต่อออเดอร์</ProseP
				>
			</template>

			<template #3>
				<ProseP
					>เรทราคาผลิตเสื้อกับสมศรีเริ่มต้นที่ 140 - 235 บาท ต่อการสั่งซื้อขั้นต่ำจำนวน
					100 - 250 ตัว</ProseP
				>
			</template>

			<template #4>
				<ProseP>เรามีเนื้อหาหลายรูปแบบ เช่น:</ProseP>
				<ul class="list-disc list-inside">
					<ProseLi>ผ้าคอตตอน 100%</ProseLi>
					<ProseLi>ผ้าโพลีเอสเตอร์</ProseLi>
					<ProseLi>ผ้าผสมคอตตอนและโพลีเอสเตอร์</ProseLi>
					<ProseLi>ผ้า Dry Fit (เหมาะสำหรับเสื้อกีฬา)</ProseLi>
				</ul>
				<ProseP>ลูกค้าสามารถเลือกวัสดุได้ตามความต้องการหรือการใช้งาน!</ProseP>
			</template>

			<template #5>
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
		</UAccordion>
	</div>
</template>
