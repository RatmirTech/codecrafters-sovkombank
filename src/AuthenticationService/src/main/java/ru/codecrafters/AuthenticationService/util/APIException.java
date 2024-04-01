package ru.codecrafters.AuthenticationService.util;

public class APIException extends RuntimeException{
    public APIException(String message){
        super(message);
    }
}
