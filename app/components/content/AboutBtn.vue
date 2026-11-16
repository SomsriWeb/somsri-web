<script lang="ts" setup>
import { UButton } from '#components';

const props = defineProps<{
    /**
     * ลิงก์ที่จะไปเมื่อคลิกปุ่ม
     */
    actionLink: string;
}>();

const { t } = useI18n({ useScope: 'local' });
</script>

<i18n lang="json">
{
    "th": { "readMore": "สามารถอ่านต่อได้ที่" },
    "en": { "readMore": "Read more here" }
}
</i18n>

<template>
    <div class="flex justify-center mb-2">
        <a :href="props.actionLink" target="_blank">
            <UButton icon="ix:user-manual-filled" class="relative inline-flex rounded-lg px-4 py-3 text-white bg-primary hover:bg-primary-50 cursor-pointer">
                {{ t('readMore') }}
                <span class="absolute top-0 right-0 -mt-1 -mr-1 flex size-3 rounded-full bg-primary-200 animate-ping" />
            </UButton>
        </a>
    </div>
</template>
