package com.example.backend.services;

import com.example.backend.entities.Mail;
import com.example.backend.mailSender.MailSender;
import com.example.backend.repositories.MailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MailService {

    @Autowired
    private MailRepository mailRepository;
    @Autowired
    private MailSender mailSender;


    public Mail crearMail (Mail email) {
        String stringEmail = email.getEmail();
        System.out.println(stringEmail);
        mailSender.sendEmail(stringEmail);
        return mailRepository.save(email);
    }

}
