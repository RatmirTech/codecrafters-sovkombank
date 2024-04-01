package ru.codecrafters.AuthenticationService.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@NoArgsConstructor
@Setter
@Getter
public class BankAccountDTO {

    @JsonProperty("account_number")
    public String accountNumber;
    public BigDecimal balance;
    public CurrencyDTO currency;
}
