<script setup lang="ts">
	import MinimumModal from "../WhyYouShouldChooseSomsri/Minimum.vue"
	import PerfectDesignModal from "../WhyYouShouldChooseSomsri/PerfectDesign.vue"
	import GuaranteeModal from "../WhyYouShouldChooseSomsri/Guarantee.vue"
	import FreeShippingModal from "../WhyYouShouldChooseSomsri/FreeShipping.vue"

	interface Content {
		title: string
		description: string
		image: string
		modalFn: () => void
	}

	// VARIABLE
	const minimumModalState = ref<boolean>(false)
	const perfectDesignModalState = ref<boolean>(false)
	const guaranteeModalState = ref<boolean>(false)
	const freeShippingModalState = ref<boolean>(false)
	const content: Content[] = [
		{
			title: "ออกแบบได้ตามความต้องการของลูกค้า",
			description: "ไม่ว่าคุณจะมีแค่โลโก้ หรือรูปภาพสมศรีพร้อมออกแบบลายสกรีนเสื้อให้ฟรี",
			image: "/why-you-should-choose-somsri/paint-brush.png",
			modalFn: openPerfectDesignModal,
		},
		{
			title: "การันตีงานคุณภาพ ตรงต่อเวลา",
			description: "ส่งตรงเวลารับประกันสินค้า 90 วัน",
			image: "/why-you-should-choose-somsri/clock.png",
			modalFn: openGuaranteeModal,
		},
		{
			title: "จัดส่งฟรี!",
			description: "จัดส่งสินค้าฟรีในกรุงเทพมหานครฯ",
			image: "/why-you-should-choose-somsri/delivery-car.png",
			modalFn: openFreeShippingModal,
		},
		{
			title: "ขั้นต่ำเพียงแค่ 100 ตัว",
			description:
				"สั่งผลิตน้อยไม่ใช่ปัญหา แค่ 100 ตัวเราก็รับผลิต **ยกเว้นเสื้อโปโลขั้นต่ำเพียงแค่ 50 ตัว",
			image: "/why-you-should-choose-somsri/min-order.png",
			modalFn: openMinimumModal,
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

	// FUNCTION
	function openMinimumModal() {
		minimumModalState.value = true
	}

	function openPerfectDesignModal() {
		perfectDesignModalState.value = true
	}

	function openGuaranteeModal() {
		guaranteeModalState.value = true
	}

	function openFreeShippingModal() {
		freeShippingModalState.value = true
	}
</script>

<template>
	<div>
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
						@click="item.modalFn()"
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

		<MinimumModal v-model:open="minimumModalState" />
		<PerfectDesignModal v-model:open="perfectDesignModalState" />
		<GuaranteeModal v-model:open="guaranteeModalState" />
		<FreeShippingModal v-model:open="freeShippingModalState" />
	</div>
</template>
