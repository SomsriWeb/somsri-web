<script setup lang="ts">
	const { t } = useI18n({ useScope: "local" })

	// VARIALBE
	const images = [
		"/produce-tshirt/hiden.png",
		"/produce-tshirt/fade.png",
		"/produce-tshirt/puff.png",
		"/produce-tshirt/dft.png",
		"/produce-tshirt/dtg.png",
		"/produce-tshirt/diamond.png",
		"/produce-tshirt/neon.png",
		"/produce-tshirt/reflect.png",
		"/produce-tshirt/hologram.png",
		"/produce-tshirt/gold-silver.png",
	]
	const items = computed(() =>
		images.map((image, i) => ({
			title: t(`items.${i}.title`),
			advantage: t(`items.${i}.advantage`),
			disadvantage: t(`items.${i}.disadvantage`),
			price: t(`items.${i}.price`),
			image,
		})),
	)
</script>

<i18n lang="json">
{
    "th": {
        "items": [
            {
                "title": "3. สกรีนไฮเดน (Hiden)",
                "advantage": "งานสกรีนไฮเดนสันนูนเกรดพรีเมี่ยม คมชัด ติดทน",
                "disadvantage": "ไม่เหมาะกับงานลายละเอียดเล็ก",
                "price": "ราคา 35 บาท/จุด"
            },
            {
                "title": "4. สกรีนไล่สี",
                "advantage": "เทคนิคไล่สี ใช้เทคนิคง่ายๆ คือการ ไล่สีโดย การเอาสีมาผสมกัน",
                "disadvantage": "เนื่องจากเป็นการสกรีนไล่สีทีละ ตัว สีที่เกิดจากการสกรีนมีโอกาสไม่เหมือน กันหมดทุกตัว (แนะนำ DFT จะไล่สีได้เหมือน กันทุกตัว)",
                "price": "ราคา 10 บาท/จุด"
            },
            {
                "title": "5. สกรีนนูน",
                "advantage": "ติดทนดีมาก",
                "disadvantage": "จำกัดการนูนของแต่ละสี เช่น 1 ลาย มี 2 สี จะมีแค่สีเดียวที่สามารถนูนได้",
                "price": "ราคา 10 บาท/จุด"
            },
            {
                "title": "6. สกรีน DFT",
                "advantage": "เหมาะกับงานที่มีรายละเอียดสูง ใช้ได้ กับทุกเนื้อผ้า ไม่จำกัดสี จำนวนน้อยสามารถ ทำได้",
                "disadvantage": "เมื่อรีดลายสกรีนลงเนื้อผ้าแล้วจะ ปิดทึบ ไม่มีรูระบาย ทำให้ระบายอากาศได้ยาก",
                "price": "ราคาตามตาราง (คลิกเพื่อดูราคา)"
            },
            {
                "title": "7. สกรีน DTG",
                "advantage": "งานพิมพ์มีรายละเอียดสูง หมึกซึมลง ในเส้นใยผ้า ระบายอากาศได้ดี",
                "disadvantage": "พิมพ์ลงผ้าที่มีส่วนผสม Polyester ไม่ได้ ไม่เหมาะกับงานจำนวนเยอะเนื่อง จากต้นทุนสูง",
                "price": "ต้องนำลายมาประเมินราคา"
            },
            {
                "title": "8. สกรีนกากเพชร",
                "advantage": "นำมาผสมผสานกับเทคนิคการสกรีน ในรูปแบบต่างๆ ทำให้งานพิมพ์มีความหรูหรา ระยิบระยับ โดดเด่น สะดุดตา",
                "disadvantage": "กากเพชรอาจมีผงหลุดออกมา เล็กน้อย",
                "price": "ราคา 15 บาท/สี"
            },
            {
                "title": "9. สกรีนสีเรืองแสง",
                "advantage": "เรืองแสงทันทีที่ปิดไฟ เรืองแสง ทั่ว ลายสกรีนทั้งหมดสม่ำเสมอ",
                "disadvantage": "ไม่มี",
                "price": "ราคา 20 บาท/สี"
            },
            {
                "title": "10. สกรีนสีสะท้อนแสง",
                "advantage": "มีลักษณะเด่นชัดต่อเมื่ออยู่กลางแสง แดด หรือหากเป้นเวลากลางคืนนั้นจะมอง เห็นได้ดีก็ต่อเมื่อเราฉายแสงไฟ",
                "disadvantage": "ไม่มี",
                "price": "ราคา 20 บาท/สี"
            },
            {
                "title": "11. สกรีนโฮโลแกรม",
                "advantage": "งานคุณภาพ ติดทนนาน ไม่หลุด",
                "disadvantage": "ราคาสูง",
                "price": "ต้องนำลายมาประเมินราคา"
            },
            {
                "title": "12. สกรีนฟรอยด์เงิน/ทอง",
                "advantage": "งานสกรีนจะมีความเงางาม สวยงาม",
                "disadvantage": "ความเงางามของฟอยล์จะอยู่ไม่ทนมากหลังการซักใช้งานหลาย ๆ ครั้ง และอาจมีการหลุดลอกเล็กน้อยเมื่อใช้งานไปนาน ๆ",
                "price": "ราคา 15 บาท/จุด"
            }
        ],
        "advantageLabel": "ข้อดี:",
        "disadvantageLabel": "ข้อจำกัด:",
        "note": "หมายเหตุ 100 ตัวขึ้นไป (ลายเดียวกัน) ฟรีบล็อคสกรีน 3 บล็อค มูลค่า 900 บาท หากมีบล็อคเพิ่มเติม ราคาบล็อคละ 300 บาท ยกเว้น สกรีน DFT 100 ตัว สามารถคละลายได้ไม่เสียค่าบล็อคเพิ่ม"
    },
    "en": {
        "items": [
            {
                "title": "3. High-Density (Hiden) Screen Printing",
                "advantage": "Premium raised high-density print — sharp and long-lasting.",
                "disadvantage": "Not suitable for very small, detailed designs.",
                "price": "Price: 35 THB per print"
            },
            {
                "title": "4. Gradient Screen Printing",
                "advantage": "Creates color gradients by blending inks together on the screen.",
                "disadvantage": "Each shirt is printed one by one, so the gradient may vary slightly from piece to piece (choose DFT if you need an identical gradient on every shirt).",
                "price": "Price: 10 THB per print"
            },
            {
                "title": "5. Puff (Raised) Screen Printing",
                "advantage": "Excellent durability.",
                "disadvantage": "Raised effect is limited per design — e.g. in a 2-color design only one color can be raised.",
                "price": "Price: 10 THB per print"
            },
            {
                "title": "6. DFT Printing",
                "advantage": "Great for highly detailed designs, works on every fabric, unlimited colors, and suits small quantities.",
                "disadvantage": "Once heat-pressed, the print forms a solid, non-porous layer, so it is less breathable.",
                "price": "Price as per table (click to view prices)"
            },
            {
                "title": "7. DTG Printing",
                "advantage": "High-detail printing; the ink soaks into the fibers, so the print stays breathable.",
                "disadvantage": "Cannot print on fabrics containing polyester, and is not cost-effective for large runs due to the high cost.",
                "price": "Price quoted based on your design"
            },
            {
                "title": "8. Glitter Screen Printing",
                "advantage": "Combined with other screen-printing techniques for a luxurious, sparkling, eye-catching finish.",
                "disadvantage": "A small amount of glitter may shed.",
                "price": "Price: 15 THB per color"
            },
            {
                "title": "9. Glow-in-the-Dark Screen Printing",
                "advantage": "Glows the moment the lights go off, evenly across the whole design.",
                "disadvantage": "None",
                "price": "Price: 20 THB per color"
            },
            {
                "title": "10. Reflective Screen Printing",
                "advantage": "Stands out in bright sunlight, and at night it is clearly visible whenever light shines on it.",
                "disadvantage": "None",
                "price": "Price: 20 THB per color"
            },
            {
                "title": "11. Hologram Screen Printing",
                "advantage": "High quality, long-lasting and won't peel.",
                "disadvantage": "Higher price.",
                "price": "Price quoted based on your design"
            },
            {
                "title": "12. Silver/Gold Foil Printing",
                "advantage": "Gives the print a glossy, eye-catching metallic finish.",
                "disadvantage": "The foil's shine fades after many washes, and it may peel slightly with long-term use.",
                "price": "Price: 15 THB per print"
            }
        ],
        "advantageLabel": "Pros:",
        "disadvantageLabel": "Limitations:",
        "note": "Note: For 100 pieces or more (same design), you get 3 screen blocks free (worth 900 THB). Additional blocks cost 300 THB each. Exception: with DFT printing, 100 pieces can mix different designs at no extra block fee."
    }
}
</i18n>

<template>
	<div>
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
			<Card v-for="item in items" :key="item.title" class="shadow">
				<ProseH3 class="text-center">{{ item.title }}</ProseH3>
				<ProseImg :src="item.image" class="rounded-lg aspect-square object-cover" />
				<div>
					<ProseP class="!text-primary leading-none">{{ t("advantageLabel") }} {{ item.advantage }}</ProseP>
					<ProseP class="!text-primary leading-none"
						>{{ t("disadvantageLabel") }} {{ item.disadvantage }}</ProseP
					>
				</div>
			</Card>
		</div>
		<ProseP class="text-center text-lg !text-primary">
			{{ t("note") }}
		</ProseP>
	</div>
</template>
