package ru.codecrafters.AuthenticationService.api;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import ru.codecrafters.AuthenticationService.dto.CreateOrderDTO;
import ru.codecrafters.AuthenticationService.dto.OrderResponseDTO;
import ru.codecrafters.AuthenticationService.util.APIException;
import ru.codecrafters.AuthenticationService.util.AnySuccessfulResponse;

import java.util.*;

@Component
@PropertySource("classpath:/.env")
@RequiredArgsConstructor
public class OrdersAPI {

    @Value("${orders_url_create_order}")
    private String ordersUrlCreateOrder;
    @Value("${orders_url_get_order}")
    private String ordersUrlGetOrders;

    private final RestTemplate restTemplate;

    public String sendRequestCreateOrderAndGetMessageResponse(UUID userId,
                                                              CreateOrderDTO createOrderDTO,
                                                              String currencyFrom,
                                                              String currencyTo) throws APIException {
        try{
            Map<String, Object> jsonBody = new HashMap<>();

            jsonBody.put("UserId", userId);
            jsonBody.put("OrderType", createOrderDTO.getOrderType());
            jsonBody.put("CurrencyFrom", currencyFrom);
            jsonBody.put("CurrencyFromValue", createOrderDTO.getCurrencyFromValue());
            jsonBody.put("BankAccountFrom", createOrderDTO.getBankAccountFrom());
            jsonBody.put("CurrencyTo", currencyTo);
            jsonBody.put("BankAccountTo", createOrderDTO.getBankAccountTo());

            return getResponsePost(jsonBody, ordersUrlCreateOrder, String.class);
        }catch (Exception e){
            throw new APIException("Ошибка при получении ответа при создании заказа!");
        }
    }

    public List<OrderResponseDTO> sendRequestGetOrders(UUID userId) throws APIException{
        try{
            String urlWithParams = ordersUrlGetOrders + "?userId={userId}";
            return getResponseGet(urlWithParams, List.class, Map.of("userId", userId));
        }
        catch(Exception e){
            //throw new APIException("Ошибка при получении заказов!");
            throw e;
        }
    }



    private <T>T getResponsePost(Object body, String url, Class<T> clazz){
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Object> httpEntity = new HttpEntity<>(body, headers);

        return restTemplate.postForObject(url, httpEntity, clazz);
    }
    private <T>T getResponseGet(String url, Class<T> clazz, Map<String, Object> params){


        return restTemplate.getForObject(url, clazz, params);
    }
}
