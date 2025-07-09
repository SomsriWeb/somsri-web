<script lang="ts" setup></script>
<template>
  <div class="px-4 sm:px-8 lg:px-36">
    <h1
      class="text-center text-3xl font-bold bg-primary text-white py-3 rounded-2xl"
    >
      <slot mdc-unwrap="p" name="header" />
    </h1>

<div class="flex justify-center pt-5">
  <div class="overflow-hidden rounded-2xl shadow-md">
    <slot mdc-unwrap="p" name="image-banner" />
  </div>
</div>

    <div class="font-light text-lg pt-5">
      <p><slot name="describetion-text" /></p>
    </div>
    <div
      class="flex justify-center text-stone-500 font-light text-left max-w-4xl w-full px-4"
    >
      <slot name="describetion-list" />
    </div>

    <div>
      <h1 class="text-center text-3xl font-bold text-primary">
        <slot mdc-unwrap="p" name="slogan-text" />
      </h1>
      <p class="text-center text-lg font-bold text-primary">
        <slot mdc-unwrap="p" name="describetion-slogan" />
      </p>
    </div>

    <div>
      <p class="text-start text-lg font-bold text-primary">
        <slot mdc-unwrap="p" name="strategy-text" />
      </p>
      <div
        class="flex justify-start font-light text-stone-500 max-w-4xl w-full px-4"
      >
        <slot name="strategy-list" />
      </div>
    </div>
  </div>
</template>
