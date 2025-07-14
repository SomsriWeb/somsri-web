<script setup lang="ts"></script>

<template>
    <!--รูปภาพ เนื้อหา-->
    <div class="flex justify-center pb-5">
      <slot mdc-unwrap="p" name="image" />
  </div>

  <!--ข้อความหัวข้อ-->
  <div class="text-center text-primary text-3xl font-bold pb-5 m-0">
    <h1><slot name="title-text" mdc-unwrap="p" /></h1>
    <h2><slot name="sub-title-text" mdc-unwrap="p" /></h2>
    <p class="text-lg font-light">
      <slot mdc-unwrap="p" name="discription-text" />
    </p>


  </div>
</template>
