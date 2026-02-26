---
description: Automate fulfillment with the leading warehouse management app
---

# 3PL Central

Extensiv 3PL Warehouse Manager, or **3PL Central**, is a leading warehouse management solution for ecommerce sellers and fulfillment providers, and is available to install as a fulfillment service app to automate the processing of your order shipments.

{% hint style="info" %}
3PL Central is an App, installable via the **Apps** menu in your Next Commerce store. \
For developers - learn more about [**Fulfillment Service Apps**](https://developers.29next.com/docs/apps/guides/fulfillment-service/)
{% endhint %}

## Set Up 3PL Central App

Once installed, from the **Apps** section choose **3PL Central > Actions > Settings.**

Select **Create Location** to connect your fulfillment provider's location to your store.  Input the following fields to set up the integration:

* **Name -** Provide a [**Location name**](../start-here/get-started/fulfillment-settings.md#fulfillment-locations) which will display throughout the store's [**order management**](../manage/orders/order-management.md) views
* **Client ID -** Input your 3PL Central API access Client ID
* **Client Secret -** Input the 3PL Central API access Client Secret
* **Client Secret Login/Username** - Provide your 3PL Central Username
* **Create**

Your Fulfillment Location will now be set up to automatically process orders, and will be accessible in the store's [**Fulfillment Settings**](../start-here/get-started/fulfillment-settings.md#fulfillment-locations).

### Map Shipping Methods

You may optionally map your store's [**Shipping Methods**](../start-here/get-started/fulfillment-settings.md#set-up-shipping-methods) to shipping services supported by your fulfillment provider via 3PL Central.

From the **Location Settings**, choose **Add Mapping.**  Select from the list of your store's existing Shipping Methods to map to a requested shipping service supported by your fulfillment provider.

{% hint style="info" %}
Mapping your store's Shipping Methods to a specific carrier service is not required, and is an optional step.  Consult your fulfillment provider for fine tuning of your integration to suit your store's specific requirements.&#x20;
{% endhint %}

### App Logs

The **Logs** tab lists all the order fulfillment events that were synced to your fulfillment location via the 3PL Central app, to assist in tracing events on an order level where necessary.&#x20;

### Update Shipping Addresses

If an order is already **Processing** and has been accepted for fulfillment by 3PL Central, it can still be edited in many cases.  To update a customer's shipping address for an order that's already been submitted to 3PL Central, follow these steps from the [**Order Details View**](../manage/orders/order-management.md#order-details-view):

* Request to Cancel the fulfilment
* (If the request is accepted) proceed to update the Shipping Address
* Request Fulfillment again

The fulfillment will be posted again to 3PL Central with the updated customer Shipping Address.
