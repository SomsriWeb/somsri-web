---
i18n:
  title:
    th: รับผลิตเสื้อยืด คุณภาพดี ราคาส่ง กับสมศรีมีเสื้อ
    en: Custom T-Shirts — Great Quality, Wholesale Prices with Somsri
  description:
    th: โรงงานผลิตเสื้อยืด งานไว ส่งเร็ว ราคาดีมีคุณภาพ ครบวงจร
      ไม่ว่าจะเป็นการสกรีนเสื้อรูปแบบไหน
      เราผลิตได้ตามความต้องการเน้นคุณภาพและการบริการ
    en: A T-shirt factory that’s fast, ships quickly and offers great quality at
      good prices — full service. Whatever the print style, we produce it to
      your needs with a focus on quality and service.
  hero_title:
    th: "เสื้อยืดระดับพรีเมี่ยม :br เสื้อยูนิฟอร์มที่เป็นได้มากกว่า"
    en: "Premium T-shirts :br Uniforms that do so much more"
  hero_desc:
    th: สมศรีรับผลิตเสื้อยืดไม่ว่าจะเป็นการสกรีนเสื้อบริษัท รูปแบบไหน เราผลิตได้ตามความต้องการเน้นคุณภาพและการบริการ ความพึงพอใจเกินความคาดหมาย
    en: Somsri produces T-shirts and company-shirt printing of every style, made to your needs with a focus on quality and service — satisfaction beyond expectations.
  cta_order:
    th: สั่งผลิตกับสมศรี
    en: Order with Somsri
  fabric_title:
    th: เนื้อผ้าที่สมศรีแนะนำสำหรับเสื้อยืด
    en: Fabrics Somsri recommends for T-shirts
  fabric_desc:
    th: สมศรีมีเนื้อผ้าหลากหลายให้คุณได้เลือกสั่งผลิต แต่ถ้าเลือกไม่ได้สมศรีมีทีมที่คอยให้คำปรึกษาได้ทันที
    en: Somsri offers a wide range of fabrics to choose from — and if you can't decide, our team is ready to advise right away.
  fabric_note:
    th: \*ส่งตัวอย่างผ้าฟรีเมื่อสั่งขั้นต่ำ 100 ตัว
    en: \*Free fabric samples with a minimum order of 100 pcs
  size_title:
    th: ไซซ์เสื้อยืด
    en: T-shirt Sizes
  price_title:
    th: ราคาเสื้อยืด
    en: T-shirt Prices
  why_title:
    th: เลือกผลิตเสื้อยืดกับสมศรีแล้วดียังไง?
    en: Why produce your T-shirts with Somsri?
  cta_here:
    th: สั่งผลิตได้ที่นี่เลย!
    en: Order right here!
title: "{{title}}"
activeNavbar: false
description: "{{description}}"
footer: true
language: th
lineFloatingButton: true
lineLink: https://contact.somsritshirt.com/f8266
navbar: true
เพิ่ม script ใน head:
  - content: '{   "@context": "https://schema.org/",   "@type": "Product",   "name":
      "รับผลิตเสื้อยืด",   "image":
      "https://somsritshirt.com/_ipx/f_webp/product/tshirt.jpg",   "description":
      "บริการรับผลิตเสื้อยืด พร้อมบริการสกรีนโลโก้ สกรีนลาย ครบวงจร
      สามารถออกแบบได้เอง มีเนื้อผ้าคุณภาพดีให้เลือกหลายแบบ
      เราผลิตได้ตามความต้องการเน้นคุณภาพและการบริการ
      ความพึงพอใจเกินความคาดหมาย",   "brand": {     "@type":
      "Brand",     "name": "สมศรีมีเสื้อ"   },   "offers": {     "@type":
      "AggregateOffer",     "url":
      "https://somsritshirt.com/tshirt",     "priceCurrency":
      "THB",     "lowPrice": "70",     "highPrice":
      "188"   },   "aggregateRating": {     "@type":
      "AggregateRating",     "ratingValue": "4.83",     "bestRating":
      "5",     "worstRating": "1",     "ratingCount":
      "164"   },   "mainEntityOfPage": {     "@type":
      "Service",     "serviceType": "Custom Apparel
      Manufacturing",     "provider": {       "@type":
      "LocalBusiness",       "name": "สมศรีมีเสื้อ",       "address":
      {         "@type": "PostalAddress",         "streetAddress": "บริษัท
      สมศรีการ์เมนท์ จำกัด 1033/6 ถนนเพชรเกษม 106
      แขวงหนองค้างพลู",         "addressLocality":
      "เขตหนองแขม",         "addressRegion":
      "กรุงเทพมหานคร",         "postalCode": "10160",         "addressCountry":
      "TH"       }     }   } }'
    type: application/ld+json
---


::landing-page-header-style-two
---
image: /tshirt/banner.png
---
#title
{{hero_title}}

#description
{{hero_desc}}

#cta
  :::line-link
    ::::u-button
      :::::unwrap-mdc
      {{cta_order}}
      :::::
    ::::
  :::
::

::container
  :::title-with-description
  #title
  ## {{fabric_title}}

  #description
  {{fabric_desc}}
  :::

:available-fabric{type="tshirt"}

  :::prose-p{.!text-primary}
  {{fabric_note}}
  :::

## {{size_title}}

:tshirt-size

## {{price_title}}

:price-by-fabric{type="tshirt"}

  :::tshirt-image
  #image
  :prose-img{.max-w alt="sport price" src="/tshirt/price.png"}
  :::

:somsri-produce-for
::

::why-choose-somsri
---
class: mb-6
---
#title
{{why_title}}
::

::center
  :::line-link
    ::::u-button{.mb-6}
      :::::unwrap-mdc
      {{cta_here}}
      :::::
    ::::
  :::
::
