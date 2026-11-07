# Sakura

Satu lanskap Jepang, banyak cara memandang. Pengalaman web kontemplatif berbasis
React + Vite yang dibangun di sekitar satu lukisan, dibingkai seperti engawa: balok
kayu hangus, kertas shoji, tinta, dan merah maple. Dirancang untuk desktop.

## Ruang di halaman

- **Panorama:** lukisan utuh dengan tiga fokus (Cabang, Puncak, Pagoda).
- **Detail:** tiga panel shoji, masing-masing dengan potongan fokusnya.
- **Lensa pandang:** kaca pembesar di atas lukisan (kursor, Ctrl + roda, atau panah).
- **Temukan detail:** permainan mencari enam benda kecil, dengan petunjuk dan rekor.
- **Haiku:** tiga sajak pendek dalam gulungan gantung.
- **Rute pandang:** tiga fokus secara berurutan.
- **Empat musim:** tafsir warna lukisan yang sama untuk empat musim.
- **Palet lukisan:** sepuluh warna yang diambil dari lukisan, klik untuk menyalin.
- **Jeda 30 detik:** tiga tarikan napas dengan jendela shoji yang bernapas.
- **Jurnal pandang:** catatan pribadi, tersimpan hanya di peramban.
- **Kanvas sumi:** melukis bebas dengan kuas tinta, simpan sebagai PNG.

Mode malam dan suara alam (angin, air, jangkrik, disintesis di peramban dan hanya
menyala bila diklik) tersedia dari balok atas.

## Jalankan

```bash
npm install
npm run dev
```

## Tes dan build

```bash
npm test
npm run build
npm run preview
```

## Struktur

- `src/sections/`: setiap ruang di halaman.
- `src/components/`: pintu shoji, partikel, ikon, toast, goresan tinta, lentera.
- `src/hooks/`: timer jeda, rute, transisi, mode malam, suara, penyimpanan.
- `src/lib/`: logika murni (lensa, kuas, permainan, jurnal, suara) yang dites.
- `src/data/`: konten dan koordinat lukisan.
- `src/styles/`: token, bingkai ruang, dan gaya tiap ruang, diimpor berurutan dari `index.css`.

## Konteks desain

Lihat `PRODUCT.md` dan `DESIGN.md` untuk tujuan produk dan sistem desain. Semua sajak,
warna, dan tafsir musim adalah bacaan atas lukisan yang sama, bukan gambaran tempat nyata.
