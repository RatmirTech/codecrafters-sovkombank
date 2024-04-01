package ru.codecrafters.AuthenticationService.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.format.annotation.DateTimeFormat;
import ru.codecrafters.AuthenticationService.models.User;

import java.util.Date;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
public class DocumentsDTO {

    @JsonProperty("registration_address")
    @NotBlank(message = "Адрес регистрации не должен быть пустым")
    private String registrationAddress;

    @JsonProperty("passport_details")
    @NotBlank(message = "Серия и номер паспорта не должны быть пустыми")
    @Size(max = 10, min = 10, message = "Размер поля для паспорта должен быть равен 10 цифрам")
    @Pattern(regexp = "\\d{10}", message = "Данные для отправки в этом поле должны быть записаны в формате: ССССНННННН, с - серия паспорта, н - номер паспорта")
    private String passportDetails;

    @JsonProperty("passport_issued_at")
    @NotNull(message = "Значение даты выдачи паспорта не должно быть пустым")
    private Date passportIssuedAt;

    @JsonProperty("inn")
    @NotBlank(message = "ИНН не должен быть пустым")
    @Pattern(regexp = "\\d{12}", message = "Некорректный формат для ИНН")
    private String inn;

    @JsonProperty("snils")
    @NotBlank
    @Pattern(regexp = "\\d{15}", message = "Некорректный формат для СНИЛС")
    private String snils;

    @JsonProperty("place_of_birth")
    @NotBlank(message = "Поле 'Место рождения' не должно быть пустым")
    private String placeOfBirth;

    @JsonProperty("date_of_birth")
    @NotNull(message = "Поле 'Дата рождения' не должно быть пустым")
    private Date dateOfBirth;
}
