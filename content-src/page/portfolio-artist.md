---
i18n:
  title:
    th: รวมผลงานผลิตเสื้อ กลุ่มลูกค้าศิลปิน | สมศรีมีเสื้อ
    en: Shirt Production Portfolio — Artist Clients | Somsri
  description:
    th: รวมผลงานผลิตเสื้อศิลปิน สมศรีมีเสื้อ รับผลิตเสื้อยืดศิลปิน งานสกรีนคมชัด
      คุณภาพดี ส่งเร็ว
    en: A portfolio of artist shirt production by Somsri — custom artist tees with
      crisp, high-quality prints and fast delivery.
  intro:
    th: >-
      สมศรีมีเสื้อมีโอกาสได้ร่วมงานกับศิลปินหลากหลายแนวทั่วประเทศ
      ด้วยความเข้าใจในสไตล์ของแต่ละศิลปิน
        เราจึงสามารถผลิตเสื้อศิลปินที่ตอบโจทย์ด้านภาพลักษณ์และคุณภาพให้เหมาะกับการจัดจำหน่ายจริง
        ทั้งงานสกรีนแบบละเอียด สีชัด งานรีดร้อน DFT ไปจนถึงการเลือกเนื้อผ้าที่ใส่สบาย
        เหมาะกับกลุ่มแฟนคลับ ช่วยเพิ่มมูลค่าให้กับสินค้าได้อย่างชัดเจน
    en: Somsri has had the chance to work with artists across many genres
      nationwide. With an understanding of each artist’s style, we produce
      artist shirts that meet both image and quality needs and are ready for
      real distribution — from fine, vivid screen printing and DFT heat transfer
      to choosing comfortable fabrics that suit fan-club audiences, clearly
      adding value to the merchandise.
  ex_desc:
    th: >-
      รวมผลงานเสื้อศิลปินที่เราผลิตให้กับศิลปินชั้นนำ ทั้งงานสกรีนฮาฟโทน สกรีน
      DTG, DFT และเทคนิคอื่น ๆ
        ทุกชิ้นงานผ่านการดูแลอย่างมืออาชีพ เพื่อให้ศิลปินและแฟนคลับได้รับสินค้าที่ตรงตามความต้องการ
    en: A collection of artist shirts we produced for leading artists — halftone
      screen printing, DTG, DFT and other techniques. Every piece is handled
      professionally so artists and fans receive products that match their
      needs.
  cta_p:
    th: ส่งแบบ/โลโก้ และจำนวนที่ต้องการมาได้เลย ทีมงานช่วยแนะนำเนื้อผ้า
      เทคนิคปัก-สกรีน :br พร้อมประเมินราคาและระยะเวลาผลิตให้ภายในแชท
    en: Just send your design/logo and the quantity you need. Our team will
      recommend fabrics and embroidery/screen-printing techniques :br and give
      you a price and production timeline right in the chat.
  cta_h2:
    th: สนใจสั่งทำเสื้อยืด ติดต่อสอบถาม ประเมินราคาฟรี
    en: Interested in custom T-shirts? Contact us for a free quote
  why_title:
    th: เลือกผลิตเสื้อยืดกับสมศรีแล้วดียังไง?
    en: Why produce your T-shirts with Somsri?
  h1:
    th: รวมผลงานผลิตเสื้อ กลุ่มลูกค้าศิลปิน
    en: Shirt Production Portfolio — Artist Clients
  line_btn:
    th: แอดไลน์สั่งทำเสื้อ
    en: Add us on LINE to order
  reviews:
    th: รีวิวจากลูกค้า
    en: Customer Reviews
  ex_subtitle:
    th: ตัวอย่างผลงาน
    en: Featured Work
title: "{{title}}"
description: "{{description}}"
activeNavbar: true
lineLink: https://contact.somsritshirt.com/3fd08
---


::container
  :::port-header
  #title
  {{h1}}

  #describetion
  {{intro}}
  :::

  :::port-sub-header
  #subtitle
  {{ex_subtitle}}

  #describetion
  {{ex_desc}}

  #image
    ::::prose-img{alt="{{ex_subtitle}}เสื้อศิลปิน" src="/port/Asset-5.png"}
    ::::
  :::

  :::port-card-artist
    ::::port-card{type="portCardArtist"}
    ::::
  :::

::

:::why-choose-somsri
  #title
  {{why_title}}

:::

::container
    :::port-review
    #othertitle
    {{reviews}}
    :::
::

::container
    :::prose-h2
    {{cta_h2}}
    :::

    :::prose-p{.text-center}
    {{cta_p}}
    :::

    :::center
    ::::line-link
        :::::line-button
        {{line_btn}}
        :::::
    ::::
    :::
::