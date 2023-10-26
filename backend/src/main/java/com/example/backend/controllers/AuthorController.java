package com.example.backend.controllers;

import com.example.backend.entities.Author;
import com.example.backend.services.AuthorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/author")
public class AuthorController {

    @Autowired
    private AuthorService authorService;

    @PostMapping("/")
    public ResponseEntity<Map<String , Object>> createAuthor (@RequestBody Author author) {
        Map<String , Object> response = new HashMap<>();
        try {
            Author newBook = authorService.createAuthor(author);
            response.put("data" , newBook);
            response.put("message" , "Autor agregado con exito");
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
    public ResponseEntity<Map<String , Object>> updateAuthor (@RequestBody Author author) {
        Map<String , Object> response = new HashMap<>();
        try {
            response.put("data" , authorService.updateAuthor(author));
            response.put("message" , "Autor actualizado con exito");
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
    public ResponseEntity<Map<String , Object>> getAuthorById (@PathVariable Long id) {
        Map<String , Object> response = new HashMap<>();
        try {
            Optional<Author> author= authorService.getAuthorById(id);
            if (author.isPresent()) {
                response.put("data" , author.get() );
                response.put("message" , "Autor obtenido con exito");
                response.put("status" , HttpStatus.OK.value());
                return ResponseEntity.ok(response);
            } else {
                response.put("data" , "");
                response.put("message" , "Autor no encontrado");
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
    public ResponseEntity<Map<String , Object>> getAllAuthors () {
        Map<String , Object> response = new HashMap<>();
        try {
            response.put("data" , authorService.getAllAuthors() );
            response.put("message" , "Autores obtenido con exito");
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
    public ResponseEntity<Map<String,Object>> deleteAuthor (@PathVariable Long id) {
        Map<String , Object> response = new HashMap<>();
        try {
            authorService.deleteAuthor(id);
            response.put("data" , "" );
            response.put("message" , "Autor eliminado con exito");
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
