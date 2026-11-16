<script setup lang="ts">

// SLOT
interface Slots {
    /**
     * รายละเอียด (แสดงผลเป็น H3)
     */
    fabric(): unknown;

	/**
     * รายละเอียด (แสดงผลเป็น H3)
     */
	fabric2(): unknown;
}
defineSlots<Slots>();

const { t } = useI18n({ useScope: 'local' });
</script>

<i18n lang="json">
{
	"th": {
		"title": "เนื้อผ้าแนะนำ",
		"fasbix": "ผ้า Fasbix",
		"fasbix1": "ผ้าอยู่ทรง ดูเรียบร้อย",
		"fasbix2": "ระบายอากาศได้ดี",
		"fasbix3": "เนื้อผ้ายอดนิยม",
		"frenchTerry": "ผ้า French Terry",
		"frenchTerry1": "ผ้ายืดหยุ่น",
		"frenchTerry2": "เบาสบาย"
	},
	"en": {
		"title": "Recommended Fabrics",
		"fasbix": "Fasbix Fabric",
		"fasbix1": "Holds its shape for a neat look",
		"fasbix2": "Highly breathable",
		"fasbix3": "Our most popular fabric",
		"frenchTerry": "French Terry Fabric",
		"frenchTerry1": "Stretchy and flexible",
		"frenchTerry2": "Lightweight and comfortable"
	}
}
</i18n>

<template>
	<!-- หัวข้อหลัก -->
	<div class="pt-5 text-center px-4">
		<h1
			class="text-white text-3xl sm:text-4xl md:text-[4rem] leading-none font-bold p-4 bg-primary rounded-2xl"
		>
			{{ t('title') }}
		</h1>
	</div>

	<!-- รายการผ้า Fasbix -->
	<div class="flex flex-col md:flex-row items-center gap-5 max-w-6xl mx-auto px-4">
		<!-- เนื้อหา -->
		<div class="w-full md:w-1/2 text-start">
			<h2 class="text-primary text-2xl sm:text-3xl md:text-4xl font-bold mb-4">{{ t('fasbix') }}</h2>
			<h3 class="text-base md:text-lg">
				<slot name="fabric" mdc-unwrap="p" />
			</h3>
			<ul class="space-y-3 text-gray-800 mt-4">
				<li class="flex items-center gap-2">
					<Icon name="lucide:check-circle" class="text-primary w-5 h-5" />
					{{ t('fasbix1') }}
				</li>
				<li class="flex items-center gap-2">
					<Icon name="lucide:check-circle" class="text-primary w-5 h-5" />
					{{ t('fasbix2') }}
				</li>
				<li class="flex items-center gap-2">
					<Icon name="lucide:check-circle" class="text-primary w-5 h-5" />
					{{ t('fasbix3') }}
				</li>
			</ul>
		</div>

		<!-- ภาพ -->
		<div class="flex-shrink-0 w-full md:w-1/2 flex justify-center">
			<ProseImg
				src="/pants/image1.png"
				:alt="t('fasbix')"
				class="rounded-[2rem] max-w-md object-contain"
			/>
		</div>
	</div>

	<!-- รายการผ้า French Terry -->
	<div class="flex flex-col md:flex-row items-center gap-5 max-w-6xl mx-auto px-4">
		<!-- รูปภาพ -->
		<div class="flex-shrink-0 w-full md:w-1/2 flex justify-center">
			<ProseImg
				src="/pants/image2.png"
				:alt="t('frenchTerry')"
				class="rounded-[2rem] max-w-md object-contain"
			/>
		</div>

		<!-- เนื้อหา -->
		<div class="w-full md:w-1/2 text-start">
			<h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-4">
				{{ t('frenchTerry') }}
			</h2>
			<h3 class="mb-4 text-base md:text-lg">
				<slot name="fabric2" mdc-unwrap="p" />
			</h3>
			<ul class="space-y-3 text-gray-800">
				<li class="flex items-center gap-2">
					<Icon name="lucide:check-circle" class="text-primary w-5 h-5" />
					{{ t('frenchTerry1') }}
				</li>
				<li class="flex items-center gap-2">
					<Icon name="lucide:check-circle" class="text-primary w-5 h-5" />
					{{ t('frenchTerry2') }}
				</li>
			</ul>
		</div>
	</div>
</template>
