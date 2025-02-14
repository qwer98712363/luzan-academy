// script.js

function calculateDistance() {
    // الحصول على قيم خطوط الطول والعرض
    const lat1 = parseFloat(document.getElementById('lat1').value);
    const lon1 = parseFloat(document.getElementById('lon1').value);
    const lat2 = parseFloat(document.getElementById('lat2').value);
    const lon2 = parseFloat(document.getElementById('lon2').value);

    // التحقق من صحة الإدخال
    if (isNaN(lat1) || isNaN(lon1) || isNaN(lat2) || isNaN(lon2)) {
        document.getElementById('result').innerHTML = '<p style="color: red;">يرجى إدخال جميع القيم بشكل صحيح.</p>';
        return;
    }

    // تحويل القيم إلى راديان
    const toRadians = (deg) => deg * Math.PI / 180;

    const φ1 = toRadians(lat1);
    const φ2 = toRadians(lat2);
    const Δφ = toRadians(lat2 - lat1);
    const Δλ = toRadians(lon2 - lon1);

    // حساب المسافة باستخدام صيغة Haversine
    const R = 6371; // نصف قطر الأرض بالكيلومترات
    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    // حساب الاتجاه (زاوية البوصلة)
    const y = Math.sin(Δλ) * Math.cos(φ2);
    const x = Math.cos(φ1) * Math.sin(φ2) -
              Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
    const bearing = (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;

    // عرض النتائج
    document.getElementById('result').innerHTML = `
        <p>المسافة: ${distance.toFixed(2)} كيلومتر</p>
        <p>الاتجاه: ${bearing.toFixed(2)} درجة</p>
    `;
}