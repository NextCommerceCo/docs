---
description: Map your products to sellable inventories at fulfillment locations
---

# Inventory

## **Product SKUs**

Each Product has a corresponding SKU, which represents an actual sellable physical item in your warehouse, or a virtual SKU in the case of digital products.

SKUs can exist at multiple [**Fulfillment Locations**](../../start-here/get-started/fulfillment-settings.md#fulfillment-locations)**,** with pricing in multiple currencie&#x73;_,_ allowing for **split fulfillment** - a single product sold via multiple warehouses in multiple locales, with inventories tracked separately.

{% hint style="info" %}
Learn about location-based [**Order Routing**](../../features/fulfillment-guide/location-based-routing.md) rules for scenarios where orders may be fulfilled from multiple locations. &#x20;
{% endhint %}

## Configure SKU & Fulfillment Locations

{% hint style="info" %}
From the **Products** menu, the **Inventory** list view shows a list of all your SKUs and inventory levels.  Click **Edit** on any inventory item for quick access to SKU-level price and location configurations.
{% endhint %}

From the [**Product Details View**](add-products.md#product-details-view), on the **Inventory** card, choose **Add Location.**&#x20;

Link one or more locations from your store's available list of[ **Fulfillment Locations**](../../start-here/get-started/fulfillment-settings.md#fulfillment-locations)**.**

{% hint style="info" %}
For Variant Products, choose **Variants** to view the **Inventory** card to set up corresponding SKU's Fulfillment Location(s)&#x20;
{% endhint %}

* **Fulfillment Location\*** - this is the shipping location where orders are sent to be fulfilled by a  fulfillment provider
* **SKU\*** - this is the fulfillment location's reference for your product's physical stock keeping unit.

### **Tracking Stock Levels**

Optionally, set up tracking of inventory stock levels on your [**Products**](./). &#x20;

When **Track Stock Levels** is enabled, you must either maintain inventory count above zero to ensure your product is eligible for sale on the storefront, or you must enable **Allow Backorders**.&#x20;

On the Fulfillment Location, choose Edit to input the following values:

* **Number in Stock\***
* **Low Stock Threshold** - optional

{% hint style="info" %}
#### Low Stock Alerts

Navigate to **Products > Inventory > Low Stock Alerts** to see a list of alerts for products that have fallen below their **Low Stock Threshold.** &#x20;
{% endhint %}

## Inventory Management

From the **Products** menu, the **Inventory** list view shows a list of all your SKUs and inventory levels. &#x20;

* Click **Edit** on any inventory item for quick access to SKU-level price and location configurations.

For bulk inventory management, choose **Export** to download a CSV file of all SKUs, locations and inventories, then edit the resulting file to add any new locations or inventory levels.  Upload the file using the **Import** function to sync inventory levels and locations in batch.
