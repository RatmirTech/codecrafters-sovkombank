package ru.codecrafters.AuthenticationService.util;

public class MoneyNotTransferredException extends RuntimeException{
    public MoneyNotTransferredException(String message){
        super(message);
    }
}
