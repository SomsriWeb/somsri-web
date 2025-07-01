<script setup lang="ts">
	import parsePhoneNumber from "libphonenumber-js"

	// VARIABLE
	const phoneNumbers = ["024300678", "0839088853", "0839088854", "064-208-8804"]

	// FUNCTION
	function getCallLink(phoneNumber: string) {
		return `tel:${phoneNumber}`
	}

	function formatPhoneNumber(phoneNumber: string) {
		const parsed = parsePhoneNumber(phoneNumber, "TH")
		return parsed?.formatNational().replaceAll(" ", "-") || phoneNumber
	}
</script>
<template>
	<div class="text-white">
		<FooterTitle>เบอร์โทรศัพท์</FooterTitle>
		<NuxtLink
			v-for="phoneNumber in phoneNumbers"
			:key="phoneNumber"
			:href="getCallLink(phoneNumber)"
			external
			class="font-light block underline"
			>{{ formatPhoneNumber(phoneNumber) }}</NuxtLink
		>
	</div>
</template>
