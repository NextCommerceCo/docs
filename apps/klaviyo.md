---
description: Integrate Marketing Automation for Email & SMS
---

# Klaviyo

Klaviyo is a leading ecommerce marketing automation and CRM platform that integrates to Next Commerce as an App.  With Klaviyo, you can engage your prospects and customers at every step of the customer lifecycle through email and SMS.

{% hint style="info" %}
Klaviyo is an installable App, available to install from the Apps menu on your NEXT Dashboard.
{% endhint %}

## Overview

Next Commerce integrates Klaviyo both on the storefront theme with Klaviyo's tracking javascript, as well as behind the scenes with a server to server API integration.

### Installation

To install the Klaviyo app on your store, navigate to Apps and find Klaviyo in the installable apps. During the installation flow, you'll be asked to provide access to your existing Klaviyo account to make the conncetion between your store and your Klaviyo account.

### Supported Ecommerce Events

The following events in NEXT are synced to Klaviyo.  NEXT also provides personalized Checkout URLs, so customers may return to abandoned carts and checkout with their details pre-populated.

* customer.created
* customer.updated
* cart.abandoned
* order.created
* order.updated
* subscription.created
* subscription.updated
* app.uninstalled

Klaviyo standard events available in Campaigns and Flows:

* Active on Site
* Viewed Product
* Added to Cart
* Started Checkout\*
* Started Subscription
* Cancelled Subscription
* Fulfilled Order
* Cancelled Order
* Refunded Order

{% hint style="info" %}
The **Started Checkout** event is supported by both the front-end Klaviyo javascript tag, as well as the server to server API.\
\
To prevent duplicate events from firing you may wish to disable the **Send Started Checkout Event with Abandoned Cart** setting in the Klaviyo App Settings.
{% endhint %}

## Configure Klaviyo

Once you've installed Klaviyo, choose **Actions > Settings** to configure the connection between your store and your Klaviyo account.

The app install process automatically connects your Klaviyo account with Next Commerce via the Klaviyo API.  No manual configuration is required.

### Delay Order Confirmation Events

Select this to delay the posting of order events to Klaviyo by 10 minutes, to allow for post-checkout upsells to be added to the original order. This ensures that Klaviyo captures the full value of orders.

### Default Subscription List

Choose the List from your Klaviyo account to use as the default for all email signups processed by the Klaviyo App.  It's recommended to set this list to "Single Opt-in" in Klaviyo in the list's Consent settings, to ensure that customers who opt-in on your website forms are successfully subscribed to your email flows and campaigns.

### SMS Consent

Optionally, choose to Enable SMS Consent if you wish to communicate with your customers by SMS.  _Note, you must obtain explicit informed consent from your customers before sending SMS marketing to them._

{% hint style="info" %}
If you have obtained SMS consent from your customers on your storefront or custom marketing funnels, you may designate your SMS Consent List in Klaviyo to add customers with "Single Opt-In".  \
\
For more on the requirements for SMS Consent, see [Klaviyo's docs.](https://help.klaviyo.com/hc/en-us/articles/115005251108-Understanding-the-double-opt-In-process)
{% endhint %}

### Sending Test Data to Klaviyo

It is recommended to only use the **Enable Sending Test Data** to Klaviyo setting when testing your integration and data flow.  For general use this setting should be disabled to prevent Klaviyo from counting test order values as real store revenue.

### Sync Products

To sync your product [**Catalogue**](../build-a-store/catalogue/), in the Klaviyo App simply check the **Sync Product Catalogue to Klaviyo** checkout, and all of your store's products will be automatically synced to Klaviyo.
