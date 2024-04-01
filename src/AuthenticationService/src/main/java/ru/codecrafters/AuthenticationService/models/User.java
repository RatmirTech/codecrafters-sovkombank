package ru.codecrafters.AuthenticationService.models;

import jakarta.persistence.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.validation.annotation.Validated;

import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
public class User {
    @Id
    @Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "phone_number")
    @NotBlank(message = "Поле для номера телефона не должно быть пустым")
    @Size(max = 20, message = "Номер телефона слишком большой")
    @Pattern(regexp = "[+]?\\d*", message = "В номере телефона могут быть только цифры и знак '+'")
    private String phoneNumber;

    @Column(name = "email")
    @Email(message = "Email должен быть в формате example@mail.ru")
    @NotBlank(message = "Email не должен быть пустым")
    @Size(max = 255, message = "Слишком большой email")
    private String email;

    @Column(name = "password")
    @NotBlank(message = "Пароль не должен быть пустым")
    @Size(max = 255, message = "Пароль слишком большой")
    private String password;

    @Column(name = "first_name")
    @NotBlank(message = "Имя не должно быть пустым")
    @Size(max = 255, message = "Слишком большое имя")
    private String firstName;

    @Column(name = "last_name")
    @NotBlank(message = "Фамилия не должна быть пустой")
    @Size(max = 255, message = "Слишком большая фамилия")
    private String lastName;

    @Column(name = "middle_name")
    @Size(max = 255, message = "Слишком большое отчество")
    private String middleName;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    @NotNull(message = "Данные по документам должны быть")
    @Valid
    private Documents documents;

    @OneToMany(mappedBy = "user")
    private List<BankAccount> accounts;

    public User(UUID id){
        this.id = id;
    }
}
