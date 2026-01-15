        DOKUMENTASI TEKNIS: Responsive Calculator
===========================================================

1. RINGKASAN PROYEK
-----------------------------------------------------------
GlassCalc V2 adalah aplikasi kalkulator berbasis web yang 
mengintegrasikan prinsip desain Glassmorphism dengan performa 
tinggi. Fokus proyek ini meliputi:
* Fungsionalitas matematika presisi.
* Pengalaman Pengguna (UX) yang imersif.
* Animasi latar belakang dinamis yang responsif terhadap mouse.

2. ARSITEKTUR TEKNOLOGI
-----------------------------------------------------------
Dibangun menggunakan Vanilla Tech Stack (tanpa dependensi):
* HTML5        : Struktur semantik dan integrasi filter SVG.
* CSS3         : Custom Properties, Backdrop Filter, Grid Layout.
* JS (ES6+)    : Logika aritmatika dan animasi berbasis GPU.
* Fonts/Icons  : Space Grotesk & Material Symbols.

3. PENJELASAN STRUKTUR KODE
-----------------------------------------------------------
A. Antarmuka (HTML & CSS)
* Mesh & Orbs   : Elemen .orb dengan filter blur & blend-mode
                  untuk efek cahaya organik.
* Glass Panel   : Backdrop-filter (24px) untuk ilusi panel kaca.
* Grid Layout   : Sistem grid presisi untuk tata letak tombol.

B. Logika Operasional (JavaScript)
* Sanitasi      : Validasi input untuk mencegah operator ganda.
* Live Result   : Perhitungan asinkron otomatis (autoCalculate).
* Akselerasi    : Penggunaan requestAnimationFrame & translate3d
                  untuk memaksa rendering via GPU (Low CPU Usage).

4. PANDUAN KUSTOMISASI
-----------------------------------------------------------
A. Skema Warna (style.css -> :root)
* Aksen Utama   : Ubah --primary untuk warna tombol & glow.
* Opasitas Kaca : Sesuaikan alpha pada --glass-bg (rgba).

B. Animasi (script.js)
* Respon Mouse  : Ubah faktor 0.06 pada interpX/Y.
                  (Kecil = Lambat/Halus | Besar = Cepat).
* Kepadatan     : Ubah variabel orbCount untuk jumlah cahaya.

C. Fitur & Keamanan (script.js)
* Keamanan      : Ganti eval() dengan math.js untuk produksi.
* Presisi       : Sesuaikan nilai toFixed(4) untuk desimal.

5. INSTRUKSI INSTALASI
-----------------------------------------------------------
1. Pastikan file (index.html, style.css, script.js) satu folder.
2. Perlukan koneksi internet (load Google Fonts/Icons).
3. Buka index.html di browser modern (Chrome/Edge/Firefox).

-----------------------------------------------------------

