package ru.codecrafters.AuthenticationService.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.codecrafters.AuthenticationService.dto.OrderResponseDTO;
import ru.codecrafters.AuthenticationService.util.AnySuccessfulResponse;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("tests")
public class TestController {
    @PostMapping("/accept-creation-account")
    public Boolean testUrl(){
        return true;
    }
    @PostMapping("/accept-creation-user")
    public Boolean testUrl1(){
        return true;
    }
    @PostMapping("/accept-transfer-money")
    public Boolean testUrl2(){
        return true;
    }

    @PostMapping("/create-order")
    public ResponseEntity<AnySuccessfulResponse> testUrl3(){
        return new ResponseEntity<>(new AnySuccessfulResponse("Заявка успешно создана и находится на рассмотрении"), HttpStatus.ACCEPTED);
    }

    @GetMapping("/get-orders")
    public ResponseEntity<List<OrderResponseDTO>> testUrl4(@RequestParam(name = "userId") UUID userId){
        return new ResponseEntity<>(List.of(new OrderResponseDTO()), HttpStatus.OK);
    }
}
