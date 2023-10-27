package com.example.backend.mailSender;

import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class MailSender {
    public void sendEmail (String to) {
        // Sender's email address
        Email from = new Email("agustinngarrone@hotmail.com");

        // Email subject
        String subject = "You Are Now Subscribed to Our Latest Updates";

        // Recipient's email address
        Email clientEmail = new Email(to);

        // HTML content
        String htmlContent = "<html>" +
                "<head>" +
                "<style>" +
                "body {" +
                "   font-family: Arial, sans-serif;" +
                "   background-color: #007BFF; /* Fondo azulado */" +
                "}" +
                "h2 {" +
                "   color: white; /* Color de encabezado blanco */" +
                "}" +
                "</style>" +
                "</head>" +
                "<body>" +
                "<h2>Welcome to Our Library Newsletter</h2>" +
                "<p>Dear Subscriber,</p>" +
                "<p>Thank you for subscribing to our library's newsletter. You are now part of our community, and you will receive our latest updates, news, and events directly in your inbox.</p>" +
                "<p>Stay tuned for exciting new releases and events!</p>" +
                "<p><strong>Best regards,<br>The Library Team</strong></p>" +
                "</body>" +
                "</html>";


        // Email content
        Content content = new Content("text/html", htmlContent);

        // Create the email
        Mail mail = new Mail(from, subject, clientEmail, content);

        // SendGrid API setup
        SendGrid sg = new SendGrid("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");

        // Create a request
        Request request = new Request();

        try {
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());

            // Send the email
            Response response = sg.api(request);

            // Print response details
            System.out.println("Response Status Code: " + response.getStatusCode());
            System.out.println("Response Body: " + response.getBody());
            System.out.println("Response Headers: " + response.getHeaders());
        } catch (IOException ex) {
            // Handle any potential exceptions
            ex.printStackTrace();
        }
    }

}
