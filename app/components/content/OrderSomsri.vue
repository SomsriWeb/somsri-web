<script setup lang="ts">
	// PROPS
	interface Props {
		titleTag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p"
		descriptionTag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p"
	}
	const { titleTag = "p", descriptionTag = "p" } = defineProps<Props>()
</script>
<template>
	<div>
		<div class="rounded-2xl p-3 md:p-7 bg-primary">
			<div class="text-center text-5xl font-bold text-white mb-3 leading-none">
				<component :is="titleTag">
					<slot name="title" mdc-unwrap="p" />
				</component>
			</div>
			<p class="text-center text-white text-base md:text-lg font-light mb-5">
				<component :is="descriptionTag">
					<slot name="description" mdc-unwrap="p" />
				</component>
			</p>
			<div
				class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 md:gap-5"
			>
				<NuxtLink href="https://contact.somsritshirt.com/3d975" external>
					<UButton icon="hugeicons:line" color="neutral" class="!text-primary px-2 w-full"
						>@somsritshirt</UButton
					>
				</NuxtLink>

				<NuxtLink href="https://www.facebook.com/somsritshirt" external>
					<UButton
						icon="line-md:facebook"
						color="neutral"
						class="!text-primary px-2 w-full"
						>Somsritshirt</UButton
					>
				</NuxtLink>

				<NuxtLink href="tel:024300678" external>
					<UButton
						icon="solar:phone-bold"
						color="neutral"
						class="!text-primary px-2 w-full"
						>02-430-0678</UButton
					>
				</NuxtLink>

				<NuxtLink href="tel:0661126521" external>
					<UButton
						icon="solar:phone-bold"
						color="neutral"
						class="!text-primary px-2 w-full !text-xs"
						>066-112-6521</UButton
					>
				</NuxtLink>

				<NuxtLink href="tel:0661141399" external>
					<UButton
						icon="solar:phone-bold"
						color="neutral"
						class="!text-primary px-2 w-full !text-xs"
						>066-114-1399</UButton
					>
				</NuxtLink>

				<NuxtLink href="tel:0634216521" external>
					<UButton
						icon="solar:phone-bold"
						color="neutral"
						class="!text-primary px-2 w-full !text-xs"
						>063-421-6521</UButton
					>
				</NuxtLink>
			</div>
		</div>
	</div>
</template>
