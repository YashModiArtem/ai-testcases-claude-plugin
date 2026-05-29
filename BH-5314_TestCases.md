# BH-5314: Enhancement of Referral Report with New Format & Additional Fields

## Issue Details

| Field | Value |
|-------|-------|
| **Issue Key** | BH-5314 |
| **Summary** | Enhancement of Referral Report with New Format & Additional Fields |
| **Type** | Story |
| **Project** | BMC HMIS (BH) |
| **Version** | V-5.1.7 |
| **Status** | Blue Deployed |
| **Assignee** | Umesh Gadhvi |
| **Reporter** | Saumya Rai |
| **Module** | Referral Report |

## Feature Overview

The existing Referral Report is enhanced to include additional fields and an updated format. The enhanced report captures complete referral lifecycle information including source, destination, priority, and timestamps. Three new filters are also introduced: Department, Unit (dependent on Department), and Referral Type.

**New Report Column Sequence:**
SR No, UHID, Patient Name, Age, Gender, Referral Type, Referred From Department, Referred From Unit, Referred To Department, Referred To Unit, Patient Type, Priority, Referred Date & Time, Referred By, Referral Remarks

**New Filters:**
- **Department Filter**: Dropdown labelled "Department", default "All Departments", filters by Referred From Department
- **Unit Filter**: Dropdown labelled "Unit", default "All Units", dependent on Department selection
- **Referral Type Filter**: Dropdown labelled "Referral Type", values: All, Internal, External, default: All

---

## Test Cases

### TC-5314-01: Verify enhanced Referral Report displays all new columns in correct sequence

**Module:** Referral Report
**Priority:** P0 - Critical
**Pre-condition:** User is logged into BMC HMIS application; Referral Report contains records

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Navigate to Referral Report | Referral Report page loads successfully |
| 2 | Verify column headers | All 15 columns are present in the correct sequence |
| 3 | Check column sequence order | Sequence matches: SR No, UHID, Patient Name, Age, Gender, Referral Type, Referred From Department, Referred From Unit, Referred To Department, Referred To Unit, Patient Type, Priority, Referred Date & Time, Referred By, Referral Remarks |
| 4 | Verify each column displays data | All columns contain corresponding referral data |

---

### TC-5314-02: Verify UHID column displays unique patient identifiers

**Module:** Referral Report - New Columns
**Priority:** P0 - Critical
**Pre-condition:** Referral records exist with UHID values assigned

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Navigate to Referral Report | Report loads with UHID column visible |
| 2 | Verify UHID column header | Column is labelled "UHID" |
| 3 | Check UHID values in data rows | Each patient has a valid UHID displayed |
| 4 | Verify UHID format | UHID matches the standard hospital UHID format |
| 5 | Verify no duplicate UHIDs in same column | UHIDs are unique per patient record |

---

### TC-5314-03: Verify Referral Type column displays Internal or External values

**Module:** Referral Report - New Columns
**Priority:** P0 - Critical
**Pre-condition:** Referral records exist with both Internal and External referral types

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Navigate to Referral Report | Report loads with Referral Type column visible |
| 2 | Verify Referral Type column header | Column is labelled "Referral Type" |
| 3 | Check for Internal referrals | Internal referrals display "Internal" in the column |
| 4 | Check for External referrals | External referrals display "External" in the column |
| 5 | Verify no empty/null values | All records have a defined Referral Type |

---

### TC-5314-04: Verify Referred From Unit and Referred To Unit columns display unit information

**Module:** Referral Report - New Columns
**Priority:** P0 - Critical
**Pre-condition:** Referral records exist with unit-level referral data

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Navigate to Referral Report | Report loads with Referred From Unit and Referred To Unit columns visible |
| 2 | Verify Referred From Unit column header | Column is labelled "Referred From Unit" |
| 3 | Verify Referred To Unit column header | Column is labelled "Referred To Unit" |
| 4 | Check data in Referred From Unit | Source unit name is displayed for each record |
| 5 | Check data in Referred To Unit | Destination unit name is displayed for each record |
| 6 | Verify unit values are non-empty | Both unit columns contain valid unit names |

---

### TC-5314-05: Verify Priority column displays referral priority levels

**Module:** Referral Report - New Columns
**Priority:** P0 - Critical
**Pre-condition:** Referral records exist with priority levels assigned

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Navigate to Referral Report | Report loads with Priority column visible |
| 2 | Verify Priority column header | Column is labelled "Priority" |
| 3 | Check priority values | Priority levels (e.g., High, Medium, Low) are displayed correctly |
| 4 | Verify priority is non-null | All referral records have a priority value assigned |

---

### TC-5314-06: Verify Referred Date & Time column displays complete timestamp

**Module:** Referral Report - New Columns
**Priority:** P0 - Critical
**Pre-condition:** Referral records exist with referral date and time

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Navigate to Referral Report | Report loads with Referred Date & Time column visible |
| 2 | Verify column header | Column is labelled "Referred Date & Time" |
| 3 | Check timestamp format | Date and time are displayed together (e.g., DD-MM-YYYY HH:MM or similar format) |
| 4 | Verify date accuracy | Date matches the actual referral date from source data |
| 5 | Verify time accuracy | Time matches the actual referral time from source data |

---

### TC-5314-07: Verify Referral Remarks column displays referral comments

**Module:** Referral Report - New Columns
**Priority:** P0 - Critical
**Pre-condition:** Referral records exist with remarks/comments

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Navigate to Referral Report | Report loads with Referral Remarks column visible |
| 2 | Verify column header | Column is labelled "Referral Remarks" (renamed from "Remark") |
| 3 | Check data display | Referral remarks/comments are displayed in the column |
| 4 | Verify empty remarks | Records without remarks show empty/null instead of placeholder text |
| 5 | Verify text is readable | Long remarks are displayed without truncation or without proper truncation indicator |

---

### TC-5314-08: Verify Department filter dropdown is available and functional

**Module:** Referral Report - Department Filter
**Priority:** P0 - Critical
**Pre-condition:** Referral Report is accessible; departments exist in the system

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Navigate to Referral Report | Report loads with Department filter visible in filter bar |
| 2 | Verify filter label | Dropdown is labelled "Department" |
| 3 | Verify default value | Default value is "All Departments" |
| 4 | Click on Department dropdown | List of active departments is displayed |
| 5 | Select a specific department | Report filters by Referred From Department matching selected value |
| 6 | Verify only matching records | Only referrals from the selected department are displayed |
| 7 | Reset to "All Departments" | All referral records are displayed again |

---

### TC-5314-09: Verify Unit filter dropdown is available and functional with dependency on Department

**Module:** Referral Report - Unit Filter
**Priority:** P0 - Critical
**Pre-condition:** Referral Report is accessible; departments and units exist

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Navigate to Referral Report | Report loads with Unit filter visible in filter bar, placed after Department filter |
| 2 | Verify filter label | Dropdown is labelled "Unit" |
| 3 | Verify default value | Default value is "All Units" |
| 4 | With Department = "All Departments", check Unit dropdown | All active units are listed in the Unit dropdown |
| 5 | Select a specific Department | Unit dropdown updates to show only units belonging to the selected department |
| 6 | Verify Unit dependency | When Department is "All Departments", Unit shows all units; when specific Department is selected, Unit shows only department-specific units |
| 7 | Select a specific Unit | Report filters by selected department AND unit |
| 8 | Reset filters | Both filters return to default "All" values |

---

### TC-5314-10: Verify Referral Type filter dropdown is available and functional

**Module:** Referral Report - Referral Type Filter
**Priority:** P0 - Critical
**Pre-condition:** Referral Report is accessible; referrals with both Internal and External types exist

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Navigate to Referral Report | Report loads with Referral Type filter visible in filter bar |
| 2 | Verify filter label | Dropdown is labelled "Referral Type" |
| 3 | Verify available values | Dropdown shows three values: All, Internal, External |
| 4 | Verify default value | Default value is "All" |
| 5 | Select "Internal" | Only Internal referrals are displayed |
| 6 | Select "External" | Only External referrals are displayed |
| 7 | Select "All" | All referrals (Internal and External) are displayed |
| 8 | Verify record count changes | Switching between filter values updates the displayed records correctly |

---

### TC-5314-11: Verify all three filters work together in combination

**Module:** Referral Report - Filter Combination
**Priority:** P0 - Critical
**Pre-condition:** Referral Report is accessible; data exists for all filter combinations

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Navigate to Referral Report | Report loads with all three filters visible |
| 2 | Apply Department filter | Records filter by selected department |
| 3 | Apply Unit filter (with Department selected) | Records further filter by selected unit |
| 4 | Apply Referral Type filter | Records further filter by selected referral type |
| 5 | Verify combined filter result | Only records matching all three filter criteria are displayed |
| 6 | Reset all filters individually | Each filter can be reset independently |
| 7 | Clear all filters at once | All filters return to default values; all records displayed |

---

### TC-5314-12: Verify existing report columns remain available and functional

**Module:** Referral Report - Existing Columns
**Priority:** P0 - Critical
**Pre-condition:** Referral Report is accessible

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Navigate to Referral Report | Report loads with all existing columns |
| 2 | Verify SR No column | Serial number column is present and numbered correctly |
| 3 | Verify Patient Name column | Patient names are displayed |
| 4 | Verify Age column | Patient ages are displayed |
| 5 | Verify Gender column | Patient genders are displayed |
| 6 | Verify Patient Type column | Patient types (OPD/IPD) are displayed |
| 7 | Verify Referred By (Care Professional) column | Referring care professional names are displayed |
| 8 | Verify "Referred From Dept" renamed behavior | If renamed, verify old and new column names are handled correctly |

---

### TC-5314-13: Verify Department filter dropdown is populated from active department master list

**Module:** Referral Report - Department Filter Data Source
**Priority:** P1 - High
**Pre-condition:** Department master data exists in the system with active and inactive entries

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Navigate to Referral Report | Report loads with Department filter |
| 2 | Open Department dropdown | Only active departments are listed |
| 3 | Verify inactive departments | Inactive departments are NOT shown in the dropdown |
| 4 | Add a new active department in master | New department appears in the dropdown (after refresh/reload) |
| 5 | Mark a department as inactive | Department is removed from the dropdown (after refresh/reload) |

---

### TC-5314-14: Verify Unit filter is dependent on Department and shows only relevant units

**Module:** Referral Report - Unit Filter Dependency
**Priority:** P1 - High
**Pre-condition:** Multiple departments exist, each with associated units

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Navigate to Referral Report | Report loads with Department and Unit filters |
| 2 | Verify Unit filter position | Unit filter is immediately after Department filter |
| 3 | Select Department "All Departments" | Unit filter shows "All Units" and lists all active units |
| 4 | Select Department "Cardiology" | Unit filter updates to show only units under Cardiology |
| 5 | Select Department "Orthopedics" | Unit filter updates to show only units under Orthopedics |
| 6 | Verify unit list changes correctly | Each department selection shows only its corresponding units |

---

### TC-5314-15: Verify sorting works on all new columns

**Module:** Referral Report - Sorting
**Priority:** P1 - High
**Pre-condition:** Referral Report contains multiple records with varying data in new columns

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Navigate to Referral Report | Report loads with default sorting |
| 2 | Click on UHID column header | Records sort by UHID in ascending order |
| 3 | Click UHID again | Records sort in descending order |
| 4 | Click on Referral Type column header | Records sort by Referral Type |
| 5 | Click on Priority column header | Records sort by Priority levels |
| 6 | Click on Referred Date & Time column header | Records sort by referral date/time chronologically |
| 7 | Verify existing column sorting | Existing columns (Patient Name, Age, etc.) sorting still works |
| 8 | Verify multi-column sort (if supported) | Can sort by multiple columns simultaneously |

---

### TC-5314-16: Verify search functionality works with new columns

**Module:** Referral Report - Search
**Priority:** P1 - High
**Pre-condition:** Referral Report contains multiple records

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Navigate to Referral Report | Report loads with search functionality |
| 2 | Search by UHID | Matching referral records are displayed |
| 3 | Search by Patient Name | Matching referral records are displayed |
| 4 | Search by Referral Type keyword | Matching referrals (Internal/External) are displayed |
| 5 | Search by referring care professional | Matching records are displayed |
| 6 | Search by department name | Matching records are displayed |
| 7 | Clear search | All records are displayed again |
| 8 | Verify search does not break filters | Search and filters work together |

---

### TC-5314-17: Verify pagination works correctly with enhanced report

**Module:** Referral Report - Pagination
**Priority:** P1 - High
**Pre-condition:** Referral Report has more records than the default page size

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Navigate to Referral Report | Report loads with pagination controls |
| 2 | Verify first page loads | Correct number of records displayed on first page |
| 3 | Navigate to next page | Next set of records is displayed |
| 4 | Navigate to previous page | Previous set of records is displayed |
| 5 | Navigate to last page | Last page of records is displayed |
| 6 | Change page size | Report updates to display the new page size |
| 7 | Verify all columns persist across pages | Column structure remains consistent on all pages |

---

### TC-5314-18: Verify filtering persists when navigating between pages

**Module:** Referral Report - Pagination with Filters
**Priority:** P1 - High
**Pre-condition:** Referral Report has many records; filters are applied

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Navigate to Referral Report | Report loads |
| 2 | Apply Department filter | Only matching records are displayed |
| 3 | Navigate to page 2 | Page 2 displays filtered results (not all records) |
| 4 | Apply Unit filter | Results further filtered |
| 5 | Navigate between pages | Pagination applies only to filtered results |
| 6 | Apply Referral Type filter | Results further filtered |
| 7 | Navigate between pages | Pagination applies to combined filtered results |
| 8 | Clear filters | All records displayed; pagination resets |

---

### TC-5314-19: Verify report export functionality with new format

**Module:** Referral Report - Export
**Priority:** P1 - High
**Pre-condition:** Referral Report contains records; export functionality is available

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Navigate to Referral Report | Report loads with export option |
| 2 | Apply filters (Department, Unit, Referral Type) | Desired subset of records is filtered |
| 3 | Export report (e.g., Excel, PDF, CSV) | Export file is generated successfully |
| 4 | Verify exported file columns | All 15 columns (including new ones) are present in the exported file |
| 5 | Verify column sequence | Column order matches the report display |
| 6 | Verify exported data | Data in export matches displayed records |
| 7 | Verify filter effect on export | Only filtered records are included in the export |

---

### TC-5314-20: Verify empty state when no referral records match filter criteria

**Module:** Referral Report - Empty State
**Priority:** P1 - High
**Pre-condition:** Referral Report is accessible; specific filter combination has no matching records

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Navigate to Referral Report | Report loads with data |
| 2 | Apply Department filter with no referrals | No matching records scenario |
| 3 | Verify empty state message | Clear message displayed indicating no records found |
| 4 | Apply Unit filter with no referrals | Empty state is displayed |
| 5 | Apply Referral Type filter with no referrals | Empty state is displayed |
| 6 | Verify no error displayed | Empty state is shown gracefully, not an error |
| 7 | Clear filters | Records reappear when filters are cleared |

---

### TC-5314-21: Verify date/time sorting works correctly in Referred Date & Time column

**Module:** Referral Report - Date Sorting
**Priority:** P1 - High
**Pre-condition:** Referral Report contains records with varying referral dates and times

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Navigate to Referral Report | Report loads with default sorting |
| 2 | Sort by Referred Date & Time ascending | Earliest referrals appear first |
| 3 | Sort by Referred Date & Time descending | Most recent referrals appear first |
| 4 | Verify time component sorting | Within same date, records are sorted by time |
| 5 | Apply date range filter | Only records within date range are displayed |
| 6 | Sort within filtered results | Sorting works correctly on filtered data |

---

### TC-5314-22: Verify Referral Type filter with Internal referrals

**Module:** Referral Report - Referral Type Filter - Internal
**Priority:** P1 - High
**Pre-condition:** Referral Report has Internal referral records

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Navigate to Referral Report | Report loads with all referrals |
| 2 | Count total records | Total count displayed |
| 3 | Apply Referral Type = "Internal" | Only Internal referrals are displayed |
| 4 | Verify Internal referrals | All displayed records show "Internal" as Referral Type |
| 5 | Verify External referrals excluded | No External referrals are displayed |
| 6 | Check Referred From/To columns | Internal referrals show intra-department/unit referrals |

---

### TC-5314-23: Verify Referral Type filter with External referrals

**Module:** Referral Report - Referral Type Filter - External
**Priority:** P1 - High
**Pre-condition:** Referral Report has External referral records

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Navigate to Referral Report | Report loads with all referrals |
| 2 | Apply Referral Type = "External" | Only External referrals are displayed |
| 3 | Verify External referrals | All displayed records show "External" as Referral Type |
| 4 | Verify Internal referrals excluded | No Internal referrals are displayed |
| 5 | Check Referred From/To columns | External referrals may show external source departments/units |

---

### TC-5314-24: Verify report performance with all columns and filters loaded

**Module:** Referral Report - Performance
**Priority:** P1 - High
**Pre-condition:** Referral Report contains a significant number of records (>500)

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Navigate to Referral Report | Measure initial page load time (< 5 seconds) |
| 2 | Measure column rendering time | All 15 columns render within acceptable time |
| 3 | Apply Department filter | Filter applies within 3 seconds |
| 4 | Apply Unit filter | Filter applies within 3 seconds |
| 5 | Apply Referral Type filter | Filter applies within 3 seconds |
| 6 | Apply all filters simultaneously | Combined filters apply within 3 seconds |
| 7 | Navigate between pages with filters | Page navigation completes within 3 seconds |
| 8 | Export filtered report | Export completes within 10 seconds |

---

### TC-5314-25: Verify Priority column reflects actual referral priority from source system

**Module:** Referral Report - Priority Data Integrity
**Priority:** P1 - High
**Pre-condition:** Referral records have priority values assigned at referral creation

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Create a referral with High priority | Referral is created with High priority |
| 2 | Navigate to Referral Report | Report loads with the new referral |
| 3 | Verify High priority displayed | Priority column shows "High" for the record |
| 4 | Create a referral with Medium priority | Referral is created with Medium priority |
| 5 | Verify Medium priority displayed | Priority column shows "Medium" for the record |
| 6 | Create a referral with Low priority | Referral is created with Low priority |
| 7 | Verify Low priority displayed | Priority column shows "Low" for the record |
| 8 | Filter by Priority (if supported) | High/Medium/Low priorities filter correctly |

---

### TC-5314-26: Verify UHID column data matches the source patient UHID

**Module:** Referral Report - UHID Data Integrity
**Priority:** P1 - High
**Pre-condition:** Patient UHIDs are defined in the patient registration system

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Register a patient with known UHID | Patient registered with specific UHID |
| 2 | Create a referral for this patient | Referral is created and linked to the patient |
| 3 | Navigate to Referral Report | Report loads |
| 4 | Locate the referral record | UHID column shows the exact patient UHID |
| 5 | Verify UHID accuracy | UHID matches the registered patient UHID exactly |
| 6 | Click on UHID (if linkable) | Navigates to patient details or shows correct patient |
| 7 | Verify UHID is not truncated | Full UHID is displayed without truncation |

---

### TC-5314-27: Verify Referred Date & Time format is consistent across all records

**Module:** Referral Report - Date/Time Format
**Priority:** P1 - High
**Pre-condition:** Referral Report has multiple records with different referral dates/times

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Navigate to Referral Report | Report loads with Referred Date & Time column |
| 2 | Check date format consistency | All records use the same date format |
| 3 | Check time format consistency | All records use the same time format |
| 4 | Verify date format matches requirement | Format is DD-MM-YYYY (or as per BH-5841 fix) |
| 5 | Verify time includes AM/PM or 24-hour | Time format is consistent (e.g., 14:30 or 02:30 PM) |
| 6 | Export report and verify format | Exported file preserves date/time format |

---

### TC-5314-28: Verify column resizing does not affect other column data

**Module:** Referral Report - Column Resizing
**Priority:** P2 - Medium
**Pre-condition:** Referral Report supports column resizing

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Navigate to Referral Report | Report loads with all 15 columns |
| 2 | Resize UHID column wider | UHID column expands, data remains intact |
| 3 | Resize a column narrower | Adjacent columns adjust; data is not lost |
| 4 | Resize Priority column | Priority values remain fully visible |
| 5 | Resize Referral Remarks column | Long remarks remain readable or show truncation indicator |
| 6 | Reset column widths (if available) | All columns return to default widths |

---

### TC-5314-29: Verify Department filter with "All Departments" shows all referrals

**Module:** Referral Report - Department Filter Default
**Priority:** P2 - Medium
**Pre-condition:** Referral Report has referrals from multiple departments

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Navigate to Referral Report | Report loads with Department filter set to "All Departments" |
| 2 | Verify no department filter applied | All referral records from all departments are displayed |
| 3 | Verify record count matches total | Record count matches total referrals in the system |
| 4 | Select a specific department | Record count decreases to only selected department |
| 5 | Reset to "All Departments" | All records return, count matches original total |

---

### TC-5314-30: Verify Unit filter with "All Units" shows all referrals for selected department

**Module:** Referral Report - Unit Filter Default
**Priority:** P2 - Medium
**Pre-condition:** Department with multiple units exists; referrals exist from all units

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Navigate to Referral Report | Report loads |
| 2 | Select a specific Department | Report filters by selected department |
| 3 | Set Unit filter to "All Units" | All referrals from all units of the selected department are displayed |
| 4 | Count total referrals for department | Count matches sum of all units |
| 5 | Select a specific Unit | Count decreases to selected unit only |
| 6 | Reset Unit to "All Units" | All unit referrals for department reappear |

---

### TC-5314-31: Verify Referral Remarks shows complete text without horizontal scroll issues

**Module:** Referral Report - Referral Remarks Display
**Priority:** P2 - Medium
**Pre-condition:** Referral Report has records with long remarks

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Create a referral with a very long remark (>200 characters) | Referral created with long remark text |
| 2 | Navigate to Referral Report | Report loads |
| 3 | Locate the referral | Long remark is visible in the Referral Remarks column |
| 4 | Verify no horizontal overflow | No horizontal scroll bar appears on the grid |
| 5 | Expand column width | Full remark text is readable |
| 6 | Verify text wrapping or truncation | Long text is handled gracefully (wrapped or truncated with indicator) |

---

### TC-5314-32: Verify UI consistency - all three new filters have consistent styling

**Module:** Referral Report - UI Consistency
**Priority:** P2 - Medium
**Pre-condition:** Referral Report is displayed

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Navigate to Referral Report | Report loads with all filters in filter bar |
| 2 | Verify filter bar layout | Department, Unit, and Referral Type filters are in a consistent row |
| 3 | Verify dropdown styling | All three dropdowns have consistent fonts, colors, and borders |
| 4 | Verify label styling | All filter labels have consistent typography |
| 5 | Verify hover/focus states | All dropdowns respond consistently to user interaction |
| 6 | Compare with existing filters | New filters match the styling of existing report filters |

---

### TC-5314-33: Verify referral records updated after enhancement retain existing data

**Module:** Referral Report - Data Migration
**Priority:** P2 - Medium
**Pre-condition:** Referral records existed before the enhancement

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Identify referrals created before enhancement | Pre-existing referral records identified |
| 2 | Navigate to Referral Report | Report loads |
| 3 | Locate a pre-existing referral | All available data fields are populated |
| 4 | Verify existing columns | SR No, Patient Name, Age, Gender, Patient Type are intact |
| 5 | Verify new columns | New columns (UHID, Priority, etc.) are populated where data exists |
| 6 | Verify new columns with no prior data | New columns show appropriate empty/null for records without new field data |

---

### TC-5314-34: Verify cross-filter interaction - Referral Type and Department filters

**Module:** Referral Report - Cross-Filter Interaction
**Priority:** P2 - Medium
**Pre-condition:** Referral Report has Internal and External referrals across multiple departments

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Navigate to Referral Report | All records displayed |
| 2 | Select Department = "Radiology" | Only Radiology referrals displayed |
| 3 | Select Referral Type = "Internal" | Only Internal Radiology referrals displayed |
| 4 | Verify count accuracy | Count reflects intersection of both filters |
| 5 | Change Department to "Cardiology" | Only Internal Cardiology referrals displayed |
| 6 | Change Referral Type to "External" | Only External Cardiology referrals displayed |
| 7 | Reset both filters | All referrals displayed again |

---

### TC-5314-35: Verify Referred From Unit and Referred To Unit are different when applicable

**Module:** Referral Report - Unit Data Validation
**Priority:** P2 - Medium
**Pre-condition:** Referral records exist with inter-unit referrals

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Navigate to Referral Report | Report loads |
| 2 | Identify an internal referral between units | Record where Referred From Unit != Referred To Unit |
| 3 | Verify Referred From Unit | Source unit is correctly displayed |
| 4 | Verify Referred To Unit | Destination unit is correctly displayed |
| 5 | Identify a same-unit referral | Record where Referred From Unit == Referred To Unit (if exists) |
| 6 | Verify both unit fields match | Same-unit referrals show identical unit names in both columns |

---

## Summary

| Priority | Count |
|----------|-------|
| P0 - Critical | 11 |
| P1 - High | 14 |
| P2 - Medium | 10 |
| **Total** | **35** |

## Test Data Requirements

1. **Referral Records with New Fields**: At least 20 referral records covering all new columns (UHID, Referral Type, Referred From Unit, Referred To Unit, Priority, Referred Date & Time, Referral Remarks)
2. **Internal Referrals**: At least 5 Internal referral records from various departments
3. **External Referrals**: At least 5 External referral records
4. **Multi-Department Data**: Referrals from at least 3 different departments
5. **Multi-Unit Data per Department**: At least 2 units per department for dependency testing
6. **Priority Variants**: Records with High, Medium, and Low priority levels
7. **Date/Time Variants**: Records with different referral dates and times spanning multiple days
8. **Long Remarks**: At least 2 referrals with remarks exceeding 200 characters
9. **Pre-existing Records**: Records created before the enhancement for data migration testing
10. **Large Dataset**: 500+ records for performance testing
11. **Filter Combination Data**: Sufficient records to test all filter combinations

## Related Tickets

- **BH-5840**: Default value "All Departments & patient type" for filters (related enhancement)
- **BH-5841**: Proper date format DD-MM-YYYY in Patient Reference Report
- **BH-5536**: Digitalization - Nursing station (related module)
- **Referral Report SQL**: `Patient Reference Report BH-5314.sql` attached to ticket
- **Referral Report Format**: `Patient Referral Report Format.xlsx` attached to ticket
