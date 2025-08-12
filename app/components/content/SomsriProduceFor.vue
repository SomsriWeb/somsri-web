<template>
	<div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
		<div>
			<slot name="title"><ProseH2>สมศรีผลิตให้กับใครบ้าง </ProseH2></slot>
			<slot name="description"
				><ProseP
					>หลากหลายแบรนด์ไว้วางใจให้สมศรีมีเสื้อผลิตสินค้าต่าง ๆ ไม่ว่าจะเป็นเสื้อยืด
					เสื้อโปโล เสื้อกีฬา และสินค้าอื่น ๆ</ProseP
				>
			</slot>
		</div>

		<ClientOnly>
			<Vue3Marquee :duration="50" class="rounded-xl">
				<ProseImg
					src="/somsri-collaborators/brand-1.png"
					alt="แบรนด์ที่เคยสั่งผลิตเสื้อกับสมศรีมีเสื้อ"
				/>
				<ProseImg
					src="/somsri-collaborators/brand-2.png"
					alt="แบรนด์ที่เคยสั่งผลิตเสื้อกับสมศรีมีเสื้อ"
				/>
				<ProseImg
					src="/somsri-collaborators/brand-3.png"
					alt="แบรนด์ที่เคยสั่งผลิตเสื้อกับสมศรีมีเสื้อ"
				/>
			</Vue3Marquee>
		</ClientOnly>
	</div>
</template>
