---
description: Create and manage storefront pages with customizable templates
---

# Custom Pages

## External Marketing Funnels

Next Commerce supports fully customized marketing funnels, landing pages, checkouts, and upsell paths.  These externally-hosted sites or apps can be integrated for order processing via the server-side [**Admin API**](https://developers.29next.com/docs/api/admin/guides/external-checkout/)**,** or the client-side [**Campaigns API**](https://developers.29next.com/docs/api/campaigns/).

For ease of integration, third-party campaign frameworks such as [Unify CMS](https://www.codeclouds.com/unify-cms/) and [CTR Wow](https://www.ctrwow.com/) are  supported. &#x20;

For best practices related to custom marketing funnels, see the [**Campaign Integration Guide**](https://developers.29next.com/docs/api/admin/guides/external-checkout/)**.**&#x20;

{% hint style="info" %}
For externally hosted funnels, it is recommended to pass [**Source Attribution**](../../features/offers/marketing-attribution.md) values including the **`funnel`** ID with the order data in your API post.  This data is useful to evaluate the performance of various marketing sources with [**reports**](/broken/pages/-MZgboj9cTKD5mWScYhE), as well as to trigger postbacks to third party tracking tools like [**Everflow**](../../apps/everflow.md)**.**
{% endhint %}

### Creating Custom Pages

There are two paths to developing and managing custom storefront pages and templates - either via the Dashboard, or by using NEXT [**Theme Kit**](https://developers.29next.com/themes/guides/funnels/)**.**

To create a new page from the Dashboard, navigate to the **Storefront** menu and select **Pages.**&#x20;

Choose **New Page** and define your content:

* Title
* Content (includes HTML editor)
* URL Path
* (SEO) Meta Title
* (SEO) Meta Description
* Theme Template

{% hint style="info" %}
Learn more about custom [**Theme Templates**](https://developers.29next.com/docs/themes/guides/custom-page-templates/) and storefront content at the Developers portal.
{% endhint %}

### Custom Page Content

Once a Page has been created, the **Content** tab will appear.  From this Content tab add and edit the HTML content of the page directly.

{% hint style="info" %}
Use [**Checkout Links**](../../manage/customers/checkout-links.md) to create and place custom buttons or links directly to checkout, with the cart pre-loaded with items, and inclusive of marketing source attribution variables.&#x20;
{% endhint %}

### Adding CSS & Assets

Assets for your funnel page designs can be uploaded through the Dashboard's drag and drop uploader.&#x20;

Navigate to **Storefront > Assets** and choose **Upload Assets.**

Once uploaded, all assets are automatically available on AWS CloudFront CDN for optimal load time performance globally.

## Managing Funnels with Theme Kit

Using [**Theme Kit**](https://developers.29next.com/themes/theme-kit/) offers much greater control over the development of Storefront themes and hosted funnels.

{% hint style="info" %}
Get started with [**Theme Kit**](https://developers.29next.com/themes/theme-kit/), OAuth tokens, and more.  When you're ready to develop funnels as a Theme Developer, refer to [**the Funnels guide.**](https://developers.29next.com/themes/guides/funnels/)
{% endhint %}

Using **Theme Kit** allows local development using your favorite IDE. Running the **`ntk watch`** command will sync changes made locally to automatically update on the store.

Create new templates directly in your IDE and make them available as page templates for new funnel creation.&#x20;

For example, creating a new template in the funnels directory with the naming convention _**`page.<template name>.html`**_ would make a template available as a [**Theme Template.**](funnels.md#creating-funnels)  Assets and directory structures can be created and managed locally.&#x20;

## ⚠️ Funnels App

{% hint style="danger" %}
The legacy **Funnels** section functionality has been deprecated in favor of the [**Campaigns App**](../../apps/campaigns-app/)**.**
{% endhint %}
