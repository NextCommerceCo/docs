---
description: View and Edit open customer cart sessions
---

# Open Carts

## Open Carts

Open carts represent shopping sessions in progress by customers on your store, which have not yet been submitted as purchases.  Customers who have not yet purchased are classified as **Leads.**

An Open Cart is marked as an **Abandoned Cart** session after 30 minutes if no order has been placed.

{% hint style="info" %}
The **Abandoned Carts** event can trigger a [**webhook**](../../build-a-store/technical-settings/configure-webhooks.md) to fire, notifying external platforms such as [**Klaviyo**](../../apps/klaviyo.md) to sync the customer and cart contents data for use in automations and remarketing flows.&#x20;
{% endhint %}

### View Open Carts

Access the **Open Carts** list view from the **Orders** menu.  The **Open Carts** list view can be filtered by search parameters, or a wide variety of **Filters**. &#x20;

Choose **Actions > Export...** to export the filtered list of open carts or open cart line items to CSV.

The **Open Carts** list displays carts created on the storefront, as well as carts created programmatically on custom web sites and marketing funnels via the [**Carts API**](https://developers.29next.com/docs/api/admin/guides/external-checkout/#create-cart\\)**.**&#x20;

Using the **Carts API** the Open Carts list can also be queried programmatically, for example to allow a third party application or service to import open carts for remarketing purposes.

{% hint style="info" %}
More details on managing [**Customer Carts**](../customers/)
{% endhint %}
