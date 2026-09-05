# Task Assignment: Payment QA Explorer

## Objective
Conduct a comprehensive, read-only QA scan of all files in `c:\Users\hadhi\OneDrive\Desktop\Raise AI\payment`.

## Focus Areas
1. Payment & Checkout Flow: Gateways, forms, scripts, redirects, validation.
2. Pricing & Value Proposition: Price amounts, currency display, discounts, fee transparency.
3. Layout & Responsiveness: Mobile and desktop layouts, form field spacing, CTA button visibility.
4. Ad Traffic Conversion Blockers: Form drop-off risks, security indicators, error handling.

## Constraints
- READ-ONLY. Absolutely do not modify or delete any source files.
- Deliver results in `.agents/teamwork_preview_explorer_payment_1/analysis.md` and `handoff.md`.

## 2026-09-04T20:47:35Z
You are Explorer 2 (Payment QA Explorer).
Your working directory is: c:\Users\hadhi\OneDrive\Desktop\Raise AI\.agents\teamwork_preview_explorer_payment_1
The workspace directory is: c:\Users\hadhi\OneDrive\Desktop\Raise AI
The original user request is recorded in: c:\Users\hadhi\OneDrive\Desktop\Raise AI\.agents\ORIGINAL_REQUEST.md (MANDATORY: You MUST read this file first before starting work).
Also read your dispatch instructions at: c:\Users\hadhi\OneDrive\Desktop\Raise AI\.agents\teamwork_preview_explorer_payment_1\DISPATCH.md.

Mission:
Conduct a comprehensive, read-only QA scan of all files in `c:\Users\hadhi\OneDrive\Desktop\Raise AI\payment`.
Thoroughly read and analyze the HTML, CSS, and JS logic.
Specifically:
1. Analyze checkout & payment flow, payment gateway integration (Razorpay, Stripe, UPI, card, or custom checkout scripts), webhook/callback handling, order creation, success/failure redirects.
2. Analyze form validation (phone numbers, email regex, required fields, error messages, submit button states, loading spinners).
3. Check pricing & fee transparency, coupon/promo code logic, currency display, guarantees, trust badges.
4. Check layout consistency and mobile/desktop responsiveness (input sizing, keyboard overlap, CTA stickiness, responsive breakpoints).
5. Identify all conversion blockers and security/trust issues that could cause ad traffic to bounce.
6. For every issue found, note the file path, line number, root cause, ad traffic impact, and concrete code-level fix recommendations.

HARD CONSTRAINTS:
- READ-ONLY: Do NOT modify, edit, or delete ANY source files in `c:\Users\hadhi\OneDrive\Desktop\Raise AI`. Only write your own metadata files inside your working directory `c:\Users\hadhi\OneDrive\Desktop\Raise AI\.agents\teamwork_preview_explorer_payment_1`.
- Write your detailed findings to `analysis.md` and deliver a complete, self-contained `handoff.md` in your working directory.
- When finished, send a message to parent with the file path to your handoff report.

