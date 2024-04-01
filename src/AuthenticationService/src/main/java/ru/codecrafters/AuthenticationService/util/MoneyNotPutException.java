package ru.codecrafters.AuthenticationService.util;

public class MoneyNotPutException extends RuntimeException{
    public MoneyNotPutException(String message){
        super(message);
    }
}
