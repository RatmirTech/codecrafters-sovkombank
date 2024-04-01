package ru.codecrafters.AuthenticationService.util;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import ru.codecrafters.AuthenticationService.models.User;
import ru.codecrafters.AuthenticationService.services.UsersService;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class UserValidator implements Validator {

    private final UsersService usersService;
    private final DocumentsValidator documentsValidator;

    @Override
    public boolean supports(Class<?> clazz) {
        return clazz.equals(User.class);
    }

    @Override
    public void validate(Object target, Errors errors) {//TODO
        User userToCheck = (User)target;

        Optional<User> userWithSamePhoneNumber = usersService.findOneByPhoneNumber(userToCheck.getPhoneNumber());

        if(userWithSamePhoneNumber.isPresent()){
            errors.rejectValue("phoneNumber", "", "Этот номер телефона занят!");
        }

        Optional<User> userWithSameEmail = usersService.findOneByEmail(userToCheck.getEmail());

        if(userWithSameEmail.isPresent()){
            errors.rejectValue("email", "", "Этот email занят!");
        }

        if(userToCheck.getDocuments() != null) documentsValidator.validate(userToCheck.getDocuments(), errors);
    }
}
