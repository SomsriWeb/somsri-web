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

คอมโพเนนต์นี้**ไม่มี autoplay** — เลื่อนด้วยปุ่ม prev/next หรือท่าทางสัมผัสของ Swiper เท่านั้น

ถ้าต้องการให้สไลด์ขยายแล้วไม่ถูกตัด ให้ส่ง `:slide-overflow-visible="true"` (หรือ `slideOverflowVisible`)

---

## Legacy (Markdown — `item-1` … `item-N`)

### Images

::carousel{:items="3" :slidesPerView="1" :spaceBetween="16"}
#item-1
:prose-img{src="/home/portfolio/1.jpg" alt="ตัวอย่างภาพ 1" class="rounded-lg object-cover aspect-video w-full"}

#item-2
:prose-img{src="/home/portfolio/2.jpg" alt="ตัวอย่างภาพ 2" class="rounded-lg object-cover aspect-video w-full"}

#item-3
:prose-img{src="/home/portfolio/3.jpg" alt="ตัวอย่างภาพ 3" class="rounded-lg object-cover aspect-video w-full"}
::

### Cards (ใส่อะไรก็ได้ภายใน slot)

::carousel{:items="2" :slidesPerView="1"}
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

### การ์ดขยายเมื่อ hover (`slideOverflowVisible`)

ค่าเริ่มต้นแคโรเซลใช้ `overflow-hidden` จึงตัดส่วนที่ scale ออกนอกกรอบสไลด์ ถ้าต้องการให้การ์ดขยายแล้วล้นออกมาได้ ให้เปิด prop นี้ แล้วใส่ `hover:scale-*` หรือ `HoverPreview` บนเนื้อหาใน `#item-*`  

เมื่อเปิด `slideOverflowVisible` โดยไม่ระบุเพิ่ม คอมโพเนนต์จะ **เว้นที่ให้การ์ดข้างโดยอัตโนมัติ**: บวกระยะระหว่างสไลด์เพิ่ม (`slideSpaceExtra` ดีฟอลต์ 12px) และใส่ padding ซ้าย-ขวาในแต่ละสไลด์ (`slideGutterX` ดีฟอลต์ 16px) เพื่อลดการทับการ์ดข้างเวลาขยาย ถ้าอยากห่าง/ชิดกว่านี้ให้ส่ง prop เป็นตัวเลขเอง หรือส่ง `:slideGutterX="0"` / `:slideSpaceExtra="0"` เพื่อปิดแต่ละอย่าง  

โหมดนี้ยัง **ปิด Swiper `observer` / `resizeObserver` ค่าเริ่มต้นของ `swiper-container`** และรีเลย์เอาต์จาก `ResizeObserver` เฉพาะเมื่อ**ความกว้าง**แคโรเซลเปลี่ยน — เพื่อไม่ให้ความสูงที่เปลี่ยนตอน hover ไปเรียก `update()` แล้วการ์ดดูเหมือนถูกสลับ ถ้าจำนวนสไลด์เท่ากับ `slidesPerView` (เช่น 3 ใบ / แสดง 3) แนะนำ `:loop="false"`  

ถ้าใช้ `HoverPreview` พร้อม `expandOnHover` ให้ใส่ข้อความใต้การ์ดใน slot **`#caption`**; ปรับแถบ caption ด้วย `captionClass` ได้

::carousel{:items="3" :slidesPerView="3" :slideOverflowVisible="true"}
#item-1
<div class="relative z-0 rounded-xl border border-stone-200 p-4 transition-transform duration-200 hover:z-20 hover:scale-105">
  <p class="text-lg font-bold text-primary">การ์ด 1</p>
  <p class="text-stone-600 text-sm">hover เพื่อขยายทับการ์ดข้าง</p>
</div>

#item-2
<div class="relative z-0 rounded-xl border border-stone-200 p-4 transition-transform duration-200 hover:z-20 hover:scale-105">
  <p class="text-lg font-bold text-primary">การ์ด 2</p>
  <p class="text-stone-600 text-sm">ใช้ hover:z-20 ให้อยู่ชั้นบนเมื่อขยาย</p>
</div>

#item-3
<div class="relative z-0 rounded-xl border border-stone-200 p-4 transition-transform duration-200 hover:z-20 hover:scale-105">
  <p class="text-lg font-bold text-primary">การ์ด 3</p>
  <p class="text-stone-600 text-sm">อาจต้องเว้น padding รอบแคโรเซลถ้าเลย์เอาต์แน่น</p>
</div>
::

---

### Video (ไฟล์ mp4 ใน public)

::carousel{:items="1" :slidesPerView="1"}
#item-1
<video class="w-full rounded-lg" controls muted playsinline preload="metadata" poster="/home/header.jpg">
  <source src="/home/SomsriGarment.mp4" type="video/mp4" />
</video>
::
