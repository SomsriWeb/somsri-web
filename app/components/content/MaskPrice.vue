<template>
	<section class="flex flex-col items-center px-4 py-6 gap-6">
		<ProseH2 class="text-center">
			<slot name="mask" mdc-unwrap="p" />
		</ProseH2>
		<LineLink>
			<UButton size="xl" icon="i-lucide-send" class="w-full"> สั่งทำหน้ากากผ้า </UButton>
		</LineLink>
	</section>
</template>
