---
description: Customize your store's checkout design, flow, and functionality
icon: '5'
---

# Checkout Settings & Policies

## Checkout Configurations

Customize the look and feel of your storefront checkout with Configurations.

* **Customize** - launch the checkout design editor to visually customize a variety of elements on the checkout page, including logo size, positioning, color scheme, layout elements, and more.
* **Duplicate** - clone a checkout design configuration in one click.
* **Publish** - enable the configuration for use on your storefront&#x20;

## Checkout Settings

Navigate to **Settings > Checkout** to customize your storefront’s checkout.

### Checkout Layout

Choose from a Three Page Checkout flow (default) or a more streamlined Single Page Checkout for your storefront checkout.

#### Cart Max Item Quantity

Put restrictions on the maximum number of items allowed in a customer’s shopping cart.  Some merchants prefer to limit the number of items a customer can purchase in a single order for security reasons.

#### Cart Coupon Limit

Define the maximum number of coupons a customer can use in a single checkout session.  Most merchants choose to restrict this to 2 or 3, to allow for limited combinations of [**discounts**](../../features/offers/).

#### Require Phone Number on Shipping Address

Configure whether to require a phone number on the customer's shipping address details.  Phone number is an optional field when left unchecked, but it's recommended to collect phone details from customers to ensure that shipping carriers can deliver their orders without issue.

#### Prevent Duplicate Orders

Enable this setting to prevent customers from placing multiple orders of the same value within a 30 minute window.

{% hint style="info" %}
Prevent Duplicate Orders does not affect the **`orders_add_line_items`** API.  In other words, upsell transactions of the same amount as the original order will not be blocked by duplicate prevention.
{% endhint %}

### Google Maps API

#### Set Up Google Maps on the Storefront Order Status Page

Merchants can enhance their store's checkout experience by displaying a Google Map on the order confirmation (order status) page. This requires setting up a Google Maps API key.&#x20;

{% hint style="info" %}
Google Cloud offers a free credit tier that may allow for Maps to be implemented at no cost for many merchants.
{% endhint %}

Follow these simple steps to get started:

**Step 1: Create a Google Maps API Key**

* Go to the [**Google Maps Platform**](https://mapsplatform.google.com/) and choose **Get Started**.
* Select an existing Google Cloud Project or create a New Project. &#x20;
* Select your project from the menu.

**Step 2: Enable the Google Maps JavaScript API**

* Select from the Google Cloud menu **API & Services > Library**&#x20;
* Find the **Maps JavaScript API** and from details page choose **Enable**

**Step 3: Create API Credentials**

* Select from the Google Cloud menu **API & Services > Credentials**&#x20;
* Select **Create Credentials** and choose **API Key**
* For security you should restrict your API key usage to your storefront [**domain**](link-domains.md#domains). View the API Key details, and under **Key restrictions** set an application restriction > Websites - to add your domain so that the key can only be used on your storefront.
* Once configured, make sure to copy the key and store it securely.

**Step 4: Integrate the API Key into Your Store Checkout Settings**

* In your store go to **Settings > Checkout**
* Add your newly created Google Maps API key and **Save**

**Step 5: Verify**

* On an existing order, from the [**Order Details**](../../manage/orders/order-management.md#order-details-view) view, choose **More Actions > View Order Status Page** to verify that the Google Map is displayed correctly.

## Store Policies

From **Settings > Policies** you can input Terms & Conditions, Privacy Policy, and Subscription Terms content for your store.

To insert custom policy content into your storefront checkout theme, to be linked in the checkout page footer, or to add specialized Subscription Terms & Conditions disclosures, choose the appropriate tab and add or edit the HTML content.
