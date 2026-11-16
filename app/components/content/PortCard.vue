<script setup lang="ts">
interface Props {
    type: 'portCardArtist' | 'portCardOrganization' | 'portCardOther';
}

const props = defineProps<Props>();

const { data: datacards } = await useAsyncData(`portcard-${props.type}`, () => {
    return queryCollection(props.type).order('name', 'ASC').all();
});

const { locale } = useI18n();
const nameOf = (item: { name: string; 'name-en'?: string }) => (locale.value === 'en' ? (item['name-en'] ?? item.name) : item.name);
const methodOf = (item: { method: string; 'method-en'?: string }) => (locale.value === 'en' ? (item['method-en'] ?? item.method) : item.method);
</script>

<template>
    <div>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 place-items-center mb-5">
            <div v-for="item in datacards" :key="item.name" class="flex flex-col items-center text-center w-full max-w-[250px]">
                <!-- Responsive square image -->
                <div class="w-full aspect-square rounded-2xl overflow-hidden shadow-md">
                    <ProseImg :src="item.image" :alt="nameOf(item)" class="h-full object-cover" />
                </div>

                <!-- Text -->
                <span class="text-base sm:text-lg font-semibold text-primary mt-3">
                    {{ nameOf(item) }}
                </span>
                <p class="text-sm text-primary mt-1">• {{ methodOf(item) }}</p>
            </div>
        </div>
    </div>
</template>
