<script lang="ts" setup></script>

<template>
  <div
    class="flex flex-col lg:flex-row  items-start gap-4 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
  >
    <!-- Left: Contact Info -->
    <div class="w-full lg:w-1/2 ">
      <ProseH1> Address </ProseH1>
      <ProseP>
        <div class="text-center sm:text-left">
          <slot mdc-unwrap="p" name="Address" />
        </div>
      </ProseP>
    </div>

    <!-- Right: Map Image -->
    <div class="w-full lg:w-1/2 flex flex-col items-center">
      <img
        src="/contact/map-unsmushed.jpg"
        alt="map"
        class="rounded-md shadow-md w-full max-w-full sm:max-w-md"
      />
      <UButton
        to="https://maps.app.goo.gl/nWXonjutukkt8Ux89"
        target="_blank"
        label="Google Maps"
        variant="solid"
        class="mt-3"
        icon="mage:map-marker"
      />
    </div>
  </div>
</template>
