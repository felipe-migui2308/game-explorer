package com.felipe.gameexplorer;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class GameService {
    @Value("${rawg.api.key}")
    private String apiKey;

    @Value("${rawg.api.url}")
    private String apiUrl;

    public String buscarJogos(String nome) {

        RestClient cliente = RestClient.create();

        String resposta = cliente.get()
                .uri(apiUrl + "/games?key=" + apiKey + "&search={nome}", nome)
                .retrieve()
                .body(String.class);

        return resposta;
    }

    public String buscarDetalhes(int id) {
        RestClient cliente = RestClient.create();

        String resposta = cliente.get()
                .uri(apiUrl + "/games/{id}?key=" + apiKey, id)
                .retrieve()
                .body(String.class);

        return resposta;
    }

    public String buscarScreenshots(int id) {
        RestClient cliente = RestClient.create();

        return cliente.get()
                .uri(apiUrl + "/games/{id}/screenshots?key=" + apiKey, id)
                .retrieve()
                .body(String.class);
    }
}
