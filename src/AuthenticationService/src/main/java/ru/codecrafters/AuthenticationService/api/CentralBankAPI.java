package ru.codecrafters.AuthenticationService.api;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import ru.codecrafters.AuthenticationService.dto.RequestCreationAccountDTO;
import ru.codecrafters.AuthenticationService.dto.TransferMoneyDTO;
import ru.codecrafters.AuthenticationService.dto.UserResponseDTO;
import ru.codecrafters.AuthenticationService.models.BankAccount;
import ru.codecrafters.AuthenticationService.models.User;
import ru.codecrafters.AuthenticationService.util.APIException;

@Component
@PropertySource("classpath:/.env")
@RequiredArgsConstructor
public class CentralBankAPI {

    private final ModelMapper modelMapper;
    @Value("${central_bank_url_new_account}")
    private String centralBankUrlNewAccount;
    @Value("${central_bank_url_new_user}")
    private String centralBankUrlNewUser;
    @Value("${central_bank_url_transfer_money}")
    private String centralBankUrlTransferMoney;

    private final RestTemplate restTemplate;

    public boolean confirmCreationAccount(BankAccount account) {
        return getConfirm(convertToRequestCreationAccountDTO(account), centralBankUrlNewAccount);
    }

    public boolean confirmRegistrationAccount(User user){
        return getConfirm(convertToUserResponseDTO(user), centralBankUrlNewUser);
    }

    public boolean confirmTransferMoney(TransferMoneyDTO transferMoneyDTO){
        return getConfirm(transferMoneyDTO, centralBankUrlTransferMoney);
    }

    private boolean getConfirm(Object obj, String url){

        try{
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<Object> httpEntity = new HttpEntity<>(obj, headers);

            String response = restTemplate.postForObject(url, httpEntity, String.class);

            return Boolean.parseBoolean(response);
        }catch(Exception e){
            throw new APIException("Ошибка при отправлении запроса или получении ответа от Центрального Банка");
        }
    }

    private RequestCreationAccountDTO convertToRequestCreationAccountDTO(BankAccount account){
        return modelMapper.map(account, RequestCreationAccountDTO.class);
    }

    private UserResponseDTO convertToUserResponseDTO(User user){
        return modelMapper.map(user, UserResponseDTO.class);
    }
}
