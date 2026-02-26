---
description: Build out your store's catalogue of products
---

# Add Products

## Create a Product

When you're ready to create a Product to sell in your store, head to the **Products** menu and choose **New Product.**

Choose whether you want to sell a **Stand-alone Product**, or a **Product with Variants**, then choose **Create New Product.**

## Product Details View

From the Product Details view, you're ready to add or modify all the details of your product.

### **Set Pricing**

Set up pricing in one or multiple currencies for your product.  Choose **Add Price** to set pricing with the following values:

* **Currency\*** - the unique currency value in which a product is sold, allowing for locale-specific pricing on your storefront
* **Price\*** - this is the selling price for the product that appears on the storefront
* **Price (Retail)** - optionally, this default full price for the product appears on the storefront product page as ~~struck through~~

Optionally, choose whether to **Charge Tax on this Product**&#x20;

* **Tax Class -** assign a [**Tax Class**](tax-settings.md#tax-classes) to individual SKUs when tax is enabled

#### Optional fields when setting up Product Pricing

* **Subscription Price** - available for products with **Subscription** enabled, this is the default price for subscription purchases
* **Subscription Suggested Downsell Price** - sets a suggested incentive price for subscription downsells upon subscriber cancel requests

{% hint style="info" %}
Adding subscription-specific prices is useful for [**subscription management**](../../manage/subscriptions-guide/managing-subscriptions.md) scenarios by your store's customer service and sales reps.
{% endhint %}

### Add Product Content

Add content to customize your product page on the storefront.  Switch to HTML view to add custom HTML.  If your store supports [**multiple languages**](../../start-here/get-started/add-locations-and-languages.md#additional-languages), you may input translated content via the language tabs:

* **Title** - the name of the product
* **Description** - a longer form description of the product

#### Images

Upload one or more images of your product.  When creating [**Product Variants**](product-variants.md) you can choose to assign one of the series of images to each variant, for example to display a certain size or color option for a variant.

#### Product Details

Set up the following product details:

* **Is Discountable -** set to allow the product to be discounted via [**Offers**](../../features/offers/) & [**Coupons**](../../features/offers/coupons.md)
* **Is Public -** set to show or hide the product from the storefront
* **Ranking -** set the product priority, with the higher value products appearing first in the storefront shop area

#### Product Categories

If you've set up [**Categories**](add-products.md#product-categories) you may assign one or more to your product from this view.

#### Purchase Options

Choose to **Enable Subscription** for products to allow them to be included in subscription orders, and specify the billing interval(s) for subscriptions.

#### Shipping Options

Choose whether the product should be shippable or not.  For products that do not require shipping, customers will not be required to enter a shipping address at checkout.

* **Requires Shipping** - physical products that will be shipped by a fulfillment location &#x20;
* **Digital Product or Service** - virtual products fulfilled electronically

#### Identifiers

Optionally add additional product details:

* **UPC -** if available, the barcode UPC of the product
* **Tax Code -** optionally assign a [**Tax Code**](tax-settings.md) to override the category default (if applicable)

### Product Template

Optionally, when available, choose a custom Theme Template to assign to the Product to control its look and feel on your storefront.  Custom Product Pages are commonly used to showcase a marquee product, or to create a custom look and feel to improve storefront conversion rates.

{% hint style="info" %}
**Theme Developers** **-** to learn about custom storefront product pages, and how to create and customize theme templates, check out the Next Commerce [**developer docs**](https://developers.29next.com/docs/themes/guides/custom-product-templates/)**.**
{% endhint %}

### Product Attributes & Product Variants

See [**Product Variants**](product-variants.md#understanding-product-variants) for more on how to customize attributes, variants, and more.
