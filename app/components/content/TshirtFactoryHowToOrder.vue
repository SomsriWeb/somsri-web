<template>
	<div>
		<ProseH2><slot name="title" mdc-unwrap="p" /></ProseH2>
		<ProseP class="mb-3"><slot name="description" mdc-unwrap="p" /></ProseP>

		<div class="pl-5">
			<slot name="content" />
		</div>
	</div>
</template>
