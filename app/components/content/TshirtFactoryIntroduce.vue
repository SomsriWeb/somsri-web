<template>
	<div class="grid grid-cols-1 md:grid-cols-2 gap-5">
		<div>
			<p class="text-4xl font-bold text-primary"><slot name="title" mdc-unwrap="p" /></p>
			<ProseP class="text-lg"><slot name="description" mdc-unwrap="p" /></ProseP>
		</div>
		<ProseImg src="/tshirt-factory/introduce.png" />
	</div>
</template>
