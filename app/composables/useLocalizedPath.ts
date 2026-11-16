/**
 * แปลง URL ภาษาไทย (เช่น /tshirt) เป็น URL ของภาษาปัจจุบัน
 * โหมดอังกฤษ: เติม /en เฉพาะหน้าที่มีไฟล์ใน content/page-en/ ถ้าไม่มีจะคืน URL ภาษาไทยตามเดิม
 * รองรับ /polo#fabric, /price?type=x และ /polo/ (ตัด / ท้ายออก)
 */
export async function useLocalizedPath() {
    // global scope: component ที่มีบล็อก <i18n> เรียก useI18n({ useScope: 'local' }) อยู่แล้ว
    // ถ้าเรียก useI18n() เปล่าๆ ซ้ำ vue-i18n จะนับเป็น local scope ครั้งที่สองและเตือน
    const { locale } = useI18n({ useScope: 'global' });
    const { data } = await useAsyncData('content-en-paths', () => queryCollection('contentEn').select('path').all());
    const enPaths = computed(() => new Set((data.value || []).map((doc) => doc.path)));

    return <T extends string | undefined | null>(url: T): T | string => {
        if (!url || locale.value !== 'en' || !url.startsWith('/') || url.startsWith('//')) {
            return url;
        }

        const [, rawPath = '', suffix = ''] = url.match(/^([^?#]*)(.*)$/) || [];
        const path = rawPath.length > 1 ? rawPath.replace(/\/+$/, '') : rawPath;

        if (!enPaths.value.has(path)) {
            return url;
        }

        return (path === '/' ? '/en' : `/en${path}`) + suffix;
    };
}
