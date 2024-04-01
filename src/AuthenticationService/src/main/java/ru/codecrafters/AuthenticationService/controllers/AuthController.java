package ru.codecrafters.AuthenticationService.controllers;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.ValidatorContext;
import jakarta.validation.ValidatorFactory;
import jakarta.validation.constraints.Size;
import lombok.RequiredArgsConstructor;
import org.hibernate.validator.internal.engine.ValidatorContextImpl;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import ru.codecrafters.AuthenticationService.dto.AuthenticationDTO;
import ru.codecrafters.AuthenticationService.dto.UserRequestDTO;
import ru.codecrafters.AuthenticationService.models.Documents;
import ru.codecrafters.AuthenticationService.models.User;
import ru.codecrafters.AuthenticationService.security.JWTUtil;
import ru.codecrafters.AuthenticationService.security.UserDetailsImpl;
import ru.codecrafters.AuthenticationService.services.RegistrationService;
import ru.codecrafters.AuthenticationService.util.*;
import ru.codecrafters.AuthenticationService.util.ResponseStatus;

@RestController
@RequestMapping(value = "/auth", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
@Tag(name = "Authentication")
public class AuthController {

    private final UserValidator userValidator;

    private final JWTUtil jwtUtil;
    private final ModelMapper modelMapper;

    private final RegistrationService registrationService;
    private final AuthenticationManager authManager;

    @PostMapping("/registration")
    public ResponseEntity<AuthResponse> register(@RequestBody @Valid UserRequestDTO userRequestDTO,
                                                 BindingResult bindingResult){

        User user = convertToUser(userRequestDTO);
        if(user.getDocuments() != null)
            user.getDocuments().setUser(user);

        userValidator.validate(user, bindingResult);

        if(bindingResult.hasErrors()){
            throw new UserNotRegisteredException(ErrorMethods.formErrorMessage(bindingResult));
        }

        registrationService.registerOrThrowException(user);

        String token = jwtUtil.generateToken(user.getId().toString(), user.getPhoneNumber());

        AuthResponse authResponse = new AuthResponse();
        authResponse.setMessage("Успешная регистрация");
        authResponse.setStatus(ResponseStatus.SUCCESS);
        authResponse.setToken(token);

        return new ResponseEntity<>(authResponse, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthenticationDTO authenticationDTO){
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                authenticationDTO.getPhoneNumber(),
                authenticationDTO.getPassword()
        );

        UserDetailsImpl userDetails = (UserDetailsImpl) authManager.authenticate(authToken).getPrincipal();

        String token = jwtUtil.generateToken(userDetails.getUser().getId().toString(), userDetails.getUser().getPhoneNumber());

        AuthResponse response = new AuthResponse("Успешная авторизация", ResponseStatus.SUCCESS, token);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    private User convertToUser(UserRequestDTO userRequestDTO){
        return modelMapper.map(userRequestDTO, User.class);
    }



    @ExceptionHandler
    public ResponseEntity<AnyErrorResponse> handleException(UserNotRegisteredException e){
        AnyErrorResponse response = new AnyErrorResponse(e.getMessage());

        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public ResponseEntity<AnyErrorResponse> handleException(AuthenticationException e){
        return new ResponseEntity<>(new AnyErrorResponse(e.getMessage()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public ResponseEntity<AnyErrorResponse> handleException(APIException e){
        AnyErrorResponse response = new AnyErrorResponse(e.getMessage());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
}
