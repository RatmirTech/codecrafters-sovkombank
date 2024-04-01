package ru.codecrafters.AuthenticationService.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
public class CreateOrderDTO {
    @JsonProperty("order_type")
    @NotBlank
    private String orderType;

    @JsonProperty("currency_from_value")
    @NotNull
    private BigDecimal currencyFromValue;

    @JsonProperty("bank_account_from")
    @NotBlank
    private String bankAccountFrom;

    @JsonProperty("bank_account_to")
    @NotBlank
    private String bankAccountTo;
}
