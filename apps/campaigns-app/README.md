---
description: Connect custom checkouts to NEXT Campaigns API
icon: circle-bolt
---

# Campaigns App

Campaigns App simplifies and accelerates the deployment of custom marketing funnels and checkouts with Next Commerce's Campaigns API.

{% hint style="info" %}
**Campaigns** is an installable **App** in your Next Commerce store.  Head to the **Apps** menu on the NEXT dashboard to install it.
{% endhint %}

## Custom Funnels with Campaigns API

Next Commerce supports fully custom marketing funnels, including checkouts, and post-purchase upsells.  The server side API method for creating fully custom flows is to use the [**Admin API**](https://developers.nextcommerce.com/docs/api/admin/guides/external-checkout/) with a server to server connection.

Now, with **Campaigns App**, there is no need for server to server backend API integration.  The Campaigns App leverages a frontend CORS-enabled API to allow for custom funnels without a backend integration.

{% hint style="info" %}
Developers can leverage a robust pre-built framework [**NEXT Campaigns Cart JS SDK**](https://developers.nextcommerce.com/docs/campaign-cart/) to accelerate custom marketing funnel development on Campaigns App.
{% endhint %}

Learn more about the [**NEXT Campaigns API**](https://developers.nextcommerce.com/docs/api/campaigns/) and the best practices for creating and deploying fully-custom customer experiences.

## Configure Campaigns App

Once installed, from the **Apps** menu select Campaigns App - Actions - Settings to open the Campaign App workspace. &#x20;

{% hint style="info" %}
**Hint** -  Pin the Campaigns App to the dashboard side bar for quick access.
{% endhint %}

From the side bar, under **Campaigns App**, select the **Settings** menu.

* Select **Add Domain** to whitelist a domain for your custom marketing funnel. &#x20;
* Specify the domain's **Environment** - whether it should be a domain used for **Development** purposes, or a **Production** domain. &#x20;

Both types of domain environments accept live orders, but analytics tracking events are not recorded on Development domains.

{% hint style="danger" %}
Campaigns API requires that all API calls are made from a whitelisted domain for security purposes.
{% endhint %}

Next, from the **Campaigns App** main work space, select **New Campaign** to configure your campaign.  Input the following:

* **Name** - the internal reference name for your campaign.
* **Default Currency** - choose the base currency for the campaign.
* **Additional Currencies** - optionally add additional currencies for multi-geo campaigns.
* **Language** - select from a list of the languages supported by the store.
* **Payment Gateway Group** - assign a [**gateway group**](../../features/payments/#gateway-groups) to the campaign, or leave blank to use the store's default gateway group.
* **Available Payment Methods** - define the payment methods to be accepted on your campaign's checkout.&#x20;
* **Available Express Payment Methods** - define the express payment methods (PayPal, ApplePay, etc) to use on your campaign's checkout.
* **PayPal Account ID** - assign a PayPal account to the campaign, or leave blank to use the store's [**default PayPal account.**](../../features/payments/paypal.md#configure-paypal)
* **Statement Descriptor** - define a custom descriptor to appear on your customer's card statement for your campaign (for payment gateways supporting dynamic descriptors only).

### Campaigns App Logs

From the side bar menu under **Campaigns App**, select the **Logs** menu. The Activity Logs show&#x20;

Logs are filterable by the following factors to assist in debugging and analyzing performance:

* API Method
* Campaign
* Payment Method
* Referrer
* Date created from/to
* Email Address
* Status (Success / Failed)

