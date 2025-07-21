<template>
	<section class="bg-white pt-20 px-4 text-primary text-center space-y-10 md:grid-cols-4">
		<!-- หัวข้อหลัก -->
		<div class="space-y-4">
			<ProseH2>หลากเทคนิคสกรีนเลือกได้ให้ตอบโจทย์</ProseH2>
			<p>ปัก ปักทรานเฟอร์ สกรีน พิมพ์ลาย</p>
		</div>

		<!-- ภาพเทคนิค -->
		<div class="flex justify-center">
			<ProseImg src="/polo/type-1-unsmushed.png" alt="เทคนิคสกรีน" class="max-w-full" />
		</div>

		<!-- ราคาเสื้อโปโล -->
		<div class="space-y-4">
			<ProseH2>ราคาเสื้อโปโล</ProseH2>
			<div class="flex justify-center">
				<ProseImg src="/polo/polo_price_01092565.jpg" alt="ราคาโปโล" class="max-w-md" />
			</div>
		</div>

		<!-- ขั้นตอนสั่งซื้อ -->
		<HowToOrder>
			<template #title> ขั้นตอนสั่งซื้อ </template>
		</HowToOrder>

		<!-- ปุ่มสั่งทำเสื้อ -->
		<div>
			<LineLink>
				<UButton size="xl" color="primary" variant="solid" icon="i-lucide-send">
					สั่งทำเสื้อ
				</UButton>
			</LineLink>
		</div>

		<!-- ผลงานการันตี -->
		<div class="space-y-4">
			<ProseH2>ผลงาน การันตีคุณภาพ</ProseH2>
			<div class="flex justify-center">
				<ProseImg src="/polo/preview-768x546.png" alt="ผลงาน" />
			</div>
		</div>

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
					/>
				</UButton>
			</LineLink>
		</div>
	</section>
</template>
