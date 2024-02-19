import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, Router, RouterModule } from '@angular/router';
import { AppConstant } from '../../../app/appconstant';
import { BookService } from '../../../service/book.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [HttpClientModule,CommonModule,RouterModule],
  providers:[BookService,AppConstant ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit{

  constructor(private bookService:BookService, private route:Router){}
  //moviedata:IMovie[]=[];
  bookdata:any;
  ngOnInit(): void {
    this.bookService
          .getAllBooks()
          .subscribe((data: any)=>{
            
            this.bookdata=data;
            console.log(data);
          });
  }

  onClick()
  {
    console.log("add")
    this.route.navigateByUrl("/add");
     

  }
  delete(id:number)
  {
    this.bookService.delete(id)
    .subscribe(data=>{            
      this.bookdata=data;
      console.log(data);
    });
    this.route.navigateByUrl("");
  }
}