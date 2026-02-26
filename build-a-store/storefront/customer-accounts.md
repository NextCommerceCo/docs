---
description: Offer customers a unified account view for self service and support
---

# Customer Accounts

Next Commerce storefronts include a unified Customer Account portal, where your customers can log in, view and self-manage their profile, shipping and billing addresses.  Customers can also view and manage their orders, subscriptions, and interactions with support.

### Customer Account Access

Customers automatically have a storefront account created when they place an order, or after they abandon a checkout after having completed and submitted their email address.

When not logged into an account, from the storefront's user menu, customers can click on "Login or Register".

Customers will be prompted to enter their email to receive a one-time password (OTP) to access their Account.

### Managing Accounts

Customers can login to manage their own **Profile**, which includes access to the following settings:

* Name
* Email Address
* Phone Number
* Language
* Subscribe to Marketing consent

Customers can also add **Addresses**, or edit existing Billing and Shipping addresses and designate addresses as their account defaults.

### Orders

Selecting the Orders tab displays a list of all of a customer's orders.  Clicking on an order number shows a breakdown of the order:

* Order Items
* Fulfillment Status timeline
* Order Summary, including items, prices, totals and any discounts applied
* Order Details
  * Contact Information
  * Payment Method
  * Shipping and Billing Addresses
  * Shipping Method

Customers may **View Invoice** to display an receipt in invoice format for their purchase.

#### Order Actions

Customers have several options from the order detail view in their Customer Accounts

* Buy Again - prepopulates a new cart with the same order items
* Create Ticket - opens a support ticket request
* Cancel Order\*

{% hint style="info" %}
**Cancel Order** appears conditionally, based on the flag set in the [**Customer Accounts Settings**](../../start-here/get-started/customer-storefront-accounts.md#customer-accounts-settings)
{% endhint %}

### Support

From the Support tab, customers can view all the Support Tickets associated to their account.  Choosing **Create New** opens a new support ticket request.

Support Tickets submitted by customers from their Customer Account are available on your store Dashboard in the [**Support**](../../manage/support.md#ticket-center) ticket center

{% hint style="info" %}
**Support** management options appear conditionally, based on the flags set in the [**Customer Accounts Settings**](../../start-here/get-started/customer-storefront-accounts.md#customer-accounts-settings)
{% endhint %}

### Subscriptions

When a customer has one or more subscriptions, the **Subscriptions** tab will be available in their Customer Account view.  From this tab, customers can select a Subscription ID to view and manage the subscription.

{% hint style="info" %}
**Subscription** management options appear conditionally, based on the flags set in the [**Customer Accounts Settings**](../../start-here/get-started/customer-storefront-accounts.md#customer-accounts-settings)
{% endhint %}

From the Subscription detail view, customers have several options:

* Change Next Renewal Date - modify the date of the next subscription renewal
* Change Schedule - if available, modify the subscription billing interval (e.g. from every 2 months to every 3 months).  Subscriptions with only one allowed [**billing** i**nterval**](../catalogue/add-products.md#purchase-options) will not display this option.
* Edit Shipping Address - modify the shipping address for new orders created by the subscription
* Update Payment Method - choose a different stored payment method, or enter a new card to be used for ongoing subscription renewals. From this view it's also possible to change the Billing Address.
* Cancel

{% hint style="info" %}
If the customer chooses to **Cancel**, they are prompted to provide a [**Subscription Cancel Reason**](../../manage/subscriptions-guide/#subscription-cancellation-paths), and they will be presented with an offer to accept the [**Subscription Downsell Price**](../catalogue/add-products.md#optional-fields-when-setting-up-product-pricing) - if available - to continue their subscription.
{% endhint %}
