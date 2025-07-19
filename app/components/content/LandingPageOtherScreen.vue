<script setup lang="ts">
	// VARIALBE
	const items = [
		{
			title: "3. สกรีนไฮเดน (Hiden)",
			advantage: "งานสกรีนไฮเดนสันนูนเกรดพรีเมี่ยม คมชัด ติดทน",
			disadvantage: "ไม่เหมาะกับงานลายละเอียดเล็ก",
			price: "ราคา 35 บาท/จุด",
			image: "/produce-tshirt/hiden.png",
		},
		{
			title: "4. สกรีนไล่สี",
			advantage: "เทคนิคไล่สี ใช้เทคนิคง่ายๆ คือการ ไล่สีโดย การเอาสีมาผสมกัน",
			disadvantage:
				"เนื่องจากเป็นการสกรีนไล่สีทีละ ตัว สีที่เกิดจากการสกรีนมีโอกาสไม่เหมือน กันหมดทุกตัว (แนะนำ DFT จะไล่สีได้เหมือน กันทุกตัว)",
			image: "/produce-tshirt/fade.png",
			price: "ราคา 10 บาท/จุด",
		},
		{
			title: "5. สกรีนนูน",
			advantage: "ติดทนดีมาก",
			disadvantage: "จำกัดการนูนของแต่ละสี เช่น 1 ลาย มี 2 สี จะมีแค่สีเดียวที่สามารถนูนได้",
			image: "/produce-tshirt/puff.png",
			price: "ราคา 10 บาท/จุด",
		},
		{
			title: "6. สกรีน DFT",
			advantage:
				"เหมาะกับงานที่มีรายละเอียดสูง ใช้ได้ กับทุกเนื้อผ้า ไม่จำกัดสี จำนวนน้อยสามารถ ทำได้",
			disadvantage:
				"เมื่อรีดลายสกรีนลงเนื้อผ้าแล้วจะ ปิดทึบ ไม่มีรูระบาย ทำให้ระบายอากาศได้ยาก",
			image: "/produce-tshirt/dft.png",
			price: "ราคาตามตาราง (คลิกเพื่อดูราคา)",
		},
		{
			title: "7. สกรีน DTG",
			advantage: "งานพิมพ์มีรายละเอียดสูง หมึกซึมลง ในเส้นใยผ้า ระบายอากาศได้ดี",
			disadvantage:
				"พิมพ์ลงผ้าที่มีส่วนผสม Polyester ไม่ได้ ไม่เหมาะกับงานจำนวนเยอะเนื่อง จากต้นทุนสูง",
			image: "/produce-tshirt/dtg.png",
			price: "ต้องนำลายมาประเมินราคา",
		},
		{
			title: "8. สกรีนกากเพชร",
			advantage:
				"นำมาผสมผสานกับเทคนิคการสกรีน ในรูปแบบต่างๆ ทำให้งานพิมพ์มีความหรูหรา ระยิบระยับ โดดเด่น สะดุดตา",
			disadvantage: "กากเพชรอาจมีผงหลุดออกมา เล็กน้อย",
			image: "/produce-tshirt/diamond.png",
			price: "ราคา 15 บาท/สี",
		},
		{
			title: "9. สกรีนสีเรืองแสง",
			advantage: "เรืองแสงทันทีที่ปิดไฟ เรืองแสง ทั่ว ลายสกรีนทั้งหมดสม่ำเสมอ",
			disadvantage: "ไม่มี",
			image: "/produce-tshirt/neon.png",
			price: "ราคา 20 บาท/สี",
		},
		{
			title: "10. สกรีนสีสะท้อนแสง",
			advantage:
				"มีลักษณะเด่นชัดต่อเมื่ออยู่กลางแสง แดด หรือหากเป้นเวลากลางคืนนั้นจะมอง เห็นได้ดีก็ต่อเมื่อเราฉายแสงไฟ",
			disadvantage: "ไม่มี",
			image: "/produce-tshirt/reflect.png",
			price: "ราคา 20 บาท/สี",
		},
		{
			title: "11. สกรีนโฮโลแกรม",
			advantage: "งานคุณภาพ ติดทนนาน ไม่หลุด",
			disadvantage: "ราคาสูง",
			image: "/produce-tshirt/hologram.png",
			price: "ต้องนำลายมาประเมินราคา",
		},
		{
			title: "12. สกรีนฟรอยด์เงิน/ทอง",
			advantage: "งานสกรีนจะมีความเงางาม สวยงาม",
			disadvantage:
				"ความเงางามของฟอยล์จะอยู่ไม่ทนมากหลังการซักใช้งานหลาย ๆ ครั้ง และอาจมีการหลุดลอกเล็กน้อยเมื่อใช้งานไปนาน ๆ",
			image: "/produce-tshirt/gold-silver.png",
			price: "ราคา 15 บาท/จุด",
		},
	]
</script>

<template>
	<div>
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
			<Card v-for="item in items" :key="item.title" class="shadow">
				<ProseH3 class="text-center">{{ item.title }}</ProseH3>
				<ProseImg :src="item.image" class="rounded-lg aspect-square object-cover" />
				<div>
					<ProseP class="!text-primary leading-none">ข้อดี: {{ item.advantage }}</ProseP>
					<ProseP class="!text-primary leading-none"
						>ข้อจำกัด: {{ item.disadvantage }}</ProseP
					>
				</div>
			</Card>
		</div>
		<ProseP class="text-center text-lg !text-primary">
			หมายเหตุ 100 ตัวขึ้นไป (ลายเดียวกัน) ฟรีบล็อคสกรีน 3 บล็อค มูลค่า 900 บาท
			หากมีบล็อคเพิ่มเติม ราคาบล็อคละ 300 บาท ยกเว้น สกรีน DFT 100 ตัว
			สามารถคละลายได้ไม่เสียค่าบล็อคเพิ่ม
		</ProseP>
	</div>
</template>
