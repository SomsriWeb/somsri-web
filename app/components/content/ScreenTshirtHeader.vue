<template>
	<div>
		<header>
			<NuxtImg src="/tshirt-factory/bg.png" class="w-screen h-screen object-cover" />
			<div class="absolute inset-0 bg-black/30" />
			<div
				class="absolute grid grid-cols-2 gap-5 bottom-[5rem] px-5 md:px-[4.6rem] text-white"
			>
				<div>
					<p class="text-xl text-white">สมศรีมีเสื้อ</p>
					<h1 class="text-6xl font-bold"><slot name="title" mdc-unwrap="p" /></h1>
					<p class="font-light text-xl mb-5">
						<slot name="description" mdc-unwrap="p" />
					</p>
				</div>
			</div>
		</header>
	</div>
</template>
