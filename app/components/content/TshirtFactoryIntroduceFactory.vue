<template>
	<div class="grid grid-cols-1md:grid-cols-2 gap-5">
		<div>
			<ProseH2><slot name="title" mdc-unwrap="p" /></ProseH2>
			<ProseP class="text-lg"><slot name="description" mdc-unwrap="p" /></ProseP>
		</div>

		<div>
			<NuxtImg
				src="/tshirt-factory/introduce-factory.png"
				class="object-cover w-full h-full rounded-xl"
				format="webp"
				loading="lazy"
				placeholder
			/>
		</div>
	</div>
</template>
