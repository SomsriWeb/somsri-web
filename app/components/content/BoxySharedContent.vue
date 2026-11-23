<script setup lang="ts">
const { data: productContent } = await useAsyncData(
    'boxy-shared-product-content',
    () => queryCollection('content').path('/boxy-tshirt').first(),
);

if (!productContent.value) {
    throw createError({
        statusCode: 404,
        statusMessage: 'Boxy product content not found',
    });
}
</script>

<template>
    <ContentRenderer
        v-if="productContent"
        :value="productContent"
    />
</template>