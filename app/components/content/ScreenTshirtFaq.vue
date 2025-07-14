<script setup lang="ts">
	// VARIABLE
	const data = [
		{
			label: "รับสกรีนเสื้อ เทคนิคอะไรบ้าง?",
			slot: "1" as const,
		},
		{
			label: "ปริมาณการสั่งผลิตและสกรีนเสื้อขั้นต่ำคือเท่าไหร่?",
			slot: "2" as const,
		},
		{
			label: "ราคาในการสกรีนเสื้อเริ่มต้นที่เท่าไหร่?",
			slot: "3" as const,
		},
		{
			label: "เนื้อผ้าที่ใช้ในการผลิตเสื้อมีอะไรบ้าง?",
			slot: "4" as const,
		},
		{
			label: "ขั้นตอนการสั่งผลิตและสกรีนเสื้อ",
			slot: "5" as const,
		},
		{
			label: "สามารถส่งแบบลายสกรีนมาเองได้หรือไม่?",
			slot: "6" as const,
		},
		{
			label: "มีบริการจัดส่งทั่วประเทศไทยหรือไม่",
			slot: "7" as const,
		},
	]
</script>
<template>
	<div class="border border-stone-200 rounded-xl p-2">
		<UAccordion
			:items="data"
			:ui="{ trigger: 'p-1', item: 'border-stone-200', content: 'px-3' }"
		>
			<template #1>
				<ProseP>เรามีเทคนิคการสกรีนหลากหลายให้เลือก:</ProseP>
				<ul class="list-disc list-inside">
					<ProseLi
						><span class="font-bold">สกรีนซิลค์สกรีน:</span>
						เหมาะสำหรับออเดอร์จำนวนมาก</ProseLi
					>
					<ProseLi
						><span class="font-bold">สกรีน DTG (Direct-to-Garment):</span>
						เหมาะสำหรับลายที่มีสีสันซับซ้อน</ProseLi
					>
					<ProseLi
						><span class="font-bold">สกรีน DTF (Direct-to-Film):</span>
						ให้สีคมชัดและติดทนนาน</ProseLi
					>
					<ProseLi
						><span class="font-bold">งานพิมพ์เฟล็กซ์ (Flex Printing):</span>
						เหมาะสำหรับข้อความหรือลายที่เรียบง่าย</ProseLi
					>
				</ul>
			</template>

			<template #2>
				<ProseP
					>การสั่งผลิตขั้นต่ำเริ่มต้นที่ <span class="font-bold">100 - 250</span> ตัว
					ต่อออเดอร์</ProseP
				>
			</template>

			<template #3>
				<ProseP
					>เรทราคาสกรีนเสื้อกับสมศรีเริ่มต้นที่ 140 - 235 บาท ต่อการสั่งซื้อขั้นต่ำจำนวน
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

			<template #6>
				<ProseP
					>ลูกค้าสามารถส่งไฟล์ดีไซน์ในรูปแบบ AI, PSD, หรือ PNG ความละเอียดสูง
					หรือหากไม่มีแบบ ทีมงานของเราสามารถช่วยออกแบบลายที่ตรงกับความต้องการของคุณได้
				</ProseP>
			</template>

			<template #7>
				<ProseP>เรามีบริการจัดส่งให้ถึงที่ ส่งตรงเวลา จัดส่งฟรีในพื้นที่กรุงเทพฯ </ProseP>
			</template>
		</UAccordion>
	</div>
</template>
