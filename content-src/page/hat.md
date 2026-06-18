---
i18n:
  title:
    th: รับผลิตหมวก หมวกแก๊ป หมวกพรีเมียม สกรีนและปักโลโก้แบรนด์ | สมศรีมีเสื้อ
    en: Custom Hats & Caps — Premium Caps with Brand Screen Printing & Embroidery |
      Somsri
  description:
    th: โรงงานผลิตหมวกคุณภาพสูง พร้อมสกรีนและปักโลโก้สวยคมชัด สั่งผลิตหมวกเป็นทีม
      หมวกแก๊ป หมวกบักเก็ต หมวกเดินป่า ตรงปก ส่งงานไว รับประกัน 90 วัน
      ใส่ใจทุกรายละเอียด
    en: High-quality hat factory with sharp logo screen printing and embroidery.
      Order team caps, bucket hats and hiking hats — true to design, fast
      delivery, 90-day guarantee, attention to every detail.
  pill_1:
    th: ขั้นต่ำ 100 ชิ้น
    en: Minimum 100 pcs
  pill_2:
    th: เริ่มต้นชิ้นละ 60 บาท
    en: From 60 baht per piece
  h1:
    th: รับผลิตหมวก
    en: Custom Hat Manufacturing
  hero_desc:
    th: งานเกรดพรีเมี่ยม คุณภาพส่งออก งานแบรนด์ ราคาย่อมเยาว์
    en: Premium grade, export quality, brand-ready work at affordable prices
  types_title:
    th: ชนิดหมวกและตารางราคา
    en: Hat Types & Price List
  clients_title:
    th: สมศรีผลิตให้กับใครบ้าง
    en: Our Clients
  clients_desc:
    th: สมศรีมีเสื้อพร้อมที่จะตอบสนองความต้องการของสินค้า แบรนด์
      รวมไปถึงองค์กรของคุณ ด้วยเครื่องมือที่ทันสมัยหลากหลายเทคโนโลยี ออกแบบ ผลิต
      สกรีน และปัก ครบจบที่เดียว
    en: Somsri is ready to meet the needs of your products, brand and organization
      with modern, multi-technology tools — design, production, screen printing
      and embroidery, all in one place.
  ask:
    th: สอบถามเพิ่มเติม
    en: Ask for more details
title: "{{title}}"
activeNavbar: true
description: "{{description}}"
footer: false
language: th
lineFloatingButton: true
lineLink: https://line.me/R/ti/p/%40diz8986o
navbar: true
เพิ่ม script ใน head: []
---


::landing-page-header-style-one
---
image: /landing-page-real-hat/banner.png
---
  :::description-pills
  ---
  slot: 2
  ---
  #slot-1
    ::::prose-p{.!text-primary}
    {{pill_1}}
    ::::

  #slot-2
    ::::prose-p{.!text-primary}
    {{pill_2}}
    ::::
  :::

#title
{{h1}}

#description
{{hero_desc}}
::

::container
  :::new-hat-style
  #title
  ## {{types_title}}
  :::
::

::line-link
  :::line-button
  {{ask}}
  :::
::

\::

:why-choose-somsri

::container
  :::somsri-produce-for
  #title
  {{clients_title}}

  #description
  {{clients_desc}}
  :::
::

::container
:how-to-order

  :::image-grid
  ---
  items: 6
  imageFit: cover
  ---
  #item-1
  :prose-img{alt="ตัวอย่างหมวก" src="/landing-page-real-hat/portfolio/portfolio-1.png"}

  #item-2
  :prose-img{alt="ตัวอย่างหมวก" src="/landing-page-real-hat/portfolio/portfolio-2.jpg"}

  #item-3
  :prose-img{alt="ตัวอย่างหมวก" src="/landing-page-real-hat/portfolio/portfolio-3.jpg"}

  #item-4
  :prose-img{alt="ตัวอย่างหมวก" src="/landing-page-real-hat/portfolio/portfolio-4.jpg"}

  #item-5
  :prose-img{alt="ตัวอย่างหมวก" src="/landing-page-real-hat/portfolio/portfolio-5.jpg"}

  #item-6
  :prose-img{alt="ตัวอย่างหมวก" src="/landing-page-real-hat/portfolio/portfolio-6.jpg"}
  :::
::

::line-link
  :::line-button{.mb-6}
  {{ask}}
  :::
::
