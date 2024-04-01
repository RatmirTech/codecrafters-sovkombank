package ru.codecrafters.AuthenticationService.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
public class TransferMoneyDTO {

    @JsonProperty("bank_account_from")
    @NotBlank
    private String bankAccountFrom;

    @JsonProperty("money_minus")
    @DecimalMin("0")
    @NotNull
    private BigDecimal moneyMinus;

    @JsonProperty("bank_account_to")
    @NotBlank
    private String bankAccountTo;

    @JsonProperty("money_plus")
    @DecimalMin("0")
    @NotNull
    private BigDecimal moneyPlus;
}
