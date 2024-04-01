package ru.codecrafters.AuthenticationService.controllers;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.codecrafters.AuthenticationService.dto.BankAccountDTO;
import ru.codecrafters.AuthenticationService.dto.CreationAccountDTO;
import ru.codecrafters.AuthenticationService.dto.PutMoneyDTO;
import ru.codecrafters.AuthenticationService.models.BankAccount;
import ru.codecrafters.AuthenticationService.models.User;
import ru.codecrafters.AuthenticationService.security.UserDetailsImpl;
import ru.codecrafters.AuthenticationService.services.BankAccountsService;
import ru.codecrafters.AuthenticationService.util.ResponseStatus;
import ru.codecrafters.AuthenticationService.util.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/accounts", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
@Tag(name = "Bank accounts")
public class BankAccountsController {

    private final BankAccountsService accountsService;
    private final ModelMapper modelMapper;

    @GetMapping("/get-bank-accounts")
    public ResponseEntity<List<BankAccountDTO>> getAccounts(@RequestHeader(name = "Authorization") String header){

        List<BankAccountDTO> list = accountsService.getAccountsByUserId(
                ((UserDetailsImpl)SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUser().getId()
        ).stream().map(this::convertToBankAccountDTO).toList();


        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/get-bank-account")
    public ResponseEntity<BankAccountDTO> getAccount(@RequestParam(name = "account_number")
                                                     String accountNumber,
                                                     @RequestHeader(name = "Authorization") String header){
        Optional<BankAccount> accountOptional = accountsService.getAccountByUserAndAccountNumber(
                ((UserDetailsImpl)SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUser(),
                accountNumber
        );

        if(accountOptional.isEmpty())
            throw new AccountNotFoundException("Счёт с таким номером и пользователем не найден");

        return new ResponseEntity<>(convertToBankAccountDTO(accountOptional.get()), HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<BankAccountDTO> createAccount(@RequestBody @Valid CreationAccountDTO creationAccountDTO,
                                                        BindingResult bindingResult,
                                                        @RequestHeader(name = "Authorization") String header){

        if(bindingResult.hasErrors())
        {
            throw new AccountNotCreatedException(ErrorMethods.formErrorMessage(bindingResult));
        }

        BankAccount account = accountsService.registerOrThrowException(
                ((UserDetailsImpl)SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUser(),
                creationAccountDTO.getCurrencyCode()
        );

        return new ResponseEntity<>(convertToBankAccountDTO(account), HttpStatus.CREATED);
    }

    private BankAccountDTO convertToBankAccountDTO(BankAccount bankAccount){
        return modelMapper.map(bankAccount, BankAccountDTO.class);
    }

    @PostMapping("/put-money")
    public ResponseEntity<AnySuccessfulResponse> putMoney(
            @RequestBody @Valid PutMoneyDTO putMoneyDTO,
            BindingResult bindingResult
            ){

        if(bindingResult.hasErrors()){
            throw new MoneyNotPutException(ErrorMethods.formErrorMessage(bindingResult));
        }

        User user = ((UserDetailsImpl)SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUser();
        accountsService.putMoneyOrThrowException(user, putMoneyDTO.getAccountNumber(), putMoneyDTO.getValue());

        return new ResponseEntity<>(new AnySuccessfulResponse("Деньги зачислены на счет"), HttpStatus.OK);
    }

    @ExceptionHandler
    public ResponseEntity<AnyErrorResponse> handleException(AccountNotCreatedException e){
        AnyErrorResponse response = new AnyErrorResponse(e.getMessage());

        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public ResponseEntity<AnyErrorResponse> handleException(AccountNotFoundException e){
        AnyErrorResponse response = new AnyErrorResponse(e.getMessage());

        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler
    public ResponseEntity<AnyErrorResponse> handleException(APIException e){
        AnyErrorResponse response = new AnyErrorResponse(e.getMessage());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public ResponseEntity<AnyErrorResponse> handleException(MoneyNotPutException e){
        AnyErrorResponse response = new AnyErrorResponse(e.getMessage());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
}
