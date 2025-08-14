<script setup lang="ts">
	import { USE_FOOTER } from "~/lib/useFooter"
	import { USE_NAVBAR } from "~/lib/useNavbar"

	const useNavbar = inject(USE_NAVBAR, true)
	const useFooter = inject(USE_FOOTER, true)
</script>

<template>
	<div>
		<Navbar v-if="useNavbar" class="fixed top-0 left-0 right-0 z-50" />
		<slot />
		<Footer v-if="useFooter" />
	</div>
</template>
