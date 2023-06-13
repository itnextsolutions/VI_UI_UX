import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from "src/app/Services/shared.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menulist : any = [];
  constructor(private sharedService: SharedService,private router:Router) {}

  ngOnInit(): void {
    this.getMenuList();
    this.isShowDivIf=false;
  }
  
  logOut() {
    localStorage.clear();
    this.router.navigate(["admin/login"]);
  }

  getMenuList()
  {
    this.sharedService.getMenuList().subscribe((data: any[]) => { 
      this.menulist = data;
    });
  }

  isShowDivIf:boolean=false;
  toggleDisplayDiv ()
  {
     this.isShowDivIf = !this.isShowDivIf;  
  }
}
