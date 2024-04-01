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
public class PutMoneyDTO {
    @JsonProperty("account_number")
    @NotBlank
    private String accountNumber;

    @JsonProperty("value")
    @NotNull
    @DecimalMin("0")
    private BigDecimal value;
}
