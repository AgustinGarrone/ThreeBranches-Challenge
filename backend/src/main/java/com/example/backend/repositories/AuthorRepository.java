package com.example.backend.repositories;

import com.example.backend.entities.Author;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthorRepository extends JpaRepository<Author , Long> {

    @Transactional
    @Modifying
    @Query("UPDATE Author a " +
            "SET a.nombre = CASE WHEN :nombre IS NOT NULL THEN :nombre ELSE a.nombre END, " +
            "a.apellido = CASE WHEN :apellido IS NOT NULL THEN :apellido ELSE a.apellido END, " +
            "a.edad = CASE WHEN :edad IS NOT NULL THEN :edad ELSE a.edad END " +
            "WHERE a.id = :authorId")
    int updateAuthor(@Param("authorId") Long authorId, @Param("nombre") String nombre, @Param("apellido") String apellido, @Param("edad") Integer edad);
}
