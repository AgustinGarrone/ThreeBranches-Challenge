package com.example.backend.controllers;

import com.example.backend.entities.Mail;
import com.example.backend.services.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/mail")
public class MailController {

    @Autowired
    private MailService mailService;

    @PostMapping("/")
    public Mail createMail (@RequestBody Mail email) {
        return mailService.crearMail(email);
    }


}
