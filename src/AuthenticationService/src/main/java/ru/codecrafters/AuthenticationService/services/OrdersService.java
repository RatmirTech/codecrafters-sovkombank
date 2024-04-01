package ru.codecrafters.AuthenticationService.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.codecrafters.AuthenticationService.api.OrdersAPI;
import ru.codecrafters.AuthenticationService.dto.CreateOrderDTO;
import ru.codecrafters.AuthenticationService.dto.OrderResponseDTO;
import ru.codecrafters.AuthenticationService.models.BankAccount;
import ru.codecrafters.AuthenticationService.repositories.BankAccountsRepository;
import ru.codecrafters.AuthenticationService.util.OrderNotCreatedException;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class OrdersService {
    private final OrdersAPI ordersAPI;
    private final BankAccountsRepository accountsRepository;

    @Transactional
    public String createOrderAndReturnAnswer(UUID userId, CreateOrderDTO createOrderDTO) {
        Optional<BankAccount> accountFrom = accountsRepository.findByAccountNumber(createOrderDTO.getBankAccountFrom());
        if(accountFrom.isEmpty()){
            throw new OrderNotCreatedException("Счет bankAccountFrom не существует в базе данных");
        }

        Optional<BankAccount> accountTo = accountsRepository.findByAccountNumber(createOrderDTO.getBankAccountTo());
        if(accountTo.isEmpty()){
            throw new OrderNotCreatedException("Счет bankAccountTo не существует в базе данных");
        }

        return ordersAPI.sendRequestCreateOrderAndGetMessageResponse(userId, createOrderDTO, accountFrom.get().getCurrency().getCode(), accountTo.get().getCurrency().getCode());
    }

    public List<OrderResponseDTO> getOrders(UUID userId) {
        return ordersAPI.sendRequestGetOrders(userId);
    }
}
