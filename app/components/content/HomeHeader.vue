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
        <div class="relative overflow-hidden h-screen">
            <video
                class="absolute inset-0 h-full w-full object-cover"
                autoplay
                muted
                loop
                playsinline
                preload="metadata"
            >
                <source src="https://s3.somsritshirt.com/somsri-web/SomsriGarment.mp4" type="video/mp4" />
            </video>
            <div class="absolute inset-0 bg-black/30" />
        </div>
        <div class="p-5 sm:p-0 absolute bottom-5 lg:bottom-10 xl:bottom-20 left-2 sm:left-5 lg:left-[4.6rem] text-white sm:max-w-60 md:max-w-60 lg:max-w-[20rem] xl:max-w-120">
            <h1 class="text-2xl md:text-3xl lg:text-4xl font-bold">
                <slot name="title" mdc-unwrap="p" />
            </h1>
            <p class="font-light text-sm mb-5">
                <slot name="description" mdc-unwrap="p" />
            </p>

            <LineLink>
                <UButton color="primary" size="xl" class="min-w-36!">
                    <Icon name="lucide:message-circle" size="1rem" />
                    <slot name="button" mdc-unwrap="p" />
                </UButton>
            </LineLink>
        </div>
    </header>
</template>
