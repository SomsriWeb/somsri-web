<script lang="ts" setup>
	const { data: menus } = await useAsyncData("footer-menu", () =>
		queryCollection("footerMenu").order("order", "ASC").all()
	)
</script>
<template>
	<div class="text-white">
		<FooterTitle>เมนู</FooterTitle>
		<nav>
			<ul class="font-light">
				<li v-for="menu in menus" :key="menu.label">
					<NuxtLink :to="menu.url" class="underline">{{ menu.label }}</NuxtLink>
				</li>
			</ul>
		</nav>
	</div>
</template>
