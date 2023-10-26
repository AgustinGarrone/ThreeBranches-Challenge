package com.example.backend.controllers;

import com.example.backend.entities.Book;
import com.example.backend.services.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/book")
public class BookController {

    @Autowired
    private BookService bookService;


    @PostMapping("/")
    public ResponseEntity<Map<String , Object>> createBook (@RequestBody Book book) {
        Map<String , Object> response = new HashMap<>();
        try {
            Book newBook = bookService.createBook(book);
            response.put("data" , newBook);
            response.put("message" , "Libro agregado con exito");
            response.put("status" , HttpStatus.OK.value());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("data" , "");
            response.put("message" , "Error: " + e.getMessage());
            response.put("status" , HttpStatus.INTERNAL_SERVER_ERROR.value());
            return ResponseEntity.internalServerError().body(response);
        }
    }

    @PutMapping("/")
    public ResponseEntity<Map<String , Object>> updateBook (@RequestBody Book book) {
        Map<String , Object> response = new HashMap<>();
        try {
            response.put("data" , bookService.updateBook(book));
            response.put("message" , "Libro actualizado con exito");
            response.put("status" , HttpStatus.OK.value());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("data" , "");
            response.put("message" , "Error: " + e.getMessage());
            response.put("status" , HttpStatus.INTERNAL_SERVER_ERROR.value());
            return ResponseEntity.internalServerError().body(response);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String , Object>> getBookById (@PathVariable Long id) {
        Map<String , Object> response = new HashMap<>();
        try {
            Optional<Book> book = bookService.getBookById(id);
            if (book.isPresent()) {
                response.put("data" , book.get() );
                response.put("message" , "Libro obtenido con exito");
                response.put("status" , HttpStatus.OK.value());
                return ResponseEntity.ok(response);
            } else {
                response.put("data" , "");
                response.put("message" , "Libro no encontrado ");
                response.put("status" , HttpStatus.BAD_REQUEST.value());
                return ResponseEntity.ok(response);
            }
        } catch (Exception e) {
            response.put("data" , "");
            response.put("message" , "Error: " + e.getMessage());
            response.put("status" , HttpStatus.INTERNAL_SERVER_ERROR.value());
            return ResponseEntity.internalServerError().body(response);
        }
    }


    @GetMapping("/")
    public ResponseEntity<Map<String , Object>> getAllBooks () {
        Map<String , Object> response = new HashMap<>();
        try {
            response.put("data" , bookService.getAllBooks() );
            response.put("message" , "Libros obtenido con exito");
            response.put("status" , HttpStatus.OK.value());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("data" , "");
            response.put("message" , "Error: " + e.getMessage());
            response.put("status" , HttpStatus.INTERNAL_SERVER_ERROR.value());
            return ResponseEntity.internalServerError().body(response);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String,Object>> deleteBook (@PathVariable Long id) {
        Map<String , Object> response = new HashMap<>();
        try {
            bookService.deleteBook(id);
            response.put("data" , "" );
            response.put("message" , "Libro eliminado con exito");
            response.put("status" , HttpStatus.OK.value());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("data" , "");
            response.put("message" , "Error: " + e.getMessage());
            response.put("status" , HttpStatus.INTERNAL_SERVER_ERROR.value());
            return ResponseEntity.internalServerError().body(response);
        }
    }


}
