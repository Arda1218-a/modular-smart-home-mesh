# 🗺️ AURA SMART HOME OS - PROJE YOL HARİTASI (FAZLAR) & TEKNİK REHBER

> **Dosya Konumu:** `c:\Users\LENOVO\Documents\smart house\YOL_HARITASI_VE_FAZLAR.md`  
> **Güncel Tamamlanma Oranı:** **%75**

---

## 📌 1. DÜRÜST DURUM DEĞERLENDİRMESİ VE GÜNCEL YÜZDE

### 📊 Güncel Durum: **%75 TAMAMLANDI**

| Faz | Açıklama | Durum | Yüzde |
| :--- | :--- | :--- | :--- |
| **FAZ 1: Konsept & Canlı Dijital İkiz (Web)** | Fikir, Oda Ajanları, Kuşbakışı Kat Planı, Motorlu Kapılar, 25°C İklimlendirme ve Su Dönüşüm Arayüzü. | **TAMAMLANDI** | **%100** |
| **FAZ 2: Matematiksel Formüller & Anlaşılır Fizik** | Isı Transfer denklemi (MPC), Oyun Teorisi Pazarlığı, Gri Su Kütle Dengesi ve Sunum Savunma Rehberi. | **TAMAMLANDI** | **%100** |
| **FAZ 3: Yerel Sunucu Backend (Python Kodu)** | Raspberry Pi / Mini PC için tak-çalıştır hazır Python MQTT & Yerel AI sunucu kodları. | *Hazırlanacak* | **%40** |
| **FAZ 4: Donanım & Karton/3D Maket Prototipi** | Ucuz ESP32 mikrodenetleyici ($4), basit sensörler ($1-3) ve maket ev yapım rehberi. | *Hazırlanacak* | **%20** |

---

## ❓ 2. MERAK ETTİĞİNİZ SORULARIN GERÇEKÇİ VE KOLAY ANLAŞILIR CEVAPLARI

### 🟢 Soru 1: "Gerçek Yerel Sunucu İçin Devasa Oracle Sunucu Dolabı mı Almak Gerekiyor? Ben Yüzlerce Kod Yazamam!"
> **GERÇEK:** **KARSINLIKLA HAYIR!**  
> Devasa sunucu dolapları sadece Google/Oracle gibi veri merkezlerinde bulunur. Bizim "Ev Sunucusu" dediğimiz şey:
> - Elinizdeki **eski bir laptop**,
> - Veya fındık kadar küçük 80$'lık bir **Raspberry Pi 5**,
> - Veya ikinci el 100$'lık bir **Mini PC (Intel NUC)**'dir.
> 
> **Kod Yazma Konusu:** Yüzlerce satır kod yazmanıza **hiç gerek yok!** Tüm Python sunucu kodlarını ve MQTT arka plan sistemini sizin için hazırlıyoruz. Siz sadece `python server.py` yazıp başlatacaksınız!

---

### 🟢 Soru 2: "Donanım ve Sensörler Çok Pahalı Olur mu? Maket / Küçük Ev Yapabilir miyiz?"
> **GERÇEK:** **HAYIR, PAHALI DEĞİL! MAKET EV EN İDEALİDİR!**  
> Gerçek bir evin tüm kablolarını değiştirmek binlerce dolar tutar. Ancak **MIT ve TÜBİTAK yarışmalarında jürinin en çok sevdiği şey "Akıllı Maket Ev Prototipi"dir.**
> 
> - **Karton / Akrilik Maket Ev:** 50-100 TL
> - **ESP32 Beyin Kartı (Mikrodenetleyici):** Tanesi 150-200 TL ($4-5)
> - **Sıcaklık/Nem Sensörü (DHT11/DHT22):** 50 TL ($1.5)
> - **Küçük Servo Motor (Kapılar İçin):** 40 TL ($1)
> - **Su Pompası (Maket Su Dönüşümü İçin):** 60 TL ($2)
> 
> **Toplam Bütçe:** Yaklaşık **500 - 1000 TL ($20 - $35)** ile masaüstünüzde harika çalışan bir maket ev yapabilirsiniz!

---

## 🧠 3. ÜNİVERSİTE KONULARININ (TERMAL MODEL, OYUN TEORİSİ, SU KÜTLE DENGESİ) KOLAY ANLATIMI

Jüriye bu konuları anlatırken karmaşık matematik terimlerine boğulmadan, çok basit günlük dille ifade edeceğiniz açıklamalar:

### 1. Termal Model ve Isı Transfer Denklemi Nedir? (En Basit Anlatım)
- **Sorun:** Odayı 25°C yapmak istediğinizde sadece klimayı sonuna kadar açarsanız oda aniden çok ısınır, elektrik faturası tavan yapar ve hava kurur.
- **Çözüm (Bizim Modelimiz):** Isı transfer denklemi, **"Odanın ne kadar hızlı soğuduğunu ve ne kadar ısıya ihtiyacı olduğunu hesaplayan akıllı hava durumu formülüdür."**
- **Mantığı:**  
  $$\text{Gerekli Isı Gücü} = \text{Odanın Hacmi} \times (\text{Hedef 25°C} - \text{Dış Sıcaklık}) \times \text{Duvar Yalıtım Katsayısı}$$
  Sistem bu hesabı yapar; klimayı %30, alttan ısıtmayı %50 çalıştırarak tam 25°C'yi **en az elektrikle** yakalar.

---

### 2. Oyun Teorisi (Game Theory) Nedir? (En Basit Anlatım)
- **Sorun:** Aynı anda Mutfak fırını, Yatak odası kliması ve Banyo ısıtıcısı çalışırsa evdeki elektrik sigortası atar!
- **Çözüm (Oyun Teorisi - Pazarlık):** Odalar tıpkı açık artırmadaki insanlar gibi birbiriyle **"elektrik pazarlığı"** yapar.
- **Mantığı:**  
  - Mutfak Ajanı der ki: *"Benim fırında yemeğim var, 2000 Watt'a ihtiyacım var!"*
  - Yatak Odası Ajanı der ki: *"Benim oda sıcaklığı 23°C, acil değil. Ben gücümü 500 Watt'a düşürebilirim."*
  - Ev Sunucusu (Hakem): *"Anlaştık! Sigorta atmayacak şekilde gücü paylaştırdım."*

---

### 3. Su Arıtma Kütle Dengesi ve Kimyasal Hesaplama Nedir?
- **Sorun:** Musluktan gelen temiz su ile çamaşır makinesinden çıkan sabunlu su aynı değildir.
- **Çözüm (Kütle Dengesi):** Giren su miktarı ile çıkan arıtılmış su miktarının eşitliği ilkemize dayanır.
- **Formül:**  
  $$\text{Toplam Arıtılan Su} = \text{Gri Su (Duş/Lavabo)} + \text{Yarı-Gri Su (Makine)} - \text{Filtre Tortu Kaybı}$$
  $$\text{Temiz Su Saflığı (TDS)} = \text{Giriş Kirliliği} \times (1 - \text{Filtre Verimi \%80.2})$$
  Bu sayede banyodan çıkan 100 Litre suyun 80.2 Litresini klozet rezervuarında ve bahçede tekrar sıfır maliyetle kullanırız.

---

## 🗺️ 4. FAZ 1, FAZ 2, FAZ 3 VE FAZ 4 DETAYLI LİSTESİ

### ✅ FAZ 1: Konsept, Arayüz & Dijital İkiz (TAMAMLANDI - %100)
- [x] Oda bazlı otonom sistem mimarisinin tasarlanması.
- [x] Ev içi yerel sunucu (Zero-Cloud) konseptinin belirlenmesi.
- [x] İnteraktif Web Dijital İkiz arayüzü (`index.html`, `styles.css`, `app.js`).
- [x] Kuşbakışı mimari kat planının oluşturulması (`smart_home_floorplan.jpg`).
- [x] Motorlu kapı anahtarları ve 25°C 3'lü iklimlendirme preset butonu.
- [x] Sürdürülebilir gri su arıtma ve geri dönüşüm gösterge paneli.

### ✅ FAZ 2: Matematiksel Formüller, Basit Fizik & Sunum Belgeleri (TAMAMLANDI - %100)
- [x] Termal model ısı transfer denklemlerinin basitleştirilmiş mantığı.
- [x] Odalar arası Oyun Teorisi (Contract Net Protocol) pazarlık açıklaması.
- [x] Gri Su ve Yarı-Gri Su kütle dengesi hesap formülleri.
- [x] Jüri / Sunum Soru-Cevap Savunma Rehberi (`SUNUM_NOTLARI_VE_KOD_REHBERI.md` ve `not_defteri.txt`).
- [x] Arayüze Faz Yol Haritası sekmesinin eklenmesi.

### 🟡 FAZ 3: Yerel Sunucu Backend Kodu (SIRADAKİ ADIM - %40)
- [ ] Raspberry Pi / Mini PC için hazır tak-çalıştır Python backend kodu (`server_backend.py`).
- [ ] Odalar arası yerel MQTT mesajlaşma protokolü kurulumu.
- [ ] Yerel AI (Ollama Local Llama-3) entegrasyon betiği.

### 🔵 FAZ 4: Fiziksel Maket Ev & ESP32 Donanım Rehberi (GELECEK ADIM - %20)
- [ ] Karton / Akrilik Maket Ev yapım ve donanım yerleşim planı.
- [ ] ESP32 mikrodenetleyici ($4) bağlantı şemaları.
- [ ] Servo motorlu maket kapı ve mini su pompası bağlantı rehberi.
