<script setup lang="ts">
import type { SublimationPricePackage } from './SublimationPriceTable.types';
import { DEFAULT_PRICE_PACKAGES } from './sublimationPriceTable.defaults';
import { LINE_LINK } from '~/lib/lineLink';

interface Props {
    /** บรรทัดที่ 1 ของหัวข้อฝั่งซ้าย เช่น "เรทราคา" */
    titleLine1?: string;
    /** บรรทัดที่ 2 ของหัวข้อฝั่งซ้าย เช่น "Sublimation" */
    titleLine2?: string;
    /** ข้อความปุ่ม CTA ฝั่งซ้าย */
    buttonLabel?: string;
    /** ลิงก์ปุ่ม CTA — ไม่ระบุ = ใช้ลิงก์ LINE ของระบบ */
    buttonLink?: string;
    /** ชุดข้อมูลแพ็กเกจราคา (การ์ดขวา) */
    packages?: SublimationPricePackage[];
    /** หมายเหตุบรรทัดแรกใต้ตาราง (สีเทา) */
    note1?: string;
    /** หมายเหตุบรรทัดที่สองใต้ตาราง (ตัวหนา สี primary) */
    note2?: string;
}

const {
    titleLine1 = 'เรทราคา',
    titleLine2 = 'Sublimation',
    buttonLabel = 'สอบถามราคา',
    buttonLink,
    packages = DEFAULT_PRICE_PACKAGES,
    note1 = '**ราคาดังกล่าวบวกเพิ่มจากเรทเสื้อยืดรวมสกรีน**',
    note2 = '**ราคาดังกล่าวรวม VAT 7%**',
} = defineProps<Props>();

// ไม่ระบุ buttonLink มา = ใช้ลิงก์ LINE ของหน้า (ตั้งค่าใน frontmatter `lineLink`)
const lineLink = inject<string>(LINE_LINK);
const resolvedButtonLink = computed(() => buttonLink ?? lineLink);
</script>

<template>
    <section class="sublimation-price-table my-6">
        <div class="grid gap-8 lg:grid-cols-4 lg:items-start lg:gap-10">
            <!-- ===== ฝั่งซ้าย: หัวข้อ + ปุ่ม CTA ===== -->
            <div class="text-center lg:sticky lg:top-24 lg:col-span-1 lg:text-left">
                <h2 class="!m-0 text-2xl font-bold leading-tight md:text-3xl">
                    <span class="block text-primary">{{ titleLine1 }}</span>
                    <span class="block text-stone-800">{{ titleLine2 }}</span>
                </h2>

                <ActionButtonWithPing :to="resolvedButtonLink" class="mt-6 inline-flex">
                    {{ buttonLabel }}
                </ActionButtonWithPing>
            </div>

            <!-- ===== ฝั่งขวา: การ์ดราคา ===== -->
            <div class="lg:col-span-3">
                <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    <div
                        v-for="(pkg, pi) in packages"
                        :key="pi"
                        class="overflow-hidden rounded-2xl bg-white shadow-md"
                    >
                        <!-- หัวการ์ด -->
                        <div class="flex min-h-14 items-center justify-center bg-primary px-3 text-center text-base font-bold text-white">
                            {{ pkg.label }}
                        </div>

                        <!-- ราคาเด่นด้านบน -->
                        <div class="flex items-center gap-3 bg-stone-100 px-5 py-4">
                            <div class="shrink-0 text-xs text-stone-500">
                                <p class="leading-tight">จำนวนตัว</p>
                                <p class="font-bold leading-tight text-stone-700">{{ pkg.rangeLabel }}</p>
                            </div>
                            <p class="flex items-baseline gap-1.5">
                                <span class="text-4xl font-extrabold leading-none text-primary md:text-5xl">
                                    {{ pkg.headlinePrice }}
                                </span>
                                <span class="text-sm text-stone-500">THB</span>
                            </p>
                        </div>

                        <!-- รายการราคาตามจำนวน -->
                        <div class="px-5 py-4">
                            <p class="mb-2 text-xs text-stone-500">จำนวน(ตัว)</p>
                            <div class="divide-y divide-stone-100">
                                <div
                                    v-for="(tier, ti) in pkg.tiers"
                                    :key="ti"
                                    class="flex items-center justify-between gap-2 py-2.5"
                                >
                                    <span class="text-base font-bold text-stone-800">{{ tier.min }}+</span>
                                    <span v-if="tier.price" class="flex items-baseline gap-1">
                                        <span class="text-lg font-bold text-stone-800">{{ tier.price }}</span>
                                        <span class="text-xs text-stone-500">THB</span>
                                    </span>
                                    <span v-else class="font-bold text-primary">
                                        {{ tier.specialLabel ?? 'ราคาพิเศษ' }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- หมายเหตุ -->
                <div class="mt-4 space-y-1 text-right text-sm">
                    <p v-if="note1" class="text-stone-500">{{ note1 }}</p>
                    <p v-if="note2" class="font-bold text-primary">{{ note2 }}</p>
                </div>
            </div>
        </div>
    </section>
</template>