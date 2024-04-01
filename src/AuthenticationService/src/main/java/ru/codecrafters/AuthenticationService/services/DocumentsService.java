package ru.codecrafters.AuthenticationService.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.codecrafters.AuthenticationService.models.Documents;
import ru.codecrafters.AuthenticationService.repositories.DocumentsRepository;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DocumentsService {
    private final DocumentsRepository documentsRepository;

    public Optional<Documents> getByPassportDetails(String passportDetails){
        return documentsRepository.findByPassportDetails(passportDetails);
    }

    public Optional<Documents> getByInn(String inn){
        return documentsRepository.findByInn(inn);
    }

    public Optional<Documents> getBySnils(String snils){
        return documentsRepository.findBySnils(snils);
    }
}
