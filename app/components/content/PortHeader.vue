<script setup lang="ts"></script>

<template>
 
  <div
    class="px-4 sm:px-8 md:px-12 lg:px-[4.6rem] py-6 md:py-10"
  >
    <h1
     class="text-xl sm:text-2xl md:text-3xl xl:text-4xl font-bold mb-4 md:mb-8 text-start text-primary"
    >
      <slot name="othertitle" mdc-unwrap="p" />
    </h1>
    <p
      class="text-sm sm:text-base md:text-lg text-stone-500 text-start"
    >
      <slot name="otherdescribetion" />
    </p>
  </div>

  
  <div class="w-full max-w-screen-sm px-4 sm:px-6 md:px-12 lg:px-[4.6rem] py-4 sm:py-6 md:py-8 mx-auto">
    <h1
      class="break-words text-center text-2xl sm:text-3xl md:text-5xl font-bold text-primary mb-2 sm:mb-3"
    >
      <slot name="title" mdc-unwrap="p" />
    </h1>
    <p
      class="break-words text-center text-stone-500 text-sm sm:text-base md:text-xl font-light"
    >
      <slot name="describetion" mdc-unwrap="p" />
    </p>
  </div>

  
  <div class="w-full max-w-screen-sm px-4 sm:px-6 md:px-12 lg:px-[4.6rem] py-4 sm:py-6 md:py-8 mx-auto">
    <h1
      class="break-words text-center md:text-start text-2xl sm:text-3xl md:text-5xl font-bold text-primary mb-2 sm:mb-3"
    >
      <slot name="subtitle" mdc-unwrap="p" />
    </h1>
  </div>
</template>
