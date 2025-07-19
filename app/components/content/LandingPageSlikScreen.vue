<script setup lang="ts">
	// VARIALBE
	const items = [
		{
			title: "สียาง",
			advantage: "ผิวสัมผัสเรียบ",
			disadvantage: "ไม่เหมาะกับงานที่มีรายละเอียด เล็กมาก เพราะงานสกรีนอาจไม่คมได้",
			image: "/produce-tshirt/rubber.png",
		},
		{
			title: "สีจม",
			advantage: "เนื้อสกรีนจมไปกับเนื้อผ้า ให้ความรู้สึกเนื้อสกรีนเป็นเนื้อเดียวกับเสื้อ",
			disadvantage: "เหมาะกับผ้าสีอ่อนเท่านั้น เช่น สีขาว สีฟ้าอ่อน สีชมพูอ่อน เป็นต้น",
			image: "/produce-tshirt/ink.png",
		},
		{
			title: "สีพลาสติซอล",
			advantage: "สามารถสกรีนงานรายละเอียดเล็กได้",
			disadvantage: "ผิวสัมผัสหยาบ",
			image: "/produce-tshirt/plastisol.png",
		},
	]
</script>

<template>
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
		<Card v-for="item in items" :key="item.title" class="shadow">
			<ProseImg :src="item.image" class="rounded-lg aspect-square object-cover" />
			<ProseH4>{{ item.title }}</ProseH4>
			<div>
				<ProseP class="!text-primary leading-none">ข้อดี: {{ item.advantage }}</ProseP>
				<ProseP class="!text-primary leading-none"
					>ข้อจำกัด: {{ item.disadvantage }}</ProseP
				>
			</div>
		</Card>
	</div>
</template>
