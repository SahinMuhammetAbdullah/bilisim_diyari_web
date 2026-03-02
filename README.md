# Bilişim Diyarı — Developer Site

Jekyll tabanlı, iki dilli (TR/EN), tam SEO destekli geliştirici sayfası.

## 🚀 Kurulum

```bash
# Ruby ve Bundler gereklidir
gem install bundler

# Bağımlılıkları yükle
bundle install

# Geliştirme sunucusu
bundle exec jekyll serve

# Production build
bundle exec jekyll build
```

Site `http://localhost:4000` adresinde açılır.

## 📁 Klasör Yapısı

```
bilisimdiyari/
├── _config.yml          # Site ayarları
├── _data/
│   ├── tr.yml           # Türkçe çeviriler
│   └── en.yml           # İngilizce çeviriler
├── _layouts/
│   └── default.html     # Ana layout
├── assets/
│   ├── css/main.scss    # SCSS stiller
│   ├── js/main.js       # JavaScript
│   └── images/          # Görseller
├── en/
│   └── index.html       # İngilizce ana sayfa
├── index.html           # Türkçe ana sayfa
├── sitemap.xml          # SEO sitemap
└── robots.txt
```

## 🌐 Çift Dil Sistemi

- Türkçe: `https://bilisimdiyari.com.tr/`
- İngilizce: `https://bilisimdiyari.com.tr/en/`

Çeviriler `_data/tr.yml` ve `_data/en.yml` dosyalarında tutulur.

## 📦 SEO Eklentileri

- `jekyll-seo-tag` — Meta tags, OG, Twitter Card
- `jekyll-sitemap` — Otomatik sitemap (veya manuel sitemap.xml)
- `jekyll-feed` — RSS feed

## 🔒 Gizlilik Politikası

Gizlilik politikası GitHub raw URL'den dinamik olarak çekilir:
`https://raw.githubusercontent.com/SahinMuhammetAbdullah/bilisimdiyari_privacy_policy/main/privacy-policy.md`

CORS sorunu durumunda GitHub sayfasına yönlendirme yapılır.

## 🎨 Renk Paleti

| Token | Değer | Kullanım |
|-------|-------|----------|
| `$teal` | `#00D2B4` | Ana vurgu rengi |
| `$coral` | `#FF6B5B` | İkincil vurgu |
| `$bg-deepest` | `#080C12` | En koyu arka plan |
| `$text-primary` | `#E8EDF5` | Ana metin |

## 📱 Yeni Uygulama Eklemek

1. `_data/tr.yml` ve `_data/en.yml`'e uygulama verilerini ekle
2. `index.html` ve `en/index.html`'de `app-card` bloğunu kopyala
3. Play Store URL'ini güncelle
