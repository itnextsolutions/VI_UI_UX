import { Component, OnInit,Input } from '@angular/core';
import { SharedService } from "src/app/Services/shared.service";
import {AbstractControl,UntypedFormBuilder,UntypedFormGroup,Validators,FormControl} from '@angular/forms';

@Component({
  selector: 'add-edit-blog',
  templateUrl: './add-edit-blog.component.html',
  styleUrls: ['./add-edit-blog.component.css']
})
export class AddEditBlogComponent implements OnInit {
  form = new UntypedFormGroup({
  });

  public blogForm = new UntypedFormGroup({
  });
  public submitted = false;

  @Input() blog:any;
  Blog_Id:string = "";
  Blog_Title: string ="";
  Blog_Content: string ="";
  Blog_Topic: string ="";
  Image_Name: string="";
  selectedFile :any ="";
  url: any; 
	msg = "";

  
  constructor(private service: SharedService, private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    
    this.blogForm = this.formBuilder.group({
      Blog_Title: ["", [Validators.required]],
     Blog_Content: ["",[ Validators.required]],
      Blog_Topic: ["",[ Validators.required]],
      Image_Name: [""]
      // Image_Name: ["",[ Validators.required]]
    });

    this.Blog_Id = this.blog.Blog_Id;
    this.Blog_Title=this.blog.Blog_Title;
    this.Blog_Topic=this.blog.Blog_Topic;
    this.Blog_Content=this.blog.Blog_Content;
    this.Image_Name=this.blog.Image_Name;
  }


  get formControl() {
    return this.blogForm.controls;
  }

  addBlog(){
    this.submitted = true;
    if (this.blogForm.valid){
      let formData = new FormData()
      formData.append('Blog_Title', this.Blog_Title);
      formData.append('Blog_Topic', this.Blog_Topic);
      formData.append('Blog_Content', this.Blog_Content);
      formData.append('formFile', this.selectedFile);
      this.service.addblog(formData).subscribe(res =>{
        alert(res.toString());
      })
    }
  }

  updateBlog(){
    this.submitted = true;
    if (this.blogForm.valid){
    let formData = new FormData()
    formData.append('Blog_Id', this.Blog_Id);
    formData.append('Blog_Title', this.Blog_Title);
    formData.append('Blog_Topic', this.Blog_Topic);
    formData.append('Blog_Content', this.Blog_Content);
    if(this.selectedFile==""){
    if(this.Image_Name!=null){
      formData.append('update_imageName', this.Image_Name);
    }
  }
    if(this.selectedFile!=null && this.selectedFile!=""){
    formData.append('formFile', this.selectedFile);
    }
      this.service.updateBlog(formData).subscribe(res =>{
        alert(res.toString());
    })
  }
  }

	
	onselectFile(event: any) {
		if(!event.target.files[0] || event.target.files[0].length == 0) {
			this.msg = 'You must select an image';
			return;
		}
		
		var mimeType = event.target.files[0].type;
		
		if (mimeType.match(/image\/*/) == null) {
			this.msg = "Only images are supported";
			return;
		}
		
		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		
		reader.onload = (_event) => {
			this.msg = "";
			this.url = reader.result; 
		}

    this.selectedFile=<File>event.target.files[0];
  }
}