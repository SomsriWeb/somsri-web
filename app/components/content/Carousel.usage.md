## Dynamic (Vue — ใช้ `itemsData` + default slot)

ใช้ในคอมโพเนนต์ Vue โดยส่ง array แล้วเรนเดอร์แต่ละ slide ผ่าน `#default="{ item, index }"`:

```vue
<script setup lang="ts">
const photos = [
  { src: '/home/portfolio/1.jpg', alt: '1' },
  { src: '/home/portfolio/2.jpg', alt: '2' },
]
</script>

<template>
  <!-- Nuxt auto-import: ไฟล์ใน `components/content/` มักเป็น prefix `Content` -->
  <ContentCarousel :items-data="photos">
    <template #default="{ item, index }">
      <ProseImg :src="(item as { src: string }).src" :alt="(item as { alt: string }).alt" class="rounded-lg object-cover aspect-video w-full" />
    </template>
  </ContentCarousel>
</template>
```

เมื่อ `itemsData.length > 0` จะใช้โหมดนี้ และ **ไม่** ใช้ slot ชื่อ `item-1..n`

---

## Legacy (Markdown — `item-1` … `item-N`)

### Images

::carousel{:items="3" :slidesPerView="1" :spaceBetween="16" :autoplayDelay="3000"}
#item-1
:prose-img{src="/home/portfolio/1.jpg" alt="ตัวอย่างภาพ 1" class="rounded-lg object-cover aspect-video w-full"}

#item-2
:prose-img{src="/home/portfolio/2.jpg" alt="ตัวอย่างภาพ 2" class="rounded-lg object-cover aspect-video w-full"}

#item-3
:prose-img{src="/home/portfolio/3.jpg" alt="ตัวอย่างภาพ 3" class="rounded-lg object-cover aspect-video w-full"}
::

### Cards (ใส่อะไรก็ได้ภายใน slot)

::carousel{:items="2" :slidesPerView="1" :autoplayDelay="null"}
#item-1
<div class="rounded-xl border border-stone-200 p-4 space-y-2">
  <p class="text-lg font-bold text-primary">หัวข้อการ์ด 1</p>
  <p class="text-stone-600">เนื้อหาการ์ด (ใส่ component อื่นก็ได้)</p>
</div>

#item-2
<div class="rounded-xl border border-stone-200 p-4 space-y-2">
  <p class="text-lg font-bold text-primary">หัวข้อการ์ด 2</p>
  <p class="text-stone-600">ตัวอย่าง card layout แบบง่าย</p>
</div>
::

### Video (ไฟล์ mp4 ใน public)

::carousel{:items="1" :slidesPerView="1" :autoplayDelay="null"}
#item-1
<video class="w-full rounded-lg" controls muted playsinline preload="metadata" poster="/home/header.jpg">
  <source src="/home/SomsriGarment.mp4" type="video/mp4" />
</video>
::
