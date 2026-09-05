# Task Assignment: Asset & Funnel Auditor

## Objective
Audit all asset references (videos, images, icons, fonts) across `webinar` and `payment` against actual disk files in `c:\Users\hadhi\OneDrive\Desktop\Raise AI`.

## Focus Areas
1. Missing Showcase Videos: Investigate all media directories, git history, or surrounding files to find where the showcase videos are or should be, their filenames, paths, and formats.
2. Complete Asset Matrix: Check every `<img>`, `<video>`, `<source>`, CSS `url(...)`, favicon, etc. Verify whether each file exists on disk.
3. Funnel Continuity: Audit the link/flow from webinar landing page to payment page. Check URL parameters, UTM tracking, discount pass-through.

## Constraints
- READ-ONLY. Absolutely do not modify or delete any source files.
- Deliver results in `.agents/teamwork_preview_explorer_assets_1/analysis.md` and `handoff.md`.

## 2026-09-04T20:47:27Z
You are Explorer 3 (Asset & Funnel Auditor).
Your working directory is: c:\Users\hadhi\OneDrive\Desktop\Raise AI\.agents\teamwork_preview_explorer_assets_1
The workspace directory is: c:\Users\hadhi\OneDrive\Desktop\Raise AI
The original user request is recorded in: c:\Users\hadhi\OneDrive\Desktop\Raise AI\.agents\ORIGINAL_REQUEST.md (MANDATORY: You MUST read this file first before starting work).
Also read your dispatch instructions at: c:\Users\hadhi\OneDrive\Desktop\Raise AI\.agents\teamwork_preview_explorer_assets_1\DISPATCH.md.

Mission:
Perform a comprehensive, read-only audit of all media assets and cross-page funnel continuity across `c:\Users\hadhi\OneDrive\Desktop\Raise AI`.
Specifically:
1. Perform a complete inventory of actual media files on disk (mp4, webm, jpg, png, svg, webp) across the entire project (including root, assets, videos, webinar, payment, public, etc.).
2. Cross-reference every media reference (`src`, `href`, `url(...)`) in both `webinar` and `payment` pages against the actual filesystem to identify 404s, case sensitivity mismatches, broken paths, or missing extensions.
3. Deep investigation on the Showcase Videos: Why are two videos missing from the showcase section? What were the intended filenames or video sources? Check git log/status (read-only) or neighboring files to determine where the video assets reside or what filenames should be used.
4. Funnel flow check: Check links connecting `webinar` -> `payment` pages. Are URLs correct, relative vs absolute paths working, query parameters/UTMs preserved?
5. For every asset or funnel issue found, list exact code location, file path, line number, root cause, ad traffic impact, and concrete code-level fix recommendations.

HARD CONSTRAINTS:
- READ-ONLY: Do NOT modify, edit, or delete ANY source files in `c:\Users\hadhi\OneDrive\Desktop\Raise AI`. Only write your own metadata files inside your working directory `c:\Users\hadhi\OneDrive\Desktop\Raise AI\.agents\teamwork_preview_explorer_assets_1`.
- Write your detailed findings to `analysis.md` and deliver a complete, self-contained `handoff.md` in your working directory.
- When finished, send a message to parent with the file path to your handoff report.

## 2026-09-04T20:54:08Z
**Context**: Asset & Funnel Audit
**Content**: Checking in on your progress regarding the media inventory, asset cross-reference, and funnel audit. Explorer 1 and Explorer 2 have completed their respective analyses.
**Action**: Please report your current findings and progress toward completing analysis.md and handoff.md.


