package ru.codecrafters.AuthenticationService.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.codecrafters.AuthenticationService.dto.CreateOrderDTO;
import ru.codecrafters.AuthenticationService.dto.OrderResponseDTO;
import ru.codecrafters.AuthenticationService.dto.TransferMoneyDTO;
import ru.codecrafters.AuthenticationService.security.UserDetailsImpl;
import ru.codecrafters.AuthenticationService.services.BankAccountsService;
import ru.codecrafters.AuthenticationService.services.OrdersService;
import ru.codecrafters.AuthenticationService.util.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrdersController {

    private final BankAccountsService accountsService;
    private final OrdersService ordersService;

    @PostMapping("/transfer-money")
    public ResponseEntity<AnySuccessfulResponse> transferMoney(
            @RequestBody @Valid  TransferMoneyDTO transferMoneyDTO,
            BindingResult bindingResult
    ){
        if(bindingResult.hasErrors()){
            throw new MoneyNotTransferredException(ErrorMethods.formErrorMessage(bindingResult));
        }

        accountsService.transferMoneyOrThrowException(transferMoneyDTO);

        AnySuccessfulResponse response = new AnySuccessfulResponse("Деньги успешно переведены");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/create-order")
    public ResponseEntity<String> createOrder(
            @RequestBody @Valid CreateOrderDTO createOrderDTO,
            BindingResult bindingResult
            ){
        if(bindingResult.hasErrors()){
            throw new OrderNotCreatedException(ErrorMethods.formErrorMessage(bindingResult));
        }

        UUID userId = ((UserDetailsImpl)SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUser().getId();

        String response = ordersService.createOrderAndReturnAnswer(userId, createOrderDTO);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<OrderResponseDTO>> getOrders(){
        UUID userId = ((UserDetailsImpl)SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUser().getId();

        return new ResponseEntity<>(ordersService.getOrders(userId), HttpStatus.OK);
    }

    @ExceptionHandler
    public ResponseEntity<AnyErrorResponse> handleException(MoneyNotTransferredException e){
        AnyErrorResponse response = new AnyErrorResponse(e.getMessage());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public ResponseEntity<AnyErrorResponse> handleException(OrderNotCreatedException e){
        AnyErrorResponse response = new AnyErrorResponse(e.getMessage());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public ResponseEntity<AnyErrorResponse> handleException(UsernameNotFoundException e){
        AnyErrorResponse response = new AnyErrorResponse(e.getMessage());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public ResponseEntity<AnyErrorResponse> handleException(APIException e){
        AnyErrorResponse response = new AnyErrorResponse(e.getMessage());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
}
