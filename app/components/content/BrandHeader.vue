<template>
  <div class="relative overflow-x-hidden">
    <header class="relative w-full h-screen overflow-hidden">
      <!-- Background Image -->
      <NuxtImg
        src="/tshirt-factory/bg.png"
        class="w-full h-full object-cover"
        alt="Background"
      />

      <div class="absolute inset-0 bg-black/30"></div>

      <div
        class="absolute inset-0 grid grid-cols-1 lg:grid-cols-2 items-center justify-center px-4 sm:px-8 lg:px-20 pt-4 pb-4 overflow-auto max-h-screen text-white"
      >
        <!-- ฝั่ง Image -->
        <div
          class="order-1 lg:order-2 sm:w-[350px] lg:w-[350px] xl:w-[500px] mx-auto flex justify-center items-center max-w-full"
        >
          <slot mdc-unwrap="p" class="" name="image-header-object" />
        </div>

        <!-- ฝั่ง Text -->
        <div
          class="order-2 lg:order-1 text-center lg:text-left max-w-full z-10"
        >
          <ProseH1
            class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight break-words"
          >
            <div class="flex justify-center">
              <slot mdc-unwrap="p" name="image-header-logo" />
            </div>
            <slot name="title-h1" mdc-unwrap="p" />
          </ProseH1>

          <ProseH2
            class="text-xl sm:text-2xl md:text-3xl font-bold mt-2 text-white"
          >
            <slot name="title-h2" mdc-unwrap="p" />
          </ProseH2>

          <p
            class="font-light text-base sm:text-lg lg:text-xl mt-4 mb-5 break-words"
          >
            <slot name="description" mdc-unwrap="p" />
          </p>
        </div>
      </div>
    </header>
  </div>
</template>
