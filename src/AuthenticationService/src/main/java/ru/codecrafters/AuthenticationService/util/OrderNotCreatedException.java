package ru.codecrafters.AuthenticationService.util;


public class OrderNotCreatedException extends RuntimeException{
    public OrderNotCreatedException(String message){
        super(message);
    }
}
