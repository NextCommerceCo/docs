---
description: Automate Fulfillment with the leading Shipping Software
---

# ShipStation

ShipStation is a leading shipping management solution for ecommerce sellers, and is available to install as a fulfillment service app to automate the processing of your order shipments.

{% hint style="info" %}
ShipStation is an App, installable via the **Apps** menu in your NEXT store. \
For developers - learn more about [**Fulfillment Service Apps**](https://developers.29next.com/docs/apps/guides/fulfillment-service/)
{% endhint %}

## Set Up ShipStation App

Once installed, from the **Apps** section choose **Shipstation > Actions > Settings.**

Connect ShipStation to your existing Fulfillment Location

* Select **Location Config**
* **Add Location Config**
* Select the [**Location**](../start-here/get-started/fulfillment-settings.md#fulfillment-locations) to map to the ShipStation App
* Input your ShipStation **API Key and API Secret**
* The **Store** list will allow you to choose a ShipStation store that is associated to that API Key.
* Select your **Currency**
* **Save**

### Map Shipping Methods

You may optionally map your store's [**Shipping Methods**](../start-here/get-started/fulfillment-settings.md#set-up-shipping-methods) to shipping services supported by your fulfillment provider via ShipStation.

From the **Shipping Method Config** tab, choose **Add Shipping Method Config.**  Select from the list of your store's existing Shipping Methods to map to a requested shipping service.

{% hint style="info" %}
Mapping your store's Shipping Methods to a specific carrier service is not required, and is an optional step.  Consult your fulfillment provider for fine tuning of your integration to suit your store's specific requirements.&#x20;
{% endhint %}

### App Logs

The **Logs** tab lists all the order fulfillment events that were synced to your fulfillment location via the ShipStation app, to assist in tracing events on an order level where necessary.&#x20;

### Update Shipping Addresses

If an order is already **Processing** and has been accepted for fulfillment by ShipStation, it can still be edited in many cases.  To update a customer's shipping address for an order that's already been submitted to ShipStation, follow these steps from the [**Order Details View**](../manage/orders/order-management.md#order-details-view):

* Request to Cancel the fulfilment
* (If the request is accepted) proceed to update the Shipping Address
* Request Fulfillment again

The fulfillment will be posted again to ShipStation with the updated customer Shipping Address.
