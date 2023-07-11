import { Component, OnInit } from '@angular/core';
import { UserService } from "src/app/Services/Api/User/user.service";
import {ActivatedRoute, Router} from '@angular/router';
import { SeoService } from 'src/app/Services/seo.service';

@Component({
  selector: 'app-blog-content',
  templateUrl: './blog-content.component.html',
  styleUrls: ['./blog-content.component.css']
})
export class BlogContentComponent implements OnInit {
  blogList:any= [];
  blogContent:any= [];
  getBlogId:any;
  blogTitle: any;
  Imagepath: string="";
  constructor(private param :ActivatedRoute, private userService: UserService, private router: Router, private seoService: SeoService) { }

  ngOnInit(): void {
    this.Imagepath=this.userService.ImgUrl;
    this.getBlogId = this.param.snapshot.paramMap.get('blog_Id');
    this.getBlogContent();
    this.refreshblogList();
    this.seoService.setCanonicalURL(window.location.href);
  }

  refreshblogList() {
    
    this.userService.getallbloglist(this.getBlogId).subscribe(data =>{
      this.blogList = data;
    });
  }

  getBlogContent(){
    
    this.userService.getblogbyid(this.getBlogId).subscribe(data =>{
      this.blogContent = data;
      
    });
   }
  
   onClick(blog: any){
    this.blogTitle = blog.Blog_Title.replace(/\s+/g, '-').toLowerCase();
    this.router.navigate(['blog/', blog.Blog_Id,this.blogTitle ]).then(() => {
      window.location.reload();
    });
  }
}
