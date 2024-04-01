package ru.codecrafters.AuthenticationService.util;

public class AccountNotCreatedException extends RuntimeException{
    public AccountNotCreatedException(String message){
        super(message);
    }
}
