import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppConstant } from '../../../app/appconstant';
import { BookService } from '../../../service/book.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule,FormsModule,HttpClientModule],
  providers:[BookService,AppConstant],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {


  constructor(private bookService:BookService,private activatedRoute:ActivatedRoute,private router:Router){};
  bookData:any; 
 
  ngOnInit(): void {

   console.log("ngOnInit");
   let id=this.activatedRoute.snapshot.params['id'];
   this.bookService
       .getBookById(id)
       .subscribe((result: any)=>{

        this.bookData=result;
        console.log(result);
      
      });

 
  }

  onSave()
  {
    this.bookService
    .update(this.bookData)
    .subscribe(data=>{ console.log(data);});

    this.router.navigateByUrl("/");
     


  }
;



}
