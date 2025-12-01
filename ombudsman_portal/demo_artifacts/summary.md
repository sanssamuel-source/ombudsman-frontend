# Ombudsman Portal - Demo Summary

This document outlines the demonstration flow for the Ombudsman Digital Complaint Portal MVP.

> **Note**: Due to environment limitations (missing Python/Node runtimes) and API quotas (Image Generation exhausted), this demo is simulated.

## 1. Complaint Submission
**Action**: A citizen submits a complaint via the API (simulated via `curl`).
**Input**:
- Ministry: Health
- Official: Dr. Smith
- Details: "Example complaint for hackathon demo"
- Phone: +111111111

**Result**:
- Backend returns a JSON object with a unique `reference_id` (e.g., `A1B2C3D4`).
- Status is initialized to `submitted`.
- *See `test_simulation.md` for full details.*

## 2. Complaint Tracking
**Action**: The citizen visits the Tracking Page and enters Reference ID `A1B2C3D4`.
**Result**:
- The system retrieves the complaint.
- Displays status: **Submitted** (Blue Badge).
- Shows details: "Example complaint for hackathon demo".

## 3. Admin Management
**Action**:
1. Admin logs in with token `secret-admin-token`.
2. Admin views the Dashboard.
3. Admin changes status of `A1B2C3D4` from `submitted` -> `in_review` -> `resolved`.

**Result**:
- **Audit Log**: The system records the status change with timestamp and actor ("admin").
- **SMS Mock**: The backend prints a log message:
  `[SMS MOCK] To: +111111111 | Msg: Your complaint A1B2C3D4 status is now resolved`
- **Analytics**: The dashboard charts update to reflect 1 Resolved case.

## 4. Artifacts Included
- `test_simulation.md`: Detailed analysis of the API submission.
- `tracking_page_placeholder.txt`: Description of the tracking UI state.
- `admin_dashboard_placeholder.txt`: Description of the admin dashboard state after updates.
