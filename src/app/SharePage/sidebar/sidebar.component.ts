import { Component, OnInit } from '@angular/core';
import { SharedService } from "src/app/Services/shared.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menulist : any = [];
  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.getMenuList();
    this.isShowDivIf=false;
  }
  
  logOut= () => {
    localStorage.removeItem('token');
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
