package ru.codecrafters.AuthenticationService.util;

public class UserNotRegisteredException extends RuntimeException{
    public UserNotRegisteredException(String message){
        super(message);
    }
}
