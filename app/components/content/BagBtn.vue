<script setup lang="ts">
import { LANGUAGE } from '~/lib/language';

const LANG = inject<'th' | 'en' | Ref<'th' | 'en'>>(LANGUAGE, 'th');
const lang = computed<'th' | 'en'>(() => (typeof LANG === 'string' ? LANG : LANG.value));

const shopTo = computed(() => (lang.value === 'en' ? '/shop-en' : '/shop'));
const designLabel = computed(() => (lang.value === 'en' ? 'Design a tote bag' : 'ออกแบบกระเป๋าผ้า'));
const contactLabel = computed(() => (lang.value === 'en' ? 'Contact us' : 'ติดต่อสอบถาม'));
</script>

<template>
	<div class="flex justify-center gap-5">
		<!-- ปุ่มออกแบบ -->
		<NuxtLink :to="shopTo">
			<UButton
				icon="material-symbols:shopping-basket-sharp"
				class="w-full bg-primary text-white text-sm px-4 py-2"
				size="md"
			>
				{{ designLabel }}
			</UButton>
		</NuxtLink>

		<!-- ปุ่มติดต่อ -->
		<LineLink>
			<UButton
				icon="i-lucide-send"
				class="w-full bg-primary text-white text-sm px-4 py-2"
				size="md"
			>
				{{ contactLabel }}
			</UButton>
		</LineLink>
	</div>
</template>
