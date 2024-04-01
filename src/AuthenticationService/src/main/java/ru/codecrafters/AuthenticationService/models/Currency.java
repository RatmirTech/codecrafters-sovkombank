package ru.codecrafters.AuthenticationService.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.UUID;

@Entity
@Table(name = "currencies")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Currency {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "name")
    @NotBlank(message = "Имя валюты не должно быть пустым")
    private String name;

    @Column(name = "code")
    @NotBlank(message = "Код валюты не должен быть пустым")
    private String code;
}
