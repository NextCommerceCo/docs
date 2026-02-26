---
description: Set up locales, languages, and currencies
icon: '4'
---

# Add Locations & Languages

Next Commerce offers support for international sales in multiple locales, languages, and currencies.  Before you start selling, you should configure the languages, currencies, and countries you plan to sell in.

It's useful to set up locales and currencies before you add Fulfillment Locations.

{% hint style="info" %}
**English** is the default language.
{% endhint %}

## Set Up Store Locales

From the **Settings > Localization** view, select locales for your Storefront.  Set a custom priority to determine which geo locale will be displayed by default, and the order in which they should be displayed in your storefront’s geo selector -- with the highest value being first. &#x20;

Assign a currency (required) and a language to each Geo created.

### **Additional Languages**&#x20;

Add languages to allow for localized content on your Storefront, your Dashboard content editors, and the Dashboard interface itself. &#x20;

The **Priority** sets the order in which languages will be displayed in your storefront’s language selector -- with the highest value being first.  Languages can also be set to non-public, meaning they won’t be available on the storefront to shoppers, but will still be supported in your Dashboard sales data and on the APIs.

The NEXT [**Checkout**](checkout-settings-and-policies.md) and customer [**Notifications**](support-and-notifications.md#notifications) are currently localized in a number of languages - contact your account representative if you have a custom language requirement.

* Français
* ภาษาไทย (Thai)
* Deutsch
* Svenska
* Nørsk
* Italiano
* Español
* Nederlands
* Português
* Suomi
* Dansk

## **Currencies**&#x20;

Assign currencies to one or more geo locales, and set priorities for default display and display order. &#x20;

When adding additional currencies, automatically assign a price record to your products or shipping methods in the new currency by clicking on the red **Unavailable** links.  You will then be prompted to&#x20;

* **Add Local Pricing** - select the checkbox to apply the current exchange rate to add prices to products or shipping methods.
* **Use Price Rounding Rule** - to preserve pricing presentation, optionally use a rounding rule for the calculated sub currency pricing.

{% hint style="info" %}
**Note:** For reporting purposes, transactions in all other currencies are converted to the base reporting currency in the Dashboard: **USD**<br>

NEXT updates foreign exchange rates automatically, at the averaged daily rate via [**Open Exchange Rates**](https://openexchangerates.org/), to calculate foreign exchange reporting conversions.
{% endhint %}

