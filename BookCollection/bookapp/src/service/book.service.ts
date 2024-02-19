import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstant } from '../app/appconstant';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(private http:HttpClient, private bookConfig:AppConstant) {}

  getAllBooks():any
  {
   let fullUrl:string= this.bookConfig.BASE_URL+":"+this.bookConfig.BASE_Port+"/"+this.bookConfig.GET_ALL_BOOK;
   return this.http.get(fullUrl);

  }

  getBookById(id:number):any{

   let fullUrl:string= this.bookConfig.BASE_URL+":"+this.bookConfig.BASE_Port+"/"+this.bookConfig.GET_BOOK_BY_ID+id;
   return this.http.get(fullUrl);
  }

  update(book:any)
  {

     let fullUrl:string= this.bookConfig.BASE_URL+":"+this.bookConfig.BASE_Port+"/"+this.bookConfig.UPDATE_BOOK;
     return this.http.put(fullUrl,book);
  }

  delete(id:number)
  {

     let fullUrl:string= this.bookConfig.BASE_URL+":"+this.bookConfig.BASE_Port+"/"+this.bookConfig.DELETE_BOOK+id;
     return this.http.delete(fullUrl);
  }

  save(book:any)
  {

     let fullUrl:string= this.bookConfig.BASE_URL+":"+this.bookConfig.BASE_Port+"/"+this.bookConfig.SAVE_BOOK;
     return this.http.post(fullUrl,book);
  }

}
