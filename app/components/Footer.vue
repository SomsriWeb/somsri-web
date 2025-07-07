<script lang="ts" setup>
	const socialMedias = [
		{
			icon: "ic:baseline-facebook",
			url: "https://www.facebook.com/somsritshirt/",
		},
		{
			icon: "fa6-brands:line",
			url: "https://contact.somsritshirt.com/3d8f7",
		},
		{
			icon: "mdi:instagram",
			url: "https://www.instagram.com/somsritshirt/",
		},
		{
			icon: "ic:baseline-tiktok",
			url: "https://www.tiktok.com/@somsritshirt_brand",
		},
	]
</script>
<template>
	<footer>
		<div
			class="bg-primary grid grid-cols-1 sm:grid-cols-3 gap-10 px-5 md:px-[4.6rem] py-5 md:py-[3rem]"
		>
			<FooterAbout />
			<FooterMenu />
			<div>
				<FooterAddress class="mb-5" />
				<FooterContact />
			</div>
		</div>
		<div class="bg-primary-600 flex justify-between items-center px-5 md:px-[4.6rem] py-2">
			<img src="/footer/footer-logo.png" class="max-w-[3.5rem] sm:max-w-[10rem]" />
			<div class="flex items-center gap-2 sm:gap-5">
				<NuxtLink
					v-for="socialMedia in socialMedias"
					:key="socialMedia.url"
					:to="socialMedia.url"
					class="flex"
					external
				>
					<UButton
						:icon="socialMedia.icon"
						variant="ghost"
						class="text-white p-0 !min-w-fit"
						size="lg"
					/>
				</NuxtLink>
			</div>
		</div>
	</footer>
</template>
