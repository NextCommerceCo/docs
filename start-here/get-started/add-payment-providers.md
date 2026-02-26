---
description: Set up payment gateways, gateway groups, and more
icon: '9'
---

# Add Payment Providers

Before your store is ready to take live orders, you'll need to set up payment processing accounts.&#x20;

### Adding a Payment Gateway

To add a Gateway, go to **Settings > Payments** and choose **Add Gateway**.

On the following page, select the desired gateway integration and add your gateway specific access credentials to integrate the Gateway to the store.  Note that the required fields for specific gateway integrations may vary.

Once a Gateway has been added to your store, you can specify&#x20;

* Supported Currencies
* Accepted Card Types
* Payment Flow (Charge, or [**Authorize & Capture**](../../features/payments/authorize-and-capture-payments.md))
* Enable [**3DS**](../../features/payments/3ds2-payments.md) support (optional), and assign a [**3DS Merchant Profile**](../../features/payments/3ds2-payments.md#3ds2-merchant-profiles) to the gateway
* Connect an [**Apple Pay**](../../features/payments/apple-pay.md) profile (optional)
* Connect a [**Google Pay**](../../features/payments/google-pay.md) profile (optional)
* Enable [**Alternative Payment Methods**](../../features/payments/stripe-apms.md) for Stripe (optional)

{% hint style="info" %}
The **Default Gateway** for a given currency will be automatically selected on the storefront checkout, or for orders made over the API, for transactions in that currency.

\
To use multiple gateways on the storefront checkout, create a **Gateway Group**, and assign it to your storefront checkout via Settings > Payments > Settings > Default Gateway Grou&#x70;**.**
{% endhint %}

### Create Gateway Groups

Stores with multiple bankcard gateways can use Gateway Groups to a single group, and define a weighting to each gateway to prioritize the distribution of transactions.

To create a Gateway Group, navigate to **Settings > Payments** and choose **Add Gateway Group**. &#x20;

Next, assign one or more existing gateways to the group, and choose a weight to assign the proportion of transactions that should be directed to each, with the higher weighted gateway receiving the higher proportion of transactions.&#x20;

For example, Gateway A will receive twice as many transaction attempts as Gateway B:

* Gateway A = 50
* Gateway B = 25

{% hint style="info" %}
Transactions pointed at a Gateway Group will select from the gateways, based first on the availability for the given card type and currency, then on the weighting assigned to the eligible gateways. &#x20;

This rule prevents a gateway that does not support a given card type or currency from being selected to process a transaction.
{% endhint %}

### General Payment Settings

* Assign a Gateway Group to use as the default on your storefront with the **Default Gateway Group** setting.  Assigning a Gateway Group will override any previously configured "Default" gateway for each currency.
* Set the **Throttle Attempts for Declining Bankcards** flag, to limit a cardholder from re-attempting an already-declined transaction more than 4 times in a single session.
* Set **Disputes Handling** actions at this step, such as automating the adding of customers with payment disputes to [**Block Lists**](../../features/payments/block-lists.md), Cancelling Orders, and Canceling Subscriptions.
* Set the **Subscription Cancel Reason** to assign to subscriptions that fail automatically (due to failed recurring payments).  We'll customize cancel reasons and other Subscription settings in the next step.

## PayPal & Apps

To accept [**PayPal**](https://docs.29next.com/payments#paypal) or add other Payment Apps to your store, check out the Payments Guide

{% content-ref url="../../features/payments/" %}
[payments](../../features/payments/)
{% endcontent-ref %}
