package ru.codecrafters.AuthenticationService.util;

import org.springframework.validation.BindingResult;

public class ErrorMethods {
    public static String formErrorMessage(BindingResult bindingResult){
        StringBuilder message = new StringBuilder();

        bindingResult.getFieldErrors().forEach(error ->
                message.append(error.getField()).append(": ")
                        .append(error.getDefaultMessage())
                        .append("; ")
        );
        message.setLength(message.length() - 2);

        return message.toString();
    }
}
