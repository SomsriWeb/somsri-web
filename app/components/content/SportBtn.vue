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
	<div class="flex flex-wrap items-center justify-start gap-4 mt-6">
		<!-- ปุ่มติดต่อ (solid) -->
		<LineLink>
			<UButton
				trailing-icon="i-lucide-arrow-right"
				class="inline-flex items-center bg-primary px-6 py-2.5 text-sm text-white"
				size="md"
			>
				ปรึกษาฟรี
			</UButton>
		</LineLink>

		<!-- ปุ่มดูตัวอย่างผ้า → เลื่อนไปหมวดเนื้อผ้าในหน้าเดียวกัน -->
		<UButton
			:to="`#${targetId}`"
			variant="outline"
			class="inline-flex items-center border-2 border-primary px-6 py-2.5 text-sm text-primary"
			size="md"
			@click="scrollToFabric"
		>
			ดูตัวอย่างผ้า
		</UButton>
	</div>
</template>