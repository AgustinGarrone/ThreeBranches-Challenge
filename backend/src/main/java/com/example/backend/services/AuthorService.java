package com.example.backend.services;

import com.example.backend.entities.Author;
import com.example.backend.exceptions.HasRelations;
import com.example.backend.repositories.AuthorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AuthorService {

    @Autowired
    private AuthorRepository authorRepository;

    public Author createAuthor (Author author) {
        if (author != null) {
            try {
                return authorRepository.save(author);
            } catch (Exception e) {
                System.out.println(e);
            }
        }
        return null;
    }

    public Optional<Author> getAuthorById (Long id) {
        return authorRepository.findById(id);
    }

    public List<Author> getAllAuthors () {
        return authorRepository.findAll();
    }

    public Author updateAuthor (Author author) {
        Optional<Author> oldAuthor = authorRepository.findById(author.getId());
        if (oldAuthor.isPresent()) {
            try {
                return authorRepository.save(author);
            } catch (Exception e) {
                System.out.println(e);
            }
        }
        return null;
    }

    public void deleteAuthor (Long id) throws HasRelations {
        try {
            authorRepository.deleteById(id);
        } catch (Exception e) {
            throw new HasRelations();
        }

    }


}
