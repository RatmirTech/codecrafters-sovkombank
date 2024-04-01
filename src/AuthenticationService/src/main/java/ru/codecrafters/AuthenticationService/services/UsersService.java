package ru.codecrafters.AuthenticationService.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.codecrafters.AuthenticationService.models.User;
import ru.codecrafters.AuthenticationService.repositories.UsersRepository;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UsersService {
    private final UsersRepository usersRepository;

    public Optional<User> findOneByPhoneNumber(String phoneNumber){
        return usersRepository.findByPhoneNumber(phoneNumber);
    }

    public Optional<User> findOneByEmail(String email){
        return usersRepository.findByEmail(email);
    }
}
