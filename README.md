# Himayatun-Nafs: Ruang Aman Santri & Panduan Perlindungan Pesantren (SantriVision 2026)

Platform pendampingan santri terpadu berlandaskan nilai syar'i **Amanah** (keamanan data & kerahasiaan mutlak) dan **Rahmah** (kasih sayang tanpa stigmatisasi). Mengimplementasikan protokol penanganan berjenjang 7-tahap **P-R-O-T-E-C-T** untuk melindungi santri Indonesia dari perundungan, kekerasan verbal/fisik, intimidasi, dan pelanggaran batas kehormatan/aurat.

---

## Klasifikasi Implementasi & Batasan Simulasi (Tingkat 2)

> **PEMBERITAHUAN TINGKAT 2 (SIMULASI PERAN):**
> Halaman Petugas (`/petugas`, `/petugas/laporan/:id`) dan Pengawas (`/pengawas`) ditandai dan dioperasikan sebagai **Tingkat 2: Simulasi Peran Interaktif**.
> - **Tidak ada autentikasi nyata atau penegakan hak akses berbasis server (No Server-Side RBAC).**
> - Halaman masuk `/petugas/masuk` menyajikan tombol pemilihan peran langsung ("Petugas Perlindungan" atau "Pengawas/Pengasuh") tanpa kolom sandi tiruan.
> - Seluruh sinkronisasi data (status penanganan, pesan publik, eskalasi SOP) berjalan di sisi klien (Client Storage) untuk memvalidasi alur kerja perlindungan tanpa membocorkan identitas santri.

---

## Arsitektur Rute Aplikasi

| Rute | Deskripsi | Akses Pengguna |
| :--- | :--- | :--- |
| `/` | Beranda portal perlindungan santri, nilai syar'i, alur PROTECT, dan orientasi santri baru | Publik / Santri |
| `/lapor` | Formulir pelaporan 4-langkah anonim dengan enkripsi awal & penerbitan kode tiket | Publik / Santri |
| `/lacak` atau `/lacak?kode=:id` | Pelacakan status laporan dengan alur PROTECT, catatan resmi publik, dan tindak lanjut santri | Publik / Santri |
| `/tentang` | Informasi integritas, etika sistem, kanal fisik non-gawai, dan batasan simulasi Tingkat 2 | Publik & Petugas |
| `/petugas/masuk` | Halaman login simulasi peran (Petugas Perlindungan vs Pengawas) tanpa kolom sandi palsu | Simulasi Petugas & Pengawas |
| `/petugas` | Dashboard antrean laporan: filter tahap & risiko, tanda mendesak, tanpa identitas | Petugas Perlindungan |
| `/petugas/laporan/:id` | Detail telaah laporan: checklist verifikasi, klasifikasi risiko manual manusia, eskalasi SOP, pesan publik vs catatan internal, rujukan, dan log audit | Petugas Perlindungan |
| `/pengawas` | Monitoring agregat: statistik tahap & risiko, aturan privasi agregat (&lt;3), evaluasi keterlambatan (&gt;N hari), dan catatan tata tertib | Pengawas / Pengasuh Pesantren |

---

## Fitur Utama Fase 2

### 1. Alur Petugas Perlindungan (`/petugas` & `/petugas/laporan/:id`)
- **Tampilan Isi Asli Pelapor:** Menyajikan kronologi murni yang ditulis santri tanpa perombakan teks.
- **Panel Verifikasi Awal:**
  - Checklist interaktif: (1) Informasi cukup & logis, (2) Perlu klarifikasi tambahan, (3) Kategori aduan sesuai.
  - Aksi *"Susun Pesan Klarifikasi ke Pelapor"* yang otomatis menyusun pesan publik santun.
- **Panel Klasifikasi Risiko (Dipilih Manusia):**
  - 4 tingkat risiko: *Ringan*, *Sedang*, *Tinggi*, *Darurat*.
  - Wajib mengisi alasan tertulis oleh petugas manusia.
  - Sistem tidak menilai benar/salah secara otomatis atau menghakimi santri.
- **Panel Eskalasi SOP Perlindungan Pesantren:**
  - Terpicu secara otomatis jika risiko berstatus *Tinggi* atau *Darurat*.
  - Langkah-langkah standar placeholder (e.g. `[Langkah SOP: Pemisahan fisik dan evakuasi perlindungan ke bilik aman]`, `[Langkah SOP: Laporan tertutup kepada Majelis Pengasuh/Kiai]`).
  - Pilihan pihak yang dihubungi berupa placeholder institusional (tanpa nomor telepon buatan).
  - Tombol *"Catat eskalasi"* dengan konfirmasi modal dan pencatatan otomatis ke log riwayat.
- **Pembaruan Tahap PROTECT:**
  - Pembaruan status berjenjang dari tahap P hingga T (Final) disertai catatan pembaruan wajib.
- **Pemisahan Ketat Pesan Publik vs Catatan Internal:**
  - **Pesan untuk Pelapor (Publik):** Tampil di halaman `/lacak` santri untuk memberikan rasa tenang dan kejelasan proses.
  - **Catatan Internal (Hanya Petugas):** Disimpan di area gelap berlabel khusus yang **TIDAK PERNAH** tampil di sisi pelapor.
- **Pendampingan / Rujukan (Simulasi):**
  - Formulir sederhana pemilihan jenis pendampingan (Konseling Bilik Aman, Bu Nyai/Ustadzah, Poskestren, Ishlah Lurah Pondok).
- **Log Aktivitas:**
  - Catatan audit kronologis mencatat peran aktor, jenis tindakan, dan waktu pembaruan.

### 2. Alur Pengawas / Pengasuh Pesantren (`/pengawas`)
- **Hanya Statistik Agregat:** Menampilkan distribusi laporan per tahap, per tingkat risiko, per kategori masalah, dan tingkat kepatuhan penanganan.
- **Aturan Privasi Agregat (&lt;3):**
  - Seluruh metrik dengan frekuensi kurang dari 3 ditampilkan sebagai `"<3"` (*k-anonymity*) untuk mencegah identifikasi silang kasus sensitif di pesantren.
  - Tidak ada teks kronologi, tidak ada nama santri/kamar, tidak ada daftar pihak yang dilaporkan.
- **Evaluasi Proses & Pemeriksaan Keterlambatan:**
  - Memeriksa laporan yang belum diperbarui lebih dari $N$ hari ($N=7$ hari sebagai konstanta demo).
  - Formulir catatan perbaikan tata tertib dan rekomendasi kebijakan majelis pengasuh.

### 3. Sinkronisasi Data Real-Time Demo
- Perubahan status PROTECT dan pesan publik yang dikirim oleh petugas di `/petugas/laporan/:id` langsung terhubung secara real-time dan dapat dicek santri di `/lacak?kode=:id`.
- Catatan internal petugas dipastikan terisolasi seutuhnya dan tidak dapat diakses di sisi pelapor.

---

## Lisensi & Nilai Syar'i
Prototipe Konseptual SantriVision 2026 berpedoman pada SOP Himayatul Awlad dan Pedoman Ditpdpontren Ditjen Pendidikan Islam Kementerian Agama Republik Indonesia.
