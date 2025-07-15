<script setup></script>
<template>
  <h1
    class="text-white text-[4rem] leading-none font-bold p-2 bg-primary rounded-2xl text-center"
  >
    ราคา
  </h1>

  <section class="w-full px-4 py-10 flex flex-col items-center">
    <img src="/pants/logosomsri.png" alt="SOMSRI GARMENT" class="w-32 mb-4" />

    <h2 class="text-primary text-3xl md:text-4xl font-bold mb-6">
      กางเกง ขาสั้น
    </h2>

    <!-- ตาราง -->
    <div class="overflow-x-auto w-full max-w-5xl shadow rounded-lg">
      <table
        class="min-w-full text-center border border-primary divide-y divide-primary"
      >
        <thead class="bg-primary text-white text-sm sm:text-base">
          <tr class="bg-primary text-white">
            <th class="border border-primary px-4 py-2">จำนวน (กางเกง)</th>
            <th class="border border-primary px-4 py-2">Fasbrix</th>
            <th class="border border-primary px-4 py-2">French Terry</th>
            <th class="border border-primary px-4 py-2">เพิ่มกระเป๋า</th>
            <th class="border border-primary px-4 py-2">ป้าย Label</th>
          </tr>
        </thead>
        <tbody>
          <tr class="hover:bg-primary/10 transition-colors">
            <td class="border border-primary px-4 py-2">100-300</td>
            <td class="border border-primary px-4 py-2">185</td>
            <td class="border border-primary px-4 py-2">205</td>
            <td class="border border-primary px-4 py-2">10</td>
            <td class="border border-primary px-4 py-2">15</td>
          </tr>
          <tr class="hover:bg-primary/10 transition-colors">
            <td class="border border-primary px-4 py-2">301-500</td>
            <td class="border border-primary px-4 py-2">181</td>
            <td class="border border-primary px-4 py-2">201</td>
            <td class="border border-primary px-4 py-2">10</td>
            <td class="border border-primary px-4 py-2">15</td>
          </tr>
          <tr class="hover:bg-primary/10 transition-colors">
            <td class="border border-primary px-4 py-2">501-700</td>
            <td class="border border-primary px-4 py-2">176</td>
            <td class="border border-primary px-4 py-2">196</td>
            <td class="border border-primary px-4 py-2">10</td>
            <td class="border border-primary px-4 py-2">15</td>
          </tr>
          <tr class="hover:bg-primary/10 transition-colors">
            <td class="border border-primary px-4 py-2">701-900</td>
            <td class="border border-primary px-4 py-2">170</td>
            <td class="border border-primary px-4 py-2">190</td>
            <td class="border border-primary px-4 py-2">8</td>
            <td class="border border-primary px-4 py-2">12</td>
          </tr>
          <tr class="hover:bg-primary/10 transition-colors">
            <td class="border border-primary px-4 py-2">900++</td>
            <td class="border border-primary px-4 py-2">160</td>
            <td class="border border-primary px-4 py-2">180</td>
            <td class="border border-primary px-4 py-2">7</td>
            <td class="border border-primary px-4 py-2">10</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- ข้อความล่าง -->
    <div
      class="w-full max-w-5xl bg-primary text-white text-center py-2 mt-4 rounded"
    >
      ราคานี้ลูกค้าจะได้ ป้าย Label 1 จุด สามารถเลือกจุดเย็บได้
      และกระเป๋าข้างสองจุด
    </div>
  </section>
</template>
