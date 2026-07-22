<script setup lang="ts">
interface HowToOrderTimelineStep {
    title: string;
    description: string;
    image: string;
    badge?: string;
    badgeIsLink?: boolean;
}

const { data: steps } = await useAsyncData(
    'how-to-order',
    () =>
        queryCollection('howToOrder' as any)
            .order('order' as any, 'ASC')
            .all() as Promise<HowToOrderTimelineStep[]>,
);
</script>

<template>
    <div class="px-5 py-12">
        <div class="relative flex flex-col gap-10 md:gap-16">
            <div class="how-line absolute w-0.5 bg-black/30" />

            <div v-for="(step, index) in steps" :key="step.title" class="how-step relative grid gap-x-6 gap-y-4 mb-5" :class="{ 'how-step--reverse': index % 2 === 1 }">
                <div
                    class="how-step__badge relative z-10 w-8 h-8 md:w-10 md:h-10 rounded-full font-bold text-lg md:text-2xl flex items-center justify-center"
                    :class="step.badge ? 'bg-primary text-white' : 'bg-white text-primary border-2 border-primary'"
                >
                    {{ index + 1 }}
                </div>

                <div class="how-step__content text-left md:text-left">
                    <p class="text-primary text-sm font-bold font-stretch-condensed">ขั้นที่ {{ index + 1 }}</p>
                    <h3 class="text-primary mt-1 font-bold font-stretch-condensed text-xl md:text-2xl leading-tight">
                        {{ step.title }}
                    </h3>
                    <p class="mt-2 text-gray-600 font-light leading-relaxed">
                        {{ step.description }}
                    </p>

                    <component v-if="step.badge" :is="step.badgeIsLink ? 'LineLink' : 'div'" class="mt-4 inline-block">
                        <div class="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-white pl-3 pr-4 py-1 shadow-sm">
                            <span class="w-4 h-4 rounded-full bg-primary flex items-center justify-center shrink-0">
                                <Icon name="heroicons:star-solid" class="w-2.5 h-2.5 text-white" />
                            </span>
                            <span class="text-primary font-medium text-sm">{{ step.badge }}</span>
                        </div>
                    </component>
                </div>

                <div class="how-step__image relative overflow-hidden h-full min-w-0">
                    <ProseImg :src="step.image" :alt="step.title" class="shadow-sm object-cover w-full h-full min-h-[220px] md:min-h-0" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.how-step {
    grid-template-columns: auto 1fr;
    grid-template-areas:
        'badge content'
        'image image';
    align-items: start;
}
.how-step__image::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(to right, white 0%, white 8%, transparent 35%);
}

.how-step__badge {
    grid-area: badge;
    justify-self: center;
}
.how-step__content {
    grid-area: content;
}
.how-step__image {
    grid-area: image;
    margin-left: 0.5rem;
}
.how-line {
    left: 1rem;
    top: 1rem;
    bottom: 0;
    z-index: 1;
}

@media (min-width: 768px) {
    .how-step {
        grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
        grid-template-areas: 'image badge content';
        column-gap: 2.5rem;
    }
    .how-step--reverse {
        grid-template-areas: 'content badge image';
    }
    .how-step--reverse .how-step__content {
        text-align: right;
    }
    .how-line {
        left: 50%;
        top: 1.75rem;
        bottom: 0;
        transform: translateX(-50%);
    }
    .how-step__image {
        margin-left: 0;
    }
    .how-step__image::after {
        background: linear-gradient(to left, white 0%, transparent 18%);
    }
    .how-step--reverse .how-step__image::after {
        background: linear-gradient(to right, white 0%, transparent 18%);
    }
}
</style>
