<script setup lang="ts">
	interface Content {
		title: string
		description: string
		image: string
	}

	// VARIABLE
	const content: Content[] = [
		{
			title: "ออกแบบได้ตามความต้องการของลูกค้า",
			description: "ไม่ว่าคุณจะมีแค่โลโก้ หรือรูปภาพสมศรีพร้อมออกแบบลายสกรีนเสื้อให้ฟรี",
			image: "/why-you-should-choose-somsri/paint-brush.png",
		},
		{
			title: "การันตีงานคุณภาพ ตรงต่อเวลา",
			description: "ส่งตรงเวลารับประกันสินค้า 90 วัน",
			image: "/why-you-should-choose-somsri/clock.png",
		},
		{
			title: "จัดส่งฟรี!",
			description: "จัดส่งสินค้าฟรีในกรุงเทพมหานครฯ",
			image: "/why-you-should-choose-somsri/delivery-car.png",
		},
		{
			title: "ขั้นต่ำเพียงแค่ 100 ตัว",
			description:
				"สั่งผลิตน้อยไม่ใช่ปัญหา แค่ 100 ตัวเราก็รับผลิต **ยกเว้นเสื้อโปโลขั้นต่ำเพียงแค่ 50 ตัว",
			image: "/why-you-should-choose-somsri/min-order.png",
		},
	]
	const containerRef = ref(null)
	const swiper = useSwiper(containerRef, {
		loop: true,
		slidesPerView: 4,
		spaceBetween: 30,
		autoplay: {
			delay: 2500,
			disableOnInteraction: false,
		},
	})
</script>

<template>
	<div class="px-[4.6rem] py-[3rem]">
		<h2 class="text-primary text-[4rem] leading-none font-bold mb-5">
			สั่งผลิตเสื้อกับสมศรีดียังไง?
		</h2>

		<ClientOnly>
			<swiper-container ref="containerRef" class="mb-5 grid auto-rows-fr">
				<swiper-slide v-for="item in content" :key="item.title">
					<InformationCard
						:title="item.title"
						:description="item.description"
						:image="item.image"
					/>
				</swiper-slide>
			</swiper-container>
		</ClientOnly>

		<div class="flex justify-end gap-5">
			<UButton
				color="neutral"
				variant="outline"
				icon="lucide:chevron-left"
				class="rounded-full !min-w-fit"
				@click="swiper.prev()"
			/>
			<UButton
				color="neutral"
				variant="outline"
				icon="lucide:chevron-right"
				class="rounded-full !min-w-fit"
				@click="swiper.next()"
			/>
		</div>
	</div>
</template>
