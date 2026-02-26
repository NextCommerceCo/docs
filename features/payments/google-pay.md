---
description: Offer Google Pay on your storefront checkout and over the API
icon: google
---

# Google Pay

Google Pay is supported as a payment method on the Next Commerce Storefront Checkout and over the **Admin API**.  Google Pay allows customers using Android or ChromeOS devices, or the Google Chrome browser, to securely and conveniently complete payments with a single tap.&#x20;

Google Pay is supported on the following gateways:

* Adyen&#x20;
* Authorize.Net
* Braintree
* Checkout.com
* NMI
* Stripe Payment Intents
* Test Gateway

## Google Pay Requirements

{% hint style="info" %}
Before creating a Google Pay account in NEXT merchants must set up a [**Google Pay Business profile**](https://pay.google.com/business/console)**.**
{% endhint %}

### Set up Google Pay Business Profile

From your Google Pay Account, navigate to the **Business Profile** section.  From there, follow the steps to register your Business Identity and Business Information.

Google will review your submission for Approval.

### Set up Google Pay API

Once your Business Profile is Approved, choose the **Google Pay API** menu and under **Integrate your Website** choose **Add Website.**

Input the following fields:

* Your website - input the website URL corresponding to your store's [**Primary Domain**](https://docs.29next.com/start-here/get-started-on-29-next/general-settings#domain-settings)
* Google API Integration Type - choose **Gateway**
* Screenshots of your buyflow - upload screen shots from your storefront cart and checkout flow to validate with Google.

Once all fields are filled, choose **Submit for approval**

{% hint style="info" %}
Google Pay must Approve your domain before you send live payment traffic.
{% endhint %}

## Create Google Pay Account

Once you have registered with Google Pay, your merchant name in the top navigation bar will show your Google Pay Merchant ID.

You can link your Google Pay account to NEXT by going to **Settings > Payments > Google Pay** and selecting **Create Google Pay Account.**&#x20;

Under Google Pay Account Details, enter the following values:

* Merchant ID&#x20;
* Merchant Name&#x20;
* Country

Select **Create**

### Add Google Pay to a Gateway

Now that you've created and configured your Google Pay account, you can associate it to an existing supported Gateway account.

* From the **Settings > Payments** view, choose a gateway ID
* On the Gateway Detail view, under **Google Pay,** associate your Google Pay profile to the gateway, then **Update Gateway.**
