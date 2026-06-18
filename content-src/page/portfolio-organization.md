---
i18n:
  title:
    th: รวมผลงานผลิตเสื้อ กลุ่มลูกค้าองค์กร | สมศรีมีเสื้อ
    en: Shirt Production Portfolio — Corporate Clients | Somsri
  description:
    th: รวมผลงานผลิตเสื้อองค์กร สมศรีมีเสื้อ รับผลิตเสื้อบริษัท เสื้อยูนิฟอร์ม
      งานสกรีนโลโก้ คุณภาพดี ส่งเร็ว
    en: A portfolio of corporate shirt production by Somsri — company shirts and
      uniforms with quality logo printing and fast delivery.
  intro:
    th: >-
      เสื้อองค์กร เสื้อบริษัท ต้องการทั้งความสุภาพ ความเป็นมืออาชีพ
      และความทนทานต่อการใช้งานจริง
        สมศรีมีเสื้อเข้าใจดีถึงภาพลักษณ์ขององค์กรที่ต้องการสื่อสารผ่านเสื้อพนักงาน เสื้อกิจกรรม
        เราจึงคัดสรรเนื้อผ้าที่เหมาะสมกับการใช้งานระยะยาว พร้อมให้คำแนะนำด้านเทคนิคการพิมพ์โลโก้
        ที่คมชัดและติดทน เพื่อให้ทุกองค์กรมั่นใจว่าสวมใส่แล้วดูดีทั้งทีม
    en: Corporate and company shirts call for politeness, professionalism and
      real-world durability. Somsri understands the image an organization wants
      to convey through staff and activity shirts, so we select fabrics suited
      to long-term use and advise on logo-printing techniques that stay sharp
      and last — so every organization can be confident the whole team looks
      great.
  ex_desc:
    th: >-
      รวมผลงานเสื้อองค์กรและเสื้อบริษัทที่เราผลิตให้กับองค์กรชั้นนำ
      ทั้งงานสกรีนโลโก้ งานปักโลโก้
        และการผลิตเสื้อยูนิฟอร์มคุณภาพสูง เหมาะกับทุกประเภทองค์กรทั้งขนาดเล็กและขนาดใหญ่
    en: A collection of corporate and company shirts we produced for leading
      organizations — logo screen printing, logo embroidery and high-quality
      uniform production, suited to every kind of organization, both small and
      large.
  cta_p:
    th: ส่งแบบ/โลโก้ และจำนวนที่ต้องการมาได้เลย ทีมงานช่วยแนะนำเนื้อผ้า
      เทคนิคปัก-สกรีน :br พร้อมประเมินราคาและระยะเวลาผลิตให้ภายในแชท
    en: Just send your design/logo and the quantity you need. Our team will
      recommend fabrics and embroidery/screen-printing techniques :br and give
      you a price and production timeline right in the chat.
  cta_h2:
    th: สนใจสั่งทำเสื้อโปโลยูนิฟอร์ม ติดต่อสอบถาม ประเมินราคาฟรี
    en: Interested in custom polo uniforms? Contact us for a free quote
  why_title:
    th: เลือกผลิตเสื้อยืดกับสมศรีแล้วดียังไง?
    en: Why produce your shirts with Somsri?
  h1:
    th: รวมผลงานผลิตเสื้อ กลุ่มลูกค้าองค์กร
    en: Shirt Production Portfolio — Corporate Clients
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
    ::::prose-img{alt="{{ex_subtitle}}เสื้อองค์กร" src="/port/Asset-4.png"}
    ::::
  :::

  :::port-card-organization
    ::::port-card{type="portCardOrganization"}
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