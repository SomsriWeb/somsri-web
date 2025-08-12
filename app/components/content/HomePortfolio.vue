<script setup lang="ts">
	const imgs = [
		{
			alt: "โรงงานผลิตเสื้อพร้อมสกรีน",
			src: "/home/portfolio/1.jpg",
		},
		{
			alt: "ไม่มีไอเดียไม่เป็นไร เราออกแบบให้ได้",
			src: "/home/portfolio/2.jpg",
		},
		{
			alt: "เสื้อทีม เสื้อรุ่น งานปัก งานสกรีน",
			src: "/home/portfolio/3.jpg",
		},
		{
			alt: "รับผลิตเสื้อ และเรายังมีเทคนิคการสกรีนที่หลากหลาย",
			src: "/home/portfolio/4.jpg",
		},
		{
			alt: "ออกแบบและสั่งทำเสื้อของตัวเอง",
			src: "/home/portfolio/5.jpg",
		},
		{
			alt: "เทคนิคสกรีนเสื้อแบบยางที่นิยมกันอย่างแพร่หลาย",
			src: "/home/portfolio/6.jpg",
		},
		{
			alt: "ตัวอย่างงานสกรีนเสื้อ",
			src: "/home/portfolio/7.jpg",
		},
	]
</script>

<template>
	<div>
		<div class="mb-5">
			<slot name="title" />
			<slot name="description" />
		</div>

		<ClientOnly>
			<Vue3Marquee class="rounded-xl" :duration="40">
				<ProseImg
					v-for="img in imgs"
					:key="img.src"
					:src="img.src"
					:alt="img.alt"
					class="max-h-[17rem] object-cover"
				/>
			</Vue3Marquee>
		</ClientOnly>
	</div>
</template>
