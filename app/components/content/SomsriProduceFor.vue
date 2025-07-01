<template>
	<div class="grid grid-cols-2 gap-5 px-[4.6rem] py-[3rem]">
		<div>
			<h2 class="text-primary text-6xl leading-none font-bold">สมศรีผลิตให้กับใครบ้าง</h2>
			<p class="text-stone-500 font-light text-xl">
				หลากหลายแบรนด์ไว้วางใจให้สมศรีมีเสื้อผลิตสินค้าต่าง ๆ ไม่ว่าจะเป็นเสื้อยืด เสื้อโปโล
				เสื้อกีฬา และสินค้าอื่น ๆ
			</p>
		</div>

		<ClientOnly>
			<Vue3Marquee :duration="50" class="rounded-xl">
				<img src="/somsri-collaborators/brand-1.png" alt="brand" />
				<img src="/somsri-collaborators/brand-2.png" alt="brand" />
				<img src="/somsri-collaborators/brand-3.png" alt="brand" />
			</Vue3Marquee>
		</ClientOnly>
	</div>
</template>
