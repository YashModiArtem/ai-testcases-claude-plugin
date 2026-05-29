# BH-5474: Implement OPD/IPD Bifurcation in MSW Verification List

## Issue Details

| Field | Value |
|-------|-------|
| **Issue Key** | BH-5474 |
| **Summary** | Implement OPD/IPD Bifurcation in MSW Verification List |
| **Type** | Story |
| **Project** | BMC HMIS (BH) |
| **Version** | V-5.1.7 |
| **Status** | Blue Deployed |
| **Assignee** | Paresh Kanzariya |
| **Reporter** | Pooja Bargode |

## Feature Overview

The MSW Verification (CDO Verification) page needs to bifurcate patients into OPD and IPD lists based on their registration type, similar to the Financial Assistance page.

## Test Cases

### TC-5474-01: Verify CDO Verification page displays two distinct sections for OPD and IPD patients

**Module:** CDO Verification
**Priority:** P0 - Critical
**Pre-condition:** User is logged into BMC HMIS application

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to the CDO Verification page | Page loads successfully with two distinct sections/tabs: OPD List and IPD List |
| 2 | Verify that OPD and IPD sections are visible | Both OPD and IPD sections/tabs are displayed clearly |
| 3 | Verify tab naming convention | Tabs are clearly labeled as "OPD List" and "IPD List" |

---

### TC-5474-02: Verify OPD patients appear only in the OPD list

**Module:** CDO Verification
**Priority:** P0 - Critical
**Pre-condition:** Test data with OPD-registered patients exists in the system

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Register a patient as OPD type | Patient is registered successfully with type "OPD" |
| 2 | Navigate to CDO Verification page | Page loads successfully |
| 3 | Switch to OPD list tab | OPD patient appears in the OPD list |
| 4 | Switch to IPD list tab | OPD patient does NOT appear in the IPD list |

---

### TC-5474-03: Verify IPD patients appear only in the IPD list

**Module:** CDO Verification
**Priority:** P0 - Critical
**Pre-condition:** Test data with IPD-registered patients exists in the system

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Register a patient as IPD type | Patient is registered successfully with type "IPD" |
| 2 | Navigate to CDO Verification page | Page loads successfully |
| 3 | Switch to OPD list tab | IPD patient does NOT appear in the OPD list |
| 4 | Switch to IPD list tab | IPD patient appears in the IPD list |

---

### TC-5474-04: Verify no patient record appears in both lists simultaneously

**Module:** CDO Verification
**Priority:** P0 - Critical
**Pre-condition:** System contains both OPD and IPD patients

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to CDO Verification page | Page loads successfully |
| 2 | Extract all patient records from OPD list | List of OPD patients retrieved |
| 3 | Extract all patient records from IPD list | List of IPD patients retrieved |
| 4 | Compare both lists | No patient record exists in both lists simultaneously |

---

### TC-5474-05: Verify bifurcation logic is consistent with Financial Assistance page

**Module:** CDO Verification
**Priority:** P1 - High
**Pre-condition:** Financial Assistance page implements OPD/IPD bifurcation

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to Financial Assistance page | Verify OPD/IPD bifurcation logic exists |
| 2 | Note the patient type determination logic | Logic is documented (patient type from registration) |
| 3 | Navigate to CDO Verification page | Verify the same patient type determination logic is used |
| 4 | Compare patient categorization | Both pages categorize patients identically based on registration type |

---

### TC-5474-06: Verify OPD list displays all existing columns and data

**Module:** CDO Verification - OPD List
**Priority:** P1 - High
**Pre-condition:** OPD patients exist in the system with complete data

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to CDO Verification page | Page loads successfully |
| 2 | Switch to OPD list tab | OPD list is displayed |
| 3 | Verify column headers | All existing columns (Patient Name, Registration ID, Date, etc.) are present |
| 4 | Verify data display | Patient records display all relevant data in respective columns |

---

### TC-5474-07: Verify IPD list displays all existing columns and data

**Module:** CDO Verification - IPD List
**Priority:** P1 - High
**Pre-condition:** IPD patients exist in the system with complete data

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to CDO Verification page | Page loads successfully |
| 2 | Switch to IPD list tab | IPD list is displayed |
| 3 | Verify column headers | All existing columns (Patient Name, Registration ID, Date, etc.) are present |
| 4 | Verify data display | Patient records display all relevant data in respective columns |

---

### TC-5474-08: Verify search functionality in OPD list

**Module:** CDO Verification - OPD List
**Priority:** P1 - High
**Pre-condition:** OPD list contains multiple patient records

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to CDO Verification page → OPD list | OPD list is displayed |
| 2 | Enter a valid patient name in the search field | Relevant OPD patients matching the search term are displayed |
| 3 | Enter a valid registration ID in the search field | Relevant OPD patient matching the registration ID is displayed |
| 4 | Enter an IPD patient's details in the search field | No results are returned from the OPD list |
| 5 | Clear the search field | All OPD patients are displayed again |

---

### TC-5474-09: Verify search functionality in IPD list

**Module:** CDO Verification - IPD List
**Priority:** P1 - High
**Pre-condition:** IPD list contains multiple patient records

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to CDO Verification page → IPD list | IPD list is displayed |
| 2 | Enter a valid patient name in the search field | Relevant IPD patients matching the search term are displayed |
| 3 | Enter a valid registration ID in the search field | Relevant IPD patient matching the registration ID is displayed |
| 4 | Enter an OPD patient's details in the search field | No results are returned from the IPD list |
| 5 | Clear the search field | All IPD patients are displayed again |

---

### TC-5474-10: Verify filter functionality in OPD list

**Module:** CDO Verification - OPD List
**Priority:** P1 - High
**Pre-condition:** OPD list contains patient records with various statuses

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to CDO Verification page → OPD list | OPD list is displayed with default filter applied |
| 2 | Apply a status filter (e.g., New) | Only OPD patients with selected status are displayed |
| 3 | Apply a date range filter | Only OPD patients within the selected date range are displayed |
| 4 | Remove all filters | All OPD patients are displayed again |

---

### TC-5474-11: Verify filter functionality in IPD list

**Module:** CDO Verification - IPD List
**Priority:** P1 - High
**Pre-condition:** IPD list contains patient records with various statuses

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to CDO Verification page → IPD list | IPD list is displayed with default filter applied |
| 2 | Apply a status filter (e.g., Under Assessment) | Only IPD patients with selected status are displayed |
| 3 | Apply a date range filter | Only IPD patients within the selected date range are displayed |
| 4 | Remove all filters | All IPD patients are displayed again |

---

### TC-5474-12: Verify pagination in OPD list

**Module:** CDO Verification - OPD List
**Priority:** P1 - High
**Pre-condition:** OPD list contains more records than the default page size

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to CDO Verification page → OPD list | OPD list is displayed with pagination controls |
| 2 | Verify first page loads with default page size | Correct number of records displayed on first page |
| 3 | Navigate to next page | Next set of OPD records is displayed |
| 4 | Navigate to previous page | Previous set of OPD records is displayed |
| 5 | Navigate to last page | Last set of OPD records is displayed |
| 6 | Change page size | OPD list updates to display the new page size |

---

### TC-5474-13: Verify pagination in IPD list

**Module:** CDO Verification - IPD List
**Priority:** P1 - High
**Pre-condition:** IPD list contains more records than the default page size

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to CDO Verification page → IPD list | IPD list is displayed with pagination controls |
| 2 | Verify first page loads with default page size | Correct number of records displayed on first page |
| 3 | Navigate to next page | Next set of IPD records is displayed |
| 4 | Navigate to previous page | Previous set of IPD records is displayed |
| 5 | Navigate to last page | Last set of IPD records is displayed |
| 6 | Change page size | IPD list updates to display the new page size |

---

### TC-5474-14: Verify sorting functionality in OPD list

**Module:** CDO Verification - OPD List
**Priority:** P1 - High
**Pre-condition:** OPD list contains multiple patient records

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to CDO Verification page → OPD list | OPD list is displayed with default sorting |
| 2 | Click on column header (e.g., Patient Name) | Records are sorted in ascending order by that column |
| 3 | Click on same column header again | Records are sorted in descending order |
| 4 | Verify sorting does not affect IPD list | IPD list remains unchanged when OPD list is sorted |

---

### TC-5474-15: Verify sorting functionality in IPD list

**Module:** CDO Verification - IPD List
**Priority:** P1 - High
**Pre-condition:** IPD list contains multiple patient records

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to CDO Verification page → IPD list | IPD list is displayed with default sorting |
| 2 | Click on column header (e.g., Registration Date) | Records are sorted in ascending order by that column |
| 3 | Click on same column header again | Records are sorted in descending order |
| 4 | Verify sorting does not affect OPD list | OPD list remains unchanged when IPD list is sorted |

---

### TC-5474-16: Verify seamless switching between OPD and IPD views (tab toggle)

**Module:** CDO Verification - Navigation
**Priority:** P1 - High
**Pre-condition:** Both OPD and IPD patients exist in the system

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to CDO Verification page → OPD list | OPD list is displayed by default |
| 2 | Click on IPD tab | IPD list is displayed without page reload |
| 3 | Click on OPD tab | OPD list is displayed without page reload |
| 4 | Measure page transition time | Switching between tabs is seamless (< 2 seconds) |

---

### TC-5474-17: Verify data is fetched dynamically based on patient registration type

**Module:** CDO Verification - Data Loading
**Priority:** P1 - High
**Pre-condition:** System contains both OPD and IPD patients

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to CDO Verification page → OPD list | OPD list loads with OPD patients |
| 2 | Switch to IPD list | IPD list loads with IPD patients (OPD list data is not shown) |
| 3 | Switch back to OPD list | OPD list refreshes with latest OPD patient data |
| 4 | Verify no stale data | Both lists display the most current data for their respective patient types |

---

### TC-5474-18: Verify handling of patients with missing/undefined patient type

**Module:** CDO Verification - Data Handling
**Priority:** P1 - High
**Pre-condition:** Test data with patients having missing/undefined patient type exists

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Create/register a patient with missing/undefined patient type | Patient is registered with undefined/missing type |
| 2 | Navigate to CDO Verification page | Page loads successfully |
| 3 | Check OPD list | Patient with missing type is either NOT shown OR shown in a default category |
| 4 | Check IPD list | Patient with missing type is NOT shown in IPD list (if already shown in default/OPD) |
| 5 | Verify with business for final behavior | Behavior matches the confirmed business requirement |

---

### TC-5474-19: Verify real-time/near real-time update when patient type changes (if allowed)

**Module:** CDO Verification - Data Synchronization
**Priority:** P2 - Medium
**Pre-condition:** System allows patient type updates; test data available

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Verify if patient type update is allowed in the system | System either allows or restricts patient type updates |
| 2 | If allowed: Change patient type from OPD to IPD | Patient type is updated successfully |
| 3 | Navigate to CDO Verification page → OPD list | Patient no longer appears in OPD list (or appears in new category) |
| 4 | Navigate to CDO Verification page → IPD list | Patient appears in IPD list (near real-time or after page refresh) |

---

### TC-5474-20: Verify page naming convention uses "CDO" instead of "MSW"

**Module:** CDO Verification - UI/Labeling
**Priority:** P2 - Medium
**Pre-condition:** Navigation to CDO Verification page

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to the MSW Verification / CDO Verification page | Page loads successfully |
| 2 | Check page title/heading | Page is labeled "CDO Verification" not "MSW Verification" |
| 3 | Check breadcrumb/navigation menu | All references use "CDO" terminology per BH-4252 |
| 4 | Check tab/section labels | All labels reference CDO, not MSW |

---

### TC-5474-21: Verify empty state in OPD list when no OPD patients exist

**Module:** CDO Verification - OPD List - Empty State
**Priority:** P2 - Medium
**Pre-condition:** No OPD patients exist in the system

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Ensure no OPD patients exist | System contains only IPD patients or no patients |
| 2 | Navigate to CDO Verification page → OPD list | OPD list displays an empty state message |
| 3 | Verify empty state message | Message clearly indicates no OPD patients found |
| 4 | Verify IPD list still displays correctly | IPD list shows IPD patients normally |

---

### TC-5474-22: Verify empty state in IPD list when no IPD patients exist

**Module:** CDO Verification - IPD List - Empty State
**Priority:** P2 - Medium
**Pre-condition:** No IPD patients exist in the system

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Ensure no IPD patients exist | System contains only OPD patients or no patients |
| 2 | Navigate to CDO Verification page → IPD list | IPD list displays an empty state message |
| 3 | Verify empty state message | Message clearly indicates no IPD patients found |
| 4 | Verify OPD list still displays correctly | OPD list shows OPD patients normally |

---

### TC-5474-23: Verify performance - data loading time for OPD and IPD lists

**Module:** CDO Verification - Performance
**Priority:** P2 - Medium
**Pre-condition:** System contains a significant number of OPD and IPD patients (>100 records per list)

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to CDO Verification page | Measure initial page load time |
| 2 | Switch to OPD list | OPD list loads within acceptable time (< 5 seconds) |
| 3 | Switch to IPD list | IPD list loads within acceptable time (< 5 seconds) |
| 4 | Apply search/filter on OPD list | Results load within acceptable time (< 3 seconds) |
| 5 | Apply search/filter on IPD list | Results load within acceptable time (< 3 seconds) |

---

### TC-5474-24: Verify OPD and IPD lists have consistent UI design

**Module:** CDO Verification - UI Consistency
**Priority:** P2 - Medium
**Pre-condition:** Both OPD and IPD lists are displayed

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to CDO Verification page → OPD list | OPD list UI is rendered correctly |
| 2 | Switch to IPD list | IPD list UI is rendered correctly |
| 3 | Compare column widths, fonts, colors | Both lists have consistent UI styling |
| 4 | Compare pagination controls | Pagination controls are identical in both lists |
| 5 | Compare action buttons/toolbar | All action buttons and toolbar elements are consistent |

---

### TC-5474-25: Cross-tab dependency - verify data integrity when patient type is modified during session

**Module:** CDO Verification - Data Integrity
**Priority:** P2 - Medium
**Pre-condition:** User has access to patient registration; OPD and IPD patients exist

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Open CDO Verification page with OPD list visible | OPD list loads with OPD patients |
| 2 | In another tab or session, change a patient's type from OPD to IPD | Patient type is updated in the system |
| 3 | Refresh the CDO Verification page | Changes reflect appropriately |
| 4 | Verify patient appears in correct list (IPD) | Patient moved to IPD list and removed from OPD list |

---

## Summary

| Priority | Count |
|----------|-------|
| P0 - Critical | 4 |
| P1 - High | 11 |
| P2 - Medium | 10 |
| **Total** | **25** |

## Test Data Requirements

1. **OPD Patient Records**: At least 5 test patients registered as OPD type with varying statuses (New, Under Assessment, Approved, Rejected)
2. **IPD Patient Records**: At least 5 test patients registered as IPD type with varying statuses
3. **Patients with Missing Type**: At least 2 patients with undefined/missing patient type
4. **Large Dataset**: For performance testing, 100+ records per patient type
5. **Cross-type Edge Cases**: Patients near category boundaries or with recently changed types

## Related Tickets

- **BH-4252**: Parent requirement for CDO renaming (per comment on BH-5474)
- **Financial Assistance Page**: Reference implementation for OPD/IPD bifurcation logic
