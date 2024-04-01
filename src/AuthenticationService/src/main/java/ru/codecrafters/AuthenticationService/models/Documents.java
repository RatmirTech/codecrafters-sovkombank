package ru.codecrafters.AuthenticationService.models;

import jakarta.persistence.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.validation.annotation.Validated;
import ru.codecrafters.AuthenticationService.util.DocumentsValidator;

import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "documents")
@Getter
@Setter
@NoArgsConstructor
@Validated(DocumentsValidator.class)
public class Documents {//TODO

    @Id
    @Column(name = "documents_id")
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "registration_address")
    @NotBlank(message = "Адрес регистрации не должен быть пустым")
    private String registrationAddress;

    @Column(name = "passport_details")
    @NotBlank(message = "Серия и номер паспорта не должны быть пустыми")
    @Size(max = 10, min = 10, message = "Размер поля для паспорта должен быть равен 10 цифрам")
    @Pattern(regexp = "\\d{10}", message = "Данные для отправки в этом поле должны быть записаны в формате: ССССНННННН, с - серия паспорта, н - номер паспорта")
    private String passportDetails;

    @Column(name = "passport_issued_at")
    @Temporal(TemporalType.DATE)
    @NotNull(message = "Значение даты выдачи паспорта не должно быть пустым")
    private Date passportIssuedAt;

    @Column(name = "inn")
    @NotBlank(message = "ИНН должен быть")
    @Pattern(regexp = "\\d{12}", message = "Некорректный формат для ИНН")
    private String inn;

    @Column(name = "snils")
    @NotBlank(message = "СНИЛС должен быть")
    @Pattern(regexp = "\\d{15}", message = "Некорректный формат для СНИЛС")
    private String snils;

    @Column(name = "place_of_birth")
    @NotBlank(message = "Поле 'Место рождения' не должно быть пустым")
    private String placeOfBirth;

    @Column(name = "date_of_birth")
    @Temporal(TemporalType.DATE)
    @NotNull(message = "Поле 'Дата рождения' не должно быть пустым")
    private Date dateOfBirth;

    @OneToOne
    @JoinColumn(name="user_id", referencedColumnName = "user_id")
    private User user;
}
