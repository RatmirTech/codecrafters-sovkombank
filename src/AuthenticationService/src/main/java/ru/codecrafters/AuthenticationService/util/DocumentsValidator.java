package ru.codecrafters.AuthenticationService.util;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import ru.codecrafters.AuthenticationService.models.Documents;
import ru.codecrafters.AuthenticationService.services.DocumentsService;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class DocumentsValidator implements Validator {
    private final DocumentsService documentsService;

    @Override
    public boolean supports(Class<?> clazz) {
        return clazz.equals(Documents.class);
    }

    @Override
    public void validate(Object target, Errors errors) {
        Documents documentsToCheck = (Documents) target;

        Optional<Documents> documentsWithSamePassportDetails =
                documentsService.getByPassportDetails(documentsToCheck.getPassportDetails());
        if(documentsWithSamePassportDetails.isPresent()){
            errors.rejectValue(
                    "documents.passportDetails",
                    "",
                    "Пользователь с этим паспортом уже зарегистрирован");
            return;
        }
        Optional<Documents> documentsWithSameInn =
                documentsService.getByInn(documentsToCheck.getInn());
        if(documentsWithSameInn.isPresent()){
            errors.rejectValue(
                    "documents.inn",
                    "",
                    "Пользователь с этим ИНН уже зарегистрирован");
            return;
        }
        Optional<Documents> documentsWithSameSnils =
                documentsService.getBySnils(documentsToCheck.getSnils());
        if(documentsWithSameSnils.isPresent()){
            errors.rejectValue(
                    "documents.snils",
                    "",
                    "Пользователь с этим СНИЛС уже зарегистрирован");
        }
    }
}
