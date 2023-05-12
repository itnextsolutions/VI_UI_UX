import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { AnyARecord } from 'dns';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(
    private titleService: Title,
    private metaTagService: Meta,
    @Inject(PLATFORM_ID) private platformId: string,
    @Inject(DOCUMENT) private dom:any
  ) { }

  changeTitle(product:any) {
    this.titleService.setTitle(product?.meta_details?.MetaTitle || 'Vastra India - Clothing Brand');
    this.metaTagService.addTags([
      {name: 'description', content: 'Vastra India | Promotional T-Shirts | Polos | Shirts | Caps | Manufacturer | Supplier | Mumbai, Pune, Nagpur'},
      {name: 'keywords', content: 'wholesale t shirts,cotton t shirts for mens,plain t shirts for men,t shirt manufacturers,personalised t shirts,t shirt manufacturers in tirupur,t shirt design maker,low price t shirts wholesale,t shirt manufacturer in mumbai,compression t shirt,t shirt manufacturers in india,t shirt printing india,shirt manufacturers in mumbai,silk screen printing,t shirt screen printing,corporate t shirt,customised t shirts online india,shirt manufacturers,t shirt wholesaler in mumbai,branded t shirts wholesale in tirupur,cheap tshirt printing,corporate dress,custom tshirt printing,plain t shirts wholesale india,shirts manufacturers in india,t shirt printing logo,wholesale plain t shirts,apparel manufacturers,branded shirts wholesale,cheap women t shirts online india,cotton t shirt printing,customized t shirts mumbai,t shirt for womens online india,wholesale clothing suppliers,company t shirt design,personalised t shirts india,t shirt manufacturer in pune,t shirt supplier,baseball t shirt india,baseball t shirts,branded t shirts wholesalers in mumbai,bulk order t shirts,bulk t shirt printing,bulk t shirts wholesale cheap,custom t shirt printing online,personalised t shirt printing,t shirt printing company,t shirt printing in tirupur,wholesale shirts in mumbai,wholesale t shirt suppliers in mumbai,wholesale t shirts india,wholesale t shirts online india,branded shirts wholesale in mumbai,casual shirts manufacturers in mumbai,cheap t shirts wholesale,corporate dresses for ladies,cotton sweatshirt,friends t shirt india,low price t shirts wholesale india,shirts offer online,tirupur clothes wholesale,wholesale blank t shirts,wholesale mens shirts,wholesale t shirt manufacturers in mumbai,wholesale t shirts suppliers tirupur,buy t shirts in bulk cheap,clothing manufacturing companies,corporate t shirt design,customised shirts online india,online shirt printing,plain t shirts for printing,shirt manufacturers in tirupur,t shirt company in india,t shirt suppliers in tirupur,t shirt wholesale suppliers,wholesale shirts online india,wholesale t shirt printing'}
    ]);
  }

  setCanonicalURL(url?: string) {
    const canURL = url == undefined ? this.dom.URL : url;
    const link: HTMLLinkElement = this.dom.createElement('link');
    link.setAttribute('rel', 'canonical');
    this.dom.head.appendChild(link);
    link.setAttribute('href', canURL);
  }
}
