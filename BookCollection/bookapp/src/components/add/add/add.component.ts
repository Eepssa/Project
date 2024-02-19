import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppConstant } from '../../../app/appconstant';
import { Router } from '@angular/router';
import { BookService } from '../../../service/book.service';
import { IBook } from '../../../interface/book';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule,FormsModule,HttpClientModule],
  providers:[BookService,AppConstant],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent implements OnInit {

  bookData:IBook={
    id: 0, name: "", price: 0, lang: "",
    author: "",
    pages: 0,
    publ: "",
    cate: ""
  };
  //name:any="Jayanta";
 
  constructor(private bookService:BookService,private router :Router){};
  
  ngOnInit(): void {
   this.bookData.name="";
  }
 
  onSave()
  {
     this.bookService
         .save(this.bookData)
         .subscribe(result=>{console.log(result);});
      console.log(this.bookData);
      this.router.navigateByUrl("/");
  }
 
 
 }
