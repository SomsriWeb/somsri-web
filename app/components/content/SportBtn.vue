<script setup lang="ts">
interface Props {
	targetId?: string;
}

const props = withDefaults(defineProps<Props>(), {
	targetId: 'fabric',
});

function scrollToFabric(e: MouseEvent) {
	const element = document.getElementById(props.targetId);
	if (element) {
		e.preventDefault();
		element.scrollIntoView({ behavior: 'smooth', block: 'start' });
		window.history.pushState(null, '', `#${props.targetId}`);
	}
}
</script>

<template>
	<div class="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:flex sm:w-auto sm:items-center sm:justify-start sm:gap-4">
		<!-- ปุ่มติดต่อ (solid) -->
		<LineLink>
			<UButton
				trailing-icon="i-lucide-arrow-right"
				class="inline-flex w-full items-center justify-center rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-primary/90 sm:w-auto sm:px-6"
				size="md"
			>
				ปรึกษาฟรี
			</UButton>
		</LineLink>

		<!-- ปุ่มดูตัวอย่างผ้า → เลื่อนไปหมวดเนื้อผ้าในหน้าเดียวกัน -->
		<UButton
			:to="`#${targetId}`"
			variant="outline"
			class="inline-flex w-full items-center justify-center rounded-xl border border-primary bg-white px-4 py-2.5 text-sm font-semibold text-primary hover:bg-stone-50 sm:w-auto sm:px-6"
			size="md"
			@click="scrollToFabric"
		>
			ดูตัวอย่างผ้า
		</UButton>
	</div>
</template>