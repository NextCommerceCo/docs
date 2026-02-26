---
description: Learn about Subscription features and best practices for your store
---

# 🔃 Subscriptions Guide

## Subscriptions Overview

Subscriptions are supported natively in Next Commerce, representing the concept of an automated, periodically recurring order for a customer.&#x20;

Subscriptions can contain any combination of products and quantities from your store [**catalogue**](../../build-a-store/catalogue/), with a scheduled [**billing interval**](../../build-a-store/catalogue/add-products.md#purchase-options) configurable by any number of days, weeks, or months.

{% hint style="info" %}
A subscription can be created when a customer checks out on the storefront checkout, or via custom web sites and app experiences via the [**Admin API**](https://developers.29next.com/docs/api/admin/guides/external-checkout/#subscription-line-items).
{% endhint %}

Subscriptions may also be modified, updated, or canceled at any time to change the next renewal date, adjust billing frequency, update the products, or apply a promotion or discount to avoid cancellations.

## Subscriptions List View

All subscriptions in your store can be found by navigating to the **Subscriptions** menu. Subscriptions are listed from newest to oldest by default, and displayed along with their [**Subscription Statuses**](subscription-statuses.md).

* Choose **Filters** to refine the Subscriptions List according to a wide variety of filters.
* The **Search** bar field can find subscriptions using the subscription ID number, customer name, phone, email, or any partial match or combination.
* Active, Retrying, and Past Due subscription totals displayed at the top of the page can be selected to drill down on a filtered list of subscriptions by status.

### Subscriptions List Actions

Under the **Actions** menu the following options are available.  Select individual Subscriptions, or groups of Subscriptions, to perform the following actions:&#x20;

* **Change Payment Gateway** - Change the payment gateway on which the subscription's next renewal, and all future renewals, will be processed.<br>
* **Change Next Renewal Date** - Modify the next renewal date of one or multiple subscriptions in bulk.<br>
* **Export Subscriptions -** Choose this option to export a CSV (comma separated value) file of the Subscriptions List, with additional columns added including product, quantity, source attribution, payment methods, and more. You can also create custom [**Metadata Fields**](https://docs.29next.com/build-a-store/technical-settings/metadata-fields-and-tags) with the option to enable them on exports.<br>
* **Export Subscription Line Items** - Choose this option to export a CSV (comma separated value) file of the Subscriptions List broken down by individual subscription order [**Line Items**](https://docs.29next.com/manage/orders/order-management#order-items) in each order, listed on separate rows. This export also includes extended data per line item such as product, quantity, source attribution, payment methods, and more.<br>
* **Delete Test Subscriptions** - Bulk remove Test Subscriptions, which are similar in concept to [**Test Orders**](https://docs.29next.com/manage/orders/test-orders). This option is helpful to clean up your Subscriptions List after performing tests on new campaigns, funnels, or other workflows.
