---
description: Set up and manage Gateways, Payment Apps, and more
---

# 💳 Payments Guide

## Payment Gateways

Next Commerce supports 120+ global gateways for bankcard transactions, encompassing credit and debit cards such as Visa, Mastercard, AMEX, Discover, Maestro, JCB and more.  If you don’t see your payment gateway listed as supported, just ask us.

| NEXT Payments            |
| ------------------------ |
| Adyen                    |
| Airwallex\*              |
| Stripe Payment Intents   |
| Braintree                |
| Checkout.com             |
| Authorize.net            |
| NMI                      |
| Nuvei                    |
| BlueSnap                 |
| Paypal Commerce Platform |
| WorldPay                 |

{% hint style="info" %}
\*Airwallex accounts require 3DS2 by default. You must make a request to support to remove this restriction to bypass 3DS2, or set up a [**3DS2 Merchant Profile**](3ds2-payments.md#id-3ds2-merchant-profiles) to assign to the gateway.
{% endhint %}

### Adding a NEXT Payments Account&#x20;

To add NEXT Payments to your store, from your [**Next Commerce Account**](https://accounts.29next.com/) choose **Payments,** then choose **Create New.**

You will be redirected to the onboarding flow to provide account setup details.  Once an account is approved it will automatically be loaded into your store's Payment Gateways, and available for live transactions.

### Adding a Payment Gateway

To add a Gateway, navigate to **Settings > Payments** to see a list of all gateways. Select **Add Gateway** to link a new gateway to your store.

Next, select the desired gateway integration and add your gateway specific access credentials.  Note that the required fields for specific gateway integrations may vary.

Once a Gateway has been added to your store, you can specify&#x20;

* A Name for the gateway, referenced in Reports
* Currencies Supported - leave blank to accept all currencies
* Accepted Card Types - leave blank to accept all card types
* Payment Flow (Charge, or [**Authorize & Capture**](authorize-and-capture-payments.md))
* Optionally - Enable 3DS2 support, and assign a[ **3DS Merchant Profile**](3ds2-payments.md#id-3ds2-merchant-profiles) to the gateway
* Optionally - Enable Cascading [**Declined Initial Charge Attempts**](payment-failure-cascading.md)

For orders created via the Admin API, you may optionally define a **`payment_gateway`** ID to route the transaction to a specific gateway ID via the  **`payment_details > payment_gateway`** parameter.

### Gateway Groups

Stores with multiple bankcard gateways may wish to distribute transactions across them on a proportional basis.  With Gateway Groups, you can assign multiple gateways to a single group, and define a weighting to each gateway, to prioritize the distribution of transactions.

{% hint style="info" %}
The **Default Gateway Group** is automatically used for storefront checkouts, or for API-created orders, unless a specific Gateway Group or a single Gateway is specified when creating the order.
{% endhint %}

To create or edit a Gateway Group, navigate to **Settings > Payments** and choose a **Add Gateway Group** from the Gateway Groups card.  From this view you can also Update or Delete existing groups.

On the create gateway group page, assign one or more existing gateways to the group, and choose a weight for the proportion of transactions that should be directed to each of them, with the higher weights receiving the higher proportion of volume.&#x20;

{% hint style="info" %}
Transactions pointed at a gateway group will select from the gateways, based first on the availability for the given card type and currency, then on the weighting assigned to the eligible gateways.  This rule prevents a gateway that does not support a given card type or currency from being selected to process a transaction.
{% endhint %}

For orders created via the Admin API, you may pass a **`payment_gateway_group`** ID in the **`payment_details > payment_gateway_group`** parameter.  If a payment gateway group ID is specified, it will override the default gateway, or any value input into the **`payment_gateway`** field.

{% hint style="info" %}
#### Gateway Groups with 3DS2 Payments over the API

If your payment flow includes gateways supporting 3DS2, you should always specify a **`payment_complete_url`** in your API request.  Read more about supporting 3DS2 transactions over the [**Admin API**](https://developers.29next.com/docs/api/admin/guides/3ds2/)**.**
{% endhint %}

## Payment Transactions

### Transactions List View

View the list of all payment transactions by navigating to the **Payments** men&#x75;**.**  From this view you can filter and export lists of transactions to CSV by selecting **Actions > Export to CSV.**&#x20;

#### Search & Filter Transactions

Transactions can be searched by using the Advanced Search feature.  Choose **Filters** to transactions list by one or more of the following parameters:

* Transaction ID
* Date Range (From / To)
* Type (Authorize/Debit/Refund/Void)
* Subscription Lifecycle
* Card BIN (card first 6 digits)
* Card Last 4
* Gateway Group
* Amount of Transaction (From / To)
* Currency
* Response Code
* Status
* Is Disputed (Yes / No)
* Is External
* Is Test Transaction
* Is Initial Retry
* Initiators (Users)
* Funnels
* Agents
* Is 3DS (yes/no)
* Optimized 3DS
* 3DS Downgrade Retry
* SCA Flow

Additionally, filter the transactions list by any [**Marketing Source Attribution**](../offers/marketing-attribution.md) values that are connected to the Order on which a transaction was made.

### Transactions Detail View

Clicking on any Transaction ID, or the **View** button from the Transactions List View will show the Transaction Detail.  Transaction details provide all information available for the transaction, including the raw transaction data sent to the payment provider or gateway, and the data returned in response.

Choose **Actions** from this view to apply a **Refund (or Void)** to a transaction, or to mark a transaction as [**Disputed**](disputes-guide.md#disputes)**.**

To manually [**Capture an Authorized transaction**](authorize-and-capture-payments.md#manually-capture-or-void-payments) within the authorization period, choose **Actions > Capture Payment.**

{% hint style="info" %}
Non-bankcard transactions appear in the Transactions List view, but viewing the transactions details will link to the underlying Payment App view, for example [**PayPal's**](paypal.md) transaction list. &#x20;
{% endhint %}

For aggregated reports on Payments transactions, see Transaction Reports:

{% content-ref url="../../analytics/transactions-reports.md" %}
[transactions-reports.md](../../analytics/transactions-reports.md)
{% endcontent-ref %}
