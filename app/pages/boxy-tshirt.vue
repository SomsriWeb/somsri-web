<script setup lang="ts">
import { LINE_LINK } from '~/lib/lineLink';
import { USE_NAVBAR } from '~/lib/useNavbar';


provide(LINE_LINK, 'https://contact.somsritshirt.com/3d975');
provide(USE_NAVBAR, true);


const galleryFilter = ref('all');
const structuredData= {
  "@context": "https://schema.org",
   "@graph": [
    {
      "@type": ["Organization", "LocalBusiness"],
      "@id": "https://somsritshirt.com/#org",
      "name": "สมศรีมีเสื้อ (บริษัท สมศรีการ์เมนท์ จำกัด)",
      "alternateName": "Somsri Garment",
      "url": "https://somsritshirt.com/",
      "logo": "https://somsritshirt.com/logo.svg",
      "image": "https://somsritshirt.com/og.jpg",
      "telephone": "+66-2-430-0678",
      "foundingDate": "2017",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "1033/6 ถนนเพชรเกษม 106 แขวงหนองค้างพลู",
        "addressLocality": "เขตหนองแขม",
        "addressRegion": "กรุงเทพมหานคร",
        "postalCode": "10160",
        "addressCountry": "TH"
      },
      "sameAs": [
        "https://www.facebook.com/somsritshirt",
        "https://www.instagram.com/somsritshirt/",
        "https://www.tiktok.com/@somsritshirt_brand"
      ]
    },
    {
      "@type": "Service",
      "@id": "https://somsritshirt.com/boxy-tshirt#service",
      "name": "รับผลิตเสื้อ Boxy",
      "serviceType": "ผลิตเสื้อยืดทรง Boxy พร้อมสกรีนและปัก",
      "provider": { "@id": "https://somsritshirt.com/#org" },
      "areaServed": { "@type": "Country", "name": "Thailand" },
      "description": "รับผลิตเสื้อทรง Boxy สำหรับแบรนด์ องค์กร และศิลปิน แกะแพทเทิร์นตามแบบ เลือกผ้าได้ สกรีน ปัก ครบวงจร ขั้นต่ำ 150 ตัวต่อสีต่อแบบ",
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "THB",
        "lowPrice": "136",
        "highPrice": "184",
        "description": "เรทอ้างอิงเสื้อยืดรวมสกรีน 1 จุด 1 สี ราคาทรง Boxy ประเมินตามแพทเทิร์นและผ้า"
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "หน้าหลัก", "item": "https://somsritshirt.com/" },
        { "@type": "ListItem", "position": 2, "name": "เสื้อยืด", "item": "https://somsritshirt.com/tshirt" },
        { "@type": "ListItem", "position": 3, "name": "รับผลิตเสื้อ Boxy", "item": "https://somsritshirt.com/boxy-tshirt" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "เสื้อ Boxy คืออะไร?", "acceptedAnswer": { "@type": "Answer", "text": "เสื้อ Boxy คือเสื้อยืดทรงกล่อง ช่วงอกกว้าง ด้านข้างตรงจากรักแร้ถึงชายเสื้อ และตัวสั้นกว่าเสื้อทั่วไป เมื่อใส่แล้วตัวเสื้อจะดูเป็นทรงสี่เหลี่ยม นิยมใช้กับผ้าหนาเพื่อให้อยู่ทรง" } },
        { "@type": "Question", "name": "เสื้อ Boxy ต่างจากเสื้อ Oversize อย่างไร?", "acceptedAnswer": { "@type": "Answer", "text": "Oversize เน้นหลวมทั้งตัว ตัวยาว ไหล่ตก และทิ้งตัว ส่วน Boxy เน้นความกว้างที่อกแต่ตัวสั้นกว่า ด้านข้างตรง ทรงคงรูปเป็นกล่อง" } },
        { "@type": "Question", "name": "สั่งผลิตเสื้อ Boxy ขั้นต่ำกี่ตัว?", "acceptedAnswer": { "@type": "Answer", "text": "ขั้นต่ำ 150 ตัวต่อสีต่อแบบ" } },
        { "@type": "Question", "name": "เสื้อ Boxy ควรใช้ผ้าอะไร?", "acceptedAnswer": { "@type": "Answer", "text": "แนะนำผ้าเนื้อหนาที่อยู่ทรง เช่น 240 Max (300 แกรม), Cotton 25 Heavy (260 แกรม) หรือ Cotton Comb 40 Interlock (240 แกรม) หากต้องการนุ่มบางลงใช้ Cotton Comb 20 (220 แกรม) ได้" } },
        { "@type": "Question", "name": "มีแพทเทิร์นเสื้อ Boxy ของตัวเอง ส่งตัวอย่างมาให้แกะได้ไหม?", "acceptedAnswer": { "@type": "Answer", "text": "ได้ ส่งเสื้อต้นแบบมาให้แกะแพทเทิร์นได้ ค่าแกะแพทเทิร์น 500 บาท และค่าเกลี่ยไซซ์ 150 บาทต่อไซซ์" } },
        { "@type": "Question", "name": "ผลิตเสื้อ Boxy ใช้เวลากี่วัน?", "acceptedAnswer": { "@type": "Answer", "text": "เฉลี่ย 14–21 วันทำการ นับจากวันที่อนุมัติเสื้อตัวอย่าง" } }
     ]
    }
  ]
};
useSeoMeta({
    title: 'รับผลิตเสื้อ Boxy ขั้นต่ำ 150 ตัว แกะแพทเทิร์นทรงกล่อง พร้อมสกรีน-ปัก | สมศรีมีเสื้อ',
    description: 'โรงงานรับผลิตเสื้อ Boxy (เสื้อทรงกล่อง) สำหรับแบรนด์เสื้อ เสื้อทีม เสื้อศิลปิน เลือกผ้าหนา Cotton 25 Heavy, 240 Max ได้ แกะแพทเทิร์นตามแบบ สกรีน ปัก ครบในที่เดียว ขั้นต่ำ 150 ตัว ออกแบบฟรี รับประกัน 90 วัน',
    keywords: 'รับผลิตเสื้อ boxy, เสื้อ boxy, เสื้อทรง boxy, สั่งทำเสื้อ boxy, โรงงานผลิตเสื้อ boxy, เสื้อ boxy fit, เสื้อ boxy คือ, เสื้อทรงกล่อง',
    robots: 'index, follow, max-image-preview:large',

    ogType: 'website',
    ogLocale: 'th_TH',
    ogSiteName: 'สมศรีมีเสื้อ',
    ogTitle: 'รับผลิตเสื้อ Boxy ขั้นต่ำ 150 ตัว | สมศรีมีเสื้อ',
    ogDescription: 'ผลิตเสื้อทรง Boxy สำหรับแบรนด์ แกะแพทเทิร์น เลือกผ้าหนา สกรีน-ปักครบ ขั้นต่ำ 150 ตัว รับประกัน 90 วัน',
    ogUrl: 'https://somsritshirt.com/boxy-tshirt',
    ogImage: 'https://somsritshirt.com/boxy-tshirt/og-boxy.jpg',

    twitterCard: 'summary_large_image',
    twitterTitle: 'รับผลิตเสื้อ Boxy ขั้นต่ำ 150 ตัว | สมศรีมีเสื้อ',
    twitterDescription: 'ผลิตเสื้อทรง Boxy สำหรับแบรนด์ แกะแพทเทิร์น เลือกผ้าหนา สกรีน-ปักครบ',
    twitterImage: 'https://somsritshirt.com/boxy-tshirt/og-boxy.jpg',
});

useHead({
    titleTemplate: '%s',
    htmlAttrs: {
        lang: 'th',
    },
    meta: [
        {
            name: 'theme-color',
            content: '#A52241',
        },
    ],
    link: [
                {
            rel: 'preconnect',
            href: 'https://fonts.googleapis.com',
        },
        {
            rel: 'preconnect',
            href: 'https://fonts.gstatic.com',
            crossorigin: 'anonymous',
        },
        {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Anuphan:wght@400;500;700&display=swap',
        },
        {
            rel: 'canonical',
            href: 'https://somsritshirt.com/boxy-tshirt',
        },
               {
            rel: 'preload',
            as: 'image',
            href: '/boxy-tshirt/images/boxy-street.webp',
        },
    ],
    script: [
        {
            type: 'application/ld+json',
            textContent: JSON.stringify(structuredData),
        },
    ],
});

</script>

<template>
    <NuxtLayout name="color">
        <div class="boxy-page">
            <svg width="0" height="0" style="position:absolute" aria-hidden="true">
  <symbol id="i-line" viewBox="0 0 48 48"><circle cx="24" cy="24" r="24" fill="#fff"/><path fill="#06C755" d="M24 11c-8.3 0-15 5.4-15 12.1 0 6 5.3 11 12.5 11.9.5.1 1.1.3 1.3.7.2.4.1.9.1 1.3l-.2 1.3c-.1.4-.3 1.5 1.3.8 1.6-.7 8.7-5.1 11.8-8.8 2.2-2.4 3.2-4.8 3.2-7.3C39 16.4 32.3 11 24 11Z"/><path fill="#fff" d="M16.4 26.4h-3a.8.8 0 0 1-.8-.8v-5.9a.8.8 0 1 1 1.6 0v5.1h2.2a.8.8 0 1 1 0 1.6Zm3.1-.8a.8.8 0 1 1-1.6 0v-5.9a.8.8 0 1 1 1.6 0v5.9Zm7.2 0a.8.8 0 0 1-1.4.5l-3-4.1v3.6a.8.8 0 1 1-1.6 0v-5.9a.8.8 0 0 1 1.4-.5l3 4.1v-3.6a.8.8 0 1 1 1.6 0v5.9Zm4.8-3.7a.8.8 0 1 1 0 1.6h-2.2v1.3h2.2a.8.8 0 1 1 0 1.6h-3a.8.8 0 0 1-.8-.8v-5.9c0-.4.4-.8.8-.8h3a.8.8 0 1 1 0 1.6h-2.2v1.4h2.2Z"/></symbol>
  <symbol id="i-check" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="currentColor" opacity=".15"/><path d="m7 12.5 3.2 3.2L17 9" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></symbol>
</svg>


            <main>
  <!-- HERO -->
  <section class="hero" aria-labelledby="hero-title">
    <div class="hero-bg"><img src="/boxy-tshirt/images/boxy-street.webp" alt="" fetchpriority="high" width="1200" height="800"></div>
    <div class="container">
      <span class="hero-eyebrow">Boxy Fit · Made by Somsri</span>
      <h1 id="hero-title">รับผลิตเสื้อ <span>Boxy</span><br><span class="nw">สำหรับแบรนด์ของคุณ</span></h1>
      <p class="hero-lead">โรงงานรับผลิตเสื้อ Boxy ทรงกล่อง อกกว้าง ตัวสั้น อยู่ทรงสวย แกะแพทเทิร์นตามแบบที่ต้องการ เลือกผ้าหนาได้ พร้อมสกรีนและปักจบในที่เดียว</p>
      <div class="hero-actions">
        <a class="btn btn-line btn-xl" href="https://contact.somsritshirt.com/3d975" target="_blank" rel="noopener"><svg aria-hidden="true"><use href="#i-line"/></svg>ทักไลน์ ขอราคาเสื้อ Boxy</a>
        <a class="btn btn-ghost" href="#price">ดูราคา</a>
      </div>
      <ul class="hero-facts">
        <li>ขั้นต่ำ <b>150</b> ตัว</li>
        <li>ผลิต <b>14–21</b> วันทำการ</li>
        <li>รับประกัน <b>90</b> วัน</li>
        <li>ออกแบบ <b>ฟรี</b></li>
      </ul>
    </div>
  </section>

  <div class="container"><nav class="crumbs" aria-label="breadcrumb"><a href="https://somsritshirt.com/">หน้าหลัก</a> › <a href="https://somsritshirt.com/tshirt">เสื้อยืด</a> › รับผลิตเสื้อ Boxy</nav></div>

  <!-- 1 ABOUT -->
  <section id="about" class="sec" aria-labelledby="about-title">
    <div class="container">
      <div class="intro">
        <div class="intro-figure">
          <img src="/boxy-tshirt/images/boxy-vs-regular-fit.webp" alt="เปรียบเทียบเสื้อ Boxy Fit ทรงหลวม ไหล่ตก กับ Regular Fit ทรงปกติพอดีตัว ทั้งชายและหญิง" width="1536" height="1024" loading="lazy">
          <div class="intro-badge"><span>ขั้นต่ำเพียง</span><b>150 ตัว</b><span>ต่อสี ต่อแบบ · เหมาะกับแบรนด์ที่เพิ่งเริ่ม</span></div>
        </div>
        <div>
          <span class="sec-num">01 · แนะนำร้าน</span>
          <h2 id="about-title">สมศรีมีเสื้อ โรงงานรับผลิตเสื้อ Boxy ครบวงจร</h2>
          <p>บริษัท สมศรีการ์เมนท์ จำกัด ผลิตเสื้อมาตั้งแต่ปี 2017 ให้ทั้งแบรนด์เสื้อผ้า ศิลปิน และองค์กรชั้นนำ เราทำเสื้อ Boxy ตั้งแต่ขั้นแรก คือแพทเทิร์น ผ้า และการพิมพ์ลาย ไปจนถึงแพ็กส่งถึงมือ</p>
          <ul class="checks">
            <li><svg><use href="#i-check"/></svg>มีแพทเทิร์น Boxy มาตรฐานให้เลือก หรือส่งเสื้อต้นแบบมาให้แกะทรงได้</li>
            <li><svg><use href="#i-check"/></svg>ผ้าหนาอยู่ทรงหลายเกรด ส่งตัวอย่างผ้าให้จับจริงฟรี</li>
            <li><svg><use href="#i-check"/></svg>สกรีน ปัก DTG DFT ทำในโรงงานเดียว คุมคุณภาพได้ทุกขั้น</li>
            <li><svg><use href="#i-check"/></svg>ขั้นต่ำ 150 ตัว/สี/แบบ เหมาะกับแบรนด์ที่เพิ่งเริ่ม</li>
          </ul>
          <a class="btn btn-line" href="https://contact.somsritshirt.com/3d975" target="_blank" rel="noopener"><svg aria-hidden="true"><use href="#i-line"/></svg>ปรึกษาฟรีทางไลน์</a>
        </div>
      </div>

      <!-- WHAT IS BOXY -->
      <div class="whatis" id="what-is-boxy">
        <div>
          <h2>เสื้อ Boxy คืออะไร?</h2>
          <p><strong>เสื้อ Boxy (Boxy Fit)</strong> คือเสื้อยืดทรงกล่อง <strong>อกกว้าง ด้านข้างตรง</strong> จากรักแร้ลงถึงชายเสื้อ และ<strong>ตัวสั้นกว่าเสื้อทั่วไป</strong> พอใส่แล้วตัวเสื้อดูเป็นสี่เหลี่ยม ส่วนใหญ่มาพร้อมไหล่ตกเล็กน้อย แขนกว้าง และใช้ผ้าเนื้อหนาเพื่อให้เสื้อคงทรง</p>
          <p>Boxy ได้รับความนิยมในแนวสตรีทและมินิมอลสไตล์ญี่ปุ่น-เกาหลี ใส่คู่กับกางเกงเอวสูงได้ดี ช่วยให้ช่วงขาดูยาวขึ้น แบรนด์เสื้อที่อยากได้ลุคพรีเมียมจึงนิยมเลือกทรงนี้</p>
          <div class="table-wrap">
            <table class="fit-table">
              <caption class="sr">เปรียบเทียบทรง Regular, Oversize และ Boxy</caption>
              <thead><tr><th scope="col"></th><th scope="col">Regular</th><th scope="col">Oversize</th><th scope="col" class="boxy">Boxy</th></tr></thead>
              <tbody>
                <tr><th scope="row">ความกว้างอก</th><td>พอดีตัว</td><td>หลวมทั้งตัว</td><td class="boxy">กว้างมาก ด้านข้างตรง</td></tr>
                <tr><th scope="row">ความยาวตัว</th><td>ปกติ</td><td>ยาว คลุมสะโพก</td><td class="boxy">สั้นกว่า (ถึงเอว–สะโพกบน)</td></tr>
                <tr><th scope="row">ไหล่</th><td>ตรงไหล่</td><td>ไหล่ตกมาก</td><td class="boxy">ไหล่ตกเล็กน้อย</td></tr>
                <tr><th scope="row">ลุค</th><td>เรียบร้อย</td><td>ทิ้งตัว สบาย ๆ</td><td class="boxy">อยู่ทรง โมเดิร์น สตรีท</td></tr>
              </tbody>
            </table>
          </div>
        </div>
        <figure class="fit-diagram" aria-labelledby="fitcap">
          <svg viewBox="0 0 520 300" role="img" aria-label="ภาพเปรียบเทียบทรงเสื้อ Regular และ Boxy">
            <g fill="#F2F2F2" stroke="#9CA3AF" stroke-width="2.5" stroke-linejoin="round">
              <path d="M70 60 L105 45 Q125 60 145 45 L180 60 L210 100 L185 115 L172 98 L172 245 L78 245 L78 98 L65 115 L40 100 Z"/>
            </g>
            <g fill="#FBEAEE" stroke="#A52241" stroke-width="3" stroke-linejoin="round">
              <path d="M300 62 L345 48 Q375 64 405 48 L450 62 L496 118 L462 136 L448 112 L448 215 L302 215 L302 112 L288 136 L254 118 Z"/>
            </g>
            <g stroke="#AE6437" stroke-width="2" fill="none" stroke-dasharray="5 4">
              <path d="M302 232 H448"/><path d="M466 62 V215"/>
            </g>
            <g font-family="Anuphan, sans-serif" font-size="17" fill="#2E3440" text-anchor="middle">
              <text x="125" y="275">Regular</text>
              <text x="375" y="275" fill="#A52241" font-weight="700">Boxy</text>
              <text x="375" y="250" font-size="14" fill="#AE6437">อกกว้าง</text>
              <text x="492" y="145" font-size="14" fill="#AE6437" transform="rotate(90 492 145)">ตัวสั้น</text>
            </g>
          </svg>
          <figcaption id="fitcap" class="note">ทรง Boxy อกกว้าง ไหล่ตกนิด ตัวสั้น ด้านข้างตรงเป็นกล่อง</figcaption>
        </figure>
      </div>
    </div>
  </section>

  <!-- 2 OPTIONS -->
  <section id="options" class="sec sec-alt" aria-labelledby="opt-title">
    <div class="container">
      <div class="sec-head">
        <span class="sec-num">02 · ทรง ผ้า สี ไซซ์</span>
        <h2 id="opt-title">ผลิตเสื้อ Boxy แบบไหนได้บ้าง</h2>
        <p>เลือกได้ทุกอย่าง ตั้งแต่ทรงและผ้าไปจนถึงสีและไซซ์ ให้ตรงกับตัวตนของแบรนด์</p>
      </div>
      <h3 class="sub-title">4 ทรงเสื้อ Boxy ต่างกันยังไง</h3>
      <p class="sub-note"><span class="legend-fill"></span> ทรง Boxy <span class="legend-dash"></span> เส้นประ = เสื้อยืดทรงปกติ</p>
      <div class="style-grid">
        <article class="style-card">
          <div class="style-art"><svg viewBox="0 0 220 210" role="img" aria-label="ภาพทรง Classic Boxy เทียบทรงปกติ"><path d="M90,34 L54,46 L24,86 L46,106 L52,83 L52,184 L168,184 L168,83 L174,106 L196,86 L166,46 L130,34 L130,34 Q110,62 90,34 Z" fill="var(--pink)" stroke="var(--crimson)" stroke-width="3" stroke-linejoin="round"/><path d="M90,34 L68,42 L41,72 L58,87 L70,70 L70,196 L150,196 L150,70 L162,87 L179,72 L152,42 L130,34 L130,34 Q110,62 90,34 Z" fill="none" stroke="#8C8480" stroke-width="1.6" stroke-dasharray="5 4"/></svg></div>
          <h3>Classic Boxy</h3>
          <p class="style-sub">ทรงพื้นฐาน ใส่ง่ายที่สุด</p>
          <dl class="spec"><div><dt>อก</dt><dd>กว้าง</dd></div><div><dt>ความยาว</dt><dd>สะโพกบน</dd></div><div><dt>ไหล่</dt><dd>ตกเล็กน้อย</dd></div><div><dt>แขน</dt><dd>ถึงกลางต้นแขน</dd></div></dl>
          <p class="style-fit"><b>เหมาะกับ</b> แบรนด์ที่เพิ่งเริ่ม เสื้อทีม เสื้อแจก</p>
        </article>
        <article class="style-card">
          <div class="style-art"><svg viewBox="0 0 220 210" role="img" aria-label="ภาพทรง Cropped Boxy เทียบทรงปกติ"><path d="M90,34 L54,46 L26,84 L48,104 L50,82 L50,158 L170,158 L170,82 L172,104 L194,84 L166,46 L130,34 L130,34 Q110,62 90,34 Z" fill="var(--pink)" stroke="var(--crimson)" stroke-width="3" stroke-linejoin="round"/><path d="M40,158 H180" stroke="var(--copper)" stroke-width="2" stroke-dasharray="4 3"/><text x="186" y="162" font-size="11" fill="var(--copper)">เอว</text><path d="M90,34 L68,42 L41,72 L58,87 L70,70 L70,196 L150,196 L150,70 L162,87 L179,72 L152,42 L130,34 L130,34 Q110,62 90,34 Z" fill="none" stroke="#8C8480" stroke-width="1.6" stroke-dasharray="5 4"/></svg></div>
          <h3>Cropped Boxy</h3>
          <p class="style-sub">ตัวสั้นถึงเอว</p>
          <dl class="spec"><div><dt>อก</dt><dd>กว้าง</dd></div><div><dt>ความยาว</dt><dd>ถึงเอว</dd></div><div><dt>ไหล่</dt><dd>ตกเล็กน้อย</dd></div><div><dt>แขน</dt><dd>ถึงกลางต้นแขน</dd></div></dl>
          <p class="style-fit"><b>เหมาะกับ</b> แฟชั่นผู้หญิง ใส่กับกางเกงเอวสูง</p>
        </article>
        <article class="style-card">
          <div class="style-art"><svg viewBox="0 0 220 210" role="img" aria-label="ภาพทรง Boxy Drop Shoulder เทียบทรงปกติ"><path d="M90,34 L44,54 L20,98 L45,120 L50,95 L50,186 L170,186 L170,95 L175,120 L200,98 L176,54 L130,34 L130,34 Q110,62 90,34 Z" fill="var(--pink)" stroke="var(--crimson)" stroke-width="3" stroke-linejoin="round"/><path d="M45,56 L52,95 M175,56 L168,95" stroke="var(--copper)" stroke-width="2.5" stroke-dasharray="4 3"/><path d="M90,34 L68,42 L41,72 L58,87 L70,70 L70,196 L150,196 L150,70 L162,87 L179,72 L152,42 L130,34 L130,34 Q110,62 90,34 Z" fill="none" stroke="#8C8480" stroke-width="1.6" stroke-dasharray="5 4"/></svg></div>
          <h3>Boxy Drop Shoulder</h3>
          <p class="style-sub">ตะเข็บไหล่ตกต่ำชัด</p>
          <dl class="spec"><div><dt>อก</dt><dd>กว้างมาก</dd></div><div><dt>ความยาว</dt><dd>สะโพกบน</dd></div><div><dt>ไหล่</dt><dd>ตกต่ำชัด</dd></div><div><dt>แขน</dt><dd>กว้าง ยาวเกือบศอก</dd></div></dl>
          <p class="style-fit"><b>เหมาะกับ</b> ลุคสตรีทเกาหลี เสื้อศิลปิน</p>
        </article>
        <article class="style-card">
          <div class="style-art"><svg viewBox="0 0 220 210" role="img" aria-label="ภาพทรง Heavyweight Boxy เทียบทรงปกติ"><path d="M93,34 L56,46 L24,92 L46,112 L54,86 L54,186 L166,186 L166,86 L174,112 L196,92 L164,46 L127,34 L127,34 Q110,58 93,34 Z" fill="var(--pink)" stroke="var(--crimson)" stroke-width="3" stroke-linejoin="round"/><path d="M93,34 Q110,60 127,34" fill="none" stroke="var(--crimson)" stroke-width="7" stroke-linecap="round"/><path d="M56,178 H164" stroke="var(--crimson)" stroke-width="2" stroke-dasharray="3 3"/><path d="M90,34 L68,42 L41,72 L58,87 L70,70 L70,196 L150,196 L150,70 L162,87 L179,72 L152,42 L130,34 L130,34 Q110,62 90,34 Z" fill="none" stroke="#8C8480" stroke-width="1.6" stroke-dasharray="5 4"/></svg></div>
          <h3>Heavyweight Boxy</h3>
          <p class="style-sub">ผ้าหนา คอหนา ทรงแข็ง</p>
          <dl class="spec"><div><dt>อก</dt><dd>กว้าง</dd></div><div><dt>ความยาว</dt><dd>สะโพกบน</dd></div><div><dt>ไหล่</dt><dd>ตกเล็กน้อย</dd></div><div><dt>แขน</dt><dd>ยาวถึงศอก</dd></div></dl>
          <p class="style-fit"><b>เหมาะกับ</b> แบรนด์พรีเมียม ลุควินเทจ</p>
        </article>
      </div>
      <p class="note center">ปรับคอ แขน และความยาวได้ หรือส่งเสื้อต้นแบบมาให้แกะแพทเทิร์น (ค่าแกะ 500 บาท · ค่าเกลี่ยไซซ์ 150 บาท/ไซซ์)</p>

      <h3 class="sub-title">ผ้าแนะนำสำหรับเสื้อ Boxy</h3>
      <p class="sub-note">เรียงจากหนาไปบาง ยิ่งแกรมสูง เสื้อยิ่งอยู่ทรงกล่อง</p>
      <div class="fab-grid">
          <div class="fab">
            <img src="/boxy-tshirt/images/fabric-240max.webp" alt="ผ้า 240 Max 300 แกรม สำหรับเสื้อ Boxy" width="300" height="300" loading="lazy">
            <div class="fab-gsm"><b>300</b> แกรม</div>
            <h4>240 Max</h4>
            <div class="gsm-bar" aria-hidden="true"><i style="width:100%"></i></div>
            <p>หนาที่สุด ทรงแข็ง อยู่ทรงกล่องชัด ไม่บางจนโปร่ง เหมาะ Heavyweight Boxy</p>
          </div>
          <div class="fab">
            <img src="/boxy-tshirt/images/fabric-25heavy.webp" alt="ผ้า Cotton 25 Heavy 260 แกรม สำหรับเสื้อ Boxy" width="300" height="300" loading="lazy">
            <div class="fab-gsm"><b>260</b> แกรม</div>
            <h4>Cotton 25 Heavy</h4>
            <div class="gsm-bar" aria-hidden="true"><i style="width:67%"></i></div>
            <p>เนื้อหนา ทิ้งตัวสวย ผ้ายอดนิยมของเสื้อสตรีทและโอเวอร์ไซส์</p>
          </div>
          <div class="fab">
            <img src="/boxy-tshirt/images/fabric-interlock.webp" alt="ผ้า Cotton Comb 40 Interlock 240 แกรม สำหรับเสื้อ Boxy" width="300" height="300" loading="lazy">
            <div class="fab-gsm"><b>240</b> แกรม</div>
            <h4>Cotton Comb 40 Interlock</h4>
            <div class="gsm-bar" aria-hidden="true"><i style="width:50%"></i></div>
            <p>เนื้อแน่น เรียบ ยับยาก ทรงคม ดูเนี้ยบ</p>
          </div>
          <div class="fab">
            <img src="/boxy-tshirt/images/fabric-prime.webp" alt="ผ้า Cotton Prime 230 แกรม สำหรับเสื้อ Boxy" width="300" height="300" loading="lazy">
            <div class="fab-gsm"><b>230</b> แกรม</div>
            <h4>Cotton Prime</h4>
            <div class="gsm-bar" aria-hidden="true"><i style="width:42%"></i></div>
            <p>เกรดคัดพิเศษ สัมผัสนุ่มลื่น ภาพลักษณ์พรีเมียม</p>
          </div>
          <div class="fab">
            <img src="/boxy-tshirt/images/fabric-comb20.webp" alt="ผ้า Cotton Comb 20 220 แกรม สำหรับเสื้อ Boxy" width="300" height="300" loading="lazy">
            <div class="fab-gsm"><b>220</b> แกรม</div>
            <h4>Cotton Comb 20</h4>
            <div class="gsm-bar" aria-hidden="true"><i style="width:33%"></i></div>
            <p>นุ่ม ไม่ร้อน ไม่หด ไม่ย้วย ใส่ได้ทุกวัน</p>
          </div>
      </div>
      <p class="note center">มีผ้าให้เลือกมากกว่า 30 ชนิด · <a href="https://somsritshirt.com/fabric-specification">ดูผ้าทั้งหมด</a> · ส่งตัวอย่างผ้าให้จับจริงฟรี</p>

      <div class="opt-grid">
        <article class="card">
          <h3>สีเสื้อ <span class="tag">สี</span></h3>
          <p>สีที่แบรนด์ Boxy นิยม (ย้อมสีตามที่ต้องการได้ ขึ้นอยู่กับผ้า)</p>
          <ul class="swatches">
            <li><i style="background:#111"></i>ดำ</li>
            <li><i style="background:#fff"></i>ขาว</li>
            <li><i style="background:#EDE6DA"></i>ครีม</li>
            <li><i style="background:#9C9A94"></i>เทาท็อป</li>
            <li><i style="background:#2B3A55"></i>กรม</li>
            <li><i style="background:#6B4E3D"></i>น้ำตาล</li>
            <li><i style="background:#56613F"></i>เขียวขี้ม้า</li>
            <li><i style="background:#A52241"></i>เลือดหมู</li>
          </ul>
          <p class="note">อยากได้ลุควินเทจ? ทำ <a href="https://somsritshirt.com/faded-shirt">เสื้อฟอกสีเฟด</a> ทรง Boxy ได้</p>
        </article>

        <article class="card">
          <h3>ไซซ์เสื้อ Boxy <span class="tag">ไซซ์</span></h3>
          <div class="table-wrap">
            <table class="size-table">
              <caption class="sr">ตารางไซซ์ตั้งต้นเสื้อ Boxy (นิ้ว)</caption>
              <thead><tr><th scope="col">นิ้ว</th><th scope="col">S</th><th scope="col">M</th><th scope="col">L</th><th scope="col">XL</th><th scope="col">2XL</th></tr></thead>
              <tbody>
                <tr><th scope="row">รอบอก</th><td>42</td><td>44</td><td>46</td><td>48</td><td>50</td></tr>
                <tr><th scope="row">ความยาว</th><td>25</td><td>26</td><td>27</td><td>28</td><td>29</td></tr>
              </tbody>
            </table>
          </div>
          <p class="note">ไซซ์ตั้งต้น ปรับได้ตามแบรนด์ ±1 นิ้ว · ทรง Boxy ตั้งใจให้หลวม แนะนำให้ลูกค้าเลือกไซซ์ปกติของตัวเอง · <a href="https://somsritshirt.com/size">ตารางไซซ์ทรงปกติ</a></p>
        </article>
      </div>
      <div class="inline-cta"><a class="btn btn-line btn-xl" href="https://contact.somsritshirt.com/3d975" target="_blank" rel="noopener"><svg aria-hidden="true"><use href="#i-line"/></svg>ส่งแบบให้ทีมประเมินฟรี</a></div>
    </div>
  </section>

  <!-- 3 WHY -->
  <section id="why" class="sec" aria-labelledby="why-title">
    <div class="container">
      <div class="sec-head">
        <span class="sec-num">03 · ลูกค้าของเรา</span>
        <h2 id="why-title">ทำไมแบรนด์ถึงเลือกผลิตเสื้อ Boxy กับสมศรี</h2>
        <p>ศิลปิน แบรนด์เสื้อ และองค์กรชั้นนำเลือกผลิตเสื้อกับเรา</p>
      </div>
      <div class="logos">
        <img src="/boxy-tshirt/images/client-ttcolor.webp" alt="Tattoo Colour" loading="lazy" height="40">
        <img src="/boxy-tshirt/images/client-plc.webp" alt="Polycat" loading="lazy" height="40">
        <img src="/boxy-tshirt/images/client-sr.webp" alt="Smallroom" loading="lazy" height="40">
        <img src="/boxy-tshirt/images/client-nk.webp" alt="Nike" loading="lazy" height="40">
        <img src="/boxy-tshirt/images/client-scb.webp" alt="ธนาคารไทยพาณิชย์ SCB" loading="lazy" height="40">
        <img src="/boxy-tshirt/images/client-flash.webp" alt="Flash Express" loading="lazy" height="40">
        <img src="/boxy-tshirt/images/client-ct.webp" alt="เซ็นทรัล" loading="lazy" height="40">
        <img src="/boxy-tshirt/images/client-gg.webp" alt="Google" loading="lazy" height="40">
        <img src="/boxy-tshirt/images/client-hd.webp" alt="Honda" loading="lazy" height="40">
        <img src="/boxy-tshirt/images/client-tyt.webp" alt="Toyota" loading="lazy" height="40">
        <img src="/boxy-tshirt/images/client-bacc.webp" alt="หอศิลปวัฒนธรรมแห่งกรุงเทพมหานคร" loading="lazy" height="40">
        <img src="/boxy-tshirt/images/client-u_cu.webp" alt="จุฬาลงกรณ์มหาวิทยาลัย" loading="lazy" height="40">
        <img src="/boxy-tshirt/images/client-u_ku.webp" alt="มหาวิทยาลัยเกษตรศาสตร์" loading="lazy" height="40">
      </div>

      <h3 style="text-align:center">รีวิวจากลูกค้าจริง</h3>
      <div class="reviews" tabindex="0" aria-label="รีวิวลูกค้า เลื่อนดูด้านข้าง">
        <figure><img src="/boxy-tshirt/images/review-1.webp" alt="รีวิวลูกค้า: แนะนำ บริการดี QC ละเอียด" loading="lazy"></figure>
        <figure><img src="/boxy-tshirt/images/review-4.webp" alt="รีวิวลูกค้า: สั่งเสื้อลายสกรีน ผ้าดี ให้คำปรึกษาดี" loading="lazy"></figure>
        <figure><img src="/boxy-tshirt/images/review-3.webp" alt="รีวิวลูกค้า: ผ้านุ่ม ซักแล้วไม่ยืด" loading="lazy"></figure>
        <figure><img src="/boxy-tshirt/images/review-2.webp" alt="รีวิวลูกค้า: พนักงานพูดเพราะ ตรงตามที่สนใจ" loading="lazy"></figure>
        <figure><img src="/boxy-tshirt/images/review-5.webp" alt="รีวิวลูกค้าสมศรีมีเสื้อ" loading="lazy"></figure>
        <figure><img src="/boxy-tshirt/images/review-6.webp" alt="รีวิวลูกค้าสมศรีมีเสื้อ" loading="lazy"></figure>
        <figure><img src="/boxy-tshirt/images/review-7.webp" alt="รีวิวลูกค้าสมศรีมีเสื้อ" loading="lazy"></figure>
      </div>

      <h3 style="text-align:center;margin-bottom:22px">จุดเด่น 5 ข้อของสมศรี</h3>
      <ol class="usp">
        <li><h3>ทำแพทเทิร์น Boxy เป็น</h3><p>มีทรงมาตรฐาน หรือแกะทรงจากเสื้อต้นแบบของแบรนด์ได้ เกลี่ยไซซ์ครบ</p></li>
        <li><h3>ออกแบบฟรี</h3><p>ทีม Artwork จัด layout ให้พร้อมผลิต แก้ไขได้ 3 ครั้ง ไม่มีค่าใช้จ่ายเพิ่ม</p></li>
        <li><h3>เห็นตัวอย่างก่อนผลิต</h3><p>ทำเสื้อตัวอย่างฟรีเมื่อสั่งผลิตจริง อนุมัติแล้วค่อยเดินหน้า</p></li>
        <li><h3>QC ทุกตัว รับประกัน 90 วัน</h3><p>ถ้าพบสิ่งที่ผิดจากแบบเพราะการผลิต เราแก้ให้ทันที</p></li>
        <li><h3>ติดตามงานได้ real-time</h3><p>ระบบ ERP ของเราอัปเดตสถานะทุกขั้นตอน และส่งทั่วประเทศ</p></li>
      </ol>
    </div>
  </section>

  <!-- 4 STEPS -->
  <section id="steps" class="sec sec-alt" aria-labelledby="steps-title">
    <div class="container">
      <div class="sec-head">
        <span class="sec-num">04 · ขั้นตอน</span>
        <h2 id="steps-title">ขั้นตอนสั่งผลิตเสื้อ Boxy</h2>
        <p>สั่งง่าย 4 ขั้น ได้เสื้อใน 14–21 วันทำการหลังอนุมัติตัวอย่าง</p>
      </div>
      <ol class="flow">
        <li><div class="flow-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v11H9l-5 4z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M8 10h8M8 13h5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg><span class="flow-n">1</span></div><div class="flow-body"><h3>ทักไลน์ ส่งแบบ</h3><p>ปรึกษาฟรี ไม่มีแบบก็ได้ ทีมออกแบบให้</p><span class="flow-chip">ออกแบบฟรี</span></div></li>
        <li><div class="flow-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h9l4 4v14H6z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M9 11h7M9 15h7M9 7h4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg><span class="flow-n">2</span></div><div class="flow-body"><h3>รับราคา มัดจำ</h3><p>ใบเสนอราคาชัด ไม่มีค่าใช้จ่ายแฝง</p><span class="flow-chip">มัดจำ 50%</span></div></li>
        <li><div class="flow-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 3 3 6l2 4 2-1v12h10V9l2 1 2-4-5-3c-.5 1.7-2 2.5-4 2.5S8.5 4.7 8 3z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="m9.5 14 2 2 3.5-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg><span class="flow-n">3</span></div><div class="flow-body"><h3>อนุมัติเสื้อตัวอย่าง</h3><p>ลองทรงจริงก่อนผลิต</p><span class="flow-chip">แก้ได้ 2 ครั้ง</span></div></li>
        <li><div class="flow-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 6h11v10H2zM13 9h4l4 4v3h-8z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><circle cx="6" cy="18" r="2" fill="#fff" stroke="currentColor" stroke-width="2"/><circle cx="17" cy="18" r="2" fill="#fff" stroke="currentColor" stroke-width="2"/></svg><span class="flow-n">4</span></div><div class="flow-body"><h3>ผลิต ตรวจ QC จัดส่ง</h3><p>QC ทุกตัว ส่งทั่วประเทศ</p><span class="flow-chip">14–21 วันทำการ</span></div></li>
      </ol>
      <div class="flow-summary">
        <div><span>ขั้นต่ำ</span><b>150</b><span>ตัว</span></div>
        <div><span>ได้เสื้อใน</span><b>14–21</b><span>วันทำการ</span></div>
        <div><span>รับประกัน</span><b>90</b><span>วัน</span></div>
      </div>
      <p class="timeline-note"><a href="https://somsritshirt.com/how-to-order">ดูขั้นตอนแบบละเอียด</a></p>
    </div>
  </section>

  <!-- 5 PRICE -->
  <section id="price" class="sec" aria-labelledby="price-title">
    <div class="container">
      <div class="sec-head">
        <span class="sec-num">05 · ผ้า · สกรีน · ปัก · Sublimation</span>
        <h2 id="price-title">ราคาผลิตเสื้อ Boxy</h2>
        <p>ราคารวมสกรีน 1 จุด 1 สี ยิ่งสั่งเยอะยิ่งถูกลง</p>
      </div>
      <div class="price-wrap">
        <p class="scroll-hint">เลื่อนดูราคาด้านข้าง →</p>
        <div class="table-wrap">
          <table class="price-table">
            <caption class="sr">ราคาต่อตัวตามเนื้อผ้าและจำนวน (บาท)</caption>
            <thead>
              <tr>
                <th scope="col">เนื้อผ้า</th>
                <th scope="col">100–150<small>ตัว</small></th>
                <th scope="col">151–250<small>ตัว</small></th>
                <th scope="col">251–350<small>ตัว</small></th>
                <th scope="col">351–500<small>ตัว</small></th>
                <th scope="col">501–700<small>ตัว</small></th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">Cotton 25 Heavy<small>260 แกรม · หนา ลุคสตรีท</small></th><td><b>184</b></td><td><b>178</b></td><td><b>174</b></td><td><b>168</b></td><td><b>164</b></td></tr>
              <tr><th scope="row">240 Max<small>300 แกรม · หนาแน่น ทนทาน</small></th><td><b>178</b></td><td><b>166</b></td><td><b>156</b></td><td><b>152</b></td><td><b>148</b></td></tr>
              <tr><th scope="row">Cotton Comb 20<small>220 แกรม · นุ่ม ใส่ทุกวัน</small></th><td><b>165</b></td><td><b>155</b></td><td><b>155</b></td><td><b>150</b></td><td><b>145</b></td></tr>
              <tr><th scope="row">Comb 40 Interlock<small>240 แกรม · แน่น ทรงคม</small></th><td><b>158</b></td><td><b>152</b></td><td><b>148</b></td><td><b>144</b></td><td><b>136</b></td></tr>
            </tbody>
          </table>
        </div>
        <p class="price-foot">ราคาอ้างอิงเรทเสื้อยืดรวมสกรีน 1 จุด 1 สี (บาท/ตัว) · ทรง Boxy ใช้ผ้ามากกว่าทรงปกติ ราคาจริงประเมินตามแพทเทิร์นและไซซ์ · 700 ตัวขึ้นไปสอบถามราคาพิเศษ</p>
      </div>

      <div class="addons">
        <div class="addon"><h3>สกรีน</h3><div class="p">ฟรี 1 จุด 1 สี</div><p>เพิ่มจุดหรือสีได้ มีทั้งสกรีนธรรมดา, DTG, DFT, ฟอยล์, สะท้อนแสง และ Halftone</p></div>
        <div class="addon"><h3>ปัก</h3><div class="p">ประเมินตามลาย</div><p>มีปักธรรมดา ปักนูน ปักทรานเฟอร์ และปักแพตช์ ราคาคิดตามขนาดและจำนวนสีไหม ส่งลายมาให้ประเมินทางไลน์ได้</p></div>
        <div class="addon"><h3>Sublimation</h3><div class="p">สอบถามราคา</div><p>พิมพ์ลายเต็มตัว ใช้ได้กับผ้าโพลีเอสเตอร์ เช่น Drytech เหมาะกับเสื้อทีมหรือเสื้อกีฬาทรง Boxy</p></div>
        <div class="addon"><h3>แพทเทิร์นเฉพาะแบรนด์</h3><div class="p">500 บาท</div><p>ค่าแกะแพทเทิร์นจากเสื้อต้นแบบ ค่าเกลี่ยไซซ์ 150 บาทต่อไซซ์</p></div>
      </div>
      <div class="inline-cta"><a class="btn btn-line btn-xl" href="https://contact.somsritshirt.com/3d975" target="_blank" rel="noopener"><svg aria-hidden="true"><use href="#i-line"/></svg>ขอใบเสนอราคาเสื้อ Boxy</a></div>
    </div>
  </section>

  <!-- 6 WORKS -->
  <section id="works" class="sec sec-alt" aria-labelledby="works-title">
    <div class="container">
      <div class="sec-head">
        <span class="sec-num">06 · ผลงาน</span>
        <h2 id="works-title">ตัวอย่างงานเสื้อจากสมศรี</h2>
        <p>ทั้งงานสกรีน งานปัก และ Sublimation ที่ผลิตจริงในโรงงานของเรา</p>
      </div>
      <div class="gallery-tabs" role="tablist" aria-label="ประเภทงาน">
    <button
        type="button"
        role="tab"
        :aria-selected="galleryFilter === 'all'"
        @click="galleryFilter = 'all'"
    >
        ทั้งหมด
    </button>

    <button
        type="button"
        role="tab"
        :aria-selected="galleryFilter === 'screen'"
        @click="galleryFilter = 'screen'"
    >
        สกรีน
    </button>

    <button
        type="button"
        role="tab"
        :aria-selected="galleryFilter === 'emb'"
        @click="galleryFilter = 'emb'"
    >
        ปัก
    </button>

    <button
        type="button"
        role="tab"
        :aria-selected="galleryFilter === 'sub'"
        @click="galleryFilter = 'sub'"
    >
        Sublimation
    </button>
</div>
      <div class="gallery">
        <figure v-show="galleryFilter === 'all' || galleryFilter === 'screen'"><img src="/boxy-tshirt/images/lookbook-1.webp" alt="เสื้อยืดสีขาวทรงหลวม งานแบรนด์เสื้อ" loading="lazy"><figcaption>เสื้อแบรนด์ทรงหลวม</figcaption></figure>
        <figure v-show="galleryFilter === 'all' || galleryFilter === 'screen'"><img src="/boxy-tshirt/images/work-screen-back.webp" alt="เสื้อทรงหลวมสีดำ สกรีนลายด้านหลัง" loading="lazy"><figcaption>สกรีนพลาสติซอล</figcaption></figure>
        <figure v-show="galleryFilter === 'all' || galleryFilter === 'screen'"><img src="/boxy-tshirt/images/work-screen-front.webp" alt="เสื้อดำสกรีนภาพสีเต็ม DTG" loading="lazy"><figcaption>สกรีน DTG ภาพสีเต็ม</figcaption></figure>
        <figure v-show="galleryFilter === 'all' || galleryFilter === 'screen'"><img src="/boxy-tshirt/images/screen-dft.webp" alt="งานสกรีน DFT รีดร้อนบนเสื้อดำ" loading="lazy"><figcaption>สกรีน DFT</figcaption></figure>
        <figure v-show="galleryFilter === 'all' || galleryFilter === 'screen'"><img src="/boxy-tshirt/images/tee-black.webp" alt="เสื้อยืดดำ สกรีนโลโก้ขาวหน้าอก" loading="lazy"><figcaption>สกรีนโลโก้หน้าอก</figcaption></figure>
        <figure v-show="galleryFilter === 'all' || galleryFilter === 'screen'"><img src="/boxy-tshirt/images/screen-plastisol.webp" alt="งานสกรีนสีขาวบนเสื้อสีแดงเลือดหมู" loading="lazy"><figcaption>สกรีนธรรมดา</figcaption></figure>
        <figure v-show="galleryFilter === 'all' || galleryFilter === 'emb'"><img src="/boxy-tshirt/images/emb-flat.webp" alt="งานปักโลโก้บนเสื้อสเวตเตอร์สีเขียว" loading="lazy"><figcaption>ปักธรรมดา</figcaption></figure>
        <figure v-show="galleryFilter === 'all' || galleryFilter === 'emb'"><img src="/boxy-tshirt/images/emb-puff.webp" alt="งานปักนูนตัวอักษรสีกรม" loading="lazy"><figcaption>ปักนูน</figcaption></figure>
        <figure v-show="galleryFilter === 'all' || galleryFilter === 'sub'"><img src="/boxy-tshirt/images/sublimation.webp" alt="เสื้อ Jersey พิมพ์ลาย Sublimation" loading="lazy"><figcaption>Sublimation เต็มตัว</figcaption></figure>
        <figure v-show="galleryFilter === 'all' || galleryFilter === 'screen'"><img src="/boxy-tshirt/images/work-1.webp" alt="เสื้อยืดสีดำสกรีนลายศิลปิน" loading="lazy"><figcaption>เสื้อศิลปิน</figcaption></figure>
        <figure v-show="galleryFilter === 'all' || galleryFilter === 'screen'"><img src="/boxy-tshirt/images/lookbook-2.webp" alt="เสื้อยืดสีขาวสกรีนลายกราฟิก" loading="lazy"><figcaption>เสื้อแบรนด์</figcaption></figure>
        <figure v-show="galleryFilter === 'all' || galleryFilter === 'screen'"><img src="/boxy-tshirt/images/screen-dtg.webp" alt="งานสกรีน DTG ลายละเอียด" loading="lazy"><figcaption>DTG ลายละเอียด</figcaption></figure>
      </div>
      <div class="inline-cta"><a class="btn btn-outline" href="https://somsritshirt.com/portfolio">ดูผลงานทั้งหมด</a></div>
    </div>
  </section>

  <!-- FAQ -->
  <section id="faq" class="sec" aria-labelledby="faq-title">
    <div class="container">
      <div class="sec-head">
        <h2 id="faq-title">คำถามที่พบบ่อยเรื่องผลิตเสื้อ Boxy</h2>
      </div>
      <div class="faq">
        <details open><summary>เสื้อ Boxy คืออะไร?</summary><div>เสื้อ Boxy คือเสื้อยืดทรงกล่อง ช่วงอกกว้าง ด้านข้างตรงจากรักแร้ถึงชายเสื้อ และตัวสั้นกว่าเสื้อทั่วไป พอใส่แล้วตัวเสื้อดูเป็นทรงสี่เหลี่ยม นิยมใช้กับผ้าหนาเพื่อให้อยู่ทรง</div></details>
        <details><summary>เสื้อ Boxy ต่างจากเสื้อ Oversize อย่างไร?</summary><div>Oversize เน้นหลวมทั้งตัว ตัวยาว ไหล่ตก และทิ้งตัว ส่วน Boxy เน้นความกว้างที่อก แต่ตัวสั้นกว่า ด้านข้างตรง และทรงคงรูปเป็นกล่อง <a href="https://somsritshirt.com/oversized-shirt-big-shirt">อ่านเรื่องเสื้อ Oversize เพิ่มเติม</a></div></details>
        <details><summary>สั่งผลิตเสื้อ Boxy ขั้นต่ำกี่ตัว?</summary><div>ขั้นต่ำ 150 ตัวต่อสีต่อแบบ</div></details>
        <details><summary>เสื้อ Boxy ควรใช้ผ้าอะไร?</summary><div>แนะนำผ้าเนื้อหนาที่อยู่ทรง เช่น 240 Max (300 แกรม), Cotton 25 Heavy (260 แกรม) หรือ Cotton Comb 40 Interlock (240 แกรม) ถ้าอยากได้เนื้อนุ่มบางลงใช้ Cotton Comb 20 (220 แกรม) ได้ เราส่งตัวอย่างผ้าให้จับจริงฟรี</div></details>
        <details><summary>มีแพทเทิร์นเสื้อ Boxy ของตัวเอง ส่งตัวอย่างมาให้แกะได้ไหม?</summary><div>ได้ ส่งเสื้อต้นแบบมาให้แกะแพทเทิร์นได้ ค่าแกะแพทเทิร์น 500 บาท และค่าเกลี่ยไซซ์ 150 บาทต่อไซซ์</div></details>
        <details><summary>ผลิตเสื้อ Boxy ใช้เวลากี่วัน?</summary><div>เฉลี่ย 14–21 วันทำการ นับจากวันที่อนุมัติเสื้อตัวอย่าง</div></details>
      </div>
    </div>
  </section>

  <!-- BIG LINE CTA -->
  <section class="line-band" aria-labelledby="cta-title">
    <div class="container">
      <h2 id="cta-title">พร้อมผลิตเสื้อ Boxy ของแบรนด์คุณแล้วหรือยัง?</h2>
      <p>ส่งแบบหรือรูป reference มาทางไลน์ได้เลย ทีมงานตอบเร็ว ปรึกษาฟรี</p>
      <a class="btn btn-line btn-xl" href="https://contact.somsritshirt.com/3d975" target="_blank" rel="noopener"><svg aria-hidden="true"><use href="#i-line"/></svg>แอดไลน์ @somsritshirt</a>
      <p class="tels">หรือโทร <a href="tel:0839088853">083-908-8853</a> · <a href="tel:0839088854">083-908-8854</a> · <a href="tel:0634216521">063-421-6521</a> · <a href="tel:0954546693">095-454-6693</a></p>
    </div>
  </section>
</main>
        </div>
    </NuxtLayout>
</template>


<style scoped>
@font-face { font-family: "DB Helvethaica X"; src: local("DB Helvethaica X"), url("/fonts/DB-Helvethaica-X.woff2") format("woff2"), url("https://somsritshirt.com/fonts/DB-Helvethaica-X.woff2") format("woff2"); font-weight: 400; font-display: swap; }
@font-face { font-family: "DB Helvethaica X"; src: local("DB Helvethaica X Medium"), url("/fonts/DB-Helvethaica-X-500.woff2") format("woff2"), url("https://somsritshirt.com/fonts/DB-Helvethaica-X-500.woff2") format("woff2"); font-weight: 500; font-display: swap; }
@font-face { font-family: "DB Helvethaica X"; src: local("DB Helvethaica X Bold"), url("/fonts/DB-Helvethaica-X-700.woff2") format("woff2"), url("https://somsritshirt.com/fonts/DB-Helvethaica-X-700.woff2") format("woff2"); font-weight: 700; font-display: swap; }

.boxy-page {
  --crimson: #A52241;
  --crimson-dark: #8C1C37;
  --wine: #5A1424;
  --peach: #EA9860;
  --copper: #AE6437;
  --copper-grad: linear-gradient(90deg, #AE6437 0%, #EA9860 50%, #AE6437 100%);
  --white: #fff;
  --mist: #F2F2F2;
  --cream: #FBF6F2;
  --pink: #FBEAEE;
  --ink: #2E3440;
  --muted: #6B7280;
  --border: #EADFD9;
  --line: #06C755;
  --line-dark: #05A548;
  --font: "DB Helvethaica X", "Anuphan", "Noto Sans Thai", system-ui, sans-serif;
  --radius: 18px;
  --shadow: 0 8px 28px rgba(90, 20, 36, .09);
  --container: 1180px;
}
* { box-sizing: border-box; }
html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }
.boxy-page { margin: 0; font-family: var(--font); font-size: 1.25rem; line-height: 1.55; color: var(--ink); background: var(--white); }
img { max-width: 100%; display: block; height: auto; }
a { color: var(--crimson); }
h1, h2, h3 { font-weight: 700; line-height: 1.15; margin: 0 0 .5em; color: var(--crimson); }
h2 { font-size: clamp(2.1rem, 4.2vw, 3.1rem); }
h3 { font-size: 1.6rem; }
p { margin: 0 0 1em; }
.container { max-width: var(--container); margin: 0 auto; padding: 0 16px; }
@media (min-width: 768px) { .container { padding: 0 28px; } }
.sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }

/* Buttons */
.btn { display: inline-flex; align-items: center; justify-content: center; gap: .55em; font: inherit; font-weight: 700; font-size: 1.3rem; text-decoration: none; border-radius: 999px; padding: .7em 1.5em; transition: transform .15s, background .15s, box-shadow .15s; border: 2px solid transparent; cursor: pointer; }
.btn:hover { transform: translateY(-2px); }
.btn-line { background: var(--line); color: #fff; box-shadow: 0 8px 22px rgba(6, 199, 85, .32); }
.btn-line:hover { background: var(--line-dark); }
.btn-line svg { width: 1.6em; height: 1.6em; flex: none; }
.btn-xl { font-size: 1.6rem; padding: .75em 1.8em; }
.btn-ghost { color: #fff; border-color: rgba(255,255,255,.7); }
.btn-ghost:hover { background: rgba(255,255,255,.12); }
.btn-outline { color: var(--crimson); border-color: var(--crimson); background: #fff; }

/* Header */
.site-header { position: sticky; top: 0; z-index: 40; background: rgba(255,255,255,.96); backdrop-filter: blur(8px); border-bottom: 1px solid var(--border); }
.site-header .container { display: flex; align-items: center; justify-content: space-between; height: 64px; gap: 12px; }
.brand { display: flex; align-items: center; gap: 10px; text-decoration: none; color: var(--crimson); font-weight: 700; font-size: 1.5rem; }
.brand img { width: 46px; height: 43px; }
.header-cta { display: flex; gap: 10px; align-items: center; }
.header-cta .tel { color: var(--ink); text-decoration: none; font-weight: 500; display: none; }
@media (min-width: 768px) { .header-cta .tel { display: inline; } }
.header-cta .btn { font-size: 1.1rem; padding: .45em 1.1em; }

/* Breadcrumb */
.crumbs { font-size: 1rem; color: var(--muted); padding: 10px 0 0; }
.crumbs a { color: var(--muted); text-decoration: none; }
.crumbs a:hover { color: var(--crimson); }

/* Hero */
.hero { position: relative; color: #fff; background: var(--wine); overflow: hidden; }
.hero-bg { position: absolute; inset: 0; }
.hero-bg img { width: 100%; height: 100%; object-fit: cover; object-position: center 30%; opacity: .55; }
.hero-bg::after { content: ""; position: absolute; inset: 0; background: linear-gradient(90deg, rgba(90,20,36,.96) 0%, rgba(165,34,65,.82) 45%, rgba(90,20,36,.25) 100%); }
.hero .container { position: relative; padding-top: 72px; padding-bottom: 80px; }
.hero-eyebrow { display: inline-block; font-weight: 500; letter-spacing: .18em; font-size: .95rem; text-transform: uppercase; padding-bottom: 6px; margin-bottom: 18px; border-bottom: 2px solid; border-image: var(--copper-grad) 1; }
.hero h1 { color: #fff; font-size: clamp(2.6rem, 6vw, 4.4rem); margin-bottom: .35em; }
.hero h1 span { color: var(--peach); } .hero h1 .nw { color: #fff; } @media (min-width: 640px) { .hero h1 .nw { white-space: nowrap; } }
.hero-lead { font-size: 1.45rem; max-width: 34em; opacity: .95; }
.hero-actions { display: flex; flex-wrap: wrap; gap: 14px; margin: 28px 0 34px; }
.hero-facts { display: flex; flex-wrap: wrap; gap: 10px 28px; list-style: none; padding: 0; margin: 0; font-size: 1.15rem; }
.hero-facts li { display: flex; align-items: center; gap: 8px; }
.hero-facts b { color: var(--peach); font-size: 1.6rem; }


/* Sections */
section { scroll-margin-top: 72px; }
.sec { padding: 80px 0; }
.sec-alt { background: var(--cream); }
.sec-head { text-align: center; max-width: 760px; margin: 0 auto 44px; }
.sec-num { display: inline-flex; align-items: center; gap: 10px; color: var(--copper); font-weight: 700; letter-spacing: .12em; font-size: 1rem; margin-bottom: 10px; }
.sec-num::before, .sec-num::after { content: ""; width: 26px; height: 2px; background: var(--copper-grad); }
.sec-head p { color: var(--muted); font-size: 1.3rem; }

/* 1 Intro */
.intro { display: grid; gap: 40px; align-items: center; }
@media (min-width: 900px) { .intro { grid-template-columns: 1.05fr 1fr; } }
.intro-figure { position: relative; }
.intro-figure img { border-radius: var(--radius); box-shadow: var(--shadow); }
.intro-badge { margin-top: 16px; display: flex; align-items: center; gap: 14px; flex-wrap: wrap; background: var(--crimson); color: #fff; border-radius: 14px; padding: 12px 20px; box-shadow: var(--shadow); line-height: 1.2; }
.intro-badge b { font-size: 2.2rem; line-height: 1; }
.intro-badge span { font-size: 1.1rem; opacity: .9; }
.intro h2 { text-align: left; }
.checks { list-style: none; padding: 0; margin: 18px 0 26px; display: grid; gap: 8px; }
.checks li { display: flex; gap: 10px; align-items: flex-start; }
.checks svg { flex: none; width: 24px; height: 24px; margin-top: 4px; color: var(--copper); }

/* What is boxy */
.whatis { display: grid; gap: 36px; align-items: center; margin-top: 64px; }
@media (min-width: 900px) { .whatis { grid-template-columns: 1fr 1fr; } }
.fit-diagram { background: #fff; border: 1px solid var(--border); border-radius: var(--radius); padding: 22px; }
.fit-diagram svg { width: 100%; height: auto; }
.fit-table { width: 100%; border-collapse: collapse; font-size: 1.15rem; margin-top: 10px; }
.fit-table th, .fit-table td { padding: 10px 12px; border-bottom: 1px solid var(--border); text-align: left; vertical-align: top; }
.fit-table thead th { color: var(--crimson); font-size: 1.2rem; }
.fit-table tbody th { color: var(--ink); font-weight: 700; white-space: nowrap; }
.fit-table .boxy { background: #FBEAEE; }
.table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; }

/* 2 Options: tabs-like grid */
.opt-grid { display: grid; gap: 22px; }
@media (min-width: 900px) { .opt-grid { grid-template-columns: repeat(2, 1fr); } }
.card { background: #fff; border: 1px solid var(--border); border-radius: var(--radius); padding: 26px; box-shadow: var(--shadow); }
.card h3 { display: flex; align-items: center; gap: 10px; }
.card h3 .tag { font-size: .95rem; background: var(--crimson); color: #fff; padding: 2px 12px; border-radius: 999px; font-weight: 500; }
.fit-list { display: grid; gap: 12px; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); }
.fit-item { border: 1px solid var(--border); border-radius: 12px; padding: 12px 14px; }
.fit-item b { color: var(--crimson); display: block; }
.fit-item span { color: var(--muted); font-size: 1.05rem; }
.fabric-list { display: grid; gap: 14px; }
.fabric { display: grid; grid-template-columns: 72px 1fr; gap: 14px; align-items: center; }
.fabric img { width: 72px; height: 72px; object-fit: cover; border-radius: 12px; }
.fabric b { color: var(--ink); }
.fabric .gsm { color: var(--copper); font-weight: 700; font-size: 1rem; margin-left: 6px; }
.fabric p { margin: 0; color: var(--muted); font-size: 1.08rem; line-height: 1.35; }
.swatches { display: flex; flex-wrap: wrap; gap: 10px; margin: 6px 0 14px; padding: 0; list-style: none; }
.swatches li { display: flex; flex-direction: column; align-items: center; gap: 4px; font-size: .95rem; color: var(--muted); width: 58px; text-align: center; line-height: 1.1; }
.swatches i { width: 42px; height: 42px; border-radius: 50%; border: 1px solid rgba(0,0,0,.12); display: block; }
.size-table { width: 100%; border-collapse: collapse; font-size: 1.1rem; text-align: center; }
.size-table th, .size-table td { padding: 8px 6px; border-bottom: 1px solid var(--border); }
.size-table thead th { background: var(--crimson); color: #fff; font-weight: 500; }
.size-table thead th:first-child { border-radius: 10px 0 0 0; }
.size-table thead th:last-child { border-radius: 0 10px 0 0; }
.size-table tbody th { text-align: left; color: var(--ink); }
.note { font-size: 1rem; color: var(--muted); margin-top: 10px; }

/* Boxy styles + fabrics */
.sub-title { text-align: center; font-size: 1.9rem; margin: 0 0 6px; }
.sub-note { text-align: center; color: var(--muted); font-size: 1.1rem; margin-bottom: 22px; display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 6px 10px; }
.legend-fill { width: 22px; height: 14px; background: var(--pink); border: 2px solid var(--crimson); border-radius: 3px; display: inline-block; }
.legend-dash { width: 26px; border-top: 2px dashed #8C8480; display: inline-block; margin-left: 10px; }
.style-grid { display: grid; gap: 18px; grid-template-columns: 1fr; }
@media (min-width: 560px) { .style-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 960px) { .style-grid { grid-template-columns: repeat(4, 1fr); } }
.style-card { background: #fff; border: 1px solid var(--border); border-radius: var(--radius); padding: 18px 20px 20px; display: flex; flex-direction: column; }
.style-art { background: var(--cream); border-radius: 12px; padding: 10px 6px 0; margin-bottom: 14px; }
.style-art svg { width: 100%; height: auto; display: block; }
.style-card h3 { font-size: 1.5rem; margin-bottom: 0; }
.style-sub { color: var(--copper); font-weight: 500; margin-bottom: 10px; }
.spec { margin: 0 0 12px; display: grid; grid-template-columns: 1fr 1fr; gap: 6px 12px; font-size: 1.05rem; }
.spec div { border-top: 1px solid var(--border); padding-top: 4px; }
.spec dt { color: var(--muted); font-size: .95rem; }
.spec dd { margin: 0; font-weight: 700; color: var(--ink); }
.style-fit { margin: auto 0 0; font-size: 1.05rem; color: var(--muted); }
.style-fit b { color: var(--crimson); }
.fab-grid { display: grid; gap: 14px; grid-template-columns: repeat(2, 1fr); }
@media (min-width: 900px) { .fab-grid { grid-template-columns: repeat(5, 1fr); } }
@media (max-width: 899px) { .fab:last-child { grid-column: 1 / -1; } .fab:last-child img { aspect-ratio: 8 / 3; } }
.fab { background: #fff; border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; display: flex; flex-direction: column; }
.fab img { width: 100%; aspect-ratio: 4 / 3; object-fit: cover; }
.fab-gsm { margin: -22px 14px 0; position: relative; align-self: flex-start; background: var(--crimson); color: #fff; border-radius: 999px; padding: 2px 14px; font-size: 1.05rem; }
.fab-gsm b { font-size: 1.4rem; }
.fab h4 { margin: 10px 16px 6px; font-size: 1.3rem; color: var(--ink); }
.gsm-bar { margin: 0 16px 8px; height: 6px; background: var(--mist); border-radius: 99px; overflow: hidden; }
.gsm-bar i { display: block; height: 100%; background: var(--copper-grad); }
.fab p { margin: 0 16px 16px; color: var(--muted); font-size: 1.05rem; line-height: 1.4; }
.note.center { text-align: center; margin: 16px 0 54px; }

/* 3 Why */
.logos { display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 22px 36px; margin: 0 auto 50px; max-width: 980px; }
.logos img { height: 40px; width: auto; filter: grayscale(1); opacity: .7; transition: .2s; }
.logos img:hover { filter: none; opacity: 1; }
.reviews { display: flex; gap: 16px; overflow-x: auto; scroll-snap-type: x mandatory; padding: 6px 2px 18px; margin-bottom: 50px; }
.reviews figure { margin: 0; flex: 0 0 min(340px, 82vw); scroll-snap-align: start; background: #fff; border-radius: 14px; border: 1px solid var(--border); box-shadow: var(--shadow); padding: 10px; display: grid; place-items: center; }
.reviews img { border-radius: 8px; }
.usp { padding: 0; margin: 0; display: grid; gap: 18px; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); counter-reset: usp; }
.usp li { list-style: none; background: #fff; border-radius: var(--radius); padding: 24px 22px; border-top: 4px solid; border-image: var(--copper-grad) 1; box-shadow: var(--shadow); }
.usp li::before { counter-increment: usp; content: "0" counter(usp); color: var(--copper); font-weight: 700; font-size: 1.1rem; letter-spacing: .1em; }
@media (min-width: 1000px) { .usp { grid-template-columns: repeat(5, 1fr); } }
.usp h3 { font-size: 1.45rem; margin: 6px 0 6px; }
.usp p { margin: 0; color: var(--muted); font-size: 1.12rem; line-height: 1.4; }

/* 4 Steps infographic */
.flow { list-style: none; padding: 0; margin: 0 auto; max-width: 1100px; display: grid; gap: 0; grid-template-columns: 1fr; }
.flow li { position: relative; display: grid; grid-template-columns: 72px 1fr; gap: 0 16px; padding-bottom: 22px; }
.flow li:not(:last-child)::before { content: ""; position: absolute; left: 35px; top: 72px; bottom: 0; width: 3px; background: var(--copper-grad); }
.flow-icon { width: 72px; height: 72px; border-radius: 50%; background: #fff; border: 3px solid var(--crimson); display: grid; place-items: center; color: var(--crimson); position: relative; }
.flow-icon svg { width: 34px; height: 34px; }
.flow-n { position: absolute; top: -6px; right: -6px; width: 28px; height: 28px; border-radius: 50%; background: var(--copper); color: #fff; font-weight: 700; font-size: 1.05rem; display: grid; place-items: center; border: 2px solid var(--cream); }
.flow-body { background: #fff; border: 1px solid var(--border); border-radius: 16px; padding: 14px 18px; box-shadow: var(--shadow); }
.flow h3 { font-size: 1.4rem; margin: 0 0 2px; }
.flow p { margin: 0; color: var(--muted); font-size: 1.1rem; line-height: 1.35; }
.flow-chip { display: inline-block; margin-top: 8px; background: var(--pink); color: var(--crimson); font-weight: 700; font-size: 1rem; padding: 2px 12px; border-radius: 999px; }
@media (min-width: 860px) {
  .flow { grid-template-columns: repeat(4, 1fr); gap: 22px; }
  .flow li { grid-template-columns: 1fr; justify-items: center; text-align: center; padding: 0; }
  .flow li:not(:last-child)::before { left: calc(50% + 48px); right: calc(-50% + 36px); top: 36px; bottom: auto; width: auto; height: 3px; }
  .flow li:not(:last-child)::after { content: ""; position: absolute; top: 30px; right: calc(-50% + 30px); border: 7px solid transparent; border-left: 10px solid var(--copper); }
  .flow-icon { margin-bottom: 16px; }
  .flow-body { width: 100%; height: 100%; }
}
.flow-summary { max-width: 1100px; margin: 26px auto 0; display: flex; flex-wrap: wrap; justify-content: center; gap: 10px 26px; background: var(--crimson); color: #fff; border-radius: 16px; padding: 16px 20px; text-align: center; }
.flow-summary div { display: flex; align-items: baseline; gap: 8px; }
.flow-summary b { font-size: 1.8rem; color: var(--peach); line-height: 1; }
.timeline-note { text-align: center; margin-top: 18px; font-size: 1.2rem; }

/* 5 Price */
.price-wrap { background: #fff; border-radius: var(--radius); box-shadow: var(--shadow); border: 1px solid var(--border); overflow: hidden; }
.price-table { width: 100%; border-collapse: collapse; min-width: 640px; font-size: 1.15rem; }
.price-table th, .price-table td { padding: 14px 12px; text-align: center; border-bottom: 1px solid var(--border); }
.price-table thead th { background: var(--crimson); color: #fff; font-weight: 500; line-height: 1.2; }
.price-table thead small { display: block; opacity: .85; font-size: .9rem; }
.price-table tbody th { text-align: left; color: var(--ink); }
.price-table tbody th small { display: block; color: var(--muted); font-weight: 400; font-size: .95rem; }
.price-table td b { color: var(--crimson); font-size: 1.35rem; }
.price-table tbody tr:hover { background: var(--cream); }
.price-foot { padding: 14px 18px; font-size: 1.02rem; color: var(--muted); background: var(--cream); }
.addons { display: grid; gap: 18px; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); margin-top: 26px; }
.addon { background: #fff; border: 1px solid var(--border); border-radius: var(--radius); padding: 22px; }
.addon h3 { font-size: 1.4rem; margin-bottom: 4px; }
.addon .p { font-weight: 700; color: var(--copper); font-size: 1.25rem; margin-bottom: 6px; }
.addon p { margin: 0; color: var(--muted); font-size: 1.1rem; line-height: 1.4; }

/* 6 Gallery */
.gallery-tabs { display: flex; justify-content: center; gap: 8px; flex-wrap: wrap; margin-bottom: 26px; }
.gallery-tabs button { font: inherit; font-size: 1.2rem; font-weight: 500; padding: .4em 1.3em; border-radius: 999px; border: 1.5px solid var(--crimson); background: #fff; color: var(--crimson); cursor: pointer; }
.gallery-tabs button[aria-selected="true"] { background: var(--crimson); color: #fff; }
.gallery { display: grid; gap: 14px; grid-template-columns: repeat(2, 1fr); }
@media (min-width: 900px) { .gallery { grid-template-columns: repeat(4, 1fr); } }
.gallery figure { margin: 0; position: relative; border-radius: 14px; overflow: hidden; background: var(--mist); aspect-ratio: 1 / 1; }
.gallery img { width: 100%; height: 100%; object-fit: cover; transition: transform .3s; }
.gallery figure:hover img { transform: scale(1.04); }
.gallery figcaption { position: absolute; left: 0; right: 0; bottom: 0; padding: 26px 12px 10px; color: #fff; font-size: 1.1rem; font-weight: 500; background: linear-gradient(transparent, rgba(40,10,18,.8)); }
.gallery [hidden] { display: none; }

/* FAQ */
.faq { max-width: 860px; margin: 0 auto; }
.faq details { background: #fff; border: 1px solid var(--border); border-radius: 14px; margin-bottom: 12px; }
.faq summary { cursor: pointer; padding: 18px 54px 18px 22px; font-weight: 700; font-size: 1.35rem; color: var(--ink); list-style: none; position: relative; }
.faq summary::-webkit-details-marker { display: none; }
.faq summary::after { content: "+"; position: absolute; right: 22px; top: 50%; transform: translateY(-50%); color: var(--crimson); font-size: 1.8rem; }
.faq details[open] summary::after { content: "–"; }
.faq details[open] summary { color: var(--crimson); }
.faq details > div { padding: 0 22px 18px; color: var(--ink); }

/* LINE CTA band */
.line-band { background: linear-gradient(135deg, var(--wine), var(--crimson)); color: #fff; padding: 64px 0; text-align: center; position: relative; overflow: hidden; }
.line-band::before { content: ""; position: absolute; width: 560px; height: 560px; border-radius: 50%; border: 10px solid; border-color: rgba(234,152,96,.18); right: -180px; top: -200px; }
.line-band h2 { color: #fff; }
.line-band p { font-size: 1.35rem; opacity: .92; margin-bottom: 26px; }
.line-band .tels { margin-top: 22px; font-size: 1.15rem; opacity: .9; }
.line-band .tels a { color: #fff; }
.inline-cta { text-align: center; margin-top: 40px; }

/* Footer */
.site-footer { background: #2A0B13; color: rgba(255,255,255,.82); padding: 48px 0 110px; font-size: 1.1rem; }
.site-footer .container { display: grid; gap: 28px; }
@media (min-width: 800px) { .site-footer .container { grid-template-columns: 1.3fr 1fr 1fr; } }
.site-footer h3 { color: #fff; font-size: 1.35rem; }
.site-footer a { color: rgba(255,255,255,.82); text-decoration: none; }
.site-footer a:hover { color: var(--peach); }
.site-footer ul { list-style: none; padding: 0; margin: 0; display: grid; gap: 4px; }
.tagline { letter-spacing: .3em; font-size: .85rem; color: var(--peach); margin-top: 8px; }

/* Floating LINE */
.float-line { position: fixed; right: 18px; bottom: 18px; z-index: 50; display: flex; align-items: center; gap: 10px; background: var(--line); color: #fff; text-decoration: none; font-weight: 700; font-size: 1.25rem; border-radius: 999px; padding: 10px 22px 10px 12px; box-shadow: 0 10px 28px rgba(0,0,0,.25); animation: pulse 2.6s infinite; }
.float-line svg { width: 40px; height: 40px; }
.float-line small { display: block; font-weight: 400; font-size: .9rem; opacity: .9; line-height: 1; }
@keyframes pulse { 0%,100% { box-shadow: 0 10px 28px rgba(0,0,0,.25), 0 0 0 0 rgba(6,199,85,.5); } 50% { box-shadow: 0 10px 28px rgba(0,0,0,.25), 0 0 0 12px rgba(6,199,85,0); } }
@media (max-width: 600px) {
  .float-line { left: 12px; right: 12px; bottom: 12px; justify-content: center; }
}
@media (prefers-reduced-motion: reduce) { .float-line { animation: none; } html { scroll-behavior: auto; } .btn, .gallery img { transition: none; } }

.price-table tbody th { position: sticky; left: 0; background: #fff; z-index: 1; box-shadow: 1px 0 0 var(--border); }
.price-table thead th:first-child { position: sticky; left: 0; z-index: 2; }
.scroll-hint { display: none; }
/* Mobile tuning */
@media (max-width: 559px) {
  .boxy-page { font-size: 1.12rem; }
  .sec { padding: 56px 0; }
  .sec-head { margin-bottom: 30px; }
  .sec-head p, .hero-lead { font-size: 1.18rem; }
  .style-card { display: grid; grid-template-columns: 118px 1fr; gap: 0 14px; padding: 14px; align-items: start; }
  .style-art { grid-row: 1 / span 4; margin: 0; padding: 6px 2px 0; }
  .style-card h3 { font-size: 1.3rem; }
  .style-sub { margin-bottom: 6px; font-size: 1rem; }
  .spec { font-size: .98rem; gap: 4px 10px; margin-bottom: 8px; }
  .style-fit { grid-column: 1 / -1; margin-top: 8px; }
  .fab h4 { font-size: 1.15rem; margin: 8px 12px 4px; }
  .fab p { margin: 0 12px 12px; font-size: 1rem; }
  .gsm-bar { margin: 0 12px 6px; }
  .fab-gsm { margin-left: 10px; font-size: .95rem; }
  .fab-gsm b { font-size: 1.2rem; }
  .card { padding: 20px; }
  .btn-xl { font-size: 1.35rem; padding: .7em 1.3em; }
  .usp { grid-template-columns: 1fr 1fr; gap: 12px; }
  .usp li { padding: 16px 14px; }
  .usp h3 { font-size: 1.2rem; }
  .usp p { font-size: 1rem; }
  .usp li:last-child { grid-column: 1 / -1; }
  .flow-summary { gap: 8px 18px; }
  .flow-summary b { font-size: 1.5rem; }
  .faq summary { font-size: 1.2rem; padding: 14px 46px 14px 16px; }
  .faq details > div { padding: 0 16px 14px; }
  .line-band { padding: 48px 0 56px; }
  .scroll-hint { display: block; text-align: right; font-size: .95rem; color: var(--muted); padding: 8px 14px 0; }
  .price-table { min-width: 560px; font-size: 1.05rem; }
  .price-table th, .price-table td { padding: 12px 8px; }
}
</style>
