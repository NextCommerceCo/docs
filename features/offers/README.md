---
description: Create customized discounts, incentives, and coupon codes
---

# 🛍️ Offers Guide

**Offers** are customizable, incentive-based discounts. Using Offers, your customers can receive special discounts, use coupon codes, and get volume pricing on items for sale in your store or on your marketing funnels.  Offers can also be applied when creating orders over the Admin API.

## Understanding Offers

Using Offers you can create custom pricing and incentives for your customers, and apply rules to restrict their usage to certain scenarios and time frames.  Offers are split into two **Offer Types:**

* **Site Offers:** Offers that apply to customer carts in your [**Storefront**](../../build-a-store/storefront/) checkout, or on carts created over the [**Admin API**](https://developers.29next.com/docs/api/admin/) or [**Campaigns API**](https://developers.29next.com/docs/api/campaigns/).
* **Voucher Offers:**  Offers that are limited to being applied using a Coupon Code.  Voucher Offers may also be referred to as Coupon or Promo Code Offers.&#x20;

Offers have a defined Currency, to preserve pricing consistency and account for variations in currency units between various locales.

Offers have Priorities, which govern the order in which they are applied to a customer's cart or order, with the higher priority value taking precedence.

Offers can be Exclusive, meaning they cannot be combined with other Offers.

Offers that are non-Exclusive can be Combined with other Offers.

{% hint style="info" %}
**Tip:** You can attach one or more Offers to a single Coupon Code, to customize the discount logic that will apply with a single code.

This is useful for one-off promotions where you want to apply complex logic, such as "Buy 2, Get 1 Free" + "Free Shipping" to a single coupon code that a customer can add to their cart.

Applying coupon codes directly from an "Add to Cart" button on the Storefront or Funnels is easy using [**Cart JS API.**](../../build-a-store/technical-settings/cart-js-api.md#button-actions)
{% endhint %}

### **Reviewing Offer Performance**

From the [**Order Details View**](../../manage/orders/order-management.md#order-details-view), you can review any Offers that were applied to a customer's order by clicking on the **Discounts** line under **Payment Summary**.

To break down the usage of Offers across your store, and filter by date range, view the summary  [**Orders by Offer**](../../analytics/orders-reports.md#orders-by-offer) and [**Orders by Coupon**](../../analytics/orders-reports.md#orders-by-coupon) reports.

### View Offers

Navigate to the **Offers** menu to view a list of all current Offers, or to create a New Offer.  This Offers List View displays a summary list of all Offers along with the Offer Type, the Discount Strategy, the Priority, the Availability status, the Currency, and the Uses and Cost of the discounts granted by each offer for its lifetime.

Choose from the following **Actions** from the menu on each Offer:

* **Browse** - for Active offers, redirects you to the storefront with an explanation of the path required for a customer to take to qualify for the given offer.  This is a useful way to check, in "plain language" how a given Offer is set up, and optionally test it in a shopping session.
* **Stats** - redirects to the Offer Details view, showing the aggregated usage of the offer, a list of the Orders that used the Offer, and the total cost of any discounts applied.
* **Edit** - redirects to the Offer Details Edit view, to set up and configure the Offer.
* **Delete** - to remove the Offer
