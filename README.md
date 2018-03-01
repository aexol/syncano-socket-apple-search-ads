# Apple SearchAds syncano socket

## About
Socket wrapping Apple SearchAds API

## Installation

Install socket from syncano registry. 

```sh
$ npx s add apple-search-ads
```

### Config

* **pem** - PEM certificate from SearchAds Web UI
* **key** - certificate key from SearchAds Web UI
* **orgId** - orgId that you wish to manage from SearchAds Web UI
* **expose** - Expose auth info on `apple-search-ads/auth` endpoint. Optional.

*Note: You can just set pem/key configs as some short value like `pem`
and then run `$ npx s config-set apple-search-ads pem -- "$(cat cert.pem)"`,
`$ npx s config-set apple-search-ads key -- "$(cat cert.key)"`*

## Socket apple-search-ads REST Api
* [POST: apple-search-ads/campaign](#apple-search-ads/campaign) - Update campaign.
* [POST: apple-search-ads/campaigns](#apple-search-ads/campaigns) - Create campaign.
* [POST: apple-search-ads/find-campaign](#apple-search-ads/find-campaign) - Find campaigns.
* [GET/POST apple-search-ads/auth](#apple-search-ads/auth) - Get SearchAds auth info.
* [GET: apple-search-ads/campaign](#apple-search-ads/campaign) - Get campaign.
* [GET: apple-search-ads/campaigns](#apple-search-ads/campaigns) - List campaigns.
* [POST: apple-search-ads/find-campaign](#apple-search-ads/find-campaign) - Find campaigns.



#### <font style="background-color:dimgray; color:bisque" >POST</font> apple-search-ads/campaign<a name="apple-search-ads/campaign"></a>
Update campaign matching campaignId. See [SearchAds API Campaign Object](https://developer.apple.com/library/content/documentation/General/Conceptual/AppStoreSearchAdsAPIReference/Campaign_Resources.html#//apple_ref/doc/uid/TP40017495-CH14-SW2) for more details


| Param | Type | Description |
| --- | --- | --- |
| campaignId | <code>number</code> | Campaign id. |
| name | <code>string</code> | New name. |
| budgetAmount | <code>Object</code> | Update budget amount. Can only be increased. |
| dailyBudgetAmount | <code>Object</code> | Update daily budget cap. |
| adamId | <code>number</code> | Application adamId. |
| status | <code>enum</code> | Update campaign status. ENABLED|PAUSED. |
| negativeKeywords | <code>Array</code> | Negative keywords. |
| adGroups | <code>Array</code> | New adGroups |
| storefront | <code>enum</code> |  |

#### <font style="background-color:dimgray; color:bisque" >POST</font> apple-search-ads/campaigns<a name="apple-search-ads/campaigns"></a>
Create new campaign. See [SearchAds API Campaign Object](https://developer.apple.com/library/content/documentation/General/Conceptual/AppStoreSearchAdsAPIReference/Campaign_Resources.html#//apple_ref/doc/uid/TP40017495-CH14-SW2) for more details


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | New name. |
| budgetAmount | <code>Object</code> | Budget amount. Can only be increased. |
| dailyBudgetAmount | <code>Object</code> | Daily budget cap. |
| adamId | <code>number</code> | Application adamId. |
| status | <code>enum</code> | Campaign status. ENABLED|PAUSED. |
| negativeKeywords | <code>Array</code> | Negative keywords. |
| adGroups | <code>Array</code> | New adGroups |
| storefront | <code>enum</code> |  |

#### <font style="background-color:dimgray; color:bisque" >POST</font> apple-search-ads/find-campaign<a name="apple-search-ads/find-campaign"></a>
Find campaigns in org. See [SearchAds API Selector](https://developer.apple.com/library/content/documentation/General/Conceptual/AppStoreSearchAdsAPIReference/API_Overview.html#//apple_ref/doc/uid/TP40017495-CH7-SW11) for more details


| Param | Type | Description |
| --- | --- | --- |
| conditions | <code>Array</code> | Find conditions. Optional. |
| fields | <code>array</code> | Limit returned fields. Optional. |
| orderBy | <code>Object</code> | Sort results. |
| pagination | <code>Object</code> | Results pagination. |

#### <font style="background-color:dimgray; color:bisque" >GET/POST</font> apple-search-ads/auth<a name="apple-search-ads/auth"></a>
If socket is configured to expose auth, this endpoint can be
called with Account Key or from another socket to access SearchAds auth
details.

#### <font style="background-color:dimgray; color:bisque" >GET</font> apple-search-ads/campaign<a name="apple-search-ads/campaign"></a>
Return details about campaign matching campaignId.


| Param | Type | Description |
| --- | --- | --- |
| campaignId | <code>number</code> | Campaign id in SearchAds. |

#### <font style="background-color:dimgray; color:bisque" >GET</font> apple-search-ads/campaigns<a name="apple-search-ads/campaigns"></a>
List all campaigns in this orgId.

#### <font style="background-color:dimgray; color:bisque" >POST</font> apple-search-ads/find-campaign<a name="apple-search-ads/find-campaign"></a>
Find campaigns in org. See [SearchAds API Selector](https://developer.apple.com/library/content/documentation/General/Conceptual/AppStoreSearchAdsAPIReference/API_Overview.html#//apple_ref/doc/uid/TP40017495-CH7-SW11) for more details


| Param | Type | Description |
| --- | --- | --- |
| conditions | <code>Array</code> | Find conditions. Optional. |
| fields | <code>array</code> | Limit returned fields. Optional. |
| orderBy | <code>Object</code> | Sort results. |
| pagination | <code>Object</code> | Results pagination. |

