---
description: Set up Shipping Methods, Prices, and Fulfillment Locations
icon: '7'
---

# Fulfillment Settings

## **Fulfillment Locations**

Navigate to **Settings > Fulfillment** to add or edit fulfillment locations in your store.  A Location is equivalent to a fulfillment provider's physical warehouse.

You will be prompted to enter a name and physical address for the Location, and a **Processing By** value to designate which automated integration will be used by the Location.  Choose **Manual** if fulfillment will be done with manual processes in your store.&#x20;

Set up **Allowed Destination Countries** if you want to limit the countries served by this Location.  This is useful as a way to manually route orders from specific countries to designated Fulfillment Location(s), bypassing the [**Location-Based Routing**](../../features/fulfillment-guide/location-based-routing.md) settings.

{% hint style="info" %}
For automated fulfillment by [**Shipstation**](../../apps/shipstation.md) or another supported integration, you should set up the corresponding **App** first, then return to the Location setup to update the **Processing By** setting.
{% endhint %}

## **Shipping Methods**

Offer multiple shipping methods, and set fees for each method in multiple currencies for your store's customers.

### Set Up Shipping Methods

Navigate to **Settings > Fulfillment > Add Shipping Method**.&#x20;

Configure the shipping method details:

* **Name** - used for reference on the Dashboard and throughout the store, this value is also visible to customers in the storefront checkout flow.  Note, if your store supports multiple locales and languages, you can edit each name individually.
* **Code** - used to reference this shipping method on the API.
* **Description** - shows in the storefront checkout flow as a brief description of the shipping method.
* **Countries** - used to specify which countries this shipping method can be used to ship to.
* **Delivery Time** - a delivery time estimate to be shown to customers in the store checkout flow.

If only a single shipping method is configured, this default shipping method and its associated fees would apply for all orders.

{% hint style="info" %}
For orders created on the [**Admin API**](https://developers.nextcommerce.com/docs/api/admin/) a shipping method can be passed into the **`shipping_code`** parameter.  \
\
Alternatively, a custom shipping price may be passed on the API to override the shipping method's default price, using the **`shipping_price`** parameter. &#x20;
{% endhint %}

Next, set up Pricing for your Shipping Method, by configuring the following:

* **Currency** - the currency that applies to the shipping method pricing
* **Price Per Order** - used to set a shipping price for the entire order

{% hint style="info" %}
With a single shipping method configured, the storefront checkout flow will not prompt the customer to choose their shipping method.  Instead, it will present only two steps to the customer to complete their checkout:\
\
**1) Customer Information -> 2) Payment**
{% endhint %}

### **Fulfillment Settings**

Toggle whether orders should automatically be sent to your integrated Location. &#x20;

Optionally configure an **Automatic fulfillment processing delay** to allow orders to remain in **Confirmed** status for a set number of hours, before being transitioned to **Processing** status and sent to fulfillment locations. &#x20;

This setting is useful if your customers often wish to modify or cancel their orders, or update their address details, soon after placing them.&#x20;

Check out the Orders Guide for more information on order [**Fulfillment Status Changes.**](../../manage/orders/#fulfillment-statuses)
