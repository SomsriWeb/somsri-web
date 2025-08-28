<script setup lang="ts">
	import MinimumModal from "../WhyYouShouldChooseSomsri/Minimum.vue"
	import PerfectDesignModal from "../WhyYouShouldChooseSomsri/PerfectDesign.vue"
	import GuaranteeModal from "../WhyYouShouldChooseSomsri/Guarantee.vue"
	import FreeShippingModal from "../WhyYouShouldChooseSomsri/FreeShipping.vue"

	// VARIABLE
	const minimumModalState = ref<boolean>(false)
	const perfectDesignModalState = ref<boolean>(false)
	const guaranteeModalState = ref<boolean>(false)
	const freeShippingModalState = ref<boolean>(false)

	const { data: content } = await useAsyncData("why-you-should-choose-somsri", () =>
		queryCollection("whyYouShouldChooseSomsri").order("order", "ASC").all()
	)

	const containerRef = ref(null)
	const swiper = useSwiper(containerRef, {
		loop: true,
		slidesPerView: 4,
		spaceBetween: 30,
		autoplay: {
			delay: 2500,
			disableOnInteraction: false,
		},
		breakpoints: {
			0: {
				slidesPerView: 1,
			},
			640: {
				slidesPerView: 2,
			},
			1280: {
				slidesPerView: 4,
			},
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

	function openItemModal(uid: string) {
		if (uid === "perfect-design") {
			openPerfectDesignModal()
		} else if (uid === "guarantee") {
			openGuaranteeModal()
		} else if (uid === "free-shipping") {
			openFreeShippingModal()
		} else if (uid === "minimum") {
			openMinimumModal()
		}
	}
</script>

<template>
	<div>
		<h2 class="text-primary text-4xl leading-none font-bold mb-5">
			สั่งผลิตเสื้อกับสมศรีดียังไง?
		</h2>

		<ClientOnly>
			<swiper-container ref="containerRef" class="mb-5 grid auto-rows-fr">
				<swiper-slide v-for="item in content" :key="item.title">
					<InformationCard
						:title="item.title"
						:description="item.description"
						:image="item.image"
						@click="openItemModal(item.uid)"
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
