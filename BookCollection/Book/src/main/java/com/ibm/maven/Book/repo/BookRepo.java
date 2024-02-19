package com.ibm.maven.Book.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ibm.maven.Book.entity.Book;

@Repository
public interface BookRepo extends JpaRepository<Book, Integer> {

}
