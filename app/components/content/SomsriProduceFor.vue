<template>
	<div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
		<div>
			<h2 class="text-primary text-5xl md:text-6xl leading-none font-bold">
				<slot name="title" mdc-unwrap="p">สมศรีผลิตให้กับใครบ้าง</slot>
			</h2>
			<p class="text-stone-500 font-light text-xl">
				<slot name="description" mdc-unwrap="p"
					>หลากหลายแบรนด์ไว้วางใจให้สมศรีมีเสื้อผลิตสินค้าต่าง ๆ ไม่ว่าจะเป็นเสื้อยืด
					เสื้อโปโล เสื้อกีฬา และสินค้าอื่น ๆ</slot
				>
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
