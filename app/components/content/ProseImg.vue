<script setup lang="ts">
import { withTrailingSlash, withLeadingSlash, joinURL } from 'ufo';
import { useRuntimeConfig, computed } from '#imports';
import { NuxtImg } from '#components';

// PROPS
interface Props {
    src?: string;
    alt?: string;
    width?: string | number;
    height?: string | number;
    /** true = lazy load, false หรือ "false" = โหลดทันที (eager) */
    lazy?: boolean | string;
    sizes?: string;
    /** คลาสเพิ่มเติมจาก markdown เช่น class="max-w-sm mx-auto" */
    class?: string;
}
const props = withDefaults(defineProps<Props>(), {
    src: '',
    alt: '',
    width: undefined,
    height: undefined,
    lazy: true,
    sizes: undefined,
    class: undefined,
});

const refinedSrc = computed(() => {
    if (props.src?.startsWith('/') && !props.src.startsWith('//')) {
        const _base = withLeadingSlash(withTrailingSlash(useRuntimeConfig().app.baseURL));
        if (_base !== '/' && !props.src.startsWith(_base)) {
            return joinURL(_base, props.src);
        }
    }
    return props.src;
});

/** รองรับ lazy จาก markdown เป็น string "false" / "true" */
const isLazy = computed(() => {
    const v = props.lazy;
    if (v === false || v === 'false') return false;
    if (v === true || v === 'true') return true;
    return true;
});
</script>

<template>
    <component
        :is="NuxtImg"
        :class="[props.class ? '' : 'w-full', props.class]"
        :src="refinedSrc"
        :alt="props.alt"
        :width="props.width"
        :height="props.height"
        format="webp"
        :sizes="props.sizes"
        placeholder
        :loading="isLazy ? 'lazy' : 'eager'"
    />
</template>
