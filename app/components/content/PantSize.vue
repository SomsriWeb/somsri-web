<script setup></script>
<template>
  <section class="w-full px-4 py-10 flex flex-col items-center">
    <!-- หัวข้อ -->
    <h2 class="text-primary text-3xl sm:text-4xl font-bold mb-2 text-center">
      Size Pattern
    </h2>
    <p class="text-primary text-lg sm:text-xl mb-6 text-center">
      ตารางไซซ์กางเกง
    </p>

    <!-- ตาราง -->
    <div class="overflow-x-auto w-full max-w-5xl shadow rounded-lg">
      <table class="min-w-full text-center border border-primary divide-y divide-primary">
        <thead class="bg-primary text-white text-sm sm:text-base">
          <tr class="bg-primary text-white">
            <th scope="col" class="px-4 py-2">ไซส์</th>
            <th class="border border-primary px-4 py-2">เอว</th>
            <th class="border border-primary px-4 py-2">ยาว</th>
            <th class="border border-primary px-4 py-2">สะโพก</th>
            <th class="border border-primary px-4 py-2">รอบขา</th>
          </tr>
        </thead>
        <tbody>
          <tr class="hover:bg-primary/10 transition-colors">
            <td class="border border-primary px-4 py-2">M</td>
            <td class="border border-primary px-4 py-2">28-41</td>
            <td class="border border-primary px-4 py-2">16.5</td>
            <td class="border border-primary px-4 py-2">43</td>
            <td class="border border-primary px-4 py-2">25</td>
          </tr>
          <tr class="hover:bg-primary/10 transition-colors">
            <td class="border border-primary px-4 py-2">L</td>
            <td class="border border-primary px-4 py-2">30-43</td>
            <td class="border border-primary px-4 py-2">17.5</td>
            <td class="border border-primary px-4 py-2">46</td>
            <td class="border border-primary px-4 py-2">27</td>
          </tr>
          <tr class="hover:bg-primary/10 transition-colors">
            <td class="border border-primary px-4 py-2">XL</td>
            <td class="border border-primary px-4 py-2">32-49</td>
            <td class="border border-primary px-4 py-2">19.5</td>
            <td class="border border-primary px-4 py-2">51</td>
            <td class="border border-primary px-4 py-2">29</td>
          </tr>
          <tr class="hover:bg-primary/10 transition-colors">
            <td class="border border-primary px-4 py-2">2XL</td>
            <td class="border border-primary px-4 py-2">34-51.5</td>
            <td class="border border-primary px-4 py-2">20.5</td>
            <td class="border border-primary px-4 py-2">53.5</td>
            <td class="border border-primary px-4 py-2">30</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
