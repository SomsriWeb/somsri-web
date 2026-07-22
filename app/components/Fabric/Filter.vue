<script setup lang="ts">
import type { FabricFilterState } from '~/utils/fabricCatalog';
import {
    defaultFabricFilterState,
    materialOptions,
    shirtTypeOptions,
    toggleFilterValue,
    usageOptions,
} from '~/utils/fabricCatalog';

interface Props {
    modelValue: FabricFilterState;
}

interface Emits {
    (event: 'update:modelValue', value: FabricFilterState): void;
    (event: 'apply'): void;
}

type SectionId = 'shirt' | 'material' | 'usage' | 'gram';

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const isMobileOpen = ref(true);
const openSections = ref<Record<SectionId, boolean>>({
    shirt: true,
    material: true,
    usage: true,
    gram: true,
});

const filters = computed({
    get: () => props.modelValue,
    set: (value: FabricFilterState) => emit('update:modelValue', value),
});

function updateFilters(patch: Partial<FabricFilterState>) {
    filters.value = { ...filters.value, ...patch };
}

function toggleShirtType(id: string) {
    updateFilters({ shirtTypes: toggleFilterValue(filters.value.shirtTypes, id) });
}

function toggleMaterial(id: string) {
    updateFilters({ materials: toggleFilterValue(filters.value.materials, id) });
}

function toggleUsage(id: string) {
    updateFilters({ usages: toggleFilterValue(filters.value.usages, id) });
}

function clearFilters() {
    filters.value = defaultFabricFilterState();
}

function applyFilters() {
    isMobileOpen.value = false;
    emit('apply');
}

function toggleSection(id: SectionId) {
    openSections.value[id] = !openSections.value[id];
}

function isActive(values: string[], id: string) {
    return values.includes(id);
}

function chipClass(active: boolean) {
    return active
        ? 'border-primary bg-primary text-white'
        : 'border-stone-200 bg-white text-stone-700 hover:border-primary/40';
}
</script>

<template>
    <aside class="w-full max-w-full">
        <div class="overflow-hidden rounded-lg border border-stone-200 bg-white">
            <button
                type="button"
                class="flex w-full items-center justify-between px-3 py-3 text-left lg:cursor-default lg:px-3.5"
                @click="isMobileOpen = !isMobileOpen"
            >
                <div class="flex items-center gap-2">
                    <Icon name="lucide:sliders-horizontal" class="hidden text-primary lg:block" />
                    <span class="text-lg font-bold text-primary lg:text-xl">ตัวกรอง</span>
                    <span class="text-lg font-bold text-primary lg:hidden">เลือกเนื้อผ้าสไตล์คุณ</span>
                </div>
                <div class="flex items-center gap-3">
                    <button
                        type="button"
                        class="hidden text-sm font-semibold text-primary lg:inline"
                        @click.stop="clearFilters"
                    >
                        ล้างทั้งหมด
                    </button>
                    <Icon
                        name="lucide:chevron-down"
                        class="text-stone-500 transition-transform lg:hidden"
                        :class="{ 'rotate-180': isMobileOpen }"
                    />
                </div>
            </button>

            <div class="mx-3 border-b border-stone-200 lg:mx-3.5" />

            <div :class="{ 'hidden lg:block': !isMobileOpen, block: isMobileOpen }">
                <section>
                    <button
                        type="button"
                        class="flex w-full items-center justify-between px-3 py-3 text-left lg:px-3.5"
                        @click="toggleSection('shirt')"
                    >
                        <h3 class="text-base font-bold text-primary">ประเภทเสื้อ</h3>
                        <Icon
                            name="lucide:chevron-down"
                            class="size-4 shrink-0 text-stone-500 transition-transform"
                            :class="{ 'rotate-180': openSections.shirt }"
                        />
                    </button>
                    <div v-show="openSections.shirt" class="px-3 pb-4 lg:px-3.5">
                        <div class="flex flex-wrap gap-2 lg:hidden">
                            <button
                                v-for="option in shirtTypeOptions"
                                :key="option.id"
                                type="button"
                                class="rounded-lg border px-3 py-2 text-sm transition-colors"
                                :class="chipClass(isActive(filters.shirtTypes, option.id))"
                                @click="toggleShirtType(option.id)"
                            >
                                {{ option.label }}
                            </button>
                        </div>
                        <div class="hidden flex-col gap-2.5 lg:flex">
                            <label
                                v-for="option in shirtTypeOptions"
                                :key="`desktop-${option.id}`"
                                class="flex cursor-pointer items-center gap-2 text-sm text-stone-700"
                            >
                                <input
                                    type="checkbox"
                                    class="size-4 accent-primary"
                                    :checked="isActive(filters.shirtTypes, option.id)"
                                    @change="toggleShirtType(option.id)"
                                >
                                <span>{{ option.label }}</span>
                            </label>
                        </div>
                    </div>
                    <div class="mx-3 border-b border-stone-200 lg:mx-3.5" />
                </section>

                <section>
                    <button
                        type="button"
                        class="flex w-full items-center justify-between px-3 py-3 text-left lg:px-3.5"
                        @click="toggleSection('material')"
                    >
                        <h3 class="text-base font-bold text-primary">เนื้อผ้า</h3>
                        <Icon
                            name="lucide:chevron-down"
                            class="size-4 shrink-0 text-stone-500 transition-transform"
                            :class="{ 'rotate-180': openSections.material }"
                        />
                    </button>
                    <div v-show="openSections.material" class="px-3 pb-4 lg:px-3.5">
                        <div class="flex flex-wrap gap-2 lg:hidden">
                            <button
                                v-for="option in materialOptions"
                                :key="option.id"
                                type="button"
                                class="rounded-lg border px-3 py-2 text-sm transition-colors"
                                :class="chipClass(isActive(filters.materials, option.id))"
                                @click="toggleMaterial(option.id)"
                            >
                                {{ option.label }}
                            </button>
                        </div>
                        <div class="hidden flex-col gap-2.5 lg:flex">
                            <label
                                v-for="option in materialOptions"
                                :key="`desktop-${option.id}`"
                                class="flex cursor-pointer items-center gap-2 text-sm text-stone-700"
                            >
                                <input
                                    type="checkbox"
                                    class="size-4 accent-primary"
                                    :checked="isActive(filters.materials, option.id)"
                                    @change="toggleMaterial(option.id)"
                                >
                                <span>{{ option.label }}</span>
                            </label>
                        </div>
                    </div>
                    <div class="mx-3 border-b border-stone-200 lg:mx-3.5" />
                </section>

                <section>
                    <button
                        type="button"
                        class="flex w-full items-center justify-between px-3 py-3 text-left lg:px-3.5"
                        @click="toggleSection('usage')"
                    >
                        <h3 class="text-base font-bold text-primary">การนำไปใช้</h3>
                        <Icon
                            name="lucide:chevron-down"
                            class="size-4 shrink-0 text-stone-500 transition-transform"
                            :class="{ 'rotate-180': openSections.usage }"
                        />
                    </button>
                    <div v-show="openSections.usage" class="px-3 pb-4 lg:px-3.5">
                        <div class="flex flex-wrap gap-2 lg:hidden">
                            <button
                                v-for="option in usageOptions"
                                :key="option.id"
                                type="button"
                                class="rounded-lg border px-3 py-2 text-sm transition-colors"
                                :class="chipClass(isActive(filters.usages, option.id))"
                                @click="toggleUsage(option.id)"
                            >
                                {{ option.label }}
                            </button>
                        </div>
                        <div class="hidden flex-col gap-2.5 lg:flex">
                            <label
                                v-for="option in usageOptions"
                                :key="`desktop-${option.id}`"
                                class="flex cursor-pointer items-center gap-2 text-sm text-stone-700"
                            >
                                <input
                                    type="checkbox"
                                    class="size-4 accent-primary"
                                    :checked="isActive(filters.usages, option.id)"
                                    @change="toggleUsage(option.id)"
                                >
                                <span>{{ option.label }}</span>
                            </label>
                        </div>
                    </div>
                    <div class="mx-3 border-b border-stone-200 lg:mx-3.5" />
                </section>

                <section>
                    <button
                        type="button"
                        class="flex w-full items-center justify-between px-3 py-3 text-left lg:px-3.5"
                        @click="toggleSection('gram')"
                    >
                        <h3 class="text-base font-bold text-primary">แกรมผ้า</h3>
                        <Icon
                            name="lucide:chevron-down"
                            class="size-4 shrink-0 text-stone-500 transition-transform"
                            :class="{ 'rotate-180': openSections.gram }"
                        />
                    </button>
                    <div v-show="openSections.gram" class="px-3 pb-4 lg:px-3.5">
                        <div class="flex items-center gap-2">
                            <input
                                :value="filters.gramMin ?? ''"
                                type="number"
                                min="0"
                                placeholder="MIN"
                                class="h-6 w-12 shrink-0 rounded-sm border border-stone-200 px-2 text-center text-xs outline-none placeholder:text-stone-400 focus:border-primary sm:text-sm"
                                @input="updateFilters({ gramMin: ($event.target as HTMLInputElement).value ? Number(($event.target as HTMLInputElement).value) : null })"
                            >
                            <span class="text-stone-400">-</span>
                            <input
                                :value="filters.gramMax ?? ''"
                                type="number"
                                min="0"
                                placeholder="MAX"
                                class="h-6 w-12 shrink-0 rounded-sm border border-stone-200 px-2 text-center text-xs outline-none placeholder:text-stone-400 focus:border-primary sm:text-sm"
                                @input="updateFilters({ gramMax: ($event.target as HTMLInputElement).value ? Number(($event.target as HTMLInputElement).value) : null })"
                            >
                            <span class="shrink-0 text-sm text-stone-600">แกรม</span>
                        </div>
                    </div>
                    <div class="mx-3 border-b border-stone-200 lg:mx-3.5 lg:hidden" />
                </section>
            </div>
        </div>
    </aside>
</template>
