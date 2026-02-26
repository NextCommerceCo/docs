---
description: Configure your email settings and customer service tools
icon: '8'
---

# Support & Notifications

To ensure your customers receive timely notifications from your store, it's important to set up inbound and outbound email settings.

## Notifications

From the **Settings > Notifications** menu you can view a list of all the transactional and event-based notifications available to your store.  These notifications are triggered by events in the customer’s lifecycle.

Notification emails use your store's [**Branding Settings**](general-settings-and-branding.md#store-branding) in the header and design.

By default all notifications are set to **Active.** Choose **Disable** to suppress certain notifications from being sent.

{% hint style="info" %}
Merchants using [**Shop Sync**](../../apps/shop-sync.md) to send NEXT orders to Shopify for fulfillment and customer communication may elect to **Disable** most Notifications. &#x20;

It is recommended to keep the below notifications Active in most merchant scenarios:

* Refund Notification
* Subscription Canceled Notification
* Subscription Renewal Notification
* Subscription Update Payment Notification
{% endhint %}

### **Notifications Settings**

Configure and customize your store’s email settings:

* Set a **Default From Address** from which all transactional emails from your store will be sent to your customers.
* Optionally set an **Admin Order Notification Email** if you want to receive notifications by email of every new order placed.

**Order Confirmation Notification Delay**&#x20;

Configure a delay (in minutes) of the sending of the [**Order Confirmation Notification**](support-and-notifications.md#notifications) to the customer.  This allows time for post-sale upsells to be added on to the original order, so they may be reflected in a single unified Order Confirmation email.  The delay is limited to 10 minutes.

{% hint style="info" %}
It's important to set up [**Email Sending Domains**](link-domains.md#email-sending-domains) for your store to present the proper branding to your customers and ensure email deliverability.
{% endhint %}

## Support Settings

From the **Settings > Support** area, input the following support ticket and email settings such as the Support Ticket Email Prefix, as well as setting the Support Email Domain for your store.

{% hint style="warning" %}
To receive email in your Support Ticket center from your designated Support Email address, you must set up MX records on your domain name.
{% endhint %}

#### Inbound Email Settings

MX records allow inbound customer support email sent to your domain to sync to [**Support Tickets**](../../manage/support.md#ticket-center) and map automatically to the customer’s account.  MX records must be added to your DNS settings via your domain name provider.

#### Ticket Types

Set up a custom list of Ticket Types to categorize support inquiries, and define a Display Order to control how they appear in the drop down menus. &#x20;

Note that Ticket Types also appear publicly in storefront Customer Accounts Support area. Customers are able to select a ticket type when submitting a support request.

For more on NEXT's integrated Support capabilities, including setting up [**Macros**](../../manage/support.md#support-ticket-macros) for automation of your support ticket handling, click here:

{% content-ref url="../../manage/support.md" %}
[support.md](../../manage/support.md)
{% endcontent-ref %}
