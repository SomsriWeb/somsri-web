<template>
	<div class="grid grid-cols-2 gap-5">
		<div>
			<h2 class="text-primary text-6xl leading-none font-bold">
				<slot name="title" mdc-unwrap="p" />
			</h2>
			<p class="text-stone-500 font-light text-xl">
				<slot name="description" mdc-unwrap="p" />
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
