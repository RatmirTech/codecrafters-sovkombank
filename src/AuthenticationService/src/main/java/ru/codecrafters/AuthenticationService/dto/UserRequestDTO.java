package ru.codecrafters.AuthenticationService.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserRequestDTO {

    @JsonProperty("phone_number")
    @NotBlank(message = "Поле для номера телефона не должно быть пустым")
    @Size(max = 20, message = "Номер телефона слишком большой")
    @Pattern(regexp = "[+]?\\d*", message = "В номере телефона могут быть только цифры и знак '+'")
    private String phoneNumber;

    @JsonProperty("email")
    @Email(message = "Email должен быть в формате example@mail.ru")
    @NotBlank(message = "Email не должен быть пустым")
    @Size(max = 255, message = "Слишком большой email")
    private String email;

    @JsonProperty("password")
    @NotBlank(message = "Пароль не должен быть пустым")
    @Size(max = 255, message = "Пароль слишком большой")
    private String password;

    @JsonProperty("first_name")
    @NotBlank(message = "Имя не должно быть пустым")
    @Size(max = 255, message = "Слишком большое имя")
    private String firstName;

    @JsonProperty("last_name")
    @NotBlank(message = "Фамилия не должна быть пустой")
    @Size(max = 255, message = "Слишком большая фамилия")
    private String lastName;

    @JsonProperty("middle_name")
    @Size(max = 255, message = "Слишком большое отчество")
    private String middleName;

    @JsonProperty("documents")
    @NotNull(message = "Данные по документам должны быть")
    @Valid
    private DocumentsDTO documents;
}
