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
* [POST: apple-search-ads/campaign](#apple-search-ads/campaign)
* [GET: apple-search-ads/campaign](#apple-search-ads/campaign)



#### <font style="background-color:dimgray; color:bisque" >POST</font> apple-search-ads/campaign<a name="apple-search-ads/campaign"></a>

| Param |
| --- |
| campaignId | 
| args | 

#### <font style="background-color:dimgray; color:bisque" >GET</font> apple-search-ads/campaign<a name="apple-search-ads/campaign"></a>

| Param | Type | Description |
| --- | --- | --- |
| campaignId | <code>number</code> | Campaign id in SearchAds. |

