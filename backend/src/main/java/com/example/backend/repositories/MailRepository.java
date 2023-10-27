package com.example.backend.repositories;

import com.example.backend.entities.Mail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MailRepository extends JpaRepository<Mail , Long> {
}
