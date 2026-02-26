---
description: Re-attempt failed customer transactions to save checkouts
---

# Payment Failure Cascading

Merchants with more than one payment gateway may wish to support _cascading_ - ie. the immediate re-attempt of a failed bankcard transaction at checkout onto a secondary gateway.

## Automatic Re-Attempt Flow

From the [**Payments Settings**](../../start-here/get-started/add-payment-providers.md) follow the following steps to set up decline re-attempts:

* Create a new[ **Gateway Group**](../../start-here/get-started/add-payment-providers.md#create-gateway-groups) to use for re-attempting declined charges
* Add one or more gateways to the group to use for charge re-attempts
* From the Gateway Details View, under **Payment Flow** select the box "Re-attempt declined initial charge attempts"
* Specify the Gateway Group you created
* Click **Save Changes**

When this setting is enabled, declined bankcard transactions will re-attempt _one time only_ if the initial transaction attempt's decline reason code is one of the following:

* 2000 - Do Not Honor
* 2003 - Processor Declined
* 2004 - Authorization Required
* 2005 - Processing Error
* 3007 - Invalid Card
* 3011 - Merchant Error

## Manual Re-Attempt Flow

Developers wishing to customize their decline re-attempt logic should use the following logic in their application.&#x20;

{% hint style="info" %}
Note: Re-attempting payment failures is not recommended for **Hard Decline** reasons are returned in an initial response.  Only **Soft Declines** are likely to approve upon re-attempt.  Your application should parse the [**Transaction Response Code**](transaction-response-codes.md) to decide whether a charge should be re-attempted.
{% endhint %}

1. Upon a failed payment transaction,  a **`card_token`** is returned in the API response:

```
{
  "payment_details": "Unable to process the purchase transaction.",
  "payment_response_code": "2000",
  "payment_method": {
     "card_token:"1hSk5wZmkCtgaC3TOtahuV6Z2R", 
    }
}
```

2. To create a secondary payment attempt (the "cascade" attempt after an initial failure), the transaction request must use **`payment_method: "card_token"`** and pass the **`card_token`** from the initial response.

```
"payment_method": "card_token",
"payment_details": {
   "card_token": "1hSk5wZmkCtgaC3TOtahuV6Z2R",
   "payment_gateway": <gateway_id>
}
```

On this secondary attempt using the card token, specify under **`payment_details`** an alternate **`payment_gateway`** to re-attempt the failed charge on the designated secondary gateway.

{% content-ref url="./" %}
[.](./)
{% endcontent-ref %}



