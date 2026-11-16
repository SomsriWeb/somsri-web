<script setup lang="ts">
const { t } = useI18n({ useScope: 'local' });
</script>

<i18n lang="json">
{
    "th": { "alt": "ขั้นตอนการผลิต" },
    "en": { "alt": "Production process" }
}
</i18n>

<template>
    <section class="bg-primary pt-36">
        <div class="flex justify-center items-center">
            <ProseImg src="/how-to-order/step_produce.png" :alt="t('alt')" />
        </div>
    </section>
</template>
