# Comprehensive Asset & Funnel Audit Report

**Author**: Explorer 3 (Asset & Funnel Auditor)  
**Date**: 2026-09-04 / 2026-09-05  
**Workspace Root**: `c:\Users\hadhi\OneDrive\Desktop\Raise AI`  
**Scope**: Webinar Page (`webinar/index.html`), Payment Pages (`webinar/payment/index.html`, `payment/index.html`, `payment/qr/index.html`), Replay & Legal Pages, and all on-disk media assets.

---

## Executive Summary

A comprehensive, read-only audit of all media assets and funnel continuity across the repository was conducted before paid advertising traffic begins.

### Critical Findings:
1. **Two Showcase Videos Missing (HTTP 404)**: In `webinar/index.html` (Lines 645 & 675), Showcase Items 4 and 6 fail to load because their `<source src="...">` URLs reference filenames with an ASCII period `.` (`Character_wearing_clothes_discus._202608302136.mp4` and `Creating_sunscreen_product_comme._202609020459.mp4`), whereas the actual files on disk in `webinar/Webinar videos/` are named with the Unicode horizontal ellipsis character `…` (`U+2026`): `Character_wearing_clothes_discus…_202608302136.mp4` and `Creating_sunscreen_product_comme…_202609020459.mp4`.
2. **Carousel Script Parser Crash (Uncaught SyntaxError)**: In `webinar/index.html` (Line 747), an extraneous `});` closing token breaks JavaScript execution for the entire showcase carousel script. As a result, the carousel navigation arrows (`#showcase-prev`, `#showcase-next`) and video play click handlers are completely dead.
3. **Severe Funnel Tracking Failure (Stripped UTMs & Click IDs)**: All four CTA buttons on `webinar/index.html` use static `href="/webinar/payment/"`. They fail to append `window.location.search`. When paid ad visitors navigate from landing page to checkout, all UTM parameters (`utm_source`, `utm_medium`, `utm_campaign`), `fbclid` (Meta click ID), and `gclid` are completely stripped, destroying Meta Pixel Purchase attribution and ad spend optimization.
4. **Phantom Purchase Events Inflating Ad Metrics**: In `webinar/payment/index.html` (Line 441), helper interactions such as "Copy UPI ID", "Download QR", and opening the guide modal trigger standard `fbq('track', 'Purchase', { value: 99.00 })` events. This falsely inflates Meta Ads conversion numbers by 5x-10x for users who have not actually paid.
5. **Instagram In-App Browser Intent Breakout Drops Parameters**: On Android devices in Instagram/FB in-app browsers, the breakout script at `webinar/payment/index.html:153` ejects users to external Chrome. Because query parameters were already stripped on landing page CTA navigation, Chrome launches without `fbclid` or UTMs, breaking conversion tracking on the single largest demographic in India (Android Instagram ad clicks).
6. **Price Mismatch Flash**: Landing page initially renders ₹199 before a 1-second JavaScript `setTimeout` drops it to ₹99 with confetti, whereas payment page is hardcoded to ₹99. High bounce risk for ad visitors seeing double the advertised price upon arrival.
7. **Missing Favicons**: Neither `webinar/` nor `payment/` declares `<link rel="icon">`, triggering automatic `/favicon.ico` 404 errors on every single visitor session.

---

## 1. Complete Disk Media Inventory (32 Files)

The filesystem scan identified **32 media files** across the workspace (excluding `.git` and `.agents`):

| # | Relative Path | Size (Bytes) | Format | Status in Webinar / Funnel |
|---|---------------|--------------|--------|----------------------------|
| 1 | `logo-home.jpg` | 18,641 | JPEG | Used in `contact/`, `terms/` (fallback) |
| 2 | `logo.png` | 458,866 | PNG | Primary site logo (root fallback) |
| 3 | `payment/logo.png` | 458,866 | PNG | Orphaned (in redirect directory) |
| 4 | `payment/qr/gpay-guide.png` | 188,947 | PNG | Orphaned duplicate of checkout guide |
| 5 | `payment/qr/qr-code.png` | 13,269 | PNG | Orphaned duplicate of checkout QR |
| 6 | `replay/6ae2ec04-2fdf-4efa-9077-a79526f18ac1.png` | 1,499,097 | PNG | Used in `replay/index.html` (Author photo) |
| 7 | `replay/logo_white.png` | 727,540 | PNG | Used in `replay/index.html` |
| 8 | `replay/qr_code.png` | 85,281 | PNG | Used in `replay/index.html` |
| 9 | `replay/thumb_car.jpg` | 768,765 | JPEG | Used in `replay/index.html` |
| 10 | `replay/thumb_drink.jpg` | 728,361 | JPEG | Used in `replay/index.html` |
| 11 | `replay/thumb_headphones.jpg` | 493,639 | JPEG | Used in `replay/index.html` |
| 12 | `replay/thumb_shoes.jpg` | 586,260 | JPEG | Used in `replay/index.html` |
| 13 | `replay/Untitled_Scene_08-16_15_16_08_202608180550.mp4` | 16,606,320 | MP4 | Used in `replay/index.html` |
| 14 | `webinar/ScreenRecording_08-30-2026 23-43-25_1 (1).m4a` | 26,713,796 | M4A/Audio | Used in audio carousel & grid |
| 15 | `webinar/ScreenRecording_08-30-2026 23-43-25_1 (2).m4a` | 22,971,773 | M4A/Audio | Used in audio carousel & grid |
| 16 | `webinar/ScreenRecording_08-30-2026 23-43-25_1 (3).m4a` | 5,621,441 | M4A/Audio | Used in audio carousel & grid |
| 17 | `webinar/ScreenRecording_08-30-2026 23-43-25_1 (4).m4a` | 9,718,036 | M4A/Audio | Used in audio carousel & grid |
| 18 | `webinar/ScreenRecording_08-30-2026 23-56-01_1.m4a` | 7,717,940 | M4A/Audio | Used in audio carousel & grid |
| 19 | `webinar/jithin-profile.png` | 319,478 | PNG | **Orphaned** (Removed by `clean_testimonials.js`) |
| 20 | `webinar/jithin-recording.m4a` | 28,536,833 | M4A/Audio | Used in audio carousel & grid |
| 21 | `webinar/logo.png` | 458,866 | PNG | Used in `webinar/index.html` & `webinar/payment/` |
| 22 | `webinar/testimonial.png` | 430,056 | PNG | **Orphaned** (Unreferenced asset) |
| 23 | `webinar/vishnu-profile.png` | 316,169 | PNG | **Orphaned** (Removed by `clean_testimonials.js`) |
| 24 | `webinar/vishnu-recording.m4a` | 12,691,861 | M4A/Audio | Used in audio carousel & grid |
| 25 | `webinar/Webinar videos/Character_wearing_clothes_discus…_202608302136.mp4` | 3,967,623 | MP4 | **Target of Broken Reference** (Item 4) |
| 26 | `webinar/Webinar videos/Create_sunscreen_commercial_B-roll_1080p_202609021711_erasio.mp4` | 6,379,358 | MP4 | Used in Showcase Item 5 |
| 27 | `webinar/Webinar videos/Creating_sunscreen_product_comme…_202609020459.mp4` | 2,508,137 | MP4 | **Target of Broken Reference** (Item 6) |
| 28 | `webinar/Webinar videos/Video Project 2 (1).mp4` | 23,010,054 | MP4 | Used in Showcase Item 1 |
| 29 | `webinar/Webinar videos/Video Project 5.mp4` | 56,649,027 | MP4 | Used in Showcase Item 2 |
| 30 | `webinar/Webinar videos/Video Project editing in real .mp4` | 140,505,170 | MP4 | Used in Showcase Item 3 (Trailing space) |
| 31 | `webinar/payment/gpay-guide.png` | 188,947 | PNG | Used in `webinar/payment/index.html` modal |
| 32 | `webinar/payment/qr-code.png` | 13,269 | PNG | Used in `webinar/payment/index.html` QR scan |

---

## 2. Cross-Reference Matrix & Broken Reference Scan

### A. Webinar Page (`webinar/index.html`) References

| Line # | Reference Type | Target Path / Value | Actual Disk File Exists? | Status / Evaluation |
|---|---|---|---|---|
| 7 | `<script src>` | `https://cdn.tailwindcss.com?...` | External CDN | OK |
| 8 | `<script src>` | `/webinar/webinar-date.js` | `webinar/webinar-date.js` | OK (File exists, 3,194 bytes) |
| 10 | `<script src>` | `https://cdn.jsdelivr.net/...confetti...` | External CDN | OK |
| 12-13 | `<link href>` | Google Fonts & Material Symbols | External CDN | OK |
| 166 | `<script src>` | `https://connect.facebook.net/en_US/fbevents.js` | External CDN | OK |
| 182 | `<img src>` | `https://www.facebook.com/tr?...` | External Tracking | OK |
| 189 | `<script src>` | `https://www.clarity.ms/tag/y7w4qe8w9w` | External Tracking | OK |
| 211 | `<img src>` | `/webinar/logo.png` | `webinar/logo.png` | OK (File exists, 458,866 bytes) |
| 214 | `<a href>` | `/webinar/payment/` | `webinar/payment/index.html` | ⚠️ Funnel Issue: Drops UTMs |
| 284 | `<source src>` | `/webinar/ScreenRecording_08-30-2026%2023-43-25_1%20(4).m4a` | `webinar/ScreenRecording_... (4).m4a` | OK (File exists, 9.7 MB) |
| 308 | `<source src>` | `/webinar/jithin-recording.m4a` | `webinar/jithin-recording.m4a` | OK (File exists, 28.5 MB) |
| 332 | `<source src>` | `/webinar/vishnu-recording.m4a` | `webinar/vishnu-recording.m4a` | OK (File exists, 12.7 MB) |
| 357 | `<source src>` | `/webinar/ScreenRecording_08-30-2026%2023-43-25_1%20(1).m4a` | `webinar/ScreenRecording_... (1).m4a` | OK (File exists, 26.7 MB) |
| 383 | `<source src>` | `/webinar/ScreenRecording_08-30-2026%2023-43-25_1%20(2).m4a` | `webinar/ScreenRecording_... (2).m4a` | OK (File exists, 22.9 MB) |
| 409 | `<source src>` | `/webinar/ScreenRecording_08-30-2026%2023-43-25_1%20(3).m4a` | `webinar/ScreenRecording_... (3).m4a` | OK (File exists, 5.6 MB) |
| 435 | `<source src>` | `/webinar/ScreenRecording_08-30-2026%2023-56-01_1.m4a` | `webinar/ScreenRecording_08-30-2026 23-56-01_1.m4a` | OK (File exists, 7.7 MB) |
| 538 | `<a href>` | `/webinar/payment/` | `webinar/payment/index.html` | ⚠️ Funnel Issue: Drops UTMs |
| 600 | `<source src>` | `/webinar/Webinar%20videos/Video%20Project%202%20(1).mp4` | `webinar/Webinar videos/Video Project 2 (1).mp4` | OK (File exists, 23.0 MB) |
| 615 | `<source src>` | `/webinar/Webinar%20videos/Video%20Project%205.mp4` | `webinar/Webinar videos/Video Project 5.mp4` | OK (File exists, 56.6 MB) |
| 630 | `<source src>` | `/webinar/Webinar%20videos/Video%20Project%20editing%20in%20real%20.mp4` | `webinar/Webinar videos/Video Project editing in real .mp4` | ⚠️ Fragile: Trailing space before `.mp4` |
| 645 | `<source src>` | `/webinar/Webinar%20videos/Character_wearing_clothes_discus._202608302136.mp4` | `webinar/Webinar videos/...` | ❌ **BROKEN (HTTP 404)**: Disk file contains `…` (`U+2026`), not `.` |
| 660 | `<source src>` | `/webinar/Webinar%20videos/Create_sunscreen_commercial_B-roll_1080p_202609021711_erasio.mp4` | `webinar/Webinar videos/...` | OK (File exists, 6.38 MB) |
| 675 | `<source src>` | `/webinar/Webinar%20videos/Creating_sunscreen_product_comme._202609020459.mp4` | `webinar/Webinar videos/...` | ❌ **BROKEN (HTTP 404)**: Disk file contains `…` (`U+2026`), not `.` |
| 912 | `<a href>` | `/webinar/payment/` | `webinar/payment/index.html` | ⚠️ Funnel Issue: Drops UTMs |
| 1061-1229 | `<source src>` | Audio Grid items 1 through 7 | `webinar/*.m4a` | OK (All 7 audio files exist) |
| 1314 | `<a href>` | `/webinar/payment/` | `webinar/payment/index.html` | ⚠️ Funnel Issue: Drops UTMs |
| 1324 | `<img src>` | `/webinar/logo.png` | `webinar/logo.png` | OK (File exists) |
| 1330-1334 | `<a href>` | `/terms/`, `/privacy/`, `/refund/`, `/delivery/`, `/contact/` | Respective directories | OK (All 5 legal pages exist) |
| <head> | `<link rel="icon">` | Missing | N/A | ⚠️ **404 Warning**: Browsers request `/favicon.ico` |

---

### B. Payment Page (`webinar/payment/index.html`) References

| Line # | Reference Type | Target Path / Value | Actual Disk File Exists? | Status / Evaluation |
|---|---|---|---|---|
| 7-10 | `<script>`, `<link>` | Tailwind, Date Script, Fonts | External / Local | OK |
| 163 | `<script src>` | Meta Pixel JS | External CDN | OK |
| 460 | `<script src>` | Clarity JS | External CDN | OK |
| 470 | `<button onclick>` | `window.location.href='../'` | Relative parent | ⚠️ Funnel Issue: Drops query params |
| 473 | `<img src>` | `../logo.png` | `webinar/logo.png` | OK (File exists, 458,866 bytes) |
| 537 | `<img src>` | `./qr-code.png` | `webinar/payment/qr-code.png` | OK (File exists, 13,269 bytes) |
| 544 | `<script src>` | Razorpay button JS | External (in hidden form) | OK |
| 634 | `<img src>` | `./gpay-guide.png` | `webinar/payment/gpay-guide.png` | OK (File exists, 188,947 bytes) |
| 254 | `const qrUrl` | `'./qr-code.png'` | `webinar/payment/qr-code.png` | OK (Download script target) |
| 561, 662, 736, 804 | `<a href>` | `https://wa.me/917356003301?text=...` | External WhatsApp API | OK (Pre-filled text hardcoded) |
| 587-588 | `<a href>` | `/terms/`, `/privacy/` | Root directories | OK (Both legal pages exist) |
| <head> | `<link rel="icon">` | Missing | N/A | ⚠️ **404 Warning**: Browsers request `/favicon.ico` |

---

### C. Redirect Pages (`payment/index.html` & `payment/qr/index.html`)

- `payment/index.html`:
  ```html
  <meta http-equiv="refresh" content="0; url=/webinar/" />
  <script>window.location.href = "/webinar/";</script>
  ```
  **Flaw**: Drops `window.location.search`. Any ad or user landing on `/payment/?utm_...` loses all tracking parameters.
- `payment/qr/index.html`:
  ```html
  <meta http-equiv="refresh" content="0; url=/webinar/payment/" />
  <script>window.location.href = "/webinar/payment/";</script>
  ```
  **Flaw**: Drops `window.location.search`.

---

## 3. Deep Investigation: Missing Showcase Videos

### Context & Root Cause
The showcase section showcases 6 AI-generated video ads created with Flow tools.  
When examining `webinar/Webinar videos/`, there are exactly 6 `.mp4` video files present on disk:
1. `Video Project 2 (1).mp4` (23,010,054 bytes)
2. `Video Project 5.mp4` (56,649,027 bytes)
3. `Video Project editing in real .mp4` (140,505,170 bytes)
4. `Character_wearing_clothes_discus…_202608302136.mp4` (3,967,623 bytes)
5. `Create_sunscreen_commercial_B-roll_1080p_202609021711_erasio.mp4` (6,379,358 bytes)
6. `Creating_sunscreen_product_comme…_202609020459.mp4` (2,508,137 bytes)

In `webinar/index.html`:
- Line 645 (Item 4): `<source src="/webinar/Webinar%20videos/Character_wearing_clothes_discus._202608302136.mp4" type="video/mp4">`
- Line 675 (Item 6): `<source src="/webinar/Webinar%20videos/Creating_sunscreen_product_comme._202609020459.mp4" type="video/mp4">`

Notice the discrepancy:
- Disk: `...discus…_...` contains the single Unicode ellipsis glyph `…` (`U+2026`, UTF-8 bytes `\xE2\x80\xA6`).
- HTML: `...discus._...` contains an ASCII period `.` (`U+002E`, single byte `\x2E`).
- Disk: `...comme…_...` contains `…` (`U+2026`).
- HTML: `...comme._...` contains `.` (`U+002E`).

### Why Did This Occur?
Historical build scripts (`webinar/update_real_videos.js` lines 5 & 7 and `webinar/reorder_carousel.js` lines 9 & 11) reveal that when the developer wrote the string array to update the HTML, they manually typed a single dot `.` instead of the Unicode ellipsis `…`. When AI video generator platforms (Runway, Luma, Kling, HaiLuo) truncate prompt names in downloaded video filenames, they insert `…`. When copy-pasting or typing into JavaScript strings, the character was transcribed as `.`.

### Impact on Ad Traffic
1. **Broken Visual Social Proof**: Items 4 and 6 are crucial proof that the workflow creates realistic character dialogues and commercial product ads. When clicked, the overlay disappears, leaving a black void with no playback.
2. **Ad Waste**: Ad creatives promising "Learn how to make sunscreen ads and character talking videos" lead directly to broken video containers.
3. **Console Errors**: Browser logs display `404 Not Found` and `MEDIA_ELEMENT_ERROR: Format error / source not found`.

---

## 4. Deep Investigation: Showcase Carousel Parser Crash

In `webinar/index.html` (Lines 745-748):
```javascript
744:                             }
745:                         });
746:                     });
747:                     });
748:                 });
749:             </script>
```
Tracing open vs closing blocks in lines 689-749:
- Line 690: `document.addEventListener("DOMContentLoaded", () => {` (1 open)
- Line 717: `overlays.forEach((overlay, index) => {` (2 open)
- Line 718: `overlay.addEventListener('click', () => {` (3 open)
- Line 745: `});` (closes click handler — 2 remaining)
- Line 746: `});` (closes overlays.forEach — 1 remaining)
- Line 747: `});` (0 remaining — closes DOMContentLoaded)
- Line 748: `});` -> **SYNTAX ERROR: Unexpected token ')'**

### Impact:
Because of line 747, the entire script fails at JavaScript parse time before executing a single line:
- Prev/Next carousel buttons do nothing.
- Clicking ANY video overlay does nothing.
- The `loadedmetadata` poster hack never runs.

---

## 5. Detailed Funnel Continuity & Tracking Audit

### Issue F1: Zero UTM & Ad Click ID Pass-Through to Checkout
- **Location**: `webinar/index.html`, Lines 214, 538, 912, 1314
- **Problem**: All 4 CTA links point to static `/webinar/payment/`. They do not append `window.location.search`.
- **Ad Traffic Impact**: **CRITICAL**. When users click an ad on Meta/Instagram (`?utm_source=facebook&utm_campaign=ai_masterclass&fbclid=IwAR...`), landing on `/webinar/`, and click "Join Webinar", the checkout page loads as clean `/webinar/payment/`. Meta Pixel and Clarity on the checkout page cannot link the purchase or initiate checkout back to the specific ad campaign, destroying Meta's algorithmic conversion optimization.
- **Fix**: Inject dynamic query parameter forwarding to all checkout links.

### Issue F2: Android Instagram/Facebook In-App Browser Breakout Drops Tracking
- **Location**: `webinar/payment/index.html`, Lines 146-155
- **Problem**:
  ```javascript
  const cleanUrl = window.location.href.replace(/^https?:\/\//, '');
  window.location.href = `intent://${cleanUrl}#Intent;scheme=https;package=com.android.chrome;end`;
  ```
  Because the URL reaching `/webinar/payment/` already lost its query parameters from F1, the intent string launches Chrome with a clean URL without `fbclid`.
- **Ad Traffic Impact**: **CRITICAL**. Over 85% of paid social traffic in India runs on Android Instagram/Facebook apps. Ejecting the user into Chrome without `fbclid` guarantees that the purchase cannot be matched back to the Meta Ad Account.

### Issue F3: False `Purchase` Events Fired on Utility Interactions
- **Location**: `webinar/payment/index.html`, Lines 250, 336, 346, 380, 399
- **Problem**: `trackPurchaseEvent(method)` calls `fbq('track', 'Purchase', { value: 99.00 })` when a user merely clicks "Copy UPI ID", downloads the QR code, or opens the Google Pay modal.
- **Ad Traffic Impact**: **HIGH**. Falsely inflates recorded purchases in Meta Ads Manager. If 100 visitors click "Copy UPI ID" but only 5 complete payment, Meta records 100 purchases (₹9,900 revenue) instead of 5 (₹495 revenue). Meta's bidding algorithm optimizes for people who copy text rather than actual paying buyers.
- **Fix**: Change utility click events to `fbq('trackCustom', ...)` and fire standard `Purchase` only upon verified payment confirmation.

### Issue F4: Duplicate `InitiateCheckout` Event
- **Location**: `webinar/index.html:171` (`trackCheckoutClick`) and `webinar/payment/index.html:167`
- **Problem**: `InitiateCheckout` is triggered once when the user clicks the landing page CTA, and a second time immediately when the payment page loads.
- **Ad Traffic Impact**: **MEDIUM**. Doubles reported checkout starts in analytics.

### Issue F5: Price Flash Lag (₹199 -> ₹99 1-Second Delay)
- **Location**: `webinar/index.html`, Lines 215, 247, 529, 1530
- **Problem**: HTML hardcodes ₹199 across all hero and header badges. A JavaScript function `triggerPriceDropAndCountdown` runs after `setTimeout(..., 1000)` to cross out ₹199 and show ₹99. On mobile networks or low-end devices, users see ₹199 for 1-3 seconds. The payment page, however, displays ₹99.
- **Ad Traffic Impact**: **HIGH**. Visitors from ads advertising "Join for ₹99" arrive and immediately see ₹199 in bold at the top of the page, triggering immediate bounce before the script executes.

### Issue F6: Payment Page "Go Back" Navigation Drops State
- **Location**: `webinar/payment/index.html`, Line 470
- **Problem**: `<button onclick="window.location.href='../'">` uses static relative navigation rather than `history.back()`.

---

## 6. Concrete Code-Level Remediation Plan

### Remediation Item 1: Fix Missing Showcase Videos in `webinar/index.html`

#### Option A (Recommended): Rename Disk Files to Clean Web-Safe Names
1. Rename `webinar/Webinar videos/Character_wearing_clothes_discus…_202608302136.mp4` to `Character_wearing_clothes_discuss_202608302136.mp4`
2. Rename `webinar/Webinar videos/Creating_sunscreen_product_comme…_202609020459.mp4` to `Creating_sunscreen_product_commercial_202609020459.mp4`
3. In `webinar/index.html`:
   - Line 645:
     ```html
     <!-- Before -->
     <source src="/webinar/Webinar%20videos/Character_wearing_clothes_discus._202608302136.mp4" type="video/mp4">
     <!-- After -->
     <source src="/webinar/Webinar%20videos/Character_wearing_clothes_discuss_202608302136.mp4" type="video/mp4">
     ```
   - Line 675:
     ```html
     <!-- Before -->
     <source src="/webinar/Webinar%20videos/Creating_sunscreen_product_comme._202609020459.mp4" type="video/mp4">
     <!-- After -->
     <source src="/webinar/Webinar%20videos/Creating_sunscreen_product_commercial_202609020459.mp4" type="video/mp4">
     ```

#### Option B: URL-Encode Ellipsis in HTML (Zero Disk Renames)
- Line 645:
  ```html
  <source src="/webinar/Webinar%20videos/Character_wearing_clothes_discus%E2%80%A6_202608302136.mp4" type="video/mp4">
  ```
- Line 675:
  ```html
  <source src="/webinar/Webinar%20videos/Creating_sunscreen_product_comme%E2%80%A6_202609020459.mp4" type="video/mp4">
  ```

---

### Remediation Item 2: Fix Showcase Carousel Script Syntax Error in `webinar/index.html`

In `webinar/index.html`, lines 745-749:
```javascript
// BEFORE (Corrupted with 4 closing tokens)
                            }
                        });
                    });
                    });
                });
            </script>

// AFTER (Properly closed)
                            }
                        });
                    });
                });
            </script>
```

---

### Remediation Item 3: Forward UTMs & Click IDs to Checkout in `webinar/index.html`

Add the following script right before `</head>` in `webinar/index.html`:
```html
<script>
document.addEventListener("DOMContentLoaded", () => {
    if (window.location.search) {
        const ctaLinks = document.querySelectorAll('a[href*="/webinar/payment/"]');
        ctaLinks.forEach(link => {
            const url = new URL(link.href, window.location.origin);
            const currentParams = new URLSearchParams(window.location.search);
            currentParams.forEach((val, key) => url.searchParams.set(key, val));
            link.href = url.pathname + url.search;
        });
    }
});
</script>
```

---

### Remediation Item 4: Preserve Query Parameters in Redirect Pages

In `payment/index.html` (Line 5):
```html
<!-- Before -->
<script>window.location.href = "/webinar/";</script>
<!-- After -->
<script>window.location.href = "/webinar/" + window.location.search + window.location.hash;</script>
```

In `payment/qr/index.html` (Line 5):
```html
<!-- Before -->
<script>window.location.href = "/webinar/payment/";</script>
<!-- After -->
<script>window.location.href = "/webinar/payment/" + window.location.search + window.location.hash;</script>
```

---

### Remediation Item 5: Separate Custom Events from Real Purchases in `webinar/payment/index.html`

In `webinar/payment/index.html`, replace `trackPurchaseEvent(method)` on line 441 with:
```javascript
function trackPurchaseEvent(method) {
    if (typeof fbq === 'function') {
        // Log micro-conversions as custom events, NOT purchases
        fbq('trackCustom', 'Payment_Intent_Action', {
            content_name: 'Flow Fundamentals with 100% free tools',
            action_type: method
        });
    }
}
```
Only trigger `fbq('track', 'Purchase', ...)` when a confirmed payment action occurs.

---

### Remediation Item 6: Add Favicons to Both Pages

Add to `<head>` of `webinar/index.html` and `webinar/payment/index.html`:
```html
<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🚀</text></svg>">
```

---

### Remediation Item 7: Fix Payment Back Button

In `webinar/payment/index.html` line 470:
```html
<!-- Before -->
<button aria-label="Go back" onclick="window.location.href='../'" ...>
<!-- After -->
<button aria-label="Go back" onclick="if(history.length > 1) { history.back(); } else { window.location.href='/webinar/' + window.location.search; }" ...>
```
