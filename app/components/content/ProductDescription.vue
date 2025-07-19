<script setup lang="ts"></script>

<template>
	<div class="space-y-5">
		<ProseH2
			class="text-xl sm:text-2xl md:text-3xl xl:text-4xl font-bold text-start text-primary"
		>
			เลือกผ้าแบบไหนให้เหมาะกับแบรนด์คุณ
		</ProseH2>
		<ProseP class="text-sm sm:text-base md:text-lg text-start">
			<slot name="products" mdc-unwrap="p" />
		</ProseP>

		<DivCenter>
			<NuxtLink to="/fabric-specification">
				<UButton icon="lucide:shirt"> เนื้อผ้าและคุณสมบัติ </UButton>
			</NuxtLink>
		</DivCenter>
	</div>
</template>
