---
description: Modify orders in progress to add or remove items and adjust quantities
---

# Edit Orders

## Editing Orders

{% hint style="info" %}
**Editing Order Line Items**

After an order is placed you can edit the contents of the order for a limited amount of time.  While an order's items are in [**Unfulfilled status**](order-statuses.md#fulfillment-statuses), the contents of the order can be edited.
{% endhint %}

To add or remove items, or modify the quantities on an existing order, from the [**Order Details View** ](order-management.md#order-details-view)choose **Edit.**

Next, from the **Edit Order** View:

* **Add Products** - add additional product(s) to the order.
* **Adjust Quantity** - add or reduce quantities of the items already in the order.
* **Remove Items** - remove the current items from the order.
* **Reason for Edit** - specify a reason for the edit, which will be recorded on the order timeline.

To finish editing the order, click **Update Order.**

{% hint style="info" %}
Refunds are not automatically processed when performing order quantity downgrades, so they must be processed manually by using the [**Refund**](refund-items-and-orders.md) menu.\
\
When adding items or quantities to orders, you may be prompted to [**collect additional payment**](order-management.md#payment-summary) from the customer.
{% endhint %}

### Edit Orders in Processing Status

Orders with items in a [**Processing**](./#order-statuses) fulfillment status can no longer be edited.

You may [**Request Cancellation**](order-management.md#request-fulfillment-cancellation) of the fulfillment items in Processing to stop fulfillment, (where supported by the fulfillment location).   If successfully canceled, you may then **Edit** the order, and then **Request Fulfillment** of the updated order.

{% hint style="info" %}
Customize the delay before **Unfulfilled** status order items are sent to your fulfillment location, and therefore transition to **Processing** status, by setting the fulfillment delay in [**Settings > Fulfillment**](../../start-here/get-started/fulfillment-settings.md#fulfillment-partners)
{% endhint %}

