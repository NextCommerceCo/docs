---
description: Create, manage, and analyze your store's customers
---

# 👥 Customers Guide

## Customers Overview

All store Customers can be found by navigating to the **Customers** menu in the Dashboard. The Customers List View can be searched, sorted, and filtered by multiple attributes. The resulting list can be exported by choosing **Actions > Export**.&#x20;

The default Search function finds customers based on their Name, Email, or Phone, and supports partial matches when returning search results. &#x20;

Choosing **Filters** allows a partial-match search by Customer Address fields, along with a variety of other search filters.

Clicking **View** opens the [**Customer Details**](./#customer-detail-view) view, which provides a full overview of all information and associated data available for the customer.

## Customer Details View

The Customer Details view is organized to display and offer quick access to all events and information associated to a customer, and organized visually in the **Customer Timeline.** &#x20;

From this Customer Details view, several quick links are available:&#x20;

* **Create Ticket** - create a new support ticket on behalf of the customer
* **View Cart** - access and edit the [**customer's cart** ](customer-carts.md#customer-carts)

Select the **More Actions** menu to perform the following:

* **Send Password Reset Email** - invite the customer to access their storefront customer account by resetting their password
* **Add to Block Lists** - add the customer to [**block lists**](../../features/payments/block-lists.md) to prevent them from placing future orders

**Open Tickets** and **Disputes** associated to the customer are summarized and linked here.&#x20;

{% hint style="info" %}
More on [**Support Tickets**](../support.md#ticket-center), and payment [**Disputes**](../../features/payments/disputes-guide.md).
{% endhint %}

### Customer

The Customer card displays key data about the customer: &#x20;

* Email Address
* Phone Number
* Total Spent (Lifetime)
* Total Orders
* Customer Since (Customer Creation Date)

Choose **Edit** to modify the customer's email address, name, phone, language. Select **Subscribe to Marketing Emails** when the customer has opted into marketing content from your store.

{% hint style="info" %}
When creating carts on the [**Admin API**](https://developers.29next.com/docs/api/admin/guides/external-checkout/#create-cart), pass the **`accepts_marketing`** value to set the marketing emails flag.  This opt-in status is carried through to third-party Apps like [**Klaviyo**](../../apps/klaviyo.md) for list management.
{% endhint %}

### Orders

Orders placed by the customer are listed on the Orders card.  Click on an order number to access the [**Order Details view**](../orders/order-management.md#order-details-view)**.**  Orders are displayed with the following summary data:

* Order Number
* Total Amount
* Date Placed
* Order Status
* Fulfillment Status
* Payment Status

{% hint style="info" %}
Learn more about [**Order Statuses**](../orders/order-statuses.md)
{% endhint %}

### Subscriptions

The customer's existing or past subscriptions are listed on the Subscriptions card.

Click on a Subscription ID to access the [**Subscription Detail View**](../subscriptions-guide/#managing-subscriptions).  Subscriptions are displayed with the following summary data:

* Subscription ID
* Subscription Status
* Subscription Billing Frequency
* Products, quantity and item price
* Subscription Total Amount
* Next Renewal Date

### Addresses

The customer’s Billing and Shipping Addresses can be viewed and edited through the Addresses card.  Choose **Manage** to create a new address, or edit existing addresses for the customer, and set defaults for Billing and Shipping.

### Customer Timeline

All events in the customer's history are displayed in the on the Timeline.  Events such as orders, as well as a list of all [**Notifications**](../../start-here/get-started/support-and-notifications.md) sent to the customer can be viewed here.

#### Emails

Any emails sent to the customer such as transactional emails can be selected and viewed from the Timeline.

#### Notes

Notes added to a customer's account are displayed on the Timeline.  To attach a new note to the customer, choose **Add Note**. Notes are editable for 5 minutes after they’ve been added.

{% hint style="info" %}
Customer notes can be created and queried using the [**Admin API** ](https://developers.29next.com/docs/api/admin/reference/#tag/customers/operation/usersNotesCreate)
{% endhint %}

#### Tags

Add or modify any [**Tags**](./#tags) on the customer's record to allow for custom workflows, segmentation, and filtered search views of customers with specific tags.  Tags can be freely created, applied, and removed.
