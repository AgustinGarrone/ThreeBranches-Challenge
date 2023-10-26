package com.example.backend.services;

import com.example.backend.entities.Book;
import com.example.backend.repositories.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    public Book createBook (Book book) {
        if (book != null) {
            try {
                return bookRepository.save(book);
            } catch (Exception e) {
                System.out.println(e);
            }
        }
        return null;
    }

    public Optional<Book> getBookById (Long id) {
        return bookRepository.findById(id);
    }

    public List<Book> getAllBooks () {
        return bookRepository.findAll();
    }

    public Book updateBook (Book book) {
        Optional<Book> oldBook = bookRepository.findById(book.getId());
        if (oldBook.isPresent()) {
            try {
                return bookRepository.save(book);
            } catch (Exception e) {
                System.out.println(e);
            }
        }
        return null;
    }

    public void deleteBook (Long id) {
        try {
            bookRepository.deleteById(id);
        } catch (Exception e) {
            System.out.println(e);
        }

    }


}
