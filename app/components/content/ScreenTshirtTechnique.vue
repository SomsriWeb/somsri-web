<script setup lang="ts">
interface Slots {
    /**
     * หัวข้อ (ใส่เป็น H1 - P)
     */
    title(): unknown;

    /**
     * รายละเอียด (ใส่เป็น H1 - P)
     */
    description(): unknown;
}
defineSlots<Slots>();

const { t } = useI18n({ useScope: 'local' });
</script>

<i18n lang="json">
{
    "th": {
        "rubberTitle": "เทคนิคสกรีนเสื้อแบบยาง",
        "rubberDesc": "เทคนิคสกรีนเสื้อแบบยางที่นิยมกันอย่างแพร่หลาย เทคนิคแบบไฮเดนที่ทำให้เสื้อของคุณมีมิติ เทคนิคแบบไล่สีที่ช่วยให้เสื้อของคุณมีลูกเล่นมากขึ้น และเทคนิคแบบฟรอยทองที่ทำให้เสื้อของคุณดูดีมีมูลค่า",
        "rubberAlt": "เทคนิคที่โรงงานผลิตเสื้อของเราใช้ เช่น เทคนิคสกรีนเสื้อแบบยาง เทคนิคสกรีนเสื้อแบบไฮเดน เทคนิคสกรีนเสื้อแบบไล่สี",
        "inkTitle": "ใช้สีสกรีนเสื้อคุณภาพ",
        "inkDesc": "เราเลือกใช้สีสกรีนเสื้อมีคุณภาพเพื่อให้เสื้อสกรีนของคุณสีชัด ติดทนนาน เรารับสกรีนสินค้าพรีเมียมต่าง ๆ ไม่ว่าจะเป็น หน้ากากผ้า ถุงผ้า ผ้ากันเปื้อน และแก้วน้ำค่ะ",
        "inkAlt": "ราคาสั่งสกรีนเสื้อ DTG พรีเมี่ยม ราคา สกรีนเสื้อ"
    },
    "en": {
        "rubberTitle": "Plastisol (Rubber) Screen Printing",
        "rubberDesc": "Plastisol (rubber) printing is the most widely used technique. We also offer high-density printing that gives your shirts a raised, dimensional look, gradient printing for extra flair, and gold foil printing for a premium, high-value finish.",
        "rubberAlt": "Techniques used at our shirt factory, including plastisol, high-density and gradient screen printing",
        "inkTitle": "Quality Screen Printing Inks",
        "inkDesc": "We use high-quality inks so your printed shirts stay vibrant and long-lasting. We also print on a range of premium items, including fabric face masks, tote bags, aprons and drinkware.",
        "inkAlt": "Premium DTG shirt printing prices"
    }
}
</i18n>
<template>
    <div>
        <slot name="title" />
        <slot name="description" />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Card>
                <ProseH3>{{ t('rubberTitle') }}</ProseH3>
                <ProseP>{{ t('rubberDesc') }}</ProseP>
                <ProseImg
                    class="w-full"
                    src="/screen-tshirt-service/technique-1.png"
                    :alt="t('rubberAlt')"
                />
            </Card>

            <Card>
                <ProseH3>{{ t('inkTitle') }}</ProseH3>
                <ProseP>{{ t('inkDesc') }}</ProseP>
                <ProseImg class="w-full" src="/screen-tshirt-service/technique-2.png" :alt="t('inkAlt')" />
            </Card>
        </div>
    </div>
</template>
