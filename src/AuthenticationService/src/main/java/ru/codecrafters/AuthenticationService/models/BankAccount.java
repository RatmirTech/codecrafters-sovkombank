package ru.codecrafters.AuthenticationService.models;


import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Table(name = "bank_accounts")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class BankAccount {

    @Id
    @Column(name = "account_id")
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "account_number")
    @NotBlank(message = "Номер счёта не должен быть пустым")
    @Size(max = 23)
    private String accountNumber;

    @Column(name = "balance")
    @NotNull(message = "Поле для баланса не должно быть пустым")
    @DecimalMax(value = "999999999999999.99", message = "Некорректное значение баланса")
    private BigDecimal balance;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "currency_id", referencedColumnName = "id")
    private Currency currency;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    public User user;

    public BankAccount(String accountNumber, BigDecimal balance, Currency currency, User user) {
        this.accountNumber = accountNumber;
        this.balance = balance;
        this.currency = currency;
        this.user = user;
    }
}
