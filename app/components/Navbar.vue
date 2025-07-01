<script setup lang="ts">
	// VARIABLE
	const route = useRoute()
	const menus = [
		{
			name: "หน้าหลัก",
			url: "/",
		},
		{
			name: "สินค้าทั้งหมด",
			url: "/product-type",
		},
		{
			name: "เนื้อผ้า",
			url: "/fabric-specification",
		},
		{
			name: "ออกแบบเสื้อ",
			url: "/design",
		},
		{
			name: "ราคา",
			url: "/price",
		},
		{
			name: "ผลงาน",
			url: "/portfolio",
		},
		{
			name: "วิธีสั่งซื้อ",
			url: "/how-to-order",
		},
		{
			name: "บทความ",
			url: "/blog",
		},
		{
			name: "เกี่ยวกับเรา",
			url: "/about-us",
		},
	]
	const isScrolled = ref(false)

	// COMPUTED
	const navbarClass = computed(() => {
		return isScrolled.value ? "bg-white text-stone-500 shadow-lg" : "bg-transparent text-white"
	})

	// FUNCTION
	function handleScroll() {
		isScrolled.value = window.scrollY > 100
	}

	// LIFE CYCLE
	onMounted(() => {
		window.addEventListener("scroll", handleScroll)
	})

	onUnmounted(() => {
		window.removeEventListener("scroll", handleScroll)
	})
</script>

<template>
	<nav
		:class="navbarClass"
		class="px-[4.6rem] py-2 grid grid-cols-12 gap-5 w-full transition-all duration-300"
	>
		<NuxtLink to="/" class="col-span-2">
			<img src="/logo.png" alt="Somsri Logo" class="w-[1.75rem]" />
		</NuxtLink>

		<div class="col-span-8 flex items-center gap-5">
			<NuxtLink
				v-for="menu in menus"
				:key="menu.name"
				:to="menu.url"
				:class="{ 'font-medium text-primary': route.path === menu.url }"
				>{{ menu.name }}</NuxtLink
			>
		</div>

		<div class="col-span-2 flex items-center gap-5">
			<NuxtLink to="tel:0634216521" class="flex items-center" external
				><Icon name="lucide:phone" class="mr-1" />063-421-6521</NuxtLink
			>
			<NuxtLink to="/en" class="flex items-center"><Icon name="lucide:languages" /></NuxtLink>
		</div>
	</nav>
</template>
