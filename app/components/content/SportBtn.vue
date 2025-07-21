<template>
	<!-- ปุ่มขอผ้าตัวอย่าง -->
	<div class="flex justify-center relative">
		<LineLink>
			<UButton
				size="xl"
				color="primary"
				variant="solid"
				icon="i-lucide-send"
				class="relative"
			>
				ส่งตัวอย่างผ้าฟรีเมื่อสั่ง 100 ตัวขึ้นไป

				<!-- จุด ping animation -->
				<span
					class="absolute top-0 right-0 -mt-1 -mr-1 flex size-3 rounded-full bg-primary-200 animate-ping"
				></span>
			</UButton>
		</LineLink>
	</div>
</template>
