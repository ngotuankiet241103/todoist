package com.todo.todolistbackend.service.Impl;

import com.todo.todolistbackend.service.EmailSerivice;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailSerivice {

    private  final  JavaMailSender mailSender;
    @Override
    public void sendEmail(String to,int totalTask) {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
        try {
            helper.setText(buildEmail(totalTask), true);
            helper.setTo(to);
            helper.setSubject("Confirm your email");
            helper.setFrom("ngotuankiet12347@gmail.com");
            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }
    private String buildEmail(int totalTask) {
        return "<div style=\"font-family:Helvetica,Arial,sans-serif;font-size:16px;margin:0;color:#0b0c0c\">\n" + "\n"


                + totalTask + " </p></blockquote>\n Your task  will be expired. <p>Let complete your task</p>"
                + "        \n" + "      </td>\n" + "      <td width=\"10\" valign=\"middle\"><br></td>\n"
                + "    </tr>\n" + "    <tr>\n" + "      <td height=\"30\"><br></td>\n" + "    </tr>\n";

    }
}
