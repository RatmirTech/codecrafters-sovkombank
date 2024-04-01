package ru.codecrafters.AuthenticationService.services;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.codecrafters.AuthenticationService.api.CentralBankAPI;
import ru.codecrafters.AuthenticationService.models.User;
import ru.codecrafters.AuthenticationService.repositories.UsersRepository;
import ru.codecrafters.AuthenticationService.util.UserNotRegisteredException;

@Service
@RequiredArgsConstructor
public class RegistrationService {

    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;

    private final CentralBankAPI centralBankAPI;

    public void registerOrThrowException(User user) throws UserNotRegisteredException {

        if(!centralBankAPI.confirmRegistrationAccount(user)){
            throw new UserNotRegisteredException("Центральный банк отказал в регистрации аккаунта");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        usersRepository.save(user);

    }
}
