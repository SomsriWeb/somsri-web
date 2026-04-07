<script setup lang="ts">
import { LANGUAGE } from '~/lib/language';

const LANG = inject<'th' | 'en' | Ref<'th' | 'en'>>(LANGUAGE, 'th');
const lang = computed<'th' | 'en'>(() => (typeof LANG === 'string' ? LANG : LANG.value));
const label = computed(() => (lang.value === 'en' ? 'Free fabric swatches on orders of 100+ pieces' : 'ส่งตัวอย่างผ้าฟรีเมื่อสั่ง 100 ตัวขึ้นไป'));
</script>

<template>
    <!-- ปุ่มขอผ้าตัวอย่าง -->
    <div class="flex justify-center relative">
        <LineLink>
            <UButton size="xl" color="primary" variant="solid" icon="i-lucide-send" class="relative">
                {{ label }}

                <!-- จุด ping animation -->
                <span class="absolute top-0 right-0 -mt-1 -mr-1 flex size-3 rounded-full bg-primary-200 animate-ping" />
            </UButton>
        </LineLink>
    </div>
</template>
