<script setup lang="ts">
// VARIABLE
const fabrics = [
    {
        id: 'Mesh',
        name: 'ดาวกระจาย',
        image: '/jersey/fabrics/mesh.png',
    },
    {
        id: 'met-khao-phod',
        name: 'เม็ดข้าวโพด',
        image: '/jersey/fabrics/met-khao-phod.png',
    },
    {
        id: 'jut-kha-pla',
        name: 'จุดไข่ปลา',
        image: '/jersey/fabrics/jut-kha-pla.png',
    },
    {
        id: 'soi-dao',
        name: 'สอยดาว',
        image: '/jersey/fabrics/soi-dao.png',
    },
    {
        id: 'met-khao-san',
        name: 'เม็ดข้าวสาร',
        image: '/jersey/fabrics/met-khao-san.png',
    },
    {
        id: 'sai-fon',
        name: 'สายฝน',
        image: '/jersey/fabrics/sai-fon.png',
    },
    {
        id: 'micro-bang',
        name: 'ไมโครบาง',
        image: '/jersey/fabrics/micro-bang.png',
    },
    {
        id: 'micro-na',
        name: 'ไมโครหนา',
        image: '/jersey/fabrics/micro-na.png',
    },
    {
        id: 'micro-la-iat',
        name: 'ไมโครละเอียด',
        image: '/jersey/fabrics/micro-la-iat.png',
    },
    {
        id: 'micro-u',
        name: 'ไมโครตัวยู',
        image: '/jersey/fabrics/micro-u.png',
    },
    {
        id: 'pha-man',
        name: 'ผ้ามัน',
        image: '/jersey/fabrics/pha-man.png',
    },
    {
        id: 'look-golf',
        name: 'ลูกกอล์ฟ',
        image: '/jersey/fabrics/look-golf.png',
    },
    {
        id: 'honeycomb',
        name: 'รังผึ้ง',
        image: '/jersey/fabrics/honeycomb.png',
    },
    {
        id: 'uv-protection',
        name: 'UV Protection',
        image: '/jersey/fabrics/uv-protection.png',
    },
    {
        id: 'waterproof',
        name: 'สะท้อนน้ำ',
        image: '/jersey/fabrics/waterproof.png',
    },
];
</script>
<template>
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
        <FabricCard v-for="fabric in fabrics" :key="fabric.id" :name="fabric.name" :image-url="fabric.image" :popup-image-url="undefined" />
    </div>
</template>
