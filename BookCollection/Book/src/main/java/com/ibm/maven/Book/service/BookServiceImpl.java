package com.ibm.maven.Book.service;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ibm.maven.Book.entity.Book;
import com.ibm.maven.Book.repo.BookRepo;

@Service
public class BookServiceImpl implements BookService {
	@Autowired
	BookRepo bookRepo;
	
	
	@Override
	public List<Book> findAll() {
		// TODO Auto-generated method stub
		return bookRepo.findAll();
	}

	@Override
	public Book findById(int id) {
		 
		return bookRepo.findById(id).get();
	}

	@Override
	public void save(Book book) {
		bookRepo.save(book);
		
	}

	@Override
	public void deleteById(int id) {
		bookRepo.deleteById(id);
		
	}

}
