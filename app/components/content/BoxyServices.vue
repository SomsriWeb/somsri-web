<script setup lang="ts">
interface ServiceItem {
    title: string;
    price: string;
    description: string;
}

interface Props {
    items: ServiceItem[];
}

defineProps<Props>();
</script>

<template>
    <section
        aria-label="บริการเพิ่มเติมสำหรับเสื้อ Boxy"
        class="px-5 pb-10 lg:px-18 lg:pb-14"
    >
        <div class="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <article
                v-for="item in items"
                :key="item.title"
                class="min-w-0 rounded-xl border border-stone-200 bg-white p-5"
            >
                <h3 class="text-lg font-semibold text-primary">
                    {{ item.title }}
                </h3>

                <p class="mt-3 text-xl font-semibold text-stone-900">
                    {{ item.price }}
                </p>

                <p class="mt-3 text-base leading-relaxed text-stone-600">
                    {{ item.description }}
                </p>
            </article>
        </div>
    </section>
</template>