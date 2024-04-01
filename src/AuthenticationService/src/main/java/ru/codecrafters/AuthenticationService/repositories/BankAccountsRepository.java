package ru.codecrafters.AuthenticationService.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.codecrafters.AuthenticationService.models.BankAccount;
import ru.codecrafters.AuthenticationService.models.Currency;
import ru.codecrafters.AuthenticationService.models.User;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface BankAccountsRepository extends JpaRepository<BankAccount, UUID> {
    @Query(value = "select * from bank_accounts where user_id=?", nativeQuery = true)
    List<BankAccount> findAllByUserId(UUID id);

    //@Query(value = "select * from bank_accounts where account_number=? and user_id=?", nativeQuery = true)
    Optional<BankAccount> findByUserAndCurrency(User user, Currency currency);

    Optional<BankAccount> findByUserAndAccountNumber(User user, String accountNumber);

    Optional<BankAccount> findByAccountNumber(String accountNumber);
}
