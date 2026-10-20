<script setup lang="ts">
import { USE_NAVBAR } from '~/lib/useNavbar';

const useNavbar = inject(USE_NAVBAR, true);
</script>

<template>
	<div>
		<Navbar v-if="useNavbar" class="sticky top-0 left-0 right-0 z-50" active-navbar />
		<slot class="mt-5" />
		<Footer />
	</div>
</template>
