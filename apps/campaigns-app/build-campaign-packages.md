---
description: Set up the sellable items for your custom checkouts and upsell paths
---

# Build Campaign Packages

Campaigns App maps configurable **Packages** to the items for sale on your external custom checkout flow.  A **Package** can be understood as simply a Product + Quantity + Price + (optionally) a Subscription schedule and a recurring price point.

Each Package carries a unique ID that will be referenced on the Campaigns API.

{% hint style="info" %}
The [**Campaigns API**](https://developers.nextcommerce.com/docs/api/campaigns/) reference guide is a useful resource for developers.
{% endhint %}

Packages can be configured as one-time purchases, or subscriptions.

## Add Campaign Packages

From the Campaigns App main list view, click on your campaign name, or choose "View". &#x20;

{% hint style="info" %}
Hint - you can pin your most important campaigns to the top of this list view.
{% endhint %}

Next, select **Packages -** then **Add Package** and configure the following values:

* **Package Name** - create a reference name for the package
* **Product** - select the product to assign to the package.  For products with multiple variants you can automatically create packages for every variant at this step, or opt to add them individually.
* **Quantity** - define the quantity of the product the package will sell&#x20;
* **Package Price** - enter the price that will be charged to the customer for the package.  For multi-quantity packages the per unit price is shown here.  The package per unit price must be divisible to two digits (.00)
* **Retail Price** - (optional) enter the full retail price, or "compare at" price of the item, before any discounts.

{% hint style="warning" %}
For Campaigns using multiple currencies, your Package will automatically be assigned prices in all sub-currencies based on the daily [**foreign exchange rates**](../../start-here/get-started/add-locations-and-languages.md#currencies). Ensure that your underlying products and shipping methods include pricing records in all currencies you plan to sell in.
{% endhint %}

* **Package is Subscription** (yes/no)? - if the package should trigger a recurring order, select this checkbox&#x20;
  * **Interval -** choose the billing interval (days, weeks, months) to use for each recurring billing cycle
  * **Interval Count -** enter the number of days / weeks / months for each recurring cycle (e.g. 30 days)
  * **Recurring Price** - enter the price for subscription renewals.  This can be the same price as the Package Price (initial price) or a different price. &#x20;
* **Image** - by default the product's image from the [**store catalogue**](../../build-a-store/catalogue/) will be assigned to the package, but additional images can be uploaded and added to the package.&#x20;

When all fields are configured - **Save.**

### Add Shipping Methods

Campaigns selling physical products require a Shipping Method(s) to be used on orders. &#x20;

{% hint style="info" %}
The [**Shipping Methods**](../../start-here/get-started/fulfillment-settings.md#shipping-methods) available in Campaigns App correspond to the methods set up on your store's [**Fulfillment Settings**](../../start-here/get-started/fulfillment-settings.md#set-up-shipping-methods).  It's important to create at least one shipping method and price in your store during the store setup process.
{% endhint %}

Choose **Add Shipping Method** to create one or more shipping methods and prices for your Campaign.  Note - you may use multiple methods, or the same method multiple times, with different price points.  Price points are fully customizable.

When all fields are configured - **Save.**
