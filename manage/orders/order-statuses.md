---
description: Order and Fulfillment statuses and how they affect your order lifecycle
---

# Order Statuses

## Order Statuses

Below is an overview of the Statuses that Orders transition through during the order lifecycle.  These are separate from Fulfillment Statuses that apply to orders and their line items.

| **Open**     | <p>The Order has been confirmed, and if Paid will be sent to the fulfillment location, with a default delay of 30 minutes.  <br><br>This delay is configurable in your store <a href="../../start-here/get-started/fulfillment-settings.md"><strong>Fulfillment</strong></a><a href="../../start-here/get-started/fulfillment-settings.md#fulfillment-settings"> </a>settings.</p> |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Archived** | The Order has been completed, with all items Fulfilled or Canceled, and no further action is required.  Orders automatically transition from Open to Archived status once completed.                                                                                                                                                                                               |
| **Canceled** | The Order has been canceled. Orders can only be canceled before items have been sent to fulfillment.                                                                                                                                                                                                                                                                               |

{% hint style="info" %}
While an order's items are in Unfulfilled Status, they can be manually set to **On Hold** status by choosing **Hold Fulfillment.**  This is useful in cases when an order should be held pending an update of customer information, such as clarification on a shipping address.&#x20;



It's important to note that **On Hold** orders will _not_ be submitted for fulfillment, so they must be manually restarted once repaired, but choosing **Release Fulfillment**.



To immediately send an Unfulfilled order to the fulfillment location, bypassing any fulfillment delay, choose **Request Fulfillment.**&#x20;

&#x20;\
When an order is already in Processing Status, it can be manually advanced to Fulfilled status, by choosing **Fulfill Items.**  You will be prompted to (optionally) enter shipment carrier, tracking number, and send the customer a shipment notification.
{% endhint %}

### Fulfillment Statuses

Along with Order Statuses, orders and each line item that comprises them carry a fulfillment status.  See [**Fulfillment Statuses**](../../features/fulfillment-guide/fulfillment-statuses.md)**.**

Once you're comfortable with Orders and related features, you can explore aggregated reports of orders by source attribution and other key data points

{% content-ref url="../../analytics/orders-reports.md" %}
[orders-reports.md](../../analytics/orders-reports.md)
{% endcontent-ref %}
