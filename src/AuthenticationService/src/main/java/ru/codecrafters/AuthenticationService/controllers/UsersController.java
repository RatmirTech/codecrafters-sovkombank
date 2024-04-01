package ru.codecrafters.AuthenticationService.controllers;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.codecrafters.AuthenticationService.dto.UserResponseDTO;
import ru.codecrafters.AuthenticationService.models.User;
import ru.codecrafters.AuthenticationService.security.UserDetailsImpl;

@RestController
@RequestMapping(value = "/users", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
@Tag(name = "Users")
public class UsersController {

    private final ModelMapper modelMapper;
    @GetMapping("/get-user-data")
    public ResponseEntity<UserResponseDTO> getUser(@RequestHeader(name = "Authorization") String header){
        User user = ((UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUser();

        return new ResponseEntity<>(convertToUserResponseDTO(user), HttpStatus.OK);
    }

    private UserResponseDTO convertToUserResponseDTO(User user){
        return modelMapper.map(user, UserResponseDTO.class);
    }
}
