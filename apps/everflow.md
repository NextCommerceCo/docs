---
description: Automate your Partner Marketing Attribution & Tracking
---

# Everflow

Everflow is a partner and affiliate marketing tracking platform that allows you to create and track unique offers for your marketing partners.  With Everflow, it’s easy to attribute sales to partners, evaluate the performance of each partner channel, and automate the postback of lead, order, upsell, and subscription events.

{% hint style="info" %}
Everflow is an installable App.  Enable it from the **Apps** menu on your store.
{% endhint %}

### Setup Everflow Integration for Your Storefront

To set up Everflow on your store, navigate to **Apps > Everflow**.  Input your Everflow account credentials and click **Save**.&#x20;

{% hint style="info" %}
[**Source Attribution**](../features/offers/marketing-attribution.md#querystring-parameters) on an order-level is populated by values passed via querystring parameters.  The **Everflow Click ID** (Transaction ID) should be passed using the **`evclid`** parameter on links to your storefront.&#x20;
{% endhint %}

The configurable fields are as follows:

* Everflow Postback URL\*
* Everflow Network ID\*
* Everflow Verification Token
* Everflow Postback Delay Minutes
*   Include Tax in Conversion Value\
    <br>

    <figure><img src="../.gitbook/assets/image (5).png" alt=""><figcaption><p>Everflow App Settings</p></figcaption></figure>

The Everflow App uses the S2S (Server to Server) conversion method with an order. The S2S conversion method will enable the following values to be passed back on a conversion event into Everflow.&#x20;

* order amount
* order currency
* Everflow NID
* order number
* transaction id

{% hint style="success" %}
Use the **Everflow Postback Delay** setting to allow up to 10 minutes for post-checkout Upsells Revenue generated in a single customer session to be accounted for in the conversion event postback.&#x20;
{% endhint %}

{% hint style="info" %}
Order totals sent to Everflow on conversion events are tax exclusive by default.  Enable the **Include Tax in Conversion Value** setting if you want to post the order total inclusive of tax to Everflow.
{% endhint %}

### Set up Everflow Postbacks via Admin API

For orders created via the [**Admin API**](https://developers.29next.com/docs/api/admin/) **`orders_create`** method, you must pass the **`everflow_transaction_id`** as a string into the **Source Attribution Metadata** field on your API  call. Orders created with this ID will trigger the S2S postback to Everflow, and associate the conversion events back to Everflow.

The **`everflow_transaction_id`** is equivalent to the "transaction\_id" that Everflow generates on a click to your URL.

#### Example Source Attribution Meta with Everflow Transaction ID&#x20;

```
"attribution": {
    "metadata": {
        "everflow_transaction_id": "string"
    }
}
```

{% hint style="warning" %}
Note that [**Test Orders**](../manage/orders/test-orders.md) do not fire an S2S postback to Everflow.
{% endhint %}
