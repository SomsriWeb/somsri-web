<script setup lang="ts"></script>

<template>
  <!-- รูปภาพ เเบนเนอร์ -->
  <div class="flex justify-center">
    <slot mdc-unwrap="p" name="image-main" />
  </div>

    <!--รูปภาพ เนื้อหา-->
    <div class="flex justify-center">
      <slot mdc-unwrap="p" name="image" />
  </div>

  <!--ข้อความหัวข้อ-->
  <div class="text-center text-primary text-3xl font-bold p-5 m-0">
    <h1><slot name="title-text" mdc-unwrap="p" /></h1>

    <p class="text-lg font-light">
      <slot mdc-unwrap="p" name="discription-text" />
    </p>
  </div>
</template>
