package com.ibm.maven.Book.entity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="book")
public class Book {
	@Id
	@GeneratedValue (strategy=GenerationType.IDENTITY)
	int id;
    @Column(name="Name")
	String name; 
    @Column(name="Author")
	String author;
	@Column(name="Pages")
	int pages;  
	@Column(name="Language")
	String lang;
	@Column(name="Price")
	double price;  
	@Column(name="Publisher")
	String publ;
	@Column(name="Category")
	String cate;
	
	public Book(int id, String name, String author, int pages, String lang, double price, String publ, String cate) {
		super();
		this.id = id;
		this.name = name;
		this.author = author;
		this.pages = pages;
		this.lang = lang;
		this.price = price;
		this.publ = publ;
		this.cate = cate;
	}
	public Book() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getAuthor() {
		return author;
	}
	public void setAuthor(String author) {
		this.author = author;
	}
	public int getPages() {
		return pages;
	}
	public void setPages(int pages) {
		this.pages = pages;
	}
	public String getLang() {
		return lang;
	}
	public void setLang(String lang) {
		this.lang = lang;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public String getPubl() {
		return publ;
	}
	public void setPubl(String publ) {
		this.publ = publ;
	}
	public String getCate() {
		return cate;
	}
	public void setCate(String cate) {
		this.cate = cate;
	}
	@Override
	public String toString() {
		return "Book [id=" + id + ", name=" + name + ", author=" + author + ", pages=" + pages + ", lang=" + lang
				+ ", price=" + price + ", publ=" + publ + ", cate=" + cate + "]";
	}

	
}

	  
