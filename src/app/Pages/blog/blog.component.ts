import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from "src/app/Services/Api/User/user.service";
import { SeoService } from 'src/app/Services/seo.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  blogList:any = [];
  blogno:any=0;

  constructor(private userService: UserService, private router: Router, private seoService: SeoService) { }

  ngOnInit(): void {
    this.refreshblogList();
    this.seoService.setCanonicalURL(window.location.href);
  }

  refreshblogList() {
    // this.blogno=3;
    this.userService.getallbloglist(this.blogno).subscribe(data =>{
      this.blogList = data;
    });
  }

  onClick(data: any){
      this.router.navigate(['blog/', data.Blog_Id]).then(() => {
      window.location.reload();
    });
  }
}
