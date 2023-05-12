import { Component, OnInit } from '@angular/core';
import { SeoService } from 'src/app/Services/seo.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private seoService: SeoService) { }

  ngOnInit(): void {
    this.seoService.setCanonicalURL(window.location.href);
  }
}
