<script setup lang="ts"></script>

<template>
  <ProseH2
    class="text-white text-3xl sm:text-4xl md:text-5xl leading-none font-bold p-2 bg-primary rounded-2xl text-center mb-4"
  >
    ราคา
  </ProseH2>

  <section class="w-full px-2 sm:px-4 py-6 flex flex-col items-center">
    <!-- โลโก้ -->
    <img
      src="/pants/logosomsri.png"
      alt="SOMSRI GARMENT"
      class="w-20 sm:w-28 mb-3"
    />

    <!-- ชื่อสินค้า -->
    <ProseH2 class="text-xl sm:text-3xl font-bold mb-4 text-center">
      กางเกง ขาสั้น
    </ProseH2>

    <div class="w-full max-w-5xl shadow rounded-lg">
      <table
        class="w-full text-center border border-primary text-[10px] sm:text-xs md:text-base"
      >
        <thead class="bg-primary text-white">
          <tr>
            <th class="border border-primary px-1 py-1 break-words">
              จำนวน<br />(กางเกง)
            </th>
            <th class="border border-primary px-1 py-1 break-words">Fasbrix</th>
            <th class="border border-primary px-1 py-1 break-words">
              French Terry
            </th>
            <th class="border border-primary px-1 py-1 break-words">
              เพิ่ม<br />กระเป๋า
            </th>
            <th class="border border-primary px-1 py-1 break-words">
              ป้าย<br />Label
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="hover:bg-primary/10 transition-colors">
            <td class="border border-primary px-1 py-1">100-300</td>
            <td class="border border-primary px-1 py-1">185</td>
            <td class="border border-primary px-1 py-1">205</td>
            <td class="border border-primary px-1 py-1">10</td>
            <td class="border border-primary px-1 py-1">15</td>
          </tr>
          <tr class="hover:bg-primary/10 transition-colors">
            <td class="border border-primary px-1 py-1">301-500</td>
            <td class="border border-primary px-1 py-1">181</td>
            <td class="border border-primary px-1 py-1">201</td>
            <td class="border border-primary px-1 py-1">10</td>
            <td class="border border-primary px-1 py-1">15</td>
          </tr>
          <tr class="hover:bg-primary/10 transition-colors">
            <td class="border border-primary px-2 sm:px-4 py-2">301-500</td>
            <td class="border border-primary px-2 sm:px-4 py-2">181</td>
            <td class="border border-primary px-2 sm:px-4 py-2">201</td>
            <td class="border border-primary px-2 sm:px-4 py-2">10</td>
            <td class="border border-primary px-2 sm:px-4 py-2">15</td>
          </tr>
          <tr class="hover:bg-primary/10 transition-colors">
            <td class="border border-primary px-2 sm:px-4 py-2">501-700</td>
            <td class="border border-primary px-2 sm:px-4 py-2">176</td>
            <td class="border border-primary px-2 sm:px-4 py-2">196</td>
            <td class="border border-primary px-2 sm:px-4 py-2">10</td>
            <td class="border border-primary px-2 sm:px-4 py-2">15</td>
          </tr>
          <tr class="hover:bg-primary/10 transition-colors">
            <td class="border border-primary px-2 sm:px-4 py-2">701-900</td>
            <td class="border border-primary px-2 sm:px-4 py-2">170</td>
            <td class="border border-primary px-2 sm:px-4 py-2">190</td>
            <td class="border border-primary px-2 sm:px-4 py-2">8</td>
            <td class="border border-primary px-2 sm:px-4 py-2">12</td>
          </tr>
          <tr class="hover:bg-primary/10 transition-colors">
            <td class="border border-primary px-2 sm:px-4 py-2">900++</td>
            <td class="border border-primary px-2 sm:px-4 py-2">160</td>
            <td class="border border-primary px-2 sm:px-4 py-2">180</td>
            <td class="border border-primary px-2 sm:px-4 py-2">7</td>
            <td class="border border-primary px-2 sm:px-4 py-2">10</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- ข้อความล่าง -->
    <div
      class="w-full max-w-5xl bg-primary text-white text-[10px] sm:text-xs md:text-base text-center py-2 mt-4 rounded"
    >
      ราคานี้ลูกค้าจะได้ ป้าย Label 1 จุด สามารถเลือกจุดเย็บได้
      และกระเป๋าข้างสองจุด
    </div>
  </section>
</template>
