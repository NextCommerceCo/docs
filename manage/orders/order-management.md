---
description: Manage your orders, payments, and fulfillments from a single view
---

# Order Management

## Order Details View

From the **Orders** menu, choose "View" or click the order number of any order to enter the Order Details view.

The Order Details view provides a full overview of all information related to an order and associated events that occurred through the order’s entire lifecycle, listed on the [**Order Timeline**](order-management.md#order-timeline).&#x20;

This view also includes features to [**Edit**](edit-orders.md) orders, [**Refund**](refund-items-and-orders.md) orders, create [**Returns**](create-and-manage-returns.md), plus several other [**Order Actions**](order-management.md#order-actions)**.**

### Order Items

All line items in the order are summarized in the items cards, separated by [**fulfillment location**](../../start-here/get-started/fulfillment-settings.md#fulfillment-locations).

* **Product** - displays the line item and quantity in the order.  If the order is part of a subscription, a subscription icon will appear on the product image, which links to the corresponding [**Subscription Details View.**](../subscriptions-guide/#managing-subscriptions)
* **Fulfillment** - displays the fulfillment location name, along with the integration / app that handles the fulfillment process (or "Manual" in case of manual fulfillment)
* **Price** - shows the total price of the order

Orders in **Unfulfilled** status show an **Upcoming Fulfillment** badge on the order items card with the estimated time the order is scheduled to be posted to the fulfillment location.

### Fulfillment Events

#### Hold Fulfillment

While an order's items are in the Unfulfilled fulfillment status, they can be manually set to **On Hold** status by choosing **Hold Fulfillment.**  This is useful in cases when an order's fulfillment should be delayed, pending an update of customer information such as clarification on a shipping address.&#x20;

{% hint style="info" %}
It's important to note that **On Hold** orders _will_ _not_ be automatically submitted for fulfillment, so they must be manually released for fulfillment by choosing **Release Fulfillment**.
{% endhint %}

#### Force Fulfillment

To immediately send an Unfulfilled order to the fulfillment location, bypassing the store's configured fulfillment delay, choose **Request Fulfillment.**&#x20;

#### Request Fulfillment Cancellation

To send a request to the fulfillment location to cancel an order that is already in Processing status, choose **Request Cancellation.** The fulfillment location will respond by Accepting Cancellation of the item(s), or Rejecting Cancellation if it's too late to stop the shipment.

#### Mark Order as Shipped

When an order is already in Processing fulfillment status, it can be manually advanced to Fulfilled status, by choosing **Fulfill Items.**  You will be prompted to (optionally) enter the shipment carrier, tracking number, and send the customer a shipment notification email.

### Payment Summary

The Payment Summary table provides a breakdown of authorizations, charges, refunds, and disputes related to the order for full payments visibility. &#x20;

* Payment Method
* Subtotal
* Shipping
* Discount(s)
* Total Tax
* Total
* Paid by Customer
* Net Payment

{% hint style="info" %}
When [**Editing Orders**](edit-orders.md) to add products or additional quantities, the result may be that additional payment is due to be collected from the customer.  \
\
From the Payment Summary card, choose **Collect Payment.**  You may choose **Mark as Paid** to record an additional payment that was collected offline or offsite, or choose to collect payment from the customer's stored payment method (bankcard methods only). \
\
It's important to note that collecting an additional payment is not required before orders post to fulfillment.
{% endhint %}

#### Transactions List

All payment transactions relating to the order are listed on the Transactions card.  Choosing **View** links to the [**Transactions Detail View**](../../features/payments/#transactions-detail-view), where you may manually process a Capture, Refund, Void, or Create a Dispute relating to a specific payment transaction.

### Order Timeline

The Timeline is a chronological log of all the events that occurred during the order lifecycle, including all notifications sent to the customer, manual order management events with details, reasons, and the initiating user.

* **Add Note** - add a custom Note to the timeline.  Notes can be edited for 5 minutes after they are first created.

{% hint style="info" %}
Order Notes are available to create, update, and query programmatically via the Next Commerce [**Notes API**](https://developers.29next.com/docs/api/admin/reference/#tag/customers/operation/usersNotesCreate) &#x20;
{% endhint %}

#### Source Attribution

The Attribution card shows a full breakdown of all of the [**marketing source attribution**](../../features/offers/marketing-attribution.md) captured with the order.&#x20;

For sales leveraging custom integrations such as [**Everflow**](../../apps/everflow.md), or those created over the [**Admin API**](https://developers.29next.com/docs/api/admin/), Source Attribution Metadata may also appear here if passed with orders created on the API, or via custom [**Carts**](../customers/customer-carts.md#updating-cart-source-attribution) or [**Checkout Links**](../customers/checkout-links.md#attribution-parameters).

#### Tags

Tags can be added to orders manually, or via the API, to allow for custom segmenting of groups of orders.  Tags are available in search views like the [**Orders List**](./#orders-list-view) view as a custom filter (choose **Filters**).

{% hint style="info" %}
Use the [**Orders by Tag**](../../analytics/orders-reports.md#orders-by-tag) report to see a breakdown of orders by all tags.
{% endhint %}

### Order Actions

From the **More Actions** menu in the Order Details View, you can perform several actions:

* **View Order Status Page -** links to the public URL on your storefront, which the customer can use to view their order details and order status, as well as any shipment status or tracking details (when using a supported integration).  Customer can also access an Invoice from this page.<br>
* **Resend Confirmation Email -** automatically re-sends the [**Order Confirmation Notification**](../../start-here/get-started/support-and-notifications.md#notifications) email to the customer.<br>
* **Archive -** allows the manual changing of an order's status from Open to Archived in certain scenarios.  See [**Order Statuses**](order-management.md#order-statuses) for more detail.  For **Archived** orders the option to **Unarchive** the order is available, to allow for editing.<br>
* **Cancel Order -** applies to orders in Unfulfilled status only - opens a window with options to cancel the order, input a **Cancellation Reason**, and if applicable, process a refund against the order.  Select **Send Cancel Order Email to Customer** to automatically send the **Order Canceled Notification** email to the customer.<br>
* **Create Ticket -** creates a new [**Support Ticket**](../support.md#creating-support-tickets), pre-populating the order and customer's details by default.  It's recommended to create a ticket to log customer support inquiries.
