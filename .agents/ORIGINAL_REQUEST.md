# Original User Request

## 2026-09-04T20:46:21Z

# Teamwork Project Prompt — Draft

> Status: Launched
> Goal: Craft prompt → get user approval → delegate to teamwork_preview
> Requested team: [none — teamwork routes from the description]

Conduct a comprehensive, read-only QA scan of the `webinar` and `payment` web pages to identify missing assets (specifically the two missing videos from the showcase), layout inconsistencies, and user-facing bugs before ad traffic starts. Deliver a full report and an actionable plan to fix all identified issues.

Working directory: c:\Users\hadhi\OneDrive\Desktop\Raise AI
Integrity mode: demo

## Requirements

### R1. Deep QA Scan
Thoroughly read and analyze the HTML, CSS, and JS logic of the web pages located in the `webinar` and `payment` directories. Identify any missing video files, broken paths, layout regressions on mobile/desktop, and general user-experience blockers.

### R2. Comprehensive Report & Remediation Plan
Output a detailed report listing every identified problem alongside the potential impact on ad traffic. Include a strict, step-by-step remediation plan (the "how-to") for fixing them. 

### R3. Read-Only Execution
Do NOT modify, edit, or delete any source code files during this execution. This is strictly a reporting and planning phase; execution will happen subsequently upon user approval.

## Acceptance Criteria

### Audit Completeness
- [ ] The report explicitly identifies the specific code locations and root causes for the two missing videos in the showcase section.
- [ ] The report includes distinct analysis sections for both the `webinar` pages and the `payment` pages.

### Actionability
- [ ] The remediation plan lists concrete, code-level changes required to fix every identified issue rather than vague suggestions.

### Codebase Safety
- [ ] No files in the `c:\Users\hadhi\OneDrive\Desktop\Raise AI` repository are modified by the team during this run.
