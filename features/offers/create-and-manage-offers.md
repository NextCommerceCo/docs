---
description: Set up and manage custom discounts, incentives, and coupon codes
---

# Create and Manage Offers

## Create and Manage Offers

From the **Offers** menu, choose **New Offer** to create a new Offer, or select an existing offer to **Edit**, **Suspend**, or **Clone** it.

### General

On the **General** card, configure the following parameters

* **Name -** the Offer's name will be displayed in the customer's cart, and on [**Offers Reports**](../../analytics/orders-reports.md#orders-by-offer)**.**
* **Type -** choose a Site or Voucher offer.  A Site Offer applies to a customer's cart contents globally, while a Voucher Offer only applies when a specific [**Coupon Code**](coupons.md) is entered.&#x20;
* **Currency -** select a currency for which the offer will apply.
* **Priority -** rank the offer, such that the higher priority offer takes precedence to apply in cases where a customers cart contents may trigger more than one offer.

### Condition

Next, set up the **Condition** under which your Offer will apply to the customer's cart.  The Condition lays out the requirements for the customer (for example certain products, or a number of products being added to the cart) to qualify for the Offer incentive. &#x20;

Specify the **Condition** **Type** from the list of options:

* Quantity greater than or equal to
* Quantity equal to
* Total price greater than or equal to
* Total price equal to
* Number of distinct products greater than or equal to
* Number of distinct products equal to
* Depends on number of items in cart that are in condition range
* Depends on value of items in cart that are in condition range
* Needs to contain a set number of DISTINCT items from the condition range

Enter the **Value** that corresponds to the **Condition Type** chosen above.  For example, if you choose _"Depends on number of items in cart that are in condition range"_ and a Value of "3", the Offer would apply to a customer cart only if 3 qualifying items were added to the cart.

Choose a specific [**Product Range**](product-ranges.md), from which a product must be in the cart to qualify for the Offer.&#x20;

### Incentive

Define the incentive (discount) the customer will receive for applying the offer.  For example, you may choose to give the customer a discount off the total value of their cart, off a certain number of items in their cart, or off the shipping cost of their order.

Specify the **Discount** **Type** to define the customer incentive from the list of options:

* Discount is a percentage off of the product's value
* Discount is a fixed amount off of the product's value
* Discount is to give the cheapest product for free
* Get the products that meet the condition for a fixed price
* Discount is a fixed amount of the shipping cost
* Get shipping for a fixed price
* Discount is a percentage off of the shipping cost

Enter a corresponding **Value** (in currency units or percentage). &#x20;

For example, you may choose Type _"Discount is a fixed amount off of the product's value"_ and a Value of "50.00" - meaning the item in the cart will be discounted by ($)50.00.

### Subscription

Offers can be configured to apply to subscriptions.

* **Apply Only Subscription** - Choose this setting to apply the discount only to _subscription line items_ within the range that is in the cart.&#x20;
* **Apply Only First Order** - Choose this setting to apply the discount to only the _first order of a subscription line item_ within the range that is in the cart.  This is useful if you want to apply a discount only to the first subscription period (such as a trial period), and revert to the full subscription price for ongoing billing periods.

### Combinations

Non-exclusive Offers can be combined to create more complex, or stackable discount logic.  Define which Offers should be allowed to act in combination with each other from this setting.

It's useful to remember that combinations work in both directions - i.e. if "Offer A" includes a combination for "Offer B", then "Offer B" will automatically have "Offer A" listed as a combination. &#x20;

### Restrictions

The final step in setting up an Offer is to define Restrictions.  These limit the time frame in which an Offer is available, the usage, and the total discount.

* **Start Date & End Date**
* **Max Cart Applications** - The total number of times this offer can be applied to a cart (and order)
* **Max User Applications** - The number of times a single user can use this offer
* **Max Global Applications** - The number of times this offer can be used store-wide before it is made unavailable

Leave these values blank if you do not want to set limits on the offer's usage.

