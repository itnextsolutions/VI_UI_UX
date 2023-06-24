import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/Services/Api/User/user.service';
import { __values } from 'tslib';
import { SeoService } from 'src/app/Services/seo.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  [x: string]: any;
  route: any;

  constructor(private param: ActivatedRoute, private userService: UserService, private router: Router, private seoService: SeoService) { }

  isMenDivHidden = false;
  isWoMenDivHidden = true;
  isTippingDivHidden = true;
  isTippingWomenDivHidden = true;

  categoryfolder: any;
  product: any;
  category_id: any;
  sizes: any = [];
  colors: any = [];
  simillarProducts: any = [];
  hidden: any;
  svg_path = '';
  bgColor = '';
  selected_colorname = '';
  //  menDesc: string = "";
  //  womenDesc: string = "";
  // tipping:any=[];
  id: number = 0;


  // Used for Colors data
  slideConfig = {
    dots: true,
    speed: 20,
    slidesToShow: 6,
    slidesToScroll: 6,
    infinite: false,
    rows: 0,
    column:0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
          dots: true,
          rows: 3,
          column:0
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          dots: true,
          rows: 3,
          column:0
        }
      },

      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          dots: true,
          rows: 3,
          column:0
        }
      },
      {
        breakpoint: 370,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          dots: true,
          rows: 3,
          column:0
        }
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          dots: true,
          rows: 3,
          column:0
        }
      }
    ]
  }

  tippingWomenslideConfig = {
    dots: true,
    speed: 20,
    slidesToShow: 6,
    slidesToScroll: 6,
    infinite: false,
    rows: 0,
    column:0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
          dots: true,
          rows: 3,
          column:0
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          dots: true,
          rows: 3,
          column:0
        }
      },

      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          dots: true,
          rows: 3,
          column:0
        }
      },
      {
        breakpoint: 370,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          dots: true,
          rows: 3,
          column:0
        }
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          dots: true,
          rows: 3,
          column:0
        }
      }
    ]
  }

  tippingslideConfig = {
    dots: true,
    speed: 20,
    slidesToShow: 6,
    slidesToScroll: 6,
    infinite: false,
    rows: 0,
    column:0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
          dots: true,
          rows: 3,
          column:0
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          dots: true,
          rows: 3,
          column:0
        }
      },

      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          dots: true,
          rows: 3,
          column:0
        }
      },
      {
        breakpoint: 370,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          dots: true,
          rows: 3,
          column:0
        }
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          dots: true,
          rows: 3,
          column:0
        }
      }
    ]
  }

  // used for similar product
  similarProducts: OwlOptions = {
    autoplay: true,
    loop: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    margin: 5,
    autoWidth: true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1.2,
        loop:true,
        dots:true
      },
      400: {
        items: 2
      },
      600: {
        items: 3
      },
      1000: {
        items: 3
      }
    }

  }


  ngOnInit(): void {
    this.productId = this.param.snapshot.paramMap.get('id');
    this.categoryName = this.param.snapshot.paramMap.get('categoryName');
    this.categoryName = this.categoryName.replace(/-/g, ' ').toUpperCase();

    this.productcategoryfolder = this.categoryName.replace(/\s+/g, '-').toLowerCase();

    this.subcategoryName = this.param.snapshot.paramMap.get('subcategoryName');
    this.subcategoryName = this.subcategoryName.replace (/-/g, ' ').toUpperCase();

    this.isbrand = this.param.snapshot.paramMap.get('isbrand');
    this.bgColor = '#FFFFFF';
    this.selected_colorname = 'White';
    this.getProduct();
    this.getSimillarProduct();
    this.seoService.setCanonicalURL(window.location.href);
  }


  getSimillarProduct() {

    this.userService.getSimillarProduct(this.productId).subscribe(data => {
      if (data != null && data != undefined) {
        this.simillarProducts = data;
        if (this.simillarProducts.length > 4) {
          this.similarProducts.loop = true;
          this.similarProducts.dots = true;
        }
      }
      this.categoryfolder = this.categoryName.replace(/\s+/g, '-').toLowerCase();
    });
  }

  getProduct() {
    this.userService.getProductById(this.productId).subscribe(data => {
      this.product = data;

      if (this.product != null) {
        this.product.forEach((element: any) => {
          this.category_id = element.Category_Id;
          this.men_svg_path = element.men_f_svgpath;
          this.women_svgpath = element.women_f_svgpath;
        })
      }
    });

    this.userService.getColorListById(this.productId).subscribe((data:any) => {
      if(data!=null && data!=undefined){
      this.colors = data;
   
    //   if (this.colors.length <18) {
    //   if(this.colors.length>6 || this.colors.length<13)
    //   {
    //     this.slideConfig.rows=2;
    //   }
    // }
    //   if (this.colors.length >18) {
    //     this.slideConfig.dots=true;
    //     this.slideConfig.rows=3;
    //   }

      // if (this.colors.length <=12) { this.slideConfig.rows = 1; }
      // else if (this.colors.length <= 36) { this.slideConfig.rows = 2; }
      // else if (this.colors.length <= 54) { this.slideConfig.rows = 3; }
      // else this.slideConfig.rows = 0;


      if (this.colors.length <=6) { this.slideConfig= {
        dots: true,
        speed: 20,
        slidesToShow: 6,
        slidesToScroll: 6,
        infinite: false,
        rows: 1,
        column:6,
        responsive:[
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 6,
            dots: true,
            rows: 1,
            column:6
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            dots: true,
            rows: 1,
            column:3
          }
        },
  
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            dots: true,
            rows: 1,
            column:3
          }
        },
        {
          breakpoint: 370,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            dots: true,
            rows: 1,
            column:3
          }
        },
        {
          breakpoint: 320,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            dots: true,
            rows:1,
            column:3
          }
        }
      ]} }
      else if (this.colors.length > 6 && this.colors.length <= 12) { this.slideConfig= {
        dots: true,
        speed: 20,
        slidesToShow: 6,
        slidesToScroll: 6,
        infinite: false,
        rows: 1,
        column:6,
        responsive:[
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 6,
            dots: true,
            rows: 2,
            column:6
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            dots: true,
            rows: 2,
            column:3
          }
        },
  
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            dots: true,
            rows: 2,
            column:3
          }
        },
        {
          breakpoint: 370,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            dots: true,
            rows: 2,
            column:3
          }
        },
        {
          breakpoint: 320,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            dots: true,
            rows:2,
            column:3
          }
        }
      ] }}
      else  if (this.colors.length >12 && this.colors.length <=36  ) { this.slideConfig= {
        dots: true,
        speed: 20,
        slidesToShow: 6,
        slidesToScroll: 6,
        infinite: false,
        rows: 3,
        column:0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 6,
              slidesToScroll: 6,
              dots: true,
              rows: 3,
              column:6
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              dots: true,
              rows: 3,
              column:3
            }
          },
    
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              dots: true,
              rows: 3,
              column:3
            }
          },
          {
            breakpoint: 370,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              dots: true,
              rows: 3,
              column:3
            }
          },
          {
            breakpoint: 320,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              dots: true,
              rows: 3,
              column:3
            }
          }
        ]
      } }

      else  if (this.colors.length >36 && this.colors.length <=60 ) { this.slideConfig= {
        dots: true,
        speed: 20,
        slidesToShow: 6,
        slidesToScroll: 6,
        infinite: false,
        rows: 3,
        column:0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 6,
              slidesToScroll: 6,
              dots: true,
              rows: 3,
              column:6
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              dots: true,
              rows: 3,
              column:3
            }
          },
    
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              dots: true,
              rows: 3,
              column:3
            }
          },
          {
            breakpoint: 370,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              dots: true,
              rows: 3,
              column:3
            }
          },
          {
            breakpoint: 320,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              dots: true,
              rows: 3,
              column:3
            }
          }
        ]
      } }
      else if (this.colors.length >60 ) { this.slideConfig= {
        dots: true,
        speed: 20,
        slidesToShow: 6,
        slidesToScroll: 6,
        infinite: false,
        rows: 3,
        column:0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 6,
              slidesToScroll: 6,
              dots: true,
              rows: 3,
              column:6
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              dots: true,
              rows: 4,
              column:3
            }
          },
    
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              dots: true,
              rows: 4,
              column:3
            }
          },
          {
            breakpoint: 370,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              dots: true,
              rows: 4,
              column:3
            }
          },
          {
            breakpoint: 320,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              dots: true,
              rows: 4,
              column:3
            }
          }
        ]
      } }
      // else if (this.colors.length <= 36) { this.slideConfig.rows = 2; }
      //  else if (this.colors.length <= 54) { this.slideConfig.rows = 3; }
      // else this.slideConfig.rows = 0;
  }
});

    this.userService.getSizeListById(this.productId).subscribe(data => {
      if(data!=null && data!=undefined){
      this.sizes = data;
      }
    });

    this.userService.getTipingListById(this.productId).subscribe(data => {
     if(data!=null && data!=undefined){
      this.tipping = data;
      if (this.tipping.length <=6) { this.tippingslideConfig= {
        dots: true,
        speed: 20,
        slidesToShow: 6,
        slidesToScroll: 6,
        infinite: false,
        rows: 1,
        column:6,
        responsive:[
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 6,
            dots: true,
            rows: 1,
            column:6
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            dots: true,
            rows: 1,
            column:3
          }
        },
  
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            dots: true,
            rows: 1,
            column:3
          }
        },
        {
          breakpoint: 370,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            dots: true,
            rows: 1,
            column:3
          }
        },
        {
          breakpoint: 320,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            dots: true,
            rows:1,
            column:3
          }
        }
      ]} }
    else  if (this.tipping.length >6 && this.tipping.length <=12) { this.tippingslideConfig= {
        dots: true,
        speed: 20,
        slidesToShow: 6,
        slidesToScroll: 6,
        infinite: false,
        rows: 1,
        column:6,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 6,
              slidesToScroll: 6,
              dots: true,
              rows: 2,
              column:6
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              dots: true,
              rows: 2,
              column:3
            }
          },
    
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              dots: true,
              rows: 2,
              column:3
            }
          },
          {
            breakpoint: 370,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              dots: true,
              rows: 2,
              column:3
            }
          },
          {
            breakpoint: 320,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              dots: true,
              rows: 2,
              column:3
            }
          }
        ]
      }
    }
    else  if (this.tipping.length >12 && this.tipping.length <=36) { this.tippingslideConfig= {
        dots: true,
        speed: 20,
        slidesToShow: 6,
        slidesToScroll: 6,
        infinite: false,
        rows: 2,
        column:0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 6,
              slidesToScroll: 6,
              dots: true,
              rows: 3,
              column:6
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              dots: true,
              rows: 3,
              column:3
            }
          },
    
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              dots: true,
              rows: 3,
              column:3
            }
          },
          {
            breakpoint: 370,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              dots: true,
              rows: 3,
              column:3
            }
          },
          {
            breakpoint: 320,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              dots: true,
              rows: 3,
              column:3
            }
          }
        ]
      } }
      else  if (this.tipping.length >36 && this.tipping.length <=60) { this.tippingslideConfig= {
        dots: true,
        speed: 20,
        slidesToShow: 6,
        slidesToScroll: 6,
        infinite: false,
        rows: 3,
        column:0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 6,
              slidesToScroll: 6,
              dots: true,
              rows: 3,
              column:6
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              dots: true,
              rows: 3,
              column:3
            }
          },
    
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              dots: true,
              rows: 3,
              column:3
            }
          },
          {
            breakpoint: 370,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              dots: true,
              rows: 3,
              column:3
            }
          },
          {
            breakpoint: 320,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              dots: true,
              rows: 3,
              column:3
            }
          }
        ]
      } }
  else  if (this.tipping.length >60 ) { this.tippingslideConfig= {
        dots: true,
        speed: 20,
        slidesToShow: 6,
        slidesToScroll: 6,
        infinite: false,
        rows: 3,
        column:0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 6,
              slidesToScroll: 6,
              dots: true,
              rows: 3,
              column:6
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              dots: true,
              rows: 4,
              column:3
            }
          },
    
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              dots: true,
              rows: 4,
              column:3
            }
          },
          {
            breakpoint: 370,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              dots: true,
              rows: 4,
              column:3
            }
          },
          {
            breakpoint: 320,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              dots: true,
              rows: 4,
              column:3
            }
          }
        ]
      } }
      // else if (this.tipping.length <= 36) { this.slideConfig.rows = 2; }
      // else if (this.tipping.length <= 54) { this.slideConfig.rows = 3; }
      // else this.slideConfig.rows = 0;
    }
    });


    this.userService.getTipingWomenListById(this.productId).subscribe(data => {
      if(data!=null && data!=undefined){
      this.tippingWomen = data;
      if (this.tippingWomen.length <=6) { this.tippingWomenslideConfig= {
        dots: true,
        speed: 20,
        slidesToShow: 6,
        slidesToScroll: 6,
        infinite: false,
        rows: 1,
        column:6,
        responsive:[
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 6,
            dots: true,
            rows: 1,
            column:6
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            dots: true,
            rows: 1,
            column:3
          }
        },
  
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            dots: true,
            rows: 1,
            column:3
          }
        },
        {
          breakpoint: 370,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            dots: true,
            rows: 1,
            column:3
          }
        },
        {
          breakpoint: 320,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            dots: true,
            rows:1,
            column:3
          }
        }
      ]} }
     else if (this.tippingWomen.length >6 && this.tippingWomen.length <=12) { this.tippingWomenslideConfig= {
        dots: true,
        speed: 20,
        slidesToShow: 6,
        slidesToScroll: 6,
        infinite: false,
        rows: 1,
        column:6,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 6,
              slidesToScroll: 6,
              dots: true,
              rows: 2,
              column:6
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              dots: true,
              rows: 2,
              column:3
            }
          },
    
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              dots: true,
              rows: 2,
              column:3
            }
          },
          {
            breakpoint: 370,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              dots: true,
              rows: 2,
              column:3
            }
          },
          {
            breakpoint: 320,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              dots: true,
              rows: 2,
              column:3
            }
          }
        ]
      }
    }
    else  if (this.tippingWomen.length >12 && this.tippingWomen.length <=36 ) { this.tippingWomenslideConfig= {
        dots: true,
        speed: 20,
        slidesToShow: 6,
        slidesToScroll: 6,
        infinite: false,
        rows: 2,
        column:0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 6,
              slidesToScroll: 6,
              dots: true,
              rows: 3,
              column:6
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              dots: true,
              rows: 3,
              column:3
            }
          },
    
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              dots: true,
              rows: 3,
              column:3
            }
          },
          {
            breakpoint: 370,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              dots: true,
              rows: 3,
              column:3
            }
          },
          {
            breakpoint: 320,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              dots: true,
              rows: 3,
              column:3
            }
          }
        ]
      } }
    else  if (this.tippingWomen.length >36 && this.tippingWomen.length <=60) { this.tippingWomenslideConfig= {
        dots: true,
        speed: 20,
        slidesToShow: 6,
        slidesToScroll: 6,
        infinite: false,
        rows: 3,
        column:0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 6,
              slidesToScroll: 6,
              dots: true,
              rows: 3,
              column:6
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              dots: true,
              rows: 3,
              column:3
            }
          },
    
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              dots: true,
              rows: 3,
              column:3
            }
          },
          {
            breakpoint: 370,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              dots: true,
              rows: 3,
              column:3
            }
          },
          {
            breakpoint: 320,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              dots: true,
              rows: 3,
              column:3
            }
          }
        ]
      } }
    else  if (this.tippingWomen.length >60 ) { this.tippingWomenslideConfig= {
        dots: true,
        speed: 20,
        slidesToShow: 6,
        slidesToScroll: 6,
        infinite: false,
        rows: 3,
        column:0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 6,
              slidesToScroll: 6,
              dots: true,
              rows: 3,
              column:6
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              dots: true,
              rows: 4,
              column:3
            }
          },
    
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              dots: true,
              rows: 4,
              column:3
            }
          },
          {
            breakpoint: 370,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              dots: true,
              rows: 4,
              column:3
            }
          },
          {
            breakpoint: 320,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              dots: true,
              rows: 4,
              column:3
            }
          }
        ]
      } }
      // if (this.tippingWomen.length <=12) { this.slideConfig.rows = 1; }
      // else if (this.tippingWomen.length <= 36) { this.slideConfig.rows = 2; }
      // else if (this.tippingWomen.length <= 54) { this.slideConfig.rows = 3; }
      // else this.slideConfig.rows = 0;
    }
    });
  }

  onClick(product: any) {
    this.router.navigate(['product-details/', product.Category_Name, product.SubCategory, product.Product_Id, this.isbrand]).then(() => {
      window.location.reload();
    });

    // this.router.navigate(['blog/', data.Blog_Id]).then(() => {
    //   window.location.reload();
    // this.ngOnInit();
  }


  onClickWomenPhoto() {

    this.userService.getProductById(this.productId).subscribe(data => {
      this.product = data;
    });
    this.productcategoryfolder = this.categoryName.replace(/\s+/g, '-').toLowerCase();
    this.isMenDivHidden = true;
    this.isWoMenDivHidden = false;
    this.isTippingDivHidden = true;
    this.isTippingWomenDivHidden = true;
    // this.menDesc=this.product.Product_Description;
    this.id = 1;

  }

  onClickmenPhoto() {

    this.userService.getProductById(this.productId).subscribe(data => {
      this.product = data;
    });
    this.productcategoryfolder = this.categoryName.replace(/\s+/g, '-').toLowerCase();
    this.isMenDivHidden = false;
    this.isWoMenDivHidden = true;
    this.isTippingDivHidden = true;
    this.isTippingWomenDivHidden = true;

    // this.womenDesc=this.product.WomenProduct_Description;
    this.id = 0;
  }

  onTippingClick(item: any) {
    // this.userService.getTipingListById(this.productId).subscribe(data=>{
    //   this.tipping=data; 

    // });
    // this.tipping.filter((x: { tipping_Code: number; })=>x.tipping_Code==code);
    this.productcategoryfolder = this.categoryName.replace(/\s+/g, '-').toLowerCase();
    this.isMenDivHidden = true;
    this.isWoMenDivHidden = true;
    this.isTippingDivHidden = false;
    this.isTippingWomenDivHidden = true;
    this.image = item.tipping_big_img;
    this.id = 2;
    // (this.item.filter((x: { tipping_Code: number; })=>{return x.tipping_Code==item;}));

  }

  onTippingWomenClick(item: any) {

    // this.isMenDivHidden = true;
    // this.isWoMenDivHidden = true;
    // this.isTippingDivHidden=true;
    // this.isTippingWomenDivHidden=false;
    // this.image1=item.tipping_women_img;
    // this.id=3;
    // this.productcategoryfolder = this.categoryName.replace(/\s+/g, '-').toLowerCase();

    this.isMenDivHidden = true;
    this.isWoMenDivHidden = true;
    this.isTippingDivHidden = true;
    this.isTippingWomenDivHidden = false;
    this.image1 = item.tipping_big_img;
    this.id = 3;
    this.productcategoryfolder = this.categoryName.replace(/\s+/g, '-').toLowerCase();

  }

  onColorClick(data: any) {
    if (data.Description != null) {
      this.bgColor = data.Description;
      this.selected_colorname = data.ColorName;
    }
    else {
      this.bgColor = '#FFFFFF';
    }
  }
  closeClick(){
    // this.product.reload();
    // this.ngOnInit();
  }
}




