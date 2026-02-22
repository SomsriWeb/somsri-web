<script setup lang="ts">
	// PROPS
	interface Props {
		image: string
		/** รูปด้านหลัง (ถ้ามี จะแสดงการ์ดซ้อน 2 ภาพ + ปุ่มสลับ) */
		imageBack?: string
		alt?: string
		altBack?: string
		titleAsTag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
	}
	const { image, imageBack, alt = "", altBack, titleAsTag = "h1" } = defineProps<Props>()

	const carouselItems = computed(() =>
		imageBack
			? [
					{ src: image, alt },
					{ src: imageBack, alt: altBack ?? alt },
				]
			: [],
	)
</script>

<template>
	<Container class="bg-primary pt-12 lg:pt-24" no-space>
		<!-- ส่วนบน: grid 2 คอลัมน์ (ข้อความ + รูป) -->
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
			<div class="text-white">
				<component
					:is="titleAsTag"
					class="font-bold text-7xl text-center md:text-left leading-none"
					><slot name="title" mdc-unwrap="p"
				/></component>
				<p
					v-if="$slots['secondary-title']"
					class="font-bold font-stretch-condensed text-2xl text-center md:text-left leading-none"
				>
					<slot name="secondary-title" mdc-unwrap="p" />
				</p>
				<p
					v-if="$slots.description"
					class="font-light text-2xl text-center md:text-left leading-none"
					name="description"
					mdc-unwrap="p"
				>
					<slot name="description" mdc-unwrap="p" />
				</p>

				<div v-if="$slots.default" class="mt-3">
					<slot />
				</div>

				<div class="mt-3 flex justify-center md:justify-start">
					<slot name="cta">
						<LineLink>
							<UButton color="neutral">ปรึกษาฟรี</UButton>
						</LineLink>
					</slot>
				</div>
			</div>
			<!-- การ์ดรูป: Carousel 2 ภาพ + dots -->
			<div v-if="imageBack" class="relative flex flex-col items-center pb-10">
				<UCarousel
					v-slot="{ item }"
					:items="carouselItems"
					dots
					loop
					:autoplay="{ delay: 3000 }"
					:ui="{
						root: 'w-3/4 mx-auto',
						dot: 'bg-white/80 data-[state=active]:bg-white',
						dots: 'absolute inset-x-0 -bottom-8 flex justify-center gap-2',
					}"
				>
					<div class="aspect-square w-full overflow-hidden rounded-lg shadow-lg">
						<ProseImg
							:src="item.src"
							:alt="item.alt"
							class="block w-full h-full object-cover"
						/>
					</div>
				</UCarousel>
			</div>
			<ProseImg
				v-else
				:src="image"
				:alt="alt"
				class="rounded-xl aspect-square object-cover lg:aspect-auto lg:object-contain"
			/>
		</div>

		<!-- ส่วนล่าง (ถ้ามี): ไอคอนกลาง + บล็อกข้อความเต็มความกว้าง -->
		<template v-if="$slots['below-hero-icon'] || $slots['below-hero-intro']">
			<div v-if="$slots['below-hero-intro']" class="mt-4 w-full text-white text-center lg:text-left">
				<slot name="below-hero-intro" mdc-unwrap="p" />
			</div>
		</template>
	</Container>
</template>
