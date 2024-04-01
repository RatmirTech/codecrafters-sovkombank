package ru.codecrafters.AuthenticationService.services;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.codecrafters.AuthenticationService.api.CentralBankAPI;
import ru.codecrafters.AuthenticationService.api.OrdersAPI;
import ru.codecrafters.AuthenticationService.dto.CreateOrderDTO;
import ru.codecrafters.AuthenticationService.dto.PutMoneyDTO;
import ru.codecrafters.AuthenticationService.dto.TransferMoneyDTO;
import ru.codecrafters.AuthenticationService.models.BankAccount;
import ru.codecrafters.AuthenticationService.models.Currency;
import ru.codecrafters.AuthenticationService.models.User;
import ru.codecrafters.AuthenticationService.repositories.BankAccountsRepository;
import ru.codecrafters.AuthenticationService.repositories.CurrenciesRepository;
import ru.codecrafters.AuthenticationService.util.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BankAccountsService {
    private final BankAccountsRepository accountsRepository;
    private final CurrenciesRepository currenciesRepository;

    private final int lengthAccountNumber = 19;

    private final CentralBankAPI centralBankAPI;

    public List<BankAccount> getAccountsByUserId(UUID id){
        return accountsRepository.findAllByUserId(id);
    }

    @Transactional
    public BankAccount registerOrThrowException(User user, String currencyCode) throws AccountNotCreatedException {
        Optional<Currency> currency = currenciesRepository.findByCode(currencyCode);

        if(currency.isEmpty()){
            throw new AccountNotCreatedException("Данная валюта не поддерживается или неправильно написана");
        }

        BankAccount bankAccount = new BankAccount(
                generateAccountNumber(lengthAccountNumber),
                new BigDecimal(10000),
                currency.get(),
                user
        );

        if(!centralBankAPI.confirmCreationAccount(bankAccount)){
            throw new AccountNotCreatedException("Центральный банк отказал в создании счёта");
        }

        accountsRepository.save(bankAccount);

        return bankAccount;
    }

    private String generateAccountNumber(int length) {
        Random random = new Random();
        StringBuilder sb = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            sb.append(random.nextInt(10));
        }
        return sb.toString();
    }

    public Optional<BankAccount> getAccountByUserAndAccountNumber(User user, String accountNumber) {

        return accountsRepository.findByUserAndAccountNumber(user, accountNumber);
    }

    @Transactional
    public void transferMoneyOrThrowException(TransferMoneyDTO transferMoneyDTO) throws MoneyNotTransferredException {
        Optional<BankAccount> accountFrom = accountsRepository.findByAccountNumber(transferMoneyDTO.getBankAccountFrom());
        if(accountFrom.isEmpty()){
            throw new MoneyNotTransferredException("Счет, с котороого нужно перевести деньги, не существует в базе данных");
        }

        Optional<BankAccount> accountTo = accountsRepository.findByAccountNumber(transferMoneyDTO.getBankAccountTo());
        if(accountTo.isEmpty()){
            throw new MoneyNotTransferredException("Счет, на который нужно перевести деньги, не существует в базе данных");
        }

        if(!centralBankAPI.confirmTransferMoney(transferMoneyDTO)){
            throw new MoneyNotTransferredException("Центральный банк отклонил запрос на перевод денег");
        }

        accountFrom.get().setBalance(accountFrom.get().getBalance().subtract(transferMoneyDTO.getMoneyMinus()));
        accountTo.get().setBalance(accountTo.get().getBalance().add(transferMoneyDTO.getMoneyPlus()));
    }

    @Transactional
    public void putMoneyOrThrowException(User user, String accountNumber, BigDecimal value){
        Optional<BankAccount> account = accountsRepository.findByUserAndAccountNumber(user, accountNumber);
        if(account.isEmpty()){
            throw new MoneyNotPutException(
                    "Пользователя с таким номером счёта не существует или этот счёт не принадлежит пользователю"
            );
        }

        account.get().setBalance(account.get().getBalance().add(value));
    }
}
