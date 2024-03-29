package com.ibm.maven.Book.service;
import java.util.List;

import com.ibm.maven.Book.entity.Book;

public interface BookService {
    List<Book> findAll();
	Book findById(int id);
	void save(Book book);
	void deleteById(int id);
}
