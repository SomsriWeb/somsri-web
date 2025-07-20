<template>
	<Container class="bg-primary">
		<div>
			<ProseH2 class="!text-white text-center text-5xl md:text-6xl"
				><slot name="title" mdc-unwrap="p"
			/></ProseH2>
			<ProseP class="!text-white text-center text-lg">
				<slot name="description" mdc-unwrap="p" />
			</ProseP>
		</div>

		<div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
			<div>
				<ProseImg :src="'/landing-page-tote-bag/GTWM.png'" class="mb-5" />
				<ProseH3 class="!text-white text-center">GTWM</ProseH3>
				<ProseP class="!text-white text-center">13in x 21in (สายยาว 22 นิ้ว)</ProseP>
			</div>

			<div>
				<ProseImg :src="'/landing-page-tote-bag/KOREA.png'" class="mb-5" />
				<ProseH3 class="!text-white text-center">Korea</ProseH3>
				<ProseP class="!text-white text-center">14in x 17.5in (ไม่รวมความยาวสาย)</ProseP>
			</div>

			<div>
				<ProseImg :src="'/landing-page-tote-bag/SQUARE.png'" class="mb-5" />
				<ProseH3 class="!text-white text-center">Square</ProseH3>
				<ProseP class="!text-white text-center">16in x 16in (สายยาว 22 นิ้ว)</ProseP>
			</div>
		</div>

		<slot v-if="$slots.footer" name="footer" />
	</Container>
</template>
