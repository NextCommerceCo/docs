---
description: Set up your PayPal account to use for storefront checkout and over the API
icon: paypal
---

# PayPal

## Configure **PayPal**&#x20;

PayPal is a payment method offering a variety of payment features both in the storefront checkout and for orders created over the Admin and Campaigns APIs.

* From **Settings** > **Payments**&#x20;
* Select **PayPal Express Checkout** and click on **Activate PayPal.**
* Choose **Connect PayPal Account** to link your PayPal account with an automated flow.
* Optionally, choose **Add Manual Account** to connect your PayPal REST API credentials manually to your store.&#x20;

{% hint style="info" %}
Next Commerce supports the use of multiple PayPal accounts in a single store.  The Default account will be used for storefront checkouts, but over the Admin API you can designate a PayPal account ID to use for external checkout flows.
{% endhint %}

### PayPal Optional Features

For testing purposes, it's recommended to create a PayPal account with “Environment” set to Sandbox, and a second account with the "Live" production credentials.  When you’re ready to accept live transactions, be sure to switch the “Live” environment to your default.

Next Commerce supports automated uploading of shipment carrier and tracking number information to PayPal for PayPal orders.  Uploading tracking data to PayPal is recommended to minimize the risk of disputes and provide the best customer service to PayPal buyers.

### **PayPal via API**

For implementations of PayPal over the Admin API and Campaigns API, including "one click checkout" features, see the [**PayPal Admin API Guide**](https://developers.29next.com/docs/api/admin/guides/paypal/)
