package com.example.backend.repositories;

import com.example.backend.entities.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<Book , Long> {

    @Query("SELECT COUNT(a) FROM Book b JOIN b.authors a WHERE b.id = :bookId")
    Long countRelatedAuthors(@Param("bookId") Long bookId);
}
