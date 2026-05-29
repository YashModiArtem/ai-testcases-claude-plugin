# BH-5330: Enable Patient Opening and Clinical Workflow Access from OT List

## Issue Details

| Field | Value |
|-------|-------|
| **Issue Key** | BH-5330 |
| **Summary** | Enable Patient Opening and Clinical Workflow Access from OT List (Similar to IPD/OPD List) |
| **Type** | Story |
| **Project** | BMC HMIS (BH) |
| **Version** | V-5.1.7 |
| **Status** | Blue Deployed |
| **Assignee** | Alpesh Patel |
| **Reporter** | Dr Suruchi Maheshwari |
| **Module** | OT (Operation Theatre) |

## Feature Overview

Allow Doctor / Nurse / Clinical User to open patient records directly from the OT List screen and perform clinical activities without navigating to the IPD List. The clinical view opened from OT List must match the view opened from IPD List. Functionality should apply to patients with **Booked** and **Rescheduled** statuses.

---

## Test Cases

### TC-5330-01: Verify patient can be opened directly from OT List

**Module:** OT List
**Priority:** P0 - Critical
**Pre-condition:** User (Doctor/Nurse/Clinical User) is logged into BMC HMIS; OT List contains patients

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Navigate to OT List screen | OT List page loads with patient records |
| 2 | Identify a patient with "Booked" status | Patient is visible in the OT List |
| 3 | Click on the patient row/link | Patient record opens directly from OT List |
| 4 | Verify no navigation to IPD List is required | Patient opens on OT List screen without redirecting to IPD List |

---

### TC-5330-02: Verify patient opens in the same clinical view as IPD List

**Module:** OT List
**Priority:** P0 - Critical
**Pre-condition:** Same patient exists in both OT List and IPD List; user has access to both

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Open patient from OT List (Booked status) | Patient clinical view opens |
| 2 | Note all visible sections, tabs, and clinical data | Clinical view is displayed |
| 3 | Open the same patient from IPD List | IPD List patient view opens |
| 4 | Compare both clinical views | Both views show identical sections, tabs, and clinical data |
| 5 | Verify the same clinical features are available | Clinical Notes, History, Diagnosis tabs are present in both |

---

### TC-5330-03: Verify all clinical actions are accessible from OT List patient view

**Module:** OT List - Clinical Actions
**Priority:** P0 - Critical
**Pre-condition:** Patient opened from OT List; user has Doctor/Nurse/Clinical role

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Open patient from OT List | Patient clinical view opens |
| 2 | Navigate to Clinical Notes section | Clinical Notes are accessible and editable |
| 3 | Navigate to Patient History section | Patient History is accessible and displays records |
| 4 | Navigate to Diagnosis section | Diagnosis records are accessible and editable |
| 5 | Navigate to Medication/Vitals sections | Medication and Vitals are accessible |
| 6 | Verify all actions available match IPD List functionality | All clinical actions from IPD List are present and functional |

---

### TC-5330-04: Verify no errors occur while opening patient record from OT List

**Module:** OT List - Error Handling
**Priority:** P0 - Critical
**Pre-condition:** OT List contains patients with Booked and Rescheduled statuses

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Click on a patient with "Booked" status in OT List | Patient record opens without any error message |
| 2 | Click on a patient with "Rescheduled" status in OT List | Patient record opens without any error message |
| 3 | Close the patient record and open another patient | Each patient opens successfully without errors |
| 4 | Check browser console for errors | No JavaScript or application errors in console |
| 5 | Verify network tab for failed API calls | All API calls return 200 OK, no 4xx/5xx errors |

---

### TC-5330-05: Verify patient with "Booked" status can be opened from OT List

**Module:** OT List - Patient Status
**Priority:** P0 - Critical
**Pre-condition:** OT List contains patients with "Booked" status; per comment from Dr Suruchi

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Navigate to OT List screen | OT List loads successfully |
| 2 | Filter or identify patients with "Booked" status | Booked patients are visible in the list |
| 3 | Click on a "Booked" status patient | Patient clinical view opens |
| 4 | Verify the same clinical view as IPD List | Clinical Notes, History, Diagnosis tabs are present |
| 5 | Verify clinical actions are fully functional | All clinical features work as expected from IPD List |

---

### TC-5330-06: Verify patient with "Rescheduled" status can be opened from OT List

**Module:** OT List - Patient Status
**Priority:** P0 - Critical
**Pre-condition:** OT List contains patients with "Rescheduled" status; per comment from Dr Suruchi

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Navigate to OT List screen | OT List loads successfully |
| 2 | Filter or identify patients with "Rescheduled" status | Rescheduled patients are visible in the list |
| 3 | Click on a "Rescheduled" status patient | Patient clinical view opens |
| 4 | Verify the same clinical view as IPD List | Clinical Notes, History, Diagnosis tabs are present |
| 5 | Verify clinical actions are fully functional | All clinical features work as expected from IPD List |

---

### TC-5330-07: Verify Doctor role can open patient from OT List

**Module:** OT List - Role-Based Access
**Priority:** P1 - High
**Pre-condition:** User with Doctor role is logged in; OT List has patients

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Log in as Doctor user | Login successful, Doctor dashboard loads |
| 2 | Navigate to OT List | OT List loads with patients |
| 3 | Click on a patient | Patient clinical view opens successfully |
| 4 | Verify all Doctor-level clinical actions | Doctor can access and perform clinical actions |
| 5 | Verify edit/add capabilities | Doctor can add clinical notes, diagnosis, etc. |

---

### TC-5330-08: Verify Nurse role can open patient from OT List

**Module:** OT List - Role-Based Access
**Priority:** P1 - High
**Pre-condition:** User with Nurse role is logged in; OT List has patients

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Log in as Nurse user | Login successful, Nurse dashboard loads |
| 2 | Navigate to OT List | OT List loads with patients |
| 3 | Click on a patient | Patient clinical view opens successfully |
| 4 | Verify Nurse-level clinical actions are accessible | Nurse can view clinical data |
| 5 | Verify restricted actions | Nurse cannot perform Doctor-only actions (if applicable) |

---

### TC-5330-09: Verify Clinical User role can open patient from OT List

**Module:** OT List - Role-Based Access
**Priority:** P1 - High
**Pre-condition:** User with Clinical User role is logged in; OT List has patients

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Log in as Clinical User | Login successful, Clinical dashboard loads |
| 2 | Navigate to OT List | OT List loads with patients |
| 3 | Click on a patient | Patient clinical view opens successfully |
| 4 | Verify appropriate clinical access | Clinical User can perform permitted actions |
| 5 | Verify role restrictions are enforced | No unauthorized access to restricted features |

---

### TC-5330-10: Verify Unauthorized user cannot access OT List patient data

**Module:** OT List - Security
**Priority:** P1 - High
**Pre-condition:** User without clinical access role is logged in; OT List exists

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Log in as a user without clinical access (e.g., Admin, Billing) | Login successful |
| 2 | Navigate to OT List | OT List may load but patient data access is restricted |
| 3 | Attempt to click on a patient | Access denied message OR patient does not open |
| 4 | Verify API calls return 403 Forbidden | Unauthorized API calls are blocked |
| 5 | Verify no clinical data is exposed | Patient clinical details are not visible |

---

### TC-5330-11: Verify patient data remains consistent between OT List and IPD List views

**Module:** OT List - Data Consistency
**Priority:** P1 - High
**Pre-condition:** Same patient exists in both OT List and IPD List

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Open patient from OT List | Patient record opens with clinical data |
| 2 | Note patient details (Name, Registration ID, Diagnosis, etc.) | All patient data is displayed |
| 3 | Open the same patient from IPD List | IPD List patient record opens |
| 4 | Compare all displayed data | All patient details match exactly between both views |
| 5 | Verify no data loss or discrepancy | Data displayed is identical in both access paths |

---

### TC-5330-12: Verify clinical actions performed from OT List reflect in IPD List view

**Module:** OT List - Data Synchronization
**Priority:** P1 - High
**Pre-condition:** Patient exists in OT List; user performs clinical action

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Open patient from OT List | Patient clinical view opens |
| 2 | Add a clinical note | Clinical note is saved successfully |
| 3 | Navigate to IPD List and open the same patient | Same patient record opens from IPD List |
| 4 | Verify the clinical note appears | Added clinical note is visible in IPD List view |
| 5 | Verify bidirectional sync | Changes made from either view are reflected in the other |

---

### TC-5330-13: Verify OT List patient click functionality works across multiple patients

**Module:** OT List - Functional Testing
**Priority:** P1 - High
**Pre-condition:** OT List contains multiple patients with various statuses

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Navigate to OT List | OT List loads with multiple patients |
| 2 | Click on first patient | First patient clinical view opens |
| 3 | Close and click on second patient | Second patient clinical view opens |
| 4 | Repeat for 5+ patients with different statuses | All patients open successfully |
| 5 | Verify consistent behavior across all patients | No intermittent failures or data mismatches |

---

### TC-5330-14: Verify OT List page remains stable after multiple patient open/close operations

**Module:** OT List - Stability
**Priority:** P1 - High
**Pre-condition:** OT List contains patients

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Navigate to OT List | OT List loads correctly |
| 2 | Open and close 10 patients sequentially | Each patient opens and closes successfully |
| 3 | Verify OT List remains responsive | Page does not become slow or unresponsive |
| 4 | Verify no memory leaks | Browser memory usage remains stable |
| 5 | Verify pagination/filter state is preserved | OT List state remains intact after operations |

---

### TC-5330-15: Verify search functionality in OT List still works after patient open feature

**Module:** OT List - Search
**Priority:** P2 - Medium
**Pre-condition:** OT List contains multiple patients; patient open feature is enabled

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Navigate to OT List | OT List loads with patients |
| 2 | Enter patient name in search field | Matching patients are filtered |
| 3 | Click on a filtered patient | Patient clinical view opens |
| 4 | Close patient record | Returns to OT List with search still active |
| 5 | Verify search state is preserved | Filtered results are still displayed |

---

### TC-5330-16: Verify filter functionality in OT List works with patient open feature

**Module:** OT List - Filter
**Priority:** P2 - Medium
**Pre-condition:** OT List has patients with various statuses; patient open feature is enabled

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Navigate to OT List | OT List loads with patients |
| 2 | Apply filter for "Booked" status | Only Booked patients are displayed |
| 3 | Click on a filtered patient | Patient clinical view opens |
| 4 | Close patient record | Returns to OT List with filter still active |
| 5 | Verify filtered results are preserved | Only Booked patients remain displayed |

---

### TC-5330-17: Verify pagination works correctly after using patient open feature

**Module:** OT List - Pagination
**Priority:** P2 - Medium
**Pre-condition:** OT List has more records than one page; patient open feature is enabled

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Navigate to OT List → Page 1 | Page 1 loads with patients |
| 2 | Click on a patient and close it | Returns to Page 1 |
| 3 | Navigate to Page 2 | Page 2 loads correctly |
| 4 | Click on a patient from Page 2 and close it | Returns to Page 2 |
| 5 | Verify page state is maintained | Correct page is displayed after closing patient record |

---

### TC-5330-18: Verify back navigation works correctly after opening patient from OT List

**Module:** OT List - Navigation
**Priority:** P2 - Medium
**Pre-condition:** User opened patient from OT List

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Navigate to OT List | OT List loads |
| 2 | Click on a patient | Patient clinical view opens |
| 3 | Use browser back button | Returns to OT List with previous state |
| 4 | Verify OT List state | Search, filter, and pagination state is preserved |
| 5 | Click forward button and verify | Can navigate back to patient record |

---

### TC-5330-19: Verify patient with Cancelled status cannot be opened from OT List

**Module:** OT List - Patient Status Handling
**Priority:** P2 - Medium
**Pre-condition:** OT List contains patients with "Cancelled" status

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Navigate to OT List | OT List loads |
| 2 | Identify patients with "Cancelled" status | Cancelled patients are visible |
| 3 | Click on a "Cancelled" patient | Either: (a) Patient does not open, OR (b) Patient opens with read-only restricted view |
| 4 | Verify appropriate error/info message | Clear message explaining why action is restricted |
| 5 | Verify no errors in console | Application handles Cancelled status gracefully |

---

### TC-5330-20: Verify performance - patient opens within acceptable time from OT List

**Module:** OT List - Performance
**Priority:** P2 - Medium
**Pre-condition:** OT List contains patients; user has appropriate role

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Navigate to OT List | OT List loads |
| 2 | Measure time to click on patient | Record click time |
| 3 | Measure time for patient clinical view to appear | Patient view loads within acceptable time (< 3 seconds) |
| 4 | Repeat for 5 different patients | Consistent performance across multiple opens |
| 5 | Compare with IPD List open time | OT List open time is similar to IPD List (< 20% variance) |

---

### TC-5330-21: Verify multiple browser tabs can open different patients from OT List simultaneously

**Module:** OT List - Multi-Tab
**Priority:** P2 - Medium
**Pre-condition:** OT List contains multiple patients

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Open OT List in Tab 1 | OT List loads in Tab 1 |
| 2 | Click on Patient A | Patient A opens in Tab 1 |
| 3 | Open OT List in Tab 2 | OT List loads in Tab 2 |
| 4 | Click on Patient B in Tab 2 | Patient B opens in Tab 2 |
| 5 | Verify no data collision | Both patients remain open independently without data mixing |

---

### TC-5330-22: Verify session timeout handling when patient is open from OT List

**Module:** OT List - Session Handling
**Priority:** P2 - Medium
**Pre-condition:** User has patient open from OT List; session is about to timeout

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Open patient from OT List | Patient clinical view is open |
| 2 | Wait for session timeout OR simulate timeout | Session expiration triggers |
| 3 | Attempt to perform action on open patient | User is prompted to re-authenticate |
| 4 | Verify data preservation | Patient data is preserved during re-authentication |
| 5 | Verify graceful recovery | After re-login, user can continue without data loss |

---

### TC-5330-23: Verify URL/back navigation from patient record returns to correct OT List position

**Module:** OT List - URL Navigation
**Priority:** P2 - Medium
**Pre-condition:** User is on a specific page/filter of OT List; opens a patient

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Navigate to OT List → Apply filter for "Rescheduled" | Filtered view displayed |
| 2 | Navigate to Page 2 | Page 2 of filtered results displayed |
| 3 | Click on a patient | Patient clinical view opens |
| 4 | Close patient record | Returns to OT List Page 2 with filter active |
| 5 | Verify exact state restoration | Page 2 and filter are preserved exactly |

---

### TC-5330-24: Verify patient opened from OT List has complete clinical timeline/history

**Module:** OT List - Clinical Data Completeness
**Priority:** P2 - Medium
**Pre-condition:** Patient opened from OT List has historical clinical data

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Open patient from OT List | Patient clinical view opens |
| 2 | Navigate to Clinical History/Timeline | Complete history is displayed |
| 3 | Verify all past visits are listed | Historical records from all dates are visible |
| 4 | Verify chronological ordering | Records are displayed in correct chronological order |
| 5 | Compare with IPD List view | History data matches exactly |

---

### TC-5330-25: Verify accessibility - keyboard navigation for opening patient from OT List

**Module:** OT List - Accessibility
**Priority:** P2 - Medium
**Pre-condition:** User navigates OT List using keyboard only

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Navigate to OT List | OT List loads |
| 2 | Use Tab key to focus on a patient row | Patient row receives focus indicator |
| 3 | Press Enter to open patient | Patient clinical view opens |
| 4 | Verify focus moves correctly into patient view | Focus is within the patient clinical view |
| 5 | Press Escape to close | Patient view closes, focus returns to OT List |

---

## Summary

| Priority | Count |
|----------|-------|
| P0 - Critical | 6 |
| P1 - High | 8 |
| P2 - Medium | 11 |
| **Total** | **25** |

## Test Data Requirements

1. **OT Patient - Booked Status**: At least 3 patients in OT List with "Booked" status
2. **OT Patient - Rescheduled Status**: At least 3 patients in OT List with "Rescheduled" status
3. **OT Patient - Cancelled Status**: At least 2 patients in OT List with "Cancelled" status
4. **Patient in Both OT and IPD**: At least 2 patients that exist in both OT List and IPD List
5. **Multi-role Test Data**: Users with Doctor, Nurse, Clinical User, and non-clinical roles
6. **Historical Clinical Data**: Patient with complete clinical history for timeline verification
7. **Large OT List**: For pagination and search testing (20+ records)

## Related Tickets

- **BH-5474**: OPD/IPD Bifurcation in MSW/CDO Verification (reference for list functionality)
- **IPD List Patient Opening**: Reference implementation for clinical view parity
- **BH-4252**: CDO naming convention (OT module naming consistency)
