<script lang="ts" setup>
interface Slots {
    /**
     * หัวข้อ
     */
    title(): unknown;

    /**
     * รายละเอียด
     */
    description(): unknown;

    /**
     * ข้อความในปุ่ม
     */
    button(): unknown;
}
defineSlots<Slots>();
</script>

<template>
    <header>
        <div class="relative">
            <NuxtImg src="/home/header.jpg" class="w-screen h-screen object-cover object-right" format="webp" placeholder preload />
            <div class="absolute inset-0 bg-black/30" />
        </div>
        <div class="p-5 sm:p-0 absolute bottom-5 lg:bottom-10 xl:bottom-[5rem] left-2 sm:left-5 lg:left-[4.6rem] text-white sm:max-w-[15rem] md:max-w-[15rem] lg:max-w-[20rem] xl:max-w-[30rem]">
            <h1 class="text-2xl md:text-3xl lg:text-4xl font-bold">
                <slot name="title" mdc-unwrap="p" />
            </h1>
            <p class="font-light text-sm mb-5">
                <slot name="description" mdc-unwrap="p" />
            </p>

            <LineLink>
                <UButton color="primary" size="xl" class="!min-w-[9rem]">
                    <Icon name="lucide:message-circle" size="1rem" />
                    <slot name="button" mdc-unwrap="p" />
                </UButton>
            </LineLink>
        </div>
    </header>
</template>
