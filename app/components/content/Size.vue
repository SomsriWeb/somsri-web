<script setup>
	import ProseH1 from "./ProseH1.vue"
</script>
<template>
	<div class="grid grid-rows-1 gap-2 justify-center">
		<ProseH1 class="text-center bg-primary text-white rounded-2xl p-3">ขนาดเสื้อ</ProseH1>
		<ProseImg src="/size/male.jpg" alt="" class="max-w-md object-contain rounded-2xl" />
		<ProseImg
			src="/size/female.jpg"
			alt=""
			class="max-w-md object-contain rounded-2xl shadow-md"
		/>
	</div>
</template>
