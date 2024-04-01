package ru.codecrafters.AuthenticationService.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CreationAccountDTO {

    @NotBlank
    @Size(min = 3, max = 3, message = "Размер кода валюты должен быть равен 3")
    @JsonProperty("currency_code")
    private String currencyCode;
}
