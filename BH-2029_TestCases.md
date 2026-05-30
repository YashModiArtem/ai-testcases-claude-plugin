# BH-2029: Financial Assistance - Sorting, Clubbing, Status Column, and Approval Enhancements

## Issue Details

| Field | Value |
|-------|-------|
| **Issue Key** | BH-2029 |
| **Summary** | On Financial Assistance Approval page Clubbed entries are not required. They should be changed to individual entries, sorted by request date and time |
| **Type** | Task |
| **Project** | BMC HMIS (BH) |
| **Version** | V-5.1.7 |
| **Status** | QA In Progress |
| **Priority** | High |
| **Labels** | Non-Bleeding_Requirements, P-2, PMG_V-5.1.5, PMG_V-5.1.7, Sprint_5th_May_2026, PROD |
| **Assignee** | Paresh Kanzariya |
| **Reporter** | Pooja Bargode |
| **QA End Date** | 2026-06-04 |
| **Module** | Billing OPD/IPD |

---

## Feature Overview

This task encompasses UI and workflow enhancements to the **Financial Assistance Verification** and **Financial Assistance Approval** pages. Key changes include:

1. **Sorting**: Entries sorted by latest Request Date & Time (descending), not Admission Date
2. **Doctor Priority**: Requests raised by doctors appear at the top of the list
3. **Status Column**: Frozen status column visible while scrolling + status-based filter
4. **Service-wise Grouping**: Clustered rows organized by service (not request) with checkboxes for selective approval
5. **Auto-populated Date**: Doctor-raised requests auto-populate request date in verification/approval pages
6. **Patient Removal**: Approved patients removed from active Financial Assistance list
7. **MSW Enhancements**: Multi-select option, verified date/time capture, AMO approval status display
8. **AMO Enhancements**: Checkbox column, multi-select, consolidated approval screen, approved entries filtered out

---

## Related Issues

- **BH-2028** (Discarded) — Status column in clubbed entries; related parent
- **BH-3902** (Discard) — Financial Assistance Verification and Approval page changes
- **BH-5746** — Drawer should open on list view data click
- **BH-5750** — Only 2 services verified but all 3 shown during approval
- **BH-5751** — UI: Next/Previous buttons per Figma design
- **BH-5753** — Blank status in existing patients
- **BH-5754** — UI: Vertical scrolling issue
- **BH-5755** — Extra numbers (1.2.3) in UI
- **BH-5759** — Patient not showing in Verification page after request sent
- **BH-5776** — Payment taken but still showing in verification screen
- **BH-5811** — After cancelling one service, both get cancelled
- **BH-5812** — Error on edit/update MSW reference
- **BH-5813** — Same service for MSW reference not showing in Verification
- **BH-6060** — Old service reappearing after verification with payment taken
- **BH-5688** (Subtask) — Backend: Clubbed to individual entries

---

## Test Cases

### TC-2029-01: Verify entries on Financial Assistance Verification page are sorted by Request Date & Time (descending)

**Module:** Financial Assistance - Sorting
**Priority:** P0 - Critical
**Pre-condition:** User is logged in as MSW; multiple Financial Assistance requests exist with varying request dates

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Login as MSW user | Login is successful |
| 2 | Navigate to Financial Assistance Verification → OPD List / IPD List | List page loads |
| 3 | Observe the order of entries in the list | Entries are displayed in descending order by Request Date & Time (latest first) |
| 4 | Verify entries with newer request dates appear above older ones | Sorting is correct: e.g., 26 May → 25 May → 23 May |

---

### TC-2029-02: Verify entries on Financial Assistance Approval page are sorted by Request Date & Time (descending)

**Module:** Financial Assistance - Sorting
**Priority:** P0 - Critical
**Pre-condition:** User is logged in as AMO/Dean; multiple Financial Assistance requests exist with varying request dates

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Login as AMO/Dean user | Login is successful |
| 2 | Navigate to Financial Assistance Approval page | List page loads |
| 3 | Observe the order of entries | Entries are displayed in descending order by Request Date & Time (latest first) |
| 4 | Verify sorting is not based on Admission Date | Sorting is based on Request Date & Time, not Admission Date |

---

### TC-2029-03: Verify doctor-raised requests appear at the top of the Financial Assistance list

**Module:** Financial Assistance - Doctor Priority Sorting
**Priority:** P0 - Critical
**Pre-condition:** Multiple requests exist — some raised by doctors, some by MSW/AD/DD roles

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Login as MSW | Login is successful |
| 2 | Navigate to Financial Assistance Verification list | List page loads |
| 3 | Observe entries — some raised by doctors, some by other roles | Doctor-raised requests appear at the very top of the list |
| 4 | Within doctor-raised requests, verify latest records appear first | Doctor requests sorted descending by request date/time |
| 5 | Verify non-doctor requests appear below doctor requests | Correct grouping: doctors first, then others |

---

### TC-2029-04: Verify Status column is frozen and always visible while scrolling

**Module:** Financial Assistance - UI/Frozen Column
**Priority:** P0 - Critical
**Pre-condition:** User is on Financial Assistance Verification or Approval page with enough records to require scrolling

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Navigate to Financial Assistance Verification page | Page loads with Status column visible |
| 2 | Scroll horizontally to the right | Status column remains frozen/visible at all times |
| 3 | Scroll vertically through multiple pages of records | Status column stays fixed — does not scroll out of view |
| 4 | Verify on Financial Assistance Approval page as well | Status column is also frozen on the Approval page |

---

### TC-2029-05: Verify Status-based filter is available on Financial Assistance Verification page

**Module:** Financial Assistance - Filter
**Priority:** P0 - Critical
**Pre-condition:** User is logged in as MSW; requests exist with different statuses (e.g., Requested, Verified, Approved)

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Navigate to Financial Assistance Verification page | List page loads |
| 2 | Locate and click the Status filter dropdown | Filter options are visible (e.g., All, Requested, Verified) |
| 3 | Select "Requested" status | Only requests with "Requested" status are displayed |
| 4 | Select "Verified" status | Only requests with "Verified" status are displayed |
| 5 | Select "All" to reset filter | All entries are displayed again |
| 6 | Verify default view shows only relevant entries for MSW role | By default, only "Requested" entries are visible for MSW |

---

### TC-2029-06: Verify Status-based filter on Financial Assistance Approval page

**Module:** Financial Assistance - Filter
**Priority:** P0 - Critical
**Pre-condition:** User is logged in as AMO; requests exist with Verified and Approved statuses

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Navigate to Financial Assistance Approval page | List page loads |
| 2 | Locate the Status filter dropdown | Filter options visible (e.g., All, Verified, Approved) |
| 3 | Select "Verified" status | Only verified entries are displayed |
| 4 | Select "Approved" status | Only approved entries are displayed |
| 5 | Verify default view shows only "Verified" entries | AMO default view filters to Verified entries only |

---

### TC-2029-07: Verify clustered row entries are service-wise and not request-wise

**Module:** Financial Assistance - Data Grouping
**Priority:** P0 - Critical
**Pre-condition:** A patient has multiple services under one request

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Create a Financial Assistance request with multiple services for a patient | Request is created with multiple services |
| 2 | Navigate to Financial Assistance Verification or Approval page | List page loads |
| 3 | Expand/view the clustered entry | Services are displayed as separate service-wise entries, not grouped by request |
| 4 | Verify each service appears as an individual entry | Service-level granularity is visible |

---

### TC-2029-08: Verify selection checkbox is available within clustered/service-wise entries

**Module:** Financial Assistance - Checkbox Selection
**Priority:** P0 - Critical
**Pre-condition:** A patient has multiple services under Financial Assistance request

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Navigate to Financial Assistance Verification or Approval page | List page loads |
| 2 | View clustered/service-wise entries | Each service within the entry has a selectable checkbox |
| 3 | Select the checkbox for one specific service | Checkbox is checked for that service only |
| 4 | Select checkboxes for multiple services | Multiple checkboxes can be selected simultaneously |
| 5 | Deselect a checkbox | Checkbox is unchecked, selection is removed |

---

### TC-2029-09: Verify drawer opens with selected services only for approval/verification action

**Module:** Financial Assistance - Selective Approval
**Priority:** P0 - Critical
**Pre-condition:** A patient has multiple services; user selects only specific services via checkbox

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Select specific services using checkboxes (e.g., 2 out of 4) | Selected services are checked |
| 2 | Click Approve/Verify button | A consolidated drawer/screen opens |
| 3 | Verify the drawer shows only the selected services | Only the 2 checked services appear in the drawer |
| 4 | Verify unselected services are not shown | Other services are not visible in the drawer |
| 5 | Enter amount and complete approval | Approval is processed for selected services only |

---

### TC-2029-10: Verify doctor's raised request auto-populates request date in Financial Assistance Verification page

**Module:** Financial Assistance - Auto Date Population
**Priority:** P0 - Critical
**Pre-condition:** A doctor has raised a Financial Assistance request for MSW

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Login as Doctor | Login is successful |
| 2 | Navigate to Financial Assistance / Requests page | Requests page loads |
| 3 | Raise a request for MSW with specific request details | Request is submitted successfully |
| 4 | Note the request date and time | Date/time is recorded |
| 5 | Login as MSW | Login is successful |
| 6 | Navigate to Financial Assistance Verification page | Verification page loads |
| 7 | Open the request raised by the doctor | Request details are displayed |
| 8 | Verify Request Date / Admission Date field | Request date is auto-populated with the date/time doctor raised the request |
| 9 | Verify date matches the doctor's request date | No manual entry is required |

---

### TC-2029-11: Verify doctor's raised request auto-populates request date in Financial Assistance Approval page

**Module:** Financial Assistance - Auto Date Population
**Priority:** P0 - Critical
**Pre-condition:** A doctor has raised a Financial Assistance request for MSW (verified by MSW)

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Complete the flow: Doctor raises request → MSW verifies | Request is verified by MSW |
| 2 | Login as AMO/Dean | Login is successful |
| 3 | Navigate to Financial Assistance Approval page | Approval page loads |
| 4 | Open the request raised by the doctor | Request details are displayed |
| 5 | Verify Request Date field | Request date is auto-populated with the doctor's request date |
| 6 | Verify no manual date entry is required | Date is pre-filled correctly |

---

### TC-2029-12: Verify approved patient is removed from active Financial Assistance list

**Module:** Financial Assistance - Post-Approval Behavior
**Priority:** P0 - Critical
**Pre-condition:** A patient request has been approved by AMO/Dean

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Login as MSW/AD/DD | Login is successful |
| 2 | Navigate to Financial Assistance list | List page loads |
| 3 | Select a patient request and approve it | Request is approved |
| 4 | Return to the active Financial Assistance list | List page refreshes |
| 5 | Search for the approved patient | Approved patient does NOT appear in the active list |
| 6 | If "Approved" status filter exists, verify patient appears there | Approved patient is visible only when "Approved" filter is selected |

---

### TC-2029-13: Verify MSW can select multiple entries using multiselect option

**Module:** Financial Assistance - MSW Multi-Select
**Priority:** P0 - Critical
**Pre-condition:** User is logged in as MSW; multiple requests exist in "Requested" status

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Navigate to Financial Assistance Verification page | List page loads |
| 2 | Verify multiselect option is available | Checkbox column or select-all option is visible |
| 3 | Select multiple entries using checkboxes | Multiple entries are selected simultaneously |
| 4 | Perform Verify action on selected entries | Verification is processed for all selected entries |

---

### TC-2029-14: Verify verified date and time is captured and displayed in MSW screen

**Module:** Financial Assistance - MSW Verified Date/Time
**Priority:** P0 - Critical
**Pre-condition:** MSW user has verified a Financial Assistance request

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | MSW verifies a Financial Assistance request | Verification is successful |
| 2 | In the MSW list view, verify the verified date/time is displayed beside Request Date & Time | Verified date & time is shown in the list |
| 3 | Verify verified date/time is stored correctly | Verified timestamp is persisted in the database |
| 4 | Navigate to the request detail | Verified date/time matches the earlier entry |

---

### TC-2029-15: Verify MSW screen shows status change to "Approved" after AMO approval

**Module:** Financial Assistance - MSW-AMO Status Sync
**Priority:** P0 - Critical
**Pre-condition:** MSW has verified a request; AMO subsequently approves it

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | MSW verifies a request | Status changes to "Verified" |
| 2 | AMO approves the same request | Status changes to "Approved" |
| 3 | Login as MSW | Login is successful |
| 4 | Navigate to Financial Assistance Verification list | List page loads |
| 5 | Locate the previously verified request | Status is updated to "Approved" |
| 6 | Verify only MSW Verified Date & Time is displayed — AMO's approval date is NOT shown in MSW screen | MSW only sees their own verified timestamp; AMO approval timestamp is hidden from MSW view |

---

### TC-2029-16: Verify AMO can select multiple entries using checkbox column

**Module:** Financial Assistance - AMO Multi-Select
**Priority:** P0 - Critical
**Pre-condition:** User is logged in as AMO; multiple verified entries exist

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Navigate to Financial Assistance Approval page | List page loads |
| 2 | Verify a checkbox column is present | Checkbox column is visible in the list |
| 3 | Select multiple entries using checkboxes | Multiple entries are selected |
| 4 | Click Approve button | Consolidated approval screen opens |
| 5 | Verify selected services are shown together | All selected services appear in one consolidated screen |

---

### TC-2029-17: Verify approved entries are removed from default list and appear only in "Approved" filter

**Module:** Financial Assistance - AMO Post-Approval
**Priority:** P0 - Critical
**Pre-condition:** AMO has approved one or more entries

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Login as AMO | Login is successful |
| 2 | Navigate to Financial Assistance Approval page (default filter: Verified) | Only non-approved entries are visible |
| 3 | Select and approve specific entries | Approval is successful |
| 4 | Verify approved entries disappear from the default list | Approved entries are no longer visible |
| 5 | Change filter to "Approved" | Approved entries appear in the filtered list |

---

### TC-2029-18: Verify Service Name is displayed against each Request Number in AMO list

**Module:** Financial Assistance - AMO Service Display
**Priority:** P1 - High
**Pre-condition:** AMO user is on the Approval page with expanded entries

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Navigate to Financial Assistance Approval page as AMO | List page loads |
| 2 | Expand a request entry | Expanded view shows services |
| 3 | Verify Service Name is displayed alongside Request Number | Each service has its name clearly associated with the request number |
| 4 | Verify no ambiguity about which service belongs to which request | Service-request mapping is clear and unambiguous |

---

### TC-2029-19: Verify approved date and time is displayed beside request date/time in AMO list

**Module:** Financial Assistance - AMO Approval Date/Time
**Priority:** P1 - High
**Pre-condition:** AMO has approved a request

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | AMO approves a request | Approval is successful |
| 2 | In the AMO list, view the approved entry | Approved date & time is displayed beside the Request Date & Time |
| 3 | Verify the format is consistent | Date and time are displayed in readable format |
| 4 | Verify the timestamp is accurate | Approved time matches the actual approval time |

---

### TC-2029-20: Verify drawer reflects only services corresponding to selected status filter

**Module:** Financial Assistance - Drawer Status Filter
**Priority:** P1 - High
**Pre-condition:** User has filtered by a specific status and selected entries

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Apply a status filter (e.g., "Verified") on Approval page | Only verified entries are shown |
| 2 | Select entries using checkbox | Entries are selected |
| 3 | Open the drawer | Drawer shows only services corresponding to the filtered status |
| 4 | Change status filter and repeat | Drawer content updates to match the new filter |

---

### TC-2029-21: Verify all Financial Assistance pages work correctly for each user role

**Module:** Financial Assistance - Role-Based Access
**Priority:** P0 - Critical
**Pre-condition:** User accounts exist for each role: MSW, AMO, CMO, Assistant Dean, Dy. Dean, Dean

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Login as each role one by one | Each role logs in successfully |
| 2 | Navigate to Financial Assistance pages | Pages load correctly for each role |
| 3 | Verify Status column, sorting, filtering work per role | Features behave as expected for the role's scope |
| 4 | Verify drawer and approval flow works for each role | Appropriate actions are available |

---

### TC-2029-22: Verify drawer opens when clicking on list view data (not just expand icon)

**Module:** Financial Assistance - UI Interaction (BH-5746 Regression)
**Priority:** P1 - High
**Pre-condition:** User is on Financial Assistance list view

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Navigate to Financial Assistance Verification or Approval list | List is displayed |
| 2 | Click directly on a data row (not just expand icon) | Drawer opens for that entry |
| 3 | Verify the drawer shows the correct entry details | Correct request/patient data is displayed |

---

### TC-2029-23: Verify only selected/verified services are shown during approval — not all services (BH-5750 Regression)

**Module:** Financial Assistance - Selective Service Display (BH-5750 Regression)
**Priority:** P0 - Critical
**Pre-condition:** A patient has multiple services; MSW has verified only specific services

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Create a request with 3 services (e.g., Service A, B, C) | Request created |
| 2 | MSW verifies only 2 services (A and B) | Services A and B are verified |
| 3 | Login as AMO | Login is successful |
| 4 | Navigate to Approval page and open the request | Only verified services (A and B) are shown |
| 5 | Verify Service C (unverified) is NOT shown | Only the 2 verified services appear |

---

### TC-2029-24: Verify no extra numbering (1.2.3) appears in the UI (BH-5755 Regression)

**Module:** Financial Assistance - UI Cleanliness (BH-5755 Regression)
**Priority:** P1 - High
**Pre-condition:** User is on Financial Assistance pages

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Navigate to Financial Assistance Verification or Approval page | Page loads |
| 2 | Scroll through the entire list | No extra numbering like "1. 2. 3." is visible in the UI |
| 3 | Expand clustered entries | No duplicate numbering within expanded content |

---

### TC-2029-25: Verify no blank status appears in existing patients list (BH-5753 Regression)

**Module:** Financial Assistance - Status Display (BH-5753 Regression)
**Priority:** P1 - High
**Pre-condition:** Existing patients with Financial Assistance requests exist

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Navigate to Financial Assistance list with existing patients | List loads |
| 2 | Verify no entry has a blank/empty status | All entries show a valid status value |
| 3 | Check each status column cell | Status values are readable and correct |

---

### TC-2029-26: Verify patient removed from Verification page after request sent from Order Dis/Con page (BH-5759 Regression)

**Module:** Financial Assistance - Patient Visibility (BH-5759 Regression)
**Priority:** P1 - High
**Pre-condition:** A request was sent from the Order Dis/Con Request page

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Send a request from Order Dis/Con Request page | Request is submitted |
| 2 | Navigate to Financial Assistance Verification page | Verification page loads |
| 3 | Verify the patient appears in the list | Patient/request is visible |
| 4 | Verify no duplicate or missing entries | Data integrity is maintained |

---

### TC-2029-27: Verify payment taken for service does not still show in verification screen (BH-5776 Regression)

**Module:** Financial Assistance - Payment Status (BH-5776 Regression)
**Priority:** P1 - High
**Pre-condition:** Payment has been taken for a service

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Take payment for a service | Payment is processed |
| 2 | Navigate to Financial Assistance Verification page | Page loads |
| 3 | Verify the service with payment taken is handled correctly | Service with payment taken is not incorrectly shown as unpaid |
| 4 | Verify correct payment status is reflected | Payment status is accurate and up-to-date |

---

### TC-2029-28: Verify cancelling one service does not cancel all services (BH-5811 Regression)

**Module:** Financial Assistance - Selective Cancellation (BH-5811 Regression)
**Priority:** P0 - Critical
**Pre-condition:** A patient has multiple services in a Financial Assistance request

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Create a request with multiple services (e.g., 2 services) | Request created |
| 2 | Initiate cancellation for only one service | Cancellation dialog/action is for one service |
| 3 | Confirm cancellation | Only the selected service is cancelled |
| 4 | Verify the other service remains active | Second service is NOT cancelled and remains in the list |

---

### TC-2029-29: Verify no error when editing and updating MSW reference (BH-5812 Regression)

**Module:** Financial Assistance - MSW Reference Update (BH-5812 Regression)
**Priority:** P1 - High
**Pre-condition:** A Financial Assistance request with MSW reference exists

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Navigate to a Financial Assistance request | Request is displayed |
| 2 | Edit the MSW reference | MSW reference field is editable |
| 3 | Update the MSW reference | Update is saved without error |
| 4 | Verify the change is persisted | New MSW reference is shown in the record |

---

### TC-2029-30: Verify same service for MSW reference appears in Verification page (BH-5813 Regression)

**Module:** Financial Assistance - MSW Reference Visibility (BH-5813 Regression)
**Priority:** P1 - High
**Pre-condition:** Same service is raised twice for MSW reference

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Raise the same service twice for MSW reference | Both requests are created |
| 2 | Navigate to Financial Assistance Verification page | Both requests are visible |
| 3 | Verify both service entries appear | No missing entries; same service appears twice as separate requests |

---

### TC-2029-31: Verify old service does not reappear after verification with payment taken (BH-6060 Regression)

**Module:** Financial Assistance - Service Reappearance (BH-6060 Regression)
**Priority:** P1 - High
**Pre-condition:** A service was verified and payment was taken

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Verify a service and take payment | Service is verified and payment is recorded |
| 2 | Perform any follow-up action on the verification page | Action completes |
| 3 | Check the service list again | Previously verified and paid service does NOT reappear |
| 4 | Verify the payment status is correctly maintained | Payment status remains verified/paid |

---

### TC-2029-32: Verify socio-economic details auto-fetch for all services except the first (per team discussion)

**Module:** Financial Assistance - Socio-Economic Auto Fetch
**Priority:** P1 - High
**Pre-condition:** User is filling Financial Assistance request with multiple services

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Start filling Financial Assistance request for multiple services | Form is displayed |
| 2 | Fill socio-economic details for the first service | Details are entered for service 1 |
| 3 | Add second service to the request | Second service is added |
| 4 | Verify socio-economic details are auto-fetched for second service | Details are populated automatically |
| 5 | Add third service | Details auto-fetched for service 3 as well |
| 6 | Verify all services after the first have auto-fetched data | Manual entry not required for subsequent services |

---

### TC-2029-33: Verify drawer width/layout accommodates the new Status column design

**Module:** Financial Assistance - UI Layout
**Priority:** P2 - Medium
**Pre-condition:** Financial Assistance page is in its updated state

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Navigate to Financial Assistance Verification or Approval page | Page loads |
| 2 | Observe the column spacing | Columns are evenly spaced — no excessive gaps between columns |
| 3 | Verify the Status column is next to the Request Type column | Correct column adjacency as per design |
| 4 | Open the drawer | Drawer layout is consistent with the new column design |

---

### TC-2029-34: Verify Figma design compliance for Financial Assistance pages

**Module:** Financial Assistance - Figma Compliance
**Priority:** P2 - Medium
**Pre-condition:** Figma design is accessible at provided node IDs

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Open Figma design: https://www.figma.com/design/TFu7Es4Dcz5p7EVMltHpEq/IPD?node-id=59133-72765 | Design is displayed |
| 2 | Compare the Verification page with Figma | All elements match the design |
| 3 | Open second Figma link: https://www.figma.com/design/TFu7Es4Dcz5p7EVMltHpEq/IPD?node-id=58972-174448 | Design is displayed |
| 4 | Compare the Approval page with Figma | All elements match the design |
| 5 | Verify Status column position, frozen behavior, spacing | Design specifications are met |

---

### TC-2029-35: Verify performance with large dataset on Financial Assistance list

**Module:** Financial Assistance - Performance
**Priority:** P2 - Medium
**Pre-condition:** 100+ Financial Assistance entries exist in the system

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Navigate to Financial Assistance Verification page | Page loads within acceptable time (<3 seconds) |
| 2 | Apply status filter | Filter is applied quickly (<2 seconds) |
| 3 | Sort by Request Date | Sorting completes quickly |
| 4 | Expand a clustered entry | Expansion is responsive |
| 5 | Select multiple entries | Checkbox selection is smooth |

---

### TC-2029-36: Verify accessibility — keyboard navigation through Financial Assistance list

**Module:** Financial Assistance - Accessibility
**Priority:** P2 - Medium
**Pre-condition:** User is on Financial Assistance Verification or Approval page

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Navigate to Financial Assistance page | Page is focused |
| 2 | Press Tab to move through entries | Focus moves through list entries logically |
| 3 | Navigate to checkbox column | Checkboxes are keyboard-accessible |
| 4 | Press Enter to select/deselect | Selection toggles correctly |
| 5 | Navigate to status filter | Filter dropdown is keyboard-operable |
| 6 | Verify focus indicators are visible | Focus ring is clearly visible |

---

### TC-2029-37: Verify mobile/tablet responsiveness on Financial Assistance pages

**Module:** Financial Assistance - Responsive UI
**Priority:** P2 - Medium
**Pre-condition:** User is accessing the application on mobile or tablet viewport

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Resize browser to tablet viewport (768px) | Viewport adjusts |
| 2 | Navigate to Financial Assistance Verification page | Page renders correctly |
| 3 | Verify Status column and sorting controls are accessible | Key features are usable |
| 4 | Resize to mobile viewport (375px) | Viewport adjusts |
| 5 | Verify horizontal scrolling works for columns | Table scrolls horizontally without breaking layout |

---

### TC-2029-38: Verify session timeout handling during approval workflow

**Module:** Financial Assistance - Error Handling
**Priority:** P2 - Medium
**Pre-condition:** User is in the middle of an approval action; session expires

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Open the approval drawer with selected services | Drawer is open with data |
| 2 | Simulate session timeout | System detects session expiry |
| 3 | Attempt to submit the approval | System redirects to login or shows session expired message |
| 4 | Log in again | Login is successful |
| 5 | Verify no duplicate approval was processed | Data integrity is maintained |

---

### TC-2029-39: Verify network error handling during approval submission

**Module:** Financial Assistance - Error Handling
**Priority:** P2 - Medium
**Pre-condition:** User is submitting an approval; network failure is simulated

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Select services and open the approval drawer | Drawer is open |
| 2 | Simulate network failure | Network is interrupted |
| 3 | Attempt to submit approval | System shows appropriate error message |
| 4 | Verify form data is retained | Selected services and data remain in the drawer |
| 5 | Restore network and submit | Approval is processed successfully on retry |

---

### TC-2029-40: Verify no regression on existing Financial Assistance request creation flow

**Module:** Financial Assistance - Regression
**Priority:** P0 - Critical
**Pre-condition:** Existing Financial Assistance request creation functionality

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Login as Doctor and create a new Financial Assistance request | Request creation flow works as before |
| 2 | Submit the request | Request is submitted successfully |
| 3 | Login as MSW and verify the request | Request appears in the Verification list |
| 4 | Login as AMO and approve the request | Approval flow works as expected |
| 5 | Verify all existing features (non-BH-2029) function correctly | No regression in existing functionality |

---

## Summary

| Priority | Count |
|----------|-------|
| P0 - Critical | 19 |
| P1 - High | 14 |
| P2 - Medium | 7 |
| **Total** | **40** |

---

## Test Data Requirements

1. **User accounts**: Doctor, MSW, AMO, CMO, Assistant Dean, Dy. Dean, Dean — each with valid credentials and appropriate role permissions
2. **Patient with multiple services**: A single patient linked to 3-4 different services for clubbing/multi-select testing
3. **Varying request dates**: Multiple requests created at different dates/times to test sorting
4. **Doctor-raised requests**: Requests created by doctor role for priority sorting tests
5. **Mix of statuses**: Requests in Requested, Verified, and Approved states
6. **Existing patients**: Patients already in the system with Financial Assistance history
7. **Verified-but-unapproved entries**: Requests verified by MSW but pending AMO approval
8. **Cancelled services scenarios**: Multi-service requests to test selective cancellation
9. **Network testing tool**: For simulating network failures and timeouts
10. **Session management tool**: For simulating session expiry mid-workflow

---

## Acceptance Criteria Mapping

| AC | Description | Test Cases |
|----|-------------|------------|
| AC-1 | Entries sorted by Request Date & Time (descending) | TC-2029-01, TC-2029-02 |
| AC-2 | Doctor-raised requests at top, latest first | TC-2029-03 |
| AC-3 | Status column frozen and always visible | TC-2029-04 |
| AC-4 | Status-based filter on Verification and Approval pages | TC-2029-05, TC-2029-06 |
| AC-5 | Service-wise grouping with checkboxes | TC-2029-07, TC-2029-08 |
| AC-6 | Drawer opens with selected services only | TC-2029-09 |
| AC-7 | Doctor's request date auto-populates in Verification/Approval pages | TC-2029-10, TC-2029-11 |
| AC-8 | Approved patients removed from active list | TC-2029-12 |
| AC-9 | MSW multiselect and verified date capture | TC-2029-13, TC-2029-14 |
| AC-10 | MSW shows AMO approval status but not AMO approval time | TC-2029-15 |
| AC-11 | AMO checkbox column and consolidated approval | TC-2029-16 |
| AC-12 | Approved entries filtered from default list | TC-2029-17 |
| AC-13 | Service name against request number in AMO list | TC-2029-18 |
| AC-14 | AMO approval date/time displayed | TC-2029-19 |
| AC-15 | Drawer reflects selected status filter | TC-2029-20 |
| AC-16 | Role-based access for all applicable users | TC-2029-21 |
| AC-17 | Drawer opens on row click (not just expand icon) | TC-2029-22 (BH-5746) |
| AC-18 | Only verified services shown during approval | TC-2029-23 (BH-5750) |
| AC-19 | No extra numbering in UI | TC-2029-24 (BH-5755) |
| AC-20 | No blank status in existing patients | TC-2029-25 (BH-5753) |
| AC-21 | Patient visibility in Verification after request | TC-2029-26 (BH-5759) |
| AC-22 | Payment status accurate in Verification | TC-2029-27 (BH-5776) |
| AC-23 | Selective cancellation of services | TC-2029-28 (BH-5811) |
| AC-24 | MSW reference edit/update works | TC-2029-29 (BH-5812) |
| AC-25 | Same service appears in Verification | TC-2029-30 (BH-5813) |
| AC-26 | Old service doesn't reappear after verification | TC-2029-31 (BH-6060) |
| AC-27 | Socio-economic auto-fetch | TC-2029-32 |
| AC-28 | UI layout and spacing compliance | TC-2029-33, TC-2029-34 |
| AC-29 | Performance with large dataset | TC-2029-35 |
| AC-30 | Accessibility — keyboard navigation | TC-2029-36 |
| AC-31 | Responsive UI | TC-2029-37 |
| AC-32 | Error handling (timeout, network) | TC-2029-38, TC-2029-39 |
| AC-33 | No regression on existing flows | TC-2029-40 |

---

## Flagged Questions / Ambiguities

1. **Request Date vs. Latest Service Date**: Yash Modi asked on 2026-05-19 whether to display the date/time from the initial request or from the latest requested service — clarification pending from Paresh Kanzariya and Mathew Abraham. **Assumption:** Display the date/time of the latest requested service (most recent activity).
2. **Socio-economic auto-fetch scope**: Confirm whether socio-economic details auto-fetch for ALL services after the first, or only specific service types.
3. **Figma design node IDs**: Two Figma links were provided — verify which node IDs correspond to which page (Verification vs. Approval) for accurate UI comparison.
4. **Drawer behavior on mobile**: Clarify whether drawer opens as a modal or side panel on smaller viewports.
5. **Undo/rollback for approval**: Can an approved entry be reversed? What is the rollback workflow?
