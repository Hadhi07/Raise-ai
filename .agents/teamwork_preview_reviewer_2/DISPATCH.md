# Task Assignment: QA Reviewer 2

## Objective
Independently stress-test and review the comprehensive QA scan report and remediation plan located at:
`c:\Users\hadhi\OneDrive\Desktop\Raise AI\.agents\teamwork_preview_orchestrator_1\qa_report_and_remediation_plan.md`

## Evaluation Criteria
1. Accuracy and depth of root-cause analysis for showcase videos 4 and 6 (HTTP 404, Unicode ellipsis vs dot).
2. Coverage of conversion blockers across webinar and payment pages (tracking, layout, forms, gateways).
3. Precision of code-level remediation snippets (syntax validity, edge cases, copy consistency).
4. Codebase safety: verify that 0 files in `c:\Users\hadhi\OneDrive\Desktop\Raise AI` outside `.agents/` were modified.

## Constraints
- READ-ONLY. Do not modify any source code files.
- Deliver verdict (`APPROVE` or `REQUEST_CHANGES`) in `handoff.md`.

## 2026-09-04T20:55:29Z
You are Reviewer 2.
Your working directory is: c:\Users\hadhi\OneDrive\Desktop\Raise AI\.agents\teamwork_preview_reviewer_2
The workspace directory is: c:\Users\hadhi\OneDrive\Desktop\Raise AI
The original user request is recorded in: c:\Users\hadhi\OneDrive\Desktop\Raise AI\.agents\ORIGINAL_REQUEST.md (MANDATORY: You MUST read this file first before starting work).
Also read your dispatch instructions at: c:\Users\hadhi\OneDrive\Desktop\Raise AI\.agents\teamwork_preview_reviewer_2\DISPATCH.md.

Mission:
Independently stress-test and review the deliverable report located at:
`c:\Users\hadhi\OneDrive\Desktop\Raise AI\.agents\teamwork_preview_orchestrator_1\qa_report_and_remediation_plan.md`

Verify all acceptance criteria from ORIGINAL_REQUEST.md:
1. Root cause accuracy: Verify if the Unicode horizontal ellipsis vs ASCII dot explanation for videos 4 & 6 and the syntax error at line 748 are accurate against the codebase.
2. Distinct analysis sections: Verify thoroughness for both `webinar` and `payment` pages.
3. Remediation actionability: Verify if the proposed code diffs/snippets are syntactically sound and directly implementable.
4. Codebase safety: Confirm that 0 files outside `.agents/` were modified.

HARD CONSTRAINTS:
- READ-ONLY: Do NOT modify, edit, or delete ANY source files in `c:\Users\hadhi\OneDrive\Desktop\Raise AI`. Only write your own metadata files inside your working directory `c:\Users\hadhi\OneDrive\Desktop\Raise AI\.agents\teamwork_preview_reviewer_2`.
- Write your evaluation and verdict (APPROVE or REQUEST_CHANGES) in `handoff.md` in your working directory.
- When finished, send a message to parent with your verdict and handoff file path.
