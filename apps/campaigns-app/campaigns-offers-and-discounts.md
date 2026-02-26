---
description: Create custom discounting codes and logic for Campaigns API
---

# Campaigns Offers & Discounts

Campaigns App **Packages** represent the items for sale on your external custom checkout flow. &#x20;

A **Package** can be understood as simply a:

_Product + Quantity + Price + (optionally a Subscription schedule and recurring price point)_

Campaigns App **Offers & Discounts** opens up the possibility of selling at multiple price points on your checkout, without the need for creating individual Packages for each variation.

### Set up Offers

From the Campaigns App main list view, click on your campaign name, or choose "View". &#x20;

Next, select **Packages -** then from **Offers & Discounts** select **Add Offer** and configure the following values.

**General Details**

* **Name** - The name of the discount
* **Type** - Choose between
  * **Offer** - Always apply the discount when the order meets the conditions
  * **Code** - Only apply the discount when the code is used - when selected you must enter the Discount Code.

**Condition Type**

Set the conditions required for your discount logic to apply to the order

* Any Criteria
* Package quantity greater than or equal to - a value
* All Packages - Select to automatically add all current and future Packages to this condition

**Incentive**

Define the discount to be applied when the offer conditions are met

* **Discount Type**
  * Apply a percentage off the packages that meet the criteria&#x20;
  * Apply a percentage off the shipping price
  * Apply a percentage off the entire order
* Discount Amount (Percentage)
* **Discount Price Rounding** - set a custom rouding rule to force discounted prices to round to a desired value

