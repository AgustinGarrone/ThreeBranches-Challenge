package com.example.backend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String titulo;
    private Date fechaPublicacion;

    @ManyToMany

    @JoinTable(

            name = "author_x_book",

            joinColumns = @JoinColumn(name = "book_id"),

            inverseJoinColumns = @JoinColumn(name = "author_id")

    )

    private Set<Author> authors;


}
