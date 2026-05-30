# BH-4691: Creation of Receipt Voucher in Manage Voucher Page for Front Desk Users

## Issue Details

| Field | Value |
|-------|-------|
| **Issue Key** | BH-4691 |
| **Summary** | Creation of Receipt Voucher in Manage Voucher Page for Front Desk Users |
| **Type** | Story |
| **Project** | BMC HMIS (BH) |
| **Version** | V-5.1.6 |
| **Status** | Blue Deployed |
| **Labels** | P-0, PMG_V-5.1.6, PROD |
| **Priority** | Highest |

## Feature Overview

A new voucher type ("Receipt Voucher") is introduced in the Manage Voucher module to capture complete financial transaction details. This voucher type is accessible **only to Front Desk Users** and includes the following fields:

- **GL Code** (mandatory)
- **Ledger** (mandatory)
- **Amount** (mandatory)
- **Mode of Payment** (mandatory)
- **Narration** (optional)

The voucher must be saved successfully and reflected in reports/MIS.

---

## Test Cases

### TC-4691-01: Verify new Receipt Voucher type is available in Manage Voucher page for Front Desk User

**Module:** Manage Voucher - Receipt Voucher
**Priority:** P0 - Critical
**Pre-condition:** User is logged in as a Front Desk User with access to the Manage Voucher module

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Log in as a Front Desk User | Login is successful |
| 2 | Navigate to the Manage Voucher page | Page loads successfully |
| 3 | Verify the presence of "Receipt Voucher" or equivalent voucher type option | New voucher type is visible and selectable |
| 4 | Click on the Receipt Voucher option | Receipt Voucher creation form is displayed with all required fields |

---

### TC-4691-02: Verify Receipt Voucher form displays all required fields

**Module:** Manage Voucher - Receipt Voucher
**Priority:** P0 - Critical
**Pre-condition:** User is logged in as a Front Desk User and on the Receipt Voucher form

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to Manage Voucher → Receipt Voucher | Form is displayed |
| 2 | Verify GL Code field is present and labeled correctly | GL Code field is visible with appropriate label |
| 3 | Verify Ledger field is present and labeled correctly | Ledger field is visible with appropriate label |
| 4 | Verify Amount field is present and labeled correctly | Amount field is visible with appropriate label |
| 5 | Verify Mode of Payment field is present and labeled correctly | Mode of Payment field is visible with appropriate label |
| 6 | Verify Narration field is present and labeled correctly | Narration field is visible with appropriate label |

---

### TC-4691-03: Verify Receipt Voucher can be created successfully with all mandatory fields filled

**Module:** Manage Voucher - Receipt Voucher
**Priority:** P0 - Critical
**Pre-condition:** User is logged in as a Front Desk User and on the Receipt Voucher form

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to Manage Voucher → Receipt Voucher | Form is displayed |
| 2 | Enter a valid GL Code (e.g., GL-1001) | GL Code is accepted |
| 3 | Select/enter a valid Ledger value | Ledger is accepted |
| 4 | Enter a valid Amount (e.g., 5000.00) | Amount is accepted |
| 5 | Select Mode of Payment (e.g., Cash, Card, UPI, Bank Transfer) | Mode of Payment is selected |
| 6 | Optionally enter Narration text | Narration is accepted |
| 7 | Click Save / Submit | Voucher is saved successfully, confirmation message is displayed |
| 8 | Verify the voucher appears in the list | Newly created voucher is listed with correct details |

---

### TC-4691-04: Verify GL Code field is mandatory (validation)

**Module:** Manage Voucher - Receipt Voucher - Validation
**Priority:** P0 - Critical
**Pre-condition:** User is logged in as a Front Desk User and on the Receipt Voucher form

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to Manage Voucher → Receipt Voucher | Form is displayed |
| 2 | Leave GL Code field empty | Field is empty |
| 3 | Fill all other mandatory fields (Ledger, Amount, Mode of Payment) | All other fields are filled |
| 4 | Click Save / Submit | System displays validation error: GL Code is required |
| 5 | Verify voucher is NOT saved | Voucher does not appear in the list |

---

### TC-4691-05: Verify Ledger field is mandatory (validation)

**Module:** Manage Voucher - Receipt Voucher - Validation
**Priority:** P0 - Critical
**Pre-condition:** User is logged in as a Front Desk User and on the Receipt Voucher form

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to Manage Voucher → Receipt Voucher | Form is displayed |
| 2 | Fill all mandatory fields except Ledger | All fields filled except Ledger |
| 3 | Click Save / Submit | System displays validation error: Ledger is required |
| 4 | Verify voucher is NOT saved | Voucher does not appear in the list |

---

### TC-4691-06: Verify Amount field is mandatory (validation)

**Module:** Manage Voucher - Receipt Voucher - Validation
**Priority:** P0 - Critical
**Pre-condition:** User is logged in as a Front Desk User and on the Receipt Voucher form

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to Manage Voucher → Receipt Voucher | Form is displayed |
| 2 | Fill all mandatory fields except Amount | All fields filled except Amount |
| 3 | Click Save / Submit | System displays validation error: Amount is required |
| 4 | Verify voucher is NOT saved | Voucher does not appear in the list |

---

### TC-4691-07: Verify Mode of Payment field is mandatory (validation)

**Module:** Manage Voucher - Receipt Voucher - Validation
**Priority:** P0 - Critical
**Pre-condition:** User is logged in as a Front Desk User and on the Receipt Voucher form

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to Manage Voucher → Receipt Voucher | Form is displayed |
| 2 | Fill all mandatory fields except Mode of Payment | All fields filled except Mode of Payment |
| 3 | Click Save / Submit | System displays validation error: Mode of Payment is required |
| 4 | Verify voucher is NOT saved | Voucher does not appear in the list |

---

### TC-4691-08: Verify Narration field is optional

**Module:** Manage Voucher - Receipt Voucher - Validation
**Priority:** P0 - Critical
**Pre-condition:** User is logged in as a Front Desk User and on the Receipt Voucher form

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to Manage Voucher → Receipt Voucher | Form is displayed |
| 2 | Fill all mandatory fields (GL Code, Ledger, Amount, Mode of Payment) | All mandatory fields are filled |
| 3 | Leave Narration field empty | Narration is empty |
| 4 | Click Save / Submit | Voucher is saved successfully without Narration |
| 5 | Verify the voucher appears in the list | Voucher is saved with blank Narration field |

---

### TC-4691-09: Verify non-Front Desk users cannot access Receipt Voucher

**Module:** Manage Voucher - Receipt Voucher - Access Control
**Priority:** P0 - Critical
**Pre-condition:** User is logged in as a non-Front Desk role (e.g., Admin, Doctor, Nurse)

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Log in as a non-Front Desk User (e.g., Admin) | Login is successful |
| 2 | Navigate to the Manage Voucher page | Page loads successfully |
| 3 | Attempt to access or view the Receipt Voucher option | Receipt Voucher option is NOT visible OR clicking it shows an access denied message |
| 4 | Attempt to navigate directly to Receipt Voucher URL | Access is denied, error page or redirect displayed |

---

### TC-4691-10: Verify Receipt Voucher data appears in reports/MIS

**Module:** Manage Voucher - Receipt Voucher - Reports/MIS
**Priority:** P0 - Critical
**Pre-condition:** User is logged in as a Front Desk User; a Receipt Voucher has been created

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Create a Receipt Voucher with known values | Voucher is saved successfully |
| 2 | Navigate to Reports / MIS section | Reports/MIS page loads |
| 3 | Search/filter for the created Receipt Voucher | Voucher appears in the report with correct GL Code, Ledger, Amount, Mode of Payment |
| 4 | Verify all voucher field values match the created record | All details (GL Code, Ledger, Amount, Mode of Payment, Narration) match exactly |

---

### TC-4691-11: Verify Amount field accepts valid numeric values

**Module:** Manage Voucher - Receipt Voucher - Input Validation
**Priority:** P1 - High
**Pre-condition:** User is logged in as a Front Desk User and on the Receipt Voucher form

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to Manage Voucher → Receipt Voucher | Form is displayed |
| 2 | Fill all mandatory fields with valid data | All fields are valid |
| 3 | Enter Amount as a positive integer (e.g., 1000) | Amount accepted |
| 4 | Enter Amount as a decimal value (e.g., 1500.50) | Amount accepted |
| 5 | Click Save / Submit | Voucher is saved successfully |

---

### TC-4691-12: Verify Amount field rejects invalid values

**Module:** Manage Voucher - Receipt Voucher - Input Validation
**Priority:** P1 - High
**Pre-condition:** User is logged in as a Front Desk User and on the Receipt Voucher form

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to Manage Voucher → Receipt Voucher | Form is displayed |
| 2 | Fill all mandatory fields with valid data | All fields are valid |
| 3 | Enter Amount as a negative value (e.g., -500) | System displays validation error or rejects the input |
| 4 | Enter Amount as zero (0) | System displays validation error or rejects the input |
| 5 | Enter Amount as text (e.g., "abc") | System displays validation error or rejects the input |
| 6 | Verify voucher is NOT saved | Voucher does not appear in the list |

---

### TC-4691-13: Verify GL Code field accepts valid codes and rejects invalid ones

**Module:** Manage Voucher - Receipt Voucher - Input Validation
**Priority:** P1 - High
**Pre-condition:** User is logged in as a Front Desk User and on the Receipt Voucher form

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to Manage Voucher → Receipt Voucher | Form is displayed |
| 2 | Fill all other mandatory fields with valid data | All other fields are valid |
| 3 | Enter a valid GL Code from the allowed list | GL Code accepted |
| 4 | Enter an invalid/non-existent GL Code | System displays validation error or warns about invalid GL Code |
| 5 | Verify voucher is NOT saved with invalid GL Code | Voucher is not saved or warning is shown |

---

### TC-4691-14: Verify Mode of Payment dropdown contains all expected payment modes

**Module:** Manage Voucher - Receipt Voucher - UI
**Priority:** P1 - High
**Pre-condition:** User is logged in as a Front Desk User and on the Receipt Voucher form

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to Manage Voucher → Receipt Voucher | Form is displayed |
| 2 | Click on the Mode of Payment dropdown | Dropdown opens |
| 3 | Verify available payment modes | Expected modes such as Cash, Card, UPI, Bank Transfer, Cheque, NEFT/RTGS are available |
| 4 | Select each payment mode one by one | Each mode is selectable and the value is retained |
| 5 | Save voucher with each mode | Voucher is saved with the correct mode for each payment type |

---

### TC-4691-15: Verify Narration field accepts maximum character length

**Module:** Manage Voucher - Receipt Voucher - Input Validation
**Priority:** P1 - High
**Pre-condition:** User is logged in as a Front Desk User and on the Receipt Voucher form

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to Manage Voucher → Receipt Voucher | Form is displayed |
| 2 | Fill all mandatory fields | All mandatory fields are filled |
| 3 | Enter Narration with maximum allowed characters | Narration is accepted up to the limit |
| 4 | Attempt to enter text beyond the maximum limit | System prevents further input or truncates at max length |
| 5 | Save the voucher | Voucher is saved with the truncated/accepted narration |

---

### TC-4691-16: Verify Narration field accepts special characters and unicode

**Module:** Manage Voucher - Receipt Voucher - Input Validation
**Priority:** P1 - High
**Pre-condition:** User is logged in as a Front Desk User and on the Receipt Voucher form

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to Manage Voucher → Receipt Voucher | Form is displayed |
| 2 | Fill all mandatory fields | All mandatory fields are filled |
| 3 | Enter Narration with special characters (e.g., @#$%^&) | Narration accepted |
| 4 | Enter Narration with unicode/multilingual text (e.g., Hindi, regional language) | Narration accepted |
| 5 | Save the voucher | Voucher is saved successfully; special characters are stored correctly |
| 6 | Verify the voucher in the list/reports | Special characters and unicode are displayed correctly |

---

### TC-4691-17: Verify user can edit an existing Receipt Voucher

**Module:** Manage Voucher - Receipt Voucher
**Priority:** P1 - High
**Pre-condition:** User is logged in as a Front Desk User; at least one Receipt Voucher exists

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to Manage Voucher page | List of vouchers is displayed |
| 2 | Find and select an existing Receipt Voucher | Record is selected |
| 3 | Click Edit / Modify | Edit form opens with pre-filled data |
| 4 | Modify one or more fields (e.g., Amount) | Fields are editable |
| 5 | Save the changes | Voucher is updated successfully |
| 6 | Verify the changes reflect in the list and reports | Updated values are displayed correctly |

---

### TC-4691-18: Verify user can delete a Receipt Voucher

**Module:** Manage Voucher - Receipt Voucher
**Priority:** P1 - High
**Pre-condition:** User is logged in as a Front Desk User; at least one Receipt Voucher exists

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to Manage Voucher page | List of vouchers is displayed |
| 2 | Find and select a Receipt Voucher | Record is selected |
| 3 | Click Delete / Remove | Delete confirmation dialog appears |
| 4 | Confirm deletion | Voucher is deleted successfully |
| 5 | Verify the voucher is removed from the list | Voucher no longer appears in the list |
| 6 | Verify the voucher is removed from reports/MIS | Deleted voucher does not appear in any report |

---

### TC-4691-19: Verify multiple Receipt Vouchers can be created in a session

**Module:** Manage Voucher - Receipt Voucher
**Priority:** P1 - High
**Pre-condition:** User is logged in as a Front Desk User

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to Manage Voucher → Receipt Voucher | Form is displayed |
| 2 | Create first Receipt Voucher with valid data | First voucher is saved successfully |
| 3 | Navigate back to create a new Receipt Voucher | Form is reset/blank for new entry |
| 4 | Create a second Receipt Voucher with different data | Second voucher is saved successfully |
| 5 | Create a third Receipt Voucher | Third voucher is saved successfully |
| 6 | Verify all three vouchers appear in the list | All three vouchers are listed with correct details |

---

### TC-4691-20: Verify empty state message when no Receipt Vouchers exist

**Module:** Manage Voucher - Receipt Voucher - Empty State
**Priority:** P1 - High
**Pre-condition:** User is logged in as a Front Desk User; no Receipt Vouchers exist

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to Manage Voucher → Receipt Voucher | Form/list is displayed |
| 2 | Verify the list has no records | Empty state message is displayed |
| 3 | Verify empty state message is user-friendly | Message clearly indicates no vouchers found |
| 4 | Verify other voucher types still display their data | Other voucher types are not affected |

---

### TC-4691-21: Verify session timeout handling during Receipt Voucher creation

**Module:** Manage Voucher - Receipt Voucher - Error Handling
**Priority:** P1 - High
**Pre-condition:** User is in the middle of creating a Receipt Voucher; session expires

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Start filling the Receipt Voucher form | Form is displayed with partial data |
| 2 | Simulate session timeout (wait or force expire) | System detects session expiry |
| 3 | Attempt to save the voucher | System redirects to login or displays session expired message |
| 4 | Log in again | Login is successful |
| 5 | Verify no draft/unsaved data is persisted | Form data is cleared on re-login |

---

### TC-4691-22: Verify network error handling during Receipt Voucher save

**Module:** Manage Voucher - Receipt Voucher - Error Handling
**Priority:** P1 - High
**Pre-condition:** User is filling the Receipt Voucher form; network failure is simulated

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to Manage Voucher → Receipt Voucher | Form is displayed |
| 2 | Fill all mandatory fields with valid data | All fields are filled |
| 3 | Simulate network failure / disconnect | Network connection is interrupted |
| 4 | Click Save / Submit | System displays an appropriate error message (e.g., "Network error, please try again") |
| 5 | Verify the form data is retained after error | Form data remains intact so user can retry |
| 6 | Restore network and save again | Voucher is saved successfully on retry |

---

### TC-4691-23: Verify Receipt Voucher search and filter functionality

**Module:** Manage Voucher - Receipt Voucher - Search/Filter
**Priority:** P1 - High
**Pre-condition:** User is logged in as a Front Desk User; multiple Receipt Vouchers exist

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to Manage Voucher page with Receipt Vouchers listed | List is displayed |
| 2 | Search by GL Code | Only vouchers matching the GL Code are displayed |
| 3 | Search by Amount | Only vouchers matching the Amount are displayed |
| 4 | Filter by Mode of Payment (e.g., Cash only) | Only Cash mode vouchers are displayed |
| 5 | Clear all search/filter criteria | All vouchers are displayed again |

---

### TC-4691-24: Verify Receipt Voucher pagination in the list view

**Module:** Manage Voucher - Receipt Voucher - Pagination
**Priority:** P1 - High
**Pre-condition:** User is logged in as a Front Desk User; more than one page of Receipt Vouchers exists

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to Manage Voucher → Receipt Voucher list | First page of vouchers is displayed |
| 2 | Navigate to next page | Next set of vouchers is displayed |
| 3 | Navigate to previous page | Previous set of vouchers is displayed |
| 4 | Change page size | List updates to show the new page size |
| 5 | Navigate to last page | Last page of vouchers is displayed |

---

### TC-4691-25: Verify Receipt Voucher sorting functionality in list view

**Module:** Manage Voucher - Receipt Voucher - Sorting
**Priority:** P1 - High
**Pre-condition:** User is logged in as a Front Desk User; multiple Receipt Vouchers exist

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to Manage Voucher → Receipt Voucher list | List is displayed with default sorting |
| 2 | Click on Amount column header | Vouchers are sorted by Amount in ascending order |
| 3 | Click on Amount column header again | Vouchers are sorted by Amount in descending order |
| 4 | Click on Date/Created column header | Vouchers are sorted by date |
| 5 | Verify other columns are also sortable | Sorting works on relevant columns |

---

### TC-4691-26: Verify Amount field displays correct decimal formatting

**Module:** Manage Voucher - Receipt Voucher - UI
**Priority:** P2 - Medium
**Pre-condition:** User is logged in as a Front Desk User and on the Receipt Voucher form

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to Manage Voucher → Receipt Voucher | Form is displayed |
| 2 | Enter Amount as 1234567.89 | Amount is displayed formatted (e.g., 12,34,567.89) |
| 3 | Save the voucher | Voucher is saved |
| 4 | Verify amount formatting in the list view | Amount is displayed with correct currency formatting |
| 5 | Verify amount formatting in reports/MIS | Reports show formatted amount matching the saved value |

---

### TC-4691-27: Verify duplicate Receipt Voucher creation with identical data

**Module:** Manage Voucher - Receipt Voucher - Validation
**Priority:** P2 - Medium
**Pre-condition:** User is logged in as a Front Desk User; an existing Receipt Voucher is present

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Note the details of an existing Receipt Voucher | Existing voucher details recorded |
| 2 | Create a new Receipt Voucher with identical field values | New voucher is created with same data |
| 3 | Verify both vouchers exist in the list | Both vouchers appear in the list |
| 4 | Verify each voucher has a unique identifier (ID/Reference Number) | Both vouchers have distinct IDs |

---

### TC-4691-28: Verify Receipt Voucher form labels and UI text are correct

**Module:** Manage Voucher - Receipt Voucher - UI
**Priority:** P2 - Medium
**Pre-condition:** User is logged in as a Front Desk User and on the Receipt Voucher form

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to Manage Voucher → Receipt Voucher | Form is displayed |
| 2 | Verify GL Code field label | Label reads "GL Code" or equivalent |
| 3 | Verify Ledger field label | Label reads "Ledger" or equivalent |
| 4 | Verify Amount field label | Label reads "Amount" or equivalent |
| 5 | Verify Mode of Payment field label | Label reads "Mode of Payment" or equivalent |
| 6 | Verify Narration field label | Label reads "Narration" or equivalent |
| 7 | Verify mandatory field indicators | Mandatory fields are marked with asterisk (*) or similar indicator |

---

### TC-4691-29: Verify Cancel button on Receipt Voucher form

**Module:** Manage Voucher - Receipt Voucher - UI
**Priority:** P2 - Medium
**Pre-condition:** User is logged in as a Front Desk User and on the Receipt Voucher form with unsaved data

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to Manage Voucher → Receipt Voucher | Form is displayed |
| 2 | Fill some fields with data | Form has partial data |
| 3 | Click Cancel / Back | Confirmation dialog appears (if unsaved changes) |
| 4 | Confirm cancellation | User is navigated away from the form |
| 5 | Verify no partial data was saved | Voucher does not appear in the list |

---

### TC-4691-30: Verify Receipt Voucher is accessible from mobile/smaller viewport

**Module:** Manage Voucher - Receipt Voucher - Responsive UI
**Priority:** P2 - Medium
**Pre-condition:** User is accessing the application on a mobile device or smaller viewport

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Resize browser to mobile/tablet viewport | Viewport is adjusted |
| 2 | Navigate to Manage Voucher → Receipt Voucher | Form is displayed |
| 3 | Verify all form fields are accessible | All fields are visible and usable |
| 4 | Verify form layout adapts to smaller screen | Fields stack vertically, no horizontal overflow |
| 5 | Test save functionality | Voucher saves correctly on mobile viewport |

---

### TC-4691-31: Verify concurrent editing of the same Receipt Voucher by multiple users

**Module:** Manage Voucher - Receipt Voucher - Data Integrity
**Priority:** P2 - Medium
**Pre-condition:** Two Front Desk Users are logged in simultaneously

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | User A opens a Receipt Voucher for editing | Form is displayed with existing data |
| 2 | User B opens the same Receipt Voucher for editing | Form is displayed (read-only or with conflict warning) |
| 3 | User A modifies and saves the voucher | Voucher is saved by User A |
| 4 | User B attempts to save the voucher | System handles conflict gracefully (error, warning, or auto-refresh) |
| 5 | Verify the final saved state is consistent | Only one version of the record exists with the latest changes |

---

### TC-4691-32: Verify Receipt Voucher creation with maximum valid Amount value

**Module:** Manage Voucher - Receipt Voucher - Boundary Testing
**Priority:** P2 - Medium
**Pre-condition:** User is logged in as a Front Desk User and on the Receipt Voucher form

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to Manage Voucher → Receipt Voucher | Form is displayed |
| 2 | Fill all mandatory fields | All mandatory fields are filled |
| 3 | Enter the maximum allowed Amount value | Amount accepted |
| 4 | Save the voucher | Voucher is saved successfully |
| 5 | Verify the voucher appears in the list with correct amount | Amount matches the entered value exactly |

---

### TC-4691-33: Verify audit trail / activity log for Receipt Voucher actions

**Module:** Manage Voucher - Receipt Voucher - Audit
**Priority:** P2 - Medium
**Pre-condition:** User is logged in as a Front Desk User; Receipt Vouchers have been created/modified

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Create a new Receipt Voucher | Voucher is created |
| 2 | Modify an existing Receipt Voucher | Voucher is modified |
| 3 | Navigate to audit log / activity history | Audit log is accessible |
| 4 | Verify create action is logged | Create action shows timestamp, user, and voucher details |
| 5 | Verify modify action is logged | Modify action shows timestamp, user, old and new values |

---

### TC-4691-34: Verify Receipt Voucher creation date/time is captured correctly

**Module:** Manage Voucher - Receipt Voucher
**Priority:** P2 - Medium
**Pre-condition:** User is logged in as a Front Desk User

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Note the current system date and time | Current date/time is noted |
| 2 | Create a new Receipt Voucher | Voucher is created |
| 3 | Verify the created voucher shows the correct date/time | Voucher date/time matches the system time |
| 4 | Verify the voucher in reports/MIS | Report shows the correct created date/time |

---

## Summary

| Priority | Count |
|----------|-------|
| P0 - Critical | 17 |
| P1 - High | 25 |
| P2 - Medium | 16 |
| **Total** | **58** |

## Test Data Requirements

1. **Front Desk User account** with access to Manage Voucher module
2. **Non-Front Desk User accounts** (Admin, Doctor, Nurse) to verify access restriction
3. **Valid GL Codes** from the application's GL Code master
4. **Valid Ledger accounts** for mapping (ensure no null values in dropdown)
5. **Multiple payment modes**: Cash, Card, UPI, Bank Transfer, Cheque, NEFT/RTGS
6. **Various Amount values**: positive integers, decimals, maximum value, zero, negative values
7. **Special characters and unicode text** for Narration field testing
8. **Existing Receipt Vouchers** for edit/delete/search/filter/pagination testing
9. **Large dataset** (>20 records) for pagination and performance testing
10. **Contact details for non-citizen flow**: valid 10-digit mobile numbers, recipient names
11. **Receipt Vouchers with null patient** for null-safe rendering testing
12. **Receipt Vouchers with citizen** for HealthCardRePrint.jrxml template testing
13. **Used/linked Receipt Vouchers** for cancellation restriction testing
14. **UPI payment configuration** (active) for UPI refund flow testing
15. **Postman/curl** or equivalent API testing tool for API-level test cases

## Acceptance Criteria Mapping

| AC | Test Cases |
|----|------------|
| AC-1: New voucher type available in Manage Voucher page | TC-4691-01, TC-4691-28, TC-4691-49 |
| AC-2a: GL Code field present and mandatory | TC-4691-02, TC-4691-04, TC-4691-13, TC-4691-46 |
| AC-2b: Ledger field present and mandatory | TC-4691-02, TC-4691-05, TC-4691-47, TC-4691-53 |
| AC-2c: Amount field present and mandatory | TC-4691-02, TC-4691-06, TC-4691-11, TC-4691-12, TC-4691-32, TC-4691-56 |
| AC-2d: Mode of Payment field present and mandatory | TC-4691-02, TC-4691-07, TC-4691-14 |
| AC-2e: Narration field present and optional | TC-4691-02, TC-4691-08, TC-4691-15, TC-4691-16 |
| AC-3: All mandatory fields validated | TC-4691-04, TC-4691-05, TC-4691-06, TC-4691-07, TC-4691-08, TC-4691-37, TC-4691-39 |
| AC-4: Access restricted to Front Desk Users only | TC-4691-09 |
| AC-5: Voucher saved and reflected in reports/MIS | TC-4691-03, TC-4691-10, TC-4691-17, TC-4691-33 |
| Non-citizen flow (from dev discussion) | TC-4691-35, TC-4691-36, TC-4691-37, TC-4691-38, TC-4691-39, TC-4691-52 |
| Print / Jasper templates | TC-4691-40, TC-4691-41, TC-4691-48 |
| Cancellation flow (per Khushi Garg) | TC-4691-42, TC-4691-43, TC-4691-44 |
| Null-safe handling | TC-4691-45, TC-4691-47, TC-4691-48 |
| Regression / deployment | TC-4691-49, TC-4691-50 |
| API testing | TC-4691-57, TC-4691-58 |

## Related Tickets

- **BH-4691** (this issue): Parent story — Receipt Voucher for Front Desk Users
- **V-5.1.6**: Release version containing this feature
- **BH-5091**: Bug — Account dropdown showing Null (addressed in TC-4691-47)
- **BH-5120**: Related blocking issue
- **BH-5212**: UPI payment flow — related to non-citizen contact capture (TC-4691-36, TC-4691-38)
- **BH-5323**: Related blocking issue
- **BH-5332, BH-5336, BH-5337, BH-5338**: QA blocking issues
- **BH-5345, BH-5346, BH-5351**: QA blocking issues
- **BH-5363, BH-5377**: QA blocking issues

### TC-4691-35: Verify Receipt Voucher can be created WITHOUT selecting a citizen/patient

**Module:** Manage Voucher - Receipt Voucher - Non-Citizen Flow
**Priority:** P0 - Critical
**Pre-condition:** User is logged in as a Front Desk User and on the Receipt Voucher form

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to Manage Voucher → Receipt Voucher | Form is displayed |
| 2 | Do NOT select any citizen/patient | Citizen/patient field is left empty or "No citizen selected" is indicated |
| 3 | Fill all mandatory fields (GL Code, Ledger, Amount, Mode of Payment) | All mandatory fields are filled |
| 4 | Verify that mobile number and name fields appear when no citizen is selected | Contact fields are visible and editable |
| 5 | Enter mobile number and name | Contact details are accepted |
| 6 | Save the voucher | Voucher is saved successfully without citizen dependency |
| 7 | Verify the voucher appears in the list and reports | Voucher is listed with correct data and no citizen info |

---

### TC-4691-36: Verify mobile number and name are captured when citizen is NOT selected

**Module:** Manage Voucher - Receipt Voucher - UPI / Contact Capture
**Priority:** P0 - Critical
**Pre-condition:** User is logged in as a Front Desk User; on the Receipt Voucher form with no citizen selected

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to Manage Voucher → Receipt Voucher | Form is displayed |
| 2 | Confirm no citizen is selected | Contact fields (mobile number, name) are visible |
| 3 | Enter a valid 10-digit mobile number | Mobile number is accepted |
| 4 | Enter recipient name | Name is accepted |
| 5 | Select UPI as Mode of Payment | UPI is selected |
| 6 | Complete and save the voucher | Voucher is saved; payment link can be sent to captured mobile number |
| 7 | Verify the captured contact details in the voucher record | Mobile number and name are stored and displayed correctly |

---

### TC-4691-37: Verify Receipt Voucher creation fails gracefully when citizen is NOT selected and contact fields are empty

**Module:** Manage Voucher - Receipt Voucher - Validation (Non-Citizen Flow)
**Priority:** P0 - Critical
**Pre-condition:** User is logged in as a Front Desk User; on Receipt Voucher form with no citizen selected

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to Manage Voucher → Receipt Voucher | Form is displayed |
| 2 | Do not select a citizen | Contact fields (mobile number, name) appear |
| 3 | Leave mobile number and name fields empty | Fields are empty |
| 4 | Fill all other mandatory fields | All other mandatory fields are filled |
| 5 | Attempt to save the voucher | System displays validation error: mobile number/name are required when no citizen is selected |
| 6 | Verify voucher is NOT saved | Voucher does not appear in the list |

---

### TC-4691-38: Verify UPI payment flow works for Receipt Voucher without citizen

**Module:** Manage Voucher - Receipt Voucher - UPI Payment Flow
**Priority:** P0 - Critical
**Pre-condition:** User is logged in as a Front Desk User; UPI payment gateway is configured and active

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to Manage Voucher → Receipt Voucher | Form is displayed |
| 2 | Leave citizen/patient unselected | Contact fields are visible |
| 3 | Enter mobile number and name | Contact details entered |
| 4 | Select Mode of Payment as UPI | UPI is selected |
| 5 | Fill GL Code, Ledger, Amount | All fields filled |
| 6 | Initiate payment / save voucher | UPI payment flow is triggered using captured contact details |
| 7 | Verify no "citizen not found" error occurs | UPI flow completes without citizen dependency errors |
| 8 | Verify payment reference is captured in voucher record | Payment reference/link is stored with the voucher |

---

### TC-4691-39: Verify mobile number validation rejects invalid formats

**Module:** Manage Voucher - Receipt Voucher - Input Validation (Non-Citizen Flow)
**Priority:** P1 - High
**Pre-condition:** User is logged in as a Front Desk User; on Receipt Voucher form with no citizen selected

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to Manage Voucher → Receipt Voucher | Form is displayed |
| 2 | Leave citizen unselected | Contact fields are visible |
| 3 | Enter mobile number with less than 10 digits (e.g., 98765) | System displays validation error |
| 4 | Enter mobile number with alphabetic characters (e.g., 98765ABCD) | System rejects invalid characters |
| 5 | Enter mobile number with special characters (e.g., 98765@1234) | System rejects invalid characters |
| 6 | Enter a valid 10-digit mobile number | Mobile number is accepted |
| 7 | Verify save is blocked until valid mobile number is provided | Voucher cannot be saved with invalid mobile number |

---

### TC-4691-40: Verify print functionality for Receipt Voucher without citizen (GeneralReceipt.jrxml)

**Module:** Manage Voucher - Receipt Voucher - Print
**Priority:** P0 - Critical
**Pre-condition:** User is logged in as a Front Desk User; a Receipt Voucher without citizen has been created

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Create a Receipt Voucher without selecting a citizen | Voucher is saved |
| 2 | Click Print on the voucher row | Print/preview is initiated |
| 3 | Verify the printed voucher/receipt does not contain patient/citizen details | Receipt template (GeneralReceipt) is used — no patient info sections |
| 4 | Verify GL Code, Ledger, Amount, Mode of Payment, Narration, and contact details are present | All financial details and captured contact info appear on the printed receipt |
| 5 | Verify no "null" or blank patient placeholders appear | Receipt handles missing patient data gracefully without showing null values |

---

### TC-4691-41: Verify print functionality for Receipt Voucher WITH citizen (HealthCardRePrint.jrxml)

**Module:** Manage Voucher - Receipt Voucher - Print
**Priority:** P0 - Critical
**Pre-condition:** User is logged in as a Front Desk User; a Receipt Voucher linked to a citizen has been created

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Create a Receipt Voucher with a citizen selected | Voucher is saved with citizen linked |
| 2 | Click Print on the voucher row | Print/preview is initiated |
| 3 | Verify the printed voucher/receipt contains patient/citizen details | Receipt template (HealthCardRePrint or equivalent) includes patient info |
| 4 | Verify all financial details are correct | GL Code, Ledger, Amount, Mode of Payment, Narration all match |
| 5 | Verify patient details are accurate | Patient name, ID, and relevant info match the selected citizen |

---

### TC-4691-42: Verify Receipt Voucher can be cancelled

**Module:** Manage Voucher - Receipt Voucher - Cancellation
**Priority:** P1 - High
**Pre-condition:** User is logged in as a Front Desk User; at least one Receipt Voucher exists

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to Manage Voucher page | List of vouchers is displayed |
| 2 | Find and select a Receipt Voucher | Record is selected |
| 3 | Initiate cancel action | Cancellation confirmation popup is displayed |
| 4 | Confirm cancellation | Voucher is cancelled successfully |
| 5 | Verify cancelled voucher status in the list | Voucher is marked as "Cancelled" or equivalent status |
| 6 | Verify cancelled voucher behavior in reports | Cancelled voucher is reflected appropriately (hidden, struck-through, or marked cancelled) |

---

### TC-4691-43: Verify cancel action on Receipt Voucher shows confirmation popup

**Module:** Manage Voucher - Receipt Voucher - Cancellation UI
**Priority:** P1 - High
**Pre-condition:** User is logged in as a Front Desk User; at least one Receipt Voucher exists

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to Manage Voucher page | List is displayed |
| 2 | Click Cancel on a Receipt Voucher | Confirmation popup/dialog appears |
| 3 | Verify popup text clearly states the action | Popup mentions "cancel" and provides context |
| 4 | Verify Cancel/No/Close option in the popup | User can abort the action |
| 5 | Verify Confirm/Yes option in the popup | User can proceed with cancellation |
| 6 | Click Cancel on the popup | Popup closes, no action taken |
| 7 | Click Confirm on the popup | Cancellation proceeds |

---

### TC-4691-44: Verify cancellation is NOT allowed for already-used/linked Receipt Vouchers

**Module:** Manage Voucher - Receipt Voucher - Cancellation Validation
**Priority:** P1 - High
**Pre-condition:** User is logged in as a Front Desk User; a Receipt Voucher has been used in another transaction

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Identify a Receipt Voucher that has been linked/used in another process | Voucher is identified |
| 2 | Attempt to cancel the voucher | System displays validation error or disables cancel action |
| 3 | Verify voucher remains active | Voucher status is unchanged |

---

### TC-4691-45: Verify Receipt Voucher list displays correctly when patient info is null

**Module:** Manage Voucher - Receipt Voucher - Null Patient Handling
**Priority:** P1 - High
**Pre-condition:** User is logged in as a Front Desk User; at least one Receipt Voucher without patient exists

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Create a Receipt Voucher without selecting a citizen | Voucher is saved |
| 2 | Navigate to the voucher list page (voucher/page API) | List is displayed |
| 3 | Verify the voucher appears without errors | Null-safe rendering — no "null" text, no blank placeholders, no NPE |
| 4 | Verify patient-related columns show appropriate empty state | Columns display dashes, "N/A", or are hidden rather than "null" |
| 5 | Verify contact name and mobile number are displayed correctly | Captured contact details are visible in the list |

---

### TC-4691-46: Verify GL Code dropdown shows only active/valid GL codes

**Module:** Manage Voucher - Receipt Voucher - Data Integrity
**Priority:** P1 - High
**Pre-condition:** User is logged in as a Front Desk User and on the Receipt Voucher form

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to Manage Voucher → Receipt Voucher | Form is displayed |
| 2 | Open the GL Code dropdown | Dropdown shows available GL codes |
| 3 | Verify no null/inactive GL codes appear | Dropdown contains only valid, active GL codes |
| 4 | Verify GL Code dropdown does not show "Null" as a selectable option | "Null" string is not a selectable value |
| 5 | Select a GL code and save | Voucher is saved with the selected GL code |

---

### TC-4691-47: Verify Account/Ledger dropdown does not show null values

**Module:** Manage Voucher - Receipt Voucher - Bug Regression (BH-5091 related)
**Priority:** P0 - Critical
**Pre-condition:** User is logged in as a Front Desk User and on the Receipt Voucher form

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to Manage Voucher → Receipt Voucher | Form is displayed |
| 2 | Open the Ledger/Account dropdown | Dropdown is populated |
| 3 | Verify no "null" or empty values appear in the dropdown | All options are valid ledger names/codes |
| 4 | Select a ledger from the dropdown | Ledger is selected and retained |
| 5 | Save the voucher | Voucher is saved successfully without null-related errors |

---

### TC-4691-48: Verify print voucher page loads correctly for Receipt Vouchers with null patient

**Module:** Manage Voucher - Receipt Voucher - Print API Regression
**Priority:** P1 - High
**Pre-condition:** User is logged in as a Front Desk User; a Receipt Voucher without patient exists

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to the print voucher page for a non-citizen Receipt Voucher | Print page loads |
| 2 | Verify no NPE (NullPointerException) or runtime errors occur | Page renders successfully |
| 3 | Verify the GeneralReceipt template is selected/used | Correct receipt template is displayed |
| 4 | Verify all financial fields are populated | GL Code, Ledger, Amount, Mode of Payment all display |
| 5 | Verify contact details (name, mobile) are displayed | Captured contact info appears on the receipt |
| 6 | Verify patient fields are absent or gracefully handled | No null placeholders, no broken sections |

---

### TC-4691-49: Verify Receipt Voucher accessible in Blue environment post-deployment

**Module:** Manage Voucher - Receipt Voucher - Blue Deployment Verification
**Priority:** P0 - Critical
**Pre-condition:** BH-4691 is deployed to Blue environment; user has Blue environment access

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Log into the Blue environment | Login is successful |
| 2 | Navigate to Manage Voucher page | Page loads (HTTP 200, no 404) |
| 3 | Verify Receipt Voucher type is available | Receipt Voucher option is visible |
| 4 | Create a test Receipt Voucher | Voucher is saved successfully |
| 5 | Verify the voucher appears in the list | Newly created voucher is listed |
| 6 | Verify print functionality | Print page loads without errors |
| 7 | Verify cancellation functionality | Cancel action works correctly |

---

### TC-4691-50: Verify no regression on existing Manage Voucher module features

**Module:** Manage Voucher - Regression
**Priority:** P0 - Critical
**Pre-condition:** User is logged in as a Front Desk User; existing voucher types (non-Receipt) exist

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to Manage Voucher page | Page loads with all existing voucher types |
| 2 | Create a voucher using an existing voucher type (e.g., Health Card) | Existing voucher creation works unchanged |
| 3 | Print a voucher using an existing type | Print functionality unchanged |
| 4 | Cancel a voucher using an existing type | Cancellation workflow unchanged |
| 5 | Navigate voucher history/list for existing types | All existing features function correctly |
| 6 | Verify the existing voucher types are not affected by the new Receipt Voucher code | No side effects or regressions |

---

### TC-4691-51: Verify Figma design compliance for Receipt Voucher form (IPD node-id 60555-51157)

**Module:** Manage Voucher - Receipt Voucher - UI/UX Compliance
**Priority:** P2 - Medium
**Pre-condition:** Figma design link is accessible; Receipt Voucher form is built

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Open Figma design: https://www.figma.com/design/TFu7Es4Dcz5p7EVMltHpEq/IPD?node-id=60555-51157 | Design is displayed |
| 2 | Compare form layout with Figma design | All fields are positioned as per design |
| 3 | Compare field labels with Figma | Labels match the design specification |
| 4 | Compare mandatory field indicators | Asterisks/indicators match design |
| 5 | Compare button placement and styling | Submit/Save/Cancel buttons match design |
| 6 | Compare spacing, font sizes, and colors | UI matches design within acceptable tolerance |

---

### TC-4691-52: Verify refund flow works for Receipt Voucher created without citizen (UPI)

**Module:** Manage Voucher - Receipt Voucher - Refund Flow
**Priority:** P1 - High
**Pre-condition:** User is logged in as a Front Desk User; a Receipt Voucher was created with UPI and no citizen

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Identify a Receipt Voucher created without citizen using UPI payment | Voucher is identified |
| 2 | Initiate refund process for this voucher | Refund form/flow is accessible |
| 3 | Verify captured mobile number is available for refund processing | Mobile number from the contact fields is used for refund communication |
| 4 | Complete refund | Refund is processed successfully |
| 5 | Verify refund status is updated on the voucher | Voucher reflects refund status |

---

### TC-4691-53: Verify Ledger field dropdown when creating Receipt Voucher with and without citizen

**Module:** Manage Voucher - Receipt Voucher - Ledger Field
**Priority:** P1 - High
**Pre-condition:** User is logged in as a Front Desk User and on the Receipt Voucher form

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to Manage Voucher → Receipt Voucher | Form is displayed |
| 2 | Select a citizen | Citizen is selected |
| 3 | Open the Ledger dropdown | Ledger values are available |
| 4 | Remove the citizen selection | Citizen is deselected |
| 5 | Open the Ledger dropdown again | Ledger values are available — no citizen dependency |
| 6 | Verify ledgers available are the same in both scenarios | No difference in ledger options based on citizen selection |
| 7 | Save voucher without citizen | Voucher is saved with selected ledger |

---

### TC-4691-54: Verify Receipt Voucher list page handles large datasets without performance degradation

**Module:** Manage Voucher - Receipt Voucher - Performance
**Priority:** P2 - Medium
**Pre-condition:** User is logged in as a Front Desk User; 100+ Receipt Vouchers exist in the system

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to Manage Voucher page | Page loads within acceptable time (<3 seconds) |
| 2 | Load the first page of voucher list | Page renders with pagination |
| 3 | Switch between OPD and IPD tabs (if applicable) | Tab switching is responsive |
| 4 | Apply a search filter | Results are returned quickly (<2 seconds) |
| 5 | Navigate through multiple pages | Pagination works smoothly |
| 6 | Monitor browser console for performance warnings | No excessive API calls or N+1 query issues |

---

### TC-4691-55: Verify keyboard navigation through Receipt Voucher form

**Module:** Manage Voucher - Receipt Voucher - Accessibility
**Priority:** P2 - Medium
**Pre-condition:** User is logged in as a Front Desk User and on the Receipt Voucher form

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to Manage Voucher → Receipt Voucher | Form is displayed |
| 2 | Press Tab to move through form fields | Focus moves logically through fields |
| 3 | Navigate through all mandatory fields | All fields are keyboard-accessible |
| 4 | Navigate to Save/Submit button | Focus reaches the button |
| 5 | Press Enter on the Save button | Voucher is submitted |
| 6 | Press Escape in any field | Appropriate behavior (close, cancel, no-op) |
| 7 | Verify focus indicators are visible | Focus ring is clearly visible on all interactive elements |

---

### TC-4691-56: Verify Amount field precision is handled correctly (decimal places)

**Module:** Manage Voucher - Receipt Voucher - Input Validation
**Priority:** P1 - High
**Pre-condition:** User is logged in as a Front Desk User and on the Receipt Voucher form

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to Manage Voucher → Receipt Voucher | Form is displayed |
| 2 | Fill all mandatory fields | Fields are filled |
| 3 | Enter Amount as 100.123 (more than 2 decimal places) | System either accepts with precision or truncates to allowed decimal places |
| 4 | Enter Amount as 9999999.99 | Amount is accepted |
| 5 | Save and verify in list | Amount is stored and displayed correctly |
| 6 | Verify in reports/MIS | Amount matches exactly |

---

### TC-4691-57: Verify Receipt Voucher creation via API with all valid fields

**Module:** Manage Voucher - Receipt Voucher - API Testing
**Priority:** P1 - High
**Pre-condition:** API testing tool (Postman/curl) is available; valid API credentials/keys are configured

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Construct POST request to insert-health-card-voucher API | API endpoint is called |
| 2 | Include all mandatory fields: GL Code, Ledger, Amount, Mode of Payment | All fields included in request body |
| 3 | Include optional fields: Narration, (optional) patient info | Optional fields included |
| 4 | Include contact details (mobile, name) when no citizen | Contact info in request |
| 5 | Send request | API returns 200/201 with voucher ID |
| 6 | Verify response contains the created voucher | Voucher data returned matches request |
| 7 | Verify API returns 400 for missing mandatory fields | Error response with field-level validation messages |

---

### TC-4691-58: Verify API returns correct data for Receipt Vouchers without patient on list endpoint

**Module:** Manage Voucher - Receipt Voucher - API Testing
**Priority:** P1 - High
**Pre-condition:** API testing tool is available; Receipt Vouchers without patient exist

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Call GET voucher/page API | API returns paginated list |
| 2 | Identify Receipt Vouchers without patient in the response | Null-safe response — no "null" string in patient fields |
| 3 | Verify contact details are present for non-citizen vouchers | Mobile number and name appear in the response |
| 4 | Verify financial fields (GL Code, Ledger, Amount, Mode of Payment) are correct | All financial data matches |
| 5 | Verify no NPE or errors in API response | API returns 200 with valid JSON |

---

## Flagged Questions / Ambiguities

1. **Narration field**: The acceptance criteria says "All fields should be mandatory (except Narration, if optional as per business need)" — confirmation needed on whether Narration is truly optional or has a max length limit.
2. **GL Code validation**: Is there a predefined list of valid GL Codes, or can users enter any code? (TC-4691-13 assumes a validated list.)
3. **Duplicate voucher handling**: Should the system prevent creating vouchers with identical values across all fields? (TC-4691-27 assumes duplicates are allowed with unique IDs.)
4. **Edit permissions**: Can Front Desk Users edit and delete their own vouchers, or only create? Need clarification on lifecycle management.
5. **Concurrent editing**: How should the system handle two users editing the same voucher simultaneously?
