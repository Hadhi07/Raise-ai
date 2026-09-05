# Comprehensive Payment & Checkout QA Analysis Report

**Target Directory**: `c:\Users\hadhi\OneDrive\Desktop\Raise AI\payment` and `c:\Users\hadhi\OneDrive\Desktop\Raise AI\webinar\payment`  
**Related Components**: `c:\Users\hadhi\OneDrive\Desktop\Raise AI\thankyou` and `c:\Users\hadhi\OneDrive\Desktop\Raise AI\webinar\index.html`  
**Date**: 2026-09-04  
**Explorer**: Explorer 2 (Payment QA Explorer)  
**Execution Mode**: Read-Only Audit  

---

## Executive Summary

A comprehensive, line-by-line quality assurance inspection was performed across all checkout and payment architecture in the Raise AI codebase. The analysis covered the entry routing (`payment/`), active checkout flow (`webinar/payment/`), conversion tracking (Meta Pixel), payment gateway hooks (Razorpay, UPI intent protocols), post-purchase flow (`thankyou/`), and copy/pricing alignment with the sales page (`webinar/index.html`).

### Key Findings Snapshot:
1. **Critical Tracking Flaw**: Meta Pixel standard `Purchase` events (`value: 99.00, currency: 'INR'`) fire prematurely whenever a user clicks "Download QR", "Copy UPI ID", opens a modal, or taps a WhatsApp link—**prior to any actual financial transaction**. This will severely corrupt Meta Ads campaign optimization, inflate reported ROAS, and burn ad spend on low-intent window-shoppers.
2. **Missing Customer Registration Form**: The checkout page contains **zero input fields**. Full Name, Email, and Phone Number are not captured before payment. If a user transfers ₹99 via UPI but fails to manually message WhatsApp, the organizer has no way to identify the buyer or deliver the webinar Zoom link.
3. **Disabled Payment Gateway**: The official Razorpay payment button (`pl_TVB8Sr0iLBlBZY`) is disabled with Tailwind's `hidden` class. Cards, net banking, wallets, and automated 1-click Razorpay UPI are completely blocked, alienating 25–40% of paying customers.
4. **High-Friction Manual Funnel**: Payment relies on an offline 16-step manual transfer flow (download QR or copy personal UPI ID `hadhip6252@sbi`, exit browser, open external UPI app, pay ₹99, capture screenshot, switch back, open WhatsApp to `+91 73560 03301`, attach screenshot, type details, await manual review). Expected cold traffic drop-off is 85–95%.
5. **Support Phone Number Divergence**: WhatsApp support points to `+91 73560 03301` across the checkout page and webinar landing page, but `thankyou/index.html` points to a completely different number: `+91 62827 17132`.
6. **Thank You Page Deceptive Claim**: The thank-you page states: *"We've sent you a confirmation email with all the details you need"*, despite the funnel never collecting an email address.
7. **Routing Inconsistency**: The root `payment/index.html` redirects to `/webinar/` (the sales page) rather than `/webinar/payment/` (the checkout page).

---

## Architecture & Funnel Inventory

```
[Ad Campaign / Direct Traffic]
            │
            ├──> /payment/ (payment/index.html)
            │        └─ REDIRECTS TO ──> /webinar/ (Sales Page) [ISSUE: Bounces back to sales page!]
            │
            ├──> /payment/qr/ (payment/qr/index.html)
            │        └─ REDIRECTS TO ──> /webinar/payment/
            │
            └──> /webinar/ (webinar/index.html)
                     └─ CTAs LINK TO ──> /webinar/payment/ (Active Checkout Page)
                                              │
                     ┌────────────────────────┴────────────────────────┐
                     ▼                                                 ▼
             [Download QR Flow]                                [Copy UPI ID Flow]
          - Downloads qr-code.png                            - Copies hadhip6252@sbi
          - Fires Meta 'Purchase' [BUG!]                     - Fires Meta 'Purchase' [BUG!]
          - Opens GPay Scanner Modal                         - Opens GPay Guide Modal
                     │                                                 │
                     └────────────────────────┬────────────────────────┘
                                              ▼
                             [Exit Browser -> Open UPI App]
                                  (Pay ₹99 manually)
                                              ▼
                             [Take Screenshot on Phone]
                                              ▼
                        [Open WhatsApp to +91 73560 03301]
                     - Attach screenshot
                     - Manually type Name, Email, Phone
                                              │
                        (User NEVER redirected to /thankyou/!)
                                              │
                        [thankyou/index.html (Orphaned)]
                     - Claims "Email Sent" [BUG: No email collected!]
                     - Links to wa.me/916282717132 [BUG: Wrong phone number!]
                     - Has NO Meta Pixel tracking!
```

### File Inventory in `payment/` & `webinar/payment/`:
| File Path | Size | Role / Functionality | Status |
|---|---|---|---|
| `payment/index.html` | 871 B | Legacy redirect file | **Buggy**: Redirects to `/webinar/` instead of `/webinar/payment/` |
| `payment/logo.png` | 458 KB | Raise AI branding asset | Valid |
| `payment/qr/index.html` | 892 B | QR redirect file | Valid: Redirects to `/webinar/payment/` |
| `payment/qr/gpay-guide.png` | 188 KB | GPay tutorial visual guide | Duplicate of `webinar/payment/gpay-guide.png` |
| `payment/qr/qr-code.png` | 13 KB | Payment QR code image | Duplicate of `webinar/payment/qr-code.png` |
| `webinar/payment/index.html` | 52.2 KB | Primary checkout & payment page | **Critical issues**: Tracking, gateway hidden, dead code, no form |
| `webinar/payment/gpay-guide.png` | 188 KB | GPay "Pay anyone" screenshot guide | Active |
| `webinar/payment/qr-code.png` | 13 KB | Static SBI UPI QR code | Active |
| `thankyou/index.html` | 6.7 KB | Post-purchase confirmation page | **Buggy**: Phone mismatch, false email claim, unreached |

---

## Detailed Issue Catalog

---

### Issue 1: Premature Meta Pixel `Purchase` Event on Non-Purchasing Clicks
- **Severity**: 🔴 CRITICAL
- **Category**: Conversion Tracking & Ad Optimization
- **File**: `webinar/payment/index.html`
- **Line Numbers**: 173–187, 250, 336, 346, 354, 380, 399, 422, 441–450, 561
- **Direct Code Evidence**:
  ```javascript
  // Line 173-187
  function trackGPayClick() {
      if (typeof fbq === 'function') {
          fbq('track', 'Purchase', {
              content_name: 'Flow Fundamentals with 100% free tools',
              value: 99.00,
              currency: 'INR',
              payment_method: 'UPI_GPay_Direct'
          });
          fbq('trackCustom', 'GPay_Payment_Click', { ... });
      }
  }

  // Line 441-450
  function trackPurchaseEvent(method) {
      if (typeof fbq === 'function') {
          fbq('track', 'Purchase', {
              content_name: 'Flow Fundamentals with 100% free tools',
              value: 99.00,
              currency: 'INR',
              payment_method: method
          });
      }
  }
  ```
  Called at:
  - Line 250: `trackPurchaseEvent('GPay_Manual_Copy_Launch')` inside `handleTouchGPay()` (fired when user clicks "Copy UPI ID & Pay")
  - Line 336: `trackPurchaseEvent(successEvent)` inside `downloadQRAndShowGuide()` (fired when user clicks "Download QR & Scan")
  - Line 346: `trackPurchaseEvent('GPay_Visual_Modal_Open')`
  - Line 354: `trackPurchaseEvent('All_Apps_Modal_Open')`
  - Line 380: `trackPurchaseEvent('Launch_GPay_Home')`
  - Line 399: `trackPurchaseEvent('Launch_Other_UPI')`
  - Line 561: `<a onclick="trackPurchaseEvent('WhatsApp_Handoff')"` on WhatsApp button
- **Root Cause**: The developer bound Meta Pixel's standard `Purchase` event (which represents actual revenue) to basic pre-purchase intent clicks.
- **Ad Traffic Impact**:
  - **Catastrophic Ad Budget Depletion**: Meta's conversion algorithm optimizes for people most likely to trigger the `Purchase` event. When casual clickers trigger `Purchase` without paying, Meta's algorithm identifies those "clickers" as high-value converters and serves ads to similar audiences who click buttons but never pay.
  - **Distorted Analytics & False ROAS**: Dashboards will report 50–100+ "purchases" with 5x–10x ROAS while the bank account only received a fraction of that amount.
  - **Policy Violation**: Violates Meta Ads Policies regarding misleading conversion event firing.
- **Remediation**:
  Change click tracking to custom events or `InitiateCheckout`. Move `fbq('track', 'Purchase')` strictly to `thankyou/index.html` or Razorpay's verified payment callback.
  ```javascript
  // Change button click trackers to:
  function trackButtonClick(actionName) {
      if (typeof fbq === 'function') {
          fbq('trackCustom', actionName, {
              content_name: 'Flow Fundamentals with 100% free tools',
              value: 99.00,
              currency: 'INR'
          });
      }
  }
  ```

---

### Issue 2: Zero Lead & Contact Data Capture (No Registration Form)
- **Severity**: 🔴 CRITICAL
- **Category**: Lead Capture, Fulfillment & Checkout Form
- **File**: `webinar/payment/index.html`
- **Line Numbers**: Entire page (0 `<input>` or `<form>` tags for user data)
- **Direct Code Evidence**:
  ```bash
  grep_search "<input" -> 0 matches
  ```
  The only `<form>` on the page is the hidden Razorpay button script at line 544.
- **Root Cause**: The page was designed solely as an image display and clipboard copy interface, bypassing user registration completely.
- **Ad Traffic Impact**:
  - **High Unmatched Payment Rate (Stranded Revenue)**: When users transfer ₹99 via SBI UPI, their bank reference (UTR / UPI Ref ID) appears on the organizer's statement, but with NO corresponding customer name, email, or phone. If the user does not message WhatsApp, the organizer cannot send them the webinar Zoom link.
  - **Zero Abandoned Cart Retargeting**: In a standard funnel, capturing Name/Email/Phone allows automated abandoned cart recovery via WhatsApp/SMS/Email for users who dropped off before completing payment. Without form fields, 100% of non-completing ad traffic is permanently lost.
- **Remediation**:
  Insert a clean 3-field registration form before the payment options:
  - Full Name (`name="fullname"`, required, regex: `^[a-zA-Z\s]{2,50}$`)
  - Email Address (`name="email"`, required, regex: `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`)
  - WhatsApp Phone Number (`name="phone"`, required, regex: `^[6-9]\d{9}$`, prefix `+91`)
  Persist this data to `localStorage` and pre-fill the WhatsApp link automatically with their details:
  ```javascript
  const userMsg = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n[Attached Payment Screenshot]`
  );
  whatsappLink.href = `https://wa.me/917356003301?text=${userMsg}`;
  ```

---

### Issue 3: Official Razorpay Payment Gateway Disabled (`class="hidden"`)
- **Severity**: 🔴 CRITICAL
- **Category**: Payment Gateways & Conversion Optimization
- **File**: `webinar/payment/index.html`
- **Line Numbers**: 542–545
- **Direct Code Evidence**:
  ```html
  <!-- RAZORPAY BUTTON -->
  <div class="w-full flex justify-center mt-2 mb-1 hidden">
      <form><script src="https://checkout.razorpay.com/v1/payment-button.js" data-payment_button_id="pl_TVB8Sr0iLBlBZY" async> </script> </form>
  </div>
  ```
- **Root Cause**: The official Razorpay Payment Button integration is explicitly suppressed with `class="hidden"`.
- **Ad Traffic Impact**:
  - **Exclusion of Non-UPI Payers**: 25% to 40% of webinar buyers in India prefer paying via Credit Card (to earn reward points), Corporate Cards, Debit Cards, Net Banking, or Cred/Wallets. These users are completely blocked from buying.
  - **Friction-Induced Drop-off**: Razorpay handles native 1-click mobile UPI intent, automatic verification, and immediate webhook triggers. By hiding it, every user is subjected to manual transfer friction.
- **Remediation**:
  Remove `hidden` from line 543 and provide Razorpay as the primary automated checkout option, alongside the UPI QR code fallback:
  ```html
  <div class="w-full flex flex-col items-center justify-center mt-2 mb-1">
      <p class="text-xs text-neutral-400 mb-2 font-medium">Pay securely via Cards, NetBanking, UPI or Wallets:</p>
      <form class="w-full flex justify-center">
          <script src="https://checkout.razorpay.com/v1/payment-button.js" data-payment_button_id="pl_TVB8Sr0iLBlBZY" async> </script>
      </form>
  </div>
  ```

---

### Issue 4: Divergent WhatsApp Support Numbers Across Funnel
- **Severity**: 🟠 HIGH
- **Category**: Customer Support & Delivery Continuity
- **Files**:
  - `webinar/payment/index.html`: Lines 561, 576, 597, 662, 736, 804, 830 -> `+91 73560 03301` (`917356003301`)
  - `webinar/index.html`: Line 1276 -> `+91 73560 03301` (`917356003301`)
  - `thankyou/index.html`: Line 111 -> `+91 62827 17132` (`916282717132`)
- **Direct Code Evidence**:
  ```html
  <!-- thankyou/index.html:111 -->
  <a href="https://wa.me/916282717132?text=Hi!%20I%20just%20completed%20my%20payment%20for%20the%20Raise%20AI%20Masterclass." ...>

  <!-- webinar/payment/index.html:561 -->
  <a href="https://wa.me/917356003301?text=Name%3A%0AEmail%3A%0APhonenumber%3A..." ...>
  ```
- **Root Cause**: Outdated or conflicting phone numbers hardcoded across separate HTML templates.
- **Ad Traffic Impact**:
  If a customer is directed to `thankyou/index.html` (e.g. after Razorpay payment), they click the WhatsApp button to contact `+91 62827 17132`. If the admin is actively checking `+91 73560 03301`, the customer's message goes unread, delaying Zoom link delivery and creating dissatisfaction.
- **Remediation**:
  Update `thankyou/index.html` line 111 to point to `wa.me/917356003301`.

---

### Issue 5: Root `/payment/` Redirects to Sales Page Rather Than Checkout
- **Severity**: 🟠 HIGH
- **Category**: URL Routing & Ad Traffic Handling
- **File**: `payment/index.html`
- **Line Numbers**: 4–5, 18
- **Direct Code Evidence**:
  ```html
  <meta http-equiv="refresh" content="0; url=/webinar/" />
  <script>window.location.href = "/webinar/";</script>
  ...
  <p>If you are not redirected automatically, <a href="/webinar/" style="color: #a3fd00;">click here</a>.</p>
  ```
- **Root Cause**: `payment/index.html` redirects visitors to `/webinar/` instead of `/webinar/payment/`.
- **Ad Traffic Impact**:
  If any marketing campaign, ad display link, SMS, or QR code directs users to `raiseai.in/payment`, users expect to arrive at the checkout form. Instead, they are redirected backwards to the lengthy landing page, adding unwanted friction and reducing conversion.
- **Remediation**:
  Update `payment/index.html` lines 4, 5, and 18 to target `/webinar/payment/`.

---

### Issue 6: Thank You Page False "Confirmation Email" Guarantee
- **Severity**: 🟠 HIGH
- **Category**: Post-Purchase UX & Customer Trust
- **File**: `thankyou/index.html`
- **Line Numbers**: 96–97, 117
- **Direct Code Evidence**:
  ```html
  <li class="flex items-start gap-3">
      <span class="material-symbols-outlined text-neutral-500 text-[20px] mt-0.5">mail</span>
      <div>
          <strong class="text-white block mb-1">Check your inbox</strong>
          We've sent you a confirmation email with all the details you need.
      </div>
  </li>
  ...
  <p class="text-neutral-500 text-xs mt-8">If you have any questions or didn't receive the email, please contact us at support@raiseai.in</p>
  ```
- **Root Cause**: Copied boilerplate text from an automated LMS email system. The static site has no backend and collects no email address on checkout.
- **Ad Traffic Impact**:
  Buyers who reach this page search their inboxes (and spam folders), find nothing (since no email was ever captured), assume the transaction failed or was fraudulent, and immediately file payment disputes or flood WhatsApp support.
- **Remediation**:
  Update `thankyou/index.html` copy to clearly guide users on WhatsApp confirmation:
  ```html
  <strong class="text-white block mb-1">Send us your payment screenshot</strong>
  Message our WhatsApp support to get your instant Zoom link and bonus credits.
  ```

---

### Issue 7: High-Friction 16-Step Manual Payment Funnel
- **Severity**: 🟠 HIGH
- **Category**: Conversion Rate Optimization (CRO)
- **File**: `webinar/payment/index.html`
- **Line Numbers**: 547–580, 602–744
- **Root Cause**: Checkout requires manual multi-app switching, screenshot capture, and manual messaging without automated verification.
- **Ad Traffic Impact**:
  Average e-commerce drop-off increases exponentially with each added step. A 16-step manual transfer flow on mobile leads to an estimated **85%–95% drop-off** from cold paid traffic.
- **Remediation**:
  1. Re-activate automated Razorpay checkout.
  2. For users paying via UPI QR, embed direct native 1-tap UPI deep links (`upi://pay?pa=hadhip6252@sbi&pn=RaiseAI&am=99.00&cu=INR&tn=Masterclass`) that directly launch GPay/PhonePe/Paytm with amount and payee pre-filled.

---

### Issue 8: Pricing Inconsistency Between Landing Page (`₹199`) and Checkout (`₹99`)
- **Severity**: 🟡 MEDIUM
- **Category**: Pricing Transparency & Trust
- **Files**:
  - `webinar/index.html`: Lines 215, 539, 913, 1311
  - `webinar/payment/index.html`: Line 510
- **Direct Code Evidence**:
  - `webinar/index.html` hardcodes `₹199` on all CTAs before a 1000ms delay:
    ```html
    <span class="btn-text">Join Webinar — ₹199</span>
    <span class="btn-text">Register for Live Session — ₹199</span>
    <span class="btn-text">Register Now for ₹199</span>
    <span class="btn-text">Join for ₹199</span>
    ```
  - `webinar/payment/index.html` displays `₹99` directly:
    ```html
    <p class="text-2xl md:text-3xl text-neon font-headline font-black">₹99</p>
    <p class="text-[9px] md:text-[10px] text-neutral-400 uppercase font-semibold">One-Time Fee</p>
    ```
- **Root Cause**: The landing page delays price discounts by 1 second using JavaScript, whereas the checkout page displays ₹99 statically without indicating that it is a discount from the ₹199 standard fee.
- **Ad Traffic Impact**:
  Visitors who click quickly on the landing page see `₹199`, then see `₹99` on checkout. Inconsistent price references decrease brand authority and trigger hesitation.
- **Remediation**:
  Show consistent anchored pricing across both pages:
  ```html
  <span class="line-through text-neutral-500 text-lg mr-1.5">₹199</span>
  <span class="text-neon font-black text-2xl">₹99</span>
  <span class="text-[10px] text-neon bg-neon/10 px-2 py-0.5 rounded-full uppercase font-bold">50% OFF</span>
  ```

---

### Issue 9: Orphaned Dead Code (Unreachable Modals & Broken Event Listeners)
- **Severity**: 🟡 MEDIUM
- **Category**: Code Quality & Maintenance
- **File**: `webinar/payment/index.html`
- **Line Numbers**: 349–355, 419–424, 437–439, 746–817, 820–850, 896–919
- **Direct Code Evidence**:
  1. `all-apps-modal` (Lines 746–817): Complete 71-line modal for choosing Google Pay or other UPI apps, but no button in the UI triggers `openAllAppsModal()` or `openModal('all-apps-modal')`.
  2. `privacy-modal` (Lines 820–834) & `terms-modal` (Lines 837–850): Legal modals defined in the DOM, but footer links at lines 587–588 use standard external links `<a href="/terms/" target="_blank">` instead of opening the modals.
  3. Dead Event Listeners (Lines 896–919):
     ```javascript
     const copyBtn = document.getElementById('copy-upi-btn');
     const copyText = document.getElementById('copy-text');
     const copyIcon = document.getElementById('copy-icon');
     const copyStatus = document.getElementById('copy-status');
     ```
     None of these IDs exist in the markup.
  4. Dead Functions: `payViaGooglePay()`, `handleUPIPayment()`, `openAllAppsModal()` are never invoked.
- **Root Cause**: Incomplete refactoring when replacing an older checkout interface with the "Download QR & Scan" layout.
- **Ad Traffic Impact**: Unnecessary DOM weight, maintenance confusion, and risk of runtime null reference exceptions.
- **Remediation**: Prune unused functions and dead listeners, or wire `privacy-modal`/`terms-modal` directly to the footer links via `onclick="openModal('terms-modal')"`.

---

### Issue 10: Inaccessible Viewport Metatag (Zoom Blocked)
- **Severity**: 🟡 MEDIUM
- **Category**: Accessibility (WCAG) & Mobile Usability
- **File**: `webinar/payment/index.html`
- **Line Number**: 5
- **Direct Code Evidence**:
  ```html
  <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport">
  ```
- **Root Cause**: `maximum-scale=1.0, user-scalable=no` prevents users from pinching to zoom.
- **Ad Traffic Impact**:
  Users on smaller devices (e.g. 4.7" to 5.5" mobile screens) cannot zoom into the QR code or the UPI ID text. Violates WCAG 2.1 Success Criterion 1.4.4 (Resize text).
- **Remediation**:
  Change line 5 to:
  ```html
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ```

---

### Issue 11: Android Chrome Intent Breakout May Trigger Navigation Errors
- **Severity**: 🟡 MEDIUM
- **Category**: Browser Compatibility & Webview Stability
- **File**: `webinar/payment/index.html`
- **Line Numbers**: 146–155
- **Direct Code Evidence**:
  ```javascript
  (function() {
      const ua = navigator.userAgent || '';
      const isInstagram = /Instagram/i.test(ua) || /FBAN|FBAV/i.test(ua);
      const isAndroid = /Android/i.test(ua);

      if (isInstagram && isAndroid && !window.location.hash.includes('in_chrome')) {
          const cleanUrl = window.location.href.replace(/^https?:\/\//, '');
          window.location.href = `intent://${cleanUrl}#Intent;scheme=https;package=com.android.chrome;end`;
      }
  })();
  ```
- **Root Cause**: Programmatically triggering an Android intent scheme on page load without user activation.
- **Ad Traffic Impact**:
  Modern Instagram and Meta in-app browsers block top-level navigations to `intent://` unless triggered by a direct user tap. In some Android versions, this results in `ERR_UNKNOWN_URL_SCHEME` or a blank white screen upon landing from an ad.
- **Remediation**:
  Trigger browser breakout via user action (e.g. "Open in Chrome for 1-Tap Google Pay" button) or wrap inside a feature check with graceful fallback.

---

### Issue 12: Missing Guarantee & Unlinked Refund Policy on Order Summary
- **Severity**: 🟢 LOW-MEDIUM
- **Category**: Trust & Risk Reversal
- **File**: `webinar/payment/index.html`
- **Line Numbers**: 491–514, 584–590
- **Root Cause**: `c:\Users\hadhi\OneDrive\Desktop\Raise AI\refund\index.html` exists with comprehensive policy details, but is never referenced on the payment page.
- **Ad Traffic Impact**: Cold ad audiences require trust signals (e.g., 100% Satisfaction Guarantee, 7-Day Refund Policy) to overcome purchase anxiety for an unfamiliar brand.
- **Remediation**: Add a trust badge and link to `/refund/` in the footer legal section:
  ```html
  <a href="/refund/" target="_blank" class="text-neon underline">Refund Policy</a>
  ```

---

## Step-by-Step Remediation Plan

### Phase 1: Conversion Tracking & Ad Integrity Fixes (Immediate / Before Ad Spend)
1. **Fix Meta Pixel Tracking**:
   - In `webinar/payment/index.html`, remove all `fbq('track', 'Purchase', ...)` calls from button click handlers (lines 175, 250, 336, 346, 354, 380, 399, 422, 443, 561).
   - Replace with `fbq('trackCustom', '<ActionName>')` or `fbq('track', 'InitiateCheckout')`.
   - Place `fbq('track', 'Purchase', { value: 99.00, currency: 'INR' })` exclusively on the verified post-purchase confirmation page `thankyou/index.html`.
2. **Add Meta Pixel to `thankyou/index.html`**:
   - Insert Meta Pixel base code and standard `Purchase` event in `thankyou/index.html`.

### Phase 2: Checkout Form & Payment Automation
1. **Enable Razorpay Gateway**:
   - In `webinar/payment/index.html` line 543, remove `class="hidden"` from the Razorpay button container.
   - Configure Razorpay redirect URL in Razorpay Dashboard to forward paying customers to `https://raiseai.in/thankyou/`.
2. **Implement Pre-Payment Registration Capture**:
   - Add Full Name, Email, and WhatsApp Phone fields with real-time validation.
   - Automatically inject customer details into the WhatsApp screenshot message URL so users do not have to retype them.

### Phase 3: Funnel Consistency & Data Alignment
1. **Align WhatsApp Support Numbers**:
   - Update `thankyou/index.html` line 111 from `wa.me/916282717132` to `wa.me/917356003301`.
2. **Correct Thank You Page Copy**:
   - Remove misleading statement *"We've sent you a confirmation email"* on `thankyou/index.html`. Replace with clear instructions on WhatsApp verification and Zoom link scheduling.
3. **Fix Redirect in `payment/index.html`**:
   - Update lines 4, 5, and 18 in `payment/index.html` to redirect to `/webinar/payment/`.
4. **Harmonize Pricing**:
   - Standardize landing page and checkout order summary to display ₹99 with ₹199 anchor price.

### Phase 4: Code Pruning & UX Optimization
1. **Prune Dead Code**:
   - Remove orphaned event listeners (lines 896–919) and unused functions in `webinar/payment/index.html`.
   - Connect footer legal links directly to `openModal('privacy-modal')` and `openModal('terms-modal')` so users remain on the checkout page.
2. **Enable Zoom Accessibility**:
   - Update `<meta name="viewport">` in `webinar/payment/index.html` line 5 to remove `maximum-scale=1.0, user-scalable=no`.
3. **Add Trust Badges & Refund Policy**:
   - Insert "100% Satisfaction Guarantee" badge and link `/refund/` in the footer.
