<script setup></script>
<template>
  <section class="w-full px-4 py-10 flex flex-col items-center">
    <ProseH2 class="sm:text-3xl md:text-4xl font-bold mb-2 text-center">
      Size Pattern
    </ProseH2>
    <ProseH3 class="text-base sm:text-lg md:text-xl mb-6 text-center">
      ตารางไซซ์กางเกง
    </ProseH3>

    <div class="w-full max-w-5xl shadow rounded-lg">
      <table
        class="w-full text-center border border-primary text-[10px] sm:text-xs md:text-base"
      >
        <thead class="bg-primary text-white">
          <tr>
            <th class="px-1 py-2 whitespace-normal break-words">ไซส์</th>
            <th
              class="border border-primary px-1 py-2 whitespace-normal break-words"
            >
              เอว
            </th>
            <th
              class="border border-primary px-1 py-2 whitespace-normal break-words"
            >
              ยาว
            </th>
            <th
              class="border border-primary px-1 py-2 whitespace-normal break-words"
            >
              สะโพก
            </th>
            <th
              class="border border-primary px-1 py-2 whitespace-normal break-words"
            >
              รอบขา
            </th>
          </tr>
        </thead>
        <tbody class="text-xs sm:text-sm md:text-base">
          <tr class="hover:bg-primary/10 transition-colors">
            <td class="border border-primary px-1 py-2">M</td>
            <td class="border border-primary px-1 py-2">28-41</td>
            <td class="border border-primary px-1 py-2">16.5</td>
            <td class="border border-primary px-1 py-2">43</td>
            <td class="border border-primary px-1 py-2">25</td>
          </tr>
          <tr class="hover:bg-primary/10 transition-colors">
            <td class="border border-primary px-1 py-2">L</td>
            <td class="border border-primary px-1 py-2">30-43</td>
            <td class="border border-primary px-1 py-2">17.5</td>
            <td class="border border-primary px-1 py-2">46</td>
            <td class="border border-primary px-1 py-2">27</td>
          </tr>
          <tr class="hover:bg-primary/10 transition-colors">
            <td class="border border-primary px-1 py-2">XL</td>
            <td class="border border-primary px-1 py-2">32-49</td>
            <td class="border border-primary px-1 py-2">19.5</td>
            <td class="border border-primary px-1 py-2">51</td>
            <td class="border border-primary px-1 py-2">29</td>
          </tr>
          <tr class="hover:bg-primary/10 transition-colors">
            <td class="border border-primary px-1 py-2">2XL</td>
            <td class="border border-primary px-1 py-2">34-51.5</td>
            <td class="border border-primary px-1 py-2">20.5</td>
            <td class="border border-primary px-1 py-2">53.5</td>
            <td class="border border-primary px-1 py-2">30</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
