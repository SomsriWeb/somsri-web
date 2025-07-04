<script setup>
    
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 items-stretch">

    <div class="px-[4.6rem] py-[3rem] flex flex-col justify-center">
      <h1 class="text-start text-5xl font-bold text-primary mb-3">
        <div class="text-xl mb-1 text-primary">กลุ่มลูกค้า</div>
        <slot name="subtitle" />
      </h1>
      <p class="text-start text-stone-500 text-lg font-light">
        <slot name="describetion" />
      </p>
    </div>

<div class="relative flex items-center justify-center p-6">
  <div class="w-full max-w-[800px]  rounded-2xl overflow-hidden shadow-md">
    <slot name="image" />
  </div>
</div>
  </div>

  
</template>
