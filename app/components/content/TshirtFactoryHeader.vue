<template>
	<div>
		<header>
			<NuxtImg src="/tshirt-factory/bg.png" class="w-screen h-screen object-cover" />
			<div class="absolute inset-0 bg-black/30" />
			<div class="absolute bottom-[5rem] left-[5rem] text-white max-w-[35rem]">
				<p class="text-xl text-white">สมศรีมีเสื้อ</p>
				<h1 class="text-7xl font-bold"><slot name="title" mdc-unwrap="p" /></h1>
				<p class="font-light text-xl mb-5">
					<slot name="description" mdc-unwrap="p" />
				</p>
			</div>
			<ProseImg
				src="/tshirt-factory/tshirt.png"
				alt="สมศรีมีเสื้อ รับผลิตเสื้อ สั่งทำเสื้อครบวงจรในที่เดียว"
				class="absolute bottom-[5rem] right-[3rem]"
			/>
		</header>
	</div>
</template>
