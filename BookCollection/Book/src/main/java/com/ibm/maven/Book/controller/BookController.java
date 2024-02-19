package com.ibm.maven.Book.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ibm.maven.Book.entity.Book;
import com.ibm.maven.Book.service.BookService;


@RestController
@CrossOrigin("*")
public class BookController {
	@Autowired
	BookService bookService;
	
	@GetMapping("/book")
	List<Book> findAll()
	{
		return bookService.findAll();
		
	}
	
	@GetMapping("/book/{id}")
	Book findById(@PathVariable int id)
	{
		return bookService.findById(id);
		
	}
	
	@PutMapping("/book")
	void update(@RequestBody Book book)
	{
		bookService.save(book);
		
	}
	@PostMapping("/book")
	void save(@RequestBody Book book)
	{
		bookService.save(book);
		
	}
	@DeleteMapping("/book/{id}")
	void deleteById(@PathVariable int id)
	{
		bookService.deleteById(id);
		
	}
}