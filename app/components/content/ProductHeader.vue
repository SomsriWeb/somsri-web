<script setup></script>

<template>
  <h1
    class="text-primary text-[4rem] leading-none font-bold text-center p-5 m-10"
  >
    <slot name="title" />
  </h1>
  <p class="text-stone-500 text-start">
    <slot name="description" />
  </p>
  <h2 class="text-primary leading-none text-center p-5 m-10 text-xl font-bold">
    <slot name="productheader" />
  </h2>
</template>
