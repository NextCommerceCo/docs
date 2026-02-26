---
description: Set up metadata fields and Tags to extend your data model
---

# Metadata Fields & Tags

## Metadata

Define custom metadata fields for use on the [**Admin API**](https://developers.29next.com/docs/api/admin/), [**Webhooks**](configure-webhooks.md), [**Checkout Links**](../../manage/customers/checkout-links.md#attribution-parameters), and manual data exports.

From the Metadata Settings view, choose **Add Metadata Definition** to define custom fields and attach them to objects in your store's database. &#x20;

First, define a **Name** for your custom metadata definition. Then, choose the **Object** it should be associated to from the displayed options:

* Order
* Customer
* Attribution
* Product
* Dispute

Define a **Metadata Key** to use to pass custom values, and define the metadata **Type:**

* Text
* Integer
* Decimal
* Rich Text
* Multi Text
* File
* Boolean

**Exports & Search**

Select the options to add the metadata field as a column to data Exports, and enable the metadata field in reports and list view search Filters.

#### Validation

Depending on the metadata Type selected, you may be prompted to optionally input field validation parameters.

Choose **Save Changes.**&#x20;

{% hint style="warning" %}
Metadata Validation restricts field input globally, including on the Admin API. Ensure your configured validation settings accommodate all of your expected scenarios, or you may experience unexpected input validation errors.&#x20;
{% endhint %}

Via the [**Admin API**](https://developers.29next.com/docs/api/admin/), you can now send or read values in your custom defined metadata fields, and view structured metadata on Webhooks and on data export&#x73;**.**&#x20;

## Tags

From the **Settings > Tags** page, you can add, edit, or delete Tags in your store.  Tags are used to apply to [**Orders**](../../manage/orders/#tags), [**Customers**](../../manage/customers/#tags), or [**Support Tickets**](../../manage/support.md#support-ticket-macros-setup), to mark and segment each type of data for use in searches, reporting and analytics.  Examples include the [**Support Tickets by Tag**](../../analytics/support-ticket-reports.md#support-by-tag), and [**Orders by Tag**](../../analytics/orders-reports.md#orders-by-tag) reports.

Optionally, you can create new tags by free-typing a new Tag in the Tags section of a Customer Detail, or Order Detail view, or within a Support Ticket's Tags field.
