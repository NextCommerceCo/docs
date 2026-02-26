---
description: >-
  Assign and collect marketing source attribution and affiliate marketing data
  points on orders
---

# Marketing Attribution

Pass marketing source attribution values with your orders to collect marketing and affiliate attribution data for [**reporting**](../../analytics/orders-reports.md#orders-overview) visibility, and partner marketing postbacks - for example when using tracking extensions like [**Everflow**](../../apps/everflow.md).&#x20;

Source attribution values are supported on the [**Storefront**](../../build-a-store/storefront/) checkout and product pages, as well as on custom funnels integrated via the [**Admin API**](https://developers.29next.com/docs/api/admin/).&#x20;

Pass [**Google UTM parameters**](https://ga-dev-tools.appspot.com/campaign-url-builder/), Affiliate / Sub-Affiliate, and Funnel values according to the unique source or marketing path. You may use the source attribution data when firing tracking pixels on the success / confirmation page.

### **Querystring Parameters**

<table data-header-hidden><thead><tr><th width="314.3333333333333"></th><th width="311"></th><th></th></tr></thead><tbody><tr><td><strong>URL Parameter</strong></td><td><strong>Detail</strong></td><td><strong>Cookie</strong></td></tr><tr><td>utm_source</td><td>The referrer: (e.g. google, newsletter)</td><td>marketing</td></tr><tr><td>utm_medium</td><td>Marketing medium: (e.g. cpc, banner, email)</td><td>marketing</td></tr><tr><td>utm_campaign</td><td>Product, promo code, or slogan (e.g. spring_sale)</td><td>marketing</td></tr><tr><td>utm_term</td><td>Identify the paid keywords</td><td>marketing</td></tr><tr><td>utm_content</td><td>Use to differentiate ads</td><td>marketing</td></tr><tr><td>funnel</td><td>Use to attribute funnels</td><td>marketing</td></tr><tr><td>gclid</td><td>Adwords click ID</td><td>marketing</td></tr><tr><td>evclid</td><td>Everflow Click ID</td><td>marketing</td></tr><tr><td>aff</td><td>Main affiliate / network</td><td>affiliate</td></tr><tr><td>sub1</td><td>Sub affiliate 1</td><td>affiliate</td></tr><tr><td>sub2</td><td>Sub affiliate 2</td><td>affiliate</td></tr><tr><td>sub3</td><td>Sub affiliate 3</td><td>affiliate</td></tr><tr><td>sub4</td><td>Sub affiliate 4</td><td>affiliate</td></tr><tr><td>sub5</td><td>Sub affiliate 5</td><td>affiliate</td></tr><tr><td>attribution_metadata.KEY=VALUE</td><td>Attribution Metadata key/value pair</td><td>marketing</td></tr><tr><td>clear_attribution</td><td>true (default) / false</td><td>marketing</td></tr></tbody></table>



{% hint style="info" %}
**Example URL Structures**

* https://my.next.store/landing/?aff=9876543\&sub1=56\&sub2=98\&funnel=22\&clear\_attribution=true
* https://my.marketingdomain.com/landing/?utm\_source=affiliate\&utm\_medium=cpc\&utm\_campaign=camp1a\&utm\_term=skin+care\&gclid=45ad-asdf234-vasdf\&aff=9876543\&sub1=56\&sub2=98\&funnel=v5
{% endhint %}

### **Last Click Attribution**

Next Commerce applies a "Last Click" attribution model by default, meaning that attribution values are applied based on the most recent visit.  You may customize and control this behavior using the custom querystring parameter **`clear_attribution`**

To preserve the "First Click" attribution values on a returning visitor, pass the querystring parameter **`clear_attribution=false`**

If you wish to apply additional attribution values to an existing visitor, you may pass **`clear_attribution=false`** in the querystring, along with the additional querystring parameters which will be saved alongside the intial values.  The most recent attribution value will take precendence in case of a duplicated value -- for example existing **`sub4=abc`** and new click **`sub4=123`**, value of **`123`** will be applied on **`sub4`** field.

### **Cookies**

Two cookies are generated for the attribution data, split by marketing for UTM/Google parameters, and affiliate source values.&#x20;

| Cookie        | Detail                | Expires       |
| ------------- | --------------------- | ------------- |
| AffiliateData | affiliate source data | 1 day         |
| MarketingData | marketing source data | browser close |
| sessionid     | cm session id of user | browser close |

### **Data Storage**

The marketing source attribution data is kept in the cookies and sent to the store's database when a cart is created and associated to a customer. All marketing source attribution data is stored in its own data model, which can be queried from carts, orders, and subscriptions for reporting purposes.
