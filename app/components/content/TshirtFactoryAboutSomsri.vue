<script setup lang="ts">
	// VARIABLE
	const { t } = useI18n({ useScope: "local" })
	const data = computed(() => [0, 1, 2].map((i) => ({ text: t(`items.${i}`) })))
</script>

<i18n lang="json">
{
	"th": {
		"items": [
			"“สมศรีมีเสื้อ” เราเป็นโรงงานผลิตเสื้อยืดครบบวงจรที่มีประสบการณ์มากมายเรื่องเสื้อ ตั้งแต่ขั้นตอนการผลิตเสื้อ ออกแบบเสื้อ สกรีนเสื้อและปักเสื้อ",
			"นอกจากเป็นโรงงานผลิตเสื้อแล้ว ทางเรายังมีสินค้าพรีเมี่ยมอีกหลากหลายชนิด ที่คุณสามารถสั่งทำได้ ไม่ว่าจะเป็น เสื้อโปโล เสื้อกีฬา หน้ากาก กระเป๋าผ้า หมวก และสินค้าอื่น ๆ อย่างปลอกหมอน และปลอกหมอนข้าง",
			"ลูกค้าที่สั่งผลิตเสื้อกับเราจึงมั่นใจได้ว่าสินค้าของคุณจะออกมาสวยงาม ถูกต้องตามแบบ สกรีนแน่น ทนทานต่อการซัก ส่งต่อความมั่นใจในทุกวันที่สวมใส่ ซึ่งโรงงานผลิตเสื้อผ้าของเราก็มีขั้นตอนการสั่งซื้อที่แสนสะดวกและรวดเร็ว เพียงไม่กี่ขั้นตอนก็รอรับเสื้อสุดมีสไตล์ไปใส่กันได้เลย"
		]
	},
	"en": {
		"items": [
			"SomsriTshirt is a full-service T-shirt factory with extensive experience in every step of apparel production: manufacturing, design, screen printing and embroidery.",
			"Beyond shirt production, we also make a wide range of custom premium products, including polo shirts, sportswear, face masks, tote bags, caps, and other items such as pillowcases and bolster covers.",
			"When you produce your shirts with us, you can be confident they will look great, match your design exactly, and feature durable, wash-resistant prints you can wear with confidence every day. Our ordering process is quick and easy, so in just a few steps your stylish custom shirts are on their way."
		]
	}
}
</i18n>

<template>
	<div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
		<div v-for="item in data" :key="item.text" class="bg-primary rounded-xl p-3">
			<p class="text-lg text-white">{{ item.text }}</p>
		</div>
	</div>
</template>
