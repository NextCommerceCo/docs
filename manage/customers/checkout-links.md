---
description: Create quick links to send customers directly to a customized checkout
---

# Checkout Links

## Creating Checkout Links <a href="#checkout-links" id="checkout-links"></a>

Checkout Links are a simple way to create custom checkout experiences for your customers.  Place Checkout Links on any website, email, or web marketing channel to send customers directly to your store's checkout with items pre-loaded in their cart.  Your customer can then complete their purchase.

By appending [**marketing source attribution**](../../features/offers/marketing-attribution.md) parameters onto a custom Checkout Link, you can attribute the resulting sales from each link, and view them in [**Reports**](../../analytics/orders-reports.md#orders-by-utm).  For example, by appending unique **`utm_campaign`** values to several Checkout Links, you can track resulting sales across multiple marketing campaigns.&#x20;

Checkout Links can define the contents of a cart, any coupon (voucher) codes to automatically apply discounts, and whether the cart items should be sold one-time, or as a subscription.&#x20;

### Example Checkout Links <a href="#example-checkout-links" id="example-checkout-links"></a>

**As a One-time Purchase**

With the link below, two products would be added to the cart, and apply a voucher.

```
https://<store domain>/checkout/add/?product=12:1&product=13:3&voucher=PROMO&currency=usd
```

**As a Subscription**

With the following link, one product would be added to the cart as a subscription renewing every 3 months.

```
https://<store domain>/checkout/add/?product=12:1:3:month&currency=usd
```

{% hint style="info" %}
Replace \<store domain> in the link with the actual domain name of your store.  For example, all Checkout Links should follow the basic format\
\
`https://mystoredomain.com/checkout/add/`
{% endhint %}

### Supported Parameters <a href="#supported-parameters" id="supported-parameters"></a>

Checkout link parameters can be broadly split into two groups: Cart Parameters, which control the products, discounts, and sales model applied in the cart; and Attribution Parameters, which append marketing source attribution values to the cart and resulting orders.

#### **Cart Parameters**

| Parameter  | Values                          | Description                                                                                              |
| ---------- | ------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `product`  | id:qty:interval\_count:interval | Pass product ID, quantity, interval count (number of) and interval (day, week, month) to add to the cart |
| `voucher`  | voucher code                    | Apply a voucher to add to the cart                                                                       |
| `currency` | currency code                   | Set the currency for the cart and product prices                                                         |
| `replace`  | true/false                      | replace existing cart, default is true                                                                   |

#### **Attribution Parameters**

In addition to populating items into the cart, you can pass marketing source attribution parameters to attribute the order to your marketing channel.  Marketing sources values can be viewed across all orders via [**reports**](../../analytics/orders-reports.md#orders-overview).

{% hint style="info" %}
Checkout Links support adding custom [**attribution metadata**](../../build-a-store/technical-settings/metadata-fields-and-tags.md#metadata) values.  \
\
Example checkout link format carrying metadata field "FBEVENT":

```
https://<store domain>/checkout/add/?product=12:1&attribution_metadata.FBEVENT=XYZ&currency=usd
```
{% endhint %}

| Parameter                        | Description                                          |
| -------------------------------- | ---------------------------------------------------- |
| `utm_source`                     | referrer: (e.g. google, klaviyo)                     |
| `utm_medium`                     | marketing medium: (e.g. cpc, banner, email)          |
| `utm_campaign`                   | product, promo code, or campaign (e.g. spring\_sale) |
| `utm_term`                       | identifies the paid keywords                         |
| `utm_content`                    | used to differentiate ads                            |
| `funnel`                         | used to attribute funnels                            |
| `gclid`                          | Adwords click ID                                     |
| `evclid`                         | Everflow Click ID                                    |
| `aff`                            | affiliate / network                                  |
| `sub1`                           | sub affiliate 1                                      |
| `sub2`                           | sub affiliate 2                                      |
| `sub3`                           | sub affiliate 3                                      |
| `sub4`                           | sub affiliate 4                                      |
| `sub5`                           | sub affiliate 5                                      |
| `attribution_metadata.KEY=VALUE` | attribution metadata key/value pair                  |
