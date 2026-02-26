---
description: Link your Shopify Store to Next Commerce and sync orders for fulfillment
icon: shopify
---

# Shop Sync

Shop Sync is an installable App for Next Commerce that syncs your Shopify store's products to NEXT's [**products catalogue**](../build-a-store/catalogue/).

Additionally, Shop Sync connects your NEXT store to use Shopify as a [**Fulfillment Location**](../features/fulfillment-guide/#core-concepts), so that any orders placed on NEXT are automatically imported to your Shopify store.

{% hint style="info" %}
**Shop Sync** is an App, installable via the **Apps** menu in your Next Commerce store.
{% endhint %}

## Set Up Shop Sync App

**Step 1:** Log in to both your NEXT dashboard and your Shopify store admin

* From NEXT, install **Shop Sync** from the **Apps** menu.
* After installation, you will be prompted to create a custom app from your Shopify account, via the Shopify Dev Dashboard.

**Step 2:** Connect Next Commerce to Shopify.

* Ensure that you are logged into your Shopify account, then select the **Shopify Dev Dashboard** link from the NEXT Shop Sync app settings.
* From the Shopify Dev Dashboard, click **Create app**
* Input an App name in the **Start from Dev Dashboard** field.  This will be the name of the custom app linked to NEXT in your Shopify store, so it's recommended to choose an easy to identify name like "NEXT Shop Sync".  Click **Create.**

**Step 3:** Configure your app

* Next, you will be prompted to input a configuration for the app.  From the NEXT Shop Sync App, **copy the values** displayed into each of the corresponding fields on the Shopify Dev Dashboard:
  * App URL (unselect Embed app in Shopify admin)
  * Webhooks API Version&#x20;
  * Scopes
  * Redirect URLs
* Then, select **Release.**  It is not required to add a version name or message.

**Step 4:** Install your app

* On the following screen, from the left side menu under your App's name, go to the **Home** menu.
* Click **Install App.**  You will be prompted to choose the Shopify store in your account on which to install the app.
* Once selected, you will be prompted by Shop Sync to input a **Client ID** and **Secret.**  From the Shopify Dev Dashboard left side navigation menu, click **Settings.**  Copy and paste the **Client ID** and **Secret** into the Shop Sync prompt screen and submit.
* You will then be redirected to the Shop Sync App settings on NEXT.

Now that your NEXT store is successfully connected to your Shopify store, a green **Connected** badge along with the Shopify store ID will be displayed.&#x20;

## Enable Product Sync

To import your Shopify store products to NEXT, check **Enable Product Sync.**&#x20;

{% hint style="info" %}
**Fulfillment Location** - product sync can only proceed once a Fulfillment Location is created for your connected Shopify store on the Shop Sync App settings.

Enter a name for the Shopify fulfillment location, and enter the address of the warehouse that will ship out physical orders (if applicable).

Then select **Save Changes**
{% endhint %}

Once these settings are enabled, your full list of products will be imported from your connected Shopify store and synced to your NEXT [**products catalogue**](../build-a-store/catalogue/).

Edits and adjustments to your Shopify products will also automatically sync to NEXT and modify your NEXT products.&#x20;

{% hint style="warning" %}
To properly sync to Next Commerce, it is **required** that your Products in Shopify have a SKU code associated to them.  Products without a SKU Code will not sync.\
\
It's also useful to ensure that any Variant Products in Shopify have product images associated to them.
{% endhint %}

### Notifications

**Send Order Confirmation Email from Shopify** - when this setting is enabled, order confirmation email notifications will be sent from Shopify.  If enabled, check your [**notifications settings**](../start-here/get-started/support-and-notifications.md#notifications-settings) to ensure that duplicate emails are not sent from NEXT.

### Payment Sync

Enable this setting to include payment transaction details on orders posted to Shopify.  By default this setting is disabled (recommended).

All orders synced to Shopify will show a **Paid** status, whether the payment transaction details were included or not.

{% hint style="danger" %}
&#x20;If Payment Sync is Enabled, orders in Shopify will show a **Refund** button.  It is important to note that using the Refund option in Shopify _will not_ process a refund on the order on NEXT, despite showing as completed on Shopify.  \
\
Since the initial payment is taken on NEXT, refund transactions must always be processed via the NEXT dashboard.
{% endhint %}

### Metadata Sync

Optionally sync metadata fields on NEXT orders to map to the resulting Shopify orders.&#x20;

{% hint style="info" %}
Set up custom [**Metadata definitions**](../build-a-store/technical-settings/metadata-fields-and-tags.md#metadata) via store Settings.  The metadata objects that can map to Shopify Order metafields are the Order and Attribution metadata objects.
{% endhint %}

To create a mapping between Next Commerce metadata and Shopify metafields, click **Add Metadata Sync** and map your Next Commerce metadata field to the corresponding Shopify metafield.&#x20;

This table shows the relationship between corresponding metadata types.

| NEXT Metadata Type | Shopify Metafield Type    |
| ------------------ | ------------------------- |
| text               | single\_line\_text\_field |
| multi\_text        | multi\_line\_text\_field  |
| integer            | number\_integer           |
| decimal            | number\_decimal           |
| boolean            | boolean                   |

## Finish Setting Up Next Commerce

Now that your Shopify store is synced with Shop Sync, there are several setup steps to complete before you begin selling with Next Commerce.  Follow the links to complete the essential configuration of your store:

* [General Settings & Branding](../start-here/get-started/general-settings-and-branding.md)
* [Invite Team Members](../start-here/get-started/invite-team-members.md)
* [Link Domains](../start-here/get-started/link-domains.md) & set up an [Email Sending Domain](../start-here/get-started/link-domains.md#email-sending-domains)\*
* [Review Locations & Currencies](../start-here/get-started/add-locations-and-languages.md)
* [Notification Settings](../start-here/get-started/support-and-notifications.md)\*
* [Add Payment Providers](../start-here/get-started/add-payment-providers.md)

{% hint style="info" %}
\* Merchants using [**Shop Sync**](https://docs.29next.com/apps/shop-sync) to send Next Commerce orders to Shopify for fulfillment and customer communication may elect to **Disable** most Notifications.

It is recommended to keep the below notifications Active in most merchant scenarios:

* Refund Notification
* Subscription Canceled Notification
* Subscription Renewal Notification
* Subscription Update Payment Notification<br>

Be sure to set up and verify an [Email Sending Domain](../start-here/get-started/link-domains.md#email-sending-domains), and a [Default From Address](../start-here/get-started/support-and-notifications.md#notifications), to ensure notifications always carry your branding. &#x20;
{% endhint %}
