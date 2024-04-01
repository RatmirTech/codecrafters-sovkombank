package ru.codecrafters.AuthenticationService.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.codecrafters.AuthenticationService.models.Currency;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface CurrenciesRepository extends JpaRepository<Currency, UUID> {
    Optional<Currency> findByCode(String code);
}
