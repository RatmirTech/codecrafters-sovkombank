package ru.codecrafters.AuthenticationService.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.JoinColumn;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
public class OrderResponseDTO {
    @JsonProperty("order_date")
    private Date orderDate;
    @JsonProperty("order_type")
    private String orderType;

    @JsonProperty("currency_from")
    private String currencyFrom;
    @JsonProperty("currency_from_value")
    private BigDecimal currencyFromValue;
    @JsonProperty("bank_account_from")
    private String bankAccountFrom;

    @JsonProperty("currency_to")
    private String currencyTo;
    @JsonProperty("currency_to_value")
    private BigDecimal currencyToValue;

    @JsonProperty("status")
    private String status;
    @JsonProperty("currency_rate")
    private BigDecimal currencyRate;

    @JsonProperty("bank_account_to")
    private String bankAccountTo;
}
