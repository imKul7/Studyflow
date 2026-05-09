# StudyFlow - Aplikasi Monitoring Tugas Kuliah

## 1. Gambaran Umum

**StudyFlow** adalah aplikasi web produktivitas akademik yang dibuat untuk membantu siswa dan mahasiswa mengelola tugas, deadline, prioritas, target belajar, jadwal belajar, focus timer, catatan materi, refleksi harian, statistik produktivitas, laporan PDF, backup data, serta monitoring admin dalam satu sistem yang terstruktur.

StudyFlow bukan hanya aplikasi pencatat tugas biasa. Aplikasi ini dirancang sebagai sistem monitoring belajar yang membantu pengguna mengetahui tugas mana yang harus dikerjakan, seberapa jauh progress tugas, kapan deadline terdekat, bagaimana produktivitas belajar selama beberapa hari terakhir, serta bagaimana membuat laporan ringkas dari aktivitas belajar.

Project ini juga memiliki landing page profesional sebagai halaman pengenalan aplikasi dan halaman admin sebagai panel monitoring data. Dengan kombinasi landing page, dashboard mahasiswa, dan admin panel, StudyFlow cocok dipresentasikan sebagai project aplikasi web akademik yang lengkap, modern, dan memiliki manfaat nyata bagi mahasiswa.

---

## 2. Latar Belakang

Mahasiswa sering memiliki banyak tugas dari berbagai mata kuliah dalam waktu yang bersamaan. Setiap tugas memiliki deadline, prioritas, progress, catatan, dan tingkat kesulitan yang berbeda. Jika tidak dikelola dengan baik, mahasiswa dapat mengalami beberapa masalah berikut:

1. Lupa deadline tugas.
2. Sulit menentukan tugas mana yang harus dikerjakan terlebih dahulu.
3. Tidak memiliki catatan progress pengerjaan tugas.
4. Tidak memiliki jadwal belajar yang terstruktur.
5. Tidak memiliki dokumentasi catatan materi yang rapi.
6. Tidak mengevaluasi proses belajar harian.
7. Tidak memiliki laporan ringkas mengenai produktivitas belajar.
8. Tidak memiliki backup data jika data di browser terhapus.
9. Tidak memiliki halaman monitoring untuk melihat data secara administratif.

StudyFlow dibuat untuk menjawab masalah tersebut melalui aplikasi yang mudah digunakan, visualnya menarik, fiturnya relevan dengan kebutuhan siswa dan mahasiswa, serta dapat dikembangkan lebih lanjut menjadi sistem berbasis database dan multiuser.

---

## 3. Tujuan Project

Tujuan utama StudyFlow adalah membantu mahasiswa mengatur aktivitas akademik secara lebih terstruktur dan produktif.

Tujuan rinci:

1. Membantu pengguna mencatat semua tugas kuliah.
2. Membantu pengguna memantau deadline.
3. Membantu pengguna menentukan prioritas tugas.
4. Membantu pengguna melihat progress pengerjaan.
5. Membantu pengguna membagi tugas besar menjadi checklist subtugas.
6. Membantu pengguna membuat target harian.
7. Membantu pengguna menyusun jadwal belajar.
8. Membantu pengguna belajar lebih fokus dengan focus timer.
9. Membantu pengguna menyimpan catatan materi.
10. Membantu pengguna melakukan refleksi belajar.
11. Membantu pengguna melihat statistik produktivitas.
12. Membantu pengguna membuat laporan produktivitas dalam bentuk PDF.
13. Membantu pengguna melakukan backup dan import data.
14. Menyediakan halaman admin sebagai simulasi monitoring sistem.
15. Menyediakan landing page profesional sebagai halaman pengenalan aplikasi.

---

## 4. Teknologi yang Digunakan

StudyFlow dibuat menggunakan teknologi web dasar agar mudah dipahami, dijalankan, dan dikembangkan.

| Teknologi | Fungsi |
|---|---|
| HTML | Membuat struktur halaman aplikasi |
| CSS | Mengatur tampilan, layout, warna, animasi, dark mode, admin page, landing page, dan responsive design |
| JavaScript | Mengatur logika aplikasi dan interaksi pengguna |
| LocalStorage | Menyimpan data aplikasi di browser |
| html2pdf.js | Mengubah laporan produktivitas menjadi file PDF |
| GitHub Pages / Hosting Static | Menjalankan aplikasi secara online |
| Git & GitHub | Mengelola versi project dan repository |

---

## 5. Struktur File Project

Struktur utama project:

```text
StudyFlow/
├── index.html
├── app.html
├── admin.html
├── style.css
├── script.js
├── admin.js
└── README_StudyFlow.md
```

Penjelasan:

### index.html

Berisi landing page StudyFlow versi final. Halaman ini memperkenalkan aplikasi secara profesional kepada pengguna.

Isi landing page meliputi:

- Navbar profesional.
- Hero section.
- Penjelasan masalah mahasiswa.
- Fitur utama aplikasi.
- Manfaat aplikasi.
- Cara kerja aplikasi.
- Preview dashboard.
- Admin preview.
- CTA atau ajakan membuka dashboard.
- Footer profesional.

Landing page dibuat agar pengguna langsung memahami fungsi StudyFlow sebelum masuk ke dashboard.

### app.html

Berisi dashboard utama StudyFlow untuk pengguna mahasiswa. Semua fitur inti berada di halaman ini, mulai dari manajemen tugas, rekomendasi prioritas, mata kuliah, target harian, study planner, focus timer, catatan materi, refleksi belajar, statistik produktivitas, laporan PDF, backup data, kalender, dan riwayat aktivitas.

### admin.html

Berisi halaman khusus admin untuk monitoring data StudyFlow. Admin dapat melihat ringkasan tugas, mata kuliah, target harian, study planner, focus timer, catatan materi, refleksi belajar, insight produktivitas, riwayat aktivitas, serta melakukan export laporan CSV.

Halaman admin saat ini masih berupa simulasi frontend karena data dibaca dari localStorage pada browser yang sama.

### style.css

Berisi seluruh styling aplikasi, termasuk:

- Landing page.
- Dashboard mahasiswa.
- Halaman admin.
- Sidebar.
- Navbar.
- Card statistik.
- Form input.
- Kalender.
- Dark mode.
- Analytics.
- Laporan.
- Responsive design.
- Tampilan mobile.

### script.js

Berisi logika utama aplikasi mahasiswa, seperti:

- Pengelolaan tugas.
- Pengelolaan mata kuliah.
- Target harian.
- Study planner.
- Focus timer.
- Catatan materi.
- Refleksi belajar.
- Statistik produktivitas.
- Laporan PDF.
- Backup data.
- Import data.
- Penyimpanan data ke localStorage.

### admin.js

Berisi logika halaman admin, seperti:

- Login admin demo.
- Membaca data dari localStorage.
- Menampilkan statistik admin.
- Monitoring tugas.
- Monitoring akademik.
- Monitoring produktivitas.
- Monitoring catatan materi.
- Monitoring refleksi belajar.
- Monitoring riwayat aktivitas.
- Insight admin otomatis.
- Export laporan admin dalam format CSV.

---

## 6. Fitur Utama

StudyFlow memiliki fitur-fitur berikut:

1. Landing page profesional.
2. Dashboard monitoring tugas.
3. Manajemen tugas kuliah.
4. Checklist subtugas.
5. Filter dan pencarian tugas.
6. Rekomendasi tugas prioritas.
7. Manajemen mata kuliah.
8. Target harian.
9. Study planner.
10. Focus timer.
11. Kalender deadline.
12. Mode gelap dan mode terang.
13. Riwayat aktivitas.
14. Catatan materi kuliah.
15. Refleksi belajar harian.
16. Statistik produktivitas.
17. Grafik aktivitas 7 hari.
18. Insight belajar otomatis.
19. Laporan produktivitas.
20. Download laporan PDF.
21. Export backup data.
22. Import backup data.
23. Halaman admin dengan login demo.
24. Monitoring admin untuk tugas, akademik, produktivitas, catatan, refleksi, dan riwayat.
25. Export laporan admin dalam format CSV.
26. Responsive design.

---

## 7. Penjelasan Fitur

### 7.1 Landing Page

Landing page adalah halaman awal aplikasi. Tujuannya adalah memperkenalkan StudyFlow kepada pengguna dengan tampilan profesional, modern, dan mudah dipahami.

Isi landing page:

- Logo dan nama StudyFlow.
- Navbar.
- Hero section.
- Penjelasan singkat aplikasi.
- Tombol menuju dashboard.
- Tombol menuju fitur.
- Problem section.
- Feature highlight.
- Benefit section.
- Workflow atau cara kerja.
- Productivity section.
- Preview aplikasi.
- Admin preview.
- CTA section.
- Footer.

Landing page dibuat agar pengguna langsung memahami bahwa StudyFlow adalah aplikasi akademik untuk membantu pengelolaan tugas dan produktivitas belajar.

---

### 7.2 Dashboard Monitoring

Dashboard menampilkan ringkasan kondisi tugas pengguna secara cepat.

Informasi yang ditampilkan:

- Total tugas.
- Tugas belum selesai.
- Tugas selesai.
- Tugas dengan deadline dekat.
- Deadline terdekat.
- Tingkat penyelesaian tugas.
- Tugas prioritas tinggi.
- Tugas hari ini.
- Tugas yang melewati deadline.

Dashboard berguna agar pengguna tidak perlu membuka semua tugas satu per satu untuk mengetahui kondisi akademiknya.

---

### 7.3 Manajemen Tugas

Fitur ini adalah fitur inti StudyFlow.

Data tugas yang dapat dimasukkan:

- Nama tugas.
- Mata kuliah.
- Deadline.
- Prioritas.
- Progress pengerjaan.
- Catatan tugas.
- Checklist subtugas.

Aksi pada tugas:

- Tambah tugas.
- Edit tugas.
- Hapus tugas.
- Tandai selesai.
- Buka lagi tugas yang sudah selesai.
- Update checklist subtugas.

Tugas ditampilkan dalam bentuk card yang berisi detail lengkap agar mudah dibaca.

---

### 7.4 Checklist Subtugas

Checklist subtugas digunakan untuk membagi tugas besar menjadi beberapa bagian kecil.

Contoh subtugas:

- Buat proposal.
- Buat use case diagram.
- Buat activity diagram.
- Buat ERD.
- Buat presentasi.

Jika subtugas digunakan, progress tugas dihitung otomatis berdasarkan jumlah checklist yang selesai.

Contoh:

Jika ada 4 subtugas dan 2 sudah selesai, maka progress menjadi 50%.

Fitur ini membuat pengerjaan tugas lebih terarah, bertahap, dan tidak terasa berat.

---

### 7.5 Filter dan Pencarian Tugas

StudyFlow menyediakan filter dan pencarian agar pengguna dapat menemukan tugas dengan cepat.

Filter yang tersedia:

- Pencarian berdasarkan nama tugas, mata kuliah, atau catatan.
- Filter status: semua, belum selesai, selesai.
- Filter prioritas: semua, tinggi, sedang, rendah.
- Sortir berdasarkan deadline, prioritas, dan progress.

Fitur ini sangat berguna ketika data tugas sudah banyak.

---

### 7.6 Rekomendasi Otomatis

Fitur rekomendasi otomatis membantu pengguna menentukan tugas yang harus dikerjakan terlebih dahulu.

Sistem menghitung skor prioritas berdasarkan:

- Deadline.
- Prioritas tugas.
- Progress tugas.
- Status tugas.

Tugas dengan deadline dekat, prioritas tinggi, dan progress rendah akan memiliki skor lebih besar.

Manfaat fitur ini:

- Membantu pengguna fokus.
- Mengurangi risiko lupa deadline.
- Membantu menentukan urutan pengerjaan tugas.
- Membuat aplikasi terasa lebih pintar dan profesional.

---

### 7.7 Manajemen Mata Kuliah

Fitur ini digunakan untuk mengelola daftar mata kuliah.

Pengguna dapat:

- Menambah mata kuliah.
- Melihat daftar mata kuliah.
- Melihat jumlah tugas pada setiap mata kuliah.
- Menghapus mata kuliah jika belum digunakan pada tugas.

Mata kuliah membantu mengelompokkan tugas agar lebih rapi dan mudah dipantau.

---

### 7.8 Target Harian

Target harian digunakan untuk mencatat rencana kecil yang ingin diselesaikan hari ini.

Contoh target:

- Selesaikan 50% Project ANSI.
- Review materi basis data.
- Kerjakan laporan praktikum.
- Baca materi use case diagram.

Fitur ini memiliki progress target harian yang menunjukkan berapa target yang sudah selesai.

Manfaat:

- Membantu fokus pada target harian.
- Membuat kegiatan belajar lebih terarah.
- Membiasakan pengguna membuat rencana kecil setiap hari.

---

### 7.9 Study Planner

Study Planner digunakan untuk menyusun jadwal belajar.

Data yang dimasukkan:

- Judul kegiatan.
- Mata kuliah.
- Tanggal.
- Jam mulai.
- Jam selesai.
- Jenis kegiatan.
- Catatan.

Jenis kegiatan:

- Belajar.
- Mengerjakan tugas.
- Review materi.
- Diskusi kelompok.

Fitur ini membantu pengguna mengatur waktu dan mengurangi kebiasaan menunda pekerjaan.

---

### 7.10 Focus Timer

Focus Timer adalah fitur timer belajar yang membantu pengguna fokus pada satu tugas dalam durasi tertentu.

Fitur timer:

- Pilih tugas fokus.
- Atur durasi fokus.
- Atur durasi istirahat.
- Mulai timer.
- Pause timer.
- Reset timer.
- Selesaikan sesi fokus.

Sesi fokus yang selesai akan dicatat dan masuk ke statistik produktivitas.

Manfaat:

- Membantu mengurangi distraksi.
- Membantu mencatat durasi belajar.
- Membantu pengguna membangun kebiasaan fokus.
- Membantu pengguna melihat total menit fokus selama minggu berjalan.

---

### 7.11 Kalender Deadline

Kalender deadline menampilkan tugas berdasarkan tanggal deadline.

Fitur kalender:

- Menampilkan bulan berjalan.
- Tombol bulan sebelumnya.
- Tombol bulan berikutnya.
- Penanda hari ini.
- Menampilkan tugas pada tanggal deadline.
- Menampilkan tugas dengan tanda prioritas.

Manfaat:

- Membantu melihat deadline secara visual.
- Memudahkan perencanaan mingguan.
- Membantu menghindari penumpukan tugas.

---

### 7.12 Mode Gelap dan Mode Terang

StudyFlow mendukung dark mode dan light mode.

Pengguna dapat mengganti tema sesuai kenyamanan. Pilihan tema disimpan di localStorage sehingga tetap aktif ketika halaman dibuka kembali.

Manfaat:

- Nyaman digunakan di siang atau malam hari.
- Membuat tampilan lebih modern.
- Meningkatkan pengalaman pengguna.

---

### 7.13 Riwayat Aktivitas

Riwayat aktivitas mencatat tindakan penting yang dilakukan pengguna.

Aktivitas yang dicatat:

- Menambah tugas.
- Mengedit tugas.
- Menghapus tugas.
- Mengubah status tugas.
- Mengubah checklist subtugas.
- Menambah target.
- Menghapus target.
- Menambah jadwal belajar.
- Menghapus jadwal belajar.
- Menyelesaikan focus timer.
- Menambah catatan.
- Menghapus catatan.
- Menambah refleksi.
- Menghapus refleksi.

Fitur ini membuat aplikasi lebih transparan dan membantu pengguna melihat aktivitas yang sudah dilakukan.

---

### 7.14 Catatan Materi Kuliah

Catatan materi digunakan untuk menyimpan ringkasan materi kuliah.

Data catatan:

- Mata kuliah.
- Judul catatan.
- Isi catatan.
- Tanggal dibuat.

Pengguna dapat:

- Menambah catatan.
- Mencari catatan.
- Menghapus catatan.

Manfaat:

- Membantu menyimpan materi penting.
- Membantu review sebelum ujian.
- Menghubungkan tugas dengan proses belajar.

---

### 7.15 Refleksi Belajar Harian

Refleksi belajar digunakan untuk mengevaluasi proses belajar setiap hari.

Data refleksi:

- Tanggal.
- Apa yang dipelajari.
- Kendala yang dihadapi.
- Skor produktivitas.
- Mood belajar.
- Rencana berikutnya.

Manfaat:

- Membantu pengguna mengevaluasi proses belajar.
- Membantu mengetahui kendala.
- Membantu membuat rencana belajar berikutnya.
- Membuat StudyFlow lebih bernilai karena tidak hanya mencatat tugas, tetapi juga mendukung evaluasi diri.

---

### 7.16 Statistik Produktivitas

Statistik produktivitas menampilkan data ringkas mengenai aktivitas belajar pengguna.

Data yang ditampilkan:

- Total tugas.
- Tugas selesai.
- Menit fokus minggu ini.
- Jumlah catatan materi.
- Jumlah refleksi belajar.
- Rata-rata skor refleksi.
- Grafik aktivitas 7 hari terakhir.
- Insight belajar otomatis.

Grafik 7 hari terakhir dihitung dari gabungan:

- Tugas selesai.
- Sesi fokus.
- Catatan materi.
- Refleksi belajar.

Manfaat:

- Membantu melihat perkembangan belajar.
- Membuat aplikasi terlihat seperti dashboard profesional.
- Memberikan insight produktivitas kepada pengguna.

---

### 7.17 Laporan Produktivitas

Fitur laporan membuat ringkasan produktivitas belajar.

Isi laporan:

- Total tugas.
- Tugas selesai.
- Progress penyelesaian.
- Menit fokus minggu ini.
- Tugas aktif.
- Tugas lewat deadline.
- Jumlah catatan.
- Skor refleksi.
- Deadline prioritas.
- Catatan materi terbaru.
- Refleksi belajar terbaru.
- Kesimpulan sistem.

Laporan ini dapat digunakan sebagai dokumentasi atau bahan presentasi.

---

### 7.18 Download Laporan PDF

StudyFlow dapat mendownload laporan ke file PDF menggunakan library `html2pdf.js`.

Alur:

1. Pengguna buka menu Laporan.
2. Klik Buat Laporan.
3. Sistem membuat preview laporan.
4. Klik Download PDF.
5. Sistem membuat file PDF.
6. File tersimpan di perangkat pengguna.

Contoh nama file:

```text
laporan-studyflow-2026-05-09.pdf
```

---

### 7.19 Backup dan Import Data

Karena StudyFlow menggunakan localStorage, fitur backup sangat penting.

Export backup akan menyimpan data ke file JSON.

Data yang dibackup:

- Tugas.
- Riwayat.
- Mata kuliah.
- Target harian.
- Study planner.
- Focus sessions.
- Catatan materi.
- Refleksi belajar.

Import backup digunakan untuk mengembalikan data dari file JSON.

Manfaat:

- Mengurangi risiko kehilangan data.
- Memudahkan pemindahan data.
- Membuat aplikasi lebih aman digunakan.

---

### 7.20 Halaman Admin

StudyFlow memiliki halaman admin yang digunakan sebagai panel monitoring sistem.

Admin dapat login menggunakan akun demo:

```text
Username: admin
Password: studyflow123
```

Fitur halaman admin:

- Login admin demo.
- Ringkasan total tugas.
- Ringkasan tugas selesai dan belum selesai.
- Ringkasan tugas deadline dekat.
- Ringkasan tugas terlambat.
- Ringkasan tugas prioritas tinggi.
- Ringkasan jumlah mata kuliah.
- Monitoring target harian.
- Monitoring study planner.
- Monitoring menit fokus.
- Monitoring catatan materi.
- Monitoring refleksi belajar.
- Insight admin otomatis.
- Monitoring tabel tugas.
- Detail tugas.
- Ubah status tugas dari admin.
- Hapus tugas dari admin.
- Monitoring mata kuliah.
- Monitoring target harian.
- Monitoring study planner.
- Monitoring focus timer.
- Monitoring refleksi.
- Monitoring catatan materi.
- Monitoring riwayat aktivitas.
- Export laporan admin dalam format CSV.

Catatan penting: pada versi saat ini, admin masih membaca data dari localStorage browser yang sama. Artinya halaman admin masih berupa simulasi frontend, belum sistem admin multiuser yang membaca data dari database pusat.

---

## 8. Penyimpanan Data

StudyFlow menyimpan data di localStorage.

Key yang digunakan:

```text
studyflow_tasks_v1
studyflow_history_v1
studyflow_subjects_v1
studyflow_targets_v1
studyflow_planner_v1
studyflow_focus_sessions_v1
studyflow_notes_v1
studyflow_reflections_v1
studyflow_theme
studyflow_admin_logged_in
```

Kelebihan localStorage:

- Tidak membutuhkan database.
- Data tetap tersimpan setelah refresh.
- Mudah digunakan untuk project frontend.
- Cocok untuk versi awal aplikasi.
- Bisa digunakan tanpa backend.

Kekurangan localStorage:

- Data hanya tersimpan pada browser yang sama.
- Data tidak otomatis sinkron antar perangkat.
- Jika cache browser dihapus, data dapat hilang.
- Belum cocok untuk sistem multiuser.
- Admin belum dapat melihat data dari banyak pengguna secara terpusat.

Karena itu, fitur export dan import backup ditambahkan agar pengguna dapat menyimpan data secara manual.

---

## 9. Alur Penggunaan Aplikasi

Alur umum penggunaan StudyFlow:

1. Pengguna membuka landing page.
2. Pengguna melihat penjelasan fitur dan manfaat aplikasi.
3. Pengguna masuk ke dashboard.
4. Pengguna menambahkan mata kuliah jika diperlukan.
5. Pengguna menambahkan tugas.
6. Pengguna mengatur deadline dan prioritas.
7. Pengguna menambahkan checklist subtugas.
8. Sistem menampilkan tugas pada dashboard.
9. Sistem menampilkan deadline pada kalender.
10. Sistem memberikan rekomendasi prioritas.
11. Pengguna membuat target harian.
12. Pengguna menyusun jadwal belajar.
13. Pengguna menggunakan focus timer.
14. Pengguna membuat catatan materi.
15. Pengguna mengisi refleksi belajar.
16. Sistem menampilkan statistik.
17. Pengguna membuat laporan.
18. Pengguna mendownload laporan PDF.
19. Pengguna export backup data jika diperlukan.
20. Admin dapat masuk ke halaman admin demo.
21. Admin dapat memantau data yang tersimpan di localStorage.
22. Admin dapat export laporan monitoring dalam format CSV.

---

## 10. Validasi Sistem

Validasi yang diterapkan:

1. Nama tugas wajib diisi.
2. Mata kuliah wajib dipilih.
3. Deadline wajib diisi.
4. Prioritas wajib dipilih.
5. Nama mata kuliah tidak boleh kosong.
6. Mata kuliah tidak boleh duplikat.
7. Jadwal belajar harus memiliki jam selesai lebih besar dari jam mulai.
8. Catatan materi wajib memiliki judul dan isi.
9. Refleksi wajib memiliki tanggal, isi pembelajaran, skor, mood, dan rencana berikutnya.
10. Focus timer minimal 1 menit agar sesi dicatat.
11. Import backup harus memakai file JSON yang valid.
12. Login admin demo hanya berhasil jika username dan password sesuai.
13. Admin harus login terlebih dahulu sebelum melihat dashboard admin.

---

## 11. Desain Antarmuka

StudyFlow menggunakan desain dashboard modern.

Karakteristik desain:

- Landing page profesional.
- Navbar modern.
- Footer lengkap.
- Sidebar navigasi.
- Logo StudyFlow.
- Topbar dengan tanggal.
- Hero section.
- Card statistik.
- Panel fitur.
- Form input rapi.
- Toast notification.
- Kalender visual.
- Grafik produktivitas.
- Dark mode dan light mode.
- Admin dashboard.
- Admin monitoring panel.
- Tampilan responsif.

Prinsip desain:

- Profesional.
- Bersih.
- Mudah dipahami.
- Tidak membosankan.
- Nyaman digunakan di laptop dan HP.
- Konsisten antara landing page, dashboard mahasiswa, dan admin page.

---

## 12. Kelebihan Project

Kelebihan StudyFlow:

1. Fitur lengkap dan relevan untuk mahasiswa.
2. Tampilan modern dan profesional.
3. Memiliki landing page yang menjelaskan fitur aplikasi.
4. Mendukung dark mode dan light mode.
5. Memiliki dashboard monitoring.
6. Memiliki rekomendasi prioritas otomatis.
7. Memiliki kalender deadline.
8. Memiliki focus timer.
9. Memiliki catatan materi.
10. Memiliki refleksi belajar.
11. Memiliki statistik produktivitas.
12. Memiliki laporan PDF.
13. Memiliki backup dan import data.
14. Memiliki halaman admin dengan login demo.
15. Memiliki monitoring admin untuk data akademik.
16. Memiliki export laporan admin dalam format CSV.
17. Cocok dipresentasikan sebagai project kuliah.
18. Mudah dikembangkan ke backend dan database.

---

## 13. Keterbatasan Project

Keterbatasan versi saat ini:

1. Data masih menggunakan localStorage.
2. Data hanya tersimpan pada browser/perangkat yang sama.
3. Belum ada database server.
4. Belum ada sistem login mahasiswa.
5. Login admin masih berupa login demo di sisi frontend.
6. Admin belum memakai autentikasi backend yang aman.
7. Belum ada sinkronisasi antar perangkat.
8. Belum mendukung multiuser.
9. Admin belum bisa melihat data dari banyak mahasiswa secara terpusat.
10. Belum ada notifikasi server-side.
11. Belum ada fitur kolaborasi kelompok.
12. Belum ada integrasi cloud storage.
13. Belum ada sistem role berbasis database.
14. Export laporan admin masih berupa CSV sederhana.
15. Laporan PDF masih bergantung pada library CDN html2pdf.js.

Keterbatasan ini dapat dikembangkan dengan menambahkan backend, database, autentikasi, dan sistem role pengguna.

---

## 14. Rencana Pengembangan Selanjutnya

Pengembangan yang dapat dilakukan:

1. Menambahkan login dan register mahasiswa.
2. Menambahkan backend Node.js dan Express.
3. Menambahkan database MySQL atau PostgreSQL.
4. Menambahkan role mahasiswa dan admin.
5. Menambahkan autentikasi admin yang aman.
6. Menambahkan sinkronisasi data antar perangkat.
7. Menambahkan fitur upload file tugas.
8. Menambahkan fitur kolaborasi kelompok.
9. Menambahkan fitur dosen memberi tugas.
10. Menambahkan notifikasi email atau WhatsApp.
11. Menambahkan export laporan per bulan.
12. Menambahkan integrasi Google Calendar.
13. Menambahkan aplikasi versi mobile.
14. Menambahkan dashboard admin multiuser.
15. Menambahkan fitur import/export laporan yang lebih lengkap.
16. Menambahkan grafik produktivitas yang lebih interaktif.
17. Menambahkan cloud storage untuk backup data.
18. Menambahkan API agar data dapat digunakan oleh aplikasi lain.

---

## 15. Cara Menjalankan Project

Cara menjalankan StudyFlow secara lokal:

1. Download atau clone repository.
2. Buka folder project.
3. Pastikan file berikut tersedia:
   - `index.html`
   - `app.html`
   - `admin.html`
   - `style.css`
   - `script.js`
   - `admin.js`
4. Buka `index.html` di browser.
5. Klik tombol menuju dashboard untuk membuka halaman mahasiswa.
6. Klik menu admin untuk membuka halaman admin.
7. Login admin menggunakan akun demo jika ingin melihat panel admin.

Jika memakai VS Code:

1. Buka folder project di VS Code.
2. Install extension Live Server.
3. Klik kanan pada `index.html`.
4. Pilih `Open with Live Server`.

---

## 16. Cara Upload ke GitHub

Jika project sudah berada di repository GitHub:

```bash
git add .
git commit -m "Update StudyFlow project"
git push origin main
```

Jika repository belum dibuat:

```bash
git init
git add .
git commit -m "Initial commit StudyFlow"
git branch -M main
git remote add origin https://github.com/username/StudyFlow.git
git push -u origin main
```

Jika ingin memastikan perubahan sudah tercatat:

```bash
git status
```

Jika ingin melihat repository remote:

```bash
git remote -v
```

---

## 17. Akun Demo Admin

Akun demo untuk masuk ke halaman admin:

```text
Username: admin
Password: studyflow123
```

Catatan:

Login admin pada versi ini masih berupa login demo berbasis frontend. Data login disimpan menggunakan localStorage dengan key:

```text
studyflow_admin_logged_in
```

Login ini belum aman untuk sistem produksi. Untuk pengembangan lanjutan, login admin perlu dipindahkan ke backend dengan autentikasi yang lebih aman.

---

## 18. Status Project

```text
Nama Project : StudyFlow
Jenis        : Aplikasi Web Produktivitas Akademik
Target User  : Siswa dan Mahasiswa
Frontend     : HTML, CSS, JavaScript
Storage      : LocalStorage
PDF Export   : html2pdf.js
Admin Panel  : Login demo + monitoring data localStorage
CSV Export   : Export laporan admin
Status       : Siap dipresentasikan dan dapat dikembangkan lebih lanjut
```

---

## 19. Kesimpulan

StudyFlow adalah aplikasi monitoring tugas kuliah yang dirancang untuk membantu siswa dan mahasiswa mengatur aktivitas akademik secara lebih rapi, terarah, dan produktif.

Aplikasi ini memiliki fitur yang lengkap, mulai dari landing page profesional, manajemen tugas, checklist subtugas, kalender deadline, rekomendasi prioritas, target harian, study planner, focus timer, catatan materi, refleksi belajar, statistik produktivitas, laporan PDF, backup data, hingga halaman admin untuk monitoring.

Dengan tampilan modern dan fitur yang bermanfaat, StudyFlow layak dipresentasikan sebagai project aplikasi web karena tidak hanya menampilkan halaman statis, tetapi juga menyediakan solusi nyata untuk masalah manajemen tugas dan produktivitas belajar mahasiswa.

Project ini juga memiliki potensi pengembangan yang besar. Dengan tambahan backend, database, autentikasi, dan sistem role pengguna, StudyFlow dapat dikembangkan menjadi aplikasi akademik yang lebih serius dan dapat digunakan oleh banyak pengguna secara nyata.