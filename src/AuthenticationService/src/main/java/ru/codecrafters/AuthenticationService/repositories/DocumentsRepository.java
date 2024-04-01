package ru.codecrafters.AuthenticationService.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.codecrafters.AuthenticationService.models.Documents;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface DocumentsRepository extends JpaRepository<Documents, UUID> {
    Optional<Documents> findByPassportDetails(String passportDetails);
    Optional<Documents> findByInn(String inn);
    Optional<Documents> findBySnils(String snils);
}
