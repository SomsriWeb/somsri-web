<template>
  <div class="relative">
    <header class="relative w-screen h-screen">
      <!-- Background Image -->
      <NuxtImg
        src="/tshirt-factory/bg.png"
        class="w-full h-full object-cover"
        alt="Background"
      />

      <!-- Overlay -->
      <div class="absolute inset-0 bg-black/30"></div>

      <!-- Grid Content -->
      <div
        class="absolute inset-0 grid grid-cols-1 lg:grid-cols-2 items-center justify-center px-4 sm:px-8 lg:px-20  pt-0 pb-0 m-0 text-white"
      >
        <!-- Image Object: อยู่บนเมื่อจอเล็ก, ขวาเมื่อจอใหญ่ -->
        <div class="order-1 lg:order-2 flex justify-center items-center lg:mb-0">
          <slot mdc-unwrap="p" name="image-header-object" />
        </div>

        <!-- Text: อยู่ล่างเมื่อจอเล็ก, ซ้ายเมื่อจอใหญ่ -->
        <div class="order-2 lg:order-1 text-center lg:text-left max-w-3xl z-10">
          <slot name="image-header-logo" />

          <h1 class="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
            <slot name="title-h1" mdc-unwrap="p" />
          </h1>

          <h2 class="text-2xl sm:text-3xl font-bold mt-2">
            <slot name="title-h2" mdc-unwrap="p" />
          </h2>

          <p class="font-light text-base sm:text-lg lg:text-xl mt-4 mb-5">
            <slot name="description" mdc-unwrap="p" />
          </p>
        </div>
      </div>
    </header>
  </div>
</template>




