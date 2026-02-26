---
description: The Refund view provides multiple ways to issue refunds and cancel line items
---

# Refund Items & Orders

## Refund Order Items

To refund specific items from an order, from the [**Order Details View**](order-management.md#order-details-view), choose **Refund.**

{% @arcade/embed flowId="GhEU8ut0dPmMoCZcL4aM" url="https://app.arcade.software/share/GhEU8ut0dPmMoCZcL4aM" %}

The Refund view offers several options to process refunds against both order line items, and entire orders.

{% hint style="info" %}
To be eligible for refunds, orders should have payment status as **Paid, Partially Paid,** or **Partially Refunded.**&#x20;

Orders with a payment status of **Authorized** must have payments **Captured** before they can be refunded.  More on [**Authorize & Capture**](../../features/payments/authorize-and-capture-payments.md) payment flows.&#x20;
{% endhint %}

[**Unfulfilled**](order-statuses.md#fulfillment-statuses) or [**Fulfilled**](order-statuses.md#fulfillment-statuses) status orders allow the option to select specific items in the order for cancellation and refunding.  Selecting an item, or a quantity of an item, will pre-populate a refund amount corresponding to the items selected.

[**Processing**](order-statuses.md#fulfillment-statuses) status order items are not available to be refunded directly.  Since they are in the process of being fulfilled, they must first be canceled at the fulfillment partner using the [**Request Cancellation**](order-management.md#fulfillment-events) option (for supported integrations).

{% @arcade/embed flowId="3cbKZejUg8MncjZkWaDb" url="https://app.arcade.software/share/3cbKZejUg8MncjZkWaDb" %}

Amounts in the **Refund Amount** field are freely editable, up to the amount that remains available for refunding on the corresponding payment transaction. Selecting specific line items to refund, where possible, is optional but recommended.&#x20;

{% hint style="info" %}
Items refunded from an order will also be removed from the order.  Refunded items from an **Unfulfilled** order will therefore not be posted to the fulfillment partner.
{% endhint %}

### Refund Shipping Costs

When shipping costs have been charged to the customer, the option to **Refund Shipping** will be displayed along with the shipping method, and amount charged.

### Process a Refund

* Enter a Reason for Refund (optional), to be shown on the order's [**Timeline**](order-management.md#order-timeline)
* Verify that the amount in the **Refund Amount** field is the desired amount
* Choose whether to send the customer a [**Refund Notification** ](../../start-here/get-started/support-and-notifications.md#notifications)email
* Click **Refund**

## Partially Refund Orders

It is always possible to bypass the selection of specific items for refunding, and simply process a refund against the payment transaction(s) on an order. &#x20;

* Enter the desired amount to refund from a transaction in the **Refund Amount** field
* Choose whether to send the customer a [**Refund Notification** ](../../start-here/get-started/support-and-notifications.md#notifications)email
* Click **Refund**



