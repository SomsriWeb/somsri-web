<template>
	<div class="flex justify-center gap-5">
		<!-- ปุ่มออกแบบ -->
		<NuxtLink to="/shop">
			<UButton
				icon="material-symbols:shopping-basket-sharp"
				class="w-full bg-primary text-white text-sm px-4 py-2"
				size="md"
			>
				ออกแบบกระเป๋าผ้า
			</UButton>
		</NuxtLink>

		<!-- ปุ่มติดต่อ -->
		<LineLink>
			<UButton
				icon="i-lucide-send"
				class="w-full bg-primary text-white text-sm px-4 py-2"
				size="md"
			>
				ติดต่อสอบถาม
			</UButton>
		</LineLink>
	</div>
</template>
