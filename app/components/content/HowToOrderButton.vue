<script setup lang="ts"></script>

<template>
	<div
		class="grid grid-cols-1 lg:grid-cols-2 gap-6 px-4 sm:px-6 lg:px-20 py-10 max-w-7xl mx-auto"
	>
		<!-- Left: Contact Info -->
		<div>
			<ProseH1
				class="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4 text-center lg:text-left"
			>
				Address
			</ProseH1>
			<ProseP class="text-sm sm:text-base text-center lg:text-left">
				<slot name="Address" mdc-unwrap="p" />
			</ProseP>
		</div>

		<!-- Right: Map Image -->
		<div class="flex flex-col items-center">
			<ProseImg
				src="/contact/map-unsmushed.jpg"
				alt="map"
				class="rounded-md shadow-md max-w-xs sm:max-w-md md:max-w-lg"
			/>
			<UButton
				to="https://maps.app.goo.gl/nWXonjutukkt8Ux89"
				target="_blank"
				label="Google Maps"
				variant="solid"
				class="mt-5 w-full max-w-xs sm:max-w-sm"
				icon="mage:map-marker"
			/>
		</div>
	</div>
</template>
